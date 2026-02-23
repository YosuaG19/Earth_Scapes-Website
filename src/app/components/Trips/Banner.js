'use client'; // Wajib karena pakai useState

import { useState } from "react";
import Image from "next/image";
import banner_bg from "../../../../public/trips_bg.jpg"

const Banner = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        // Kirim kata kunci ke komponen induk (parent)
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <>
            <div className="sticky top-[-23vh] flex flex-col justify-end items-center min-w-full h-[45vh] shadow-xl/30 z-5">
                <div className="z-2 absolute w-full h-full bg-black/45"></div>

                <div className="z-1 absolute flex justify-start items-start overflow-hidden w-full h-full">
                    <Image className="w-full h-full object-cover" src={banner_bg} alt="BG" priority />
                </div>

                <div className="z-5 absolute flex w-full h-full justify-center items-center text-[#e8e8da] text-center p-12 gap-2">
                    <h1 className="text-[3rem] pb-4">
                        <span className="text-[#88ab41]">Explore</span> the beauty of <span className="text-[#88ab41]">Indonesia</span>
                    </h1>
                </div>

                <div id="SearchBar" className="z-9 bg-[#324018] absolute flex flex-col justify-between items-center min-h-[25%] min-w-[60%] overflow-hidden rounded-t-2xl p-4">
                    <form onSubmit={handleSearch} className="w-full flex justify-between min-h-[45%]">
                        <input 
                            type="text" 
                            placeholder="Search Your Destination" 
                            className="w-[75%] bg-[#e8e8da] rounded-lg p-2 text-[#626F47] focus:outline-none"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button 
                            type="submit" 
                            id="Submit" 
                            className="text-[#626F47] p-2 rounded-lg min-h-7.5 bg-[#e8e8da] min-w-[20%] font-bold hover:bg-[#d8d8ca] transition-colors"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Banner;