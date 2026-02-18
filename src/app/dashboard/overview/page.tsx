'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Map, Heart, Coins, Calendar, ArrowRight, ShoppingBag, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function OverviewPage() {
    const supabase = createClient();
    const [stats, setStats] = useState({ trips: 0, donations: 0, ecoPoints: 0 });
    const [nextTrip, setNextTrip] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (user) {
                    // 1. Hitung jumlah perjalanan
                    const { count: tripCount } = await supabase
                        .from('bookings')
                        .select('*', { count: 'exact', head: true })
                        .eq('user_id', user.id);

                    // 2. Hitung jumlah donasi
                    const { count: donationCount } = await supabase
                        .from('donations')
                        .select('*', { count: 'exact', head: true })
                        .eq('user_id', user.id);

                    // 3. AMBIL TOTAL POIN YANG SUDAH DIBELANJAKAN (NEW LOGIC)
                    const { data: spentData } = await supabase
                        .from('ecoshop_transactions')
                        .select('points_spent')
                        .eq('user_id', user.id);

                    const totalSpent = spentData?.reduce((acc, curr) => acc + (curr.points_spent || 0), 0) || 0;

                    // 4. KALKULASI AKHIR
                    // Rumus: (Trip * 500) + (Donasi * 100) - (Poin yang dibelanjakan)
                    const grossPoints = (tripCount || 0) * 500 + (donationCount || 0) * 100;
                    const netPoints = grossPoints - totalSpent;

                    // 5. Cari Perjalanan Terdekat
                    const { data: upcoming } = await supabase
                        .from('bookings')
                        .select('*, trips(*)')
                        .eq('user_id', user.id)
                        .gte('start_date', new Date().toISOString())
                        .order('start_date', { ascending: true })
                        .limit(1)
                        .maybeSingle();

                    setStats({
                        trips: tripCount || 0,
                        donations: donationCount || 0,
                        ecoPoints: netPoints < 0 ? 0 : netPoints // Pastikan poin tidak minus
                    });
                    
                    setNextTrip(upcoming);
                }
            } catch (error) {
                console.error("Gagal ambil data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchDashboardData();
    }, []);

    const getDaysUntil = (dateString: string) => {
        const diff = new Date(dateString).getTime() - new Date().getTime();
        const days = Math.ceil(diff / (1000 * 3600 * 24));
        return days > 0 ? days : 0;
    };

    if (loading) return (
        <div className="p-10 flex items-center gap-3 text-[#242D13] font-bold">
            <Loader2 className="animate-spin" /> Sinkronisasi data petualangan...
        </div>
    );

    return (
        <div className="space-y-10 pb-10">
            <header>
                <h1 className="text-4xl font-extrabold text-[#242D13] tracking-tight">
                    Overview <span className="text-[#242D13]/30 font-light">Petualangan</span>
                </h1>
                <p className="text-gray-500 mt-2 font-medium">Pantau kontribusi hijau dan saldo poinmu.</p>
            </header>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6 transition-all hover:shadow-md group">
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Map size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Perjalanan</p>
                        <h3 className="text-3xl font-bold text-[#242D13] tracking-tighter">{stats.trips} <span className="text-sm font-normal text-gray-400">Trips</span></h3>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6 transition-all hover:shadow-md group">
                    <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Heart size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Donasi</p>
                        <h3 className="text-3xl font-bold text-[#242D13] tracking-tighter">{stats.donations} <span className="text-sm font-normal text-gray-400">Donasi</span></h3>
                    </div>
                </div>

                {/* EcoPoints - Saldo Real Setelah Belanja */}
                <div className="bg-[#242D13] p-8 rounded-[2.5rem] shadow-xl shadow-[#242D13]/20 flex items-center gap-6 border border-white/5 relative overflow-hidden group">
                    <Coins className="absolute -right-2 -bottom-2 w-20 h-20 text-white opacity-5 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
                    <div className="w-14 h-14 bg-yellow-400 text-[#242D13] rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-400/20 relative z-10">
                        <Coins size={24} strokeWidth={2.5} />
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#e8e8da]/50">Saldo EcoPoints</p>
                        <h3 className="text-3xl font-bold text-[#e8e8da] tracking-tighter">{stats.ecoPoints.toLocaleString()}</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* DYNAMIC COUNTDOWN CARD */}
                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden group min-h-80">
                    <Calendar className="absolute top-10 right-10 text-gray-50 w-32 h-32 z-0" />
                    <div className="relative z-10">
                        <span className="px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {nextTrip ? 'Perjalanan Terdekat' : 'Status Perjalanan'}
                        </span>
                        {nextTrip ? (
                            <>
                                <h2 className="text-6xl font-black text-[#242D13] mt-8 tracking-tighter">H-{getDaysUntil(nextTrip.start_date)}</h2>
                                <p className="text-[#242D13]/60 font-medium mt-2 text-lg italic">Menuju {nextTrip.trips?.title || 'Destinasi Impian'}</p>
                            </>
                        ) : (
                            <div className="mt-8">
                                <h2 className="text-3xl font-bold text-[#242D13] leading-tight">Siap untuk petualangan baru?</h2>
                                <p className="text-gray-400 mt-2">Belum ada jadwal perjalanan dalam waktu dekat.</p>
                            </div>
                        )}
                    </div>
                    <Link href="/dashboard/trips" className="mt-10 flex items-center gap-2 text-[#242D13] font-bold group relative z-10">
                        {nextTrip ? 'Lihat persiapan trip' : 'Mulai cari destinasi'} <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                {/* ECOSHOP PREVIEW CARD */}
                <div className="bg-[#e8e8da] p-10 rounded-[3rem] border border-[#242D13]/10 flex flex-col justify-between relative group overflow-hidden">
                    <ShoppingBag className="absolute -bottom-10 -right-10 text-[#242D13]/5 w-48 h-48" />
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-[#242D13]">EcoShop Marketplace</h3>
                        <p className="text-[#242D13]/60 mt-2 max-w-70">Gunakan poinmu untuk mendapatkan produk ramah lingkungan eksklusif.</p>
                    </div>
                    <Link href="/ecoshop" className="relative z-10 mt-10 bg-[#242D13] text-white py-4 px-8 rounded-2xl font-bold text-sm hover:bg-[#2c3818] transition-all shadow-lg shadow-[#242D13]/10 flex items-center justify-center gap-2">
                        Tukar Poin Sekarang <ShoppingBag size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}