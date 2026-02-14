'use client'

import Banner from "./Banner"
import Book_Form from "./Book_Form"

const Product_Info = (props) =>{
    return(
        <>
            <div className="flex flex-col min-h-[90vh] w-full">
                <Banner
                    title={props.title} loc={props.loc}
                    price={props.price} img={props.banner}
                    rating={props.rating}
                ></Banner>

                <Book_Form 
                    desc={props.desc} days={props.days}
                    slot={props.slot} img={props.img}
                    svg={props.others} map={props.map}
                ></Book_Form>
            </div>
        </>
    )
}

export default Product_Info;