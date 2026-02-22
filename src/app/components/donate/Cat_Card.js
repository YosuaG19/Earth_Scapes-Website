import Image from "next/image";
import arrow from "../../../../public/arrow.svg";
import Link from "next/link";

function Cat_Card({ name, detail, img, slug }) {
  return (
    <Link href={`/donate/${slug}`}
    className="group relative flex items-end h-full w-full bg-white rounded-r-2xl overflow-hidden p-2 shadow-xl/30 cursor-pointer">

      <div className="absolute w-full h-full top-0 left-0 z-2">
        <div className="relative w-full h-full">
          <div className="absolute z-1 w-full h-full bg-black opacity-25 group-hover:opacity-45 transition-opacity duration-500"></div>
          <Image width={500} height={300} className="object-cover w-full h-full z-0 absolute transition-transform duration-700 group-hover:scale-110" src={img} alt={name} />
        </div>
      </div>

      <div className="z-3 absolute flex items-center justify-center h-full w-[20%] bg-black/40 top-0 right-0 overflow-hidden">
          <Image 
              className="h-[40%] transition-all duration-500 group-hover:scale-125 group-hover:translate-x-1" 
              src={arrow} 
              alt="arrow"
          />
      </div>

      <div className="z-3 w-[75%] bg-t absolute text-white py-2 pl-2 transition-transform duration-500 group-hover:-translate-y-2">
        <h2 className="w-full text-[24px] arti font-medium">{name}</h2>
        <p className="w-full text-[11px] arti opacity-80 group-hover:opacity-90 transition-opacity">{detail}</p>
      </div>
    </Link>
  );
}

export default Cat_Card;
