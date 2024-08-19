import { auth } from '@/auth'; // Ensure this is correctly imported from your NextAuth setup
import { NextResponse } from 'next/server';

export default auth((req) => {
  // Access authenticated user from req.auth
  const { user } = req.auth || {};

  if (!user) {
    // If user is not authenticated and trying to access a protected route
    if (req.nextUrl.pathname !== '/auth/login' && req.nextUrl.pathname !== '/auth/signup') {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  } else {
    // If user is authenticated and trying to access login or signup page
    if (req.nextUrl.pathname === '/auth/login' || req.nextUrl.pathname === '/auth/signup') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  // Allow the request to proceed if no redirect is needed
  return NextResponse.next();
});

// Configure paths for which the middleware should apply
export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'], // Adjust based on your routes
};
