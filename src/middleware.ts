import { auth } from "@/auth"
 
const publicPath = ['/','/login', '/privacy', '/terms', '/refund-policy']
export default auth((req) => {
 
  if(!req.auth && !publicPath.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  } 
  if(req.auth && req.nextUrl.pathname === "/login") {
    const newUrl = new URL("/dashboard", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", '/dashboard/:path*', '/login',],
}