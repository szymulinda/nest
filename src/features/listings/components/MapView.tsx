import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  listings: any[];
}

const createCustomIcon = (price: number) => {
  const formattedPrice = price >= 1000000 
    ? `${(price / 1000000).toFixed(1)}M` 
    : `${Math.round(price / 1000)}k`;

  return L.divIcon({
    className: 'bg-transparent border-0',
    html: `<div style="background-color: #1E293B; color: white; padding: 6px 12px; border-radius: 9999px; font-weight: 800; font-size: 13px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border: 2px solid white; white-space: nowrap; text-align: center;">${formattedPrice} zł</div>`,
    iconSize: [80, 40],
    iconAnchor: [40, 20],
  });
};

const GeocodedMarker = ({ listing }: { listing: any }) => {
  const [position, setPosition] = useState<[number, number] | null>(
    listing.lat && listing.lng ? [listing.lat, listing.lng] : null
  );

  useEffect(() => {
    if (!position && listing.address) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listing.address)}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
          } else {
            setPosition([52.2297 + (Math.random() - 0.5) * 0.1, 21.0122 + (Math.random() - 0.5) * 0.1]);
          }
        })
        .catch(() => {
          setPosition([52.2297 + (Math.random() - 0.5) * 0.1, 21.0122 + (Math.random() - 0.5) * 0.1]);
        });
    }
  }, [listing.address, listing.lat, listing.lng]);

  if (!position) return null;

  const typeLabel = listing.type === 'apartment' ? 'Mieszkanie' : listing.type === 'house' ? 'Dom' : 'Działka';

  return (
    <Marker position={position} icon={createCustomIcon(listing.price || 0)}>
      <Popup className="custom-popup" closeButton={false}>
        <div className="w-64 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col pointer-events-auto">
          <div className="relative aspect-[4/3] w-full bg-slate-100">
            {listing.images?.[0] ? (
              <img 
                src={listing.images[0]} 
                className="w-full h-full object-cover"
                alt={listing.title}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Brak zdjęcia</span>
              </div>
            )}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
              {typeLabel}
            </div>
          </div>
          
          <div className="p-4 flex flex-col gap-1">
            <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 min-h-[40px]">
              {listing.title}
            </h3>
            <p className="text-blue-600 font-black text-xl mb-2">
              {listing.price?.toLocaleString()} zł
            </p>
            <Link 
              to={`/listing/${listing.id}`} 
              className="w-full text-center bg-slate-900 hover:bg-blue-600 text-white text-[11px] uppercase tracking-widest font-black py-3 rounded-xl transition-all shadow-md"
            >
              Zobacz ofertę
            </Link>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default function MapView({ listings }: MapViewProps) {
  const center: [number, number] = [52.0, 19.0];

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden relative z-0 bg-slate-50">
      <style>{`
        .custom-popup .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
          border-radius: 0 !important;
        }
        .custom-popup .leaflet-popup-content {
          margin: 0 !important;
          width: auto !important;
        }
        .custom-popup .leaflet-popup-tip-container {
          display: none !important;
        }
        .custom-popup a.leaflet-popup-close-button {
          display: none !important;
        }
      `}</style>
      
      <MapContainer 
        center={center} 
        zoom={6} 
        className="h-full w-full outline-none"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        {listings.map((listing, index) => (
          <GeocodedMarker key={listing.id || index} listing={listing} />
        ))}
      </MapContainer>
    </div>
  );
}