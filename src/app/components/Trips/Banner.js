import Image from "next/image";
import banner_bg from "../../../../public/trips_bg.jpg"

const Banner = () => {
    return(
        <>
            <div className="sticky top-[-23vh] flex flex-col justify-end items-center min-w-full h-[45vh] shadow-xl/30 z-[5]">
                <div className="z-[2] absolute w-[100%] h-[100%] bg-black/45"></div>

                <div className="z-[1] absolute flex justify-start items-start overflow-hidden w-[100%] h-[100%]">
                    <Image className="w-full h-full object-cover" src={banner_bg} alt="BG"></Image>
                </div>

                <div className="z-[5] absolute flex w-[100%] h-full justify-center items-center text-[#e8e8da] text-center p-[3rem] gap-[.5rem]">
                    <h1 className="text-[3rem] pb-[1rem]"><span className="text-[#88ab41]">Explore</span> the beauty of <span className="text-[#88ab41]">Indonesia</span></h1>
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