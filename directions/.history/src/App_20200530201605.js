import React, { useEffect } from 'react';
import './App.css';
import { loadMap } from './api';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const App = () => {
  
  const containerStyle = {
    width: '400px',
    height: '400px'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };

  const initMap = () => {
    var map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    }
  };

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
