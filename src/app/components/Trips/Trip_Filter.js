"use client"

import { useEffect, useRef } from "react";
import Price_Range from "./Price_Range";
import Sort_Filter from "./Sort_Filter";
import Categories_Filter from "./Categories_Filter";

const Trip_Filter = () =>{
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
    
    
  

    return(
        <>
            <div className="flex flex-col min-h-[65vh] gap-[1rem]">
                <Sort_Filter></Sort_Filter>
                
                <Categories_Filter></Categories_Filter>

                <div className="border-[#324018] text-[#324018] border-[2px] rounded-tr-[1.5rem] h-full w-full p-[.75rem] flex flex-col gap-[.2rem] ">
                    <h3>Price</h3>
                    <Price_Range></Price_Range>
                </div>
            </div>
        </>
    )
}

export default Trip_Filter;