import React, { useEffect, useContext } from "react"
import { ViewerContext } from "../viewer-context"

interface Props {
	startTimeOffset?: number
	path: [number, number, number][]
	timeoffset?: number
}
export const AnimationComponent: React.FC<Props> = ({ startTimeOffset = 0, path, timeoffset = 2, ...props }) => {
	const viewer = useContext(ViewerContext)
	useEffect(() => {
		const start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16))
		const stop = Cesium.JulianDate.addSeconds(start, (path.length - 1) * timeoffset, new Cesium.JulianDate())

		const timeBasePosition = new Cesium.SampledPositionProperty()

		for (let i = 0; i < path.length; i++) {
			const element = path[i]

			const time = Cesium.JulianDate.addSeconds(start, timeoffset * i, new Cesium.JulianDate())

			timeBasePosition.addSample(time, Cesium.Cartesian3.fromDegrees(...element))
		}

		const position = new Cesium.Cartesian3(0, 0, 0)
		const orientation = new Cesium.Quaternion(0, 0, 0, 0)

		// to make positions interpolated.
		timeBasePosition.setInterpolationOptions({
			interpolationDegree: 5,
			interpolationAlgorithm: Cesium.LagrangePolynomialApproximation,
		})
		//
		const timeBaseOrientation = new Cesium.VelocityOrientationProperty(timeBasePosition)

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
		} as any)
		const tempTime = Cesium.JulianDate.fromDate(new Date())
		const totalTime = Cesium.JulianDate.secondsDifference(stop, start)

		const orjClockStartTime = viewer.clock.currentTime.clone()

		const renderCbFunction = () => {
			const current = viewer.clock.currentTime
			const diff = Cesium.JulianDate.secondsDifference(current, orjClockStartTime)
			const diffOffset = (diff + startTimeOffset) % totalTime
			// console.log("diffOffset", diffOffset)
			Cesium.JulianDate.addSeconds(start, diffOffset, tempTime)

			const newPosition = timeBasePosition.getValue(tempTime)
			;(entity.position as any).setValue(newPosition)

			const newOrientation = timeBaseOrientation.getValue(tempTime, orientation)
			;(entity.orientation as any).setValue(newOrientation)
		}
		viewer.scene.preRender.addEventListener(renderCbFunction)

		return () => {
			viewer.entities.remove(entity)
			viewer.scene.preRender.removeEventListener(renderCbFunction)
			//Cesium.cancelAnimationFrame(animationFrameId)
		}
	}, [])

	return null
}
