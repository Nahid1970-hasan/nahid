import { GoogleMap, InfoWindowF, useJsApiLoader } from "@react-google-maps/api";
import React, { memo, useCallback, useEffect, useState } from "react";

import { config } from "../../config/config";
import { Center } from "../style/Center_styled"; 
import { gettimeDay, gettimeDayAlt } from "../../utils/helper";
import StationMarker from "./StationMarker";
import SDMarker from "./SDMarker";

const containerStyle = {
    width: '100%',
    height: '100%'
};
 
function WMap({ center,marker, locationRows, distData, minZoom, zoomratio, noBakcColor, icon, title, iconUrl }) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: config.apiKey,
    });
    let featureLayer; 
    const [map, setMap] = useState(null);
    const [data, setData] = useState(null);
    const [zoom, setZoom] = useState(zoomratio ?? 6.5);
 
    const onLoad = useCallback((map) => { 
        const bounds = new window.google.maps.LatLngBounds(center); 
        map.fitBounds(bounds); 
        featureLayer = map.getFeatureLayer("ADMINISTRATIVE_AREA_LEVEL_1");
        //featureLayer.addListener("click",()=>{});
        featureLayer.addListener("mousemove", handleMouseMove);
        map.addListener("mousemove", () => {
            if (distData?.length) {
                featureLayer.style = applyStyle;
            }
        });
        if(distData!=null){
            featureLayer.style = applyStyle;
        } 
        setMap(map);
        setTimeout(() => map.setZoom(zoom), 1000); 
    }, [locationRows]);

    function applyStyle(params) {
        const placeId = params.feature.placeId;
        var datad = distData.find((d) => d?.place_id == placeId);   
        if (data?.place_id == placeId) {
            return styleMouseMove;
        }
        return noBakcColor?null:datad ? styleDefault(datad?.place_color || "") : null;
    }

    function handleMouseMove(event) {
        let feature = event.features[0];
        featureLayer.style = applyStyle;
        if (!feature.placeId) return;
        var datas = locationRows.find((d) => d.place_id == feature.placeId);
        setData(datas);
    }


    const onUnmount = useCallback((map) => {
        setMap(null);
    }, []);

    const styleDefault = ((colorcode) => ({ 
        "strokeWeight": 1.2,
        "strokeColor": "blue",
        "strokeOpacity": 0.6,
    }));

    const BD_BOUNDS = {
        north: 26.4465255803,
        south: 20.670883287, 
        west: 92.6727209818,
        east: 88.0844222351,
      };

  
    const styleMouseMove = {
        ...styleDefault,
        strokeColor: "maroon",
        "strokeOpacity": 1,
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
                minZoom: minZoom || 6.5, 
                draggable: true, 
                scrollwheel: true, 
                disableDoubleClickZoom: true,
                fullscreenControl: true,
                clickableIcons: true,
                mapId: config.mapId,
            }}
            onClick={null}
        >  
            {
                data && <InfoWindowF position={data}>
                    <div> <span>{data.name}</span><br/>
                    <span>{"Max: "}{data.max} {"°C"}</span><br/>
                    <span>{"Min: "}{data.min} {"°C"}</span></div>
                </InfoWindowF>
            }
        {
           icon && locationRows?.map((d,i)=><React.Fragment key={i}>
                <InfoWindowF position={d}>  
                    <img alt={gettimeDayAlt(d)||""} src={iconUrl[gettimeDayAlt(d)?.trim()?.replaceAll(" ","_")?.toLocaleLowerCase()]} style={{height:"20px", padding:"0"}} /> 
                </InfoWindowF>
            </React.Fragment>)
        }
         {
           title &&  locationRows?.map((d,i)=><React.Fragment key={i}>
                <InfoWindowF position={d}>  
                    <div><span>{d.name_en}</span></div> 
                </InfoWindowF>
            </React.Fragment>)
        }
         {marker && locationRows?.map((d, i) => (<SDMarker key={i} position={d} data={d}></SDMarker>))}
  
        </GoogleMap> 
    ) : <></>;
}

export default memo(WMap);
