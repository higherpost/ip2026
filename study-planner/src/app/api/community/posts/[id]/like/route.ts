import { NextResponse } from 'next/server';
import { toggleLike } from '@/lib/community-db';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // params is a Promise in Next.js 15
) {
    try {
        const body = await request.json();
        const { username } = body;
        const { id } = await params;

        if (!username) {
            return NextResponse.json({ error: 'Username required' }, { status: 400 });
        }

        const result = toggleLike(Number(id), username);

        if (result) {
            return NextResponse.json(result);
        } else {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to toggle like' }, { status: 500 });
    }
}
