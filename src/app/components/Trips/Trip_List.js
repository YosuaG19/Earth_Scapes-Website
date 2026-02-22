"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase/client";
import List_Items from "./List_Item";
import Trip_Filter from "./Trip_Filter";
import Trip_Page from "./Trip_Page";

// 1. Terima searchQuery DAN categoryFilter dari parent
const Trip_List = ({ searchQuery = "", categoryFilter = "" }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCat, setSelectedCat] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 20000000 });
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sync kategori dari URL ke State Filter
  useEffect(() => {
    if (categoryFilter) {
      // Masukkan kategori dari URL ke dalam array selectedCat
      // Kita bungkus array agar logic .includes() di bawah tetap jalan
      setSelectedCat([categoryFilter]);
    }
  }, [categoryFilter]);

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("trips").select("*");
      if (!error) setItems(data);
      setLoading(false);
    };
    fetchTrips();
  }, []);

  // --- CORE FILTER & SORT LOGIC ---
  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    // A. SEARCH LOGIC
    if (searchQuery) {
      const lowQuery = searchQuery.toLowerCase();
      result = result.filter((item) => 
        (item.title || "").toLowerCase().includes(lowQuery) || 
        (item.location || "").toLowerCase().includes(lowQuery)
      );
    }

    // B. Filter by Category (Logic ini sudah benar, kita tinggal pastikan state-nya terisi)
    if (selectedCat.length > 0) {
      result = result.filter((item) => {
        // Pastikan pembandingnya sama-sama lowercase atau sesuai dengan slug di Home tadi
        return selectedCat.some(cat => cat.toLowerCase() === (item.category || "").toLowerCase());
      });
    }

    // C. Filter by Price Range
    result = result.filter(
      (item) => item.price >= priceRange.min && item.price <= priceRange.max,
    );

    // D. Sort Logic (Tetap sama)
    if (sortBy === "Name A-Z") {
      result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (sortBy === "Name Z-A") {
      result.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
    } else if (sortBy === "Categories A-Z") {
      result.sort((a, b) => (a.category || "").localeCompare(b.category || ""));
    } else if (sortBy === "Categories Z-A") {
      result.sort((a, b) => (b.category || "").localeCompare(a.category || ""));
    } else if (sortBy === "Price ↑") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price ↓") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [items, selectedCat, priceRange, sortBy, searchQuery]);

  // Reset ke halaman 1 setiap kali filter/sort/search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCat, priceRange, sortBy, searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedItems.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);

  if (loading)
    return (
      <div className="w-full p-6 text-center font-bold text-[#324018]">
        Loading Trips...
      </div>
    );

  return (
    <>
      <div className="w-full p-6 flex justify-between items-start relative">
        <div className="w-[32.5%] h-full sticky top-[25vh] left-6">
          <Trip_Filter
            selectedCat={selectedCat}
            setSelectedCat={setSelectedCat}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        <div className="w-[65%] h-full gap-4 flex flex-col items-end">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <List_Items
                key={item.id}
                slug={item.slug}
                img={item.banner_url}
                name={item.title}
                cat={item.category}
                desc={item.description}
                loc={item.location}
                rating={item.rating}
                days={item.days}
                price={item.price}
              />
            ))
          ) : (
            <div className="w-full text-center py-20">
              <p className="text-[#324018] italic opacity-60">
                No trips found. Try another filter or keyword.
              </p>
            </div>
          )}
        </div>
      </div>

      <Trip_Page
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default Trip_List;