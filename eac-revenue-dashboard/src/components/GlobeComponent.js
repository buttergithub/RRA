import { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

// Sample country data (replace with your actual data)
const COUNTRIES = [
  { name: 'Rwanda', lat: -1.9403, lng: 29.8739, color: 'red' },
  { name: 'Uganda', lat: 1.3733, lng: 32.2903, color: 'blue' },
  { name: 'Kenya', lat: -0.0236, lng: 37.9062, color: 'green' },
  { name: 'Tanzania', lat: -6.3690, lng: 34.8888, color: 'yellow' },
  { name: 'Burundi', lat: -3.3731, lng: 29.9189, color: 'purple' },
  { name: 'South Sudan', lat: 6.8770, lng: 31.3070, color: 'orange' }
];

const GlobeComponent = ({ onCountrySelect }) => {
  const globeEl = useRef();
  const [countries, setCountries] = useState([]);
  const [hoveredCountry, setHoveredCountry] = useState(null);

  useEffect(() => {
    // Load country data
    setCountries(COUNTRIES);
    
    // Auto-rotate globe
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.5;
    
    // Add ambient light
    globeEl.current.scene().add(new THREE.AmbientLight(0xbbbbbb));
  }, []);

  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        animateIn={false}
        pointsData={countries}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointRadius={0.5}
        pointResolution={16}
        pointAltitude={0.01}
        pointsMerge={true}
        onPointHover={setHoveredCountry}
        onPointClick={onCountrySelect}
        labelsData={countries}
        labelLat="lat"
        labelLng="lng"
        labelText="name"
        labelSize={1.2}
        labelDotRadius={0.3}
        labelColor={() => 'rgba(255, 255, 255, 0.75)'}
        labelResolution={2}
        labelsTransitionDuration={1000}
      />
      
      {/* Tooltip */}
      {hoveredCountry && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          zIndex: 1000
        }}>
          {hoveredCountry.name}
        </div>
      )}
    </div>
  );
};

export default GlobeComponent;