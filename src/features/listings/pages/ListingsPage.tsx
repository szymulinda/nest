import { useState } from 'react';
import { useListings, type ListingFilters } from '@/features/listings/useListings';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ListingCard from '@/features/listings/components/ListingCard';
import SearchFilters from '@/features/listings/components/SearchFilters';
import SkeletonCard from '@/features/listings/components/SkeletonCard';
import { Building2, Search } from 'lucide-react';

export default function ListingsPage() {
  const [filters, setFilters] = useState<ListingFilters>({});
  const { data: listings, isLoading } = useListings(filters);

  return (
    <div className="min-h-screen bg-slate-50"> {/* Delikatne szare tło dla kontrastu z białymi kartami */}
      <Navbar />

      {/* Nagłówek strony (Header Section) - Ciemne tło dla kontrastu z Navbarem */}
      <section className="bg-[#1E293B] pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        {/* Subtelny wzór w tle lub efekt świetlny */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        
        <div className="container relative z-10 px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-blue-400 font-bold tracking-widest uppercase text-xs mb-4">
              <Building2 size={16} />
              <span>Przeglądaj rynek</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Nasze <span className="text-blue-500">Ogłoszenia</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-xl">
              Znajdź idealne miejsce do życia spośród setek zweryfikowanych ofert z całej Polski.
            </p>
          </div>
        </div>
      </section>

      {/* Sekcja Filtrów - "pływająca" nad tłem */}
      <section className="relative z-20 -mt-10 md:-mt-12">
        <div className="container px-4">
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-2 border border-slate-100">
            <div className="p-4">
              {/* Używamy tego samego SearchFilters co na głównej */}
              <SearchFilters onFilter={setFilters} variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Grid z Ogłoszeniami */}
      <main className="container py-16 px-4">
        <div className="flex items-center justify-between mb-10">
          <p className="text-slate-500 font-medium">
            Znaleziono: <span className="text-slate-900 font-bold">{listings?.length || 0} ofert</span>
          </p>
          <div className="h-[1px] flex-1 mx-6 bg-slate-200 hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : listings && listings.length > 0 ? (
            listings.map((listing, i) => (
              <ListingCard key={listing.id} listing={listing} index={i} />
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-slate-300" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-700">Brak dopasowań</h3>
              <p className="text-slate-500 mt-1 mb-6">Spróbuj zresetować filtry, aby zobaczyć więcej wyników.</p>
              <button 
                onClick={() => setFilters({})}
                className="text-blue-600 font-bold hover:underline"
              >
                Wyczyść wszystkie filtry
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}