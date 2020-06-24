import React, { useState, useContext } from 'react';
import ReactTooltip from 'react-tooltip';
import { MapsContext } from '../helpers/contexts';

export const Slider = ({handleChange, min, max, val, tip}) => {
    const {mapData, setMapData} = useContext(MapsContext);
    const [value, setValue] = useState(val);

    const adjust = e => {
        let scale = parseInt(e.target.value);
        setValue(e.target.value);
        setMapData({...mapData, zoom: scale});
        if (handleChange) {
            handleChange(e.target.value);
        }
    };

    return (
        <React.Fragment>
            <div className="slidecontainer" data-tip="" data-for="slider">
                <input type="range" min={min} max={max} value={value} className="slider" id="myRange" onChange={adjust}/>
            </div>
            <ReactTooltip className="tooltip" id="slider">{`Zoom (${(value * 100) / 20}%)`}</ReactTooltip>
        </React.Fragment>
    );
}