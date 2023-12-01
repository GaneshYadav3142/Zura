import React from 'react';
import logo from './logo.svg';
import './App.css';

import { MainRoutes } from './Component/MainRoutes';
import { Navbar } from './Component/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <MainRoutes/>
    </div>
  );
}

export default App;
