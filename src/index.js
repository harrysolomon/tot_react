import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from 'hs_customs/Pages/homepage/homepage';
import FreeCalculators from 'hs_customs/Pages/freeCalculators/freeCalculators'
import SolutionsForBusiness from 'hs_customs/Pages/solutionsForBusiness/solutionsForBusiness'
import CustomCalculatorsForPeople from 'hs_customs/Pages/customCalculatorsForPeople/customCalculatorsForPeople'


ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Homepage} />
      <Switch>
        <Route exact path="/free-calculators" component={FreeCalculators} />
        {/* <Route exact path="/for-people/bachelors-degree" component={BachelorsDegree} /> */}
      </Switch>
      <Switch>
        <Route exact path="/solutions-for-businesses" component={SolutionsForBusiness} />
      </Switch>
      <Switch>
        <Route exact path="/custom-calculators-for-people" component={CustomCalculatorsForPeople} />
      </Switch>
      
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
