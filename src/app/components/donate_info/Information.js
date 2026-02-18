"use client";

import { useState } from "react";
import Image_Damper from "../Image_Damper";
import Script from "next/script";
import { createClient } from "@/lib/supabase/client"; // IMPORT SUPABASE

const Information = (props) => {
  const [activeTab, setActiveTab] = useState("overview");
  const Limit = props.proggLim;
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(props.proggNow);
  const [isLoading, setIsLoading] = useState(false);

  // Inisialisasi Supabase Client
  const supabase = createClient();

  // FUNGSI PEMBAYARAN MIDTRANS
  const handlePayment = async () => {
    if (!selectedAmount || selectedAmount < 1000) {
      alert("Minimal donasi adalah Rp 1.000");
      return;
    }

    setIsLoading(true);

    try {
      // --- STEP BARU: AMBIL USER DARI SUPABASE ---
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Silakan login terlebih dahulu untuk berdonasi.");
        setIsLoading(false);
        return;
      }
      // ------------------------------------------
      console.log("DEBUG: Mengirim judul ke API ->", props.title);

      const response = await fetch("/api/donation/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selectedAmount,
          donationType: props.title,
          userId: user.id, // KIRIM USER ID KE BACKEND
          userEmail: user.email, // KIRIM EMAIL KE BACKEND
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Gagal checkout");

      if (data.token) {
        window.snap.pay(data.token, {
          onSuccess: (result) => {
            const newTotal = currentProgress + Number(selectedAmount);
            setCurrentProgress(newTotal);
            setSelectedAmount(0);
            alert("Donasi berhasil! Terima kasih.");
            // Redirect ke dashboard biar user bisa lihat history-nya
            window.location.href = "/dashboard/donations";
          },
          onPending: (result) => {
            alert("Menunggu pembayaran.");
            window.location.href = "/dashboard/donations";
          },
          onError: (result) => alert("Pembayaran gagal."),
          onClose: () => alert("Pembayaran dibatalkan."),
        });
      }
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const ammount = [10000, 50000, 100000, 500000, 1000000, 2000000];

  const formatIDR = (v) =>
    v === "" || v === 0 ? "" : "Rp " + new Intl.NumberFormat("id-ID").format(v);

  const parseIDR = (v) => {
    return Number(v.replace(/[^0-9]/g, ""));
  };

  const percentage = Math.min((currentProgress * 100) / Limit, 100);

  return (
    <>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
      />

      <div className="flex flex-col w-full px-6">
        <div className="flex items-start gap-4 py-4">
          <div className="w-[60%] flex flex-col justify-center pr-4 border-r-[2.5px]">
            <h2 style={{ color: props.color }} className="text-[2.5rem]">
              Description
            </h2>
            <p className="text-[14px] text-justify">{props.desc}</p>
          </div>
          <div className="w-[40%] flex flex-col justify-end h-full gap-4 pt-4">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("overview")}
                style={
                  activeTab === "overview"
                    ? { color: props.color, borderBottomColor: props.color }
                    : {}
                }
                className="border-b-2 border-transparent"
              >
                Overview
              </button>

              <button
                onClick={() => setActiveTab("impact")}
                style={
                  activeTab === "impact"
                    ? { color: props.color, borderBottomColor: props.color }
                    : {}
                }
                className="border-b-2 border-transparent"
              >
                Impact
              </button>
            </div>

            <div className="text-[14px] text-justify">
              {activeTab === "overview" && <p>{props.orv}</p>}
              {activeTab === "impact" && <p>{props.impact}</p>}
            </div>
          </div>
        </div>
        <div className="flex pt-4 h-[50vh] gap-4">
          <div className="w-[50%] h-full flex flex-col">
            <Image_Damper name={props.title} img={props.hero}></Image_Damper>
          </div>
          <div className="w-[50%] h-full flex flex-col justify-between items-center">
            <h2
              style={{ color: props.color }}
              className="border-b-4 w-fit px-8 text-[2.5rem]"
            >
              Monthly Target
            </h2>

            <div className="w-full flex flex-col gap-5">
              <div className="w-full flex flex-col gap-[.2rem]">
                <p className="text-right text-[14px]">
                  {formatIDR(currentProgress)} / {formatIDR(Limit)}
                </p>
                <div
                  style={{ outlineColor: props.color }}
                  className="outline-[3px] w-full relative h-7.5 rounded-full overflow-hidden"
                >
                  <span
                    style={{ width: percentage + "%", background: props.color }}
                    className="absolute h-full left-0 transition-all duration-500 rounded-full"
                  ></span>
                </div>
              </div>

              <div>
                <p>Select a donation ammount</p>
                <div className="grid grid-cols-4 w-full gap-1">
                  {ammount.map((choice) => {
                    return (
                      <button
                        onClick={() => setSelectedAmount(choice)}
                        key={choice}
                        className="px-4 py-2 border text-[12px]"
                        style={
                          selectedAmount === choice
                            ? {
                                backgroundColor: props.color,
                                color: "#e8e8da",
                                borderColor: props.color,
                              }
                            : {}
                        }
                      >
                        {formatIDR(choice)}
                      </button>
                    );
                  })}
                  <input
                    type="text"
                    placeholder="Other"
                    value={formatIDR(selectedAmount)}
                    onChange={(e) => {
                      const rawValue = parseIDR(e.target.value);
                      setSelectedAmount(rawValue);
                    }}
                    className="col-span-2 px-4 py-2 border text-[12px]"
                  />
                </div>
              </div>
              <button
                style={{ background: props.color }}
                onClick={handlePayment}
                disabled={isLoading}
                type="button"
                className="self-center text-white w-[50%] py-2 rounded-lg disabled:opacity-50"
              >
                {isLoading ? "Processing..." : "Donate"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
