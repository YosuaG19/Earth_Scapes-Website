import Image from "next/image"

const Description = (props) =>{
    const svg = Object.entries(props.svg || {})
    console.log(props.svg)

    return(
        <>
            <div className="flex gap-[1rem]">
                <p>{props.desc}</p>

                <div className="w-[40%] grid gap-[.5rem]">
                    {svg.map(([title,img])=>{
                        console.log(title, img)
                        return(
                            <div className="rounded-[.5rem] relative py-[.75rem] border-[2px] flex items-center justify-center" key={title}>
                                <p className="z-[10] uppercase font-bold">{title}</p>
                                <Image className="absolute opacity-[20%]" width={40} height={40} alt={title} src={img}></Image>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Description;