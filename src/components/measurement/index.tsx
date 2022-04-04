import React, { useContext, useEffect, useState } from "react"
import { ViewerContext } from "../viewer-context"

interface Props {
	onPick?: (c3: Cesium.Cartesian3) => void
}
export const Measurement: React.FC<Props> = ({ onPick }) => {
	const viewer = useContext(ViewerContext)!
	const [pointArray, setPointArray] = useState<Cesium.Cartesian3[]>([])

	useEffect(() => {
		const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)

		handler.setInputAction((event) => {
			let c3 = viewer.scene.pickPosition(event.position)
			let c3Heigth = Cesium.Cartographic.fromCartesian(c3).height
			if (c3Heigth < 0) {
				c3 = viewer.camera.pickEllipsoid(event.position)
				c3Heigth = Cesium.Cartographic.fromCartesian(c3).height
				const globeHeight = viewer.scene.globe.getHeight(
					Cesium.Cartographic.fromCartesian(c3)
				)
				if (c3Heigth < globeHeight) {
					const { height, longitude, latitude } = Cesium.Cartographic.fromCartesian(c3)
					c3 = Cesium.Cartesian3.fromRadians(longitude, latitude, globeHeight)
				}
			}

			const { longitude, latitude, height } = Cesium.Cartographic.fromCartesian(c3)
			console.log("height", height)
			// console.log("longitude, latitude, height", longitude, latitude, height)
			const c3OffsetZ = Cesium.Cartesian3.fromRadians(longitude, latitude, height + 0.1)
			//const c3OffsetZ = c3.clone()

			setPointArray([...pointArray, c3OffsetZ])
			console.log(pointArray)
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK)

		handler.setInputAction(() => {
			const newArray = pointArray.concat()
			newArray.pop()
			setPointArray(newArray)
		}, Cesium.ScreenSpaceEventType.RIGHT_CLICK)

		return () => {
			// console.log(logKey, 'Destruction');
			handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
			handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
			handler.destroy()
		}
	}, [pointArray])

	useEffect(() => {
		// console.log("pointArray", pointArray)

		// for (const p of pointArray) {
		// 	const carto = Cesium.Cartographic.fromCartesian(p)
		// 	const h = viewer.scene.globe.getHeight(carto)
		// 	console.log("carto height, h", carto.height, h)
		// }
		const entityArray = pointArray.map((p) => {
			return viewer.entities.add({
				position: p,
				ellipsoid: {
					radii: new Cesium.Cartesian3(0.5, 0.5, 0.5),
					material: Cesium.Color.YELLOW,
				},
			} as any)
		})
		return () => {
			for (const e of entityArray) {
				viewer.entities.remove(e)
			}
		}
	}, [pointArray])

	useEffect(() => {
		if (pointArray.length < 2) {
			return () => {}
		}
		const polyline = viewer.entities.add({
			polyline: {
				positions: [...pointArray],
				width: 2,
				material: new Cesium.PolylineOutlineMaterialProperty({
					color: Cesium.Color.YELLOW,
					//outlineWidth: 2,
					//outlineColor: Cesium.Color.BLACK,
				} as any),
				//clampToGround: true,
			},
		} as any)
		return () => {
			viewer.entities.remove(polyline)
		}
	}, [pointArray])
	useEffect(() => {
		let distance = 0
		if (pointArray.length < 2) {
			return () => {}
		}
		for (let i = 0; i < pointArray.length - 1; i++) {
			const first = pointArray[i]
			const second = pointArray[i + 1]
			distance += Cesium.Cartesian3.distance(first, second)
		}
		const cx = pointArray.reduce((a, b) => a + b.x, 0) / pointArray.length
		const cy = pointArray.reduce((a, b) => a + b.y, 0) / pointArray.length
		const cz = pointArray.reduce((a, b) => a + b.z, 0) / pointArray.length
		console.log("distance", distance)
		const c3 = new Cesium.Cartesian3(cx, cy, cz)
		const { longitude, latitude, height } = Cesium.Cartographic.fromCartesian(c3)
		const offsetC3 = Cesium.Cartesian3.fromRadians(longitude, latitude, height + 3)
		const label = viewer.entities.add({
			position: offsetC3,
			label: {
				text: `${distance.toFixed(2)}m`,
				//disableDepthTestDistance: true,
				eyeOffset: Cesium.Cartesian3.UNIT_Z,
				font: "45px sans-serif",
				fillColor: Cesium.Color.BLACK,
				outlineWidth: 2,
				scale: 0.5,
				showBackground: true,
				backgroundColor: Cesium.Color.RED,
				disableDepthTestDistance: Number.POSITIVE_INFINITY,
				//heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
			},
		} as any)
		return () => {
			viewer.entities.remove(label)
		}
	}, [pointArray])

	return null
}
