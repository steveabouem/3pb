import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DrawingManager, StandaloneSearchBox } from '@react-google-maps/api';
import { Loader } from '../common/Loader';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { locations } from '../helpers/locations';

export const MapMain = () => {
    const [loading, setLoading] = useState(true);
    const [origin, setOrigin] = useState({lat: 5.30966, lng: -4.01266});
    const [destination, setDestination] = useState(null);
    const [zoom, setZoom] = useState(12);
    
    const validations = Yup.object().shape({
        step1: Yup.string().required().min(4)
    });
    
    const initialValues = {
        mapTitle: '',
        step1: ''
    };
    
    const searchLocation = value => {
        // TODO: use the google getPlaces class in the backend to handle this
        let match = locations.find((l) => [l.name].includes(value.toLowerCase()) ? l.coord : null);

        console.log(match);
        
        if (match) {
            setZoom(14);
            setOrigin(match);
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
                <React.Fragment>
                    <LoadScript
                        googleMapsApiKey={process.env.REACT_APP_MAPS_KEY}
                        loadingElement={Loader}
                        libraries={config.libraries}
                        onLoad={() => setLoading(false)}
                    >
                        <div className="section-wrap inline" style={{ flex: '0 0 60%' }}>
                            <div className="sidebar left">
                                <div className="sidebar-column">
                                    <label>Main point of interrest</label>
                                    <div className="sidebar-row">
                                        <Field name="stop1" className={'rounded-field' + (errors.stop1 && touched.stop1 ? ' invalid-field' : '')} onChange={e => {searchLocation(e.target.value); setFieldValue('stop1', e.target.value);}}/>
                                    </div>
                                </div>
                                <div className="sidebar-column">
                                    <label>Additional point of interrest</label>
                                    <div className="sidebar-row">
                                        <Field name="stop2" className={'rounded-field' + (errors.stop2 && touched.stop2 ? ' invalid-field' : '')} />
                                    </div>
                                </div>
                                <div className="sidebar-column">
                                    <div className="sidebar-row center">
                                        Add a new point of interrest  &nbsp;<div className="icon-wrap pointer"><FontAwesomeIcon icon={faPlus} /></div>
                                    </div>
                                </div>
                                <div className="line bottomn" />
                                <div className="sidebar-column">
                                    No additional map yet, go ahead and create one!
                                    </div>
                            </div>
                            <div className="map-wrap">
                                <div className="map-title">
                                    <Field name="mapTitle" className={'title-field' + (errors.mapTitle && touched.mapTitle ? ' invalid-field' : '')} placeholder="Select a map title..." />
                                    &nbsp;
                                    {values.mapTitle && <div className="icon-wrap pointer"><FontAwesomeIcon icon={faCheck}/></div>}
                                </div>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <GoogleMap
                                        mapContainerStyle={config.style}
                                        center={origin}
                                        zoom={zoom}
                                    >
                                        <StandaloneSearchBox types={config.types} onPlaceChanged={() => console.log('chage')} onLoad={searchBox => console.log(searchBox.getPlaces())}>
                                            <React.Fragment>
                                                <Field value={values?.stop1} id="inside"/>
                                                <DrawingManager />
                                            </React.Fragment>
                                        </StandaloneSearchBox>
                                    </GoogleMap>
                                )}
                            </div>
                            <div className="sidebar right">
                                <div className="sidebar-column">
                                    <label>Main point of interrest</label>
                                    <Field name="stop1" className={'rounded-field' + (errors.stop1 && touched.stop1 ? ' invalid-field' : '')} />
                                </div>
                                <div className="sidebar-column">
                                    <label>Additional point of interrest</label>
                                    <Field name="stop2" className={'rounded-field' + (errors.stop2 && touched.stop2 ? ' invalid-field' : '')} />
                                </div>
                                <div className="sidebar-row center">
                                    Add a new point of interrest <FontAwesomeIcon icon={faPlus} />
                                </div>
                                <div className="line bottomn" />
                                <div className="sidebar-column">
                                    No additional map yet, go ahead and create one!
                                    </div>
                            </div>
                        </div>
                    </LoadScript>
                    <div className="section-wrap" style={{ margin: '0 auto', width: '42%' }}>
                        <div className="section-lane between">
                            <div className="button pointer standard" onClick={submitForm}>SAVE MAP</div>
                            <div className="button pointer standard" onClick={shareLink}>SHARE LINK</div>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </Formik>
    );
};

const config = {
    libraries: ['drawing', 'places'],
    style: {
        height: 'auto',
        width: '80%',
        flex: '1',
        alignSelf: 'center'
    },
    types: ['geocode', 'cities'],
    fields: ['name']
}