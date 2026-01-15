import Image from "next/image";

const Footer = () => {
    return(
        <footer className="relative flex flex-col items-center bg-[#242D13] min-h-[30vh] h-[30vh] p-[0.5rem] gap-[.5rem]">
            <div className="flex justify  items-center min-h-[40%] w-[50%]">
                <div className="overflow-hidden flex items-center justify-center w-[65px] h-[65px] rounded-full bg-white max-w-[65px] max-h-[65px]">
                    <Image width='60' height='60' src="/logo.png"></Image>
                </div>
                <div>
                    <h3></h3>
                    <p></p>
                </div>
            </div>

            <div className="p-[0.5rem] min-h-[25%] bg-white w-full">awdawd</div>

            <div className="min-h-[25%] bg-white w-full">adawd</div>

            <div className="absolute top-0 right-0 bg-black h-full w-[10%] flex flex-col">

            </div>
        </footer>
    )
}

export default Footer;