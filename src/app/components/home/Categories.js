import Link from "next/link";
import Cat_Card from "./Cat_Card";

const Categories = () => {
    const Cats = [
        {
            name: "Mountain",
            slug: "Mountain", // Tambahkan slug agar sesuai dengan database
            detail: "Scenic mountain landscapes and highland trails.",
            img: "/Mountain.png"
        },
        {
            name: "Forest",
            slug: "Forest",
            detail: "Lush forests rich in biodiversity and greenery.",
            img: "/Forest.png"
        },
        {
            name: "Marine",
            slug: "Marine",
            detail: "Ocean views and vibrant marine ecosystems.",
            img: "/Turtle.png"
        },
        {
            name: "Fresh Water",
            slug: "Fresh Water",
            detail: "Rivers, lakes, and refreshing inland waters.",
            img: "/Fresh_Water.png"
        },
        {
            name: "Coastal",
            slug: "Coastal",
            detail: "Beautiful coastlines and seaside environments.",
            img: "/Coastal.png"
        },
        {
            name: "Volcano",
            slug: "Volcano",
            detail: "Volcanic regions and geological formations.",
            img: "/Volcano.png"
        }
    ];

    return (
        <>
            <section className="min-w-full h-[90vh] flex flex-col items-center">
                <div className="h-[20%] text-[#242D13] flex justify-center items-center">
                    <h1 className="text-[3rem] abo">Categories</h1>
                </div>

                <div className="h-[80%] w-full grid grid-cols-3 grid-rows-2 gap-[1.5rem] pb-[.5rem] pt-[.5rem] pl-[2.5rem] pr-[2.5rem]">
                    {Cats.map((cat) => {
                        return (
                            /* Bungkus Cat_Card dengan Link. 
                               Gunakan query params ?category= agar dibaca oleh Trips page.
                               Gunakan className="contents" agar Grid CSS tidak rusak.
                            */
                            <Link 
                                key={cat.name} 
                                href={`/trips?category=${cat.slug}`} 
                                className="contents"
                            >
                                <Cat_Card 
                                    name={cat.name} 
                                    detail={cat.detail} 
                                    img={cat.img} 
                                />
                            </Link>
                        )
                    })}
                </div>
            </section>
        </>
    )
}

export default Categories;