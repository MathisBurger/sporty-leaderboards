import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {LoginWindow} from "./routes/login/Login";
import {RegisterWindow} from "./routes/register/RegisterWindow";

function App() {
  return (
    <Router>
      <Switch>
          <Route path='/login' component={LoginWindow}/>
          <Route path='/register' component={RegisterWindow}/>
      </Switch>
    </Router>
  );
}

export default App;
