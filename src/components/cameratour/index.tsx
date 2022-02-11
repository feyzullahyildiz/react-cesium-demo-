import React, { useContext, useEffect } from "react"
import { ViewerContext } from "../viewer-context"

export const CameraTour = () => {
	const viewer = useContext(ViewerContext)!
	useEffect(() => {
		const start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16))
		const stop = Cesium.JulianDate.addSeconds(start, 13, new Cesium.JulianDate())

		//Make sure viewer is at the desired time.
		viewer.clock.startTime = start.clone()
		viewer.clock.stopTime = stop.clone()
		viewer.clock.currentTime = start.clone()
		viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP //Loop at the end
		viewer.clock.multiplier = 0.6
		viewer.clock.shouldAnimate = true
		viewer.timeline.zoomTo(start, stop)
		const positionProperty = new Cesium.SampledPositionProperty()
		const pathArray = [
			{
				position: new Cesium.Cartesian3(
					4215830.354553322,
					2334429.0086329756,
					4164260.00020717
				),
				timeOffset: 0,
			},
			{
				position: new Cesium.Cartesian3(4215778.932897029, 2334441.6903693303, 4164302.5),
				timeOffset: 3,
			},
			{
				position: new Cesium.Cartesian3(
					4215708.942831653,
					2334423.6255956814,
					4164390.1557259825
				),
				timeOffset: 8,
			},
			{
				position: new Cesium.Cartesian3(
					4215685.672611163,
					2334418.940918554,
					4164420.4950099257
				),
				timeOffset: 10,
			},
			{
				position: new Cesium.Cartesian3(
					4215651.85432512,
					2334443.3153966856,
					4164440.552722568
				),
				timeOffset: 13,
			},
		]
		const dotEntityList: any[] = []
		for (const step of pathArray) {
			const time = Cesium.JulianDate.addSeconds(
				start,
				step.timeOffset,
				new Cesium.JulianDate()
			)

			positionProperty.addSample(time, step.position)
			const e = viewer.entities.add({
				position: step.position,
				box: {
					dimensions: new Cesium.Cartesian3(1, 1, 1),
					material: Cesium.Color.YELLOW,
					outline: true,
					outlineColor: Cesium.Color.BLACK,
				},
			} as any)
			dotEntityList.push(e)
		}
		positionProperty.setInterpolationOptions({
			interpolationDegree: 5,
			interpolationAlgorithm: Cesium.LagrangePolynomialApproximation,
		})
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
			ellipsoid: {
				dimensions: new Cesium.Cartesian3(2, 2, 2),
				material: Cesium.Color.BLUE,
				radii: new Cesium.Cartesian3(1, 1, 1),
			},
		} as any)

		console.log("entity", entity)
		viewer.trackedEntity = entity
		return () => {
			;(viewer as any).trackedEntity = undefined
			viewer.entities.remove(entity)
			for (const e of dotEntityList) {
				viewer.entities.remove(e)
			}
		}
	}, [])
	return <div></div>
}
