import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Overview from './components/Overview';
import FinalResult from './components/final_results';
import TestingFormInput from './components/testing_form_options';
import Automation from './components/automation';
import ROIList from './components/roi_list';


ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Overview} />
      <Route path="/5fac52be03ff66099d9a8ef4" component={FinalResult} />
      <Route path="/testing" component={TestingFormInput} />
      <Route path="/automation" component={Automation} />
      <Route path="/calculator" component={ROIList} />
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
