import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, mobile, message } = body;

        console.log("Contact Form Submission:", body);

        // 1. If we have credentials, send real email
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                host: "smtp.office365.com", // Standard Outlook/Live SMTP
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER, // Sender address
                to: "arun18@live.in", // Receiver address
                subject: `New Contact Form: ${firstName} ${lastName}`,
                text: `
You have received a new message from the Vidyalaya Academy contact form.

Details:
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${mobile}

Message:
${message}
                `,
            };

            await transporter.sendMail(mailOptions);
            return NextResponse.json({ success: true, message: "Email sent successfully" });
        }

        // 2. Fallback: Log to console (simulated)
        console.warn("EMAIL_USER/EMAIL_PASS not set. Email not sent, but logged.");
        return NextResponse.json({ success: true, message: "Form processed (simulation)" });

    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
