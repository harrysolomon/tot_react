import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ForPeople from './ForPeople/forPeople';
import BachelorsDegree from './ForPeople/bachelors_degree';
import NewTimeSaver from './ForBusiness/time_saver/pages/calculator/new_timesaver';
import ROIList from './ForBusiness/time_saver/pages/timesaver_list';
import Homepage from './homepage';
import ForBusiness from './ForBusiness/forBusiness';
import TimeSaverView from './ForBusiness/time_saver/pages/calculator/view_timesaver'
import EditTimeSaver from './ForBusiness/time_saver/pages/calculator/edit_timesaver'
import NewProduct from './ForBusiness/time_saver/pages/products/new_product'
import NewEmployee from './ForBusiness/time_saver/pages/employees/new_employee'
import NewTimeSaverFunc from './ForBusiness/time_saver/pages/calculator/new_timesaver_functional'
import ViewTimeSaverFunc from './ForBusiness/time_saver/pages/calculator/view_timesaver_functional'


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
        <Route path="/for-business/timesaver/product/new" component={NewProduct} />
        <Route path="/for-business/timesaver/employee/new" component={NewEmployee} />
        <Route exact path="/for-business/timesaver/:timesaverId" component={TimeSaverView} />
        <Route exact path="/for-business/timesaver/:timesaverId/:timesaverTab" component={ViewTimeSaverFunc} />
        <Route exact path="/for-business/timesaver/:timesaverId/edit" component={EditTimeSaver} />
      </Switch>
      <Route exact path="/testing-hooks" component={NewTimeSaverFunc} />
      <Route exact path="/testing-hooks-view" component={ViewTimeSaverFunc} />
      
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
