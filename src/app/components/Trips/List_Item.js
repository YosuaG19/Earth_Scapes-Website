'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import Image_Damper from "../Image_Damper";

const List_Items = (props) =>{
    const router = useRouter()

    const formatIDR = (v) =>
        v === "" ? "" : "Rp " + new Intl.NumberFormat("id-ID").format(v);

    const truncateWords = (text, maxWords) => {
        if (!text) return "";

        const words = text.split(" ");
        if (words.length <= maxWords) return text;

        return words.slice(0, maxWords).join(" ") + "...";
    };

    return(
        <>
            <div className="w-full flex justify-between min-h-[25vh] h-[25vh]">
                <div className="flex w-[70.5%] h-full bg-[#324018] rounded-bl-2xl shadow-xl/30 overflow-hidden">
                    <div className="flex w-[30%] h-full bg-[#e8e8da] items-center justify-center">
                        <Image_Damper name={props.name} img={props.img}></Image_Damper>
                    </div>
                    
                    <div className="text-[#e8e8da] flex flex-col w-[70%] p-4 justify-start gap-[.2rem] items-center">
                        <div className="w-full flex flex-col">
                            <div className="flex justify-between w-full">
                                <div className="flex flex-col items-start">
                                    <h2 className="text-[20px]">{props.name}</h2>
                                    <p className="-mt-[.2rem] text-[12px]">{props.cat}</p>
                                </div>
                                
                                <div className="flex flex-col items-end">
                                    <p className="text-[18px]">{props.rating}</p>
                                    <p className="-mt-[.2rem] text-[12px]">{props.days} Days</p>
                                </div>
                            </div>
        
                        
                            
                            <div className="w-full flex items-center gap-2 mt-3">
                                <Image width="20" height="20" src="./location.svg" alt="X"></Image>
                                <p className="text-[16px]">{props.loc}</p>
                            </div>
                        </div>


                        <div className="text-[10px] w-full">
                            <p className="w-full text-justify">
                                {truncateWords(props.desc, 35)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col p-2 justify-between w-[28.5%] h-full bg-[#e8e8da] border-[5px] border-[#324018] rounded-r-2xl shadow-xl/10">
                    <div className="flex flex-col items-end">
                        <p className="text-[#324018] text-[20px]">{formatIDR(props.price)}</p>
                        <p className="text-[#324018] text-[12px] -mt-2">per person</p>
                    </div>
                    
                    <button type="button" onClick={() => router.push('/trips/' + props.slug)} className="cursor-pointer w-full h-11.25 bg-[#324018] rounded-br-lg text-[#e8e8da] text-[18px]">Book Now</button>
                </div>
            </div>
        </>
    )
}

export default List_Items;