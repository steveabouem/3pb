import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, LoadScript, DrawingManager, StandaloneSearchBox, Autocomplete, Polyline, Data } from '@react-google-maps/api';
import { Loader } from '../common/Loader';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { MapSidebar } from './MapSidebar';
import { MapsContext } from '../helpers/contexts';
import { createMap } from '../helpers/api';
import { Modal } from '../common/Modals';

export const MapMain = () => {
  const [loading, setLoading] = useState(true);
  const [mapData, setMapData] = useState({ center: {lat: 5.30966, lng: -4.01266}, zoom: 13, drawingMode: null, darkMode: false});
  const [placesData, setPlacesData] = useState({});
  const [modalType, setModalType] = useState(null);

  const validations = Yup.object().shape({
    step1: Yup.string().required().min(4)
  });

  const initialValues = {
    mapTitle: '',
    step1: ''
  };

  const searchLocation = () => {
    let result = placesData?.getPlace().geometry.location;
    setMapData({...mapData, center: {lat: result.lat() , lng: result.lng()}});
  };

  const shareLink = () => {
  };

  const submit = () => {
    setLoading(true);
    createMap(mapData)
      .then(res => {
        setLoading(false);
        setModalType('success');
      })
      .catch(e => {
        setLoading(false);
        setModalType('error');
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={() => setModalType('confirm')}
    >
      {({ values, errors, touched, isValid, submitForm, setFieldValue }) => (
        <MapsContext.Provider value={{ mapData, setMapData }}>
          <LoadScript
            googleMapsApiKey="AIzaSyBcy57cjOpe23IqdeOr1apjP--uab3S5Hg"
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
                  <React.Fragment>
                    {modalType && (
                      <Modal modalType={modalType} cancel={() =>setModalType(null)} confirm={submit}/>
                    )}
                    <GoogleMap
                      mapContainerStyle={{'height': '70px', 'width': '370px', 'position': 'absolute', 'left': '1%', 'top': '1%'}}
                      center={mapData.center}
                      zoom={mapData.zoom}
                      options={{ styles: mapData.darkMode ? mapOptions : null }}
                    >
                      <Autocomplete 
                        onLoad={ac => setPlacesData(ac)}
                        onPlaceChanged={searchLocation}
                      >
                        <React.Fragment>
                          <Field value={values?.stop1} id="autocomplete-field" placeholder="Chercher un point de départ"/>
                        </React.Fragment>
                      </Autocomplete>
                    </GoogleMap>
                    <GoogleMap
                       mapContainerStyle={config.style}
                       center={mapData.center}
                       zoom={mapData.zoom}
                       options={{ styles: mapData.darkMode ? mapOptions : null }}
                    >
                       <DrawingManager 
                            options={{
                              drawingMode: mapData.drawingMode,
                              polylineOptions: {
                                controls: ['Point', 'LineString', 'Polygon'],
                                fillColor: "red",
                                strokeColor: 'purple',
                                strokeOpacity: 1,
                                strokeWeight: 5
                              }
                            }}
                            onPolylineComplete={polyline => setMapData({...mapData, polyline})}
                        />
                    </GoogleMap>
                  </React.Fragment>
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