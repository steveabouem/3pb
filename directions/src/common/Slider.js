import React, { useState, useContext } from 'react';
import ReactTooltip from 'react-tooltip';
import { MapsContext } from '../helpers/contexts';

export const Slider = ({handleChange, min, max, val, tip}) => {
    const {zoom, setZoom} = useContext(MapsContext);
    const [value, setValue] = useState(val);

    const change = e => {
        let scale = parseInt(e.target.value);
        setValue(e.target.value);
        setZoom(scale);
        if (handleChange) {
            handleChange(e.target.value);
        }
    };

    return (
        <React.Fragment>
            <div className="slidecontainer" data-tip="" data-for="slider">
                <input type="range" min={min} max={max} value={value} className="slider" id="myRange" onChange={change}/>
            </div>
            <ReactTooltip className="tooltip" id="slider">{tip}</ReactTooltip>
        </React.Fragment>
    );
}