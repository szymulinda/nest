import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Building2, Home, TreePine, Info, Camera, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

interface FormData {
  title: string;
  description: string;
  price: string;
  sqm: string;
  rooms: string;
  city: string;
  street: string;
  type: 'apartment' | 'house' | 'land';
}

const emptyForm: FormData = {
  title: '', description: '', price: '', sqm: '', rooms: '',
  city: '', street: '', type: 'apartment',
};

export default function AddListingPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [images, setImages] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        setLoading(false);
      }
    };
    checkSession();
  }, [navigate]);

  const updateField = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (step === 2 && (!form.title || !form.price || !form.sqm || !form.city)) {
      toast.error('Wypełnij tytuł, cenę, powierzchnię i miejscowość');
      return;
    }
    setStep((s) => Math.min(s + 1, 3));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSave = async () => {
    if (images.length === 0) {
      toast.error('Dodaj przynajmniej jedno zdjęcie');
      return;
    }

    setSaving(true);

    const fullAddress = [form.street.trim(), form.city.trim()].filter(Boolean).join(', ');

    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      price: Number(form.price),
      sqm: Number(form.sqm),
      rooms: form.rooms ? Number(form.rooms) : null,
      address: fullAddress || null,
      type: form.type,
      status: 'available',
      agent_id: user.id,
    };

    const { data, error } = await supabase.from('listings').insert(payload as any).select('id').single();
    
    if (error) {
      toast.error(error.message);
      setSaving(false);
      return;
    }

    const listingId = (data as any).id;

    if (images.length > 0 && listingId) {
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const path = `${user.id}/${listingId}/${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage.from('listing-images').upload(path, file);
        
        if (uploadError) { 
          toast.error(`Błąd zdjęcia: ${uploadError.message}`); 
          continue; 
        }

        const { data: urlData } = supabase.storage.from('listing-images').getPublicUrl(path);
        await supabase.from('listing_images').insert({
          listing_id: listingId,
          url: urlData.publicUrl,
          display_order: i,
        } as any);
      }
    }

    toast.success('Ogłoszenie dodane pomyślnie!');
    queryClient.invalidateQueries({ queryKey: ['listings'] });
    queryClient.invalidateQueries({ queryKey: ['user-listings', user.id] });
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-32">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 1, name: 'Typ', icon: Home },
    { id: 2, name: 'Informacje', icon: Info },
    { id: 3, name: 'Zdjęcia', icon: Camera },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] relative">
      <div className="absolute top-0 left-0 w-full h-40 bg-[#1E293B]" />
      
      <Navbar />

      <div className="flex-1 container px-4 pt-48 pb-20 relative z-10 flex justify-center">
        <div className="w-full max-w-4xl">
          
          <div className="flex items-center justify-between mb-12 px-4 md:px-12 relative">
            <div className="absolute top-1/2 left-4 right-4 md:left-12 md:right-12 h-1 bg-slate-200 -z-10 -translate-y-1/2 rounded-full hidden md:block" />
            <div className="absolute top-1/2 left-4 md:left-12 h-1 bg-blue-600 -z-10 -translate-y-1/2 rounded-full hidden md:block transition-all duration-500" style={{ width: `calc(${((step - 1) / 2) * 100}% - ${step === 3 ? '48px' : '0px'})` }} />
            
            {steps.map((s) => {
              const isActive = step === s.id;
              const isCompleted = step > s.id;
              
              return (
                <div key={s.id} className="flex flex-col items-center gap-3 bg-[#F8FAFC] px-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md ${isActive ? 'bg-blue-600 text-white shadow-blue-500/40 scale-110' : isCompleted ? 'bg-green-500 text-white' : 'bg-white text-slate-400 border border-slate-200'}`}>
                    {isCompleted ? <CheckCircle2 size={24} /> : <s.icon size={24} />}
                  </div>
                  <span className={`text-xs font-black uppercase tracking-widest hidden md:block ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-slate-400'}`}>{s.name}</span>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 md:p-12 min-h-[500px] flex flex-col">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col justify-center">
                  <h2 className="text-3xl font-black text-slate-900 mb-8 text-center">Co chcesz wystawić?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <button onClick={() => { updateField('type', 'apartment'); nextStep(); }} className={`flex flex-col items-center gap-4 p-8 rounded-[2rem] border-2 transition-all ${form.type === 'apartment' ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'}`}>
                      <div className={`p-4 rounded-2xl ${form.type === 'apartment' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <Building2 size={40} />
                      </div>
                      <span className="text-lg font-bold text-slate-900">Mieszkanie</span>
                    </button>
                    <button onClick={() => { updateField('type', 'house'); nextStep(); }} className={`flex flex-col items-center gap-4 p-8 rounded-[2rem] border-2 transition-all ${form.type === 'house' ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'}`}>
                      <div className={`p-4 rounded-2xl ${form.type === 'house' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <Home size={40} />
                      </div>
                      <span className="text-lg font-bold text-slate-900">Dom</span>
                    </button>
                    <button onClick={() => { updateField('type', 'land'); nextStep(); }} className={`flex flex-col items-center gap-4 p-8 rounded-[2rem] border-2 transition-all ${form.type === 'land' ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'}`}>
                      <div className={`p-4 rounded-2xl ${form.type === 'land' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <TreePine size={40} />
                      </div>
                      <span className="text-lg font-bold text-slate-900">Działka</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 space-y-6">
                  <h2 className="text-2xl font-black text-slate-900 mb-6">Podstawowe informacje</h2>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Tytuł ogłoszenia *</label>
                    <Input value={form.title} onChange={(e) => updateField('title', e.target.value)} className="h-14 rounded-2xl bg-slate-50 border-slate-100 px-6 text-lg focus:ring-blue-500/20" placeholder="np. Słoneczne mieszkanie z balkonem" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Cena (PLN) *</label>
                      <Input type="number" value={form.price} onChange={(e) => updateField('price', e.target.value)} className="h-14 rounded-2xl bg-slate-50 border-slate-100 px-6 text-lg font-bold text-blue-600 focus:ring-blue-500/20" placeholder="np. 450000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Powierzchnia (m²) *</label>
                      <Input type="number" value={form.sqm} onChange={(e) => updateField('sqm', e.target.value)} className="h-14 rounded-2xl bg-slate-50 border-slate-100 px-6 text-lg focus:ring-blue-500/20" placeholder="65" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Liczba pokoi</label>
                      <Input type="number" value={form.rooms} onChange={(e) => updateField('rooms', e.target.value)} className="h-14 rounded-2xl bg-slate-50 border-slate-100 px-6 text-lg focus:ring-blue-500/20" placeholder="3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Miejscowość *</label>
                      <Input value={form.city} onChange={(e) => updateField('city', e.target.value)} className="h-14 rounded-2xl bg-slate-50 border-slate-100 px-6 text-lg focus:ring-blue-500/20" placeholder="np. Warszawa" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Ulica i numer</label>
                      <Input value={form.street} onChange={(e) => updateField('street', e.target.value)} className="h-14 rounded-2xl bg-slate-50 border-slate-100 px-6 text-lg focus:ring-blue-500/20" placeholder="np. Złota 44" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Opis nieruchomości</label>
                    <textarea value={form.description} onChange={(e) => updateField('description', e.target.value)} className="w-full min-h-[160px] p-6 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none resize-y text-lg" placeholder="Opisz największe zalety tej nieruchomości..." />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 space-y-6">
                  <h2 className="text-2xl font-black text-slate-900 mb-6">Galeria zdjęć</h2>
                  <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-12 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors relative min-h-[300px]">
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      onChange={(e) => setImages(Array.from(e.target.files || []))} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    />
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-blue-500 mb-6 shadow-sm">
                      <Camera size={40} />
                    </div>
                    <p className="font-black text-slate-900 text-xl mb-2">Kliknij, aby dodać zdjęcia</p>
                    <p className="text-slate-500 text-sm">Możesz zaznaczyć kilka plików naraz (JPG, PNG)</p>
                  </div>
                  {images.length > 0 && (
                    <div className="bg-green-50 text-green-700 p-6 rounded-2xl flex items-center gap-3 border border-green-100 font-bold text-lg">
                      <CheckCircle2 size={24} />
                      Gotowe do wgrania: {images.length} plików
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100">
              <Button 
                onClick={prevStep} 
                variant="ghost" 
                className={`h-14 px-6 rounded-2xl font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100 ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
              >
                <ChevronLeft size={20} className="mr-1" /> Wstecz
              </Button>

              {step < 3 ? (
                <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-10 rounded-2xl font-black shadow-lg shadow-blue-500/20 text-lg">
                  Dalej <ChevronRight size={20} className="ml-1" />
                </Button>
              ) : (
                <Button onClick={handleSave} disabled={saving} className="bg-green-600 hover:bg-green-700 text-white h-14 px-10 rounded-2xl font-black shadow-lg shadow-green-500/20 text-lg">
                  {saving ? 'Wysyłanie...' : 'Opublikuj ofertę'}
                </Button>
              )}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}