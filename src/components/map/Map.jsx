import React, { useRef, useEffect } from 'react';
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
        initLocation,
        setZoom,
        zoom=12
    } = props;

    const mapRef = useRef();

    useEffect(() => {
        updateZoom();
    }, [zoom]);

    useEffect(() => {
        const { current={} } = mapRef;
        const { leafletElement: map } = current;
        
        map.on('locationfound', onLocationFound);

        if(initLocation) {
            map.locate({
                setView: true,
                enableHighAccuracy: true
            });
        } else {
            map.setView(coords, zoom);
        }
        
        if(!readOnly) {
            const geocoder = L.Control.geocoder({ defaultMarkGeocode: false }).addTo(map);
            geocoder.on('markgeocode', e => updateMarker({latlng: e.geocode.center})).addTo(map);
            map.on('click', onLocationClicked);
            map.on('zoomend', updateZoom);

            map.lastClickTimestamp = 0;

            let searchElement = document.querySelector('.leaflet-control-geocoder');
            searchElement.addEventListener('click', handleSearchOptionClicked);

            if (!marker) marker = L.marker(coords).bindPopup(address).addTo(map).openPopup();
            else marker.setLatLng(coords).setPopupContent(address).openPopup();

        } else {
            map.dragging.disable();
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.scrollWheelZoom.disable();
            map.boxZoom.disable();
            map.keyboard.disable();
            if (map.tap) map.tap.disable();
            map.removeControl(map.zoomControl);

            if (!marker) marker = L.marker(coords).addTo(map);
            else marker.setLatLng(coords);
        }
        
        () => {
            map.off('locationfound', onLocationFound);
            if(!readOnly) {
                map.off('click', onLocationClicked);
                map.off('zoomend', updateZoom);
                searchElement.removeEventListener('click', handleSearchOptionClicked);
            }
        }
    }, []);

    const handleSearchOptionClicked = e => {
        e.stopPropagation();
        e.preventDefault();
    }

    const updateZoom = () => {
        const { current={} } = mapRef;
        const { leafletElement: map } = current;
        let newZoom = map.getZoom();
        
        setZoom(newZoom);
    }

    const onLocationFound = e => {
        updateMarker(e);
    }

    const onLocationClicked = e => {
        updateMarker(e);
    }
    
    const updateMarker = ev => {
        const { current={} } = mapRef;
        const { leafletElement: map } = current;

        let currentTimestamp = Date.now();
        if(currentTimestamp - map.lastClickTimestamp < 300) return;
        map.lastClickTimestamp = currentTimestamp;

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
        <LeafletMap ref={mapRef} center={coords} zoom={zoom}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </LeafletMap>
    )
}

export default Map;