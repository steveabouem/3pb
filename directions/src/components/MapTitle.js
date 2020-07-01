import React, { useState, useContext } from 'react';
import { useFormikContext, Field } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '../common/icons';
import ReactTooltip from 'react-tooltip';
import { MapsContext } from '../helpers/contexts';

export const MapTitle = () => {
    const {values, errors, touched} = useFormikContext();
    const {mapData, setMapData} =useContext(MapsContext);
    const [active, setActive] = useState(true);
    
    const toggleTitle = () => {
        if (active) {
            setMapData({...mapData, title: values.mapTitle});
        }
        setActive(!active);
    };

    return active ? (
        <React.Fragment>
            <Field name="mapTitle" className={'rounded-field' + (errors.mapTitle && touched.mapTitle ? ' invalid-field' : '')} value={mapData?.title}/>
            {values.mapTitle && <FontAwesomeIcon className="icon pointer" icon={icons.faCheck} onClick={toggleTitle} data-tip="" data-for="confirm-title"/>}
            <ReactTooltip className="tooltip"  id="confirm-title" textColor="white" backgroundColor="#27ccc0">Confirmer</ReactTooltip>
        </React.Fragment>
    ) : (
        <React.Fragment>
            <label className="strong between flex black">{mapData?.title || ''}</label>
            <FontAwesomeIcon className="icon pointer" onClick={toggleTitle} icon={icons.faPencilAlt} data-tip="" data-for="edit-title"/>
            <ReactTooltip className="tooltip"  id="edit-title" textColor="white" backgroundColor="#27ccc0">Confirmer</ReactTooltip>
        </React.Fragment>
    );
}