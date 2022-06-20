import { InfoWindow, Marker } from "@react-google-maps/api";
import React, { useState, VFC } from "react";
import styled from "styled-components";

type Props = {
  info: string;
  lat: string;
  lng: string;
  location: string;
};

type SelectState = {
  info: string;
  position?: {
    lat: string;
    lng: string;
  };
};

export const PlaceInfo: VFC<Props> = (props) => {
  // const {info, lat, lng, location} = props
  const places = [
    {
      info: props.info,
      location: { lat: props.lat, lng: props.lng },
    },
  ];

  const [selected, setSelected] = useState<SelectState>();

  return (
    <div>
      {places.map((place) => (
        <Marker
          key={place.info}
          // key={`${place.location.lat * place.location.lng}`}
          position={{
            lat: place.location.lat,
            lng: place.location.lng,
          }}
          onMouseOver={() => {
            setSelected(place);
          }}
        />
      ))}

      {selected ? (
        <InfoWindow
          position={{
            lat: selected.location.lat + 0.00075,
            lng: selected.location.lng,
          }}
          onCloseClick={() => {
            setSelected();
          }}
        >
          <StyledInfo>{selected.info}</StyledInfo>
        </InfoWindow>
      ) : null}
    </div>
  );
};

const StyledInfo = styled.div`
  color: black;
`;
