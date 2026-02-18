'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import TripTable from '@/app/components/dashboard/TripTable';

// 1. Sesuaikan Interface dengan kolom di database Supabase
interface Trip {
    id: string;
    trip_title: string;     // Ubah dari destination_name ke trip_title
    start_date: string;     // Sesuai dengan yang disimpan di Add_Payment
    end_date: string;
    total_price: number;
    status: string;
}

export default function MyTripsPage() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchTrips = async () => {
            // Ambil session user
            const { data: { user } } = await supabase.auth.getUser();
            
            if (user) {
                const { data, error } = await supabase
                    .from('bookings') 
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (!error && data) {
                    setTrips(data);
                } else if (error) {
                    console.error("Supabase Error:", error.message);
                }
            }
            setLoading(false);
        };

        fetchTrips();
    }, [supabase]);

    return (
        <div className="space-y-10">
            <header>
                <h1 className="text-4xl font-extrabold text-[#242D13] tracking-tight">
                    Trips <span className="text-[#242D13]/30 font-light">Logs</span>
                </h1>
                <p className="text-gray-500 mt-2 font-medium">Logs of your journey around Indonesia.</p>
            </header>

            <div className="bg-[#F5F5F0] p-6 md:p-10 rounded-[3rem] border border-gray-200/50 min-h-125">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-75 gap-4">
                        <div className="w-12 h-12 border-4 border-[#242D13]/10 border-t-[#242D13] rounded-full animate-spin"></div>
                    </div>
                ) : trips.length > 0 ? (
                    <TripTable trips={trips} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <span className="text-7xl mb-6 grayscale opacity-30">✈️</span>
                        <h3 className="text-xl font-bold text-[#242D13]">Belum ada pesanan trip</h3>
                        <p className="text-gray-400 text-sm max-w-xs mt-2">
                            Eksplorasi keindahan alam dan mulai petualanganmu sekarang.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}