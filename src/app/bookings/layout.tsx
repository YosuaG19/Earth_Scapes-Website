import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Bookings",
  description: "A Trip Give Back To The Earth",
};


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        {children}
      </div>
  );
}
