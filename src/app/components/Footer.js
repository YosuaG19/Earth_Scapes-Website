import Image from "next/image";
import Link from "next/link";
import x_logo from "../../../public/x.svg"
import yt_logo from "../../../public/youtube.svg"
import ig_logo from "../../../public/instagram.svg"

const Footer = () => {
    return(
        <>
            <footer className="relative flex flex-col justify-around content-center items-center bg-[#242D13] min-h-[25vh] h-[25vh] p-[0.5rem]">
                <div className="flex justify-center  items-center min-h-[50%] w-[50%] gap-[1.5rem]">
                    <div className="overflow-hidden flex items-center justify-center w-[77px] h-[77px] rounded-full bg-white max-w-[100px] max-h-[100px]">
                        <Image width='70' height='70' src="/logo.png" alt="logo"></Image>
                    </div>
                    <div className="text-[#e8e8da] flex flex-col items-start">
                        <h3 className="text-[2.5rem]">EarthScapes</h3>
                        <p className="-mt-[.1rem] text-[12px]">An Escape to Give Back to Earth</p>
                    </div>
                </div>

                <div className="min-h-[10%] text-[#e8e8da] w-full flex flex-col items-center justify-center text-[10px]">
                    <p>© 2026 EarthScape All rights reserved. Together, we explore and protect the earth.</p>
                </div>

                <div className="absolute top-0 right-0 h-full w-[5%] grid gird-rows-3 justify-center items-center py-[1rem]">
                    <Link href="../">
                        <Image width="25" height="25" src={ig_logo} alt="Instagram"></Image>
                    </Link>

                    <Link href="../">
                        <Image width="25" height="25" src={yt_logo} alt="Youtube"></Image>
                    </Link>

                    <Link href="../">
                        <Image width="25" height="25" src={x_logo} alt="X"></Image>
                    </Link>
                </div>
            </footer>
        </>
    )
}

export default Footer;