import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Eye, Database, Lock } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#F5ECD5] text-[#3D4432] p-6 md:p-12 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-[#626F47] rounded-2xl p-8 mb-8 text-[#F5ECD5] shadow-lg">
          <div className="flex items-center mb-4">
            <ShieldCheck size={32} className="mr-3" />
            <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
          </div>
          <p className="opacity-90 italic">"An Escape Give Back to the Earth"</p>
          <p className="text-xs mt-4 opacity-70 text-[#FFFFE3]">Last Updated: February 14, 2026</p>
        </div>

        {/* Content */}
        <div className="bg-[#FFFFE3] rounded-2xl p-8 shadow-md border border-[#626F47]/20 space-y-8">
          
          <section>
            <div className="flex items-center mb-3">
              <Database size={20} className="text-[#626F47] mr-2" />
              <h2 className="text-xl font-bold text-[#626F47]">1. Data Collection</h2>
            </div>
            <p className="text-sm leading-relaxed text-[#3D4432]/80">
              At EarthScapes, we value your trust. We collect basic information such as your <strong>name</strong> and <strong>email address</strong> when you register. This is essential for creating your profile and ensuring your environmental contributions are tracked correctly.
            </p>
          </section>

          <section>
            <div className="flex items-center mb-3">
              <Eye size={20} className="text-[#626F47] mr-2" />
              <h2 className="text-xl font-bold text-[#626F47]">2. How We Use Data</h2>
            </div>
            <p className="text-sm leading-relaxed text-[#3D4432]/80">
              Your data is used to personalize your experience. We do not sell, rent, or trade your personal information to third parties. Every byte of data stored is meant to improve our mission in "An Escape Give Back to the Earth."
            </p>
          </section>

          <section>
            <div className="flex items-center mb-3">
              <Lock size={20} className="text-[#626F47] mr-2" />
              <h2 className="text-xl font-bold text-[#626F47]">3. Data Security</h2>
            </div>
            <p className="text-sm leading-relaxed text-[#3D4432]/80">
              We use <strong>Supabase</strong> (Enterprise-grade security) to handle your authentication and database. Your passwords are encrypted and never stored in plain text. We also use <strong>Mailtrap</strong> for secure email sandboxing during our development phase.
            </p>
          </section>

          <section>
            <div className="flex items-center mb-3">
              <ShieldCheck size={20} className="text-[#626F47] mr-2" />
              <h2 className="text-xl font-bold text-[#626F47]">4. Cookies & Tracking</h2>
            </div>
            <p className="text-sm leading-relaxed text-[#3D4432]/80">
              EarthScapes uses minimal cookies to keep you logged in and to remember your preferences. These are "functional cookies" and do not track your activity outside our platform.
            </p>
          </section>

          <div className="pt-6 border-t border-[#626F47]/10 text-center">
            <p className="text-[10px] text-[#626F47]/60">
              Concerned about your privacy? We're here to help at privacy@earthscapes.com
            </p>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center mt-8 text-xs text-[#626F47]/50">
          © 2026 EarthScapes Project. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;