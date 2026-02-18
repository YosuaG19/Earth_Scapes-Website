import React from "react";
import Link from "next/link";
import { ArrowLeft, ScrollText, ShieldCheck, Leaf } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#F5ECD5] text-[#3D4432] p-6 md:p-12 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-[#626F47] rounded-2xl p-8 mb-8 text-[#F5ECD5] shadow-lg">
          <div className="flex items-center mb-4">
            <ScrollText size={32} className="mr-3" />
            <h1 className="text-3xl font-bold tracking-tight">
              Terms of Service
            </h1>
          </div>
          <p className="opacity-90 italic">
            "An Escape Give Back to the Earth"
          </p>
          <p className="text-xs mt-4 opacity-70 text-[#FFFFE3]">
            Last Updated: February 14, 2026
          </p>
        </div>

        {/* Content */}
        <div className="bg-[#FFFFE3] rounded-2xl p-8 shadow-md border border-[#626F47]/20 space-y-8">
          <section>
            <div className="flex items-center mb-3">
              <Leaf size={20} className="text-[#626F47] mr-2" />
              <h2 className="text-xl font-bold text-[#626F47]">
                1. Acceptance of Journey
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#3D4432]/80">
              By accessing and using EarthScapes, you acknowledge that you have
              read, understood, and agree to be bound by these terms. Our
              platform is dedicated to environmental awareness and sustainable
              exploration.
            </p>
          </section>

          <section>
            <div className="flex items-center mb-3">
              <ShieldCheck size={20} className="text-[#626F47] mr-2" />
              <h2 className="text-xl font-bold text-[#626F47]">
                2. User Accounts
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#3D4432]/80">
              To use EarthScapes, you must provide accurate information. You are
              responsible for maintaining the security of your account and your
              password (which we verify through secure channels). Any actions
              taken under your account are your responsibility.
            </p>
          </section>

          <section>
            <div className="flex items-center mb-3">
              <Leaf size={20} className="text-[#626F47] mr-2" />
              <h2 className="text-xl font-bold text-[#626F47]">
                3. Community Guidelines
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#3D4432]/80">
              EarthScapes is a sanctuary for nature lovers. You agree not to:
            </p>
            <ul className="list-disc ml-6 mt-2 text-sm space-y-1 text-[#3D4432]/80">
              <li>Upload harmful or misleading environmental data.</li>
              <li>Harass other members of the EarthScapes community.</li>
              <li>
                Attempt to disrupt the platform's ecological digital system.
              </li>
            </ul>
          </section>

          <section>
            <div className="flex items-center mb-3">
              <ShieldCheck size={20} className="text-[#626F47] mr-2" />
              <h2 className="text-xl font-bold text-[#626F47]">
                4. "An Escape Give Back" Policy
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#3D4432]/80">
              As part of our core values, we encourage users to engage in
              positive environmental impact. While the platform provides digital
              tools, the true "Escape" happens when our users contribute back to
              the earth in their daily lives.
            </p>
          </section>

          <div className="pt-6 border-top border-[#626F47]/10 text-center">
            <p className="text-[10px] text-[#626F47]/60">
              Questions about our Terms? Contact us at support@earthscapes.com
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

export default TermsOfService;
