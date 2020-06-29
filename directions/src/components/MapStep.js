import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const MapStep = ({...props}) => (
    <div className={'step-box' + (props.right ? ' right' : '')} key={`step-${props.title}`}>
        <div className="title">{props.title}</div>
        <div className="body">
            {props.children}
        </div>
        <div className="avatar">
            <FontAwesomeIcon icon={props.icon} size={props.size} color="#27ccc0"/>
        </div>
    </div>
);