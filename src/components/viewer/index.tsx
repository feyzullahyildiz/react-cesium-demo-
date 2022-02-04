import React, { useEffect, useRef, useState } from 'react';
import { ViewerContext } from '../viewer-context';

export const Viewer: React.FC = (props) => {
    const mapRef = useRef(document.createElement('div'));
    const [viewer, setViewer] = useState<Cesium.Viewer | null>(null);

    useEffect(() => {
        const v = new Cesium.Viewer(
            mapRef.current
        );
        (window as any).viewer = v;
        setViewer(v);
        return () => {
            v.destroy();
        }
    }, []);
    return <>
        <div style={{ height: '100%' }} ref={mapRef}></div>
        {
            viewer &&
            <ViewerContext.Provider value={viewer}>
                {props.children}
            </ViewerContext.Provider>
        }
    </>;
};
