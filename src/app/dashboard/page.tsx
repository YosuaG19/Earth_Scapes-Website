'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
// Import Ikon Modern
import { 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Camera, 
  AtSign, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';

export default function ProfilePage() {
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    
    const [profile, setProfile] = useState({
        full_name: '',
        username: '',
        email: '',
        phone: '',
        bio: '',
        avatar_url: ''
    });

    useEffect(() => {
        getProfile();
    }, []);

    async function getProfile() {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setProfile({
                    full_name: user.user_metadata?.full_name || '',
                    username: user.user_metadata?.username || '',
                    email: user.email || '',
                    phone: user.user_metadata?.phone || '',
                    bio: user.user_metadata?.bio || '',
                    avatar_url: user.user_metadata?.avatar_url || ''
                });
            }
        } finally {
            setLoading(false);
        }
    }

    async function uploadAvatar(event: any) {
        try {
            setUploading(true);
            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `avatars/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            setProfile(prev => ({ ...prev, avatar_url: publicUrl }));
            await supabase.auth.updateUser({
                data: { avatar_url: publicUrl }
            });

            alert('Foto profil diperbarui!');
        } catch (error: any) {
            alert('Gagal upload: ' + error.message);
        } finally {
            setUploading(false);
        }
    }

    async function updateProfile() {
        try {
            setLoading(true);
            const { error } = await supabase.auth.updateUser({
                data: {
                    full_name: profile.full_name,
                    username: profile.username,
                    phone: profile.phone,
                    bio: profile.bio,
                }
            });

            if (error) throw error;
            alert('Profil berhasil disimpan!');
        } catch (error: any) {
            alert('Gagal update: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading && !profile.email) {
        return (
            <div className="p-10 flex items-center gap-3 text-[#242D13] font-bold">
                <Loader2 className="animate-spin" /> Load Profile...
            </div>
        );
    }

    return (
        <div className="space-y-10">
            <header>
                <h1 className="text-4xl font-extrabold text-[#242D13] tracking-tight">
                    Your <span className="text-[#5a7527] font-light">Profile</span>
                </h1>
                <p className="text-gray-500 mt-2 font-medium">Informasi pribadi dan pengaturan identitas Earthsaver-mu.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* SISI KIRI: AVATAR CARD */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-gray-200/40 border border-gray-100 flex flex-col items-center relative overflow-hidden">
                        {/* Gimmick: Watermark Ikon di Background */}
                        <User className="absolute -top-10 -right-10 w-40 h-40 text-gray-50 opacity-[0.03] rotate-12" />
                        
                        <div className="relative group">
                            <div className="w-44 h-44 bg-[#242D13] rounded-full overflow-hidden flex items-center justify-center border-[6px] border-[#F5F5F0] shadow-inner transition-transform duration-500 group-hover:scale-105">
                                {profile.avatar_url ? (
                                    <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-6xl text-white font-bold">{profile.full_name?.charAt(0) || profile.email?.charAt(0).toUpperCase()}</span>
                                )}
                            </div>
                            <label className="absolute bottom-2 right-2 bg-[#242D13] text-white p-3 rounded-full shadow-xl cursor-pointer hover:scale-110 transition-all border-4 border-white flex items-center justify-center">
                                <input type="file" className="hidden" accept="image/*" onChange={uploadAvatar} disabled={uploading} />
                                {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
                            </label>
                        </div>
                        
                        <div className="mt-8 text-center">
                            <h2 className="text-2xl font-bold text-[#242D13] leading-tight">
                                {profile.full_name || (profile.email ? profile.email.split('@')[0] : 'Earthsaver')}
                            </h2>
                            <p className="text-gray-400 font-medium flex items-center justify-center gap-1">
                                <AtSign className="w-3 h-3" /> {profile.username || 'username'}
                            </p>
                            <div className="mt-4 flex items-center gap-2 px-4 py-1.5 bg-[#242D13]/5 text-[#242D13] text-[10px] font-black rounded-full uppercase tracking-widest border border-[#242D13]/10">
                                <CheckCircle2 className="w-3 h-3 text-[#242D13]" />
                                Active Earthsaver
                            </div>
                        </div>
                    </div>
                </div>

                {/* SISI KANAN: FORM EDIT */}
                <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-[2rem] flex items-center shadow-xl shadow-gray-200/40 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        {/* Username */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-black uppercase text-[#242D13]/40 ml-2 tracking-widest flex items-center gap-2">
                                <AtSign className="w-3 h-3" /> Username
                            </label>
                            <input 
                                type="text" 
                                value={profile.username}
                                onChange={(e) => setProfile({...profile, username: e.target.value})}
                                className="py-2 px-3 rounded-[.5rem] bg-[#F5F5F0] border-none focus:ring-2 focus:ring-[#242D13] outline-none font-medium text-[#242D13] transition-all"
                                placeholder="eksplorer_alam"
                            />
                        </div>

                        {/* Nama Lengkap */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-black uppercase text-[#242D13]/40 ml-2 tracking-widest flex items-center gap-2">
                                <User className="w-3 h-3" /> Full Name
                            </label>
                            <input 
                                type="text" 
                                value={profile.full_name}
                                onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                                className="py-2 px-3 rounded-[.5rem] bg-[#F5F5F0] border-none focus:ring-2 focus:ring-[#242D13] outline-none font-medium text-[#242D13] transition-all"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-black uppercase text-[#242D13]/40 ml-2 tracking-widest flex items-center gap-2">
                                <Mail className="w-3 h-3" /> Email
                            </label>
                            <input 
                                type="text" 
                                value={profile.email}
                                disabled
                                className="py-2 px-3 rounded-[.5rem] bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-100 outline-none font-medium"
                            />
                        </div>

                        {/* Telepon */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-black uppercase text-[#242D13]/40 ml-2 tracking-widest flex items-center gap-2">
                                <Phone className="w-3 h-3" /> Phone Number
                            </label>
                            <input 
                                type="text" 
                                value={profile.phone}
                                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                                className="py-2 px-3 rounded-[.5rem] bg-[#F5F5F0] border-none focus:ring-2 focus:ring-[#242D13] outline-none font-medium text-[#242D13] transition-all"
                                placeholder="+62..."
                            />
                        </div>

                        {/* Bio */}
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-[11px] font-black uppercase text-[#242D13]/40 ml-2 tracking-widest flex items-center gap-2">
                                <FileText className="w-3 h-3" /> Bio
                            </label>
                            <textarea 
                                rows={3}
                                value={profile.bio}
                                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                                className="py-2 px-3 rounded-[.5rem] bg-[#F5F5F0] border-none focus:ring-2 focus:ring-[#242D13] outline-none font-medium text-[#242D13] resize-none transition-all"
                                placeholder="Ceritakan petualanganmu..."
                            />
                        </div>

                        {/* Button Save*/}
                        <button
                                onClick={updateProfile}
                                disabled={loading}
                                className="col-span-2 w-[70%] border-2 border-[#242D13] m-auto bg-[#242D13] text-[#e8e8da] py-2 rounded-full font-bold shadow-xl hover:text-[#2c3818] hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Save Changes'}
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}