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
    const { values, errors, touched, setFieldValue, submitForm } = useFormikContext();
    const { drawingMode, setDrawingMode, darkMode, setDarkMode, destination, setDestination, zoom, setZoom } = useContext(MapsContext);
    const [active, setActive] = useState(false);

    const toggleSidebar = () => {
        setActive(!active);
    };
    
    return (
        <div className="sidebar left">
            <div className="controls-row">
                <div className="controls-row-label" >
                    <label>CONTROLES</label>
                </div>
                <FontAwesomeIcon icon={icons.faMapMarkedAlt} data-tip="" data-for="type-marker" className={'icon pointer' + (drawingMode === modes.marker ? ' active' : '')} onClick={() =>setDrawingMode(modes.marker)}/>
                <FontAwesomeIcon icon={icons.faDraftingCompass} data-tip="" data-for="type-polyline" className={'icon pointer' + (drawingMode === modes.polyline ? ' active' : '')} onClick={() =>setDrawingMode(modes.polyline)}/>
                <FontAwesomeIcon icon={icons.faHandPointer} data-tip="" data-for="type-default" className={'icon pointer' + (!drawingMode ? ' active' : '')} onClick={() =>setDrawingMode(null)}/>
                <FontAwesomeIcon icon={icons.faMoon} data-tip="" data-for="dark-mode" className={'icon pointer' + (darkMode ? ' active' : '')} onClick={() =>setDarkMode(!darkMode)}/>
                <FontAwesomeIcon icon={active ? icons.faCompressAlt : icons.faExpandAlt} data-tip="" data-for="expand-tip" className="icon pointer" onClick={toggleSidebar} />
                <Slider min="1" max="20" val="12" tip="Zoom"/>

                <ReactTooltip className="tooltip" id="type-marker">{ drawingMode === modes.marker ? 'Mode marqueur' : 'Ajouter un marqueur'}</ReactTooltip>
                <ReactTooltip className="tooltip" id="type-polyline">{ drawingMode === modes.polyline ? 'Mode dessin' : 'Dessiner un trajet'}</ReactTooltip>
                <ReactTooltip className="tooltip" id="type-default">{ drawingMode ? 'Pointeur actif' : 'Activer pointeur'}</ReactTooltip>
                <ReactTooltip className="tooltip" id="dark-mode">{ darkMode ? 'Light map' : 'Dark map'}</ReactTooltip>
                <ReactTooltip className="tooltip" id="expand-tip">{!active ? 'Options' : 'Collapse'}</ReactTooltip>
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
                    <Field name="departure" className={'rounded-field' + (errors.departure && touched.departure ? ' invalid-field' : '')} onChange={e => { props.searchLocation(e.target.value); setFieldValue('departure', e.target.value); }}/>
                </div>
            </div>
            {/* <div className="controls-row">
                <div className="sidebar-row center">
                    Choisir une destination  &nbsp;<div className="icon-wrap pointer"><FontAwesomeIcon icon={icons.faPlus}/></div>
                </div>
            </div> */}
            {/* <div className="line bottomn" /> */}
            {/* <div className="controls-row"> */}
            <div className="button standard white-bg" onClick={submitForm}>SAUVEGARDER</div>
            {/* </div> */}
        </div>
    );
};

