import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request) {
  const allCookies = cookies();
  const session = allCookies.get('session');
  const path = request.nextUrl.pathname
  if (session) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  else if (!session && (path == '/courses' || path === '/mycourses' || path === '/profile' ||  path.startsWith('/courses'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/signup','/mycourses','/profile','/courses/:path*'],
};
