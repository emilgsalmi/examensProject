// Importing React and components from the @react-google-maps/api library
import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

// Interface for the props of GoogleMapComponent
interface MapProps {
  address: string;
}

// GoogleMapComponent
export const GoogleMapComponent: React.FC<MapProps> = ({ address }) => {
  // State to store the location coordinates (lat, lng)
  const [location, setLocation] = useState<{ lat: number; lng: number }>()

  // Google Maps API key
  const apiKey = "AIzaSyC8Aqf9gtLPXyZ9E_Ud2nqnqpepVADsYgY"

  // useEffect to fetch the geocode of the provided address and set the location state
  useEffect(() => {
    const geocodeAddress = async () => {
      // Fetching geocode data from the Google Maps Geocoding API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      )
      // Parsing the response data
      const data = await response.json()
      // Checking if the response status is 'OK'
      if (data.status === 'OK') {
        // Setting the location state with the coordinates from the response
        setLocation({
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
        })
      }
    }
    // Calling the geocodeAddress function when the address or apiKey changes
    geocodeAddress()
  }, [address, apiKey])

  // Styling for the map container
  const mapContainerStyle = {
    height: '400px',
    width: '400px',
    borderRadius: '15px',
  }

  // Default center coordinates for the map
  const defaultCenter = {
    lat: 59.33925247192383,
    lng: 18.032129287719727,
  }

  // Render the Google Map
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      {/* GoogleMap component with provided mapContainerStyle, center, and zoom */}
      <GoogleMap mapContainerStyle={mapContainerStyle} center={location || defaultCenter} zoom={15}>
        {/* Marker component to display the location on the map */}
        {location && <Marker position={location} />}
      </GoogleMap>
    </LoadScript>
  )
}
