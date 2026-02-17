import Image from "next/image";

const Image_Damper = (props) => {
    // 1. Buat pengecekan validitas URL
    // Kita pastikan src tidak kosong dan minimal punya panjang karakter yang masuk akal
    const isValidSrc = props.img && typeof props.img === 'string' && props.img.length > 5;
    
    // 2. Gunakan fallback jika URL tidak valid agar tidak muncul error "t"
    const imageSrc = isValidSrc ? props.img : "https://placehold.co/600x400?text=Image+Not+Found";

    return (
        <>
            <div className="w-full h-full relative">
                <div className="z-2 absolute w-full h-full bg-black/30"></div>
                <div className="z-1 absolute w-full h-full flex items-center justify-center">
                    <Image 
                        width={500} 
                        height={300} 
                        className="w-full h-full object-cover" 
                        src={imageSrc} 
                        alt={props.name || "Trip Image"}
                        // Tambahkan priority jika ini adalah banner utama
                        priority={true} 
                    />
                </div>
            </div>
        </>
    )
}

export default Image_Damper;