import { NextResponse } from 'next/server';
import { verifyUser } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Missing credentials' },
                { status: 400 }
            );
        }

        const user = await verifyUser(email, password);

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // specific maxAge in seconds (1 day)
        const maxAge = 60 * 60 * 24;

        // Create response
        const response = NextResponse.json({ success: true, user: { name: user.name, email: user.email } });

        // Set cookie
        response.cookies.set('auth_token', 'valid_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: maxAge,
            path: '/',
        });

        // Set a client-readable cookie for UI state (non-httpOnly)
        response.cookies.set('user_session', JSON.stringify({ name: user.name, email: user.email, role: user.role, membershipLevel: user.membershipLevel }), {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: maxAge,
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
