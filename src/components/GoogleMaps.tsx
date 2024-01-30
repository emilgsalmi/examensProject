import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
  address: string;
}

export const GoogleMapComponent: React.FC<MapProps> = ({ address }) => {

  const apiKey = 'AIzaSyDMOpSkAQb1XRejf7P4HRe_R_tQtN3FBsA'; 

  const mapContainerStyle = {
    width: '400px',
    height: '400px',
    borderRadius:"15px"
  };

  const center = {
    lat: 59.33925247192383,
    lng: 18.032129287719727,
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={15}>
        <Marker title={address} position={center} />
      </GoogleMap>
    </LoadScript>
  );
};


