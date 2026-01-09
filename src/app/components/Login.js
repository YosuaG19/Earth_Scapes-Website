import Image from "next/image"
import SignIn from "../../../public/sign in.jpg"

export default function Login(){
    return(
        <>
            <section className="w-screen h-screen flex justify-center items-center">
                <div className="login bg-white w-[70vw] h-[60vh] text-black grid grid-cols-2 rounded-[1rem] shadow-xl/30 overflow-hidden">
                    <div className="h-full w-full justify-items-center items-end bg-[src{SignIn}] ">
                        {/* <Image className="w-full" src={SignIn} alt="Disc"></Image> */}
                    </div>
                    <div className="h-full w-full bg-[#626F47] flex-col justify-items-center items-center">
                        <h1>Sign In Eaerthscape</h1>
                    </div>
                </div>
            </section>
        </>
    )
}