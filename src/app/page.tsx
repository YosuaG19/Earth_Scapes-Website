"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase";
import Navbar from "./components/Navbar";
import Banner from "./components/home/Banner";
import Categories from "./components/home/Categories";
import Recommended from "./components/home/Reccomended";
import Carou from "./components/home/Carou";
import Footer from "./components/Footer";

export default function App() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      // Cek jika ada OAuth code dari callback
      const oauthCode = searchParams.get("oauth_code");
      const error = searchParams.get("error");

      console.log("Home page - OAuth check:", { oauthCode, error });

      if (error) {
        console.error("OAuth error from callback:", error);
        // Redirect ke signin dengan error message
        router.push(`/signin?error=${encodeURIComponent(error)}`);
        return;
      }

      if (oauthCode) {
        console.log("Processing OAuth code exchange...");

        try {
          // Exchange OAuth code untuk session
          const { data, error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(oauthCode);

          if (exchangeError) {
            console.error("Code exchange error:", exchangeError);
            router.push(
              `/signin?error=${encodeURIComponent(exchangeError.message)}`,
            );
            return;
          }

          console.log("✅ OAuth successful! User:", data.user?.email);

          // Hapus parameter dari URL tanpa reload page
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete("oauth_code");
          newUrl.searchParams.delete("error");
          window.history.replaceState({}, "", newUrl.toString());

          // Refresh untuk update auth state di seluruh app
          router.refresh();
        } catch (error) {
          console.error("OAuth handling error:", error);
          router.push("/signin?error=oauth_failed");
        }
      }
    };

    handleOAuthCallback();
  }, [searchParams, supabase, router]);

  // Cek session untuk debugging
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("Home page - Current user:", user?.email);
    };

    checkUser();
  }, [supabase]);

  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <Categories></Categories>
      <Recommended></Recommended>
      {/* <Carou></Carou> */}
      <Footer></Footer>
    </>
  );
}
