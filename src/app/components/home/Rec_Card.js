import Image from "next/image"
import arrow from "../../../../public/arrow.svg"

function Rec_Card(props) {
    return (
        /* Ganti Link jadi div, karena Link sudah ada di file Recommended.js */
        /* Pastikan lebar w-[25%] tetap ada di sini agar proporsi kembali normal */
        <div id="rec_card" className="group w-[full] min-w-75 h-full bg-[#e8e8da] relative flex items-end rounded-tl-4xl rounded-br-2xl overflow-hidden shadow-lg cursor-pointer">
            
            {/* BACKGROUND IMAGE SECTION */}
            <div className="absolute w-full h-full top-0 left-0 z-2">
                <div className="relative w-full h-full ">
                    <div className="absolute z-1 w-full h-full bg-black opacity-40"></div>
                    <Image 
                        id="img" 
                        width={500} 
                        height={500} 
                        className="object-cover w-full h-full z-0 absolute transition-transform duration-500 group-hover:scale-110" 
                        src={props.img} 
                        alt={props.name} 
                    />
                </div>
            </div>

            {/* OVERLAY VIEW MORE */}
            <span className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 abo z-4 absolute flex items-center justify-center text-white/80 bg-black/30 text-[24px] w-full h-full uppercase tracking-widest">
                view more
            </span>


            {/* TEXT CONTENT */}
            <div className="relative flex w-full items-end p-6 z-3">
                <div className="text-[#e8e8da]">
                    <h2 className="abo text-[25px] font-bold leading-tight">{props.name},</h2>
                    <p className="abo text-[15px] max-w-full opacity-80">{props.loc}</p>
                </div>
            </div>

            <div className="absolute flex gap-1 right-4 top-4 arti z-2 text-[28px] items-center justify-center text-[#e8e8da] font-light">
                <p>{props.rate}</p>
                <Image width={28} height={28} src={"/star.svg"} alt="star"></Image>
            </div>
        </div>
    )
}

export default Rec_Card;