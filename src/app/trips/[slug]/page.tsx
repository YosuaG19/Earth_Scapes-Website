import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Product_Info from "@/app/components/trip_info/Product_Info";
import Footer from "@/app/components/Footer";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BookTripPage({ params }: PageProps) {
  const { slug } = await params;
  console.log('SEDANG MEMBUKA SLUG:', slug);

  const { data: trip, error } = await supabase
    .from("trips")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !trip) {
    notFound();
  }

  console.log("LOG SERVER - HARGA DARI DB:", trip.price);

  const safeOthers =
    typeof trip.others === "string"
      ? JSON.parse(trip.others)
      : trip.others || {};

  const safeImg =
    typeof trip.img === "string" ? JSON.parse(trip.img) : trip.img || {};

  return (
    <>
      <Product_Info
        tripData={trip}
        title={trip.title}
        loc={trip.loc}
        desc={trip.description}
        days={trip.days}
        price={trip.price}
        slot={trip.slot}
        rating={trip.rating}
        others={safeOthers}
        banner={trip.banner_url}
        img={trip.images}
        map={trip.map_url}
      />
      <Footer />
    </>
  );
}
