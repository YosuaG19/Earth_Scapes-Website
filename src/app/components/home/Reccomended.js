import { useState } from "react";
import Rec_Card from "./Rec_Card";

const Recommended = () => {
    const [Recs, setRecs] = useState([
        {
            name: "Bromo",
            loc: "Jawa Timur",
            rate: "4.5",
            img: "/Volcano.png"
        },
        {
            name: "Kawah Ijen",
            loc: "Jawa Timur",
            rate: "4.5",
            img: "/Mountain.png"
        },
        {
            name: "Karimun Jawa",
            loc: "Jawa Timur",
            rate: "4.5",
            img: "/Turtle.png"
        },
        {
            name: "Raja Ampat",
            loc: "Jawa Timur",
            rate: "4.5",
            img: "/Fresh_Water.png"
        },
        {
            name: "Pulau Seribu",
            loc: "Jawa Timur",
            rate: "4.5",
            img: "/Coastal.png"
        },
    ])

    return(
        <>
            <section className="min-w-full h-[85vh] flex flex-col items-center">
                <div className="h-[20%] text-[#242D13] flex justify-center items-center">
                    <h1 className="text-[4rem] abo" >Recommended</h1>
                </div>

                <div id="carou" className="h-[80%] w-full flex overflow-x-auto gap-[1.5rem] pb-[2.5rem] pt-[.5rem] pl-[2rem] pr-[2rem]">
                    {Recs.map((rec) => {
                        // console.log(rec)
                        return(
                            <Rec_Card key={rec.name} name={rec.name} loc={rec.loc} rate={rec.rate} img={rec.img}></Rec_Card>
                        )
                    })}
                </div>
            </section>
        </>
    )
}

export default Recommended;