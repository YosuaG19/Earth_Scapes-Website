import Link from "next/link";
import Image from "next/image"
import bg_SignIn from "../../../public/login.png"



export default function SignIn(){
    return(
        <>
            <div className="w-screen h-screen flex justify-center items-center">
                <div className="bg-white w-[70vw] h-[70vh] rounded-[1rem] shadow-xl/30 overflow-hidden grid grid-cols-2">
                    
                    <div className="h-full w-full relative overflow-hidden">
                        <div className="absolute h-[100%] w-[100%] bg-black opacity-[30%] z-[10]"></div>
                        <Image className="absolute right-[-125] min-h-[100%] min-w-[200%] z-[1]" src={bg_SignIn} alt="Disc"></Image>
                    </div>
                    
                    <form className="h-full w-full bg-[#242D13] flex flex-col justify-center items-center gap-[1.1rem]" rel="../home/page">
                        <h1 className="text-[2.5rem] text-[#fffff3]">EarthScape</h1>

                        <div className="flex flex-col w-[60%]">
                            <input placeholder="Email Address" className="text-[#626F47] bg-[#fffff3] p-[.3rem] rounded-[.5rem] h-[35px]" type="text" id="email" autoComplete="email"></input>
                        </div>

                        <div className="flex flex-col w-[60%] gap-[.2rem]">
                            <input placeholder="Password" className="text-[#626F47] bg-[#fffff3] p-[.3rem] rounded-[.5rem] h-[35px]" type="text" id="pass"></input>
                            <a className="underline underline-offset-2 text-[#fffff3] text-[11px]" href="">Forgot Password?</a>
                        </div>

                        <div className="flex flex-col w-[30%] mt-[1rem]">
                            <button className="text-[#636F47] text-[18px] font-medium bg-[#fffff3] p-[.3rem] rounded-[.5rem] h-[40px]" type="submit">Sign In</button>
                        </div>

                        <div className="text-[#fffff3] text-[13px]">
                            <span>Don't have account? <Link className="underline underline-offset-2" href="./signup">Sign Up</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}