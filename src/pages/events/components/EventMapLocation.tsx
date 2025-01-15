import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { useTheme } from "@/context/ThemeContext.js";

// Actualiza el centro del mapa
const UpdateMapCenter = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};

// Componente principal
const EventMapLocation = ({
  eventLocation,
  iconUrl,
  zoom,
}: {
  eventLocation: { lat: number; lng: number };
  iconUrl: string;
  zoom: number;
}) => {
  const { themeMode } = useTheme();

  // Define el icono personalizado
  const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconSize: [25, 25],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const center: [number, number] = [eventLocation.lat, eventLocation.lng];

  return (
    <div className="col-span-12 aspect-[3/2] md:aspect-[16/7] rounded-xl overflow-hidden mx-4">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <UpdateMapCenter center={center} />
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/${
            themeMode === "dark" ? "dark-v11" : "light-v11"
          }/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxlam9zcGluYXIiLCJhIjoiY20wa2lreDMxMTk5eDJrb2F0N3NtNHBkMyJ9.LV8h87QAtrtHZ2U2FP4V1g`}
        />
        <Marker position={center} icon={customIcon} />
      </MapContainer>
    </div>
  );
};

export default EventMapLocation;
