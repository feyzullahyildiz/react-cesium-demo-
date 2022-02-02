import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    new Cesium.Viewer('map');
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <div id="map"></div>
      </header>
    </div>
  );
}

export default App;
