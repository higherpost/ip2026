import { NextResponse } from 'next/server';
import { getUserByEmail, updateUser } from '@/lib/db';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const user = getUserByEmail(email);

        if (user) {
            // Generate temporary password (8 chars)
            const tempPassword = Math.random().toString(36).slice(-8);

            // Hash the temporary password
            const passwordHash = await bcrypt.hash(tempPassword, 10);

            // Update user with new password hash
            updateUser(email, {
                passwordHash
            });

            // Simulate sending email with ACTUAL password
            console.log("---------------------------------------------------");
            console.log(`PASSWORD RECOVERY FOR: ${email}`);
            console.log(`YOUR TEMPORARY PASSWORD IS: ${tempPassword}`);
            console.log("---------------------------------------------------");
        }

        // Always return success to prevent email enumeration
        return NextResponse.json({ success: true, message: "If an account exists with this email, a temporary password has been sent to it." });

    } catch (error) {
        console.error("Forgot Password Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
