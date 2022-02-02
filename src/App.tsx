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

    const tileset = new Cesium.Cesium3DTileset({
      url: 'https://cesium-api.ankageo.com/api/v1/static/tileset/3/tileset.json',
      maximumScreenSpaceError: 1,
    });
    viewer.scene.primitives.add(tileset);
    const tileset2 = new Cesium.Cesium3DTileset({
      url: 'https://cesium-api.ankageo.com/api/v1/static/tileset/14/tileset.json',
      maximumScreenSpaceError: 1,
    });
    viewer.scene.primitives.add(tileset2);
    viewer.zoomTo(tileset as any);

    tileset.readyPromise.then(() => {
      const x = 0;
      const y = 0;
      const z = -55;
      const boundingSphere = tileset.boundingSphere;
      const cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
      const surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
      const offset = Cesium.Cartesian3.fromRadians(cartographic.longitude + x, cartographic.latitude + y, z);
      const translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
      tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
    })
    // viewer.scene
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
