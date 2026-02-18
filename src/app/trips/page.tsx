'use client'

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Banner from "../components/Trips/Banner";
import Trip_List from "../components/Trips/Trip_List";
import Footer from "../components/Footer";

export default function Trips() {
  const searchParams = useSearchParams();
  
  // State untuk menyimpan kata kunci pencarian dari Banner
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Ambil kategori dari URL (misal: ?category=mountain)
  // Kita cast sebagai string agar aman di TypeScript
  const categoryFilter = searchParams.get("category") || "";

  return (
    <>
      <Navbar />
      
      {/* Banner tetap handle pencarian manual */}
      <Banner onSearch={(query: string) => setSearchQuery(query)} />
      
      {/* UI tetap bersih sesuai aslinya. 
          Kita hanya oper categoryFilter sebagai props tambahan ke Trip_List.
      */}
      <Trip_List 
        searchQuery={searchQuery} 
        categoryFilter={categoryFilter} 
      />
      
      <Footer />
    </>
  );
}