import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    const viewer = new Cesium.Viewer('map');
    
    return () => {
      viewer.destroy();
    }
  }, []);
  return (
    <div className="App">
      <div id="map"></div>
    </div>
  );
}

export default App;
