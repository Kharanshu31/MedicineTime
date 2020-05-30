import React from 'react';
import { Route, Switch,withRouter} from 'react-router-dom';
import Medicine from './containers/Medicine/medicine';
import Course from "./components/course/course";
import Auxillary from "./hoc/Auxillary/Auxillary";

const App = props => {
  return (
    <div>
    <Auxillary>
      <Switch>
      <Route path="/course" component={Course} />
        <Route path="/" component={Medicine}/>
      </Switch>
    </Auxillary>
    </div>
  )
};

export default withRouter(App);
