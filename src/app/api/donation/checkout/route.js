import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("1. Data masuk dari Frontend:", body);

    const { amount, donationType } = body;

    // VALIDASI KEY
    const serverKey = process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      console.error("ERROR: MIDTRANS_SERVER_KEY tidak terbaca di .env.local!");
      return NextResponse.json({ message: "Server Key missing" }, { status: 500 });
    }

    // INISIALISASI SNAP (Dibuat di dalam POST agar lebih fresh)
    let snap = new Midtrans.Snap({
      isProduction: false,
      serverKey: serverKey,
      clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
    });

    // VALIDASI DATA
    if (!amount || amount < 1) {
       console.error("ERROR: Amount tidak valid:", amount);
       return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
    }

    const orderId = `DONATE-${Date.now()}`;
    
    // FORMAT PARAMETER
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: Number(amount),
      },
      item_details: [
        {
          id: "donation-01",
          price: Number(amount),
          quantity: 1,
          name: donationType || "General Donation",
        },
      ],
    };

    console.log("2. Mengirim request ke Midtrans dengan parameter:", parameter);

    const transaction = await snap.createTransaction(parameter);
    console.log("3. Berhasil! Token didapat:", transaction.token);

    return NextResponse.json({ token: transaction.token });

  } catch (error) {
    // INI AKAN MENAMPILKAN ERROR ASLI DI TERMINAL
    console.error("ERROR MIDTRANS DETECTED:", error.message);
    
    // Jika error dari Midtrans langsung (misal Server Key salah/invalid)
    if (error.ApiResponse) {
        console.error("Detail API Response Error:", error.ApiResponse);
    }

    return NextResponse.json(
      { message: error.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}