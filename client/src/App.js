import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Characters  from './pages/Characters';
 
function App() {
  return (
    <Router>
      <NavBar />
      <Routes> {/* Wrap your Route components in a Routes component */}
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
