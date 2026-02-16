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

  // Perhitungan Harga
  const actualPrice = Number(tripData?.price || trip_price || 0);
  const totalGuests = (booking?.passengers?.length || 0) + (booking?.includeOwner ? 1 : 0);
  const total_spent = totalGuests * actualPrice;

  const handleConfirmAndPay = async () => {
    if (typeof window !== "undefined" && !window.snap) {
      alert("Payment system is still loading. Please wait...");
      return;
    }

    // MEMBUAT ORDER ID UNIK
    const generatedOrderId = `TRP-${Date.now()}`;

    setLoading(true);
    try {
      // 1. Ambil Token Midtrans
      const response = await fetch("/api/tokenizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: generatedOrderId,
          productName: tripData?.title || "Earthscapes Trip",
          price: actualPrice,
          quantity: totalGuests,
        }),
      });

      const resData = await response.json();
      if (!resData.token) throw new Error(resData.error || "Failed to get token");

      // 2. Buka Snap Midtrans
      window.snap.pay(resData.token, {
        onSuccess: async (result) => {
          try {
            const { data: { user } } = await supabase.auth.getUser();
            
            // PAYLOAD DATA (Sudah termasuk order_id dan kolom-kolom baru)
            const payload = {
              user_id: user?.id,
              order_id: generatedOrderId,
              trip_title: tripData?.title || "Trip Selection",
              start_date: startDate,
              end_date: endDate,
              total_price: total_spent,
              status: "settlement",
              passengers: booking?.passengers || [],
            };

            // Validasi UUID untuk trip_id agar tidak error jika id statis
            const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            if (tripData?.id && isUUID.test(tripData.id)) {
              payload.trip_id = tripData.id;
            }

            // SIMPAN KE SUPABASE
            const { error: dbError } = await supabase
              .from("bookings")
              .insert([payload]);

            if (dbError) {
              console.error("Database Error:", dbError.message);
              alert("Gagal simpan ke database: " + dbError.message);
            } else {
              alert("Payment & Booking Successful!");
              window.location.href = "/dashboard/trips";
            }
          } catch (err) {
            console.error("Runtime Error in onSuccess:", err);
          }
        },
        onPending: () => {
          alert("Waiting for payment...");
          window.location.href = "/dashboard/trips";
        },
        onError: (err) => {
          console.error("Midtrans Error:", err);
          alert("Payment failed!");
        },
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
    <div className="w-full flex flex-col gap-6 p-2 text-[#242D13]">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Finalize Booking</h2>
        <button onClick={onClose} className="opacity-50 hover:opacity-100 text-xl">✕</button>
      </div>

      <span className="w-full h-[1px] bg-[#242D13]/10"></span>

      <div className="flex flex-col gap-4">
        {/* INFO NAMA TRIP */}
        <div className="bg-white/40 p-4 rounded-xl">
           <p className="text-[12px] opacity-60 uppercase font-bold tracking-wider">Trip Name</p>
           <p className="font-bold text-lg">{tripData?.title}</p>
        </div>

        <div className="flex justify-between items-center bg-white/40 p-4 rounded-xl">
          <div>
            <p className="text-[12px] opacity-60 uppercase font-bold tracking-wider">Dates</p>
            <p className="font-semibold">{formatDate(startDate)} - {formatDate(endDate)}</p>
          </div>
          <div className="text-right">
            <p className="text-[12px] opacity-60 uppercase font-bold tracking-wider">Total Guest</p>
            <p className="font-semibold">{totalGuests} Person</p>
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