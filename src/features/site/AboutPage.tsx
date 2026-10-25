import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Building2, Users, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Hero Section - Ciemny nagłówek dla kontrastu z Navbarem */}
      <section className="bg-[#1E293B] pt-32 pb-20 md:pt-48 md:pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] rounded-full translate-x-1/3" />
        
        <div className="container relative z-10 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 text-blue-400 font-bold tracking-widest uppercase text-xs mb-6">
              <Building2 size={16} />
              <span>Poznaj naszą historię</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
              Zmieniamy sposób, w jaki <br />
              <span className="text-blue-500">szukasz domu.</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
              NEST powstało z pasji do architektury i technologii. Wierzymy, że proces szukania własnego miejsca na ziemi powinien być tak samo ekscytujący, jak sam moment przeprowadzki.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Nasza Misja */}
      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                    src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1200"
                    alt="Nowoczesne wnętrze"
                    className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-8 rounded-2xl hidden md:block shadow-xl">
                <p className="text-4xl font-black mb-1">5+</p>
                <p className="text-sm font-bold uppercase tracking-wider opacity-80">Lat na rynku</p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Dlaczego stworzyliśmy <br /> platformę NEST?
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Rynek nieruchomości w Polsce bywa trudny i nieprzejrzysty. Naszym celem było stworzenie narzędzia, które oddaje kontrolę w ręce użytkownika, oferując tylko zweryfikowane ogłoszenia i bezpośredni kontakt z najlepszymi agentami.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Bezpieczeństwo przede wszystkim</h4>
                    <p className="text-sm text-slate-500">Każda oferta przechodzi przez nasz system weryfikacji danych.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Ludzkie podejście</h4>
                    <p className="text-sm text-slate-500">Nie jesteśmy tylko algorytmem. Wspieramy naszych klientów na każdym kroku.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nasze Wartości */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="container px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight uppercase">Nasze Wartości</h2>
            <div className="w-16 h-1.5 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-slate-500">To one definiują każdy nasz krok i każdą decyzję, którą podejmujemy jako zespół.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Heart size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Empatia</h3>
              <p className="text-slate-500 leading-relaxed">Rozumiemy, że dom to coś więcej niż ściany. To emocje, bezpieczeństwo i przyszłość Twojej rodziny.</p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Building2 size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Innowacja</h3>
              <p className="text-slate-500 leading-relaxed">Wykorzystujemy najnowsze technologie, takie jak interaktywne mapy, aby ułatwić Ci proces decyzyjny.</p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Transparentność</h3>
              <p className="text-slate-500 leading-relaxed">Żadnych ukrytych kosztów. Żadnych niejasnych zapisów. Czyste zasady od początku do końca.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 container px-4">
        <div className="bg-[#1E293B] rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          {/* Usunięto wzór tła */}
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 relative z-10 leading-tight">
            Gotowy, by znaleźć swoje <br /> wymarzone mieszkanie?
          </h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
            <Link to="/listings" className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
              PRZEGLĄDAJ OGŁOSZENIA <ArrowRight size={20} />
            </Link>
            <Link to="/kontakt" className="bg-white text-[#1E293B] px-10 py-5 rounded-2xl font-black hover:bg-slate-100 transition-all">
              SKONTAKTUJ SIĘ Z NAMI
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}