// app/api/check-env/route.js
export async function GET() {
  return Response.json({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅' : '❌',
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅' : '❌',
    resendKey: process.env.RESEND_API_KEY ? '✅' : '❌',
    appUrl: process.env.NEXT_PUBLIC_APP_URL || '❌',
  });
}