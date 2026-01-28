'use client'

import { useRouter } from "next/navigation";
import Image_Damper from "../Image_Damper";
import Image from "next/image";

const Banner = (props) =>{
    const router = useRouter();

    return(
        <>
            <div className="relative flex items-end justify-center min-h-[85vh] h-[100vh] w-full p-[1.5rem] text-[#e8e8da]">
                <button type="button" onClick={() => router.back()} className="flex item-center justify-center z-[5] cursor-pointer bg-white absolute w-[50px] h-[50px] rounded-br-[50%] top-[2rem] left-[2rem]">
                    <Image width="30" height="30" src="/back.svg" alt="back"></Image>
                </button>

                <div className="relative w-full h-full flex items-center justify-center items-end overflow-hidden rounded-tr-[3rem]">
                    <Image_Damper name={props.hero} img={props.hero}></Image_Damper>
                    <div className="z-[3] absolute bottom-[2rem] px-[2rem] flex justify-between items-end w-full">
                        <div className="flex flex-col">
                            <h1 className="text-[3rem] -mb-[1.5rem]">Make Donation for</h1>
                            <h1 style={{ color: props.color}} className="text-[3rem]">{props.title}</h1>
                            <p className="text-[14px] min-w-[40%] max-w-[50%]">{props.desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner;