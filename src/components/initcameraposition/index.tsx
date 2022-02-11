import React, { useContext, useEffect } from 'react'
import { ViewerContext } from '../viewer-context';

interface Props {
    position: Cesium.Cartesian3;
    direction: Cesium.Cartesian3;
    up: Cesium.Cartesian3;

}
export const InitCameraPosition: React.FC<Props> = ({position, direction, up}) => {
    const viewer = useContext(ViewerContext)!;
    useEffect(() => {
        viewer.camera.position = position;
        viewer.camera.direction = direction;
        viewer.camera.up = up;
    }, []);

    return null;
}
