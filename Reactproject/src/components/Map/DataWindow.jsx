import { InfoWindowF } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Loader } from "../style/Loader_styled";
import { useSelector } from "react-redux";
import { Hypend } from "../style/Hypen_styled";
import { StyledMenu } from "../style/Menu_styled";

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
export default function DataWindow({ data, open, bottom, last, top }) {

    const ndData = useSelector((state) => state.nddata);
    const [statDData, setStatDData] = useState({});

    useEffect(() => {
        setStatDData(ndData.stationData || {});
    }, [ndData.stationData]);

    return (<StyledMenu open={open} bottom={bottom} last={last} top={top}>
        
            <div style={{ padding: "10px", minWidth: "220px", color: "#000000" }}>
                <LBSpan>{data?.station_name_en}</LBSpan>
                <LBSpan>{data?.station_type}</LBSpan>
                <LBSpan>{data?.org_name}</LBSpan>
                {ndData.divloading == "pending" ? <Loader color="loader" /> :
                    <div>
                        <LBSpan margin="0 0 5px 0" lineHight="1.8" uLine="1.8px solid green">{statDData?.datetime_en ? "At " + statDData?.datetime_en ?? <Hypend /> + "BST" : ""} </LBSpan>
                        <LBSpan>{"Temperature: "} {statDData?.temperature_en ? statDData?.temperature_en + "°C" : <Hypend />}</LBSpan>
                        <LBSpan>{"Hourly Rainfall: "} {statDData?.rain_gauge_en ? statDData?.rain_gauge_en + " mm" : <Hypend />} </LBSpan>
                        <LBSpan>{"Daily Rainfall: "} {statDData?.rain_daily_en ? statDData?.rain_daily_en + " mm" : <Hypend />} </LBSpan>
                        <LBSpan>{"Wind Speed: "} {statDData?.wind_speed_en ? statDData?.wind_speed_en + " kph" : <Hypend />}</LBSpan>
                        <LBSpan>{"Wind Direction: "} {statDData?.wind_direction_en ? statDData?.wind_direction_en + "°" : <Hypend />}</LBSpan>
                        <LBSpan>{"Radiation: "} {statDData?.radiation_en ? statDData?.radiation_en + " W/m2" : <Hypend />} </LBSpan>
                        <LBSpan>{"Humidity: "} {statDData?.humidity_en ? statDData?.humidity_en + "%" : <Hypend />} </LBSpan>
                        <LBSpan>{"Surface Pressure: "} {statDData?.pressure_en ? statDData?.pressure_en + " hPa" : <Hypend />} </LBSpan>
                    </div>}
            </div>
        
    </StyledMenu>)
}