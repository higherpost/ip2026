import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token');
    const isLoginPage = request.nextUrl.pathname === '/login';

    // If user is on login page and has a valid token, redirect to dashboard
    if (isLoginPage && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // If user is not on login page and has no token, redirect to login
    if (!isLoginPage && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images etc)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
