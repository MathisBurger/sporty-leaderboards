import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


import {LoginWindow} from "./routes/login/Login";
import {RegisterWindow} from "./routes/register/RegisterWindow";
import {Dashboard} from "./routes/dashboard/Dashboard";
import {UserManagement} from "./routes/UserManagement/UserManagement";
import {Workout} from "./routes/Workout/Workout";

function App() {
  return (
    <Router>
      <Switch>
          <Route path='/login' component={LoginWindow} />
          <Route path='/register' component={RegisterWindow} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/user-management' component={UserManagement} />
          <Route path='/workout' component={Workout} />
      </Switch>
    </Router>
  );
}

export default App;
