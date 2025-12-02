import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jmvucbgcavjtoihyuwgx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptdnVjYmdjYXZqdG9paHl1d2d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzEzNjUsImV4cCI6MjA3OTU0NzM2NX0.G81jI8ssCS4x2D3t8eWmPSey1sb6qCzfYlRYukiZH5A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});