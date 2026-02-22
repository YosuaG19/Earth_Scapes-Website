import Image from "next/image";
import Link from "next/link";
import x_logo from "../../../public/x.svg"
import yt_logo from "../../../public/youtube.svg"
import ig_logo from "../../../public/instagram.svg"

const Footer = () => {
    return(
        <>
            <footer className="relative flex flex-col justify-around content-center items-center bg-[#242D13] min-h-[25vh] h-[25vh] p-2">
                <div className="flex justify-center  items-center min-h-[50%] w-[50%] gap-6">
                    <div className="overflow-hidden flex items-center justify-center w-19.25 h-19.25 rounded-full bg-white max-w-25 max-h-25">
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
            </footer>
        </>
    )
}

export default Footer;