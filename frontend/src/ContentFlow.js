import React, { Component } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import Navbar from './Navbar';

class ContentFlow extends Component {

  constructor(props){
        super(props)
        this.state = {
                data:"",
                loading:true,
        }

        }
        componentDidMount(){
                axios.get('/contentFlow')
                        .then((res) =>{
                                this.setState({
                                        data:res.data.data,
                                        loading:false,
                                });
                        })
        }
render() {
    return (
        <div>
	 <Navbar />
        {this.state.loading && <h1>Loading</h1>}
        {!this.state.loading &&
        <>
        <center style={{paddingTop:"10%"}}>
        <h1>Endpoint Analysis Based on Max Content Size</h1>
        </center>
        <div>
        <BarChart
                width={1200}
                height={400}
                data={this.state.data}
                layout="vertical"
        >
        <XAxis type="number" />
        <YAxis type="category" dataKey="endpoints" width={500} style={{fontSize:"10px"}} label={{value:"Endpoints", angle:-90, position:"insideLeft"}}/>
        <Tooltip />
        <Legend />
        <Bar dataKey="contentFlow" fill="#8884d8" />
        </BarChart>
        </div>
        </>
        }
        </div>

    );
  }
}
export default ContentFlow;
                              
