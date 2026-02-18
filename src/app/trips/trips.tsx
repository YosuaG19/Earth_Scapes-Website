export const tripsData = {
  Mount_Bromo :{
    title: "Mount Bromo",
    map: "https://www.google.com/maps?q=-7.9425,112.9530&output=embed&z=13&t=k",
    loc: "East Java",
    cat: "Volcano",
    desc: "This trip features sunrise trekking across volcanic landscapes while introducing participants to the Tengger community’s culture and environmental preservation practices around active volcanoes.",
    days: 2, 
    price: 1500000,
    slot: 12,
    rating: 4.8, 
    others: {
      Electricity: "/electricity.svg",
      Water: "/water.svg",
      Insured: "/insured.svg",
      Signal: "/connection.svg",
      Guided: "/guided.svg",
      Photographer: "/camera.svg"
    },
    banner: "/trip_img/bromo1.png",
    img : {
      img2: "/trip_img/bromo2.png",
      img3: "/trip_img/bromo3.png",
    }
  }, 
        
  Dieng_Pleteau:{
    title: "Dieng Pleteau",
    map: "https://www.google.com/maps?q=-7.2043,109.9103&output=embed&z=13&t=k",
    loc: "Central Java",
    cat: "Mountain",
    desc: "The trip explores Dieng’s highland landscapes, volcanic craters, and cultural heritage sites while introducing sustainable agriculture and eco-tourism practices.",
    days: 3, 
    price: 2200000,
    slot: 8,
    rating: 4.7, 
    others: {
      Electricity: "/electricity.svg",
      Water: "/water.svg",
      Insured: "/insured.svg",
      Signal: "/connection.svg",
      Guided: "/guided.svg",
      Bedding: "/bedding.svg"
    },
    banner: "/trip_img/dieng1.png",
    img : {
      img2: "/trip_img/dieng2.png",
      img3: "/trip_img/dieng3.png",
    }
  },
        
  Mount_Rinjani:{
    title: "Mount Rinjani",
    map: "https://www.google.com/maps?q=-8.4113,116.4573&output=embed&z=12&t=k",
    loc: "West Nusa Tenggara",
    cat: "Mountain",
    desc: "A multi-day trekking trip that leads participants to Lake Segara Anak while promoting trail clean-up activities and environmental responsibility in mountain conservation.",
    days: 7, 
    price: 15000000,
    slot: 10,
    rating: 5.0, 
    others: {
      Electricity: "/electricity.svg",
      Water: "/water.svg",
      Insured: "/insured.svg",
      Guided: "/guided.svg",
      Camping: "/camp.svg",
    },
    banner: "/trip_img/rinjani1.png",
    img : {
      img2: "/trip_img/rinjani2.png",
      img3: "/trip_img/rinjani3.png",
    }
  },
        
            
  Mount_Merapi:{
    title: "Mount Merapi",
    map: "https://www.google.com/maps?q=-7.5407,110.4461&output=embed&z=13&t=k",
    loc: "Yogyakarta",
    cat: "Volcano",
    desc: "This educational volcano trip combines lava tours with disaster awareness programs and village visits, offering insights into volcanic activity and community resilience.",
    days: 3, 
    price: 1500000,
    slot: 15,
    rating: 4.6, 
    others: {
      Electricity: "/electricity.svg",
      Water: "/water.svg",
      Insured: "/insured.svg",
      Guided: "/guided.svg",
      Camping: "/camp.svg",
    },
    banner: "/trip_img/merapi1.png",
    img : {
      img2: "/trip_img/merapi2.png",
      img3: "/trip_img/merapi3.png",
    }
  },
        
  Sedari_Mangrove_Forest:{
    title: "Sedari Manggrove Forest",
    map: "https://www.google.com/maps?q=-6.0135,107.3285&output=embed&z=14&t=",
    loc: "Karawang, West Java",
    cat: "Forest",
    desc: "This urban conservation trip emphasizes mangrove planting, bird watching, and coastal ecosystem education to raise awareness of environmental protection in city areas.",
    days: 2, 
    price: 850000,
    slot: 15,
    rating: 4.2, 
    others: {
      Water: "/water.svg",
      Insured: "/insured.svg",
      Signal: "/connection.svg",
      Guided: "/guided.svg",
    },
    banner: "/trip_img/sedari1.png",
    img : {
      img2: "/trip_img/sedari2.png",
      img3: "/trip_img/sedari3.png",
    }
  },
} as const;
