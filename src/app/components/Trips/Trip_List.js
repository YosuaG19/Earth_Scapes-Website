import List_Items from "./List_Item";
import Trip_Filter from "./Trip_Filter";
import Trip_Page from "./Trip_Page";
import { tripsData } from "@/app/trips/trips";


const Trip_List = () =>{
    const items = Object.entries(tripsData);

    return(
        <>
            <div className="w-full p-[1.5rem] flex justify-between items-start relative">
                
                <div className="w-[32.5%] h-full sticky top-[25vh] left-[1.5rem]">
                    <Trip_Filter></Trip_Filter>
                </div>
                
                <div className="w-[65%] h-full gap-[1rem] flex flex-col items-end">
                    {items.map(([slug, item]) => {
                        // console.log(item)
                        return(
                            <List_Items 
                                key={slug} slug={slug} 
                                img={item.banner} name={item.title} 
                                cat={item.cat} desc={item.desc}
                                loc={item.loc} rating={item.rating}
                                days={item.days} price={item.price}
                            >
                            </List_Items>
                        )        
                    })}
                </div>
            </div>
            <Trip_Page></Trip_Page>
        </>
    )
}

export default Trip_List;