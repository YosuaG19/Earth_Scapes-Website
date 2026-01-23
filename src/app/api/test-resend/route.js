// app/api/test-resend/route.js
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Test send email
    const { data, error } = await resend.emails.send({
      from: 'Earthscape <onboarding@resend.dev>',
      to: ['your-email@gmail.com'], // Ganti dengan email kamu
      subject: 'Test Email from Resend',
      html: '<p>Resend is working!</p>',
    });

    if (error) {
      return NextResponse.json({ 
        success: false, 
        error: error.message 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent!',
      data 
    });
    
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}