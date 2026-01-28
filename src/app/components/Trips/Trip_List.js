import List_Items from "./List_Item";
import Trip_Filter from "./Trip_Filter";
import Trip_Page from "./Trip_Page";


const Trip_List = () =>{
    const Items = [
        {
            name: "Mount Bromo",
            cat: "Mountain",
            img : "/trip_img/bromo1.png"
        },
        {
            name: "Dieng Pleteau",
            cat: "Mountain",
            img : "/trip_img/dieng1.png"
        },
        {
            name: "Mount Rinjani",
            cat: "Volcano",
            img : "/trip_img/rinjani1.png"
        },
        {
            name: "Mount Merapi",
            cat: "Volcano",
            img : "/trip_img/merapi1.png"
        },
        {
            name: "Sedari Mangrove Forest",
            cat: "Forest",
            img : "/trip_img/sedari1.png"
        }
    ];


    return(
        <>
            <div className="w-full p-[1.5rem] flex justify-between items-start relative">
                
                <div className="w-[32.5%] h-full sticky top-[25vh] left-[1.5rem]">
                    <Trip_Filter></Trip_Filter>
                </div>
                
                <div className="w-[65%] h-full gap-[1rem] flex flex-col items-end">
                    {Items.map((item) => {
                        // console.log(item)
                        return(
                            <List_Items key={item.name} slug={item.name} img={item.img} name={item.name} cat={item.cat}></List_Items>
                        )        
                    })}
                </div>
            </div>
            <Trip_Page></Trip_Page>
        </>
    )
}

export default Trip_List;