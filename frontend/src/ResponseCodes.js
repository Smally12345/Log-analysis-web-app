import React, { Component } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import Navbar from './Navbar';

class ResponseCodes extends Component {

  constructor(props){
        super(props)
        this.state = {
                data:"",
                loading:true,
        }

        }
        componentDidMount(){
                axios.get('/responseCodes')
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
        <h1>Response Code Analysis</h1>
        </center>
        <div>
        <BarChart
                width={1000}
                height={400}
                data={this.state.data}
        >
        <XAxis dataKey="code" label="Response Codes"/>
        <YAxis label={{value:"Number of responses", angle:-90, position:"insideLeft"}}/>
        <Tooltip />
        <Bar dataKey="hits">
		{
     		this.state.data.map((entry, index) => (
        	<Cell key={`cell-${index}`} fill="#ff5555"/>
      		))
    		}
	</Bar>
        </BarChart>
        </div>
        </>
        }
        </div>

    );
  }
}
export default ResponseCodes;

                              
