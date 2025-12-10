import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getUserByEmail } from '@/lib/db';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const userSession = cookieStore.get('user_session');

        if (!userSession?.value) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        let email = "";
        try {
            const sessionData = JSON.parse(userSession.value);
            email = sessionData.email;
        } catch {
            return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
        }

        if (!email) {
            return NextResponse.json({ error: 'Session email missing' }, { status: 401 });
        }

        const user = getUserByEmail(email);

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Return user data (excluding passwordHash)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash, ...safeUser } = user;

        return NextResponse.json({ user: safeUser });
    } catch (error) {
        console.error('Profile fetch error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
