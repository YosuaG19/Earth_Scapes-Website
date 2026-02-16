'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Map, TreeDeciduous, Heart, Loader2 } from 'lucide-react';

export default function OverviewPage() {
    const supabase = createClient();
    const [stats, setStats] = useState({ trips: 0, donations: 0, wishlist: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                // 1. Hitung jumlah Trip dari tabel 'trips'
                const { count: tripCount } = await supabase
                    .from('trips')
                    .select('*', { count: 'exact', head: true });

                // 2. Hitung jumlah donasi (misal dari tabel 'donations')
                // Kalau belum ada tabelnya, kita set default dulu
                const { count: donationCount } = await supabase
                    .from('donations')
                    .select('*', { count: 'exact', head: true });

                setStats({
                    trips: tripCount || 0,
                    donations: donationCount || 0,
                    wishlist: 5 // Ini bisa kamu sesuaikan nanti
                });
            } catch (error) {
                console.error("Gagal ambil data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) return <div className="p-10 flex gap-2"><Loader2 className="animate-spin"/> Loading Stats...</div>;

    return (
        <div className="space-y-10">
            <header>
                <h1 className="text-4xl font-extrabold text-[#242D13] tracking-tight">
                    Dashboard <span className="text-[#242D13]/30 font-light">Overview</span>
                </h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Kartu Trip - Narik dari Table Trips */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center">
                        <Map className="text-blue-600" />
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-widest text-gray-400">Available Trips</p>
                        <h3 className="text-3xl font-bold text-[#242D13]">{stats.trips}</h3>
                    </div>
                </div>

                {/* Kartu Donasi - Narik dari Table Donations */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-green-50 rounded-3xl flex items-center justify-center">
                        <TreeDeciduous className="text-green-600" />
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-widest text-gray-400">Total Donations</p>
                        <h3 className="text-3xl font-bold text-[#242D13]">{stats.donations}</h3>
                    </div>
                </div>

                {/* Wishlist */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-red-50 rounded-3xl flex items-center justify-center">
                        <Heart className="text-red-600" />
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-widest text-gray-400">Wishlist</p>
                        <h3 className="text-3xl font-bold text-[#242D13]">{stats.wishlist}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}