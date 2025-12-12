import fs from 'fs';
import path from 'path';

const POSTS_DB_PATH = path.join(process.cwd(), 'src', 'data', 'posts.json');

export interface Comment {
    id: number;
    author: string;
    text: string;
    timestamp: string;
}

export interface Post {
    id: number;
    title: string;
    description?: string;
    author: string;
    role: string;
    followers: string; // string for now to match existing UI (Legacy, but keeping for type safety with old data)
    views: string;     // string for now
    answer: any | null; // Keeping legacy structure for "Featured Answer" if needed
    comments: Comment[];
    tags: string[];
    createdAt: string;
    likes?: number;
    likedBy?: string[]; // Array of usernames who liked
}

// Ensure DB file exists
function ensureDb() {
    if (!fs.existsSync(POSTS_DB_PATH)) {
        const dir = path.dirname(POSTS_DB_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        // Seed with empty array or initial data if needed
        fs.writeFileSync(POSTS_DB_PATH, JSON.stringify([], null, 2));
    }
}

export function getAllPosts(): Post[] {
    ensureDb();
    try {
        const data = fs.readFileSync(POSTS_DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export function savePosts(posts: Post[]) {
    ensureDb();
    fs.writeFileSync(POSTS_DB_PATH, JSON.stringify(posts, null, 2));
}

export function addPost(post: Post): Post {
    // Ensure comments array exists
    if (!post.comments) post.comments = [];
    post.likes = 0;
    post.likedBy = [];

    const posts = getAllPosts();
    // Prepend to show newest first
    posts.unshift(post);
    savePosts(posts);
    return post;
}

export function deletePost(id: number) {
    let posts = getAllPosts();
    posts = posts.filter(p => p.id !== id);
    savePosts(posts);
}

// Comments
export function addComment(postId: number, comment: Comment) {
    const posts = getAllPosts();
    const post = posts.find(p => p.id === postId);
    if (post) {
        if (!post.comments) post.comments = [];
        post.comments.push(comment);
        savePosts(posts);
        return true;
    }
    return false;
}

export function updateComment(postId: number, commentId: number, newText: string) {
    const posts = getAllPosts();
    const post = posts.find(p => p.id === postId);
    if (post && post.comments) {
        const comment = post.comments.find(c => c.id === commentId);
        if (comment) {
            comment.text = newText;
            savePosts(posts);
            return true;
        }
    }
    return false;
}

export function deleteComment(postId: number, commentId: number) {
    const posts = getAllPosts();
    const post = posts.find(p => p.id === postId);
    if (post && post.comments) {
        post.comments = post.comments.filter(c => c.id !== commentId);
        savePosts(posts);
        return true;
    }
    return false;
}

export function toggleLike(postId: number, username: string): { likes: number, liked: boolean } | null {
    const posts = getAllPosts();
    const post = posts.find(p => p.id === postId);
    if (post) {
        if (!post.likedBy) post.likedBy = [];
        if (!post.likes) post.likes = 0;

        const alreadyLiked = post.likedBy.includes(username);
        if (alreadyLiked) {
            post.likedBy = post.likedBy.filter(u => u !== username);
            post.likes = Math.max(0, post.likes - 1);
        } else {
            post.likedBy.push(username);
            post.likes += 1;
        }
        savePosts(posts);
        return { likes: post.likes, liked: !alreadyLiked };
    }
    return null;
}
