import React from 'react';

export const MapStep = ({...props}) => (
    <div className="step-box" key={`step-${props.title}`}>
        <div className="avatar">
            {props.step}
        </div>
        <div className="title">{props.title}</div>
        <div className="body">
            {props.children}
        </div>
    </div>
);