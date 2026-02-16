import React from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle2, Trees } from 'lucide-react';

const SignupSuccess = () => {
  return (
    <div className="min-h-screen bg-[#F5ECD5] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-[#FFFFE3] rounded-3xl shadow-2xl border border-[#626F47]/20 overflow-hidden">
        
        {/* Top Decorative Banner */}
        <div className="bg-[#626F47] p-8 text-center relative">
          <div className="absolute top-4 left-4 opacity-20 text-[#F5ECD5]">
            <Trees size={40} />
          </div>
          <div className="bg-[#FFFFE3] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle2 size={48} className="text-[#626F47]" />
          </div>
          <h1 className="text-[#F5ECD5] text-2xl font-bold tracking-tight">Registration Sent!</h1>
          <p className="text-[#F5ECD5]/80 text-sm mt-1">"An Escape Give Back to the Earth"</p>
        </div>

        {/* Content */}
        <div className="p-10 text-center">
          <h2 className="text-[#3D4432] text-xl font-semibold mb-4">Check your inbox, Explorer!</h2>
          <p className="text-[#3D4432]/70 leading-relaxed mb-8">
            We've sent a verification link to your email. Please click the link to activate your account and start your journey with <strong>EarthScapes</strong>.
          </p>

          {/* Mail Icon Highlight */}
          <div className="flex items-center justify-center space-x-2 text-[#626F47] font-medium mb-10 bg-[#626F47]/5 py-3 rounded-xl border border-dashed border-[#626F47]/30">
            <Mail size={20} />
            <span>Check your Inbox</span>
          </div>

          <div className="space-y-4">
            <Link 
              href="/signin" 
              className="flex items-center justify-center w-full bg-[#626F47] text-[#F5ECD5] py-4 rounded-xl font-bold hover:bg-[#3D4432] transition-all shadow-md group"
            >
              Back To SignIn
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <p className="text-xs text-[#3D4432]/50 italic">
              Didn't receive the email? Check your spam folder or try signing up again.
            </p>
          </div>
        </div>

        {/* Footer Accent */}
        <div className="h-2 bg-[#626F47] w-full opacity-30"></div>
      </div>
    </div>
  );
};

export default SignupSuccess;