'use client'

import { useRouter } from "next/navigation";
import Image_Damper from "../Image_Damper";
import Image from "next/image";

const Banner = (props) =>{
    const router = useRouter();

    const formatIDR = (v) =>
        v === "" ? "" : "Rp " + new Intl.NumberFormat("id-ID").format(v);

    return(
        <>
            <div className="relative flex items-end justify-center min-h-[85vh] h-[85vh] w-full p-[1.5rem] text-[#e8e8da]">
                <button type="button" onClick={() => router.back()} className="flex item-center justify-center z-[5] cursor-pointer bg-white absolute w-[50px] h-[50px] rounded-br-[50%] top-[2rem] left-[2rem]">
                    <Image width="30" height="30" src="/back.svg" alt="back"></Image>
                </button>

                <p className="text-[2.5rem] absolute top-[2.5rem] right-[3rem] z-[5]">{props.rating}</p>

                <div className="relative w-full h-full flex items-center justify-center items-end rounded-bl-[2rem] rounded-tr-[2rem] overflow-hidden">
                    <Image_Damper name='Volcano' img={props.img}></Image_Damper>
                    <div className="z-[3] absolute bottom-[1.5rem] px-[1.5rem] flex justify-between items-end w-full">
                        <div className="flex flex-col min-w-[30%] max-w-[60%]">
                            <p className="text-[22px] -mb-[1rem]">{props.loc}</p>
                            <h1 className="text-[2.5rem]">{props.title}</h1>
                        </div>
                        <div className="flex min-w-[30%] max-w-[40%] items-end justify-end">
                            <h1 className="text-[1.75rem]">{formatIDR(props.price)}</h1>
                            <p className="text-[20px]">/person</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner;