

const Trip_Filter = () =>{
    const loc = [
        "East Java", "Central Java", "West Java", "Papua", "North Sumatera", "Central Kalimantan", "Yosua W G", "Angger D"
    ];
    
    const cat = [
        "Mountain", "Forest", "Marine", "Fresh Water", "Coastal", "Volcano"
    ];
  

    return(
        <>
            <div className="grid grid-rows-3 min-h-[70vh] h-[70vh] max-h-[70vh] bg-[#324018] gap-[1rem]">
                <div className="bg-white h-full w-full p-[1rem]">
                    <h3>Categories</h3>
                    <div className="grid grid-cols-2 grid-rows-auto">
                        {cat.map((names) => {
                            // console.log(cat)
                            return(
                                <span key={names} className="flex gap-[.5rem]">
                                    <input id="East Java" type="checkbox"></input>
                                    <label htmlFor="East Java">{names}</label>
                                </span>
                            )        
                        })}
                    </div>
                </div>

                <div className="bg-white h-full w-full p-[1rem]">
                    <h3>Price</h3>
                    <div>

                    </div>
                </div>

                <div className="bg-white h-full w-full p-[1rem]">
                    <h3>Location</h3>
                    <div className="grid grid-cols-2 grid-rows-auto">
                        {loc.map((place) => {
                            // console.log(cat)
                            return(
                                <span key={place} className="flex gap-[.5rem]">
                                    <input id="East Java" type="checkbox"></input>
                                    <label htmlFor="East Java">{place}</label>
                                </span>
                            )        
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Trip_Filter;