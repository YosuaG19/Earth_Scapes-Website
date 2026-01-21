import Link from "next/link";
import Cat_Card from "./Cat_Card";
import { useState } from "react";

const Categories = () =>{
    const [Cats, setCats] = useState([
        {
            name: "Land Ecosystem",
            detail: "Scenic mountain landscapes and highland trails.",
            img: "/Mountain.png"
        },
        {
            name: "Forestation",
            detail: "Lush forests rich in biodiversity and greenery.",
            img: "/Forest.png"
        },
        {
            name: "Marine Ecosystem",
            detail: "Ocean views and vibrant marine ecosystems.",
            img: "/Turtle.png"
        }
    ]);

    return(
        <>
            <section className="min-w-full h-[50vh] flex flex-col items-center">
                <div className="h-[30%] text-[#242D13] flex justify-center items-center">
                    <h1 className="text-[3rem] abo" >Donations</h1>
                </div>

                <div className="h-[70%] w-full grid grid-cols-3 gap-[1.5rem] pb-[.5rem] pt-[.5rem] pl-[2.5rem] pr-[2.5rem]">
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