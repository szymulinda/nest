import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isAgent, setIsAgent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: { full_name: fullName },
        },
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      if (isAgent) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('profiles').update({ role: 'agent' } as any).eq('id', user.id);
        }
      }

      toast.success('Konto utworzone. Sprawdź email, aby potwierdzić.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }
      toast.success('Witaj ponownie!');
      navigate('/');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-[#1E293B]" />
      
      <Navbar />

      <div className="flex-1 flex items-center justify-center relative z-10 px-4 pt-48 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 md:p-10">
            <h1 className="text-3xl font-black mb-8 text-center text-slate-900 tracking-tight">
              {isSignUp ? 'Utwórz konto' : 'Zaloguj się'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              {isSignUp && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Imię i nazwisko</label>
                  <Input
                    placeholder="Jan Kowalski"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="h-14 rounded-2xl bg-slate-50 border-slate-100 px-6 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Adres E-mail</label>
                <Input
                  type="email"
                  placeholder="jan@kowalski.pl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-14 rounded-2xl bg-slate-50 border-slate-100 px-6 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Hasło</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="h-14 rounded-2xl bg-slate-50 border-slate-100 px-6 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              {isSignUp && (
                <label className="flex items-center gap-3 cursor-pointer py-2">
                  <input
                    type="checkbox"
                    checked={isAgent}
                    onChange={(e) => setIsAgent(e.target.checked)}
                    className="w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-sm font-bold text-slate-600">Rejestruję się jako agent nieruchomości</span>
                </label>
              )}

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-lg h-14 rounded-2xl shadow-lg shadow-blue-500/20 transition-all mt-4"
              >
                {loading ? 'Przetwarzanie...' : isSignUp ? 'Utwórz konto' : 'Zaloguj się'}
              </Button>
            </form>

            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full text-center mt-8 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
            >
              {isSignUp ? 'Masz już konto? Zaloguj się' : 'Nie masz konta? Zarejestruj się'}
            </button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}