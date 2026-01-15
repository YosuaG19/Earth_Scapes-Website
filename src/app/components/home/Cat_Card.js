import Image from "next/image"
import arrow from "../../../../public/arrow.svg"
function Cat_Card(props) {
    return(
        <div id="cat" className="relative flex items-end h-full w-full bg-white rounded-r-[1rem] overflow-hidden p-[.5rem] shadow-xl/30">
            
            <div className="absolute w-full h-full top-0 left-0 z-[2]">
                <div className="relative w-full h-full ">
                    <div className="absolute z-[1] w-full h-full bg-black opacity-[25%]"></div>
                    <Image fill className="z-[0] absolute h-full" src={props.img}></Image>
                </div>
            </div>

            <div className="z-[3] absolute flex items-center justify-center h-full w-[20%] bg-black/40 top-0 right-0 ">
                <Image className="h-[40%]" src={arrow}></Image>
            </div>

            <div className="z-[3] w-[75%] bg-t absolute text-white">
                <h2 className="w-full text-[24px] arti">{props.name}</h2>
                <p className="w-full text-[11px] arti">{props.detail}</p>
            </div>
        </div>
    )
}

export default Cat_Card;