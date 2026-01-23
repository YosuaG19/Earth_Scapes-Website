import Image_Damper from "../Image_Damper";
import Date_Selection from "./Date_Selection";

const Book_Form = () =>{

    return(
        <> 
            <form className="flex w-full px-[1.5rem] gap-[1rem]">
                {/* <label htmlFor="start">Start date:</label>
                <input type="date" id="start" name="trip-start" value="2026-01-23" min="2026-01-01" max="2026-12-31"></input> */}
                <div className="w-[70%] h-[40vh] bg-black">
                    <Date_Selection></Date_Selection>
                </div>
                <div className="w-[30%] h-[40vh] bg-white flex flex-col">
                    <Image_Damper name='Forest' img='/Forest.png'></Image_Damper>
                    
                    <button>Book</button>
                </div>
            </form>
        </>
    )
}

export default Book_Form;