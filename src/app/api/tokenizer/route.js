import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

console.log("DEBUG KEY:", process.env.MIDTRANS_SERVER_KEY ? "TERBACA" : "TIDAK TERBACA");

let snap = new Midtrans.Snap({
  isProduction: false, 
  serverKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { productName, price, quantity } = body;

    const fixPrice = Math.round(Number(price));
    const fixQuantity = Math.round(Number(quantity));
    const totalAmount = fixPrice * fixQuantity;

    let parameter = {
      transaction_details: {
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

    const token = await snap.createTransactionToken(parameter);

    return NextResponse.json({ token });

  } catch (error) {
    console.error("Midtrans Error Detail:", error.message);
    
    return NextResponse.json(
      { error: "Gagal: " + error.message },
      { status: 500 }
    );
  }
}