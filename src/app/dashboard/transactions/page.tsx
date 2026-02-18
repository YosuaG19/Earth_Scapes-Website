"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  ShoppingBag,
  Package,
  MapPin,
  Calendar,
  Loader2,
  ChevronRight,
  User,
  Phone,
} from "lucide-react";
import Image from "next/image";

export default function EcoShopTransactions() {
  const supabase = createClient();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyTransactions() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          // Pakai manual join agar data produk pasti terpanggil
          const { data: txData, error: txError } = await supabase
            .from("ecoshop_transactions")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

          if (txError) throw txError;

          if (txData) {
            const detailed = await Promise.all(
              txData.map(async (tx: any) => {
                const { data: pData } = await supabase
                  .from("ecoshop_products")
                  .select("name, image_url, category")
                  .eq("id", tx.product_id)
                  .single();
                return { ...tx, product: pData };
              }),
            );
            setTransactions(detailed);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMyTransactions();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-[#242D13] w-8 h-8" />
      </div>
    );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#242D13] rounded-xl flex items-center justify-center text-white">
            <ShoppingBag size={20} />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.3em] text-[#242D13]/40">
            EcoShop
          </span>
        </div>
        <h1 className="text-4xl font-black text-[#242D13] tracking-tighter">
          Riwayat Penukaran Poin
        </h1>
        <p className="text-gray-500 font-medium mt-1">
          Pantau status pengiriman barang kontribusi lingkunganmu.
        </p>
      </div>

      {/* Transactions List */}
      <div className="space-y-6">
        {transactions.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <Package size={40} />
            </div>
            <h3 className="text-xl font-bold text-[#242D13]">
              Belum ada transaksi
            </h3>
            <p className="text-gray-400 max-w-xs mx-auto mt-2">
              Poin yang kamu kumpulkan bisa ditukar dengan produk lokal ramah
              lingkungan.
            </p>
          </div>
        ) : (
          transactions.map((tx) => (
            <div
              key={tx.id}
              className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#242D13]/5 transition-all duration-500 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row items-stretch">
                {/* Product Preview */}
                <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden bg-gray-50">
                  {tx.product?.image_url && (
                    <Image
                      src={tx.product.image_url}
                      alt="Product"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-[#242D13]/20 to-transparent" />
                </div>

                {/* Details Area */}
                <div className="grow p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        {tx.product?.category || "Eco Item"}
                      </span>
                      <h3 className="text-2xl font-black text-[#242D13] mt-2 tracking-tight">
                        {tx.product?.name || "Produk EarthScapes"}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-[#242D13]">
                        -{tx.points_spent.toLocaleString()} Pts
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter flex items-center justify-end gap-1 mt-1">
                        <Calendar size={10} />{" "}
                        {new Date(tx.created_at).toLocaleDateString("id-ID")}
                      </div>
                    </div>
                  </div>

                  {/* Shipping Info Card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#fcfcf9] p-5 rounded-3xl border border-gray-50 mt-2">
                    <div className="flex items-start gap-3">
                      <User size={14} className="mt-1 text-[#242D13]/30" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest leading-none mb-1">
                          Penerima
                        </p>
                        <p className="text-xs font-bold text-[#242D13]">
                          {tx.recipient_name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone size={14} className="mt-1 text-[#242D13]/30" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest leading-none mb-1">
                          Kontak
                        </p>
                        <p className="text-xs font-bold text-[#242D13]">
                          {tx.phone_number}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 md:col-span-2 pt-2 border-t border-gray-200/50">
                      <MapPin size={14} className="mt-1 text-[#242D13]/30" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest leading-none mb-1">
                          Alamat Tujuan
                        </p>
                        <p className="text-xs font-medium text-gray-600 leading-relaxed">
                          {tx.shipping_address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Sidebar */}
                <div
                  className={`w-full md:w-24 flex md:flex-col items-center justify-center p-6 gap-2 ${
                    tx.status === "success" ? "bg-green-50" : "bg-yellow-50"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      tx.status === "success"
                        ? "bg-green-600 text-white"
                        : "bg-yellow-600 text-white"
                    }`}
                  >
                    <ChevronRight size={16} className="md:rotate-0 rotate-90" />
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest vertical-text md:[writing-mode:vertical-lr] ${
                      tx.status === "success"
                        ? "text-green-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
