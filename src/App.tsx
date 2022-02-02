import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    const viewer = new Cesium.Viewer('map', {
      timeline: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      // vrButton: true,
      animation: false,
      navigationHelpButton: false,
      // baseLayerPicker: false,
      sceneModePicker: false,
      fullscreenButton: false,
      selectionIndicator: false,
    });
    (viewer as any)._cesiumWidget._creditContainer.style.display = "none";
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
