import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin } from 'lucide-react';
import { type ListingFilters } from '@/features/listings/useListings';
import clsx from 'clsx';

interface SearchFiltersProps {
  onFilter: (filters: ListingFilters & { location?: string, maxSqm?: number }) => void;
  variant?: 'default' | 'hero';
}

const types = [
  { id: 'all', label: 'Wszystkie' },
  { id: 'apartment', label: 'Mieszkanie' },
  { id: 'house', label: 'Dom' },
  { id: 'land', label: 'Działka' },
];

export default function SearchFilters({ onFilter, variant = 'default' }: SearchFiltersProps) {
  const [activeType, setActiveType] = useState('all');
  const [location, setLocation] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [sqmFrom, setSqmFrom] = useState('');
  const [sqmTo, setSqmTo] = useState('');

  const handleSearch = () => {
    onFilter({
      type: activeType === 'all' ? undefined : activeType,
      search: location || undefined,
      minPrice: priceFrom ? parseInt(priceFrom) : undefined,
      maxPrice: priceTo ? parseInt(priceTo) : undefined,
      minSqm: sqmFrom ? parseInt(sqmFrom) : undefined,
      maxSqm: sqmTo ? parseInt(sqmTo) : undefined,
    });
  };

  return (
    <div className={clsx(
      "w-full transition-all duration-300",
      variant === 'hero' ? "bg-white p-3 rounded-2xl" : "bg-white p-5 rounded-2xl shadow-sm border border-slate-100"
    )}>
      <div className="flex flex-col gap-3 w-full">
        
        <div className="flex flex-col lg:flex-row items-center gap-3 w-full">
          <div className="flex w-full lg:w-auto p-1 bg-slate-50 rounded-xl border border-slate-100 overflow-x-auto scrollbar-hide flex-shrink-0">
            {types.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={clsx(
                  "flex-1 lg:flex-none px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all whitespace-nowrap",
                  activeType === type.id 
                    ? "bg-blue-600 text-white shadow-sm" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="relative flex-1 w-full min-w-[200px]">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input 
              placeholder="Lokalizacja..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-11 h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-blue-200 rounded-xl font-bold text-slate-900 w-full text-sm"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-3 w-full">
          
          <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl h-12 px-4 flex-1 w-full focus-within:bg-white focus-within:border-blue-200 transition-colors">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-3 shrink-0">Cena:</span>
            <input 
              type="number"
              placeholder="Od"
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
              className="w-full bg-transparent outline-none font-bold text-slate-900 text-sm placeholder:text-slate-400 min-w-[40px]"
            />
            <span className="text-slate-300 font-bold mx-2 shrink-0">-</span>
            <input 
              type="number"
              placeholder="Do"
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
              className="w-full bg-transparent outline-none font-bold text-slate-900 text-sm placeholder:text-slate-400 min-w-[40px]"
            />
          </div>

          <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl h-12 px-4 flex-1 w-full focus-within:bg-white focus-within:border-blue-200 transition-colors">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-3 shrink-0">Metraż:</span>
            <input 
              type="number"
              placeholder="Od"
              value={sqmFrom}
              onChange={(e) => setSqmFrom(e.target.value)}
              className="w-full bg-transparent outline-none font-bold text-slate-900 text-sm placeholder:text-slate-400 min-w-[40px]"
            />
            <span className="text-slate-300 font-bold mx-2 shrink-0">-</span>
            <input 
              type="number"
              placeholder="Do"
              value={sqmTo}
              onChange={(e) => setSqmTo(e.target.value)}
              className="w-full bg-transparent outline-none font-bold text-slate-900 text-sm placeholder:text-slate-400 min-w-[40px]"
            />
          </div>

          <Button 
            onClick={handleSearch}
            className="w-full lg:w-auto h-12 px-8 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-[11px] transition-all shadow-md flex-shrink-0"
          >
            <Search size={16} className="mr-2" />
            Szukaj
          </Button>
          
        </div>

      </div>
    </div>
  );
}