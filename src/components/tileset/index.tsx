import React, { useContext, useEffect, useRef } from 'react';
import { ViewerContext } from '../viewer-context';

interface Props {
    url: string;
    visible?: boolean;
    autoZoom?: boolean;
}
export const Tileset: React.FC<Props> = ({ url, visible = true, autoZoom = false, ...props }) => {
    const viewer = useContext(ViewerContext);
    const tileset = useRef<Cesium.Cesium3DTileset | null>(null);
    // console.log('viewer from tileset', viewer);
    // console.log('props.url', props.url);
    useEffect(() => {
        const t = new Cesium.Cesium3DTileset({
            url
        });
        // (t as any).show = visible;
        tileset.current = t;
        // console.log('tileset oluştu');
        viewer!.scene.primitives.add(t);
        return () => {
            // console.log('eski tileset öldü')
            viewer!.scene.primitives.remove(t);
        }
    }, [viewer, url]);
    useEffect(() => {
        if(autoZoom) {
            const t = tileset.current! as any;
            viewer!.zoomTo(t);
        }
    }, [autoZoom]);

    useEffect(() => {
        const t = tileset.current! as any;
        t.show = visible;
        // console.log('visible değişti');
    }, [visible]);
    return <div></div>;
};
