'use client'

import Banner from "./Banner"
import Book_Form from "./Book_Form"

const Product_Info = (props) => {
    const safeOthers = Array.isArray(props.others) ? props.others : [];

    return (
        <>
            <div className="flex flex-col min-h-[90vh] w-full">
                <Banner
                    title={props.title} 
                    loc={props.loc}
                    price={props.price} 
                    img={props.banner || props.img} 
                    rating={props.rating}
                />

                <Book_Form 
                    tripData={props.tripData} 
                    price={props.price}
                    desc={props.desc} 
                    days={props.days}
                    slot={props.slot} 
                    img={props.img}
                    svg={props.others} 
                    map={props.map}
                />
            </div>
        </>
    )
}

export default Product_Info;