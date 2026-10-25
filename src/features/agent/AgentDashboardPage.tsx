import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ListingCard from '@/features/listings/components/ListingCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Building2, 
  Settings, 
  LogOut, 
  ShieldCheck,
  PlusCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from "@/lib/supabase/client";
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from '@/features/auth/AuthContext';

type TabType = 'listings' | 'favorites' | 'settings';

export default function AgentDashboardPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<TabType>('listings');
  const [profile, setProfile] = useState({
    full_name: '',
    phone: '',
    email: '',
    bio: ''
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        setProfile({
          full_name: data?.full_name || '',
          phone: data?.phone || '',
          email: user.email || '',
          bio: data?.bio || ''
        });
      };
      fetchProfile();
    }
  }, [user]);

  const { data: userListings } = useQuery({
    queryKey: ['user-listings', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*, listing_images(*)')
        .eq('agent_id', user?.id);
        
      if (error) throw error;
      return data as any[];
    },
    enabled: !!user?.id,
  });

  const { data: favoriteListings } = useQuery({
    queryKey: ['favorite-listings', user?.id],
    queryFn: async () => {
      const { data: favs, error: favError } = await supabase
        .from('favorites')
        .select('listing_id')
        .eq('user_id', user?.id);

      if (favError) throw favError;
      if (!favs || favs.length === 0) return [];

      const listingIds = favs.map(f => f.listing_id);

      const { data, error } = await supabase
        .from('listings')
        .select('*, listing_images(*)')
        .in('id', listingIds);

      if (error) throw error;
      return data as any[];
    },
    enabled: !!user?.id,
  });

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleUpdateProfile = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({ 
        full_name: profile.full_name,
        phone: profile.phone,
        bio: profile.bio
      })
      .eq('id', user?.id);

    if (!error) {
      toast.success("Profil zaktualizowany!");
    } else {
      toast.error("Wystąpił błąd podczas aktualizacji profilu.");
    }
  };

  if (authLoading || !user) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <section className="bg-[#1E293B] pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-500/20">
                  {profile.full_name?.substring(0, 2).toUpperCase() || 'U'}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl md:text-3xl font-black text-white">{profile.full_name || 'Użytkownik'}</h1>
                  <ShieldCheck className="text-blue-400" size={20} />
                </div>
                <p className="text-slate-400 font-medium">{profile.email}</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/dodaj')}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-6 h-12 flex items-center gap-2 font-bold shadow-lg shadow-blue-500/20"
            >
              <PlusCircle size={20} />
              Dodaj ogłoszenie
            </Button>
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-30 bg-white border-b border-slate-100">
        <div className="container px-4">
          <div className="flex gap-8 overflow-x-auto no-scrollbar">
            {[
              { id: 'listings', label: 'Moje ogłoszenia', icon: Building2 },
              { id: 'favorites', label: 'Ulubione', icon: Heart },
              { id: 'settings', label: 'Ustawienia', icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 py-6 border-b-2 font-bold text-sm uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="container px-4 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'listings' && (
            <motion.div
              key="listings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {userListings?.map((listing) => (
                <div key={listing.id} className="relative group">
                  <ListingCard listing={listing} />
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      onClick={() => navigate(`/edit-listing/${listing.id}`)}
                      size="sm" 
                      className="bg-white/90 backdrop-blur-md text-slate-900 hover:bg-white font-bold rounded-xl shadow-lg"
                    >
                      Edytuj
                    </Button>
                  </div>
                </div>
              ))}
              {userListings?.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <p className="text-slate-400 text-lg">Nie masz jeszcze żadnych ogłoszeń.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'favorites' && (
            <motion.div
              key="favorites"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {favoriteListings?.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
              {(!favoriteListings || favoriteListings.length === 0) && (
                <div className="col-span-full py-20 text-center">
                  <p className="text-slate-400 text-lg">Nie masz jeszcze polubionych ogłoszeń.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100"
            >
              <h2 className="text-2xl font-black text-slate-900 mb-8">Dane profilowe</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Imię i Nazwisko</label>
                    <Input 
                      value={profile.full_name} 
                      onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                      className="h-14 rounded-2xl bg-slate-50 border-slate-100" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Numer telefonu</label>
                    <Input 
                      value={profile.phone} 
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="h-14 rounded-2xl bg-slate-50 border-slate-100" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Adres E-mail</label>
                  <Input disabled value={profile.email} className="h-14 rounded-2xl bg-slate-50 border-slate-100 opacity-60" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Opis (Bio)</label>
                  <textarea 
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    placeholder="Napisz kilka słów o sobie..."
                    className="w-full min-h-[120px] p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-y"
                  />
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 pt-6">
                  <Button 
                    onClick={handleUpdateProfile}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-black px-10 h-14 rounded-2xl shadow-lg shadow-blue-500/20"
                  >
                    Zapisz zmiany
                  </Button>
                  <Button 
                    onClick={handleSignOut}
                    variant="ghost" 
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 font-bold h-14 rounded-2xl flex items-center gap-2"
                  >
                    <LogOut size={20} />
                    Wyloguj się
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}