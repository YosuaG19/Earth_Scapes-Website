// 'use client'
// import { useEffect, useState } from 'react';
// import { createClient } from '@/lib/supabase/client';

// export default function ProfilePage() {
//     const supabase = createClient();
//     const [loading, setLoading] = useState(true);
//     const [uploading, setUploading] = useState(false);
    
//     const [profile, setProfile] = useState({
//         full_name: '',
//         username: '',
//         email: '',
//         phone: '',
//         bio: '',
//         avatar_url: ''
//     });

//     useEffect(() => {
//         const fetchUser = async () => {
//             const { data: { user } } = await supabase.auth.getUser();
//             if (user) {
//                 // Mengambil data dari user_metadata
//                 const meta = user.user_metadata;
//                 setProfile({
//                     full_name: meta?.full_name || '',
//                     username: meta?.username || '',
//                     email: user.email || '',
//                     phone: meta?.phone || '',
//                     bio: meta?.bio || '',
//                     avatar_url: meta?.avatar_url || ''
//                 });
//             }
//             setLoading(false);
//         };
//         fetchUser();
//     }, []);

//     const handleUpdate = async () => {
//         setLoading(true);
//         try {
//             // BEST PRACTICE: Mengupdate metadata user secara langsung
//             const { error } = await supabase.auth.updateUser({
//                 data: {
//                     full_name: profile.full_name,
//                     username: profile.username,
//                     phone: profile.phone,
//                     bio: profile.bio,
//                     // avatar_url diupdate terpisah saat upload foto atau bisa di sini juga
//                 }
//             });

//             if (error) throw error;
//             alert('Profil berhasil diperbarui di Cloud!');
//         } catch (error: any) {
//             alert(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Fungsi Upload Avatar yang langsung update Metadata
//     const uploadAvatar = async (event: any) => {
//         try {
//             setUploading(true);
//             const file = event.target.files[0];
//             const fileExt = file.name.split('.').pop();
//             const fileName = `${Math.random()}.${fileExt}`;
//             const filePath = `avatars/${fileName}`;

//             // 1. Upload ke Storage
//             await supabase.storage.from('avatars').upload(filePath, file);

//             // 2. Dapatkan URL Publik
//             const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);

//             // 3. Update Metadata User dengan URL baru
//             await supabase.auth.updateUser({
//                 data: { avatar_url: publicUrl }
//             });

//             setProfile(prev => ({ ...prev, avatar_url: publicUrl }));
//             alert('Foto kerenmu sudah terpasang!');
//         } catch (error: any) {
//             alert('Gagal upload: ' + error.message);
//         } finally {
//             setUploading(false);
//         }
//     };

//     if (loading && !profile.email) return <div className="p-10 text-center font-bold text-[#242D13]">MENYIAPKAN DATA...</div>;

//     return (
//         <div className="max-w-5xl mx-auto space-y-10 pb-10">
//             {/* UI Profile kamu yang elegan tetap di sini */}
//             <header>
//                 <h1 className="text-4xl font-extrabold text-[#242D13]">Profil <span className="text-[#242D13]/30 font-light">Earthsaver</span></h1>
//             </header>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 {/* Bagian Kiri: Avatar */}
//                 <div className="bg-white p-10 rounded-[3rem] shadow-xl flex flex-col items-center border border-gray-100">
//                     <div className="relative">
//                         <div className="w-40 h-40 bg-[#242D13] rounded-full overflow-hidden border-[6px] border-[#F5F5F0]">
//                             {profile.avatar_url ? (
//                                 <img src={profile.avatar_url} className="w-full h-full object-cover" alt="Profile" />
//                             ) : (
//                                 <div className="w-full h-full flex items-center justify-center text-white text-5xl font-bold">
//                                     {profile.full_name?.charAt(0) || profile.email?.charAt(0).toUpperCase()}
//                                 </div>
//                             )}
//                         </div>
//                         <label className="absolute bottom-1 right-1 bg-[#242D13] text-white p-3 rounded-full cursor-pointer hover:scale-110 transition-all shadow-lg border-2 border-white">
//                             <input type="file" className="hidden" accept="image/*" onChange={uploadAvatar} disabled={uploading} />
//                             {uploading ? '...' : '📷'}
//                         </label>
//                     </div>
//                     <h2 className="mt-6 text-2xl font-bold">{profile.full_name || 'Adventurer'}</h2>
//                     <p className="text-gray-400">@{profile.username || 'username'}</p>
//                 </div>

//                 {/* Bagian Kanan: Form */}
//                 <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="space-y-2">
//                             <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Username</label>
//                             <input type="text" value={profile.username} onChange={e => setProfile({...profile, username: e.target.value})} className="w-full p-4 rounded-2xl bg-[#F5F5F0] outline-none focus:ring-2 focus:ring-[#242D13]" />
//                         </div>
//                         <div className="space-y-2">
//                             <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Full Name</label>
//                             <input type="text" value={profile.full_name} onChange={e => setProfile({...profile, full_name: e.target.value})} className="w-full p-4 rounded-2xl bg-[#F5F5F0] outline-none focus:ring-2 focus:ring-[#242D13]" />
//                         </div>
//                         <div className="space-y-2">
//                             <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Phone</label>
//                             <input type="text" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} className="w-full p-4 rounded-2xl bg-[#F5F5F0] outline-none focus:ring-2 focus:ring-[#242D13]" />
//                         </div>
//                         <div className="space-y-2 text-gray-400">
//                             <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Email (Static)</label>
//                             <div className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 italic">{profile.email}</div>
//                         </div>
//                         <div className="space-y-2 md:col-span-2">
//                             <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Bio</label>
//                             <textarea value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} className="w-full p-4 rounded-2xl bg-[#F5F5F0] outline-none focus:ring-2 focus:ring-[#242D13] h-24 resize-none" />
//                         </div>
//                     </div>
//                     <button onClick={handleUpdate} disabled={loading} className="mt-8 w-full bg-[#242D13] text-white py-4 rounded-full font-bold hover:bg-[#2c3818] transition-all shadow-lg">
//                         {loading ? 'SAVING...' : 'SAVE PROFILE'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }