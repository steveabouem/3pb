import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons'

export const MapStep = ({...props}) => (
    <div className="step-box" key={`step-${props.title}`}>
        <div className="title">{props.title}</div>
        <div className="body">
            {props.children}
        </div>
        <div className="avatar">
            <FontAwesomeIcon icon={props.icon} size={props.size}/>
        </div>
    </div>
);