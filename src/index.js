import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ForPeople from './components/forPeople';
import FinalResult from './components/final_results';
import TestingFormInput from './components/testing_form_options';
import NewTimeSaver from './components/time_saver/new_timesaver';
import ROIList from './components/time_saver/roi_list';
import Homepage from './components/homepage';
import ForBusiness from './components/forBusiness';
import TimeSaverView from './components/time_saver/view_timesaver'


ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/for-people" component={ForPeople} />
      <Route exact path="/for-business" component={ForBusiness} />
      <Route exact path="/5fac52be03ff66099d9a8ef4" component={FinalResult} />
      <Route exact path="/testing" component={TestingFormInput} />
      <Switch>
        <Route exact path="/timesaver" component={ROIList} />
        <Route path="/timesaver/new" component={NewTimeSaver} />
        <Route path="/timesaver/:timesaverId" component={TimeSaverView} />
      </Switch>
      
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
