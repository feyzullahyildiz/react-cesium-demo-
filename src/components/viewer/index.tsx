import React, { useEffect, useRef } from 'react';

export const Viewer: React.FC = (props) => {
    const mapRef = useRef(document.createElement('div'));
    useEffect(() => {
        const viewer = new Cesium.Viewer(
            mapRef.current, {
                // homeButton: false,
            }
        );
        
        return () => {
            viewer.destroy();
        }
    }, []);
    return <div style={{height: '100%'}} ref={mapRef}></div>;
};
