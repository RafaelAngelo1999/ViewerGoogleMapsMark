import React from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
} from "@react-google-maps/api";
import { REACT_APP_GOOGLE_API_KEY } from "../App";
import "./MapPage.css";
import { IMOVEIS } from "./Constante";

export interface MapPageProps {}

const MapPage = () => {
  const [map, setMap] = React.useState<google.maps.Map>();

  const [apresentarNome, setApresentarNome] = React.useState<boolean>(false);

  const onMapLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  return (
    <div className="map">
    <button onClick={() => setApresentarNome(!apresentarNome)}>Habilitar e desabilitar nome</button>
      <LoadScript
        googleMapsApiKey={REACT_APP_GOOGLE_API_KEY}
        libraries={["places"]}
      >
        <GoogleMap
          onLoad={onMapLoad}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={{
            lat: IMOVEIS[0].lat,
            lng: IMOVEIS[0].lng,
          }}
          zoom={6}
        >
          {IMOVEIS.map((imovel) =>
             <Marker key={imovel.id} position={{lat: imovel.lat, lng: imovel.lng}} label={apresentarNome ? imovel.nomeLoja : ''} />
        )},
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapPage;
