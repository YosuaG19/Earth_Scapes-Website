import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, customerName, tripTitle, totalPrice, orderId } = await req.json();

    const BREVO_API_KEY = process.env.BREVO_API_KEY;

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "EarthScapes", email: "kangger97@gmail.com" }, 
        to: [{ email: email, name: customerName }],
        subject: `Booking Confirmed: ${tripTitle} 🌿`,
        htmlContent: `
          <div style="font-family: 'Helvetica', sans-serif; color: #242D13; max-width: 600px; margin: auto; border: 1px solid #e8e8da; padding: 40px; border-radius: 32px; background-color: #fcfcf9;">
            <h1 style="font-size: 24px; font-weight: 900; margin-bottom: 20px;">Booking Confirmed!</h1>
            <p style="font-size: 16px; line-height: 1.6;">Hi <strong>${customerName}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.6;">Your payment for the <strong>${tripTitle}</strong> adventure has been successfully verified. Prepare yourself and your gear for an unforgettable experience!</p>
            
            <div style="background-color: #242D13; color: #e8e8da; padding: 25px; border-radius: 24px; margin: 30px 0;">
              <p style="margin: 0; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; opacity: 0.6;">Order ID</p>
              <p style="margin: 0 0 15px 0; font-weight: bold; font-size: 18px;">${orderId}</p>
              
              <p style="margin: 0; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; opacity: 0.6;">Total Payment</p>
              <p style="margin: 0; font-weight: 900; font-size: 24px;">Rp ${new Intl.NumberFormat("id-ID").format(totalPrice)}</p>
            </div>
            
            <p style="font-size: 14px; color: #242D13; opacity: 0.7;">You can view your detailed itinerary and digital tickets in your EarthScapes account dashboard.</p>
            
            <div style="margin-top: 40px; border-top: 1px solid #242D13; opacity: 0.1;"></div>
            <p style="font-size: 12px; margin-top: 20px; color: #242D13; opacity: 0.5; text-align: center;">
              © 2026 EarthScapes Expedition. All Rights Reserved.
            </p>
          </div>
        `,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: result }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Email sent via Brevo successfully", data: result },
      { status: 200 }
    );
  } catch (err) {
    console.error("Brevo API Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}