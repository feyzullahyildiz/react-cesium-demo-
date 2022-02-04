import React, { useEffect } from 'react';

interface Props {
    url: string;
}
export const Tileset: React.FC<Props> = (props) => {
    useEffect(() => {
        const tileset = new Cesium.Cesium3DTileset({
            url: props.url
        })
        // viewer.scene.primitives.add(tileset);
    }, []);
    return <div></div>;
};
