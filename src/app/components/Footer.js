import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return(
        <>
            <footer className="relative flex flex-col justify-around content-center items-center bg-[#242D13] min-h-[30vh] h-[30vh] p-[0.5rem]">
                <div className="flex justify-center  items-center min-h-[50%] w-[50%] gap-[1.5rem]">
                    <div className="overflow-hidden flex items-center justify-center w-[100px] h-[100px] rounded-full bg-white max-w-[100px] max-h-[100px]">
                        <Image width='95' height='95' src="/logo.png" alt="logo"></Image>
                    </div>
                    <div className="text-[#fffff3] flex flex-col items-start">
                        <h3 className="text-[3rem]">EarthScapes</h3>
                        <p className="text-[12px]">An Escape to Give Back to Earth</p>
                    </div>
                </div>

                <div className="p-[0.5rem] min-h-[20%] text-[#fffff3] w-full flex justify-center items-center gap-[2rem]">
                    <Link href="../">Explore Trips</Link>
                    <span className="h-[65%] w-[1px] bg-[#fffff3]"></span>
                    <Link href="../">Donate</Link>
                    <span className="h-[65%] w-[1px] bg-[#fffff3]"></span>
                    <Link href="../">About Us</Link>
                </div>

                <div className="min-h-[10%] text-[#fffff3] w-full flex flex-col items-center justify-center text-[10px]">
                    {/* <p></p> */}
                    <p>© 2026 EarthScape All rights reserved. Together, we explore and protect the earth.</p>
                </div>

                <div className="absolute top-0 right-0 h-full w-[5%] grid gird-rows-3 justify-center items-center pt-[1.5rem] pb-[1.5rem]">
                    <Link href="../">
                        <Image width="30" height="30" src="./instagram.svg" alt="Instagram"></Image>
                    </Link>

                    <Link href="../">
                        <Image width="30" height="30" src="./youtube.svg" alt="Youtube"></Image>
                    </Link>

                    <Link href="../">
                        <Image width="30" height="30" src="./x.svg" alt="X"></Image>
                    </Link>
                </div>
            </footer>
        </>
    )
}

export default Footer;