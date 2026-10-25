import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Facebook, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-20 pb-10 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-none stroke-current stroke-[2.5]">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">NEST</span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm max-w-xs">
              Rewolucjonizujemy sposób, w jaki Polacy szukają domów. Łączymy nowoczesną technologię z ludzkim podejściem.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Nawigacja</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/listings" className="text-sm hover:text-blue-400 flex items-center gap-1 transition-colors">
                  Ogłoszenia <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100" />
                </Link>
              </li>
              <li><Link to="/map" className="text-sm hover:text-blue-400 transition-colors">Interaktywna Mapa</Link></li>
              <li><Link to="/dodaj" className="text-sm hover:text-blue-400 transition-colors">Dodaj ogłoszenie</Link></li>
              <li><Link to="/o-nas" className="text-sm hover:text-blue-400 transition-colors">O nas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Pomoc i Zasady</h4>
            <ul className="space-y-4">
              <li><Link to="/faq" className="text-sm hover:text-blue-400 transition-colors">Częste pytania (FAQ)</Link></li>
              <li><Link to="/regulamin" className="text-sm hover:text-blue-400 transition-colors">Regulamin serwisu</Link></li>
              <li><Link to="/prywatnosc" className="text-sm hover:text-blue-400 transition-colors">Polityka prywatności</Link></li>
              <li><Link to="/bezpieczenstwo" className="text-sm hover:text-blue-400 transition-colors">Bezpieczeństwo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Kontakt</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Napisz do nas</p>
                  <p className="text-sm text-white">kontakt@nest.pl</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Zadzwoń</p>
                  <p className="text-sm text-white">+48 500 600 700</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} NEST Sp. z o.o. Wszystkie prawa zastrzeżone.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1 italic">
              Z miłości do architektury 
              <span className="text-red-500 text-lg">♥</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}