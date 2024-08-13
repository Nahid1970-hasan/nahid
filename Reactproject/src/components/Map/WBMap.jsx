import { GoogleMap, InfoWindowF, useJsApiLoader } from "@react-google-maps/api";
import React, { memo, useCallback, useEffect, useState } from "react";

import { config } from "../../config/config";
import { Center } from "../style/Center_styled"; 
import { gettimeDay, gettimeDayAlt } from "../../utils/helper";
import StationMarker from "./StationMarker";
import { useDispatch } from "react-redux";
import { loadBMDBWDWData } from "../../features/stationData/station_wise_wdata_slice";

const containerStyle = {
    width: '100%',
    height: '100%'
};
 
function WBMap({ center, locationRows, zoomratio, noBakcColor }) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: config.apiKey,
    });
    let featureLayer; 
    let lastClickedFeatureIds = {};
    let lastVisitFeatureIds = {};
    const dispatch = useDispatch(); 
    const [map, setMap] = useState(null);
    const [data, setData] = useState(null);
    const [zoom, setZoom] = useState(zoomratio ?? 10);
 
    const onLoad = useCallback((map) => {  
        const bounds = new window.google.maps.LatLngBounds(center); 
        map.fitBounds(bounds); 
        featureLayer = map.getFeatureLayer("ADMINISTRATIVE_AREA_LEVEL_2");
        //featureLayer.addListener("click",()=>{});
        featureLayer.addListener("click", handleClick);
        featureLayer.addListener("mousemove", handleMouseMove);
        map.addListener("mousemove", () => { 
            if (locationRows?.length) {
                featureLayer.style = applyStyle;
            }
        });
        featureLayer.style = applyStyle;
        setMap(map);
        setTimeout(() => map.setZoom(zoom), 1000)
    }, [locationRows]);

    function applyStyle(params) {
        const placeId = params.feature.placeId; 
        var datad = locationRows.find((d) => d.place_id == placeId);  
        if (lastClickedFeatureIds?.place_id == placeId) {
            return styleMouseClicked;
        }
        if (lastVisitFeatureIds?.place_id == placeId) {
            return styleMouseMove;
        }
        return datad? styleDefault : null;;
    }

    function handleClick(e) {
        let feature = e.features[0]; 
        featureLayer.style = applyStyle; 
        if (!feature.placeId) return;
        lastClickedFeatureIds = locationRows.find((d) => d.place_id == feature.placeId);   
        dispatch(loadBMDBWDWData({"district_id" : lastClickedFeatureIds.district_id})); 
    }

    function handleMouseMove(event) { 
        let feature = event.features[0]; 
        featureLayer.style = applyStyle; 
        if (!feature.placeId) return;
        lastVisitFeatureIds = locationRows.find((d) => d.place_id == feature.placeId);   
    }


    const onUnmount = useCallback((map) => {
        setMap(null);
    }, []);

    const styleDefault = {
        strokeColor: "#810FCB",
        "strokeOpacity": 0.5,
        fillColor: "blue", //#810FCB
        fillOpacity: 0.01,
        "strokeWeight": 1, 
    };
 
    const styleMouseMove = {
        ...styleDefault,
        strokeColor: "blue",
        "strokeOpacity": 1,
        strokeWeight: 2.0,
    };

    const styleMouseClicked = {
        ...styleDefault,
        strokeColor: "#810FCB",
        "strokeOpacity": 1,
        fillOpacity: 0.8,
        strokeWeight: 2.0,
    };
 
    useEffect(() => {
        if (map) {
            const bounds = new window.google.maps.LatLngBounds(center);
            map.fitBounds(bounds);
            map.setZoom(zoom);
        }
    }, [center])

    if (loadError) {
        return <Center>Map cannot be loaded right now, sorry.</Center>;
    }
    return isLoaded && locationRows.length ? (  
        <GoogleMap
            mapContainerStyle={containerStyle} 
            zoom={6.7}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                streetViewControl: false,
                disableDefaultUI: true,
                zoomControl: true,
                minZoom: 2, 
                draggable: true, 
                scrollwheel: true, 
                disableDoubleClickZoom: true,
                fullscreenControl: true,
                clickableIcons: true,
                mapId: config.mapId,
            }}
            onClick={null}
        >  
            
        </GoogleMap> 
    ) : <></>;
}

export default memo(WBMap);
