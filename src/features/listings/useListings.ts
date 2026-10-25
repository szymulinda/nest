import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';

export interface Listing {
  id: string;
  created_at: string;
  title: string;
  description: string | null;
  price: number;
  sqm: number;
  rooms: number | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
  type: 'apartment' | 'house' | 'land';
  status: 'available' | 'sold';
  agent_id: string;
}

export interface ListingImage {
  id: string;
  listing_id: string;
  url: string;
  display_order: number;
}

export interface ListingWithImages extends Listing {
  listing_images: ListingImage[];
  images?: string[];
  profiles?: { full_name: string | null; phone: string | null; avatar_url: string | null; bio: string | null };
}

export interface ListingFilters {
  minPrice?: number;
  maxPrice?: number;
  minSqm?: number;
  maxSqm?: number;
  type?: string;
  search?: string;
}

export function useListings(filters?: ListingFilters) {
  return useQuery({
    queryKey: ['listings', filters],
    queryFn: async () => {
      let query = supabase
        .from('listings')
        .select('*, listing_images(*), profiles(full_name, phone, avatar_url, bio)')
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (filters?.minPrice) query = query.gte('price', filters.minPrice);
      if (filters?.maxPrice) query = query.lte('price', filters.maxPrice);
      if (filters?.minSqm) query = query.gte('sqm', filters.minSqm);
      if (filters?.maxSqm) query = query.lte('sqm', filters.maxSqm);
      if (filters?.type && filters.type !== 'all') query = query.eq('type', filters.type as any);
      
      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,address.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      return (data as any[]).map(item => ({
        ...item,
        images: item.listing_images?.map((img: any) => img.url) || [],
      })) as ListingWithImages[];
    },
  });
}

export function useListing(id: string) {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*, listing_images(*), profiles(full_name, phone, avatar_url, bio)')
        .eq('id', id)
        .single();
      if (error) throw error;
      
      return {
        ...data,
        images: data.listing_images?.map((img: any) => img.url) || [],
      } as ListingWithImages;
    },
    enabled: !!id,
  });
}

export function useAgentListings(agentId: string | undefined) {
  return useQuery({
    queryKey: ['agent-listings', agentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*, listing_images(*)')
        .eq('agent_id', agentId!)
        .order('created_at', { ascending: false });
      if (error) throw error;
      
      return (data as any[]).map(item => ({
        ...item,
        images: item.listing_images?.map((img: any) => img.url) || [],
      })) as ListingWithImages[];
    },
    enabled: !!agentId,
  });
}

export function useFavorites(userId: string | undefined) {
  return useQuery({
    queryKey: ['favorites', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('favorites')
        .select('listing_id')
        .eq('user_id', userId!);
      if (error) throw error;
      return (data ?? []).map((f: { listing_id: string }) => f.listing_id);
    },
    enabled: !!userId,
  });
}