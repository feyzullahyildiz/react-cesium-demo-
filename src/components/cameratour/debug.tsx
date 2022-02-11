import React, { useContext, useEffect, useState } from 'react'
import { ViewerContext } from '../viewer-context'

const cartesian3ToXYZObj = (c3: Cesium.Cartesian3) => {
    const { x, y, z } = c3;
    return {
        x, y, z
    }
}
const style = {
    position: 'fixed',
    right: 0, top: 0,
    margin: 16,
    padding: 16,
    backgroundColor: '#c3c3c3',
    display: 'flex',
    flexDirection: 'column',
}
interface Point {
    x: number;
    y: number;
    z: number;
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
    initialPoints?: CameraPoint[];
}
export const CameraTourDebug: React.FC<Props> = ({ initialPoints = [] }) => {
    const viewer = useContext(ViewerContext)!;
    const [points, setPoints] = useState<CameraPoint[]>(initialPoints);
    const addPoint = () => {
        const position = cartesian3ToXYZObj(viewer.camera.position.clone());
        const direction = cartesian3ToXYZObj(viewer.camera.direction.clone());
        const up = cartesian3ToXYZObj(viewer.camera.up.clone());
        const { roll, pitch, heading } = viewer.camera;
        setPoints([...points, {
            position, up, direction, roll, pitch, heading, time: 0
        }])
    }
    useEffect(() => {
        const entities = points.map(p => {
            // console.log('h, p, r', p.heading, p.pitch, p.roll);
            const hpr = new Cesium.HeadingPitchRoll(p.heading - (Math.PI / 2), p.pitch, p.roll);
            const orientation = Cesium.Transforms.headingPitchRollQuaternion(
                new Cesium.Cartesian3(p.position.x, p.position.y, p.position.z),
                hpr
            );
            return viewer.entities.add({
                position: p.position,
                orientation: orientation,
                model: {
                    uri: "Cesium_Air.glb",
                    minimumPixelSize: 64,
                    scale: 0.5
                }
            } as any);
        });
        return () => {
            for (const e of entities) {
                viewer.entities.remove(e);
            }
        }
    }, [points]);


    const logPoints = () => {
        console.log(JSON.stringify(points, null, 2));
    }
    return (
        <div style={style as any}>
            CameraTourDebug
            <button onClick={addPoint}>Nokta Ekle</button>
            <button onClick={logPoints}>Log</button>

        </div>
    )
}
