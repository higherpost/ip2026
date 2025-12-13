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

        console.log(`[Like API] Attempting to like/unlike post: ${id} by user: ${username}`);

        if (!username) {
            console.error('[Like API] Username missing');
            return NextResponse.json({ error: 'Username required' }, { status: 400 });
        }

        const result = toggleLike(Number(id), username);

        console.log(`[Like API] Toggle result:`, result);

        if (result) {
            return NextResponse.json(result);
        } else {
            console.error('[Like API] Post not found for ID:', id);
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('[Like API] Error:', error);
        return NextResponse.json({ error: 'Failed to toggle like' }, { status: 500 });
    }
}
