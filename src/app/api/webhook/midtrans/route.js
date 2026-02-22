import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import crypto from "crypto";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      signature_key,
      order_id,
      status_code,
      gross_amount,
      transaction_status,
    } = body;
    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    const hash = crypto
      .createHash("sha512")
      .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
      .digest("hex");

    if (hash !== signature_key) {
      return NextResponse.json(
        { message: "Invalid Signature" },
        { status: 400 },
      );
    }

    const isDonation = order_id.startsWith("DON-");
    const tableTarget = isDonation ? "donations" : "bookings";

    let finalStatus = "pending";
    if (
      transaction_status === "settlement" ||
      transaction_status === "capture"
    ) {
      finalStatus = "settlement";
    } else if (transaction_status === "pending") {
      finalStatus = "pending";
    } else {
      finalStatus = transaction_status;
    }

    const { error } = await supabaseAdmin
      .from(tableTarget)
      .update({ status: finalStatus })
      .eq("order_id", order_id);

    if (error) {
      console.error("Error updating database:", error);
      return NextResponse.json({ message: "Database Error" }, { status: 500 });
    }

    return NextResponse.json({ message: "Webhook Success" }, { status: 200 });
  } catch (err) {
    console.error("Webhook Error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
