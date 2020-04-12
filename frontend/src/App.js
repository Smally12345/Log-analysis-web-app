import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar.js'
import './App.css'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
class App extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			file:"",
		}
	}



	onFileChange = (event) =>{
		this.setState({
			file:event.target.files[0]
		})
   	 }

	onSubmit = (event) =>{
		event.preventDefault()
		const data = new FormData()
		let { file } = this.state;
		data.append('file',file)
      		axios
        		.post(
          			"/",
				data
          			,
         		{
            			headers: {
            				"Content-Type":"multipart/form-data"
				}
          		}

        		)
			.then(res => {
        			console.log(res);
        			console.log(res.data);
				console.log(res.statusText)
      			})
		}
  	render() {
    	return (
		 <div>
	    	<Navbar />
	 	<div className = "AppHeader">
	    	<center>
	    	<h1>Log Analysis</h1>
		<h2>We Provide Three Type of Analysis For Your Web Server Log Data</h2>
	    	</center>
	    	<ul style={{fontFamily:"Roboto", marginLeft:"20%"}}>
	    		<li><h4>EndPoints with Maxmium Content Flow</h4></li>
			<li><h4>Analysis of Response Codes</h4></li>
	    		<li><h4>Analysis of Traffic With respect to Content in Mega Bytes</h4></li>
	    	</ul>
		<h2 style={{fontFamily:"Times New Roman"}}>Upload Your Log Data File ( Make sure file extension is .log or .txt)</h2>
		<Form onSubmit={this.onSubmit}>
	    	<FormGroup>
        		<Label>File</Label>
        		<Input type="file" name="file"  onChange= {this.onFileChange}/>
      		</FormGroup>
	    	<Button>Submit File</Button>
		</Form>
		</div>
	</div>  
    	);
  	}
}
export default App;
