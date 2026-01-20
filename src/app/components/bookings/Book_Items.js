import Image from "next/image";


const Book_Items = (props) =>{

    return(
        <>
            <div className="bg-black w-full min-h-[30vh] rounded-l-xl overflow-hidden shadow-xl/30 flex">
                <div className="overflow-hidden bg-gray h-full w-[30%] text-[#fffff3] flex items-center justify-center">
                    {/* <Image fill src={props.img}></Image> */}
                    IMG
                </div>

                <div className="text-[#242D13] h-full w-[70%] p-[1rem] flex flex-col gap-[.5rem] bg-[#fffff3]">
                    <div className="flex w-full justify-between items-start min-h-[30%]">
                        <div className="flex flex-col">
                            <h2 className="text-[24px]">{props.name}</h2>
                            <p className="text-[14px] -mt-[0.3rem]">{props.loc}</p>
                        </div>
                        <input className="h-[20px] w-[20px] bg-[#242D13]" id="Include" type="checkbox"></input>
                    </div>
                    <div className="flex flex-col items-end justify-between min-h-[65%]">
                        <span className="text-[12px] text-left w-full">{props.desc}</span>
                        <p>Rp x.xxx.xxx{props.price}</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Book_Items;