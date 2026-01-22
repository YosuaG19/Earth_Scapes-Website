import Image from "next/image";
import banner_bg from "../../../../public/banner_bg.png"

const Banner = () => {
    return(
        <>
            <div className="sticky top-[-13vh] flex flex-col justify-end items-center min-w-full h-[35vh] bg-black/30 shadow-xl/30 z-[5]">
                <div className="z-[2] absolute w-[100%] h-[100%] bg-black opacity-[40%]"></div>

                <div className="z-[1] absolute flex justify-center items-center overflow-hidden w-[100%] h-[100%]">
                    <Image fill src={banner_bg} alt="BG"></Image>
                </div>

                <div id="SearchBar" className="z-[9] bg-[#324018] absolute flex flex-col justify-between items-center min-h-[25%] min-w-[60%] overflow-hidden rounded-t-[1rem] p-[1rem]">
                    <form className="w-full flex justify-between min-h-[45%]">
                        <input type="text" placeholder="Search Your Destination" className="w-[75%] bg-[#e8e8da] rounded-[.5rem] p-[.5rem] text-[#626F47]"></input>
                        <button type="search" id="Submit" className="text-[#626F47] p-[.5rem] rounded-[.5rem] min-h-[30px] bg-[#e8e8da] min-w-[20%]">Search</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Banner;