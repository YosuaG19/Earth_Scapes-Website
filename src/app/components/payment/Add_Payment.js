"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

const Add_Payment = ({
  booking,
  startDate,
  endDate,
  trip_price,
  tripData,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);

  // Mengambil harga dari tripData (database) untuk memastikan akurasi
  const actualPrice = Number(tripData?.price || trip_price || 0);
  const total = (booking?.passengers?.length || 0) + (booking?.includeOwner ? 1 : 0);
  const total_spent = total * actualPrice;

  const handleConfirmAndPay = async () => {
    if (typeof window !== "undefined" && !window.snap) {
      alert("Payment system is still loading. Please wait...");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/tokenizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: `ES-${Date.now()}`,
          productName: tripData?.title || "Earthscapes Trip",
          price: actualPrice,
          quantity: total,
        }),
      });

      const resData = await response.json();
      if (!resData.token) throw new Error(resData.error || "Failed to get token");

      window.snap.pay(resData.token, {
        onSuccess: async (result) => {
          const { data: { user } } = await supabase.auth.getUser();
          await supabase.from("bookings").insert([
            {
              user_id: user?.id,
              trip_id: tripData?.id,
              start_date: startDate,
              end_date: endDate,
              total_price: total_spent,
              status: "paid",
              passengers: booking?.passengers || [],
            },
          ]);
          alert("Payment Successful!");
          window.location.href = "/profile";
        },
        onPending: () => alert("Waiting for your payment..."),
        onError: () => alert("Payment failed!"),
        onClose: () => alert("Payment cancelled."),
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  const formatIDR = (v) => "Rp " + new Intl.NumberFormat("id-ID").format(v);

  return (
    <div className="w-full flex flex-col gap-6 p-2">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#242D13]">Finalize Booking</h2>
        <button onClick={onClose} className="text-[#242D13] opacity-50 hover:opacity-100 text-xl">✕</button>
      </div>

      <span className="w-full h-[1px] bg-[#242D13]/10"></span>

      <div className="flex flex-col gap-4 text-[#242D13]">
        <div className="flex justify-between items-center bg-white/40 p-4 rounded-xl">
          <div>
            <p className="text-[12px] opacity-60 uppercase font-bold tracking-wider">Dates</p>
            <p className="font-semibold">{formatDate(startDate)} - {formatDate(endDate)}</p>
          </div>
          <div className="text-right">
            <p className="text-[12px] opacity-60 uppercase font-bold tracking-wider">Total Guest</p>
            <p className="font-semibold">{total} Person</p>
          </div>
        </div>

        <div className="flex justify-between items-center px-2 py-4 border-t border-dashed border-[#242D13]/20">
          <p className="text-[18px] font-medium">Amount to Pay</p>
          <p className="text-[24px] font-bold text-[#5a7527]">
            {formatIDR(total_spent)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleConfirmAndPay}
          disabled={loading}
          className="w-full py-4 bg-[#242D13] text-[#e8e8da] rounded-full font-bold text-[18px] shadow-xl hover:bg-[#2c3818] transition-all disabled:opacity-50"
        >
          {loading ? "PREPARING PAYMENT..." : "PAY NOW"}
        </button>
        <p className="text-center text-[11px] opacity-50 px-6">
          By clicking Pay Now, you will be redirected to our secure payment partner to complete your transaction.
        </p>
      </div>
    </div>
  );
};

export default Add_Payment;