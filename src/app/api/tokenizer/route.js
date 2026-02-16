import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

console.log("DEBUG KEY:", process.env.MIDTRANS_SERVER_KEY ? "TERBACA" : "TIDAK TERBACA");

// 1. Inisialisasi Midtrans Snap
let snap = new Midtrans.Snap({
  isProduction: false, 
  serverKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY, // Pastikan di .env.local namanya persis begini
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY, // Gunakan NEXT_PUBLIC jika perlu
});

export async function POST(request) {
  try {
    // 2. Ambil data dan pastikan tipe datanya Angka (Number)
    const body = await request.json();
    const { productName, price, quantity } = body;

    // Konversi ke Number untuk jaga-jaga jika terkirim sebagai string
    const fixPrice = Math.round(Number(price));
    const fixQuantity = Math.round(Number(quantity));
    const totalAmount = fixPrice * fixQuantity;

    // 3. Susun Parameter (Gunakan Order ID unik agar tidak bentrok saat testing)
    let parameter = {
      transaction_details: {
        // Kita tambahkan timestamp agar selalu unik saat testing
        order_id: `ES-${Date.now()}`, 
        gross_amount: totalAmount,
      },
      item_details: [
        {
          id: `ITEM-${Date.now()}`,
          price: fixPrice,
          quantity: fixQuantity,
          name: productName.substring(0, 50),
        },
      ],
      credit_card: {
        secure: true,
      },
    };

    // 4. Minta Token ke Midtrans
    const token = await snap.createTransactionToken(parameter);

    // 5. Kirim token balik
    return NextResponse.json({ token });

  } catch (error) {
    // Cek detail error di terminal (VS Code console)
    console.error("Midtrans Error Detail:", error.message);
    
    return NextResponse.json(
      { error: "Gagal: " + error.message },
      { status: 500 }
    );
  }
}