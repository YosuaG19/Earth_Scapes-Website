import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/'
  
  if (code) {
    try {
      const supabase = await createClient()
      
      // Exchange code for session
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Auth callback error:', error)
        return NextResponse.redirect(
          new URL(`/signin?error=auth_failed`, requestUrl.origin)
        )
      }
      
      // Decode and redirect to the intended page
      const decodedNext = decodeURIComponent(next)
      return NextResponse.redirect(new URL(decodedNext, requestUrl.origin))
      
    } catch (error) {
      console.error('Unexpected error in auth callback:', error)
      return NextResponse.redirect(
        new URL('/signin?error=unexpected_error', requestUrl.origin)
      )
    }
  }
  
  return NextResponse.redirect(new URL('/signin', requestUrl.origin))
}