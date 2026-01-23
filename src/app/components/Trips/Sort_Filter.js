
'use client'

import { useState } from "react";

const Sort_Filter = () =>{
    const [sortBy, setSortBy] = useState("");

    const sort =[
        "Name A-Z", "Name Z-A", "Categories A-Z", "Categories Z-A",  "Price ↑", "Price ↓"
    ];

    return(
        <>
            <div className="border-[#324018] text-[#324018] border-[2px] rounded-tr-[1.5rem] h-full w-full p-[.75rem] flex flex-col gap-[.2rem]">
                <div className="flex w-full justify-between">
                    <h3>Sort by</h3>
                    <button type="button" onClick={() => setSortBy("")} className="self-end text-[12px] px-[.75rem] py-[.25rem]  rounded-tr-[.5rem] hover:bg-[#324018] hover:text-[#e8e8da] transition">
                        Clear
                    </button>
                </div>

                <div className="grid grid-cols-2 grid-rows-auto gap-[.35rem]">
                    {sort.map((value) => {
                        // console.log(cat)
                        return(
                            <span key={value} className="flex gap-[.5rem] text-[12px]">
                                <input className="cursor-pointer" id={value} type="radio" name="sort" checked={sortBy === value} onChange={() => setSortBy(value)}></input>
                                <label className="cursor-pointer" htmlFor={value}>{value}</label>
                            </span>
                        )        
                    })}
                </div>

            </div>
        </>
    )
}

export default Sort_Filter;