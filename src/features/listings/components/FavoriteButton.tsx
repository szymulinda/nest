import { Heart } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/features/auth/AuthContext';
import { useFavorites } from '@/features/listings/useListings';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface FavoriteButtonProps {
  listingId: string;
}

export default function FavoriteButton({ listingId }: FavoriteButtonProps) {
  const { user } = useAuth();
  const { data: favorites = [] } = useFavorites(user?.id);
  const queryClient = useQueryClient();
  const isFavorited = favorites.includes(listingId);

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error('Zaloguj się, aby zapisać ulubione');
      return;
    }

    if (isFavorited) {
      await supabase.from('favorites').delete().eq('user_id', user.id).eq('listing_id', listingId);
    } else {
      await supabase.from('favorites').insert({ user_id: user.id, listing_id: listingId });
    }

    queryClient.invalidateQueries({ queryKey: ['favorites'] });
  };

  return (
    <button
      onClick={toggle}
      className="p-2 bg-card/80 backdrop-blur-sm rounded-full transition-all duration-200 hover:scale-110 shadow-soft"
      aria-label={isFavorited ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
    >
      <Heart
        size={16}
        className={isFavorited ? 'fill-destructive text-destructive' : 'text-muted-foreground hover:text-destructive'}
      />
    </button>
  );
}
