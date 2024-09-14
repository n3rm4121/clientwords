import { NextRequest, NextResponse } from 'next/server';


export default function middleware(req: NextRequest) {
  const token = req.cookies.get('authjs.session-token');
  const url = req.nextUrl.clone();

  // If user is not authenticated and trying to access a protected route (e.g., dashboard)
  // if (!token && url.pathname.startsWith('/dashboard')) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  // // If user is authenticated and trying to access the login page, redirect them to the dashboard
  // if (token && url.pathname.startsWith('/login')) {
  //   return NextResponse.redirect(new URL('/dashboard', req.url));
  // }

  return NextResponse.next();
}

// Apply middleware to all routes except for api, _next/static, _next/image, and favicon.ico
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};


 // res.headers.set(
  //   'Content-Security-Policy',
  //   "frame-ancestors 'self' https://sandbox-buy.paddle.com/ https://checkout.paddle.com/;"
  // );