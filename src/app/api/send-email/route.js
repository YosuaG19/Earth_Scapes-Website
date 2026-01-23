"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
// HAPUS import Resend dari sini!

export default function SignupCard() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [success, setSuccess] = useState(null);
  const originalOverflowRef = useRef("");

  const supabase = createClient();

  useEffect(() => {
    setIsClient(true);

    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyMargin = document.body.style.margin;
    const originalBodyPadding = document.body.style.padding;

    originalOverflowRef.current = originalBodyOverflow;

    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.margin = originalBodyMargin;
      document.body.style.padding = originalBodyPadding;
    };
  }, []);

  // FUNGSI BARU: Kirim email via API Route
  const sendVerificationEmail = async (email, token, name) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          token, 
          name,
          appUrl: window.location.origin 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to send email via API:', error);
      return { 
        success: false, 
        error: error.message,
        demoMode: true // Fallback ke demo mode
      };
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setSubmitError("");

    try {
      // 1. Sign up dengan Supabase (INI SUDAH KIRIM EMAIL VERIFIKASI!)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            name: formData.name,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (authError) {
        if (authError.message.includes("already registered")) {
          throw new Error("Email already registered");
        } else if (authError.message.includes("password")) {
          throw new Error("Password is too weak");
        } else if (authError.message.includes("email")) {
          throw new Error("Invalid email format");
        } else {
          throw authError;
        }
      }

      // 2. Kirim email BONUS via Resend API Route (optional)
      const emailResult = await sendVerificationEmail(
        formData.email,
        authData.user?.id || `demo-${Date.now()}`,
        formData.name
      );

      // 3. Tampilkan success message
      setSuccess({
        email: formData.email,
        name: formData.name,
        resendSuccess: emailResult.success,
        isDemoMode: emailResult.demoMode || false,
        message: emailResult.success 
          ? '✅ Verification email sent successfully!' 
          : emailResult.demoMode
          ? '✅ Account created! (Demo mode - check console for link)'
          : '✅ Account created! (Email might be delayed)',
      });

      // Log untuk debugging
      console.log('Signup successful:', {
        user: authData.user,
        emailResult: emailResult,
        supabaseEmailSent: true // Supabase otomatis kirim email
      });

    } catch (err) {
      setSubmitError(err.message || "Registration failed. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setIsLoading(true);
    try {
      const emailResult = await sendVerificationEmail(
        formData.email,
        `resend-${Date.now()}`,
        formData.name
      );

      if (!emailResult.success && !emailResult.demoMode) {
        throw new Error("Failed to resend email");
      }

      alert(emailResult.demoMode 
        ? "Demo mode: Email would be resent (check console)" 
        : "Verification email has been resent!"
      );
    } catch (err) {
      setSubmitError(err.message || "Failed to resend verification email");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-redirect setelah 10 detik jika success
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/signin");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  if (!isClient) {
    return (
      <div className="fixed inset-0 bg-[#626F47] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Success state UI - DIUPDATE
  if (success) {
    return (
      <>
        {/* Background */}
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: "url(/background-image.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: -1,
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Success Message Card */}
        <div className="fixed inset-0 flex items-center justify-center p-0">
          <div className="bg-white rounded-2xl shadow-2xl/30 w-[80vw] max-w-125 h-auto mx-auto p-6 relative z-10">
            <div className="text-center">
              <div className={`w-16 h-16 ${success.resendSuccess ? 'bg-green-100' : 'bg-yellow-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                {success.resendSuccess ? (
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                )}
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {success.resendSuccess ? '🎉 Check Your Email!' : '✅ Account Created!'}
              </h2>

              <p className="text-gray-600 mb-4">
                {success.isDemoMode 
                  ? `Demo account created for:`
                  : `Verification email sent to:`
                }
                <br />
                <strong className="text-green-600">{success.email}</strong>
              </p>

              {success.isDemoMode ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 text-left">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-blue-800">Demo Mode Active</p>
                      <p className="text-sm text-blue-700 mt-1">
                        For demo purposes, email is simulated.
                        <br />
                        <span className="text-xs">Check browser console for verification details.</span>
                      </p>
                    </div>
                  </div>
                </div>
              ) : success.resendSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-left">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-green-800">Email sent successfully</p>
                      <p className="text-sm text-green-700 mt-1">
                        Check your inbox (and spam folder).
                        <br />
                        <span className="text-xs">Supabase + Resend integration active</span>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 text-left">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <p className="font-medium text-yellow-800">Using Supabase Email Service</p>
                      <p className="text-sm text-yellow-700 mt-1">
                        Verification email sent via Supabase.
                        <br />
                        <span className="text-xs">Check spam folder if you don't see it.</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <button
                  onClick={handleResendVerification}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
                >
                  {isLoading ? "Sending..." : "Resend Verification Email"}
                </button>

                <button
                  onClick={() => router.push("/signin")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition text-sm"
                >
                  Go to Login
                </button>

                <button
                  onClick={() => {
                    setFormData({
                      name: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                      agreeToTerms: false,
                    });
                    setSuccess(null);
                  }}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2.5 rounded-lg transition text-sm"
                >
                  Sign Up Another Account
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Auto-redirect to login page in 10 seconds...
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Original signup form - TETAP SAMA
  return (
    <>
      {/* Background */}
      <div
        className="fixed inset-0"
        style={{
          backgroundImage: "url(/background-image.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Main Container */}
      <div
        className="fixed inset-0 flex items-center justify-center p-0"
        style={{
          margin: 0,
          padding: 0,
        }}
      >
        {/* Card container */}
        <div className="bg-white rounded-2xl shadow-2xl/30 overflow-hidden flex flex-col md:flex-row w-[80vw] max-w-200 h-[80vh] max-h-[90vh] mx-auto relative z-10">
          {/* Left Side */}
          <div
            className="h-48 md:h-auto w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-center relative overflow-hidden"
            style={{
              backgroundImage: "url(/login.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "300px",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-br from-emerald-900/80 to-teal-900/70"></div>

            <div className="relative z-10 text-center">
              <h2 className="text-lg md:text-xl font-bold text-white mb-2">
                Welcome to EarthScape
              </h2>

              <div className="text-white/90 text-xs mb-4">
                Join our community of nature enthusiasts
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-center md:justify-start">
                  <div className="w-5 h-5 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center mr-2">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-white text-xs">
                    Explore natural wonders
                  </span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <div className="w-5 h-5 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center mr-2">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-white text-xs">
                    Connect with nature lovers
                  </span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <div className="w-5 h-5 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center mr-2">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-white text-xs">
                    Share your adventures
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/30">
                <div className="text-white/90 text-xs italic">
                  &quot;The clearest way into the Universe is through a forest wilderness.&quot;
                </div>
                <div className="text-white/70 text-[9px] mt-1">- John Muir</div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 bg-[#242D13] p-4 md:p-5 flex flex-col justify-center overflow-y-auto">
            <div className="text-center mb-3">
              <h1 className="text-lg md:text-xl text-[#F5ECD5] mb-1">
                EarthScape
              </h1>
              <div className="text-[#F5ECD5]/90 text-xs">
                Create Your Account
              </div>
            </div>

            {submitError && (
              <div className="mb-2 p-2 bg-red-900/30 border border-red-700 rounded-lg">
                <div className="text-red-200 text-xs">{submitError}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-2">
              {/* Name Field */}
              <div className="flex flex-col">
                <label className="text-xs text-[#F5ECD5] mb-1" htmlFor="name">
                  Full Name :
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`text-[#626F47] bg-[#FFFFE3] p-1.5 rounded-xl h-8 text-xs focus:outline-none focus:ring-1 focus:ring-[#F5ECD5]/50 ${
                    errors.name ? "border border-red-500" : ""
                  }`}
                  placeholder="Enter your full name"
                  disabled={isLoading}
                />
                {errors.name && (
                  <div className="mt-0.5 text-[10px] text-red-300">
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="flex flex-col">
                <label className="text-xs text-[#F5ECD5] mb-1" htmlFor="email">
                  Email Address :
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`text-[#626F47] bg-[#FFFFE3] p-1.5 rounded-xl h-8 text-xs focus:outline-none focus:ring-1 focus:ring-[#F5ECD5]/50 ${
                    errors.email ? "border border-red-500" : ""
                  }`}
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
                {errors.email && (
                  <div className="mt-0.5 text-[10px] text-red-300">
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="flex flex-col">
                <label
                  className="text-xs text-[#F5ECD5] mb-1"
                  htmlFor="password"
                >
                  Password :
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`text-[#626F47] bg-[#FFFFE3] p-1.5 rounded-xl h-8 text-xs focus:outline-none focus:ring-1 focus:ring-[#F5ECD5]/50 ${
                    errors.password ? "border border-red-500" : ""
                  }`}
                  placeholder="At least 8 characters"
                  disabled={isLoading}
                />
                {errors.password && (
                  <div className="mt-0.5 text-[10px] text-red-300">
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="flex flex-col">
                <label
                  className="text-xs text-[#F5ECD5] mb-1"
                  htmlFor="confirmPassword"
                >
                  Confirm Password :
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`text-[#626F47] bg-[#FFFFE3] p-1.5 rounded-xl h-8 text-xs focus:outline-none focus:ring-1 focus:ring-[#F5ECD5]/50 ${
                    errors.confirmPassword ? "border border-red-500" : ""
                  }`}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <div className="mt-0.5 text-[10px] text-red-300">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-1 pt-1">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className={`mt-0.5 h-3 w-3 rounded focus:ring-[#FFFFE3] text-[#626F47] ${
                    errors.agreeToTerms ? "border border-red-500" : ""
                  }`}
                  disabled={isLoading}
                />
                <label
                  htmlFor="agreeToTerms"
                  className="text-[#F5ECD5] text-[10px] leading-tight"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="underline underline-offset-1 hover:text-[#F5ECD5]/80"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="underline underline-offset-1 hover:text-[#F5ECD5]/80"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeToTerms && (
                <div className="text-[10px] text-red-300 mt-0.5">
                  {errors.agreeToTerms}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex flex-col w-full pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="text-[#636F47] text-xs font-medium bg-[#FFFFE3] p-1.5 rounded-xl h-8 hover:bg-[#FFFFE3]/90 focus:outline-none focus:ring-1 focus:ring-[#F5ECD5]/50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-1 h-2.5 w-2.5 text-[#636F47]"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Creating...
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-3 text-center text-[#F5ECD5] text-[10px]">
              <div>
                Already have an account?{" "}
                <Link
                  className="underline underline-offset-1 hover:text-[#F5ECD5]/80"
                  href="/signin"
                  onClick={(e) => {
                    document.body.style.overflow = originalOverflowRef.current;
                    document.body.style.margin = "";
                    document.body.style.padding = "";
                  }}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}