import { NextResponse } from 'next/server';
import { deletePost } from '@/lib/community-db';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // params is a Promise in Next.js 15
) {
    try {
        const { id } = await params;
        deletePost(Number(id));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
