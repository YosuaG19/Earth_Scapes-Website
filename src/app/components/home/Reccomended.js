'use client'
import Rec_Card from "./Rec_Card";
import Link from "next/link";

const Recommended = () => {
    const Recs = [
        {
            name: "Mount Bromo",
            slug: "mount-bromo", 
            loc: "East Java",
            rate: "4.7",
            img: "/Volcano.png"
        },
        {
            name: "Kawah Ijen",
            slug: "mount-ijen",
            loc: "Banyuwangi, East Java",
            rate: "4.7",
            img: "/Mountain.png"
        },
        {
            name: "Karimun Jawa",
            slug: "karimunjawa",
            loc: "Central Java",
            rate: "4.7",
            img: "/Turtle.png"
        },
        {
            name: "Raja Ampat Island",
            slug: "raja-ampat",
            loc: "West Papua",
            rate: "4.6",
            img: "/Fresh_Water.png"
        },
    ];

    return (
        <section className="min-w-full h-[80vh] flex flex-col items-center">
            {/* Header Section */}
            <div className="h-[25%] text-[#242D13] flex justify-center items-center">
                <h1 className="text-[3rem] font-bold tracking-tight abo">Recommended</h1>
            </div>

            {/* Carousel Container */}
            <div 
                id="carou" 
                className="h-[75%] w-full grid grid-cols-4 gap-6 pb-10 pt-2 px-4 shrink-0"
            >
                {Recs.map((rec) => (
                    <Link 
                        key={rec.slug} 
                        href={`/trips/${rec.slug}`} 
                        className="contents"
                    >
                        <Rec_Card 
                            name={rec.name} 
                            loc={rec.loc} 
                            rate={rec.rate} 
                            img={rec.img} 
                        />
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default Recommended;