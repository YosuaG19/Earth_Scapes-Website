"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";
import {
  Coins,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
  X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const supabase = createClient();
  
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    fullAddress: ''
  });

  const [product, setProduct] = useState<any>(null);
  const [userPoints, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isRedeeming, setIsRedeeming] = useState(false);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data } = await supabase
          .from("ecoshop_products")
          .select("*")
          .eq("slug", slug)
          .single();

        if (user) {
          const { count: trips } = await supabase
            .from("bookings")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id);

          const { count: donations } = await supabase
            .from("donations")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id);

          const { data: spentData } = await supabase
            .from("ecoshop_transactions")
            .select("points_spent")
            .eq("user_id", user.id);

          const totalSpent = spentData?.reduce((acc, curr) => acc + curr.points_spent, 0) || 0;
          const totalEarned = (trips || 0) * 500 + (donations || 0) * 100;
          setUserPoints(totalEarned - totalSpent);
        }

        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [slug]);

  const canAfford = userPoints >= (product?.price_points || 0);

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRedeeming(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert("Silakan login terlebih dahulu!");
        return;
      }

      const { error: txError } = await supabase
        .from("ecoshop_transactions")
        .insert([
          {
            user_id: user.id,
            product_id: product.id,
            points_spent: product.price_points,
            status: "success",
            recipient_name: address.name,
            phone_number: address.phone,
            shipping_address: address.fullAddress
          },
        ]);

      if (txError) throw txError;

      alert("YEAY! Penukaran berhasil. Tim kami akan segera mengirimkan barang ke alamatmu.");
      
      setUserPoints((prev) => prev - product.price_points);
      setShowModal(false);
      router.push('/dashboard/transactions');
      
    } catch (error: any) {
      console.error(error);
      alert("Waduh, ada masalah pas nukar poin: " + error.message);
    } finally {
      setIsRedeeming(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcf9]">
      <Loader2 className="animate-spin w-10 h-10 text-[#242D13]" />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcf9]">
      <h1 className="text-2xl font-bold mb-4">Sorry, the product you’re looking for was not found.</h1>
      <Link href="/ecoshop" className="text-[#242D13] underline">Back to EcoShop</Link>
    </div>
  );

  return (
    <div className="min-h-screen px-12 pt-8 flex items-start">
      <main className="w-full flex flex-col gap-4">
        <button onClick={() => router.back()} className="flex items-center w-fit gap-2 text-[#242D13]/50 hover:text-[#242D13] font-bold transition-all group">
          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-white transition-all">
            <ArrowLeft size={18} />
          </div>
          Back to Catalog
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-[80vh]">
          {/* IMAGE SECTION */}
          <div className="relative h-full rounded-4xl overflow-hidden shadow-2xl border-12 border-white group">
            <Image src={product.image_url} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-2 rounded-2xl text-xs font-black uppercase tracking-widest text-[#242D13]">
              {product.category}
            </div>
          </div>

          {/* INFO SECTION */}
          <div className="flex gap-4 flex-col">
            <div className="bg-white px-8 py-6 rounded-t-3xl flex flex-col">
              <div className="flex items-center gap-4 text-gray-400 text-sm font-medium">
                <span className="flex items-center gap-1"><ShoppingBag size={16} /> Stock Available</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                <span>Local Craftsmanship</span>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <h1 className="text-4xl font-black text-[#242D13] tracking-tighter leading-[0.9]">
                  {product.name}
                </h1>

                <span className="mt-2 w-full h-px bg-black"></span>

                <p className="arti text-l text-gray-500 leading-relaxed font-sans font-medium">
                  {product.description}
                </p>
              </div>
            </div>

            {/* REDEEM CARD */}
            <div className="bg-white px-8 py-6 rounded-b-3xl shadow-2xl shadow-[#242D13]/5 space-y-8">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Exchange Price</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-400 rounded-2xl flex items-center justify-center text-[#242D13] shadow-lg shadow-yellow-400/20">
                      <Coins size={20} />
                    </div>
                    <span className="text-3xl font-black text-[#242D13] tracking-tighter">
                      {product.price_points.toLocaleString()}
                      <span className="text-sm font-bold opacity-30 uppercase ml-2 tracking-widest font-sans">Points</span>
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Your Balance</p>
                  <p className={`font-black text-3xl ${canAfford ? "text-green-600" : "text-red-500"}`}>
                    {userPoints.toLocaleString()} <span className="text-sm">Points</span>
                  </p>
                </div>
              </div>  

              <button
                onClick={() => canAfford && setShowModal(true)}
                disabled={!canAfford}
                className={`w-full py-4 rounded-3xl font-black text-xl transition-all flex items-center justify-center gap-4 shadow-xl ${
                  canAfford ? "bg-[#242D13] text-white hover:bg-[#324018] shadow-[#242D13]/20 hover:scale-[1.01] active:scale-[0.98]" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {canAfford ? <>Exchange Now <ArrowRight size={22} /></> : "Not Enough EcoPoints"}
              </button>

              {!canAfford && (
                <p className="text-center text-sm font-medium text-red-400 font-sans">Get more point with doing Trips!</p>
              )}
            </div>

            <div className="w-fit mx-auto flex items-center gap-4 px-4 py-2 bg-green-50 rounded-full border border-green-100">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white shrink-0"><CheckCircle2 size={24} /></div>
              <div>
                <h4 className="font-bold text-[16px] text-green-900">EarthScapes Verified</h4>
                <p className="text-[12px] text-green-800/70 leading-relaxed font-sans">Every exchange will help local Craftsmen</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL PENGIRIMAN */}
      {showModal && (
        <div className="fixed inset-0 z-999 flex items-center justify-center p-6 bg-[#242D13]/60 backdrop-blur-xs ">
          <div className="bg-white w-full max-w-lg rounded-[3.5rem] p-10 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-gray-400 hover:text-[#242D13] transition-colors"><X size={24} /></button>
            <div className="mb-8">
              <h2 className="text-3xl font-black text-[#242D13] tracking-tighter">Delivery Details</h2>
              <p className="text-gray-500 font-medium font-sans">This item will be deliver to this address.</p>
            </div>
            <form onSubmit={handleRedeem} className="space-y-5">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Recipient Name</label>
                <input required type="text" className="w-full bg-gray-50 border-none rounded-3xl py-4 px-6 focus:ring-2 focus:ring-[#242D13]/10 outline-none font-sans" placeholder="Full Name" onChange={(e) => setAddress({...address, name: e.target.value})} />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Phone Number</label>
                <input required type="tel" className="w-full bg-gray-50 border-none rounded-3xl py-4 px-6 focus:ring-2 focus:ring-[#242D13]/10 outline-none font-sans" placeholder="0812..." onChange={(e) => setAddress({...address, phone: e.target.value})} />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Full Address</label>
                <textarea required rows={3} className="w-full bg-gray-50 border-none rounded-3xl py-4 px-6 focus:ring-2 focus:ring-[#242D13]/10 outline-none font-sans resize-none" placeholder="Jl. Raya..." onChange={(e) => setAddress({...address, fullAddress: e.target.value})} />
              </div>
              <button type="submit" disabled={isRedeeming} className="w-full py-5 bg-[#242D13] text-white rounded-[1.8rem] font-black text-lg hover:bg-[#324018] shadow-xl transition-all flex items-center justify-center gap-2">
                {isRedeeming ? <Loader2 className="animate-spin" /> : 'Confirm & Exchange'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}