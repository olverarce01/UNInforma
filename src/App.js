import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Poligonos from './poligonos.json';
import ReactDOM from 'react-dom';
import './App.css';
import styles from "./App.module.css";


import {useNavigate } from "react-router-dom";

import { useAuth } from './context/authContext';
import { Mark } from './components/Mark';

mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default; // eslint-disable-line

mapboxgl.accessToken = 'pk.eyJ1Ijoib2x2ZXJhcmNlMDEiLCJhIjoiY2wyZGZrbHhvMHluYjNsbGhvZzBib3o1MCJ9.IePyh9Zgtj8wkqHJPG95Dg';


function crearPoligono(mapa,nombre,coordenadas,colorRelleno,colorBorde,contenidoHtml,i){
  mapa.on('load', () => {
      // Add a data source containing GeoJSON data.
      mapa.addSource(nombre, {
      'type': 'geojson',
      'data': {
      'type': 'Feature',
      'geometry': {
      'type': 'Polygon',
      // These coordinates outline Maine.
      'coordinates': coordenadas
      }
      }
      });
       
      // Add a new layer to visualize the polygon.
      mapa.addLayer({
      'id': nombre,
      'type': 'fill',
      'source': nombre, // reference the data source
      'layout': {},
      'paint': {
      'fill-color': colorRelleno, // blue color fill
      'fill-opacity': 0.7
      }
      });
      // Add a black outline around the polygon.
      mapa.addLayer({
      'id': 'outline'+i,
      'type': 'line',
      'source': nombre,
      'layout': {},
      'paint': {
      'line-color': colorBorde,
      'line-width': 2
      }
      });
      });
      const placeholder = document.createElement('div');
      ReactDOM.render(<Mark nombre={Poligonos[i].nombre} contenidoHtml={Poligonos[i].contenidoHtml} colorRelleno={Poligonos[i].colorRelleno}/>,placeholder);
      
      mapa.on('click', nombre, (e) => {
      new mapboxgl.Popup()
      .setDOMContent(placeholder)
      .setLngLat(e.lngLat)
      .addTo(mapa);



      });
      mapa.on('mouseenter', nombre, () => {
      mapa.getCanvas().style.cursor = 'pointer';
      });
// Change the cursor back to a pointer
// when it leaves the states layer.
    mapa.on('mouseleave', nombre, () => {
    mapa.getCanvas().style.cursor = '';
    });
}

export default function Inicio() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.29592);
  const [lat, setLat] = useState(-18.48975);
  const [zoom, setZoom] = useState(17);
  const {user, logout, loading} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [lng, lat],
      zoom: zoom

    });    
    for (var i = 0; i < Poligonos.length; i++) {
      crearPoligono(map.current,Poligonos[i].nombre,Poligonos[i].coordenadas,Poligonos[i].colorRelleno,Poligonos[i].colorBorde,'<Mark/>',i);      
    }

  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

  
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    
  });

  const handleLogout = async () =>{
    try {
      await logout();  
    } catch (error) {
      console.log(error);
    }
  }
  if(loading) return <div className="containerLoading"><img src="../loading.gif" width="600px"/></div>

  return (
    <div>
      <nav className={styles.navMap}>
      
      <div className={styles.containerCount}>
          <h1 className={styles.userName}>{user.displayName || user.email}</h1>
          <button onClick={handleLogout} className={styles.button}>
            logout
          </button>
      
      </div>
      <div className={styles.sidebar}>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className={styles.divContancts}>
        <a className={styles.contactos} href="tel:*103#">
            <img src="https://cdn-icons-png.flaticon.com/512/561/561253.png" alt="guardias colina" width="20px"/>
            Guardias Colina</a>

        <a className={styles.contactos} href="tel:*103#">
            <img src="https://cdn-icons-png.flaticon.com/512/561/561253.png" alt="guardias 18septiembre" width="20px"/>
            Guardias 18septiembre</a>
      </div>
     

      </nav>
      
      <div ref={mapContainer} className="map-container" />

    </div>
  );
}
