import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Weather from './pages/Weather';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
