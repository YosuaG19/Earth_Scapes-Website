import { createBrowserClient } from "@supabase/ssr";

// Buat client sekali saja
export const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Tetap sediakan fungsi createClient supaya tidak merusak kodingan Auth kamu yang lama
export function createClient() {
    return supabase;
}