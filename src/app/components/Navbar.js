'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();
    
    const [user, setUser] = useState(null);
    const [isInitialCheckDone, setIsInitialCheckDone] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setIsInitialCheckDone(true);
        };

        checkSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') setUser(session?.user);
            if (event === 'USER_UPDATED') setUser(session?.user);

            if (event === 'SIGNED_OUT') {
                setUser(null);
                router.push('/signin');
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [supabase, router]);

    return (
        <nav className="sticky top-0 flex items-center justify-between px-8 py-2 bg-[#e8e8da] z-50 shadow-sm">
            {/* SISI KIRI: LOGO */}
            <Link href="/">
                <div className='flex items-center gap-4'>
                    <div className="flex items-center justify-center w-13.75 h-13.75 rounded-full bg-[#324018]">
                        <Image width={50} height={50} src="/logo.png" alt='logo' priority />
                    </div>
                    <h1 className='text-[#242D13] text-[1.5rem] font-bold tracking-tighter'>EarthScapes</h1>
                </div>
            </Link>
            
            {/* SISI KANAN */}
            <div className="flex items-center gap-10">
                <ul className='text-[#242D13] text-[1.1rem] flex gap-10'>
                    <li>
                        <Link href="/trips" className={`hover:opacity-70 transition-all ${pathname === '/trips' ? 'font-bold border-b-2 border-[#242D13]' : ''}`}>Trips</Link>
                    </li>
                    <li>
                        <Link href="/donate" className={`hover:opacity-70 transition-all ${pathname === '/donate' ? 'font-bold border-b-2 border-[#242D13]' : ''}`}>Donate</Link>
                    </li>
                    {/* MENU BARU: ECOSHOP */}
                    <li>
                        <Link href="/ecoshop" className={`hover:opacity-70 transition-all flex items-center gap-1 ${pathname === '/ecoshop' ? 'font-bold border-b-2 border-[#242D13]' : ''}`}>
                            EcoShop
                        </Link>
                    </li>
                </ul>

                <div className="flex items-center border-l border-[#242D13]/20 pl-10">
                    {!isInitialCheckDone ? (
                        <div className="h-8 w-20 bg-[#242D13]/10 animate-pulse rounded-lg"></div>
                    ) : user ? (
                        <Link href="/dashboard">
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${pathname.startsWith('/dashboard') ? 'bg-[#324018] text-[#e8e8da]' : 'bg-[#242D13] text-[#e8e8da] hover:bg-[#324018]'}`}>
                                
                                {/* LINGKARAN FOTO/INISIAL */}
                                <div className="w-7 h-7 rounded-full bg-[#e8e8da] overflow-hidden flex items-center justify-center text-[#242D13] text-[10px] font-bold border border-white/20">
                                    {user.user_metadata?.avatar_url ? (
                                        <img 
                                            src={user.user_metadata.avatar_url} 
                                            alt="avatar" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        user.email?.charAt(0).toUpperCase()
                                    )}
                                </div>

                                <p className='text-xs font-bold tracking-tight'>Dashboard</p>
                            </div>
                        </Link>
                    ) : (
                        <div className="flex gap-4 items-center">
                            <Link href='/signin' className='text-[#242D13] text-sm font-medium hover:opacity-70'>Login</Link>
                            <Link href='/signup' className='bg-[#242D13] px-5 py-2 rounded-lg text-[#e8e8da] text-sm font-medium hover:bg-[#324018] transition-colors'>Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav> 
    );
}