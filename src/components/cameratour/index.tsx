import React, { useContext, useEffect } from 'react';
import { ViewerContext } from '../viewer-context';

export const CameraTour = () => {
    const viewer = useContext(ViewerContext)!;
    useEffect(() => {

        const start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
        const stop = Cesium.JulianDate.addSeconds(
            start,
            13,
            new Cesium.JulianDate()
        );

        //Make sure viewer is at the desired time.
        viewer.clock.startTime = start.clone();
        viewer.clock.stopTime = stop.clone();
        viewer.clock.currentTime = start.clone();
        viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
        viewer.clock.multiplier = 0.8;
        viewer.clock.shouldAnimate = true;

        viewer.timeline.zoomTo(start, stop);

        const positionProperty = new Cesium.SampledPositionProperty();
        const pathArray = [
            {
                position: new Cesium.Cartesian3(4215809.306382088, 2334438.2573994533, 4164271.9552502357),
                timeOffset: 0,
            },
            {
                position: new Cesium.Cartesian3(4215708.942831653, 2334423.6255956814, 4164386.1557259825),
                timeOffset: 8,
            },
            {
                position: new Cesium.Cartesian3(4215685.672611163, 2334418.940918554, 4164412.4950099257),
                timeOffset: 10,
            },
            {
                position: new Cesium.Cartesian3(4215651.85432512, 2334443.3153966856, 4164432.552722568),
                timeOffset: 13,
            },

        ];
        const dotEntityList: any[] = [];
        for (const step of pathArray) {
            const time = Cesium.JulianDate.addSeconds(
                start,
                step.timeOffset,
                new Cesium.JulianDate()
            );

            positionProperty.addSample(time, step.position);
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
            interpolationDegree: 5,
            interpolationAlgorithm:
                Cesium.LagrangePolynomialApproximation,
        });
        const entity = viewer.entities.add({
            availability: new Cesium.TimeIntervalCollection([
                new Cesium.TimeInterval({
                    start: start,
                    stop: stop,
                }),
            ]),
            position: positionProperty,
            // box: {
            //     dimensions: new Cesium.Cartesian3(10, 10, 1),
            //     material: Cesium.Color.RED,
            //     outline: true,
            //     outlineColor: Cesium.Color.BLACK,
            // },
            orientation: new Cesium.VelocityOrientationProperty(positionProperty),
            model: {
                uri: "Cesium_Air.glb",
                minimumPixelSize: 64,
                scale: 0.1
            }
        } as any);

        console.log('entity', entity);
        viewer.trackedEntity = entity;
        return () => {
            (viewer as any).trackedEntity = undefined;
            viewer.entities.remove(entity);
            for (const e of dotEntityList) {
                viewer.entities.remove(e);
            }
        }
    }, []);
    return <div></div>;
};
