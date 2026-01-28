import Image from "next/image";
import arrow from "../../../../public/arrow.svg";
import Link from "next/link";

function Cat_Card({ name, detail, img, slug }) {
  return (
    <div className="relative flex items-end h-full w-full bg-white rounded-r-[1rem] overflow-hidden p-[.5rem] shadow-xl/30">

      <div className="absolute w-full h-full top-0 left-0 z-[2]">
        <div className="relative w-full h-full">
          <div className="absolute z-[1] w-full h-full bg-black opacity-[25%]"></div>
          <Image width={500} height={300} className="object-cover w-full h-full" src={img} alt={name} />
        </div>
      </div>

      <Link
        href={`/donate/${slug}`}
        className="z-[3] absolute flex items-center justify-center h-full w-[20%] bg-black/40 top-0 right-0"
      >
        <Image className="h-[40%]" src={arrow} alt="arrow" />
      </Link>

      <div className="z-[3] w-[75%] absolute text-white">
        <h2 className="text-[24px] arti">{name}</h2>
        <p className="text-[11px] arti">{detail}</p>
      </div>
    </div>
  );
}

export default Cat_Card;
