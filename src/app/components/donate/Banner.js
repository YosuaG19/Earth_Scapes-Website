import Image from "next/image";
import banner_bg from "../../../../public/banner_bg.png"

const Banner = () => {
    return(
        <>
            <div className="relative flex flex-col justify-end items-center min-w-full h-[90vh] bg-black/30 shadow-xl/30">
                <div className="z-[2] absolute w-[100%] h-[100%] bg-black opacity-[40%]"></div>

                <div className="z-[1] absolute flex justify-center items-center overflow-hidden w-[100%] h-[100%]">
                    <Image fill src={banner_bg} alt="BG"></Image>
                </div>
            </div>
        </>
    )
}

export default Banner;