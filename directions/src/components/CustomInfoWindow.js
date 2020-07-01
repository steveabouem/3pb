import React, { useContext } from 'react';
import { MapsContext } from '../helpers/contexts';
import { InfoWindow } from '@react-google-maps/api';

export const CustomInfoWindow = () => {
    const { mapData, setCustomInfo, addMarker } = useContext(MapsContext);

    const markerConsent = () => {
        const infoMarker = {position: mapData.center};

        addMarker(infoMarker);
        setCustomInfo({info: false})
    };

    return (
        <InfoWindow
            position={mapData?.center}
        >
            <div className="custom-info-window">
                <div className="c-i-w-content">
                    <p>Ajouter un marqueur <b>ici?</b></p>
                    <div className="between">
                        <div className="button small" onClick={markerConsent}>OUI</div>
                        <div className="button small" onClick={() => setCustomInfo({info: false})}>NON</div>
                    </div>
                </div>
            </div>
        </InfoWindow>
    );
};