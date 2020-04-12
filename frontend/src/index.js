import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Switch,Route, BrowserRouter as Router, Redirect} from 'react-router-dom'
import ContentFlow from "./ContentFlow";
import ResponseCodes from "./ResponseCodes";
import Traffic from "./Traffic";
const routing = (
    <Router>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/contentFlow" component={ContentFlow}/>
        <Route exact path="/responseCodes" component={ResponseCodes} />
	<Route exact path="/traffic" component={Traffic} />
      </Switch>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
