import Image from "next/image"
import arrow from "../../../../public/arrow.svg"

function Rec_Card(props) {
    return(
        <>
            <div id="rec_card" className="w-[25%] min-w-[25%] h-full bg-[#e8e8da] relative flex items-end rounded-tl-[2rem] rounded-br-[1rem] overflow-hidden shadow-lg/30">
                <div className="absolute w-full h-full top-0 left-0 z-[2]">
                    <div className="relative w-full h-full ">
                        <div className="absolute z-[1] w-full h-full bg-black opacity-[40%]"></div>
                        <Image id="img" fill className="z-[0] absolute h-full" src={props.img} alt={props.img}></Image>
                    </div>
                </div>

                <div className="realtive flex h-[30%] w-full bg-black/30 p-[.5rem] z-[3]">
                    <div className="text-[#e8e8da]">
                        <h2 className="abo text-[25px] font-bold">{props.name},</h2>
                        <p className="abo text-[15px] max-w-[100%]">{props.loc}</p>
                    </div>
                    <div className="absolute right-[1rem] top-[.5rem] arti text-[30px] text-[#e8e8da]">{props.rate}</div>
                    <button className="absolute bottom-4 right-4 p-[.5rem] text-[14px] bg-[#e8e8da] rounded-lg">Look up</button>
                </div>
            </div>
        </>
    )
}

export default Rec_Card;