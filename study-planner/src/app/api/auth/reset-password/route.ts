import { NextResponse } from 'next/server';
import { getUserByResetToken, updateUser } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const { token, password } = await request.json();

        if (!token || !password) {
            return NextResponse.json({ error: 'Token and password are required' }, { status: 400 });
        }

        const user = getUserByResetToken(token);

        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 });
        }

        // Hash new password
        const passwordHash = await bcrypt.hash(password, 10);

        // Update user: set new password, clear reset token fields
        updateUser(user.email, {
            passwordHash,
            resetToken: undefined,
            resetTokenExpiry: undefined
        });

        return NextResponse.json({ success: true, message: "Password has been reset successfully." });

    } catch (error) {
        console.error("Reset Password Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
