import React, { useContext, useEffect } from "react"
import { ViewerContext } from "../viewer-context"

export const Height = () => {
	const viewer = useContext(ViewerContext)!
	useEffect(() => {
		const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)
		let tempEntity: Cesium.Entity | null = null
		handler.setInputAction((event) => {
			const c3 = viewer.scene.pickPosition(event.position)
			const carto = Cesium.Cartographic.fromCartesian(c3)
			const height = viewer.scene.globe.getHeight(carto)
			const distance = carto.height - height
			console.log("distance", distance)
			if (tempEntity) {
				viewer.entities.remove(tempEntity)
			}
			tempEntity = viewer.entities.add({
				position: c3,
				depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty({
					color: Cesium.Color.LIGHTGREY.withAlpha(0.4),
					outlineColor: Cesium.Color.LIGHTGREY.withAlpha(0.4),
					outlineWidth: 0,
				} as any),
				label: {
					text: `${distance.toFixed(2)}m`,
					outlineColor: Cesium.Color.RED,
					fillColor: Cesium.Color.RED,
					showBackground: true,
					// disableDepthTestDistance: Number.POSITIVE_INFINITY,
				},
			} as any)

			viewer.entities.add({
				polyline: {
					positions: [
						Cesium.Cartesian3.fromRadians(carto.longitude, carto.latitude, height),
						c3,
					],
					//distanceDisplayCondition: Number.MAX_VALUE,
					disableDepthTestDistance: Number.POSITIVE_INFINITY,
				},
			} as any)
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK)

		return () => {
			handler.destroy()
		}
	}, [])
	return null
}
