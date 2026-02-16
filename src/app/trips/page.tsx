'use client'

import { useState } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Trips/Banner";
import Trip_List from "../components/Trips/Trip_List";
import Footer from "../components/Footer";

export default function Trips() {
  // State untuk menyimpan kata kunci pencarian
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar />
      {/* Banner lapor ke sini saat tombol diklik */}
      <Banner onSearch={(query: string) => setSearchQuery(query)} />
      
      {/* Trip_List nerima kata kunci dan memfilter datanya */}
      <Trip_List searchQuery={searchQuery} />
      
      <Footer />
    </>
  );
}