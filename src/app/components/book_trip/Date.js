'use client'

import { useRouter } from "next/navigation"

const Date = () =>{
    const router = useRouter()

    return(
        <>
            <button type="button" onClick={() => router.back()} className="cursor-pointer w-full h-[45px] bg-[#324018] rounded-br-[.5rem] text-[#e8e8da] text-[18px]">Book Now</button>
        </>
    )
}

export default Date;