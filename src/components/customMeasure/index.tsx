import React, { useContext, useEffect } from "react"
import { ViewerContext } from "../viewer-context"

export const CustomeMeasure = () => {
	const viewer = useContext(ViewerContext)!
	const camera = viewer.camera
	const scene = viewer.scene
	const globe = scene.globe
	const ellipsoid = Cesium.Ellipsoid.WGS84
	const geodesic = new Cesium.EllipsoidGeodesic()
	const offsetArray: Cesium.Cartesian3[] = []

	const allPoints = scene.primitives.add(new Cesium.PointPrimitiveCollection())
	let point1: Cesium.PointPrimitive
	let point2: Cesium.PointPrimitive
	let polylines = scene.primitives.add(new Cesium.PolylineCollection())
	let polyline1: Cesium.Polyline
	// const polyline2: Cesium.Polyline
	// const polyline3: Cesium.Polyline
	// let distanceLabel, verticalLabel, horizontalLabel
	const LINEPOINTCOLOR = Cesium.Color.RED

	const label = {
		font: "14px monospace",
		showBackground: true,
		horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
		verticalOrigin: Cesium.VerticalOrigin.CENTER,
		pixelOffset: new Cesium.Cartesian2(0, 0),
		eyeOffset: new Cesium.Cartesian3(0, 0, -50),
		fillColor: Cesium.Color.WHITE,
	}
	console.log("CustomeMeasure udpated")
	useEffect(() => {
		console.log("CustomeMeasure INIT")
		const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)
		handler.setInputAction((event) => {
			const c3 = viewer.scene.pickPosition(event.position)
			const carto = Cesium.Cartographic.fromCartesian(c3)
			const c3Offset = Cesium.Cartesian3.fromRadians(
				carto.longitude,
				carto.latitude,
				carto.height + 0.1
			)
			offsetArray.push(c3Offset)
			let c3Heigth = Cesium.Cartographic.fromCartesian(c3).height
			// console.log("c3 ", c3)
			// console.log("carto ", carto)
			// console.log("offset", c3Offset)
			// console.log(c3Heigth)
			point1 = allPoints.add({
				position: c3,
				color: LINEPOINTCOLOR,
			})
			point2 = allPoints.add({
				position: c3,
				color: LINEPOINTCOLOR,
			})

			const point1GeoPosition = Cesium.Cartographic.fromCartesian(point1.position)
			const point2GeoPosition = Cesium.Cartographic.fromCartesian(point2.position)
			const point3GeoPosition = Cesium.Cartographic.fromCartesian(
				new Cesium.Cartesian3(point2.position.x, point2.position.y, point1.position.z)
			)

			// console.log(offsetArray)

			// console.log("point1GeoPosition", point1GeoPosition)
			// console.log("point2GeoPosition", point2GeoPosition)
			// console.log("point3GeoPosition", point3GeoPosition)
			polylines.removeAll()
			polyline1 = polylines.add({
				show: true,
				positions: offsetArray,
				width: 3,
				material: new Cesium.Material({
					fabric: {
						type: "Color",
						uniforms: {
							color: LINEPOINTCOLOR,
						},
					},
				}),
				depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty({
					color: Cesium.Color.LIGHTGREY.withAlpha(0.4),
					outlineColor: Cesium.Color.LIGHTGREY.withAlpha(0.4),
					outlineWidth: 0,
				} as any),
			})

			// console.log(polyline1)
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
		return () => {
			handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
			handler.destroy()
			polylines.removeAll()
		}
	}, [])
	return null
}
