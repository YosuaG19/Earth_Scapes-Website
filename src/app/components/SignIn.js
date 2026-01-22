"use client";

import Link from "next/link";
import Image from "next/image";
import bg_SignIn from "../../../public/login.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState({
    google: false,
    apple: false
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Initialize Supabase client
  const supabase = createClient();

  // Handle Email/Password Login - SIMPLE VERSION
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate inputs
      if (!email.trim() || !password) {
        throw new Error("Email dan password harus diisi");
      }

      // Sign in dengan email dan password
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Login berhasil, langsung redirect
        setSuccess("Login berhasil! Mengalihkan...");
        
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1000);
      }
    } catch (error) {
      console.error("Login error:", error);
      
      // Handle error messages yang simple
      if (error.message.includes("Invalid login credentials")) {
        setError("Email atau password salah. Silakan coba lagi.");
      } else if (error.message.includes("Email rate limit exceeded")) {
        setError("Terlalu banyak percobaan login. Silakan coba beberapa saat lagi.");
      } else if (error.message.includes("Network error")) {
        setError("Koneksi jaringan bermasalah. Silakan coba lagi.");
      } else {
        setError("Terjadi kesalahan saat login: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle OAuth Login (Google & Apple)
  const handleOAuthLogin = async (provider) => {
    setOauthLoading(prev => ({ ...prev, [provider]: true }));
    setError("");
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (error) {
        throw error;
      }

      // Redirect akan dilakukan otomatis oleh Supabase
      
    } catch (error) {
      console.error(`${provider} OAuth error:`, error);
      setError(`Gagal login dengan ${provider === 'google' ? 'Google' : 'Apple'}`);
      setOauthLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="bg-white w-[70vw] h-[80vh] rounded-2xl shadow-xl/30 overflow-hidden grid grid-cols-2">
          {/* Left Side - Image */}
          <div className="h-full w-full relative overflow-hidden">
            <div className="absolute h-full w-full bg-black opacity-30 z-10"></div>
            <Image 
              className="absolute right-[-125] min-h-full min-w-[200%] z-1" 
              src={bg_SignIn} 
              alt="Background EarthScape"
              priority
            />
          </div>
          
          {/* Right Side - Form */}
          <div className="h-full w-full bg-[#242D13] flex flex-col justify-center items-center gap-[1.1rem] px-8">
            <h1 className="text-3xl text-[#fffff3]">EarthScape</h1>

            {/* Error Message */}
            {error && (
              <div className="w-full max-w-md">
                <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-2 rounded text-sm">
                  {error}
                </div>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="w-full max-w-md">
                <div className="bg-green-500/20 border border-green-500 text-green-100 px-4 py-2 rounded text-sm">
                  {success}
                </div>
              </div>
            )}

            {/* OAuth Buttons - Google & Apple SEJAJAR */}
            <div className="w-80 max-w-md">
              <div className="flex gap-3">
                {/* Google Login Button */}
                <button
                  type="button"
                  onClick={() => handleOAuthLogin('google')}
                  disabled={oauthLoading.google || loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-700 p-3 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300"
                >
                  {oauthLoading.google ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="text-sm">Google</span>
                    </>
                  )}
                </button>

                {/* Apple Login Button */}
                <button
                  type="button"
                  onClick={() => handleOAuthLogin('apple')}
                  disabled={oauthLoading.apple || loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-black text-white p-3 rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {oauthLoading.apple ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.94 5.19A4.38 4.38 0 0 0 16 2a4.44 4.44 0 0 0-3 1.52 4.17 4.17 0 0 0-1 3.09 3.69 3.69 0 0 0 2.94-1.42zm2.52 7.44a4.51 4.51 0 0 1 2.16-3.81 4.66 4.66 0 0 0-3.66-2c-1.56-.16-3 .91-3.83.91s-2-.89-3.3-.87a4.92 4.92 0 0 0-4.14 2.53C2.93 12.45 4.24 17 6 19.47c.8 1.21 1.8 2.58 3.12 2.53s1.75-.76 3.28-.76 2 .76 3.3.73 2.22-1.24 3.06-2.45a11 11 0 0 0 1.38-2.85a4.41 4.41 0 0 1-2.68-4.04z"/>
                      </svg>
                      <span className="text-sm">Apple</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full max-w-md flex items-center my-2">
              <div className="grow border-t border-gray-600"></div>
              <span className="mx-4 text-[#fffff3] text-sm">OR</span>
              <div className="grow border-t border-gray-600"></div>
            </div>

            {/* Email/Password Form */}
            <form 
              onSubmit={handleSubmit}
              className="w-full max-w-md space-y-4"
            >
              {/* Email Input */}
              <div className="flex flex-col">
                <input 
                  placeholder="Email Address" 
                  className="text-[#626F47] bg-[#fffff3] p-[.3rem] rounded-lg h-10 px-4 focus:outline-none focus:ring-2 focus:ring-[#fffff3]/50" 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  disabled={loading}
                />
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-[.2rem]">
                <input 
                  placeholder="Password" 
                  className="text-[#626F47] bg-[#fffff3] p-[.3rem] rounded-lg h-10 px-4 focus:outline-none focus:ring-2 focus:ring-[#fffff3]/50" 
                  type="password"
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  autoComplete="current-password"
                />
                <a 
                  className="underline underline-offset-2 text-[#fffff3] text-[11px] hover:text-[#fffff3]/80 transition-colors" 
                  href="/forgot-password"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button 
                  className="w-full text-[#636F47] text-[18px] font-medium bg-[#fffff3] p-[.3rem] rounded-lg h-11.25 hover:bg-[#fffff3]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" 
                  type="submit"
                  disabled={loading || !email || !password}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </>
                  ) : (
                    "Sign In with Email"
                  )}
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="text-[#fffff3] text-[13px] mt-4">
              <span>
                Don't have account?{" "}
                <Link 
                  className="underline underline-offset-2 hover:text-[#fffff3]/80 transition-colors font-medium" 
                  href="./signup"
                >
                  Sign Up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}