import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, name } = await request.json();
    
    if (!process.env.RESEND_API_KEY) {
      console.warn('⚠️ RESEND_API_KEY not configured');
      return NextResponse.json({
        success: true,
        demoMode: true,
        message: 'Demo mode - Email simulation only'
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    const { data, error } = await resend.emails.send({
      from: 'Earthscape <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to Earthscape! 🌍',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #636F47, #242D13); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: #F5ECD5; margin: 0;">🌍 Earthscape</h1>
            <p style="color: #F5ECD5; opacity: 0.9;">Welcome to Our Community</p>
          </div>
          
          <div style="background: #FFFFE3; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <h2>Hello ${name},</h2>
            <p>Welcome to Earthscape! Your account has been successfully created.</p>
            
            <p>You should receive a separate email from Supabase Auth for email verification.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${appUrl}/signin" 
                 style="display: inline-block; background: #636F47; color: #FFFFE3; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Login to Earthscape
              </a>
            </div>
            
            <p style="margin-top: 30px; font-size: 12px; color: #666;">
              This is a welcome email from Earthscape. If you didn't sign up, please ignore this email.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: 500 });
    }

    console.log('✅ Welcome email sent via Resend:', data?.id);
    return NextResponse.json({ 
      success: true, 
      messageId: data?.id 
    });
    
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}