import Image from "next/image";
import banner_bg from "../../../../public/donate_bg.jpg"

const Banner = () => {
    return(
        <>
            <div className="relative flex flex-col text-[#e8e8da] items-start min-w-full h-[90vh] shadow-xl/30">
                <div className="z-[2] absolute w-[100%] h-[100%] bg-black/50"></div>

                <div className="z-[1] absolute flex justify-center items-center overflow-hidden w-[100%] h-[100%]">
                    <Image className="object-cover w-full h-full" src={banner_bg} alt="BG"></Image>
                </div>

                <div className="z-[5] w-[55%] h-full flex flex-col justify-end items-center p-[3rem] text-[1rem] gap-[.4rem]">
                    <h1 className="text-[3rem] text-left leading-[3.5rem]">
                        Let's Create More <span className="text-[#88ab41]">Beautiful Indonesia</span> 
                    </h1>
                    <p className=" text-[14px] text-justify">
                        Your donation helps support EarthScape’s environmental actions and sustainability initiatives. Every contribution goes toward conservation efforts, environmental education, and real projects that protect nature. To stay transparent, all donation progress and impact updates will be shared regularly on EarthScape’s official social media.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Banner;