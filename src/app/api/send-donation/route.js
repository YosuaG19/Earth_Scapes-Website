import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, donorName, campaignTitle, amount, orderId } =
      await req.json();

    const BREVO_API_KEY = process.env.BREVO_API_KEY;

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "EarthScapes", email: "kangger97@gmail.com" },
        to: [{ email: email, name: donorName }],
        subject: `Thank You, Earth Hero! 🌿`,
        htmlContent: `
          <div style="font-family: 'Helvetica', sans-serif; color: #242D13; max-width: 600px; margin: auto; border: 1px solid #e8e8da; padding: 40px; border-radius: 32px; background-color: #fcfcf9;">
            <div style="text-align: center; margin-bottom: 30px;">
              <span style="font-size: 50px;">🌱</span>
            </div>
            <h1 style="font-size: 24px; font-weight: 900; margin-bottom: 20px; text-align: center;">You made a difference!</h1>
            <p style="font-size: 16px; line-height: 1.6;">Hi <strong>${donorName}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.6;">Thank you so much for your sincere contribution to the <strong>"${campaignTitle}"</strong> campaign. Every bit of your support is deeply meaningful for the preservation of the ecosystems we cherish.</p>
            
            <div style="background-color: #f2f4ed; border: 2px dashed #242D13; padding: 25px; border-radius: 24px; margin: 30px 0; text-align: center;">
              <p style="margin: 0; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #242D13; opacity: 0.6;">Donation Amount</p>
              <p style="margin: 5px 0 0 0; font-weight: 900; font-size: 32px; color: #242D13;">Rp ${new Intl.NumberFormat("id-ID").format(amount)}</p>
            </div>
            
            <p style="font-size: 14px; color: #242D13; opacity: 0.7; font-style: italic; text-align: center;">"The Earth does not need us to survive, but we need the Earth to stay alive."</p>
            
            <div style="margin-top: 40px; border-top: 1px solid #242D13; opacity: 0.1;"></div>
            <p style="font-size: 12px; margin-top: 20px; color: #242D13; opacity: 0.5; text-align: center;">
              Order ID: ${orderId}<br/>
              © 2026 EarthScapes Conservation Foundation.
            </p>
          </div>
        `,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.log("Brevo Donation Error Detail:", result);
      return NextResponse.json({ error: result }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Donation email sent", data: result },
      { status: 200 },
    );
  } catch (err) {
    console.error("Donation API Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
