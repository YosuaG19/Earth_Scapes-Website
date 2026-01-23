'use client'

import { useRouter } from "next/navigation";
import Image_Damper from "../Image_Damper";
import Image from "next/image";

const Banner = (props) =>{
    const router = useRouter();

    return(
        <>
            <div className="relative flex items-end justify-center min-h-[85vh] h-[85vh] w-full p-[1.5rem] text-[#e8e8da]">
                <button type="button" onClick={() => router.back()} className="flex item-center justify-center z-[5] cursor-pointer bg-white absolute w-[50px] h-[50px] rounded-br-[50%] top-[2rem] left-[2rem]">
                    <Image width="30" height="30" src="/back.svg" alt="back"></Image>
                </button>

                <div className="relative w-full h-full flex items-center justify-center items-end">
                    <Image_Damper name='Volcano' img='/Volcano.png'></Image_Damper>
                    <div className="z-[3] absolute bottom-[1rem] px-[1rem] flex justify-between items-end w-full">
                        <div className="flex flex-col min-w-[30%] max-w-[40%]">
                            <h1 className="text-[3rem]">{props.title}</h1>
                            <p className="text-[14px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vestibulum accumsan sapien, non porttitor velit faucibus vitae. Nullam condimentum posuere.</p>
                        </div>
                        {/* <div className="w-[356px] flex flex-col p-[1rem] gap-[1rem] border-[#e8e8da] border-[2px] rounded-t-[1rem] rounded-l-[1rem]">
                            <div className="flex w-full h-[240px] overflow-hidden rounded-t-[.5rem]">
                                <Image_Damper name='Volcano' img='/Mountain.png'></Image_Damper>
                            </div>
                            
                            <p className="text-[12px]">Nulla eget felis bibendum, lobortis nibh eget, auctor purus. Aenean venenatis erat et fringilla ultrices. Etiam vehicula mauris eu ligula.</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner;