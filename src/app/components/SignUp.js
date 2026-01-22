'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import { createClient } from '@/lib/supabase/client'; // Tambahkan import ini

export default function SignupCard() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [success, setSuccess] = useState(false); // Tambahkan state untuk success
  const originalOverflowRef = useRef('');
  
  // Inisialisasi Supabase client
  const supabase = createClient();

  useEffect(() => {
    setIsClient(true);
    
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyMargin = document.body.style.margin;
    const originalBodyPadding = document.body.style.padding;
    
    originalOverflowRef.current = originalBodyOverflow;
    
    // Reset styles
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    
    // Cleanup function
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.margin = originalBodyMargin;
      document.body.style.padding = originalBodyPadding;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
    setSubmitError('');
    
    try {
      // Gunakan Supabase Auth langsung
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            name: formData.name,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        // Handle specific Supabase errors
        if (error.message.includes('already registered')) {
          throw new Error('Email already registered');
        } else if (error.message.includes('password')) {
          throw new Error('Password is too weak');
        } else if (error.message.includes('email')) {
          throw new Error('Invalid email format');
        } else {
          throw error;
        }
      }
      
      // Success - show verification message
      setSuccess(true);
      
    } catch (err) {
      setSubmitError(err.message || 'Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = async (provider) => {
    try {
      let authOptions = {
        redirectTo: `${window.location.origin}/auth/callback`
      };
      
      if (provider === 'Google') {
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: authOptions
        });
      } else if (provider === 'Apple') {
        // Apple might require additional setup
        alert('Apple signup requires additional configuration');
        // Uncomment when Apple OAuth is configured
        // await supabase.auth.signInWithOAuth({
        //   provider: 'apple',
        //   options: authOptions
        // });
      }
    } catch (error) {
      console.error(`${provider} signup error:`, error);
      setSubmitError(`Failed to sign up with ${provider}`);
    }
  };

  const handleResendVerification = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: formData.email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
      
      setSubmitError('');
      alert('Verification email has been resent!');
    } catch (err) {
      setSubmitError(err.message || 'Failed to resend verification email');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) {
    return (
      <div className="fixed inset-0 bg-[#626F47] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Success state UI
  if (success) {
    return (
      <>
        {/* Background */}
        <div 
          className="fixed inset-0"
          style={{
            backgroundImage: 'url(/background-image.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: -1,
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Success Message Card */}
        <div className="fixed inset-0 flex items-center justify-center p-0">
          <div className="bg-white rounded-[1rem] shadow-2xl/30 w-[80vw] max-w-[500px] h-auto mx-auto p-6 relative z-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg 
                  className="w-8 h-8 text-green-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Check Your Email!
              </h2>
              
              <p className="text-gray-600 mb-4">
                We've sent a verification link to:
                <br />
                <strong className="text-green-600">{formData.email}</strong>
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-left">
                <div className="flex items-start">
                  <svg 
                    className="w-4 h-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" 
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      Verification link expires in 1 hour!
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Check your inbox or spam folder and click the link to activate your account.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleResendVerification}
                disabled={isLoading}
                className="w-full mb-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
              >
                {isLoading ? 'Sending...' : 'Resend Verification Email'}
              </button>

              <button
                onClick={() => router.push('/login')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition text-sm"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Original signup form
  return (
    <>
      {/* Background */}
      <div 
        className="fixed inset-0"
        style={{
          backgroundImage: 'url(/background-image.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
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
        <div className="bg-white rounded-[1rem] shadow-2xl/30 overflow-hidden flex flex-col md:flex-row w-[80vw] max-w-[800px] h-[80vh] max-h-[90vh] mx-auto relative z-10">
          
          {/* Left Side */}
          <div 
            className="h-48 md:h-auto w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-center relative overflow-hidden"
            style={{
              backgroundImage: 'url(/login.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minHeight: '300px',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 to-teal-900/70"></div>
            
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
                <div className="text-white/70 text-[9px] mt-1">
                  - John Muir
                </div>
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
                <div className="text-red-200 text-xs">
                  {submitError}
                </div>
              </div>
            )}

            {/* Social Signup Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                type="button"
                onClick={() => handleSocialSignup('Google')}
                disabled={isLoading}
                className="flex items-center justify-center px-2 py-1.5 border border-[#F5ECD5]/30 rounded-lg bg-[#F5ECD5]/10 text-[#F5ECD5] hover:bg-[#F5ECD5]/20 transition disabled:opacity-50 text-xs"
              >
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24">
                  <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              
              <button
                type="button"
                onClick={() => handleSocialSignup('Apple')}
                disabled={isLoading}
                className="flex items-center justify-center px-2 py-1.5 border border-[#F5ECD5]/30 rounded-[.5rem] bg-[#F5ECD5]/10 text-[#F5ECD5] hover:bg-[#F5ECD5]/20 transition disabled:opacity-50 text-xs"
              >
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.666-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.787-.94 1.324-2.245 1.171-3.54-1.133.052-2.518.754-3.334 1.701-.735.85-1.389 2.207-1.208 3.514 1.26.091 2.544-.584 3.371-1.675z" 
                    fill="#fff"/>
                </svg>
                Apple
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#F5ECD5]/30"></div>
              </div>
              <div className="relative flex justify-center text-[10px]">
                <span className="px-1 bg-[#626F47] text-[#F5ECD5]/70">
                  Or continue with email
                </span>
              </div>
            </div>

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
                  className={`text-[#626F47] bg-[#FFFFE3] p-1.5 rounded-[.5rem] h-8 text-xs focus:outline-none focus:ring-1 focus:ring-[#F5ECD5]/50 ${
                    errors.name ? 'border border-red-500' : ''
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
                  className={`text-[#626F47] bg-[#FFFFE3] p-1.5 rounded-[.5rem] h-8 text-xs focus:outline-none focus:ring-1 focus:ring-[#F5ECD5]/50 ${
                    errors.email ? 'border border-red-500' : ''
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
                <label className="text-xs text-[#F5ECD5] mb-1" htmlFor="password">
                  Password :
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`text-[#626F47] bg-[#FFFFE3] p-1.5 rounded-[.5rem] h-8 text-xs focus:outline-none focus:ring-1 focus:ring-[#F5ECD5]/50 ${
                    errors.password ? 'border border-red-500' : ''
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
                <label className="text-xs text-[#F5ECD5] mb-1" htmlFor="confirmPassword">
                  Confirm Password :
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`text-[#626F47] bg-[#FFFFE3] p-1.5 rounded-[.5rem] h-8 text-xs focus:outline-none focus:ring-1 focus:ring-[#F5ECD5]/50 ${
                    errors.confirmPassword ? 'border border-red-500' : ''
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
                    errors.agreeToTerms ? 'border border-red-500' : ''
                  }`}
                  disabled={isLoading}
                />
                <label htmlFor="agreeToTerms" className="text-[#F5ECD5] text-[10px] leading-tight">
                  I agree to the{' '}
                  <Link href="/terms" className="underline underline-offset-1 hover:text-[#F5ECD5]/80">
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="underline underline-offset-1 hover:text-[#F5ECD5]/80">
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
                  className="text-[#636F47] text-xs font-medium bg-[#FFFFE3] p-1.5 rounded-[.5rem] h-8 hover:bg-[#FFFFE3]/90 focus:outline-none focus:ring-1 focus:ring-[#F5ECD5]/50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-1 h-2.5 w-2.5 text-[#636F47]" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating...
                    </span>
                  ) : (
                    'Sign Up'
                  )}
                </button>
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-3 text-center text-[#F5ECD5] text-[10px]">
              <div>
                Already have an account?{' '}
                <Link 
                  className="underline underline-offset-1 hover:text-[#F5ECD5]/80" 
                  href="/signin"
                  onClick={(e) => {
                    document.body.style.overflow = originalOverflowRef.current;
                    document.body.style.margin = '';
                    document.body.style.padding = '';
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