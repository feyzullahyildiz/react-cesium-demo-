import React, { useEffect, useState } from "react"
import "./App.css"
import { AnimationComponent } from "./components/animation"
import { BoxEntity } from "./components/boxentity"
import { CameraTour } from "./components/cameratour"
import { LeftClient } from "./components/leftclick"
import { Tileset } from "./components/tileset"
import { Viewer } from "./components/viewer"

const path1 = [
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

	[28.977063, 41.02105, 0],
] as [number, number, number][]

const path2 = [
	[28.9666222275007, 41.025965486539846, 0],
	[28.965919991517673, 41.02583339317294, 0],
	[28.964943724042648, 41.02656196319734, 0],
	[28.964361016125565, 41.02814178078122, 0],
	[28.962407049376772, 41.030785667506294, 0],
	[28.9602236860182, 41.031729881454694, 0],
	[28.95609342011594, 41.03280882258065, 0],
	[28.951874954360136, 41.03448560339051, 0],
	[28.94931163532523, 41.0381866172564, 0],
	[28.9481916770787, 41.04023876780877, 0],
	[28.946041470616034, 41.04220944963906, 0],
	[28.94404714429295, 41.043649337332994, 0],
	[28.94273315086467, 41.04346461611158, 0],
	[28.94260953255049, 41.04218840174384, 0],
	[28.945300579483696, 41.04116336607624, 0],
	[28.947499898594376, 41.03798482131635, 0],
	[28.94805820892418, 41.036861984975545, 0],
	[28.950066006625903, 41.03564811991683, 0],
	[28.950439420435465, 41.034040849067665, 0],
	[28.953695895222218, 41.03086120248886, 0],
	[28.95660921314232, 41.02927125685652, 0],
	[28.95936403071541, 41.0286529095539, 0],
	[28.962163901902755, 41.02655400077799, 0],
	[28.964017123609953, 41.02510834385446, 0],
	[28.96553879030194, 41.02540268228333, 0],

	[28.9666222275007, 41.025965486539846, 0],
] as [number, number, number][]

function App() {
	const [isActive, setIsActive] = useState(true)
	const [tilesetId, setTilesetId] = useState(3)
	const [points, setPoints] = useState<[number, number, number][]>([])
	//const [pickCoordinate, setPickCoordinate] = useState<Cesium.Cartesian3 | null>(null)
	const onLeftClick = (p1: Cesium.Cartesian3) => {
		const coordRadi = Cesium.Cartographic.fromCartesian(p1)
		//console.log("coordRadi", coordRadi)
		const lat = (coordRadi.latitude * 180) / Math.PI
		const lon = (coordRadi.longitude * 180) / Math.PI
		//console.log(`[${lon}, ${lat}, ${coordRadi.height}]`)
		setPoints([...points, [lon, lat, 0]])
	}
	useEffect(() => {
		//console.log("points", points)
		console.log(JSON.stringify(points))
	}, [points])

	const entityPosition = Cesium.Cartesian3.fromDegrees(28, 41, 100) // implicit
	const entityDimentions = new Cesium.Cartesian3(1000, 1000, 1000) // implicit
	const entityColor = Cesium.Color.RED // Primitive Tip

	// console.log('UPDATE')
	const url = `https://cesium-api.ankageo.com/api/v1/static/tileset/${tilesetId}/tileset.json`
	return (
		<div className="App">
			<div className="top-left">
				isActive: {JSON.stringify(isActive)}
				<button onClick={() => setIsActive(!isActive)}>KAPAT AÇ</button>
				tilesetId: {tilesetId}
				<button onClick={() => setTilesetId(tilesetId + 1)}>Id ARTTIR</button>
			</div>
			<Viewer>
				{/* <Tileset  url={url} visible={isActive}></Tileset> */}
				<Tileset autoZoom visible={isActive} url="https://cesium-api.ankageo.com/api/v1/static/tileset/14/tileset.json"></Tileset>
				<BoxEntity position={entityPosition} dimensions={entityDimentions} color={entityColor} />
				<BoxEntity position={entityPosition} dimensions={new Cesium.Cartesian3(900, 1200, 1200)} color={Cesium.Color.YELLOW} />
				{/* <LeftClient logKey='AA' />
        {isActive && <LeftClient logKey='BB' />}
        <LeftClient logKey='CC' /> */}
				<LeftClient logKey="AA" onPick={onLeftClick} />
				{/* {pickCoordinate &&

          <BoxEntity
            position={pickCoordinate}
            dimensions={new Cesium.Cartesian3(100, 100, 100)}
            color={Cesium.Color.YELLOW}
          />
        } */}
				{/* <CameraTour /> */}
				<AnimationComponent path={path1} startTimeOffset={0} />
				<AnimationComponent path={path1} startTimeOffset={5} />
				<AnimationComponent path={path2} startTimeOffset={0} />
				<AnimationComponent path={path2} startTimeOffset={5} />
			</Viewer>
		</div>
	)
}

export default App
