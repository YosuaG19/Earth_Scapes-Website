'use client'

import { useEffect, useRef } from "react";
import Price_Range from "./Price_Range";
import Sort_Filter from "./Sort_Filter";
import Categories_Filter from "./Categories_Filter";

// 1. Terima 'props' dari Trip_List
const Trip_Filter = (props) => {
    // Kita tetap simpan array loc ini jika nanti kamu ingin buat filter lokasi
    const loc = [        
        "East java",
        "West Java",
        "Central Java",
        "Yogyakarta",
        "Banten",
        "Bangka Belitung",
        "North Sumatera",
        "Central Kalimantan",
        "East Nusa Tenggara",
        "Southeast Sulawesi",
        "North Sulawesi",
        "Papua",
        "West Papua"
    ];

    return (
        <>
            <div className="flex flex-col min-h-[65vh] gap-[1rem]">
                {/* 2. Oper semua props ke Sort_Filter */}
                <Sort_Filter 
                    sortBy={props.sortBy} 
                    setSortBy={props.setSortBy} 
                />
                
                {/* 3. Oper semua props ke Categories_Filter */}
                <Categories_Filter 
                    selectedCat={props.selectedCat} 
                    setSelectedCat={props.setSelectedCat} 
                />

                <div className="border-[#324018] text-[#324018] border-[2px] rounded-tr-[1.5rem] h-full w-full p-[.75rem] flex flex-col gap-[.2rem]">
                    <h3>Price</h3>
                    {/* 4. Oper semua props ke Price_Range */}
                    <Price_Range 
                        priceRange={props.priceRange} 
                        setPriceRange={props.setPriceRange} 
                    />
                </div>
            </div>
        </>
    )
}

export default Trip_Filter;