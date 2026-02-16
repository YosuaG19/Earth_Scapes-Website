// Copy-paste ini untuk menggantikan isi file route.js kamu
import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, donationType, userId, userEmail } = body;

    const serverKey = process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY;
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

    let snap = new Midtrans.Snap({
      isProduction: false,
      serverKey: serverKey,
      clientKey: clientKey,
    });

    const orderId = `DON-${Date.now()}`;
    
    // 1. SIMPAN KE SUPABASE DENGAN NAMA KATEGORI ASLI
    const { error: dbError } = await supabaseAdmin
      .from('donations')
      .insert([{
        order_id: orderId,
        user_id: userId,
        amount: Number(amount),
        // Menggunakan donationType dari frontend (misal: "Marine Restoration")
        type: donationType || "General Donation", 
        status: 'pending'
      }]);

    if (dbError) throw dbError;

    // 2. PARAMETER MIDTRANS
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: Number(amount),
      },
      item_details: [
        {
          id: donationType?.replace(/\s+/g, '-').toLowerCase() || "donation",
          price: Number(amount),
          quantity: 1,
          // Nama di struk Midtrans juga jadi sesuai kategori
          name: donationType || "General Donation", 
        },
      ],
      customer_details: {
        email: userEmail
      }
    };

    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({ 
      token: transaction.token,
      orderId: orderId 
    });

  } catch (error) {
    console.error("API ERROR:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}