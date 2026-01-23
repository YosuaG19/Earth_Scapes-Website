import Link from "next/link";


const Trip_Page = () =>{
    return(
        <>
            <div className="flex gap-[.75rem] justify-end pl-[2rem] pr-[2rem]">
                <p className="cursor-pointer flex items-center justify-center bg-[#324018] text-[#e8e8da] w-[30px] h-[30px] text-[15px] rounded-tl-[.75rem]">1</p>
                <p className="cursor-pointer flex items-center justify-center bg-[#324018] text-[#e8e8da] w-[30px] h-[30px] text-[15px] rounded-tl-[.75rem]">2</p>
                <p className="cursor-pointer flex items-center justify-center bg-[#324018] text-[#e8e8da] w-[30px] h-[30px] text-[15px] rounded-tl-[.75rem]">3</p>
                <p className="cursor-pointer flex items-center justify-center bg-[#324018] text-[#e8e8da] w-[30px] h-[30px] text-[15px] rounded-tl-[.75rem]">4</p>
                <p className="cursor-pointer flex items-center justify-center bg-[#324018] text-[#e8e8da] w-[30px] h-[30px] text-[15px] rounded-tl-[.75rem]">5</p>
            </div>
        </>
    )
}

export default Trip_Page;