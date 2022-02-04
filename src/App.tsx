import React, { useEffect, useRef } from 'react';
import './App.css';
import { Viewer } from './components/viewer';

function App() {
  const isActive = true;
  return (
    <div className="App">
      <Viewer>
        {/* {isActive && <Tileset url="asdf"></Tileset>} */}
      </Viewer>
    </div>
  );
}

export default App;
