'use client'

import Image_Damper from "../Image_Damper";
import Information from "./Information";

const Book_Form = () =>{

    return(
        <> 
            <form className="flex w-full px-[1.5rem] gap-[1rem] h-[60vh]">
                <div className="w-[30%] h-full bg-white flex flex-col">
                    <Image_Damper name='Forest' img='/Forest.png'></Image_Damper>
                </div>
                <div className="w-[70%] h-full flex justify-center">
                    <Information></Information>
                </div>
            </form>
        </>
    )
}

export default Book_Form;