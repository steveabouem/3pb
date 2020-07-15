import React, { useState, useContext } from 'react';
import { useFormikContext, Field } from 'formik';
import { Autocomplete } from '@react-google-maps/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactTooltip from 'react-tooltip';
import { NavLink } from 'react-router-dom';
import { icons } from '../common/icons';
import { MapTitle } from './MapTitle';
import { MapsContext } from '../helpers/contexts';
import { modes } from '../helpers/variables';
import { Slider } from '../common/Slider';
import { Collapse } from './Collapse';

export const MapSidebar = ({ ...props }) => {
    const { values, errors, touched, setFieldValue } = useFormikContext();
    const { setMapData, mapData, userMaps, searchOrigin, searchDestination, setPlacesData, setModal, deleteUserMap } = useContext(MapsContext);
    // const [sidebar, setSidebar] = useState(true);
    const [destination, setDestination] = useState(null);

    // const toggleSideBar = () => setSidebar(!sidebar);

    return (
        <div className="sidebar left">
            <div className="controls-row column">
                <Collapse title={'TRAJET'}>
                    <div className="controls-row-label" >
                        <label>TRAJET</label>
                    </div>
                    <label>Chercher un point de départ/ Point d’intérêt</label>
                    <div className="sidebar-row">
                        <Autocomplete
                            onLoad={ac => setPlacesData(ac)}
                            onPlaceChanged={searchOrigin}
                        >
                            <React.Fragment>
                                <Field value={values?.stop1} className="rounded-field" />
                            </React.Fragment>
                        </Autocomplete>
                    </div>
                    <label>Chercher un point d'arrivée / point d’intérêt</label>
                    <div className="sidebar-row">
                        <Autocomplete
                            onLoad={ac => setDestination(ac)}
                            onPlaceChanged={() => searchDestination(destination)}
                        >
                            <Field value={values?.stop2} className="rounded-field" />
                        </Autocomplete>
                    </div>
                    <label>Titre de la carte</label>
                    <div className="sidebar-row">
                        <MapTitle />
                    </div>
                    <label>Choisir une destination</label>
                    <div className="sidebar-row">
                        <Field
                            name="destination" className={'rounded-field' + (errors.destination && touched.destination ? ' invalid-field' : '')}
                            onChange={e => { props.searchOrigin(e.target.value); setFieldValue('destination', e.target.value); }}
                        />
                    </div>
                    <div className="sidebar-row">
                        <div className="button standard white-bg" onClick={props.submit}>SAUVEGARDER</div>
                    </div>
                </Collapse>
            </div>
            <div className="controls-row">
                <Collapse title="CONTROLES">
                    <div className="controls-row-label" >
                        <label>CONTROLES</label>
                    </div>
                    <FontAwesomeIcon
                        icon={icons.faMapMarkedAlt} data-tip="" data-for="type-marker"
                        className={'icon pointer' + (mapData?.drawingMode === modes.marker ? ' red active' : '')}
                        onClick={() => setMapData({ ...mapData, drawingMode: modes.marker })}
                    />
                    <FontAwesomeIcon
                        icon={icons.faDraftingCompass} data-tip="" data-for="type-polyline" className={'icon pointer' + (mapData?.drawingMode === modes.polyline ? ' red active' : '')}
                        onClick={() => setMapData({ ...mapData, drawingMode: modes.polyline })}
                    />
                    <FontAwesomeIcon
                        icon={icons.faHandPointer} data-tip="" data-for="type-default"
                        className={'icon pointer' + (!mapData?.drawingMode ? ' red active' : '')} onClick={() => setMapData({ ...mapData, drawingMode: null })}
                    />
                    <FontAwesomeIcon
                        icon={icons.faMoon} data-tip="" data-for="dark-mode" className={'icon pointer' + (mapData?.darkMode ? ' red active' : '')}
                        onClick={() => setMapData({ ...mapData, darkMode: !mapData?.darkMode })}
                    />
                    <Slider min="1" max="20" val={mapData.zoom} tip="Zoom" />

                    <ReactTooltip className="tooltip" id="type-marker">{mapData?.drawingMode === modes.marker ? 'Mode marqueur' : 'Ajouter un marqueur'}</ReactTooltip>
                    <ReactTooltip className="tooltip" id="type-polyline">{mapData?.drawingMode === modes.polyline ? 'Mode dessin' : 'Dessiner un trajet'}</ReactTooltip>
                    <ReactTooltip className="tooltip" id="type-default">{mapData?.drawingMode ? 'Pointeur actif' : 'Activer pointeur'}</ReactTooltip>
                    <ReactTooltip className="tooltip" id="dark-mode">{mapData?.darkMode ? 'Mode clair' : 'Mode sombre'}</ReactTooltip>
                </Collapse>
            </div>
            <div className="controls-row column">
                <Collapse title="MES CARTES">
                    <div className="controls-row-label">
                        <label>MES CARTES</label>
                    </div>
                    {userMaps && userMaps.length ? userMaps.map((m, i) => (
                        <div className="sidebar-row" key={`map-item-${i}`}>
                            <div>{m?.title || 'Sans titre'}</div>
                            <div className="between">
                                <NavLink to={`/map/${m?.id}`} onClick={() => setMapData(m)} className="map-item" activeClassName="active">
                                    <FontAwesomeIcon icon={icons.faEye} />
                                </NavLink>
                                <FontAwesomeIcon
                                    icon={icons.faTrashAlt} className="map-item pointer flex"
                                    onClick={() => setModal({ opened: true, type: 'delete', action: deleteUserMap, id: m.id})}
                                />
                            </div>
                        </div>
                    )) : 'Aucune carte'}
                </Collapse>
            </div>
        </div>
    );
};