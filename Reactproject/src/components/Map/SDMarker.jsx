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
export default function SDMarker({ data }) {
    const { t, i18n } = useTranslation();
    const [infoOpen, setInfoOpen] = useState(false);
    const wraperRef = useRef(null);
    useOutsideClicker(wraperRef, () => { setInfoOpen(false) });
    const symbolOne = {
        path: "M -2,0 0,-2 2,0 0,2 z",
        strokeColor: "#F00",
        fillColor: "#F00",
        fillOpacity: 1,
    }
    var bwd = "M 199.5,511.5 C 197.167,511.5 194.833,511.5 192.5,511.5C 190.681,509.631 188.848,507.631 187,505.5C 170.497,454.352 155.497,402.685 142,350.5C 86.0854,324.067 56.5854,279.734 53.5,217.5C 55.9965,156.293 84.6631,112.46 139.5,86C 195.579,66.233 245.079,76.733 288,117.5C 326.08,160.895 336.413,210.229 319,265.5C 306.238,300.067 283.905,326.401 252,344.5C 238.818,397.709 223.818,450.376 207,502.5C 204.926,506.062 202.426,509.062 199.5,511.5 Z";
    var dae = "M 43.5,91.5 C 140.833,91.5 238.167,91.5 335.5,91.5C 335.5,170.167 335.5,248.833 335.5,327.5C 312.49,327.167 289.49,327.5 266.5,328.5C 249.249,377.678 229.749,426.011 208,473.5C 205.777,480.418 201.944,486.251 196.5,491C 190.761,493.514 185.595,492.681 181,488.5C 155.802,436.435 133.635,383.102 114.5,328.5C 90.8427,327.5 67.1761,327.167 43.5,327.5C 43.5,248.833 43.5,170.167 43.5,91.5 Z";
    var bmd = "M 194.5,30.5 C 242.042,64.4372 289.042,99.1038 335.5,134.5C 317.558,186.992 300.225,239.659 283.5,292.5C 270.816,292.168 258.149,292.501 245.5,293.5C 233.221,331.961 219.721,369.961 205,407.5C 198.438,418.137 191.771,418.137 185,407.5C 170.484,369.952 157.15,331.952 145,293.5C 131.667,292.833 118.333,292.167 105,291.5C 88.0255,238.244 70.8589,185.077 53.5,132C 100.92,98.6352 147.92,64.8019 194.5,30.5 Z";

    const svgMarker = {
        path: "M360-440h80v-110h80v110h80v-190l-120-80-120 80v190Zm120 254q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z",
        fillColor: "maroon",
        fillOpacity: 0.8,
        strokeWeight: 0,
        rotation: 0,
        scale: 0.05,
        anchor: new google.maps.Point(0, 20),
    };

    const SCG = ((org_type, rain) => ({
        path: org_type?.toLowerCase() == "bmd" ? bmd : org_type.toLowerCase() == "dae" ? dae : bwd,
        fillColor: getColorName(rain),
        fillOpacity: 0.8,
        strokeWeight: 0,
        rotation: 0,
        scale: 0.06,
        anchor: new google.maps.Point(0, 20),
    }));

    const getColorName = (rain) => {
        var rd = parseFloat(rain);
        if (rd <= 0) {
            return "green"
        } else if (rd > 0 && rd <= 20) {
            return "blue"
        } else if (rd > 20 && rd <= 40) {
            return "purple"
        } else if (rd > 40 && rd <= 60) {
            return "maroon"
        } else if (rd > 60) {
            return "red"
        } else {
            return "green"
        }
    };


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