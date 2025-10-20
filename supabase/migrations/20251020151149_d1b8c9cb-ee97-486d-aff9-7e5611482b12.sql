-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT,
  bots_created INTEGER DEFAULT 0,
  max_free_bots INTEGER DEFAULT 5,
  daily_messages_sent INTEGER DEFAULT 0,
  max_daily_messages INTEGER DEFAULT 100,
  last_message_reset TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create bots table
CREATE TABLE public.bots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  whatsapp_api_key TEXT,
  whatsapp_phone_number TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create bot_flows table to store flow data
CREATE TABLE public.bot_flows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID REFERENCES public.bots(id) ON DELETE CASCADE NOT NULL,
  flow_data JSONB NOT NULL,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create mass_messages table
CREATE TABLE public.mass_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  bot_id UUID REFERENCES public.bots(id) ON DELETE CASCADE,
  message_content TEXT NOT NULL,
  recipients_count INTEGER NOT NULL,
  sent_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bot_flows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mass_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for bots
CREATE POLICY "Users can view their own bots"
  ON public.bots FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bots"
  ON public.bots FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bots"
  ON public.bots FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bots"
  ON public.bots FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for bot_flows
CREATE POLICY "Users can view flows of their own bots"
  ON public.bot_flows FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.bots
    WHERE bots.id = bot_flows.bot_id
    AND bots.user_id = auth.uid()
  ));

CREATE POLICY "Users can create flows for their own bots"
  ON public.bot_flows FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.bots
    WHERE bots.id = bot_flows.bot_id
    AND bots.user_id = auth.uid()
  ));

CREATE POLICY "Users can update flows of their own bots"
  ON public.bot_flows FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.bots
    WHERE bots.id = bot_flows.bot_id
    AND bots.user_id = auth.uid()
  ));

-- RLS Policies for mass_messages
CREATE POLICY "Users can view their own mass messages"
  ON public.mass_messages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own mass messages"
  ON public.mass_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bots_updated_at
  BEFORE UPDATE ON public.bots
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bot_flows_updated_at
  BEFORE UPDATE ON public.bot_flows
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();