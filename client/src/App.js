import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
 
function App() {

  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup}/>
      </Router>
      
    </div>
  );
}

export default App;
