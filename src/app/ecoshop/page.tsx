'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ShoppingBag, Coins, ArrowRight, Loader2, Filter, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar'; 

const categories = ['All', 'Personal Care', 'Food & Beverage', 'Crafts & Decor', 'Eco-Gear'];

export default function EcoShopPage() {
    const supabase = createClient();
    const [products, setProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [userPoints, setUserPoints] = useState(0);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function loadShopData() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                
                // 1. Ambil Data Produk
                const { data: productData } = await supabase
                    .from('ecoshop_products')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (user) {
                    // 2. Ambil Jumlah Trip
                    const { count: trips } = await supabase
                        .from('bookings')
                        .select('*', { count: 'exact', head: true })
                        .eq('user_id', user.id);

                    // 3. Ambil Jumlah Donasi
                    const { count: donations } = await supabase
                        .from('donations')
                        .select('*', { count: 'exact', head: true })
                        .eq('user_id', user.id);

                    // 4. Ambil Total Poin Terpakai (Kunci Sinkronisasi)
                    const { data: spentData } = await supabase
                        .from('ecoshop_transactions')
                        .select('points_spent')
                        .eq('user_id', user.id);

                    const totalSpent = spentData?.reduce((acc, curr) => acc + (curr.points_spent || 0), 0) || 0;
                    
                    // 5. Kalkulasi Saldo Akhir
                    const grossPoints = (trips || 0) * 500 + (donations || 0) * 100;
                    const netPoints = grossPoints - totalSpent;

                    setUserPoints(netPoints < 0 ? 0 : netPoints);
                }

                setProducts(productData || []);
                setFilteredProducts(productData || []);
            } catch (error) {
                console.error("Error loading shop data:", error);
            } finally {
                setLoading(false);
            }
        }
        loadShopData();
    }, []);

    // Filter Logic tetap sama
    useEffect(() => {
        let result = products;
        if (activeCategory !== 'All') result = result.filter(p => p.category === activeCategory);
        if (searchQuery) result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredProducts(result);
    }, [activeCategory, searchQuery, products]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#fcfcf9]">
            <div className="text-center">
                <Loader2 className="animate-spin w-10 h-10 text-[#242D13] mx-auto mb-4" />
                <p className="font-bold text-[#242D13]">Preparing local products...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen">
            <Navbar/>

            <main className="pb-10 -mt-11">
                {/* HERO & POINT SUMMARY */}
                <section className="bg-[#242D13] py-12 px-8 text-[#e8e8da] relative overflow-hidden -mt-px">                    
                    <div className="relative z-10 w-full flex flex-col lg:flex-row justify-between items-center gap-10">
                        <div className="max-w-xl text-center lg:text-left">
                            <h1 className="text-7xl font-black tracking-tighter leading-none">
                                EcoShop<span className="text-yellow-400">.</span>
                            </h1>
                            <p className="text-[#e8e8da]/70 mt-6 text-l font-medium leading-relaxed font-sans">
                                Turn your journey footprint into real impact. Exchange your points for products from local communities.
                            </p>
                        </div>
                        
                        {/* Box Poin yang sudah terupdate */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[1.5rem] flex items-center gap-8 shadow-2xl">
                            <div className="w-16 h-16 bg-yellow-400 text-[#242D13] rounded-2xl flex items-center justify-center">
                                <Coins size={32} strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">EcoPoints Amount</p>
                                <h3 className="text-3xl font-bold tracking-tighter font-sans">{userPoints.toLocaleString()}</h3>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filter & Search Bar */}
                <section className="max-w-7xl mx-auto px-8 -mt-10 relative z-30">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative grow w-[50%]">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="text"
                                placeholder="Cari produk ramah lingkungan..."
                                className="w-full pl-16 pr-6 py-3 rounded-3xl border-none focus:ring-2 focus:ring-[#242D13]/10 transition-all outline-none text-[#242D13] font-sans bg-white"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 pb-1 overflow-x-auto w-[50%] md:w-auto px-2 md:px-0 no-scrollbar">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-xl text-sm font-black whitespace-nowrap transition-all font-sans ${
                                        activeCategory === cat 
                                        ? 'bg-[#242D13] text-white shadow-lg' 
                                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Product Grid */}
                <section className="w-full px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                        {filteredProducts.map((product) => (
                            <Link href={`/ecoshop/${product.slug}`} key={product.id} className="group min-h-[40vh] max-h-[40vh]">
                                <div className="bg-white rounded-t-[3rem] p-4 shadow-sm border border-gray-50 h-full w-full flex flex-col justify-between hover:shadow-2xl hover:shadow-[#242D13]/5 transition-all duration-500">
                                    <div className="relative h-[60%] w-full rounded-t-[2.5rem] overflow-hidden bg-gray-100">
                                        <Image 
                                            src={product.image_url} 
                                            alt={product.name} 
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#242D13] shadow-sm font-sans">
                                            {product.category}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-[#242D13] leading-none group-hover:text-[#324018]">
                                            {product.name}
                                        </h3>
                                    </div>

                                    <div className="flex items-end justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest font-sans">Price</span>
                                            <div className="flex items-center gap-1 font-sans">
                                                <Coins size={14} className="text-yellow-600" />
                                                <span className="font-black text-[#242D13] text-xl">{product.price_points.toLocaleString()}</span>
                                            </div>
                                        </div>
                                            
                                        <div className={`w-16 h-8 rounded-l-2xl flex items-center justify-center transition-all shadow-sm bg-[#242D13] text-white group-hover:bg-[#324018] group-hover:translate-x-1`}>
                                            <ArrowRight size={22} />
                                        </div>
                                    </div>
                                    
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}