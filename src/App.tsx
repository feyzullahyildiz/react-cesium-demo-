import React, { useState } from 'react';
import './App.css';
import { BoxEntity } from './components/boxentity';
import { LeftClient } from './components/leftclick';
import { Tileset } from './components/tileset';
import { Viewer } from './components/viewer';

function App() {
  const [isActive, setIsActive] = useState(true);
  const [tilesetId, setTilesetId] = useState(3);
  const [pickCoordinate, setPickCoordinate] = useState<Cesium.Cartesian3 | null>(null);
  console.log('pickCoordinate', pickCoordinate);

  const entityPosition = Cesium.Cartesian3.fromDegrees(28, 41, 100);      // implicit
  const entityDimentions = new Cesium.Cartesian3(1000, 1000, 1000);       // implicit
  const entityColor = Cesium.Color.RED;                                   // Primitive Tip

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
        <Tileset autoZoom url={url} visible={isActive}></Tileset>
        <Tileset visible={isActive} url="https://cesium-api.ankageo.com/api/v1/static/tileset/14/tileset.json" ></Tileset>
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
        <LeftClient logKey='AA' onPick={setPickCoordinate} />
        {pickCoordinate &&

          <BoxEntity
            position={pickCoordinate}
            dimensions={new Cesium.Cartesian3(100, 100, 100)}
            color={Cesium.Color.YELLOW}
          />
        }
      </Viewer>
    </div>
  );
}

export default App;
