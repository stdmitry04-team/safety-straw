import "../styles/BarLocator.css"
import mag_glass from "../assets/magnifying-glass.svg"
import BarLocatorAddress from "./BarLocatorAddress.jsx"
import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
export default function BarLocator(){
    const addresses = [{name:"JERRY’S SPORTS BAR",phone:"(906) 906-9069",address:"1111 A ANDERSON AVE, ANDORRA, AZ 22222",distance:"1.47 miles"},
        {name:"HARPER’S",phone:"(555) 555-5555",address:"555 US HIGHWAY 5, FLORENCE, WI, 77777",distance:"3.58 miles"},
        {name:"AURORA LIQUORS",phone:"(123) 456-7890",address:"555 US HIGHWAY 5, FLORENCE, WI, 77777",distance:"3.58 miles"}    
    ]

    const [map, setMap] = useState(null);

  
    const center = {
        lat: 37.7749, // Example latitude
        lng: -122.4194 // Example longitude
    };
    
    const markerPosition = {
        lat: 37.7749, // Marker latitude
        lng: -122.4194 // Marker longitude
    };
    const mapOptions = {
        disableDefaultUI: true,
        fullscreenControl: false, // Hide fullscreen icon
        mapTypeControl: false, // Hide map type (Map/Satellite) control
        zoomControl: true, // Show zoom controls
        streetViewControl: false, // Hide street view icon
        keyboardShortcuts: false
    };


    return(
        <div className="bar-locator">
            <h1 className="bar-locator-title">BAR LOCATOR</h1>

            <div className="bar-locator-container">
                <div className="bar-locator-text">
                    <p>Find a bar that is Safety Straw certified near you!</p>
                </div>
                <div className="bar-locator-search">
                    <img src={mag_glass} alt="search"></img>
                    <input type="text" placeholder="Enter your location"></input>
                </div>
                
                <div className="bar-locator-addresses">
                    {addresses.map((address, index) => {
                        return <BarLocatorAddress key={index} name={address.name} number={address.phone} address={address.address} distance={address.distance}/>
                    })}
                </div>


                <div className="bar-locator-map">
                    <LoadScript googleMapsApiKey="AIzaSyDU3h2yXSmgBHi8SfXvakNLPqP5sVhQ-aA" libraries={['places']}>
                        <GoogleMap
                            mapContainerStyle={{ height: "100%", width: "100%" }} 
                            center={center}
                            zoom={10}
                            onLoad={map => setMap(map)} 
                            mapContainerClassName="map-container"
                            options={mapOptions}
                        >
                            <Marker position={markerPosition} />
                        </GoogleMap>
                    </LoadScript>

                </div>
            
            </div>

        </div>
    )
}