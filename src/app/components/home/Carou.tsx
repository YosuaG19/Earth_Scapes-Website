import Image from "next/image";
import { useRef } from "react";

const destinations = [
  { id: 1, title: "Cappadocia, Turkey", img: "/Mountain.png" },
  { id: 2, title: "Utah, USA", img: "/Volcano.png" },
  { id: 3, title: "Hot Air Balloon", img: "/Turtle.png" },
  { id: 4, title: "Desert", img: "/Forest.png" },
];

const Carou = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-6 py-10">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Popular Destinations</h2>

        <div className="flex gap-3">
          <button
            onClick={() => scroll("left")}
            className="rounded-full border p-2 hover:bg-gray-100"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            className="rounded-full border p-2 hover:bg-gray-100"
          >
            →
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {destinations.map((item) => (
          <div
            key={item.id}
            className="relative h-[360px] min-w-[240px] overflow-hidden rounded-2xl"
          >
            <Image
              src={item.img}
              alt={item.title}
              fill
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-sm font-medium text-white">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Carou;
