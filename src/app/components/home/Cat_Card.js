import Image from "next/image"
import arrow from "../../../../public/arrow.svg"

function Cat_Card(props) {
    return (
        /* Tambahkan class 'group' untuk trigger animasi anak-anaknya */
        <div id="cat" className="group relative flex items-end h-full w-full bg-white rounded-r-2xl overflow-hidden p-2 shadow-xl/30 cursor-pointer">
            
            {/* IMAGE SECTION */}
            <div className="absolute w-full h-full top-0 left-0 z-2">
                <div className="relative w-full h-full">
                    {/* Overlay hitam yang sedikit menggelap saat hover */}
                    <div className="absolute z-1 w-full h-full bg-black opacity-25 group-hover:opacity-45 transition-opacity duration-500"></div>
                    
                    {/* Image dengan efek Zoom */}
                    <Image 
                        width={500} 
                        height={300} 
                        className="object-cover w-full h-full z-0 absolute transition-transform duration-700 group-hover:scale-110" 
                        src={props.img} 
                        alt={props.name}
                    />
                </div>
            </div>

            {/* ARROW BAR (Sisi Kanan) */}
            <div className="z-3 absolute flex items-center justify-center h-full w-[20%] bg-black/40 top-0 right-0 overflow-hidden">
                <Image 
                    className="h-[40%] transition-all duration-500 group-hover:scale-125 group-hover:translate-x-1" 
                    src={arrow} 
                    alt="arrow"
                />
            </div>

            {/* TEXT CONTENT (Sisi Kiri) */}
            <div className="z-3 w-[75%] bg-t absolute text-white p-4 transition-transform duration-500 group-hover:-translate-y-2">
                <h2 className="w-full text-[24px] arti font-bold">{props.name}</h2>
                {/* Detail muncul lebih jelas atau bergeser halus */}
                <p className="w-full text-[11px] arti opacity-80 group-hover:opacity-100 transition-opacity">
                    {props.detail}
                </p>
            </div>
        </div>
    )
}

export default Cat_Card;