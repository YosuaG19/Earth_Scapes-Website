import Image from "next/image";
import profile from "../../../../public/logo.png"

const Banner = () => {
    return(
        <section className="relative flex flex-col justify-end items-center min-w-full min-h-[75vh] bg-black/30">
            <div className="absolute">
                
            </div>

            <div id="SearchBar" className="absolute flex flex-col justify-center items-center min-h-[35%] min-w-[75%] overflow-hidden rounded-t-[2rem] bg-black gap-[1.5rem]">
                <div className="text-white flex justify-between w-[85%]">
                    <div className="flex items-center gap-[1rem]">
                        <Image className="max-h-[50px] max-w-[50px]" src={profile}></Image>            
                        <p>Username</p>
                    </div>
                    <button>eco-point</button>
                </div>

                <span className="w-[90%] bg-white h-[10px]"></span>

                <form className="w-[85%] flex justify-between">
                    <select id="Loc" className="bg-white">
                        <option value="">Bogor, Jawa Barat</option>
                        <option value="">Malang, Jawa Timur</option>
                        <option value="">Lombok, NTB</option>
                    </select>
                    <select id="Cat" className="bg-white" type="">
                        <option></option>
                    </select>
                    <button type="search" id="Submit" className="bg-white">Search</button>
                </form>
            </div>
        </section>
    )
}

export default Banner;