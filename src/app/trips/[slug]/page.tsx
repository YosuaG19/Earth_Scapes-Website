import { notFound } from "next/navigation";
import { tripsData } from "../trips";
import Product_Info from "@/app/components/trip_info/Product_Info";
import Footer from "@/app/components/Footer";

type PageProps = {
  params: Promise<{
    slug: keyof typeof tripsData;
  }>;
};

export default async function BookTripPage({params}: PageProps) {
  const {slug} = await params;
  const data = tripsData[slug];

  if (!data) notFound();

  // console.log(data);

  return (
    <>
      <Product_Info 
        title={data.title} loc={data.loc}
        desc={data.desc} days={data.days}
        price={data.price} slot={data.slot}
        rating={data.rating} others={data.others}
        img={data.img} banner={data.banner}
      ></Product_Info>
      <Footer></Footer>
    </>
  );
}
