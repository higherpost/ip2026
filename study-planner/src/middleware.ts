import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token');
    const { pathname } = request.nextUrl;

    const isLoginPage = pathname === '/login';
    const isPublicPath = pathname === '/' || pathname.startsWith('/guide') || pathname.startsWith('/api/auth') || pathname.startsWith('/forgot-password') || pathname.startsWith('/reset-password');

    // If user is on login page and has a valid token, redirect to planner
    if (isLoginPage && token) {
        return NextResponse.redirect(new URL('/planner', request.url));
    }

    // Protected Routes Logic
    // If it's not a public path and not login page, it requires authentication
    const isProtectedRoute = !isPublicPath && !isLoginPage;

    if (isProtectedRoute && !token) {
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
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
    ],
};
