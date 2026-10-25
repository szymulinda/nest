import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useListings, type ListingFilters } from '@/features/listings/useListings';
import ListingCard from '@/features/listings/components/ListingCard';
import SearchFilters from '@/features/listings/components/SearchFilters';
import SkeletonCard from '@/features/listings/components/SkeletonCard';
import Navbar from '@/components/layout/Navbar';
import { Building2, ArrowRight, LayoutGrid, Map, Search } from 'lucide-react';

export default function HomePage() {
  const [filters, setFilters] = useState<ListingFilters>({});
  const { data: listings, isLoading } = useListings(filters);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <section className="relative min-h-screen md:h-[85vh] md:min-h-[650px] w-full flex items-center pt-24 md:pt-28 py-12 md:py-0 overflow-hidden"> 
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000" 
            alt="Nowoczesny dom" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/50" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 text-blue-400 font-bold tracking-wider uppercase text-xs mb-4">
                <Building2 size={16} className="md:w-[18px]" />
                <span>Twój partner w nieruchomościach</span>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight md:leading-[1.05] drop-shadow-xl">
                Znajdź miejsce, <br />
                które <span className="underline decoration-blue-500 underline-offset-8">pokocha Twoja rodzina</span>
              </h1>
              
              <p className="text-slate-200 text-base md:text-xl max-w-2xl mb-8 md:mb-12 drop-shadow-md">
                Największa baza ogłoszeń w Polsce. Od przytulnych mieszkań po luksusowe rezydencje. 
                Sprawdź, co przygotowaliśmy dla Ciebie dzisiaj.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full md:max-w-4xl" 
            >
              <div className="bg-white rounded-2xl shadow-2xl p-1 md:p-2 border-2 md:border-4 border-white/20">
                <div className="bg-white p-2">
                   <SearchFilters onFilter={setFilters} variant="hero" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="bg-slate-50 border-b border-slate-100 py-6 md:py-8">
        <div className="container mx-auto px-4 flex justify-between gap-4 overflow-x-auto no-scrollbar">
            <div className="min-w-fit text-center md:text-left">
              <p className="text-xl md:text-2xl font-black text-blue-600">2.5k+</p>
              <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Ofert domów</p>
            </div>
            <div className="min-w-fit text-center md:text-left">
              <p className="text-xl md:text-2xl font-black text-blue-600">1.2k+</p>
              <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Mieszkań</p>
            </div>
            <div className="min-w-fit text-center md:text-left">
              <p className="text-xl md:text-2xl font-black text-blue-600">150+</p>
              <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Nowych dziś</p>
            </div>
            <div className="min-w-fit text-center md:text-left">
              <p className="text-xl md:text-2xl font-black text-blue-600">24/7</p>
              <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Wsparcie</p>
            </div>
        </div>
      </div>

      <section className="py-12 md:py-20 container mx-auto px-4">
          <div className="flex justify-between items-end mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Ostatnio dodane</h2>
            <Link to="/listings" className="text-blue-600 font-bold hover:underline text-sm md:text-base">Zobacz wszystkie →</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            ) : listings?.slice(0, 6).map((listing, i) => (
              <ListingCard key={listing.id} listing={listing} index={i} />
            ))}
          </div>
      </section>
    </div>
  );
}