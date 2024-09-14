import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const token = req.cookies.get('authjs.session-token'); 
  const url = req.nextUrl.clone();
  if (!token) {
    if (url.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } else {  
    if (url.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }
  // res.headers.set(
  //   'Content-Security-Policy',
  //   "frame-ancestors 'self' https://sandbox-buy.paddle.com/ https://checkout.paddle.com/;"
  // );

  return NextResponse.next();

}

export const config = {
  matcher: ['/dashboard/:path*', '/login/:path*'], // Adjust based on your routes
};
