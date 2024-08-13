import { InfoWindow, InfoWindowF, MarkerF } from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Loader } from "../style/Loader_styled";
import { useSelector } from "react-redux";
import { Hypend } from "../style/Hypen_styled";
import { useOutsideClicker } from "../../utils/helper";

const LBSpan = styled.span`
    font-size: 16px;
    color: maroon;  
    font-family: var(--dashboard-font);
    font-weight:800;
    display:flex;
    line-height: ${({ lineHight }) => (lineHight ? lineHight : "initial")}; ;
    margin: ${({ margin }) => (margin ? margin : "0")};
    border-bottom: ${({ uLine }) => (uLine ? uLine : "0")};
`
export default function DemoMarker({ data }) {
    const { t, i18n } = useTranslation();
    const [infoOpen, setInfoOpen] = useState(false);
    const wraperRef = useRef(null);
    useOutsideClicker(wraperRef, () => { setInfoOpen(false) });
      
    return (<React.Fragment>
        <MarkerF onClick={() => setInfoOpen(!infoOpen)} icon={data.org_name ? SCG(data?.org_name ? data?.org_name?.toLowerCase() : "bmd", data?.cum_rain ?? "0") : ""} options={{}} animation={google.maps.Animation.DROP} title={data.station_name_en} position={data}>
      
            {infoOpen && <InfoWindowF position={data}>
                <div ref = {wraperRef} style={{ padding: "10px", minWidth: "220px", color: "#000000" }}>
                    <LBSpan>{data?.station_name_en}</LBSpan> 
                    <LBSpan>{data?.station_type??""}</LBSpan> 
                    <LBSpan margin="0 0 5px 0" lineHight="1.8" uLine="1.8px solid green">{data?.station_data?.datetime_en ? "At " + data?.station_data?.datetime_en ?? "" + "BST" : ""} </LBSpan>
                    <LBSpan>{"Temperature: "} {data?.station_data?.temperature_en ? data?.station_data?.temperature_en+"°C":<Hypend/>}</LBSpan>
                    <LBSpan>{"Hourly Rainfall:"} {data?.station_data?.rain_gauge_en ?data?.station_data?.rain_gauge_en+" mm":<Hypend/>} </LBSpan>
                    {/* <LBSpan>{"Daily Rainfall:"} {data?.station_data?.rain_daily_en ?data?.station_data?.rain_daily_en+" mm":<Hypend/>} </LBSpan> */}
                    <LBSpan>{"Wind Speed: "} {data?.station_data?.wind_speed_en ?data?.station_data?.wind_speed_en+" kph":<Hypend/>}</LBSpan>
                    <LBSpan>{"Wind Direction: "} {data?.station_data?.wind_direction_en ? data?.station_data?.wind_direction_en + "°" : <Hypend/>}</LBSpan>
                    <LBSpan>{"Solar Radiation: "} {data?.station_data?.radiation_en ?data?.station_data?.radiation_en+" W/m2":<Hypend/>} </LBSpan>
                    <LBSpan>{"Relative Humidity: "} {data?.station_data?.humidity_en ?data?.station_data?.humidity_en+"%":<Hypend/>} </LBSpan>
                    <LBSpan>{"Surface Pressure: "} {data?.station_data?.pressure_en ?data?.station_data?.pressure_en+" hPa":<Hypend/>} </LBSpan> 
                </div> 
            </InfoWindowF>}
            
        </MarkerF>
    </React.Fragment>)
}