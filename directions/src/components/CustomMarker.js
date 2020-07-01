import React, { useContext, useState } from 'react';
import { MapsContext } from '../helpers/contexts';
import { Marker } from '@react-google-maps/api';

export const CustomMarker = () => {
    const { mapData, setMapData } = useContext(MapsContext);

    const addMarkerToMap = () => {
        let markers = mapData.markers;
        markers.push(mapData?.center);
        setMapData({...mapData, markers});
    };

    return (
        <Marker
            onLoad={addMarkerToMap}
            position={mapData?.center}
        />
    );
};