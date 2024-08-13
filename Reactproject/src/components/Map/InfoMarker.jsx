import { InfoWindow, InfoWindowF, MarkerF } from "@react-google-maps/api";
import React, { useRef, useState } from "react";
import { useOutsideClicker } from "../../utils/helper";

export default function InfoMarker({ pubview, data, marker }) {
  const [infoOpen, setInfoOpen] = useState(false);
  const wrapRefInfo = useRef(null);
  useOutsideClicker(wrapRefInfo, () => { setInfoOpen(false) });
  const symbolOne = {
    path: "M -2,0 0,-2 2,0 0,2 z",
    strokeColor: "#F00",
    fillColor: "#F00",
    fillOpacity: 1,
  }
  const SCG = {
    path: "M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z",
    fillColor: "red",
    fillOpacity: 0.8,
    strokeWeight: 0,
    rotation: 0,
    scale: 0.05,
    anchor: new google.maps.Point(0, 20),
  }

  return (<React.Fragment>

    <MarkerF onClick={() => setInfoOpen(!infoOpen)} icon={marker ? "" : symbolOne} options={{}} animation={google.maps.Animation.DROP} title={data?.station_name ?? "---"} position={data}>
      {marker && infoOpen && <InfoWindowF >
        {
          pubview ? <div ref={wrapRefInfo} style={{ border: "2px solid", borderRadius: "5px", padding: "10px", color: "#000000", background: "#eefff6" }}>
            <span>{"Name: " + data.station_name}</span> <br />
            <span>{"Sunrise: " + data.sunrise}</span> <br />
            <span>{"Sunset: " + data.sunset}</span> <br />
            <span>{"LatLng: " + data.lat + "," + data.lng}</span></div> : <div style={{ border: "2px solid", borderRadius: "5px", padding: "10px", color: "#000000", background: "#eefff6" }}>
            <span>{"Name: " + data.district_name_en + "( " + data.district_name_bn + " )"}</span> <br />
            <span>{"LatLng: " + data.lat + "," + data.lng}</span>
          </div>
        }
      </InfoWindowF>}
    </MarkerF>
  </React.Fragment>)
}