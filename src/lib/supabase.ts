// // src/lib/supabase.ts
// import { createBrowserClient } from '@supabase/ssr'

<<<<<<< HEAD
// export function createClient() {
//   return createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   )
// }

// // Usage in client components:
// import { createClient } from '@/lib/supabase'

// export default function ClientComponent() {
//   const supabase = createClient(){
    
//   }
// }
=======
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
>>>>>>> a1126337d28a64364913bf711e65455f17b63c62
