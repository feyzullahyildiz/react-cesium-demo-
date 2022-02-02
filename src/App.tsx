import React, { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const mapRef = useRef(document.createElement('div'));
  useEffect(() => {
    const viewer = new Cesium.Viewer(mapRef.current, {
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
      <div className='map' ref={mapRef}></div>
    </div>
  );
}

export default App;
