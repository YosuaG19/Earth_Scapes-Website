"use client"

import { useEffect, useRef } from "react";
import Price_Range from "./Price_Range";

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
    
    const cat = [
        "Mountain", "Forest", "Marine", "Fresh Water", "Coastal", "Volcano"
    ];
  

    return(
        <>
            <div className="flex flex-col min-h-[65vh] gap-[1rem]">
                <div className="border-[#324018] text-[#324018] border-[2px] rounded-tr-[1.5rem] h-full w-full p-[.75rem] flex flex-col  gap-[.2rem]">
                    <h3>Categories</h3>
                    <div className="grid grid-cols-2 grid-rows-auto gap-[.35rem]">
                        {cat.map((names) => {
                            // console.log(cat)
                            return(
                                <span key={names} className="flex gap-[.5rem] text-[12px]">
                                    <input className="cursor-pointer" id={names} type="checkbox"></input>
                                    <label className="cursor-pointer" htmlFor={names}>{names}</label>
                                </span>
                            )        
                        })}
                    </div>
                </div>

                <div className="border-[#324018] text-[#324018] border-[2px] rounded-tr-[1.5rem] h-full w-full p-[.75rem] flex flex-col gap-[.2rem] ">
                    <h3>Price</h3>
                    <Price_Range></Price_Range>
                </div>

                <div className="border-[#324018] text-[#324018] border-[2px] rounded-tr-[1.5rem] h-full w-full p-[.75rem] flex flex-col gap-[.2rem]">
                    <h3>Location</h3>
                    <div className="grid grid-cols-2 grid-rows-auto gap-[.35rem]">
                        {loc.map((place) => {
                            // console.log(cat)
                            return(
                                <span key={place} className="flex gap-[.5rem] text-[12px]">
                                    <input className="cursor-pointer" id={place} type="checkbox"></input>
                                    <label className="cursor-pointer" htmlFor={place}>{place}</label>
                                </span>
                            )        
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Trip_Filter;