
-- Create enums
CREATE TYPE public.user_role AS ENUM ('agent', 'user');
CREATE TYPE public.property_type AS ENUM ('apartment', 'house', 'land');
CREATE TYPE public.listing_status AS ENUM ('available', 'sold');

-- Profiles table
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name text,
  role user_role DEFAULT 'user',
  phone text,
  avatar_url text,
  bio text,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Listings table
CREATE TABLE public.listings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  title text NOT NULL,
  description text,
  price numeric NOT NULL,
  sqm numeric NOT NULL,
  rooms int,
  address text,
  lat float,
  lng float,
  type property_type DEFAULT 'apartment',
  status listing_status DEFAULT 'available',
  agent_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL
);

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view available listings" ON public.listings FOR SELECT USING (status = 'available' OR auth.uid() = agent_id);
CREATE POLICY "Agents can insert own listings" ON public.listings FOR INSERT WITH CHECK (auth.uid() = agent_id);
CREATE POLICY "Agents can update own listings" ON public.listings FOR UPDATE USING (auth.uid() = agent_id);
CREATE POLICY "Agents can delete own listings" ON public.listings FOR DELETE USING (auth.uid() = agent_id);

-- Listing images table
CREATE TABLE public.listing_images (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id uuid REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  display_order int DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.listing_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view listing images" ON public.listing_images FOR SELECT USING (true);
CREATE POLICY "Agents can manage own listing images" ON public.listing_images FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.listings WHERE id = listing_id AND agent_id = auth.uid())
);
CREATE POLICY "Agents can delete own listing images" ON public.listing_images FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.listings WHERE id = listing_id AND agent_id = auth.uid())
);

-- Favorites table
CREATE TABLE public.favorites (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  listing_id uuid REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, listing_id)
);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add favorites" ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove favorites" ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- Storage bucket for listing images
INSERT INTO storage.buckets (id, name, public) VALUES ('listing-images', 'listing-images', true);

CREATE POLICY "Anyone can view listing images" ON storage.objects FOR SELECT USING (bucket_id = 'listing-images');
CREATE POLICY "Authenticated users can upload listing images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'listing-images' AND auth.role() = 'authenticated');
CREATE POLICY "Users can delete own listing images" ON storage.objects FOR DELETE USING (bucket_id = 'listing-images' AND auth.uid()::text = (storage.foldername(name))[1]);
