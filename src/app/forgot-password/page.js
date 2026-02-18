"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const supabase = createClient();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (resetError) {
      setError(resetError.message);
    } else {
      setMessage("Reset link has been sent to your email!");
    }
    setLoading(false);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#F5ECD5]">
      <div className="bg-[#242D13] p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-[#F5ECD5] mb-2">Reset Password</h1>
        <p className="text-[#F5ECD5]/70 text-sm mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-100 text-xs rounded-lg">{error}</div>}
        {message && <div className="mb-4 p-3 bg-green-500/20 border border-green-500 text-green-100 text-xs rounded-lg">{message}</div>}

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-[#FFFFE3] text-[#242D13] p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#626F47]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            disabled={loading}
            className="w-full bg-[#F5ECD5] text-[#242D13] font-bold py-3 rounded-lg hover:bg-white transition-all disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-[12px] text-[#F5ECD5]/50">
          Remember your password? <Link href="/signin" className="underline text-[#F5ECD5]">Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
}