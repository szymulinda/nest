import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Phone, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useListing } from '@/features/listings/useListings';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FavoriteButton from '@/features/listings/components/FavoriteButton';
import MapView from '@/features/listings/components/MapView';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

function formatPrice(price: number) {
  return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 }).format(price);
}

const typeLabels: Record<string, string> = {
  apartment: 'Mieszkanie',
  house: 'Dom',
  land: 'Działka',
};

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: listing, isLoading } = useListing(id!);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [showContact, setShowContact] = useState(false);

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Twoje zapytanie zostało wysłane do agenta.');
    setContactForm({ name: '', email: '', message: '' });
    setShowContact(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 container py-12">
          <Skeleton className="w-full aspect-video rounded-lg" />
          <div className="mt-8 space-y-4">
            <Skeleton className="h-8 w-1/2 rounded-lg" />
            <Skeleton className="h-4 w-1/3 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 container py-24 text-center">
          <p className="text-muted-foreground">Ogłoszenie nie zostało znalezione.</p>
        </div>
      </div>
    );
  }

  const images = listing.listing_images?.sort((a, b) => a.display_order - b.display_order) ?? [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="bg-[#1E293B] pt-32 pb-12">
        <div className="container flex items-start justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              {typeLabels[listing.type] || listing.type}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 text-white tracking-tight">{listing.title}</h1>
            {listing.address && (
              <p className="text-slate-300 text-sm mt-3 flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-red-400" /> {listing.address}
              </p>
            )}
          </div>
          <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-md">
            <FavoriteButton listingId={listing.id} />
          </div>
        </div>
      </div>

      <div className="w-full bg-background border-b border-border py-6 overflow-hidden">
        <div className="container">
          <div className="flex justify-center">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide max-w-full">
              {images.length > 0 ? (
                images.map((img, i) => (
                  <motion.div
                    key={img.id}
                    className="w-[85vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0 snap-center first:ml-0 last:mr-0"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={img.url}
                      alt={`${listing.title} - ${i + 1}`}
                      className="w-full aspect-[4/3] object-cover rounded-xl shadow-md border border-slate-100"
                      loading="lazy"
                    />
                  </motion.div>
                ))
              ) : (
                <div className="w-full max-w-4xl aspect-video bg-secondary rounded-xl flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Brak zdjęć</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-wrap gap-8 py-6 border-b border-border mb-10">
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Cena</p>
                  <p className="text-3xl font-black text-primary tabular-nums tracking-tight">{formatPrice(listing.price)}</p>
                </div>
                <div className="w-px bg-border hidden md:block"></div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Powierzchnia</p>
                  <p className="text-3xl font-black text-slate-900 tabular-nums tracking-tight">{listing.sqm} <span className="text-lg font-medium text-slate-500">m²</span></p>
                </div>
                {listing.rooms && (
                  <>
                    <div className="w-px bg-border hidden md:block"></div>
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Pokoje</p>
                      <p className="text-3xl font-black text-slate-900 tabular-nums tracking-tight">{listing.rooms}</p>
                    </div>
                  </>
                )}
              </div>

              {listing.description && (
                <div className="mb-12">
                   <h3 className="text-xl font-bold text-slate-900 mb-5">Opis nieruchomości</h3>
                   <p className="text-base leading-relaxed text-slate-600 whitespace-pre-wrap">
                    {listing.description}
                  </p>
                </div>
              )}

              {listing.lat && listing.lng && (
                <div className="rounded-xl overflow-hidden h-[450px] border border-border shadow-sm">
                  <MapView listings={[listing]} />
                </div>
              )}
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-5">
              {listing.profiles && (
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-4">Twój Doradca</p>
                  <div className="flex items-center gap-4 mb-4">
                    {listing.profiles.avatar_url ? (
                      <img 
                        src={listing.profiles.avatar_url} 
                        alt="Agent" 
                        className="w-14 h-14 rounded-full object-cover border-2 border-slate-100"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <User className="h-6 w-6" />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-lg text-slate-900 leading-tight">{listing.profiles.full_name || 'Ekspert NEST'}</p>
                      {listing.profiles.phone && (
                        <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-blue-600"><Phone className="h-4 w-4" />{listing.profiles.phone}</p>
                      )}
                    </div>
                  </div>
                  {listing.profiles.bio && (
                    <p className="text-sm text-slate-500 mt-4 leading-relaxed pt-4 border-t border-border">
                      {listing.profiles.bio}
                    </p>
                  )}
                </div>
              )}

              <Button
                variant="default"
                size="lg"
                className="w-full font-bold h-14 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                onClick={() => setShowContact(!showContact)}
              >
                ZAPYTAJ O OFERTĘ
              </Button>

              {showContact && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleContact}
                  className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm"
                >
                  <Input
                    placeholder="Imię i nazwisko"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    className="rounded-lg bg-slate-50/50"
                  />
                  <Input
                    type="email"
                    placeholder="Adres e-mail"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    className="rounded-lg bg-slate-50/50"
                  />
                  <Textarea
                    placeholder="Twoja wiadomość..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                    className="rounded-lg min-h-[120px] bg-slate-50/50 resize-none"
                  />
                  <Button type="submit" variant="default" size="lg" className="w-full font-bold rounded-lg">
                    Wyślij wiadomość
                  </Button>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}