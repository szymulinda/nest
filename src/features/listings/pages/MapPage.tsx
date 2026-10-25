import { useListings } from '@/features/listings/useListings';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MapView from '@/features/listings/components/MapView';
import { MapPin } from 'lucide-react';

export default function MapPage() {
  const { data: listings, isLoading } = useListings();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Ciemny nagłówek - rozwiązuje problem niewidocznego Navbaru */}
      <section className="bg-[#1E293B] pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-blue-400 font-bold tracking-widest uppercase text-xs mb-4">
              <MapPin size={16} />
              <span>Lokalizacje ofert</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Interaktywna <span className="text-blue-500">Mapa</span>
            </h1>
            <p className="text-slate-300 text-lg">
              Przeglądaj wszystkie dostępne nieruchomości bezpośrednio na mapie.
            </p>
          </div>
        </div>
      </section>

      {/* Kontener Mapy - Musi mieć h-[600px] lub podobną wysokość */}
      <main className="flex-1 container mx-auto px-4 -mt-10 mb-20 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl p-2 border border-slate-100 h-[600px] md:h-[700px] overflow-hidden">
          {isLoading ? (
            <div className="w-full h-full bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center">
              <p className="text-slate-400 font-bold uppercase tracking-widest">Inicjalizacja mapy...</p>
            </div>
          ) : (
            <MapView listings={listings ?? []} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}