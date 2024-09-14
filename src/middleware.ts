import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const token = req.cookies.get('authjs.session-token');
  const url = req.nextUrl.clone();

  // If user is not authenticated and trying to access dashboard
  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If user is authenticated and trying to access login page
  if (token && url.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'], // Adjust based on your routes
};



 // res.headers.set(
  //   'Content-Security-Policy',
  //   "frame-ancestors 'self' https://sandbox-buy.paddle.com/ https://checkout.paddle.com/;"
  // );