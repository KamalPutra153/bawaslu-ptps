import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wzclmuaglbqsokkwcrmn.supabase.co"; // Ganti dengan URL kamu
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6Y2xtdWFnbGJxc29ra3djcm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwNjI5NzIsImV4cCI6MjA2MTYzODk3Mn0.e2O8nZAhnjmdZtm4oqIwLFZDcY7D3bjTdwBiBmcqLsE"; // Ganti dengan anon public key kamu

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
