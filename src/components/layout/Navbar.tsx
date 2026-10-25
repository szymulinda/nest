import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Plus, Menu, X, Heart, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-lg border-b border-slate-200/50 py-3 shadow-sm' 
        : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:rotate-6 transition-transform duration-300">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-none stroke-current stroke-[2.5]">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className={`text-2xl font-black tracking-tighter transition-colors ${
            isScrolled ? 'text-slate-900' : 'text-white md:text-white' 
          }`}>
            NEST
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/listings" className={`text-sm font-bold transition-colors hover:text-blue-500 ${
            isScrolled ? 'text-slate-600' : 'text-slate-100'
          }`}>
            Ogłoszenia
          </Link>
          <Link to="/map" className={`text-sm font-bold transition-colors hover:text-blue-500 ${
            isScrolled ? 'text-slate-600' : 'text-slate-100'
          }`}>
            Mapa
          </Link>
          <Link to="/o-nas" className={`text-sm font-bold transition-colors hover:text-blue-500 ${
            isScrolled ? 'text-slate-600' : 'text-slate-100'
          }`}>
            O nas
          </Link>
          <Link to="/kontakt" className={`text-sm font-bold transition-colors hover:text-blue-500 ${
            isScrolled ? 'text-slate-600' : 'text-slate-100'
          }`}>
            Kontakt
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/dashboard" className={`p-2 rounded-full transition-colors ${
            isScrolled ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-white/10 text-white'
          }`}>
            <Heart size={20} />
          </Link>
          
          <Link to="/dodaj">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-5 shadow-lg shadow-blue-500/20">
              <Plus size={18} className="mr-1" /> Dodaj ogłoszenie
            </Button>
          </Link>

          {user ? (
            <div className="flex items-center gap-1">
              <div className="h-8 w-[1px] bg-slate-200/30 mx-2" />
              <Link to="/dashboard">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={isScrolled ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10'}
                >
                  <User size={20} />
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => { signOut(); navigate('/'); }}
                className={isScrolled ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10'}
              >
                <LogOut size={20} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
               <div className="h-8 w-[1px] bg-slate-200/30 mx-2" />
              <Link to="/auth">
                <Button className={`font-bold rounded-xl px-6 transition-all ${
                  isScrolled 
                  ? 'bg-slate-900 text-white hover:bg-slate-800' 
                  : 'bg-white text-slate-900 hover:bg-slate-100'
                }`}>
                  Zaloguj się
                </Button>
              </Link>
            </div>
          )}
        </div>

        <button 
          className={`md:hidden p-2 rounded-lg ${isScrolled ? 'text-slate-900' : 'text-white'}`} 
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-2xl p-6 space-y-4 flex flex-col">
          <Link to="/listings" className="text-lg font-bold text-slate-900" onClick={() => setMobileOpen(false)}>Ogłoszenia</Link>
          <Link to="/map" className="text-lg font-bold text-slate-900" onClick={() => setMobileOpen(false)}>Mapa</Link>
          <Link to="/o-nas" className="text-lg font-bold text-slate-900" onClick={() => setMobileOpen(false)}>O nas</Link>
          <Link to="/kontakt" className="text-lg font-bold text-slate-900" onClick={() => setMobileOpen(false)}>Kontakt</Link>
          
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <Link to="/dodaj" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-blue-600 font-bold py-6 rounded-xl text-white shadow-lg shadow-blue-500/20">
                <Plus size={18} className="mr-2" /> Dodaj ogłoszenie
              </Button>
            </Link>
            {!user ? (
              <Link to="/auth" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-slate-900 text-white font-bold py-6 rounded-xl hover:bg-slate-800">
                  Zaloguj się
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-slate-900 text-white font-bold py-6 rounded-xl hover:bg-slate-800 flex items-center justify-center gap-2">
                    <User size={18} /> Moje konto
                  </Button>
                </Link>
                <Button variant="outline" className="w-full py-6 rounded-xl font-bold border-slate-200 hover:bg-slate-50 text-slate-900 flex items-center justify-center gap-2" onClick={() => { signOut(); navigate('/'); setMobileOpen(false); }}>
                  <LogOut size={18} /> Wyloguj się
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}