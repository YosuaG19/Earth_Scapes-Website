"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff } from "lucide-react";

const getPasswordCriteria = (password) => {
  return [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "At least one uppercase letter", met: /[A-Z]/.test(password) },
    { label: "At least one lowercase letter", met: /[a-z]/.test(password) },
    { label: "At least one digit", met: /\d/.test(password) },
    { label: "At least one special character", met: /[^A-Za-z0-9]/.test(password) },
  ];
};

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  const originalOverflowRef = useRef("");

  const supabase = createClient();

  useEffect(() => {
    setIsClient(true);
    const originalBodyOverflow = document.body.style.overflow;
    originalOverflowRef.current = originalBodyOverflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, []);

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Invalid email format";
    }

    const passwordCriteria = getPasswordCriteria(formData.password);
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordCriteria.every((c) => c.met)) {
      newErrors.password = "Must meet all security requirements";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
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
      const { error: authError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: { full_name: formData.name.trim() },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (authError) throw authError;
      router.push("/signup-success");

    } catch (err) {
      let friendlyMessage = err.message;
      if (err.message.includes("already registered")) {
        friendlyMessage = "Email ini sudah terdaftar. Silakan login.";
      }
      setSubmitError(friendlyMessage);
      setIsLoading(false);
    }
  };

  if (!isClient) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center p-0" style={{ margin: 0, padding: 0 }}>
        {/* Card container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row w-[80vw] max-w-200 h-[80vh] max-h-screen mx-auto relative z-10">
          
          {/* Left Side */}
          <div
            className="h-48 md:h-auto w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-center relative overflow-hidden"
            style={{
              backgroundImage: "url(/login.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "300px",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-br from-emerald-900/80 to-teal-900/70"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-lg md:text-xl font-bold text-white mb-2">Welcome to EarthScape</h2>
              <div className="text-white/90 text-xs mb-4">Join our community of nature enthusiasts</div>
              <div className="mt-4 space-y-2 text-left inline-block">
                {["Explore natural wonders", "Connect with nature lovers", "Share your adventures"].map((text, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center mr-2">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-white text-xs">{text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-white/30 text-center">
                <div className="text-white/90 text-xs italic">&quot;The clearest way into the Universe is through a forest wilderness.&quot;</div>
                <div className="text-white/70 text-[9px] mt-1">- John Muir</div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 bg-[#242D13] p-4 md:p-5 flex flex-col justify-center overflow-y-auto">
            <div className="text-center mb-3">
              <h1 className="text-lg md:text-xl text-[#F5ECD5] mb-1">EarthScape</h1>
              <div className="text-[#F5ECD5]/90 text-xs">Create Your Account</div>
            </div>

            {submitError && (
              <div className="mb-2 p-2 bg-red-900/30 border border-red-700 rounded-lg text-red-200 text-xs">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-2">
              {/* Name Field */}
              <div className="flex flex-col">
                <label className="text-xs text-[#F5ECD5] mb-1">Full Name :</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`text-gray-900 bg-[#FFFFE3] p-1.5 rounded-lg h-8 text-xs focus:outline-none focus:ring-1 focus:ring-[#F5ECD5]/50 ${errors.name ? "border border-red-500" : ""}`}
                  placeholder="Enter your full name"
                  disabled={isLoading}
                />
                {errors.name && <div className="mt-0.5 text-[10px] text-red-300">{errors.name}</div>}
              </div>

              {/* Email Field */}
              <div className="flex flex-col">
                <label className="text-xs text-[#F5ECD5] mb-1">Email Address :</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`text-gray-900 bg-[#FFFFE3] p-1.5 rounded-lg h-8 text-xs focus:outline-none focus:ring-1 focus:ring-[#F5ECD5]/50 ${errors.email ? "border border-red-500" : ""}`}
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
                {errors.email && <div className="mt-0.5 text-[10px] text-red-300">{errors.email}</div>}
              </div>

              {/* Password Field */}
              <div className="flex flex-col relative">
                <label className="text-xs text-[#F5ECD5] mb-1">Password :</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full text-gray-900 bg-[#FFFFE3] p-1.5 pr-10 rounded-lg h-8 text-xs focus:outline-none ${errors.password ? "border border-red-500" : ""}`}
                    placeholder="Create your password"
                    disabled={isLoading}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Gimmick Criteria */}
                <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 border-t border-[#F5ECD5]/10 pt-2">
                  {getPasswordCriteria(formData.password).map((criterion, index) => (
                    <div key={index} className={`flex items-center text-[9px] sm:text-[10px] ${criterion.met ? "text-green-400" : "text-[#F5ECD5]/40"}`}>
                      <span className={`mr-1.5 w-3 h-3 flex items-center justify-center rounded-full border ${criterion.met ? "border-green-400 bg-green-400/20" : "border-[#F5ECD5]/20"}`}>
                        {criterion.met ? "✓" : ""}
                      </span>
                      {criterion.label}
                    </div>
                  ))}
                </div>
                {errors.password && <div className="mt-1 text-[10px] text-red-300">{errors.password}</div>}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col relative mt-3">
                <label className="text-xs text-[#F5ECD5] mb-1">Confirm Password :</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full text-black bg-[#FFFFE3] p-1.5 pr-10 rounded-lg h-8 text-xs focus:outline-none ${errors.confirmPassword ? "border border-red-500" : ""}`}
                    placeholder="Repeat your password"
                    disabled={isLoading}
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {/* Matching Gimmick */}
                {formData.confirmPassword && (
                  <div className={`mt-1.5 text-[10px] ${formData.password === formData.confirmPassword ? "text-green-400" : "text-red-300"}`}>
                    {formData.password === formData.confirmPassword ? "✓ Passwords match" : "○ Passwords do not match"}
                  </div>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start space-x-1 pt-1">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-0.5 h-3 w-3 rounded text-[#626F47]"
                  disabled={isLoading}
                />
                <label className="text-[#F5ECD5] text-[10px] leading-tight">
                  I agree to the{" "}
                  <Link href="/terms" target="_blank" rel="noopener noreferrer" className="underline">Terms</Link> and{" "}
                  <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="underline">Privacy Policy</Link>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col w-full pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="text-[#636F47] text-xs font-medium bg-[#FFFFE3] p-1.5 rounded-lg h-8 hover:bg-[#FFFFE3]/90 disabled:opacity-50 transition flex items-center justify-center"
                >
                  {isLoading ? "Creating..." : "Sign Up"}
                </button>
              </div>
            </form>

            <div className="mt-3 text-center text-[#F5ECD5] text-[10px]">
              Already have an account?{" "}
              <Link className="underline" href="/signin">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}