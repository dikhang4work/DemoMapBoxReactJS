import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxAutocomplete from "react-mapbox-autocomplete";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia3ltZW50c29kIiwiYSI6ImNrdW94NXNoNDBtd3Yyb3FyMHJzanJ0amMifQ.5osJwevAWR_2fi6nOj3ZdA";

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(106.72052955724148);
  const [lat, setLat] = useState(10.80457018785672);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  function _suggestionSelect(result, lat, lng, text) {
    console.log(result, lat, lng, text);
  }
  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
      <MapboxAutocomplete
        publicKey="pk.eyJ1Ijoia3ltZW50c29kIiwiYSI6ImNrdW94NXNoNDBtd3Yyb3FyMHJzanJ0amMifQ.5osJwevAWR_2fi6nOj3ZdA"
        inputClass="form-control search"
        onSuggestionSelect={_suggestionSelect}
        country="vn"
        resetSearch={true}
      />
    </div>
  );
}

export default App;
