import React, { useRef, useEffect, useState } from 'react';
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import L from "leaflet";
import './leaflet.css';


const Map = props => {
    
    var marker;

    const {
        coords=[0,0],
        address,
        setCoords,
        setAddress,
        readOnly=false,
        initLocation
    } = props;


    const mapRef = useRef();

    useEffect(() => {
        const { current={} } = mapRef;
        const { leafletElement: map } = current;

        const geocoder = L.Control.geocoder({
            defaultMarkGeocode: false
        }).addTo(map);
        geocoder.on('markgeocode', e => updateMarker({latlng: e.geocode.center})).addTo(map);

        if(initLocation) {
            map.locate({
                setView: true,
                enableHighAccuracy: true,
                maxZoom: 12
            });
        } 
        else {
            if (!marker) marker = L.marker(coords).bindPopup(address).addTo(map).openPopup();
            else marker.setLatLng(coords).setPopupContent(address).openPopup();
        }

        map.on('locationfound', onLocationFound);
        if(!readOnly) map.on('click', onLocationClicked);
        
        () => {
            map.off('locationfound', onLocationFound);
            if(!readOnly) map.off('click', onLocationClicked);
        }
    }, []);

    const onLocationFound = e => {
        updateMarker(e);
    }

    const onLocationClicked = e => {
        updateMarker(e);
    }
    
    const updateMarker = ev => {
        const { current={} } = mapRef;
        const { leafletElement: map } = current;

        const geocoder = L.Control.Geocoder.nominatim({reverseQueryParams: {"accept-language": "en"}});

        geocoder.reverse(
            ev.latlng,
            map.options.crs.scale(20),
            results => {
                let result = results[0];
                if(!result) return;

                let rgx = /no, |no |no|  /g;
                let name = result.name.replace(rgx, '');
                
                if (!marker) marker = L.marker(result.center).bindPopup(name).addTo(map).openPopup();
                else marker.setLatLng(result.center).setPopupContent(name).openPopup();
                
                setCoords(Object.values(ev.latlng));
                setAddress(name);
            }
        );

    }

    return (
        <LeafletMap ref={mapRef} center={coords} zoom={12}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </LeafletMap>
    )
}

export default Map;