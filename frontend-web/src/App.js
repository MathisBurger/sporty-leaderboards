import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {LoginWindow} from "./routes/login/Login";

function App() {
  return (
    <Router>
      <Route path='/login' component={LoginWindow}/>
    </Router>
  );
}

export default App;
