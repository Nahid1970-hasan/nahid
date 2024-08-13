import { GoogleMap, InfoWindowF, useJsApiLoader } from "@react-google-maps/api";
import React, { memo, useCallback, useEffect, useState } from "react";

import { config } from "../../config/config";
import { Center } from "../style/Center_styled";

const containerStyle = {
    width: '100%',
    height: '100%',
};

function EventMap({ center, locationRows, zoomratio, draggable }) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: config.apiKey,
    });
    let featureLayer;

    const [map, setMap] = useState(null);
    const [data, setData] = useState([]);
     
    const onLoad = useCallback((map) => {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds); 
        featureLayer = map.getFeatureLayer("ADMINISTRATIVE_AREA_LEVEL_2"); 
        featureLayer.style = applyStyle;
        setMap(map); 
        setTimeout(() => map.setZoom(zoomratio), 1000); 
    }, [locationRows]);

    function applyStyle(params) {
        const placeId = params.feature.placeId;
        var datad = locationRows?.find((d) => d?.place_id == placeId);
        if (data?.place_id == placeId) {
            return styleMouseMove;
        }
        return datad ? styleDefault(datad?.color_code || "") : null;
    }
  
    const onUnmount = useCallback((map) => {
        setMap(null);
    }, []);

    const styleDefault = ((colorcode) => ({
        "strokeOpacity": 0.5,
        "strokeWeight": 1.0,
        "fillColor": colorcode,
        "fillOpacity": 1,
    }));
 
    const styleMouseMove = {
        ...styleDefault,
        strokeColor: "#810FCB",
        "strokeOpacity": 1,
        strokeWeight: 2.0,
    };

    // useEffect(() => {
    //     if (map) {
    //         const bounds = new window.google.maps.LatLngBounds(center);
    //         map.fitBounds(bounds);
    //         map.setZoom(zoomratio);
    //     }
    // }, [center])

    useEffect(() => {
        if (isLoaded && map){ 
            featureLayer = map.getFeatureLayer("ADMINISTRATIVE_AREA_LEVEL_2"); 
            featureLayer.style = applyStyle;
            setData(locationRows);
        } 
    }, [locationRows])

    if (loadError) {
        return <Center>Map cannot be loaded right now, sorry.</Center>;
    }
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={zoomratio}
            center={center}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                streetViewControl: false,
                disableDefaultUI: true,
                zoomControl: false,
                minZoom: 2,
                maxZoom: 10.8,
                draggable: draggable || false, 
                disableDoubleClickZoom: false,
                fullscreenControl: true,
                clickableIcons: false,
                mapId: config.mapId,
            }}
            onClick={null}
        >{ data &&
            data?.map((d,i)=><React.Fragment key={i}>
                <InfoWindowF position={d}> 
                    <img src={d.symbol_url} style={{height:"20px", padding:"0"}} /> 
                </InfoWindowF>
            </React.Fragment>)
        }
            {/* { data?.map((d,i)=>)
                data && <InfoWindowF position={data}> 
                    <img src={data.symbol_url} style={{height:"20px", padding:"0"}} /> 
                </InfoWindowF>
            } */}

        </GoogleMap>
    ) : <></>;
}

export default memo(EventMap);
