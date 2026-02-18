'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import DonationTable from '@/app/components/dashboard/DonationTable';

// Definisikan tipe data donasi
interface Donation {
    id: string;
    amount: number;
    type: string;
    status: string;
    created_at: string;
}

export default function MyDonationsPage() {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchDonations = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            
            if (user) {
                const { data, error } = await supabase
                    .from('donations') // Pastikan nama tabel di Supabase kamu 'donations'
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (!error && data) {
                    setDonations(data);
                }
            }
            setLoading(false);
        };

        fetchDonations();
    }, [supabase]);

    return (
        <div className="space-y-10">
            <header>
                <h1 className="text-4xl font-extrabold text-[#242D13] tracking-tight">
                    Donasi <span className="text-[#242D13]/30 font-light">Saya</span>
                </h1>
                <p className="text-gray-500 mt-2 font-medium">Jejak kontribusi kamu dalam menghijaukan kembali bumi kita.</p>
            </header>

            <div className="bg-white p-6 md:p-10 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100 min-h-125">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-75 gap-4">
                        <div className="w-12 h-12 border-4 border-[#242D13]/10 border-t-[#242D13] rounded-full animate-spin"></div>
                        <p className="text-[#242D13]/40 font-bold text-sm uppercase tracking-widest">Memuat Data...</p>
                    </div>
                ) : donations.length > 0 ? (
                    <DonationTable donations={donations} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <span className="text-7xl mb-6 grayscale opacity-30">🌳</span>
                        <h3 className="text-xl font-bold text-[#242D13]">Belum ada riwayat donasi</h3>
                        <p className="text-gray-400 text-sm max-w-xs mt-2">
                            Ayo mulai kontribusi pertamamu dan lihat dampaknya di sini.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}