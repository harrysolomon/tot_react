import React from 'react';
import ReactDOM from 'react-dom';
import Topline from './components/charts/topline';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import App from './App';
//import Tile from './components/invest_tiles'
import Overview from './components/Overview';
import FinalModal from './components/modal/modal_handler';
import FinalResult from './components/final_results';


ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Overview} />
      <Route path="/success" component={FinalResult} />
      <Route path="/form" component={FinalModal} />
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
