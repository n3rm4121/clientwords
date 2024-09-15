import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const privatePaths = ['/dashboard', '/dashboard/:path*'];

export async function middleware(request: NextRequest) {
  const secret = process.env.AUTH_SECRET;
  
  if (!secret) {
    throw new Error('Please provide a secret');
  }
  
  // Retrieve and verify the token from the request
  const token = await getToken({
    req: request,
    secret: secret,
    raw: true,
    salt: ''
  });

  const isPrivatePath = privatePaths.some(path => 
    request.nextUrl.pathname.startsWith(path.replace(':path*', ''))
  );

  // Redirect unauthenticated users from private paths to login
  if (!token && isPrivatePath) {
    const url = new URL('/login', request.nextUrl.origin);
    url.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users from login page to dashboard
  if (token && request.nextUrl.pathname === '/login') {
    const url = new URL('/dashboard', request.nextUrl.origin);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: ["/dashboard/:path*", '/login'],
};