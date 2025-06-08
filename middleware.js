// middleware.js
import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; 

export async function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  console.log(secret);

  // If no token, redirect to login
  if (!token) {
    console.log('no token');
    if(req.nextUrl.pathname.startsWith('/adminLogin')){
      return NextResponse.next();
    }else{
      return NextResponse.redirect(new URL('/adminLogin', req.url));
    }
  }

  try {
    // Verify the token
    const { payload } = await jwtVerify(token, secret);

    // Check if the user has the 'admin' role
    if (payload.role !== 'admin') {
      console.log('not admin');
      if(req.nextUrl.pathname.startsWith('/adminLogin')){
        return NextResponse.next();
      }else{
        return NextResponse.redirect(new URL('/adminLogin', req.url));
      }
    }

    if(req.nextUrl.pathname.startsWith('/adminLogin')){
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    // Allow access to the admin panel
    return NextResponse.next();
  } catch (err) {
    // Invalid token, redirect to login
    console.error(err);
    return NextResponse.redirect(new URL('/adminLogin', req.url));
  }
}

// Apply middleware to the admin panel routes
export const config = {
  matcher: ['/admin/:path*', '/adminLogin/:path*'], // Protect all routes under /admin
};