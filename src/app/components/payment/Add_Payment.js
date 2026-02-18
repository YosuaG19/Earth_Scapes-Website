"use client";

import { useState, useEffect } from "react"; // Tambahkan useEffect
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
  const [snapReady, setSnapReady] = useState(false); // State baru untuk cek status Snap

  // 1. OTOMATIS LOAD SCRIPT MIDTRANS JIKA BELUM ADA
  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js"; // Ganti ke app.midtrans.com jika sudah produksi
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

    let script = document.querySelector(`script[src="${midtransScriptUrl}"]`);

    if (!script) {
      script = document.createElement("script");
      script.src = midtransScriptUrl;
      script.setAttribute("data-client-key", clientKey);
      script.onload = () => setSnapReady(true);
      document.body.appendChild(script);
    } else {
      setSnapReady(true);
    }
  }, []);

  // Perhitungan Harga
  const actualPrice = Number(tripData?.price || trip_price || 0);
  const totalGuests = (booking?.passengers?.length || 0) + (booking?.includeOwner ? 1 : 0);
  const total_spent = totalGuests * actualPrice;

  const handleConfirmAndPay = async () => {
    // Cek apakah Snap sudah siap di window
    if (!window.snap) {
      alert("Payment system is still initializing. Please try again in a second.");
      return;
    }

    const generatedOrderId = `TRP-${Date.now()}`;
    setLoading(true);

    try {
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

      window.snap.pay(resData.token, {
        onSuccess: async (result) => {
          try {
            const { data: { user } } = await supabase.auth.getUser();
            
            const payload = {
              user_id: user?.id,
              order_id: generatedOrderId,
              trip_title: tripData?.title || "Trip Selection",
              start_date: startDate,
              end_date: endDate,
              total_price: total_spent,
              status: "settlement", // Idealnya ini diupdate via webhook, tapi untuk demo ini oke
              passengers: booking?.passengers || [],
            };

            const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            if (tripData?.id && isUUID.test(tripData.id)) {
              payload.trip_id = tripData.id;
            }

            const { error: dbError } = await supabase
              .from("bookings")
              .insert([payload]);

            if (dbError) throw dbError;

            alert("Payment & Booking Successful!");
            window.location.href = "/dashboard/trips";
          } catch (err) {
            console.error("DB Error:", err);
            alert("Payment success, but failed to save booking. Please contact support.");
          }
        },
        onPending: () => {
          alert("Waiting for payment...");
          window.location.href = "/dashboard/trips";
        },
        onError: (err) => {
          console.error("Midtrans Error:", err);
          alert("Payment failed!");
          setLoading(false);
        },
        onClose: () => {
          alert("Payment cancelled.");
          setLoading(false);
        },
      });
    } catch (err) {
      alert(err.message);
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
        <h2 className="text-2xl font-bold tracking-tight">Finalize Booking</h2>
        <button onClick={onClose} className="opacity-50 hover:opacity-100 text-xl transition-opacity">✕</button>
      </div>

      <span className="w-full h-px bg-[#242D13]/10"></span>

      <div className="flex flex-col gap-4">
        <div className="bg-[#fcfcf9] p-5 rounded-3xl border border-[#242D13]/5">
           <p className="text-[10px] opacity-40 uppercase font-black tracking-[0.2em] mb-1">Destinasi Petualangan</p>
           <p className="font-black text-xl text-[#242D13]">{tripData?.title}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-[#fcfcf9] p-5 rounded-3xl border border-[#242D13]/5">
          <div>
            <p className="text-[10px] opacity-40 uppercase font-black tracking-[0.2em] mb-1">Jadwal</p>
            <p className="font-bold text-sm">{formatDate(startDate)}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] opacity-40 uppercase font-black tracking-[0.2em] mb-1">Personil</p>
            <p className="font-bold text-sm">{totalGuests} Traveler</p>
          </div>
        </div>

        <div className="flex justify-between items-center px-4 py-6 mt-2 bg-[#242D13]/5 rounded-4xl">
          <p className="text-sm font-bold opacity-60 uppercase tracking-widest">Total Bayar</p>
          <p className="text-3xl font-black text-[#242D13]">
            {formatIDR(total_spent)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleConfirmAndPay}
          disabled={loading || !snapReady} // Tombol mati jika script belum siap
          className="w-full py-5 bg-[#242D13] text-[#e8e8da] rounded-3xl font-black text-lg shadow-xl shadow-[#242D13]/20 hover:bg-[#2c3818] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {!snapReady ? "INITIALIZING..." : loading ? "PREPARING..." : "CONFIRM & PAY"}
        </button>
        <p className="text-center text-[10px] opacity-40 font-medium px-8 leading-relaxed">
          Pembayaran aman & terenkripsi melalui Midtrans Secure Gateway.
        </p>
      </div>
    </div>
  );
};

export default Add_Payment;