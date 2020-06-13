import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, LoadScript, DrawingManager, StandaloneSearchBox, Autocomplete, Polyline, Marker } from '@react-google-maps/api';
import { Loader } from '../common/Loader';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { locations } from '../helpers/locations';
import { MapSidebar } from './MapSidebar';
import { MapsContext } from '../helpers/contexts';

export const MapMain = () => {
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState({ lat: 5.30966, lng: -4.01266 });
  const [destination, setDestination] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [title, setTitle] = useState(null);
  const [zoom, setZoom] = useState(12);
  const [drawingMode, setDrawingMode] = useState(null);

  const validations = Yup.object().shape({
    step1: Yup.string().required().min(4)
  });

  const initialValues = {
    mapTitle: '',
    step1: ''
  };

  const searchLocation = value => {
    // TODO: use the google getPlaces class in the backend to handle this
    let match = locations.find((l) => [l.name].includes(value.toLowerCase()) ? l : null);

    if (match) {
      setZoom(14);
      setOrigin(match.coord);
    }
  };

  const shareLink = () => {
  };

  const submit = (values, actions) => {
    console.log({ values, actions });

  };



  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={submit}
    >
      {({ values, errors, touched, isValid, submitForm, setFieldValue }) => (
        <MapsContext.Provider value={{ drawingMode, setDrawingMode, darkMode, setDarkMode, destination, setDestination, zoom, setZoom }}>
          <LoadScript
            googleMapsApiKey={process.env.REACT_APP_MAPS_KEY}
            loadingElement={Loader}
            libraries={config.libraries}
            onLoad={() => setLoading(false)}
          >
            <div className="section-wrap inline" style={{ flex: '0 1 85%', position: 'relative' }}>
              <MapSidebar searchLocation={searchLocation} share={shareLink} />
              <div className="map-wrap">
                {loading ? (
                  <Loader />
                ) : (
                    <GoogleMap
                      mapContainerStyle={config.style}
                      center={origin}
                      zoom={zoom}
                      options={{ styles: darkMode ? mapOptions : null }}
                    >
                      <StandaloneSearchBox types={config.types} onPlaceChanged={() => console.log('chage')} onLoad={searchBox => console.log(searchBox.getPlaces())}>
                        <React.Fragment>
                          <Field value={values?.stop1} id="inside" />
                          <DrawingManager drawingMode={drawingMode} />
                          <Polyline
                            options={{
                              geodesic: true,
                              strokeColor: 'yellow',
                              strokeOpacity: 1.0,
                              strokeWeight: 2,
                            }}
                          />
                          {/* <Marker
                            position={props.currentPosition}
                          /> */}

                        </React.Fragment>
                      </StandaloneSearchBox>
                    </GoogleMap>
                  )}
              </div>
            </div>
          </LoadScript>
        </MapsContext.Provider>
      )}
    </Formik>
  );
};

export const modes = { marker: 'marker', polyline: 'polyline' };

const config = {
  libraries: ['drawing', 'places'],
  style: {
    height: '100%',
    width: '100%',
    flex: 1,
    alignSelf: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  types: ['geocode', 'cities'],
  fields: ['name']
};

const mapOptions = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }]
  }
];