import React, { useEffect, useRef, useState } from 'react';
import { ViewerContext } from '../viewer-context';

export const Viewer: React.FC = (props) => {
    const mapRef = useRef(document.createElement('div'));
    const [viewer, setViewer] = useState<Cesium.Viewer | null>(null);

    useEffect(() => {
        const v = new Cesium.Viewer(
            mapRef.current, {
                animation: true,
                homeButton: false,
                navigationHelpButton: false,
                infoBox: false,
                geocoder: false,
                baseLayerPicker: false,
                sceneModePicker: false,
                fullscreenButton: false,
                selectionIndicator: false,
                timeline: false,
                navigationInstructionsInitiallyVisible: false,
                imageryProvider: new Cesium.UrlTemplateImageryProvider({
                    url: 'https://mt3.google.com/vt/lyrs=s@113&hl=tr&x={x}&y={y}&z={z}',
                    maximumLevel: 22,
                    minimumLevel: 1
                })
            }
        );
        v.clock.shouldAnimate = true;
        // (v as any)._cesiumWidget._creditContainer.style.display = "none";
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
