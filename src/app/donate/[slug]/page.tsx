// app/donate/[slug]/page.tsx
import { notFound } from "next/navigation";
import { donateData } from "../donate";
import { createClient } from "@/lib/supabase/client";
import Banner from "@/app/components/donate_info/Banner";
import Information from "@/app/components/donate_info/Information";
import Footer from "@/app/components/Footer";

export default async function Page({ params }: any) {
  const { slug } = await params;
  const staticData = donateData[slug as keyof typeof donateData];

  if (!staticData) notFound();

  const supabase = await createClient();
  const { data: dbData } = await supabase
    .from('donation_progress')
    .select('current_amount, target_amount')
    .eq('slug', slug)
    .single();

  const displayProggNow = dbData ? dbData.current_amount : staticData.proggNow;
  const displayProgLim = dbData ? dbData.target_amount : staticData.progLim;

  return (
    <>
      <Banner 
        title={staticData.title} 
        desc={staticData.desc2} 
        hero={staticData.hero} 
        color={staticData.color} 
      />
      
      <Information 
        title={staticData.title} 
        hero={staticData.hero}
        color={staticData.color} 
        orv={staticData.overview} 
        desc={staticData.desc1} 
        impact={staticData.impact} 
        proggNow={displayProggNow}
        proggLim={displayProgLim}
      />
      
      <Footer />
    </>
  );
}