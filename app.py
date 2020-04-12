from pyspark import SparkContext, SparkConf
from pyspark.sql import SQLContext
import structure
import os
from werkzeug.utils import secure_filename
from flask import Flask, jsonify, request ,flash, redirect, url_for

conf = SparkConf().setAppName("Log Analyzer SQL")
sc = SparkContext(conf=conf)
sqlContext = SQLContext(sc)

logFile = ''
access_logs = None
schema_access_logs = None

# creating a Flask app 
app = Flask(__name__) 


UPLOAD_FOLDER = './'
ALLOWED_EXTENSIONS = {'txt', 'log'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            print(filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            logFile = './'+ filename
            access_logs = (sc.textFile(logFile)
               .map(structure.parse_apache_log_line)
               .cache())
            schema_access_logs = sqlContext.createDataFrame(access_logs)
            schema_access_logs.registerTempTable("logs")

            return '''Success'''
    return '''Error'''
            





# on the terminal type: curl http://127.0.0.1:5000/ 
# returns hello world when we use GET. 
# returns the data that we send when we use POST. 
@app.route('/contentFlow', methods = ['GET', 'POST']) 
def ContentFlow(): 
    if(request.method == 'GET'): 
        topEndpointsMaxSize = (sqlContext
                .sql("SELECT endpoint,content_size/1024 FROM logs ORDER BY content_size DESC LIMIT 10")
                .rdd.map(lambda row: (row[0], row[1]))
                .collect())  
        data = []
        for i in range(len(topEndpointsMaxSize)):
            data.append({'endpoints':topEndpointsMaxSize[i][0], 'contentFlow':topEndpointsMaxSize[i][1]})
        return jsonify({
            'data':data
            }) 
  
  
@app.route('/responseCodes', methods = ['GET']) 
def ResponseCodes(): 
    responseCodes = (sqlContext
                       .sql("SELECT response_code, COUNT(*) AS theCount FROM logs GROUP BY response_code")
                       .rdd.map(lambda row: (row[0], row[1]))
                       .collect())
    data = []
    for i in range(len(responseCodes)):
        data.append({'code':responseCodes[i][0],'hits':responseCodes[i][1]})

    return jsonify({'data': data}) 
  
@app.route('/traffic', methods = ['GET'])
def Traffic():
    trafficperDay = (sqlContext
                       .sql("SELECT time,content_size/1024 FROM logs where date='08/Mar/2004'")
                       .rdd.map(lambda row: (row[0], row[1]))
                       .collect())
    data = []
    for i in range(len(trafficperDay)):
        data.append({'time':trafficperDay[i][0], 'content':trafficperDay[i][1]})
    return jsonify({'data': data})

# driver function 
if __name__ == '__main__': 
  
    app.run(debug = True) 
