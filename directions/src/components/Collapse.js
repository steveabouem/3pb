import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '../common/icons';

export const Collapse = ({...props}) => {
    const [active, toggle] =  useState(true);

    return active ? (
                <React.Fragment>
                    <div className="collapse-icon pointer active">
                        <FontAwesomeIcon icon={icons.faAngleDoubleUp} onClick={() => toggle(!active)} />
                    </div>
                    {props.children}
                </React.Fragment>
            ) : (
                <div className="collapse-icon pointer between">
                    <label>{props.title}</label>
                    <FontAwesomeIcon icon={icons.faAngleDoubleDown} onClick={() => toggle(!active)} />
                </div>
    );
};