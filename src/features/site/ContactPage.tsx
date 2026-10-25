import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Wiadomość wysłana!",
        description: "Odezwiemy się do Ciebie w ciągu 24 godzin.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <section className="bg-[#1E293B] pt-32 pb-20 md:pt-48 md:pb-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="container relative z-10 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 text-blue-400 font-bold tracking-widest uppercase text-xs mb-6">
              <MessageSquare size={16} />
              <span>Jesteśmy tu dla Ciebie</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
              Porozmawiajmy o Twoim <br />
              <span className="text-blue-500">nowym domu.</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
              Masz pytania dotyczące oferty? Chcesz sprzedać nieruchomość? 
              Nasz zespół ekspertów czeka, aby Ci pomóc.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Mail size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Napisz do nas</h4>
              <p className="text-slate-500 text-sm mb-4">Nasz zespół odpowie w ciągu 24h.</p>
              <a href="mailto:kontakt@nest.pl" className="text-blue-600 font-bold hover:underline">kontakt@nest.pl</a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Phone size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Zadzwoń</h4>
              <p className="text-slate-500 text-sm mb-4">Pn-Pt od 9:00 do 18:00.</p>
              <a href="tel:+48500600700" className="text-blue-600 font-bold hover:underline">+48 500 600 700</a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <MapPin size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Lokalizacja</h4>
              <p className="text-slate-500 text-sm mb-4">Warszawa, ul. Architektów 12</p>
              <p className="text-slate-900 font-bold">Biuro Śródmieście</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-2xl font-black text-slate-900 mb-8">Wyślij szybką wiadomość</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Imię i Nazwisko</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Jan Kowalski"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Adres E-mail</label>
                    <input 
                      required
                      type="email" 
                      placeholder="jan@kowalski.pl"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Temat rozmowy</label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer">
                    <option>Szukam nieruchomości</option>
                    <option>Chcę sprzedać dom</option>
                    <option>Współpraca agenta</option>
                    <option>Inny temat</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Wiadomość</label>
                  <textarea 
                    required
                    rows={5}
                    placeholder="W czym możemy Ci pomóc?"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <Button 
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-10 py-7 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-3"
                >
                  {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
                  {!isSubmitting && <Send size={20} />}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="h-[500px] w-full relative group overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt="Nowoczesne Biuro NEST"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-white/20 shadow-2xl max-w-lg w-full text-center"
          >
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-blue-500/40">
              <MapPin size={32} />
            </div>
            <h3 className="text-white text-3xl font-black mb-2 tracking-tight">Odwiedź naszą siedzibę</h3>
            <p className="text-blue-200 font-bold mb-6 uppercase tracking-widest text-xs">Warszawa Śródmieście</p>
            <div className="space-y-1">
              <p className="text-white/90 text-lg">ul. Architektów 12</p>
              <p className="text-white/60">Poniedziałek — Piątek, 09:00 — 18:00</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 