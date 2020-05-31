import React, { useEffect } from 'react';
import './App.css';
import { loadMap } from './api';

const App = () => {
  
  useEffect(() => {
    async function getMap() {
      const apiCall = await loadMap();

    }
    getMap();
  })
  return (
    <div className="App">
      <div className="section-wrap">
        <div className="section-header">
          <div className="section-title">INDIQUE MOI</div>
          <div className="section-summary">BLABLABLA</div>
        </div>
          <div className="section-main">
            <div className="section-main-summary">DESCRIPTIONS</div>
            <div className="map-wrap">
              
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
