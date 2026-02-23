'use client'

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Banner from "../components/Trips/Banner";
import Trip_List from "../components/Trips/Trip_List";
import Footer from "../components/Footer";

export default function Trips() {
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const categoryFilter = searchParams.get("category") || "";

  return (
    <>
      <Navbar />
      
      <Banner onSearch={(query: string) => setSearchQuery(query)} />
      
      <Trip_List 
        searchQuery={searchQuery} 
        categoryFilter={categoryFilter} 
      />
      
      <Footer />
    </>
  );
}