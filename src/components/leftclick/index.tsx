import React, { useContext, useEffect } from "react"
import { ViewerContext } from "../viewer-context"

interface Props {
	logKey: string
	onPick?: (c3: Cesium.Cartesian3) => void
}
export const LeftClient: React.FC<Props> = ({ logKey, onPick }) => {
	const viewer = useContext(ViewerContext)!

	// useEffect(() => {
	//      // HATALI UYGUN OLMAYAN ÇÖZÜM
	//     console.log(logKey, 'INIT')
	//     viewer.screenSpaceEventHandler.setInputAction((event) => {
	//         console.log(logKey, 'position', event.position)
	//     }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

	//     return () => {
	//         console.log(logKey, 'Destruction')
	//         viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
	//     }

	// }, []);
	useEffect(() => {
		// console.log(logKey, 'INIT')
		const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)

		handler.setInputAction((event) => {
			// console.log(logKey, 'position', event.position)
			//const c3 = viewer.scene.pickPosition(event.position);
			const c3 = viewer.camera.pickEllipsoid(event.position)
			const carto = Cesium.Cartographic.fromCartesian(c3)
			//console.log("carto.height", carto.height)
			if (onPick) {
				onPick(c3)
			}
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK)

		return () => {
			// console.log(logKey, 'Destruction');
			handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
			handler.destroy()
		}
	}, [onPick])

	return null
}
