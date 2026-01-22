"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token_hash = searchParams.get("token_hash");
  const supabase = createClient();

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token_hash) {
        setStatus("error");
        setMessage("Token tidak valid");
        return;
      }

      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: "email",
        });

        if (error) {
          throw error;
        }

        setStatus("success");
        setMessage("Email berhasil diverifikasi!");

        // Redirect ke home setelah 3 detik
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        setMessage(error.message || "Gagal memverifikasi email");

        // Redirect ke signin setelah 5 detik
        setTimeout(() => {
          router.push("/signin");
        }, 5000);
      }
    };

    verifyEmail();
  }, [token_hash, router, supabase]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verifikasi Email
          </h2>
        </div>

        <div className="text-center">
          {status === "verifying" && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
              <p className="text-gray-600">Memverifikasi email Anda...</p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4">
              <div className="text-green-600">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <p className="text-green-600 font-semibold">{message}</p>
              <p className="text-gray-600">Mengalihkan ke halaman utama...</p>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <div className="text-red-600">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <p className="text-red-600 font-semibold">{message}</p>
              <p className="text-gray-600">Mengalihkan ke halaman login...</p>
              <button
                onClick={() => router.push("/signin")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Kembali ke Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
