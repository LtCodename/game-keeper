import React from 'react';
import './App.css';
import Sections from './components/sections/Sections.js';
import Nav from './components/nav/Nav.js';

function App() {
  return (
    <div className="appDiv">
      <Nav />
      <Sections />
    </div>
  );
}

export default App;
