const Price_Card = () =>{
    const Booked = [
        {
            name: "Bromo",
            price: "2.000.000"
        },
        {
            name: "Kawah Ijen",
            price: "2.000.000"
        },
        {
            name: "Raja Ampat",
            price: "2.000.000"
        },
        {
            name: "Tung Tung Sahur",
            price: "2.000.000"
        },
    ];
    return(
        <>
            <div className="min-h-[70vh] h-[70vh] bg-[#242D13] text-[#e8e8da] flex flex-col gap-[1rem] items-center justify-between p-[1rem] shadow-xl/30 rounded-r-[1rem]">
                <div className="flex flex-col h-[80%] max-h-[80%] w-full items-center gap-[.5rem]">
                    <div className="min-h-[65%] w-full flex flex-col gap-[.3rem] overflow-y-scroll">
                        {Booked.map((Books) => {
                            // console.log(Books)
                            return(
                                <div key={Books.name} className="min-h-[10%] flex justify-between w-full items-center">
                                    <p>{Books.name}</p>
                                    <p>{Books.price}</p>
                                </div>
                            )        
                        })}
                    </div>

                    <div className="h-[2px] bg-[#e8e8da] w-full "></div>

                    <div className="flex justify-between w-full">
                        <p>Total Price</p>
                        <p>Rp x.xxx.xxx</p>
                    </div>
                </div>

                

                <button className="bg-[#e8e8da] text-[#242D13] w-full rounded-r-[.5rem] text-center text-[20px] p-[.2rem]">Pay Now</button>
                
            </div>
        </>
    )
}

export default Price_Card;