import React, { useState } from 'react';
import './App.css';
import { Tileset } from './components/tileset';
import { Viewer } from './components/viewer';

function App() {
  const [isActive, setIsActive] = useState(true);
  const [tilesetId, setTilesetId] = useState(3);

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
        {/* {isActive && <Tileset url={url}></Tileset>} */}
        <Tileset url={url} visible={isActive}></Tileset>
        <Tileset url="https://cesium-api.ankageo.com/api/v1/static/tileset/14/tileset.json" visible={isActive}></Tileset>
      </Viewer>
    </div>
  );
}

export default App;
