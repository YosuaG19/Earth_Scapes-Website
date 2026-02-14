import Image from "next/image"

const Description = (props) =>{
    const svg = Object.entries(props.svg || {})
    console.log(props.svg)

    return(
        <>
            <div className="flex gap-[1rem] h-full">
                <div className="flex flex-col h-full w-[50%] gap-[1rem]">
                    <p className="text-justify text-[12px]">{props.desc}</p>
                    <span className="w-full h-[2px] bg-black"></span>

                    <div className="grid grid-cols-3 gap-[.5rem]">
                        {svg.map(([title,img])=>{
                            console.log(title, img)
                            return(
                                <div className="gap-[.5rem] py-[.5rem] text-[#5a7527] flex items-center justify-start" key={title}>
                                    <Image width={20} height={20} alt={title} src={img}></Image>
                                    <p className="z-[10] uppercase font-semibold text-[11px]">{title}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="flex w-[50%]">
                    <iframe
                        src={props.map}
                        loading="lazy"
                        className="w-full h-full"
                    />  
                </div>
            </div>
        </>
    )
}

export default Description;