import Image from "next/image";
import profile from "../../../../public/logo.png"
import banner_bg from "../../../../public/banner_bg.png"

const Banner = () => {
    return(
        <div className="relative flex flex-col justify-end items-center min-w-full h-[80vh] bg-black/30 shadow-xl/30">
            <div className="z-[2] absolute w-[100%] h-[100%] bg-black opacity-[40%]"></div>

            <div className="z-[1] absolute flex justify-center items-center overflow-hidden w-[100%] h-[100%]">
                <Image className="" src={banner_bg}></Image>
            </div>

            {/* <div id="SearchBar" className="z-[9] bg-[#626F47] absolute flex flex-col justify-between items-center min-h-[40%] min-w-[70%] overflow-hidden rounded-t-[2rem] p-[2rem]">
                <div className="text-white flex justify-between w-[95%] min-h-[45%]">
                    <div className="flex items-center gap-[1rem] text-lg">
                        <Image className="max-h-[50px] max-w-[50px]" src={profile}></Image>            
                        <p>Username</p>
                    </div>
                    <button className="text-lg">eco-point</button>
                </div>

                <span className="w-[100%] bg-white h-[3px]"></span>

                <form className="w-[95%] flex justify-between min-h-[45%]">
                    <select id="Loc" className="text-[#626F47] text-lg p-[.5rem] rounded-[.5rem] min-h-[30px] bg-white min-w-[45%]">
                        <option value="placeholder" selected hidden>Choose City destination</option>
                        <option value="">Bogor, Jawa Barat</option>
                        <option value="">Malang, Jawa Timur</option>
                        <option value="">Lombok, NTB</option>
                    </select>
                    <select id="Cat" className="text-[#626F47] text-lg p-[.5rem] rounded-[.5rem] min-h-[30px] bg-white min-w-[30%]">
                        <option value="placeholder" selected hidden>Trip Categories</option>
                        <option>Mountain</option>
                        <option>Forest</option>
                        <option>Marine</option>
                        <option>Fresh Water</option>
                        <option>Coastal</option>
                        <option>Volcano</option>
                    </select>
                    <button type="search" id="Submit" className="text-[#626F47] p-[.5rem] rounded-[.5rem] min-h-[30px] bg-white min-w-[15%]">Search</button>
                </form>
            </div> */}
        </div>
    )
}

export default Banner;