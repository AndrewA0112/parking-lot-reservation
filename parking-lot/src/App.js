import React from 'react';
import './App.css';
import Login from './components/Login'
import ParkingLot from './components/ParkingLot'
import { Route, Link } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      <Route exact path="/" component={Login} />
      <Route path="/parking-lot" component={ParkingLot} />
    </div>
  );
}

export default App;
