'use client'

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { 
  LayoutDashboard, 
  Map, 
  Sprout, 
  LogOut, 
  User,
  ShoppingBag,
  Settings 
} from 'lucide-react';

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const menuItems = [
        { 
            name: 'Overview', 
            path: '/dashboard/overview', 
            icon: <LayoutDashboard size={20} strokeWidth={1.5} /> 
        },
        { 
            name: 'Riwayat Trip', 
            path: '/dashboard/trips', 
            icon: <Map size={20} strokeWidth={1.5} /> 
        },
        { 
            name: 'Donasi Saya', 
            path: '/dashboard/donations', 
            icon: <Sprout size={20} strokeWidth={1.5} /> 
        },
        {
            name: 'EcoShop Transaksi', 
            path: '/dashboard/transactions', 
            icon: <ShoppingBag size={20} strokeWidth={1.5} /> 
        },
        { 
            name: 'Profil Saya', 
            path: '/dashboard', 
            icon: <User size={20} strokeWidth={1.5} /> 
        },
    ];

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/signin');
        router.refresh();
    };

    return (
        <aside className="w-72 bg-[#242D13] text-[#e8e8da] flex flex-col min-h-screen sticky top-0 border-r border-white/5">
            {/* Logo Area */}
            <div className="p-8">
                <Link href="/" className="group">
                    <h2 className="text-xl font-bold tracking-[0.3em] uppercase group-hover:text-white transition-colors">
                        EarthScapes
                    </h2>
                    <div className="h-0.5 w-10 bg-[#e8e8da] mt-1 transition-all group-hover:w-full"></div>
                </Link>
                <p className="text-[10px] opacity-40 mt-3 font-mono tracking-widest uppercase italic">Member Dashboard</p>
            </div>

            {/* Navigasi */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                                isActive 
                                ? 'bg-[#e8e8da] text-[#242D13] font-bold shadow-[0_10px_20px_rgba(0,0,0,0.3)]' 
                                : 'hover:bg-white/5 opacity-60 hover:opacity-100'
                            }`}
                        >
                            <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                                {item.icon}
                            </span>
                            <span className="text-sm font-medium tracking-wide">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <div className="p-6">
                <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 px-4 py-4 text-red-400 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 rounded-2xl transition-all duration-300 group"
                >
                    <LogOut size={18} strokeWidth={2} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Keluar Akun</span>
                </button>
            </div>
        </aside>
    );
}