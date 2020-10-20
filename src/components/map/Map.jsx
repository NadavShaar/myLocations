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
        setCoords,
        setAddress
    } = props;


    const mapRef = useRef();

    useEffect(() => {
        const { current={} } = mapRef;
        const { leafletElement: map } = current;

        const geocoder = L.Control.geocoder({
            defaultMarkGeocode: false
        }).addTo(map);
        geocoder.on('markgeocode', e => updateMarker({latlng: e.geocode.center})).addTo(map);

        map.locate({
            setView: true,
            maxZoom: 12
        })

        map.on('locationfound', onLocationFound);
        map.on('click', onLocationClicked);
        
        () => {
            map.off('locationfound', onLocationFound);
            map.off('click', onLocationClicked);
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
                let html = result.html.replace(rgx, '');
                let name = result.name.replace(rgx, '');
                
                if (!marker) marker = L.marker(result.center).bindPopup(html || name).addTo(map).openPopup();
                else marker.setLatLng(result.center).setPopupContent(result.html.replaceAll('no', '') || name).openPopup();
                
                setCoords(Object.values(ev.latlng));
                setAddress(name);
            }
        );

    }

    return (
        <LeafletMap ref={mapRef} center={coords} >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </LeafletMap>
    )
}

export default Map;