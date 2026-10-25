import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type { ListingWithImages } from '@/features/listings/useListings';
import FavoriteButton from '@/features/listings/components/FavoriteButton';

function formatPrice(price: number) {
  return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 }).format(price);
}

const typeLabels: Record<string, string> = {
  apartment: 'Mieszkanie',
  house: 'Dom',
  land: 'Działka',
};

interface ListingCardProps {
  listing: ListingWithImages;
  index?: number;
}

export default function ListingCard({ listing, index = 0 }: ListingCardProps) {
  const primaryImage = listing.listing_images?.sort((a, b) => a.display_order - b.display_order)[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.19, 1, 0.22, 1] }}
    >
      <Link to={`/listing/${listing.id}`} className="group block bg-card rounded-lg shadow-soft overflow-hidden hover:shadow-soft-lg transition-shadow duration-300">
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          {primaryImage ? (
            <img
              src={primaryImage.url}
              alt={listing.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Brak zdjęcia</span>
            </div>
          )}

          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <FavoriteButton listingId={listing.id} />
          </div>

          {listing.status === 'sold' && (
            <div className="absolute top-3 left-3">
              <span className="text-xs font-semibold bg-destructive text-destructive-foreground px-3 py-1 rounded-full">Sprzedane</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-primary">{typeLabels[listing.type] || listing.type}</span>
            <span className="font-bold text-foreground tabular-nums">{formatPrice(listing.price)}</span>
          </div>
          <h3 className="font-semibold text-base mb-2">{listing.title}</h3>
          <div className="flex gap-3 text-xs text-muted-foreground tabular-nums">
            <span>{listing.sqm} m²</span>
            {listing.rooms && <span>{listing.rooms} {listing.rooms === 1 ? 'pokój' : listing.rooms < 5 ? 'pokoje' : 'pokoi'}</span>}
          </div>
          {listing.address && (
            <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground truncate"><MapPin className="h-3 w-3 shrink-0" />{listing.address}</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
