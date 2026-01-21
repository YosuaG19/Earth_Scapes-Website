import Image from "next/image";

const List_Items = () =>{
    return(
        <>
            <div className="w-full flex justify-between min-h-[25vh] h-[25vh]">
                <div className="flex w-[70.5%] h-full bg-[#324018] rounded-l-[1rem] shadow-xl/30 overflow-hidden">
                    <div className="flex w-[30%] h-full bg-[#e8e8da] items-center justify-center">
                        <p>IMG</p>
                    </div>
                    <div className="text-[#e8e8da] flex flex-col w-[70%] p-[1rem] justify-start gap-[.2rem] items-center">
                        <div className="w-full flex flex-col">
                            <div className="flex justify-between w-full">
                                <div className="flex flex-col items-start">
                                    <h2 className="text-[20px]">Dest. name</h2>
                                    <p className="-mt-[.2rem] text-[12px]">Categories</p>
                                </div>
                                
                                <div className="flex flex-col items-end">
                                    <p className="text-[18px]">4.5</p>
                                    <p className="-mt-[.2rem] text-[12px]">3 Days</p>
                                </div>
                            </div>
        
                           
                            
                            <div className="w-full flex items-center gap-[.5rem] mt-[.75rem]">
                                <Image width="20" height="20" src="./location.svg" alt="X"></Image>
                                <p className="text-[16px]">Location</p>
                            </div>
                        </div>


                        <div className="text-[10px]">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at venenatis nisl, at mattis nisi. Suspendisse sagittis venenatis nunc. Pellentesque fermentum diam vel.</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col p-[.5rem] justify-between w-[28.5%] h-full bg-[#e8e8da] border-[5px] border-[#324018] rounded-r-[1rem] shadow-xl/10">
                    <div className="flex flex-col items-end">
                        <p className="text-[#324018] text-[20px]">Rp x.xxx.xxx</p>
                        <p className="text-[#324018] text-[12px] -mt-[.5rem]">per person</p>
                    </div>
                    <button className="w-full h-[45px] bg-[#324018] rounded-br-[.5rem] text-[#e8e8da] text-[18px]">Book Now</button>
                </div>
            </div>
        </>
    )
}

export default List_Items;