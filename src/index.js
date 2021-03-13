import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ForPeople from './components/ForPeople/forPeople';
import BachelorsDegree from './components/ForPeople/bachelors_degree';
import NewTimeSaver from './components/ForBusiness/time_saver/new_timesaver';
import ROIList from './components/ForBusiness/time_saver/timesaver_list';
import Homepage from './components/homepage';
import ForBusiness from './components/ForBusiness/forBusiness';
import TimeSaverView from './components/ForBusiness/time_saver/view_timesaver'
import EditTimeSaver from './components/ForBusiness/time_saver/edit_timesaver'


ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Homepage} />
      <Switch>
        <Route exact path="/for-people" component={ForPeople} />
        <Route exact path="/for-people/bachelors-degree" component={BachelorsDegree} />
      </Switch>
      <Switch>
        <Route exact path="/for-business" component={ForBusiness} />
        <Route exact path="/for-business/timesaver" component={ROIList} />
        <Route path="/for-business/timesaver/new" component={NewTimeSaver} />
        <Route exact path="/for-business/timesaver/:timesaverId" component={TimeSaverView} />
        <Route exact path="/for-business/timesaver/:timesaverId/edit" component={EditTimeSaver} />
      </Switch>
      
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
