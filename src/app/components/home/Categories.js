import Link from "next/link";
import Cat_Card from "./Cat_Card";
import { useState } from "react";

const Categories = () =>{
    const [Cats, setCats] = useState([
        {
            name: "Mountain",
            detail: "Scenic mountain landscapes and highland trails.",
            img: "/Mountain.png"
        },
        {
            name: "Forest",
            detail: "Lush forests rich in biodiversity and greenery.",
            img: "/Forest.png"
        },
        {
            name: "Marine",
            detail: "Ocean views and vibrant marine ecosystems.",
            img: "/Turtle.png"
        },
        {
            name: "Fresh Water",
            detail: "Rivers, lakes, and refreshing inland waters.",
            img: "/Fresh_Water.png"
        },
        {
            name: "Coastal",
            detail: "Beautiful coastlines and seaside environments.",
            img: "/Coastal.png"
        },
        {
            name: "Volcano",
            detail: "Volcanic regions and geological formations.",
            img: "/Volcano.png"
        }
    ]);

    return(
        <>
            <section className="min-w-full h-[90vh] flex flex-col items-center">
                <div className="h-[20%] text-[#242D13] flex justify-center items-center">
                    <h1 className="text-[4rem] abo" >Categories</h1>
                </div>

                <div className="h-[80%] w-full grid grid-cols-3 grid-rows-2 gap-[1.5rem] pb-[.5rem] pt-[.5rem] pl-[2.5rem] pr-[2.5rem]">
                    {Cats.map((cat) => {
                        // console.log(cat)
                        return(
                            <Cat_Card key={cat.name} name={cat.name} detail={cat.detail} img={cat.img}></Cat_Card>
                        )        
                    })}
                </div>
            </section>
        </>
    )
}

export default Categories;