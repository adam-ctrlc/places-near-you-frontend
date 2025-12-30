import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "../common";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const createCustomIcon = (isActive = false) => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div class="relative flex flex-col items-center">
        <div class="${
          isActive ? "size-10 bg-primary" : "size-8 bg-surface-dark"
        } rounded-full rounded-br-none -rotate-45 flex items-center justify-center shadow-lg border-2 ${
      isActive ? "border-white" : "border-slate-600"
    } transform transition-transform hover:scale-110">
          <span class="material-symbols-outlined text-white rotate-45 text-[${
            isActive ? "20" : "16"
          }px]">location_on</span>
        </div>
      </div>
    `,
    iconSize: [isActive ? 40 : 32, isActive ? 40 : 32],
    iconAnchor: [isActive ? 20 : 16, isActive ? 40 : 32],
    popupAnchor: [0, -40],
  });
};

function MapUpdater({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
}

export function PlacesMap({
  places = [],
  center = [37.7749, -122.4194],
  zoom = 13,
  activePlace = null,
  onPlaceClick,
  onMapMove,
  className = "",
}) {
  const mapRef = useRef(null);

  return (
    <div className={`relative h-full w-full ${className}`}>
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={zoom}
        className="h-full w-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater center={center} zoom={zoom} />
        {places.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lon]}
            icon={createCustomIcon(activePlace?.id === place.id)}
            eventHandlers={{
              click: () => onPlaceClick?.(place),
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-24 object-cover rounded-md mb-2"
                />
                <h4 className="font-bold text-sm">{place.name}</h4>
                <div className="flex items-center gap-1 text-xs mt-1">
                  <span className="text-amber-400">★</span>
                  <span>{place.rating}</span>
                  <span className="text-gray-500">
                    ({place.reviewCount} reviews)
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {place.category} • {place.priceLevel} • {place.distance}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute bottom-8 right-8 z-[1000] flex flex-col gap-2">
        <Button
          variant="outline"
          icon="my_location"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((pos) => {
                mapRef.current?.setView(
                  [pos.coords.latitude, pos.coords.longitude],
                  15
                );
              });
            }
          }}
          className="bg-white dark:bg-surface-dark shadow-lg"
        />
        <div className="flex flex-col bg-white dark:bg-surface-dark rounded-lg shadow-lg overflow-hidden">
          <Button
            variant="ghost"
            icon="add"
            onClick={() =>
              mapRef.current?.setZoom(mapRef.current.getZoom() + 1)
            }
            className="border-b border-slate-200 dark:border-slate-700 rounded-none"
          />
          <Button
            variant="ghost"
            icon="remove"
            onClick={() =>
              mapRef.current?.setZoom(mapRef.current.getZoom() - 1)
            }
            className="rounded-none"
          />
        </div>
      </div>
    </div>
  );
}
