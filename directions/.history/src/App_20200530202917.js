import React, { useEffect } from 'react';
import './App.css';
// import { loadMap } from './api';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const App = () => {

  const containerStyle = {
    width: '400px',
    height: '400px'
  };

  const center = {
    lat: -3.745,
    lng: -38.523
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
            <LoadScript
              googleMapsApiKey="YOUR_API_KEY"
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
              >
                <></>
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
