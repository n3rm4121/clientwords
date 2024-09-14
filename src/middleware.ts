import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const publicPaths = ['/', '/login', '/privacy', '/terms', '/refund-policy'];

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


  
  // Check if the path is public or if the token is valid
  if (!token && !publicPaths.includes(request.nextUrl.pathname)) {
    const url = new URL('/login', request.nextUrl.origin);
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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", '/dashboard/:path*', '/login'],
};
