import Image from "next/image";
import banner_bg from "../../../../public/banner_bg.png"

const Banner = () => {
    return(
        <>
            <div className="relative flex text-[#e8e8da] flex-col justify-center items-center min-w-full h-[90vh] shadow-xl/30">
                <div className="z-[2] absolute w-[100%] h-[100%] bg-black opacity-[50%]"></div>

                <div className="z-[1] absolute flex justify-center items-center overflow-hidden w-[100%] h-[100%]">
                    <Image className="object-cover w-full h-full" src={banner_bg} alt="BG"></Image>
                </div>

                <div className="z-[5] flex flex-col w-[80%] items-center text-center p-[3rem] gap-[.5rem]">
                    <h1 className="text-[3rem]">An <span className="text-[#88ab41]">Escape</span> Give Back to the <span className="text-[#88ab41]">Earth</span></h1>
                    <p className="w-[80%] text-[14px]">EarthScape is a space where people reconnect with nature and take part in caring for the Earth through meaningful actions, shared experiences, and sustainable initiatives. We aim to inspire awareness, encourage responsible choices, and create a community that believes small actions can make a real difference for our planet.</p>
                </div>
            </div>
        </>
    )
}

export default Banner;