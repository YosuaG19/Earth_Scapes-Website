// src/app/auth/callback/route.ts - BUAT FILE INI
import { createClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  
  // Get code and error from OAuth provider
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')
  
  console.log('🔐 OAuth Callback:', {
    code: code ? 'Yes' : 'No',
    error,
    errorDescription,
    fullUrl: requestUrl.toString()
  })

  // If there's an error from OAuth provider
  if (error) {
    console.error('OAuth error:', error, errorDescription)
    return NextResponse.redirect(
      new URL(`/signin?error=${encodeURIComponent(errorDescription || error)}`, requestUrl.origin)
    )
  }

  // If we have a code, exchange it for a session
  if (code) {
    try {
      // We need to create a server client to exchange the code
      // But we can't use createClient() here because it's browser-only
      // Instead, we'll redirect to a client page that handles the exchange
      
      const redirectUrl = new URL('/', requestUrl.origin)
      redirectUrl.searchParams.set('oauth_code', code)
      redirectUrl.searchParams.set('provider', 'google') // You might need to detect this
      
      return NextResponse.redirect(redirectUrl)
      
    } catch (err) {
      console.error('Error in OAuth callback:', err)
      return NextResponse.redirect(
        new URL('/signin?error=oauth_failed', requestUrl.origin)
      )
    }
  }

  // Default redirect to home
  return NextResponse.redirect(new URL('/', requestUrl.origin))
}