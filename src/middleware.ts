import { auth } from '@/auth'; // Import auth from your NextAuth setup
import { NextResponse } from 'next/server';

export default auth((req) => {
  // Access authenticated user from req.auth
  if (!req.auth) {
    // Handle unauthenticated access here
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Handle authenticated access here
  const { user } = req.auth;
  
  // Example: Redirect authenticated users from login page
  if (user && (req.nextUrl.pathname === '/auth/login' || req.nextUrl.pathname === '/auth/signup')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
});

// Configure paths for which the middleware should apply
export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'], // Adjust based on your routes
};
