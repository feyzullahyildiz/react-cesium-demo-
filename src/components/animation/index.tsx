import React, { useEffect, useContext } from "react";
import { ViewerContext } from "../viewer-context";

const coords = [
  [28.977063, 41.021063, 0],
  [28.978506, 41.020321, 0],
  [28.981554, 41.020713, 0],
  [28.985245, 41.021665, 0],
  [28.986549, 41.023025, 0],
  [28.984847, 41.025316, 0],
  [28.981671, 41.024035, 0],
  [28.979477, 41.022723, 0],
  [28.978641, 41.022217, 0],
  [28.978097, 41.021933, 0],
  [28.977494, 41.021587, 0],
  [28.977239, 41.021335, 0],
  [28.977172, 41.021274, 0],

  [28.977063, 41.021050, 0],
] as [number, number, number][];
interface Props {
  startTimeOffset: number;
}
export const AnimationComponent: React.FC<Props> = (props) => {
  const viewer = useContext(ViewerContext);
  useEffect(() => {
    const startTimeOffset = props.startTimeOffset;
    const timeoffset = 2;

    const start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
    const stop = Cesium.JulianDate.addSeconds(
      start,
      (coords.length - 1) * timeoffset,
      new Cesium.JulianDate()
    );

    const timeBasePosition = new Cesium.SampledPositionProperty();

    for (let i = 0; i < coords.length; i++) {
      const element = coords[i];

      const time = Cesium.JulianDate.addSeconds(
        start,
        timeoffset * i,
        new Cesium.JulianDate()
      );

      timeBasePosition.addSample(
        time,
        Cesium.Cartesian3.fromDegrees(...element)
      );
    }

    const position = new Cesium.Cartesian3(0, 0, 0);
    const orientation = new Cesium.Quaternion(0, 0, 0, 0);

    timeBasePosition.setInterpolationOptions({
      interpolationDegree: 5,
      interpolationAlgorithm: Cesium.LagrangePolynomialApproximation,
    });
    const timeBaseOrientation = new Cesium.VelocityOrientationProperty(
      timeBasePosition
    );

    const entity = viewer.entities.add({
      position,

      orientation,
      //Load the Cesium plane model to represent the entity
      model: {
        uri: "boat.glb",
      },

      //Show the path as a pink line sampled in 1 second increments.
      //   path: {
      //   	resolution: 1,
      //   	material: new Cesium.PolylineGlowMaterialProperty({
      //   		glowPower: 0.1,
      //   		color: Cesium.Color.YELLOW,
      //   	} as any),
      //   	width: 10,
      //   },
    } as any);
    const tempTime = Cesium.JulianDate.fromDate(new Date());
    const totalTime = Cesium.JulianDate.secondsDifference(stop, start);
    
    const orjClockStartTime = viewer.clock.currentTime.clone();
    const renderCbFunction = viewer.scene.preRender.addEventListener(() => {
      const current = viewer.clock.currentTime;
      const diff = Cesium.JulianDate.secondsDifference(
        current,
        orjClockStartTime
      );
      const diffOffset = (diff + startTimeOffset) % totalTime;
      Cesium.JulianDate.addSeconds(start, diffOffset, tempTime);

      const newPosition = timeBasePosition.getValue(tempTime);
      (entity.position as any).setValue(newPosition);

      const newOrientation = timeBaseOrientation.getValue(
        tempTime,
        orientation
      );
      (entity.orientation as any).setValue(newOrientation);

    });
    return () => {
      viewer.entities.remove(entity);
      viewer.scene.preRender.removeEventListener(renderCbFunction);
      //Cesium.cancelAnimationFrame(animationFrameId)
    };
  }, []);

  return null;
};
