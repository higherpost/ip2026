import { NextResponse } from 'next/server';
import { deletePost } from '@/lib/community-db';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // params is a Promise in Next.js 15
) {
    try {
        const { id } = await params;
        console.log(`[Delete API] Request to delete post ID: ${id}`);

        if (!id) {
            console.error('[Delete API] No ID provided');
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        const idNum = Number(id);
        console.log(`[Delete API] Parsed ID: ${idNum}`);

        deletePost(idNum);
        console.log(`[Delete API] Post deleted successfully`);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[Delete API] Error deleting post:', error);
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
