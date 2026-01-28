
import Image from "next/image";

const Image_Damper = (props) =>{

    return(
        <>
            <div className="w-full h-full relative">
                <div className="z-[2] absolute w-full h-full bg-black/30"></div>
                <div className="z-[1] absolute w-full h-full flex items-center justify-center">
                    <Image width={500} height={300} className="w-full h-full object-cover" src={props.img} alt={props.name}></Image>
                </div>
            </div>
        </>
    )
}

export default Image_Damper;