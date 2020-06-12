import React, { useState, useContext } from 'react';
import { useFormikContext, Field } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '../common/icons';
import ReactTooltip from 'react-tooltip';
import { MapTitle } from './MapTitle';
import { MapsContext } from '../helpers/contexts';

export const MapSidebar = ({ ...props }) => {
    const { values, errors, touched, setFieldValue } = useFormikContext();
    const { drawingMode, setDrawingMode, darkMode, setDarkMode, destination, setDestination } = useContext(MapsContext);
    const [active, setActive] = useState(false);

    const toggleSidebar = () => {
        setActive(!active);
    };

    return (
        <div className={'sidebar left' + (!active ? ' collapsed' : '')}>
            <div className="controls-row" >
                <FontAwesomeIcon icon={active ? icons.faCompressAlt : icons.faExpandAlt} data-tip="" data-for="expand-tip" className="icon pointer" onClick={toggleSidebar} />
                <ReactTooltip className="tooltip" id="expand-tip">{!active ? 'Options' : 'Collapse'}</ReactTooltip>
            </div>
            {active && (
                <React.Fragment>
                    <label>Controls</label>
                    <div className="controls-row" >
                        <FontAwesomeIcon icon={icons.faMapMarkedAlt} data-tip="" data-for="type-marker" className={'icon pointer' + (drawingMode === modes.marker ? ' active' : '')} onClick={() =>setDrawingMode(modes.marker)}/>
                        <FontAwesomeIcon icon={icons.faDraftingCompass} data-tip="" data-for="type-polyline" className={'icon pointer' + (drawingMode === modes.polyline ? ' active' : '')} onClick={() =>setDrawingMode(modes.polyline)}/>
                        <FontAwesomeIcon icon={icons.faHandPointer} data-tip="" data-for="type-default" className={'icon pointer' + (!drawingMode ? ' active' : '')} onClick={() =>setDrawingMode(null)}/>
                        <FontAwesomeIcon icon={icons.faMoon} data-tip="" data-for="dark-mode" className={'icon pointer' + (darkMode ? ' active' : '')} onClick={() =>setDarkMode(!darkMode)}/>

                        <ReactTooltip className="tooltip" id="type-marker">{ drawingMode === modes.marker ? 'Markers enabled' : 'Enable markers'}</ReactTooltip>
                        <ReactTooltip className="tooltip" id="type-polyline">{ drawingMode === modes.polyline ? 'Drawing enabled' : 'Enable drawing'}</ReactTooltip>
                        <ReactTooltip className="tooltip" id="type-default">{ drawingMode ? 'Enable pointer' : 'Pointer enabled'}</ReactTooltip>
                        <ReactTooltip className="tooltip" id="dark-mode">{ darkMode ? 'Light map' : 'Dark map'}</ReactTooltip>
                    </div>
                    <div className="sidebar-column">
                        <label>Name your map</label>
                        <div className="sidebar-row">
                            <MapTitle />
                        </div>
                    </div>
                    <div className="sidebar-column">
                        <label>Main point of interrest</label>
                        <div className="sidebar-row">
                            <Field name="departure" className={'rounded-field' + (errors.departure && touched.departure ? ' invalid-field' : '')} onChange={e => { props.searchLocation(e.target.value); setFieldValue('departure', e.target.value); }}/>
                        </div>
                    </div>
                    <div className="sidebar-column">
                        <label>Additional point of interrest</label>
                        <div className="sidebar-row">
                            <Field name="arrival" className={'rounded-field' + (errors.arrival && touched.arrival ? ' invalid-field' : '')}/>
                        </div>
                    </div>
                    <div className="sidebar-column">
                        <div className="sidebar-row center">
                            Add a new point of interrest  &nbsp;<div className="icon-wrap pointer"><FontAwesomeIcon icon={icons.faPlus}/></div>
                        </div>
                    </div>
                    <div className="line bottomn" />
                    <div className="sidebar-column">
                        No additional map yet, go ahead and create one!
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

const modes = {marker:'marker', polyline:'polyline'};