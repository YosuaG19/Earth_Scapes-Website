import Cat_Card from "./Cat_Card";

const Cats = [
  {
    name: "Land Ecosystem",
    slug: "land",
    detail: "Scenic mountain landscapes and highland trails.",
    img: "/Mountain.png",
  },
  {
    name: "Forestation",
    slug: "forest",
    detail: "Lush forests rich in biodiversity and greenery.",
    img: "/Forest.png",
  },
  {
    name: "Marine Ecosystem",
    slug: "marine",
    detail: "Ocean views and vibrant marine ecosystems.",
    img: "/Turtle.png",
  },
];

const Categories = () => {
  return (
    <section className="min-w-full h-[50vh] flex flex-col items-center">
      <div className="h-[30%] text-[#242D13] flex justify-center items-center">
        <h1 className="text-[3rem] abo">Donations</h1>
      </div>

      <div className="h-[70%] w-full grid grid-cols-3 gap-[1.5rem] px-[2.5rem]">
        {Cats.map((cat) => (
          <Cat_Card key={cat.slug} {...cat} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
