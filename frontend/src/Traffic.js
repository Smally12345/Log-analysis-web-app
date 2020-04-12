import React, { Component } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import Navbar from './Navbar';

class Traffic extends Component {

  constructor(props){
        super(props)
        this.state = {
                data:"",
                loading:true,
        }

        }
        componentDidMount(){
                axios.get('/traffic')
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
        <center style={{paddingTop:"3%"}}>
        <h1>Traffic Analysis For One Day</h1>
        </center>
        <div>
	<AreaChart width={1200} height={500} data={this.state.data}
  		margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
  		<CartesianGrid strokeDasharray="3 3" />
  	<XAxis dataKey="time" interval={100} label={{value:"TimeStamp", dy: 14, position:"insideBottomRight"}} />
  	<YAxis label={{value:"Content Size - MB", angle:-90,position:"insideLeft"}}/>
  	<Tooltip />
	<Legend />
  	<Area type="monotone" dataKey="content" stroke="#8884d8" />
	</AreaChart>
       	</div>
        </>
        }
        </div>

    );
  }
}
export default Traffic;

