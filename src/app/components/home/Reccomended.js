'use client'
import Rec_Card from "./Rec_Card";
import Link from "next/link";

const Recommended = () => {
    // Data Hardcoded - Pastikan SLUG sesuai dengan yang ada di database Supabase
    const Recs = [
        {
            name: "Bromo",
            slug: "mount-bromo", 
            loc: "Jawa Timur",
            rate: "4.5",
            img: "/Volcano.png"
        },
        {
            name: "Kawah Ijen",
            slug: "kawah-ijen",
            loc: "Jawa Timur",
            rate: "4.5",
            img: "/Mountain.png"
        },
        {
            name: "Karimun Jawa",
            slug: "karimun-jawa",
            loc: "Jawa Tengah",
            rate: "4.5",
            img: "/Turtle.png"
        },
        {
            name: "Raja Ampat",
            slug: "raja-ampat",
            loc: "Papua Barat",
            rate: "4.5",
            img: "/Fresh_Water.png"
        },
        {
            name: "Pulau Seribu",
            slug: "pulau-seribu",
            loc: "DKI Jakarta",
            rate: "4.5",
            img: "/Coastal.png"
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
                className="h-[75%] w-full flex overflow-x-auto gap-6 pb-10 pt-2 px-8 no-scrollbar shrink-0"
            >
                {Recs.map((rec) => (
                    /* contents: Membuat Link 'transparan' secara layout 
                       agar Rec_Card tetap dibaca sebagai anak langsung Flexbox 
                    */
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