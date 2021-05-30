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
import LineChartTimeSaver from './ForBusiness/time_saver/pages/time_saver_list/view_timesaver/line_chart'
import TableTimeSaver from './ForBusiness/time_saver/pages/time_saver_list/view_timesaver/table'
import InputsTimeSaver from './ForBusiness/time_saver/pages/time_saver_list/view_timesaver/inputs'
import SummaryTimeSaver from './ForBusiness/time_saver/pages/time_saver_list/view_timesaver/summary'
import TimeSaverCalculatorList from './ForBusiness/time_saver/pages/time_saver_list/calculator_list'
import TimeSaverProductList from './ForBusiness/time_saver/pages/time_saver_list/product_list'
import TimeSaverEmployeeList from './ForBusiness/time_saver/pages/time_saver_list/employee_list'
import TimeSaverGettingStarted from './ForBusiness/time_saver/pages/time_saver_list/getting_started'
import NewTimeSaverProduct from './ForBusiness/time_saver/pages/time_saver_list/add_product'
import NewTimeSaverEmployee from './ForBusiness/time_saver/pages/time_saver_list/add_employee'


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
        <Route exact path="/for-business/:calculatorType/calculator_list" component={TimeSaverCalculatorList} />
        <Route exact path="/for-business/:calculatorType/product_list" component={TimeSaverProductList} />
        <Route exact path="/for-business/:calculatorType/employee_list" component={TimeSaverEmployeeList} />
        <Route exact path="/for-business/:calculatorType/getting_started" component={TimeSaverGettingStarted} />
        <Route path="/for-business/timesaver/new" component={NewTimeSaver} />
        <Route path="/for-business/timesaver/product/new" component={NewTimeSaverProduct} />
        <Route path="/for-business/timesaver/employee/new" component={NewTimeSaverEmployee} />
        <Route exact path="/for-business/timesaver/:timesaverId" component={TimeSaverView} />
        <Route exact path="/for-business/timesaver/:timesaverId/graph" component={LineChartTimeSaver} />
        <Route exact path="/for-business/timesaver/:timesaverId/table" component={TableTimeSaver} />
        <Route exact path="/for-business/timesaver/:timesaverId/inputs" component={InputsTimeSaver} />
        <Route exact path="/for-business/timesaver/:timesaverId/summary" component={SummaryTimeSaver} />
        <Route exact path="/for-business/timesaver/:timesaverId/edit" component={EditTimeSaver} />
      </Switch>
      <Route exact path="/testing-hooks" component={NewTimeSaverFunc} />
      
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
