import React, { useState, useContext } from 'react';
import { useFormikContext, Field } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '../common/icons';
import ReactTooltip from 'react-tooltip';
import { MapTitle } from './MapTitle';
import { MapsContext } from '../helpers/contexts';
import { modes } from './MapMain';
import { Slider } from '../common/Slider';

export const MapSidebar = ({ ...props }) => {
    const { values, errors, touched, setFieldValue } = useFormikContext();
    const { setMapData, mapData } = useContext(MapsContext);
    
    return (
        <div className="sidebar left">
            <div className="controls-row">
                <div className="controls-row-label" >
                    <label>CONTROLES</label>
                </div>
                <FontAwesomeIcon 
                    icon={icons.faMapMarkedAlt} data-tip="" data-for="type-marker" 
                    className={'icon pointer' + (mapData.drawingMode === modes.marker ? ' active' : '')} 
                    onClick={() =>setMapData({...mapData, drawingMode: modes.marker})}
                />
                <FontAwesomeIcon 
                    icon={icons.faDraftingCompass} data-tip="" data-for="type-polyline" className={'icon pointer' + (mapData.drawingMode === modes.polyline ? ' active' : '')}
                    onClick={() =>setMapData({...mapData, drawingMode: modes.polyline})}
                />
                <FontAwesomeIcon 
                    icon={icons.faHandPointer} data-tip="" data-for="type-default" 
                    className={'icon pointer' + (!mapData.drawingMode ? ' active' : '')} onClick={() =>setMapData(null)}
                />
                <FontAwesomeIcon 
                    icon={icons.faMoon} data-tip="" data-for="dark-mode" className={'icon pointer' + (mapData.darkode ? ' active' : '')} 
                    onClick={() =>setMapData({...mapData, darkMode: !mapData.darkMode})}
                />
                <Slider min="1" max="20" val="12" tip="Zoom"/>

                <ReactTooltip className="tooltip" id="type-marker">{ mapData.drawingMode === modes.marker ? 'Mode marqueur' : 'Ajouter un marqueur'}</ReactTooltip>
                <ReactTooltip className="tooltip" id="type-polyline">{ mapData.drawingMode === modes.polyline ? 'Mode dessin' : 'Dessiner un trajet'}</ReactTooltip>
                <ReactTooltip className="tooltip" id="type-default">{ mapData.drawingMode ? 'Pointeur actif' : 'Activer pointeur'}</ReactTooltip>
                <ReactTooltip className="tooltip" id="dark-mode">{ mapData.darkMode ? 'Mode clair' : 'Mode sombre'}</ReactTooltip>
            </div>
            <div className="controls-row column">
                <div className="controls-row-label" >
                    <label>INFOS</label>
                </div>
                <label>Titre de la carte</label>
                <div className="sidebar-row">
                    <MapTitle />
                </div>
                <label>Choisir une destination</label>
                <div className="sidebar-row">
                    <Field 
                        name="destination" className={'rounded-field' + (errors.destination && touched.destination ? ' invalid-field' : '')} 
                        onChange={e => { props.searchLocation(e.target.value); setFieldValue('destination', e.target.value); }}
                    />
                </div>
            </div>
            <div className="button standard white-bg" onClick={props.submit}>SAUVEGARDER</div>
        </div>
    );
};

