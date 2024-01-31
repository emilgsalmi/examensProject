import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
  address: string;
}

export const GoogleMapComponent: React.FC<MapProps> = ({ address }) => {
  const [location, setLocation] = useState<{ lat: number; lng: number }>();

  const apiKey = "AIzaSyC8Aqf9gtLPXyZ9E_Ud2nqnqpepVADsYgY"; 

  useEffect(() => {
    const geocodeAddress = async () => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );
      const data = await response.json();
      if (data.status === 'OK') {
        setLocation({
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
        });
      }
    };
    geocodeAddress();
  }, [address, apiKey]);

  const mapContainerStyle = {
    height: '400px',
    width: '400px',
    borderRadius: '15px',
  };

  const defaultCenter = {
    lat: 59.33925247192383,
    lng: 18.032129287719727,
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={location || defaultCenter} zoom={15}>
        {location && <Marker position={location} />}
      </GoogleMap>
    </LoadScript>
  );
};



