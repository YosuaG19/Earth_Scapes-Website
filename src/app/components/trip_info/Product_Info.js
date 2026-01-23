'use client'

import { useRouter } from "next/navigation"
import Banner from "./Banner"
import Book_Form from "./Book_Form"

const Product_Info = () =>{
    const router = useRouter()

    return(
        <>
            <div className="flex flex-col min-h-[90vh] w-full">
                <Banner></Banner>

                <Book_Form></Book_Form>
            </div>
        </>
    )
}

export default Product_Info;