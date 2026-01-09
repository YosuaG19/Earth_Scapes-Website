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
  title: "Profile",
  description: "A Trip Give Back To The Earth",
};


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.png" sizes="any" />
      </head>
      <body
        className={`${aboreto.className} ${artifika.className}`}
      >
        {children}
      </body>
    </html>
  );
}
