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

function NDMap({ center, marker, locationRows, minZoom , distData, zoomratio, noBakcColor }) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: config.apiKey,
    });
    let featureNBLayer;
    let featureCNLayer;
    let lastClickedFeatureIds = {};
    let lastVisitFeatureIds = {};
    const dispatch = useDispatch();
    const [map, setMap] = useState(null);
    const [data, setData] = useState(null);
    const [zoom, setZoom] = useState(zoomratio ?? 7.2);

    const onLoad = useCallback((map) => {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        featureNBLayer = map.getFeatureLayer("ADMINISTRATIVE_AREA_LEVEL_2");
        // featureCNLayer = map.getFeatureLayer("COUNTRY");
        // featureNBLayer.addListener("click", handleClick);
        map.addListener("mousemove", () => {
            if (distData?.length) {
                featureNBLayer.style = applyNBStyle;
            }
        });
        featureNBLayer.addListener("mousemove", handleNBMouseMove);
        if (distData != null) {
            featureNBLayer.style = applyNBStyle;
        }
        // featureCNLayer.style = applyCNStyle;  
        setMap(map); 
        setTimeout(() => map.setZoom(zoom), 1000);
    }, [distData]);

    function applyNBStyle(params) {
        const placeId = params.feature.placeId;
        var datad = distData?.find((d) => d.place_id == placeId);
        // if (lastClickedFeatureIds?.place_id == placeId) {
        //     return styleMouseClicked;
        // }

        if (lastVisitFeatureIds?.place_id == placeId) {
            return styleMouseMove;
        }
        return datad ? styleDefault : null;
    }

    function applyCNStyle(params) {
        const placeId = params.feature.placeId;
        return placeId == "ChIJp4vhgO2qrTARa_zhxOAoLQ8" ? null : styleOther;
    }

    function handleClick(e) {
        let feature = e.features[0];
        featureNBLayer.style = applyNBStyle;
        if (!feature.placeId) return;
        lastClickedFeatureIds = distData.find((d) => d.place_id == feature.placeId);
    }

    function handleNBMouseMove(event) {
        let feature = event.features[0];
        featureNBLayer.style = applyNBStyle;
        if (!feature.placeId) return;
        lastVisitFeatureIds = distData.find((d) => d.place_id == feature.placeId);
    }


    const onUnmount = useCallback((map) => {
        setMap(null);
    }, []);

    const styleDefault = {
        strokeColor: "#810FCB",
        "strokeOpacity": 0.6,
        // fillColor: "#9d9c9a", //#810FCB
        // fillOpacity: 0.8,
        "strokeWeight": 1,
    };
    const styleOther = {
        fillColor: "#fff", //#810FCB
        fillOpacity: 1,
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
  
    function findCenter(markers) {
        let lat = 0;
        let lng = 0;
        
        for(let i = 0; i < markers.length; ++i) {
            lat += markers[i].lat;
            lng += markers[i].lng;
        }
    
        lat /= markers.length;
        lng /= markers.length;
    
        return {lat: lat, lng: lng}
    }

    useEffect(() => {
        if (map) {
            var cBonds = findCenter(locationRows);
            const bounds = new window.google.maps.LatLngBounds(cBonds);
            map.fitBounds(bounds);
            map.setZoom(zoom);
        }
    }, [locationRows])

    if (loadError) {
        return <Center>Map cannot be loaded right now, sorry.</Center>;
    }
    return isLoaded && distData.length ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={7.2}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                streetViewControl: false,
                disableDefaultUI: true,
                zoomControl: true,
                minZoom: minZoom ||  7.2,
                draggable: true,
                scrollwheel: true,
                disableDoubleClickZoom: true,
                fullscreenControl: true,
                clickableIcons: true,
                mapId: config.mapId,
            }}
            onClick={null}
        >
            {marker && locationRows?.map((d, i) => (<StationMarker key={i} position={d} data={d}></StationMarker>))}
        </GoogleMap>
    ) : <></>;
}

export default memo(NDMap);
