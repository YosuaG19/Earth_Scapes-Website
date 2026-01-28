import { notFound } from "next/navigation";
import { donateData } from "../donate";
import Banner from "@/app/components/donate_info/Banner";
import Information from "@/app/components/donate_info/Information";
import Footer from "@/app/components/Footer";

type PageProps = {
  params: Promise<{
    slug: keyof typeof donateData;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const data = donateData[slug];

  if (!data) notFound();

  return (
    <>
      <Banner title={data.title} desc={data.desc} hero={data.hero} color={data.color}></Banner>
      <Information color={data.color}></Information>
      <Footer></Footer>
    </>
  );
}
