import Book_Items from "./Book_Items";
import { useState } from "react";


function Book_Card() {
    const [Books, setBooks] = useState([
            {
                name: "Bromo",
                loc: "Jawa Timur",
                detail: "Scenic mountain landscapes, highland trails, sand landscapes",
                img: "/Mountain.png",
                price: "2.000.000"
            },
            {
                name: "Kawah Ijen",
                loc: "Jawa Timur",
                detail: "Scenic mountain landscapes, highland trails, sand landscapes",
                img: "/Mountain.png",
                price: "2.000.000"
            },
            {
                name: "Raja Ampat",
                loc: "Jawa Timur",
                detail: "Scenic mountain landscapes, highland trails, sand landscapes",
                img: "/Mountain.png",
                price: "2.000.000"
            },
            {
                name: "Tung Tung Sahur",
                loc: "Jawa Timur",
                detail: "Scenic mountain landscapes, highland trails, sand landscapes",
                img: "/Mountain.png",
                price: "2.000.000"
            },
        ]);


    return (
        <>
            <div className="grid grid-rows-<1> gap-[1rem]">
                {Books.map((Book) => {
                    // console.log(Book)
                    return(
                        <Book_Items key={Book.name} name={Book.name} desc={Book.detail} img={Book.img} loc={Book.loc}></Book_Items>
                    )        
                })}
            </div>
        </>
    );
}

export default Book_Card;