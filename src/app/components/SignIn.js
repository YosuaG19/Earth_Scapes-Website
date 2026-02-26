"use client";

import Link from "next/link";
import Image from "next/image";
import bg_SignIn from "../../../public/login.png";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState({
    google: false,
    apple: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const supabase = createClient();

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "auth_failed") {
      setError("Authentication failed. Please try again.");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!email.trim() || !password) {
        throw new Error("Email and password are required");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        throw new Error("Please enter a valid email address");
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) throw error;

      if (data.user) {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1000);
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.message.includes("Invalid login credentials")) {
        setError("Invalid email or password.");
      } else if (error.message.includes("rate limit")) {
        setError("Too many attempts. Please try again later.");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // const handleOAuthLogin = async (provider) => {
  //   setOauthLoading((prev) => ({ ...prev, [provider]: true }));
  //   setError("");
  //   try {
  //     const { error } = await supabase.auth.signInWithOAuth({
  //       provider: provider,
  //       options: {
  //         redirectTo: `${window.location.origin}/auth/callback?next=/`,
  //       },
  //     });
  //     if (error) throw error;
  //   } catch (error) {
  //     setError(`Failed to login with ${provider}`);
  //     setOauthLoading((prev) => ({ ...prev, [provider]: false }));
  //   }
  // };

  const handleOAuthLogin = async (provider) => {
    setOauthLoading((prev) => ({ ...prev, [provider]: true }));
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          // Tambahkan queryParams di sini
          queryParams: {
            prompt: 'select_account',
            access_type: 'offline',
          },
          redirectTo: `${window.location.origin}/auth/callback?next=/`,
        },
      });
      if (error) throw error;
    } catch (error) {
      setError(`Failed to login with ${provider}`);
      setOauthLoading((prev) => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <div className="bg-white w-[70vw] h-[80vh] rounded-2xl shadow-xl overflow-hidden grid grid-cols-2">
      {/* Left Side - Image */}
      <div className="h-full w-full relative overflow-hidden">
        <div className="absolute h-full w-full bg-black opacity-30 z-10"></div>
        <Image
          className="absolute -right-31.25 min-h-full min-w-[200%] z-1 object-cover"
          src={bg_SignIn}
          alt="Background EarthScape"
          priority
        />
      </div>

      {/* Right Side - Form */}
      <div className="h-full w-full bg-[#242D13] flex flex-col justify-center items-center gap-[1.1rem] px-8">
        <h1 className="text-3xl text-[#fffff3] font-bold">EarthScape</h1>

        {error && (
          <div className="w-full max-w-md bg-red-500/20 border border-red-500 text-red-100 px-4 py-2 rounded text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="w-full max-w-md bg-green-500/20 border border-green-500 text-green-100 px-4 py-2 rounded text-sm">
            {success}
          </div>
        )}

        {/* OAuth Buttons */}
        <div className="w-80 max-w-md flex gap-3">
          <button
            type="button"
            onClick={() => handleOAuthLogin("google")}
            disabled={oauthLoading.google || loading}
            className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm border border-gray-300"
          >
            {oauthLoading.google ? (
              "..."
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Google</span>
              </>
            )}
          </button>
        </div>

        <div className="w-full max-w-md flex items-center my-1">
          <div className="grow border-t border-gray-600"></div>
          <span className="mx-4 text-[#fffff3] text-xs">OR</span>
          <div className="grow border-t border-gray-600"></div>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <input
            placeholder="Email Address"
            className="w-full text-[#626F47] bg-[#fffff3] rounded-lg h-10 px-4 focus:outline-none focus:ring-2 focus:ring-[#fffff3]/50 text-sm"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <div className="flex flex-col gap-[.2rem] relative">
            <div className="relative">
              <input
                placeholder="Password"
                className="w-full text-[#626F47] bg-[#fffff3] rounded-lg h-10 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#fffff3]/50 text-sm"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#626F47]/60 hover:text-[#626F47]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <Link
              className="underline underline-offset-2 text-[#fffff3] text-[11px] hover:text-[#fffff3]/80 transition-colors self-end mt-1"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            className="w-full text-[#636F47] text-[16px] font-bold bg-[#fffff3] rounded-lg h-11 hover:bg-[#fffff3]/90 transition-colors disabled:opacity-50 flex items-center justify-center"
            type="submit"
            disabled={loading || !email || !password}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-[#fffff3] text-[13px] mt-2">
          <span>
            Don't have an account?{" "}
            <Link className="underline font-bold" href="/signup">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}