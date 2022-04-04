import React, { useContext, useEffect, useState } from "react"
import earcut from "earcut"
import { ViewerContext } from "../viewer-context"

const makeChunk = (arr: any[], size: number) => {
	const resArray = []
	while (true) {
		const chunk = arr.splice(0, size)
		if (chunk.length === 0) {
			return resArray
		}
		resArray.push(chunk)
	}
}

export const AreaMeasure = () => {
	const viewer = useContext(ViewerContext)!
	const [points, setPoints] = useState<Cesium.Cartesian3[]>([])
	useEffect(() => {
		const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)

		handler.setInputAction((event) => {
			const c3 = viewer.scene.pickPosition(event.position)
			const carto = Cesium.Cartographic.fromCartesian(c3)
			const offsetC3 = Cesium.Cartesian3.fromRadians(
				carto.longitude,
				carto.latitude,
				carto.height + 0.1
			)
			setPoints([...points, offsetC3])
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
		handler.setInputAction((event) => {
			const newPoints = points.concat()
			newPoints.pop()
			setPoints([...newPoints])
		}, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
		return () => {
			handler.destroy()
		}
	}, [points])

	useEffect(() => {
		const collection = new Cesium.PointPrimitiveCollection()
		viewer.scene.primitives.add(collection)

		const entites = points.map((p) => {
			return collection.add({
				position: p,
				color: Cesium.Color.RED,
			})
		})
		return () => {
			viewer.scene.primitives.remove(collection)
		}
	}, [points])

	useEffect(() => {
		if (points.length < 3) {
			return () => {}
		}
		const vertexArray = points.map(({ x, y, z }) => [x, y, z]).flat(1)
		//console.log("vertexArray", vertexArray)
		const chunkArray = makeChunk(vertexArray.concat(), 3) as number[][]
		//console.log("chunkArray", chunkArray)
		const trianglesIndexArray = earcut(vertexArray, undefined, 3)
		//console.log("trianglesIndexArray", trianglesIndexArray)
		const entityArray = [] as Cesium.Entity[]
		let area = 0
		let cx = 0
		let cy = 0
		let cz = 0
		for (let i = 0; i < trianglesIndexArray.length; i += 3) {
			const a = new Cesium.Cartesian3(...chunkArray[trianglesIndexArray[i]])
			const b = new Cesium.Cartesian3(...chunkArray[trianglesIndexArray[i + 1]])
			const c = new Cesium.Cartesian3(...chunkArray[trianglesIndexArray[i + 2]])
			cx += (a.x + b.x + c.x) / trianglesIndexArray.length
			cy += (a.y + b.y + c.y) / trianglesIndexArray.length
			cz += (a.z + b.z + c.z) / trianglesIndexArray.length

			const vectorA = Cesium.Cartesian3.subtract(a, b, new Cesium.Cartesian3())
			const vectorB = Cesium.Cartesian3.subtract(b, c, new Cesium.Cartesian3())
			const areaVector = Cesium.Cartesian3.cross(vectorA, vectorB, new Cesium.Cartesian3())
			area += Cesium.Cartesian3.magnitude(areaVector) / 2.0

			//console.log("a, b, c", a, b, c)
			const polygon = viewer.entities.add({
				polygon: {
					hierarchy: new Cesium.PolygonHierarchy([a, b, c]),
					material: Cesium.Color.RED.withAlpha(0.5),
					perPositionHeight: true,
				},
			} as any)
			entityArray.push(polygon)
		}
		const center = new Cesium.Cartesian3(cx, cy, cz)
		const label = viewer.entities.add({
			label: {
				text: `${area.toFixed(2)} m2`,
				outlineColor: Cesium.Color.RED,
				fillColor: Cesium.Color.WHITE,
				//showBackground: true,
				disableDepthTestDistance: Number.POSITIVE_INFINITY,
			},
			position: center,
		} as any)
		console.log("area", area)

		return () => {
			for (const e of entityArray) {
				viewer.entities.remove(e)
			}
			viewer.entities.remove(label)
		}
	}, [points])
	return null
}
