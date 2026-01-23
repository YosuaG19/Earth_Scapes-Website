import { notFound } from "next/navigation";
import { donateData } from "../donate";
import Banner from "@/app/components/donate_info/Banner";

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
      <Banner title={data.title}></Banner>
      <h1>{data.title}</h1>
      <p>{data.desc}</p>
    </>
  );
}
