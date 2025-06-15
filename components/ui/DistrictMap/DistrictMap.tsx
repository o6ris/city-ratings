"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJsonObject } from "geojson";

type DistrictMapProps = {
  geojson: GeoJsonObject;
  lat: number;
  lon: number;
};
export default function DistrictMap({ geojson, lat, lon }: DistrictMapProps) {
  if (geojson && lat && lon) {
    return (
      <MapContainer
        center={[lat, lon]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={geojson} />
      </MapContainer>
    );
  } else {
    return <div>no map</div>;
  }
}
