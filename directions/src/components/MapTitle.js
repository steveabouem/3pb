import React, { useState } from 'react';
import { useFormikContext, Field } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '../common/icons';
import ReactTooltip from 'react-tooltip';

export const MapTitle = ({ title, save }) => {
    const { values, errors, touched } = useFormikContext();
    const [active, setActive] = useState(true);
    
    const toggleTitle = () => {
        setActive(!active);
    };

    return active ? (
        <React.Fragment>
            <Field name="mapTitle" className={'rounded-field' + (errors.mapTitle && touched.mapTitle ? ' invalid-field' : '')}/>
            {values.mapTitle && <FontAwesomeIcon className="icon pointer" icon={icons.faCheck} onClick={toggleTitle} data-tip="" data-for="confirm-title"/>}
            <ReactTooltip className="tooltip"  id="confirm-title" textColor="white" backgroundColor="#27ccc0">Confirm</ReactTooltip>
        </React.Fragment>
    ) : (
        <React.Fragment>
            {values?.mapTitle}
            <FontAwesomeIcon className="icon pointer" onClick={toggleTitle} icon={icons.faPencilAlt} data-tip="" data-for="edit-title"/>
            <ReactTooltip className="tooltip"  id="edit-title" textColor="white" backgroundColor="#27ccc0">Confirm</ReactTooltip>
        </React.Fragment>
    );
}