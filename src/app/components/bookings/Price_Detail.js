import Book_Card from "./Book_Card";
import Price_Card from "./Price_Card";


const Price_Detail = () => {
    return(
        <>
            <div className="min-w-full flex justify-between p-[2rem]">
                <div className="w-[55%]">
                    <Book_Card></Book_Card>
                </div>
                
                <div className="w-[42.5%]">
                    <Price_Card></Price_Card>
                </div>
            </div>
            
        </>
    )
}

export default Price_Detail;