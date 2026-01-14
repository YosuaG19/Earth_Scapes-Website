import Link from "next/link";
import Image from "next/image"
import bg_SignIn from "../../../public/login.png"



export default function SignIn(){
    return(
        <>
            <section className="w-screen h-screen flex justify-center items-center">
                <div className="bg-white w-[70vw] h-[70vh] rounded-[1rem] shadow-xl/30 overflow-hidden grid grid-cols-2">
                    
                    <div className="h-full w-full relative overflow-hidden">
                        <div className="absolute h-[100%] w-[100%] bg-black opacity-[30%] z-[10]"></div>
                        <Image className="absolute right-[-125] min-h-[100%] min-w-[200%] z-[1]" src={bg_SignIn} alt="Disc"></Image>
                    </div>
                    
                    <form className="h-full w-full bg-[#626F47] flex flex-col justify-center items-center gap-[1.5rem]" rel="../home/page">
                        <h1 className="text-[2.5rem] text-[#F5ECD5]">EarthScape</h1>
                        <div className="flex flex-col w-[60%]">
                            <label className="text-lg text-[#F5ECD5]" htmlFor="email">Email Address :</label>
                            <input className="text-[#626F47] bg-[#F5ECD5] p-[.3rem] rounded-[.5rem] h-[40px]" type="text" id="email" autoComplete="email"></input>
                        </div>

                        <div className="flex flex-col w-[60%]">
                            <label className="text-lg text-[#F5ECD5]" htmlFor="pass">Password :</label>
                            <input className="text-[#626F47] bg-[#F5ECD5] p-[.3rem] rounded-[.5rem] h-[40px]" type="text" id="pass"></input>
                            <a className="underline underline-offset-2 text-[#F5ECD5]" href="">forgot password?</a>
                        </div>

                        <div className="flex flex-col w-[45%] mt-[1rem]">
                            <button className="text-[#636F47] text-xl font-medium bg-[#F5ECD5] p-[.3rem] rounded-[.5rem] h-[40px]" type="submit">Sign In</button>
                        </div>

                        <div className="text-[#F5ECD5]">
                            <span>Don't have account? <Link className="underline underline-offset-2" href="../signup">Sign Up</Link></span>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}