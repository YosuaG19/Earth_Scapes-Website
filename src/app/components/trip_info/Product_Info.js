'use client'

import Banner from "./Banner"
import Book_Form from "./Book_Form"
import Payment from "../payment/Payment"

const Product_Info = () =>{
    return(
        <>
            <div className="flex flex-col min-h-[90vh] w-full">
                {/* <Payment></Payment> */}
                <Banner></Banner>

                <Book_Form></Book_Form>
            </div>
        </>
    )
}

export default Product_Info;