import type { Metadata } from "next";
import { Aboreto, Artifika } from "next/font/google";
import "../globals.css";


const aboreto = Aboreto({
  weight:'400',
  style: 'normal'
});

const artifika = Artifika({
  weight:'400',
  style: 'normal'
});

export const metadata: Metadata = {
  title: "Trips",
  description: "A Trip Give Back To The Earth",
};


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="trips_page"
        className={`${aboreto.className} ${artifika.className}`}
      >
        {children}
      </body>
    </html>
  );
}
