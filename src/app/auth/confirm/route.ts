import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type')

  if (token_hash && type === 'email') {
    // Redirect ke page client-side untuk handle verification
    return NextResponse.redirect(
      new URL(`/verify-email?token_hash=${token_hash}`, requestUrl.origin)
    )
  }

  // Redirect ke signin jika error
  return NextResponse.redirect(new URL('/signin', requestUrl.origin))
}