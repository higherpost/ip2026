import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message, userEmail, userName } = body;

        // Validation
        if (!message || message.trim().length === 0) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        // Word count check
        const wordCount = message.trim().split(/\s+/).length;
        if (wordCount > 500) {
            return NextResponse.json({ error: 'Message exceeds 500 words' }, { status: 400 });
        }

        // In a real application, you would use a transactional email service like Resend, SendGrid, or Nodemailer here.
        // For now, we will log the message as if it were sent.
        console.log(`--- NEW DM TO ADMIN ---`);
        console.log(`From: ${userName} (${userEmail})`);
        console.log(`Message: ${message}`);
        console.log(`-----------------------`);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DM Error:", error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
