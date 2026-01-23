import List_Items from "./List_Item";
import Trip_Filter from "./Trip_Filter";
import Trip_Page from "./Trip_Page";
import { useState } from "react";


const Trip_List = () =>{
    const [Items, setItems] = useState([
        {
            name: "Mountain"            
        },
        {
            name: "Forest"
        },
        {
            name: "Marine"
        },
        {
            name: "Fresh Water"
        },
        {
            name: "Coastal"
        }
    ]);


    return(
        <>
            <div className="w-full p-[1.5rem] flex justify-between items-start relative">
                
                <div className="w-[33.5%] h-full sticky top-[25vh] left-[1.5rem]">
                    <Trip_Filter></Trip_Filter>
                </div>
                
                <div className="w-[65%] h-full gap-[1rem] flex flex-col items-end">
                    {Items.map((item) => {
                        // console.log(item)
                        return(
                            <List_Items key={item.name}></List_Items>
                        )        
                    })}
                </div>
            </div>
            <Trip_Page></Trip_Page>
        </>
    )
}

export default Trip_List;