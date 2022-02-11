import React, { useContext, useEffect } from 'react';
import { ViewerContext } from '../viewer-context';

const getCartesianFromXYZObj = (obj: any) => {
    return new Cesium.Cartesian3(obj.x, obj.y, obj.z)
}

interface Point {
    x: number, y: number, z: number
}
interface CameraPoint {
    position: Point;
    direction: Point;
    up: Point;
    heading: number
    roll: number
    pitch: number
    time: number
}
interface Props {
    points: CameraPoint[]
}
export const CameraTour: React.FC<Props> = ({ points }) => {
    const viewer = useContext(ViewerContext)!;
    useEffect(() => {
        const totalTime = points.reduce((a, b) => a + b.time, 5);
        const start = Cesium.JulianDate.fromDate(new Date(2022, 2, 25, 16));
        const stop = Cesium.JulianDate.addSeconds(
            start,
            totalTime,
            new Cesium.JulianDate()
        );

        //Make sure viewer is at the desired time.
        viewer.clock.startTime = start.clone();
        viewer.clock.stopTime = stop.clone();
        viewer.clock.currentTime = start.clone();
        viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
        viewer.clock.multiplier = 1.8;
        viewer.clock.shouldAnimate = true;

        viewer.timeline.zoomTo(start, stop);

        const positionProperty = new Cesium.SampledPositionProperty();
        const directionProperty = new Cesium.SampledPositionProperty();
        const upProperty = new Cesium.SampledPositionProperty();


        const dotEntityList: any[] = [];
        let i = 0;
        for (const step of points) {
            const extraTime = i + step.time;
            console.log('extraTime', extraTime);
            const time = Cesium.JulianDate.addSeconds(
                start,
                extraTime,
                new Cesium.JulianDate()
            );

            i += step.time;

            positionProperty.addSample(time, getCartesianFromXYZObj(step.position));
            directionProperty.addSample(time, getCartesianFromXYZObj(step.direction));
            upProperty.addSample(time, getCartesianFromXYZObj(step.up));
            const e = viewer.entities.add({
                position: step.position,
                box: {
                    dimensions: new Cesium.Cartesian3(1, 1, 1),
                    material: Cesium.Color.YELLOW,
                    outline: true,
                    outlineColor: Cesium.Color.BLACK,
                },
            } as any);
            dotEntityList.push(e);
        }
        positionProperty.setInterpolationOptions({
            interpolationDegree: 1,
            interpolationAlgorithm: Cesium.LagrangePolynomialApproximation,
        });
        directionProperty.setInterpolationOptions({
            interpolationDegree: 0.01,
            interpolationAlgorithm: Cesium.HermitePolynomialApproximation,
        });
        upProperty.setInterpolationOptions({
            interpolationDegree: 0.01,
            interpolationAlgorithm: Cesium.HermitePolynomialApproximation,
        });
        // const orientation = new Cesium.VelocityOrientationProperty(positionProperty);
        const rmCallback = viewer.scene.preRender.addEventListener((scene, time) => {
            const position = positionProperty.getValue(time) as Cesium.Cartesian3;
            const direction = directionProperty.getValue(time) as Cesium.Cartesian3;
            const up = upProperty.getValue(time) as Cesium.Cartesian3;
            if (Cesium.defined(position)) {
                viewer.camera.position = position.clone();
            }
            if (Cesium.defined(direction)) {
                viewer.camera.direction = direction.clone();
            }
            if (Cesium.defined(up)) {
                viewer.camera.up = up.clone();
            }


        })
        return () => {
            // (viewer as any).trackedEntity = undefined;
            // viewer.entities.remove(entity);
            viewer.scene.preRender.removeEventListener(rmCallback);
            for (const e of dotEntityList) {
                viewer.entities.remove(e);
            }
        }
    }, []);
    return <div></div>;
};
