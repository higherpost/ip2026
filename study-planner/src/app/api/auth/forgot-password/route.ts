import { NextResponse } from 'next/server';
import { getUserByEmail, updateUser } from '@/lib/db';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const user = getUserByEmail(email);

        if (user) {
            // Generate token
            const resetToken = crypto.randomBytes(32).toString('hex');
            const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

            // Update user
            updateUser(email, {
                resetToken,
                resetTokenExpiry
            });

            // Simulate sending email
            const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
            console.log("---------------------------------------------------");
            console.log(`Password Reset Link for ${email}: ${resetLink}`);
            console.log("---------------------------------------------------");
        }

        // Always return success to prevent email enumeration
        return NextResponse.json({ success: true, message: "If an account exists with this email, a reset link has been sent." });

    } catch (error) {
        console.error("Forgot Password Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
