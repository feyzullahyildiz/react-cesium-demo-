import React, { useContext, useEffect } from 'react';
import { ViewerContext } from '../viewer-context';

interface Props {
    // position: number[];
    position: Cesium.Cartesian3;
    dimensions: Cesium.Cartesian3;
    color: Cesium.Color;

}
export const BoxEntity: React.FC<Props> = ({ position, dimensions, color, ...props }) => {
    const viewer = useContext(ViewerContext)!;
    // console.log('BoxEntity propslar güncellendi')
    useEffect(() => {
        const box = viewer.entities.add({
            position,
            box: {
                dimensions,
                material: color,
                outline: true,
                outlineColor: Cesium.Color.BLACK,
            },
        } as any);
        // console.log('yeni entity')
        return () => {
            // console.log('eski entity öldü')
            viewer.entities.remove(box);
        }
    }, [viewer, color, dimensions, position])
    return null;
};
