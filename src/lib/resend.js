// utils/email.js atau lib/resend.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email, token, name) {
  try {
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`;

    const { data, error } = await resend.emails.send({
      from: "Earthscape <onboarding@resend.dev>", // ✅ Email verified otomatis!
      to: [email],
      subject: "Verify Your Earthscape Account",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #636F47, #242D13); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #FFFFE3; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; }
            .button { display: inline-block; background: #636F47; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="color: #F5ECD5; margin: 0;">🌍 Earthscape</h1>
              <p style="color: #F5ECD5; opacity: 0.9;">Welcome to our community</p>
            </div>
            
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>Thank you for signing up for Earthscape! Please verify your email address to complete your registration.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationLink}" class="button">Verify Email Address</a>
              </div>
              
              <p>Or copy and paste this link in your browser:</p>
              <p style="background: #f5f5f5; padding: 10px; border-radius: 5px; word-break: break-all;">
                ${verificationLink}
              </p>
              
              <p>This verification link will expire in 24 hours.</p>
              
              <div class="footer">
                <p>If you didn't create an account, you can safely ignore this email.</p>
                <p>© ${new Date().getFullYear()} Earthscape. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Verify your Earthscape account: ${verificationLink}`,
    });

    if (error) {
      console.error("Resend error:", error);
      throw error;
    }

    console.log("Email sent successfully:", data?.id);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}
