import React, { useState } from "react"
import "./App.css"
import { BoxEntity } from "./components/boxentity"
import { CameraTour } from "./components/cameratour"
import { CameraTourDebug } from "./components/cameratour/debug"
import { EntityTour } from "./components/entitytour"
import { InitCameraPosition } from "./components/initcameraposition"
import { LeftClient } from "./components/leftclick"
import { Measurement } from "./components/measurement"
import { Tileset } from "./components/tileset"
import { Viewer } from "./components/viewer"

function App() {
	const [isActive, setIsActive] = useState(true)
	const [tilesetId, setTilesetId] = useState(3)
	const [pickCoordinate, setPickCoordinate] = useState<Cesium.Cartesian3 | null>(null)
	console.log("pickCoordinate", pickCoordinate)

	const entityPosition = Cesium.Cartesian3.fromDegrees(28, 41, 100) // implicit
	const entityDimentions = new Cesium.Cartesian3(1000, 1000, 1000) // implicit
	const entityColor = Cesium.Color.RED // Primitive Tip

	// const points = [
	//   {
	//     "position": {
	//       "x": 4215873.143707917,
	//       "y": 2334485.0576104163,
	//       "z": 4164206.3580067866
	//     },
	//     "up": {
	//       "x": 0.6148104477747073,
	//       "y": 0.333054041339883,
	//       "z": 0.7149007755305875
	//     },
	//     "direction": {
	//       "x": -0.5850811960836615,
	//       "y": -0.4152276592717902,
	//       "z": 0.6966103537595333
	//     },
	//     "roll": 2.6740553416004786e-7,
	//     "pitch": -0.08080833505295226,
	//     "heading": 6.203012733446352,
	//     time: 0,
	//   },
	//   {
	//     "position": {
	//       "x": 4215729.230664279,
	//       "y": 2334440.699088304,
	//       "z": 4164400.083714404
	//     },
	//     "up": {
	//       "x": 0.6168481764393716,
	//       "y": 0.2951799903726804,
	//       "z": 0.7296349090517847
	//     },
	//     "direction": {
	//       "x": -0.42586848330496385,
	//       "y": -0.654425052594244,
	//       "z": 0.6247910734513986
	//     },
	//     "roll": 6.283184908056204,
	//     "pitch": -0.11038597977191689,
	//     "heading": 5.905846457315428,
	//     time: 5
	//   }
	// ]
	const points = [
		{
			position: {
				x: 4215873.143707917,
				y: 2334485.0576104163,
				z: 4164206.3580067866,
			},
			up: {
				x: 0.6148104477747073,
				y: 0.333054041339883,
				z: 0.7149007755305875,
			},
			direction: {
				x: -0.5850811960836615,
				y: -0.4152276592717902,
				z: 0.6966103537595333,
			},
			roll: 2.6740553416004786e-7,
			pitch: -0.08080833505295226,
			heading: 6.203012733446352,
			time: 0,
		},
		{
			position: {
				x: 4215729.230664279,
				y: 2334440.699088304,
				z: 4164400.083714404,
			},
			up: {
				x: 0.6168481764393716,
				y: 0.2951799903726804,
				z: 0.7296349090517847,
			},
			direction: {
				x: -0.42586848330496385,
				y: -0.654425052594244,
				z: 0.6247910734513986,
			},
			roll: 6.283184908056204,
			pitch: -0.11038597977191689,
			heading: 5.905846457315428,
			time: 4,
		},
		{
			position: {
				x: 4215686.517663519,
				y: 2334395.152681523,
				z: 4164475.516427606,
			},
			up: {
				x: 0.6675383268587469,
				y: 0.3325329093469281,
				z: 0.6661940005553131,
			},
			direction: {
				x: -0.3997527127866214,
				y: -0.5947820852372098,
				z: 0.6974468006239712,
			},
			roll: 6.256927519469887,
			pitch: -0.023425389462326196,
			heading: 5.950299813630496,
			time: 4,
		},
		{
			position: {
				x: 4215672.27222823,
				y: 2334375.5554574556,
				z: 4164500.9221089967,
			},
			up: {
				x: 0.6775625013100359,
				y: 0.3472291614421491,
				z: 0.6483370776553424,
			},
			direction: {
				x: -0.469713612658049,
				y: -0.47402597805846297,
				z: 0.7447606959349037,
			},
			roll: 6.257213978876855,
			pitch: 0.0055963987347227295,
			heading: 6.0949212687090775,
			time: 3,
		},
		{
			position: {
				x: 4215632.164226051,
				y: 2334366.385082683,
				z: 4164603.086489049,
			},
			up: {
				x: 0.6731717789749435,
				y: 0.26908861765423364,
				z: 0.6887895700724885,
			},
			direction: {
				x: 0.3991131344315792,
				y: -0.9163403918066396,
				z: -0.03207790934357349,
			},
			roll: 0.044033537261430666,
			pitch: -0.09266615309006276,
			heading: 4.7505521826294395,
			time: 3,
		},
		{
			position: {
				x: 4215639.226175899,
				y: 2334391.0254045376,
				z: 4164667.9611242544,
			},
			up: {
				x: 0.7736241679258073,
				y: -0.1790275860558496,
				z: 0.607827911692214,
			},
			direction: {
				x: -0.01295829181803132,
				y: -0.9635260062887816,
				z: -0.267300800369826,
			},
			roll: 6.283181711862355,
			pitch: -0.5658589112411176,
			heading: 4.845663296340897,
			time: 5,
		},
		{
			position: {
				x: 4215619.121878925,
				y: 2334318.3034892688,
				z: 4164708.155858011,
			},
			up: {
				x: 0.5121545203124603,
				y: 0.21004260489102863,
				z: 0.8328144159739942,
			},
			direction: {
				x: -0.6177567657492185,
				y: -0.583575027945272,
				z: 0.5270832620466526,
			},
			roll: 6.279169926571044,
			pitch: -0.2785862593203614,
			heading: 6.061628802985902,
			time: 3,
		},
		{
			position: {
				x: 4215528.08993283,
				y: 2334241.072607253,
				z: 4164842.6958944523,
			},
			up: {
				x: 0.4262220931010053,
				y: 0.3343974739389507,
				z: 0.8405433104699882,
			},
			direction: {
				x: -0.8546960837653717,
				y: -0.15554241271393565,
				z: 0.4952788732050507,
			},
			roll: 0.0000026161760091625297,
			pitch: -0.3002916573878678,
			heading: 0.2952483572440663,
			time: 3,
		},
		{
			position: {
				x: 4215367.288245513,
				y: 2334237.2642771075,
				z: 4164943.12828479,
			},
			up: {
				x: 0.578856983682429,
				y: 0.35944114538374655,
				z: 0.7319335047989678,
			},
			direction: {
				x: -0.74760326432911,
				y: -0.12447408476747998,
				z: 0.6523768553418776,
			},
			roll: 0.006044324477471719,
			pitch: -0.11084240388099986,
			heading: 0.25767518155345037,
			time: 4,
		},
		{
			position: {
				x: 4215146.189760577,
				y: 2334217.039657689,
				z: 4165178.2258764156,
			},
			up: {
				x: 0.5788190709073228,
				y: 0.359434586169284,
				z: 0.731966707862659,
			},
			direction: {
				x: -0.7476287995364646,
				y: -0.12450337797345418,
				z: 0.6523420015427983,
			},
			roll: 0.006044336365077285,
			pitch: -0.11084235904930284,
			heading: 0.2576751802385546,
			time: 6,
		},
		{
			position: {
				x: 4215061.391876692,
				y: 2334216.0257660793,
				z: 4165264.5872432515,
			},
			up: {
				x: 0.5433394619162287,
				y: 0.42673369359969526,
				z: 0.7229665164247544,
			},
			direction: {
				x: -0.832484195315018,
				y: 0.3850780722688581,
				z: 0.3983527868716459,
			},
			roll: 0.0000015307089098470783,
			pitch: -0.1476510999910312,
			heading: 0.8455198958867296,
			time: 5,
		},
		{
			position: {
				x: 4214762.892778518,
				y: 2334479.247235778,
				z: 4165419.9030404496,
			},
			up: {
				x: 0.5382980259324412,
				y: 0.4330695518151771,
				z: 0.7229702611918686,
			},
			direction: {
				x: -0.8325580373169454,
				y: 0.40631349205030387,
				z: 0.37650559182679283,
			},
			roll: 0.000003106628325255656,
			pitch: -0.15429285950589477,
			heading: 0.8756360419614548,
			time: 6,
		},
		{
			position: {
				x: 4214620.597200571,
				y: 2334608.216183225,
				z: 4165491.89514903,
			},
			up: {
				x: 0.5374693957130929,
				y: 0.4524651042356592,
				z: 0.7116192648606535,
			},
			direction: {
				x: -0.8107758913342691,
				y: 0.5093057884188279,
				z: 0.28853087861474713,
			},
			roll: 0.0000016920457373004183,
			pitch: -0.16007524485695024,
			heading: 1.0145525498812722,
			time: 5,
		},
		{
			position: {
				x: 4214579.115540661,
				y: 2334662.9026995488,
				z: 4165512.57031619,
			},
			up: {
				x: 0.508131099856372,
				y: 0.4077356858824398,
				z: 0.7586530141090394,
			},
			direction: {
				x: -0.8597456669576724,
				y: 0.18757447076231154,
				z: 0.475029689667652,
			},
			roll: 6.283185119978984,
			pitch: -0.1879499822968682,
			heading: 0.6324180957071484,
			time: 3,
		},
		{
			position: {
				x: 4214639.542924605,
				y: 2334823.5691698613,
				z: 4165565.052419123,
			},
			up: {
				x: 0.4679690504213816,
				y: -0.25482258187529416,
				z: 0.8462094419315584,
			},
			direction: {
				x: -0.4695564570622247,
				y: -0.8828807325703295,
				z: -0.006192389462027268,
			},
			roll: 0.00000502519902312315,
			pitch: -0.6900847740503782,
			heading: 5.498821296625991,
			time: 4,
		},
		// {
		//   "position": {
		//     "x": 4214538.705377525,
		//     "y": 2334879.6639744365,
		//     "z": 4165713.5834369413
		//   },
		//   "up": {
		//     "x": 0.8631449600442477,
		//     "y": -0.3083089645748544,
		//     "z": 0.399907939797393
		//   },
		//   "direction": {
		//     "x": -0.05597176521266139,
		//     "y": -0.8455012232110733,
		//     "z": -0.5310318663202402
		//   },
		//   "roll": 0.00000740532938259264,
		//   "pitch": -0.7679124531300618,
		//   "heading": 4.573777347855598,
		//   "time": 4
		// },
		{
			position: {
				x: 4214407.058758322,
				y: 2334762.233156037,
				z: 4165720.7366834604,
			},
			up: {
				x: 0.8811503451117337,
				y: 0.16502942094249035,
				z: 0.44310197419201275,
			},
			direction: {
				x: 0.44889013506744946,
				y: -0.5864068500653928,
				z: -0.6742585949289124,
			},
			roll: 6.283182296439249,
			pitch: -0.3691934335203424,
			heading: 4.04148554489908,
			time: 4,
		},
	]
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
				<InitCameraPosition
					position={
						new Cesium.Cartesian3(
							4215822.35227024,
							2334436.446872584,
							4164267.906282703
						)
					}
					direction={new Cesium.Cartesian3(-0.85, 0.08, 0.5)}
					up={new Cesium.Cartesian3(0.5, 0.39, 0.77)}
				/>
				{/* <Tileset autoZoom url={url} visible={isActive}></Tileset> */}
				<Tileset
					visible={isActive}
					url="https://cesium-api.ankageo.com/api/v1/static/tileset/14/tileset.json"
				></Tileset>
				<BoxEntity
					position={entityPosition}
					dimensions={entityDimentions}
					color={entityColor}
				/>
				<BoxEntity
					position={entityPosition}
					dimensions={new Cesium.Cartesian3(900, 1200, 1200)}
					color={Cesium.Color.YELLOW}
				/>
				{/* <LeftClient logKey='AA' />
        {isActive && <LeftClient logKey='BB' />}
        <LeftClient logKey='CC' /> */}
				{/* <LeftClient logKey="AA" onPick={setPickCoordinate} /> */}
				<Measurement />
				{/* {pickCoordinate &&

          <BoxEntity
            position={pickCoordinate}
            dimensions={new Cesium.Cartesian3(100, 100, 100)}
            color={Cesium.Color.YELLOW}
          />
        } */}
				{/* <CameraTourDebug initialPoints={points} /> */}
				{/* <CameraTour points={points} /> */}
				{/* <EntityTour /> */}
			</Viewer>
		</div>
	)
}

export default App
