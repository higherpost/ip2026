import { NextResponse } from 'next/server';
import { addComment, updateComment, deleteComment } from '@/lib/community-db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { postId, comment } = body;
        console.log(`[Comments API] Adding comment to post ${postId}:`, comment);

        if (!postId || !comment) {
            console.error('[Comments API] Missing postId or comment');
            return NextResponse.json({ error: 'Missing data' }, { status: 400 });
        }

        const result = addComment(postId, comment);
        console.log(`[Comments API] Add result:`, result);

        if (result) {
            return NextResponse.json({ success: true });
        } else {
            console.error('[Comments API] Post not found for comment');
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('[Comments API] Error adding comment:', error);
        return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { postId, commentId, text } = body;
        updateComment(postId, commentId, text);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update comment' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const postId = searchParams.get('postId');
        const commentId = searchParams.get('commentId');

        if (postId && commentId) {
            deleteComment(Number(postId), Number(commentId));
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ error: 'Missing params' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
    }
}
