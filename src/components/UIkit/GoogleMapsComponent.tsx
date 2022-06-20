import React, { useCallback, useRef, VFC } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
// import { LoadScriptUrlOptions } from "@react-google-maps/api/dist/utils/make-load-script-url";
import { PlaceInfo } from "./PlaceInfo";

type Props = {
  info: string;
  lat: string;
  lng: string;
  zoom?: number;
  center?: {
    lat: number;
    lng: number;
  };
  locationLat: string;
  mapContainerStyle: {
    height: string;
    width: string;
    onClick: ((e: any) => void) | undefined;
  };
};

// デフォルトUI（衛星写真オプション）キャンセル
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
const libraries = ["places"];

export const GoogleMapsComponent: VFC<Props> = (props) => {
  const id = window.location.pathname.split(/&|\//)[1];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries,
  });

  //再レンダー防止措置
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={{
          height: props.mapContainerStyle.height,
          width: props.mapContainerStyle.width,
        }}
        zoom={props.zoom}
        center={{
          lat: props.lat,
          lng: props.lng,
        }}
        options={options}
        onLoad={onMapLoad}
        onClick={
          id !== "areapoint" &&
          ((e) => {
            props.locationLat(e.latLng.lat());
            props.locationLng(e.latLng.lng());
          })
        }
      >
        {!props.locationLat && (
          <PlaceInfo info={props.info} lat={props.lat} lng={props.lng} />
        )}
        {props.locationLat && <PlaceInfo lat={props.lat} lng={props.lng} />}
      </GoogleMap>
    </div>
  );
};
