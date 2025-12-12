import { NextResponse } from 'next/server';
import { getAllPosts, addPost } from '@/lib/community-db';

export async function GET() {
    const posts = getAllPosts();
    return NextResponse.json(posts);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // Basic validation could go here
        const newPost = addPost(body);
        return NextResponse.json(newPost);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
