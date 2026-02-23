'use client'

const Trip_Page = ({ totalPages, currentPage, onPageChange }) => {
    // Tentukan berapa banyak angka yang mau ditampilkan dalam satu jendela
    const windowSize = 5;
    
    // Tentukan awal dari jendela angka (misal: 1, 6, 11, dst)
    // Rumus: Jika di hal 6, startWindow adalah 6. Jika di hal 5, startWindow adalah 1.
    const startWindow = Math.floor((currentPage - 1) / windowSize) * windowSize + 1;
    const endWindow = Math.min(startWindow + windowSize - 1, totalPages);

    const pages = [];
    for (let i = startWindow; i <= endWindow; i++) {
        pages.push(i);
    }

    return (
        <div className="flex gap-3 justify-end pl-8 pr-8 pb-8 items-center">
            {/* Tombol Back/Previous (Opsional tapi membantu jika sudah di page > 5) */}
            {startWindow > 1 && (
                <p 
                    onClick={() => onPageChange(startWindow - 1)}
                    className="cursor-pointer flex items-center justify-center w-7.5 h-7.5 bg-[#324018] text-[#e8e8da] rounded-tl-xl hover:bg-[#4a5f24]"
                >
                    ...
                </p>
            )}

            {/* Angka Pagination (1-5, 6-10, dst) */}
            {pages.map((page) => (
                <p 
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`cursor-pointer flex items-center justify-center w-7.5 h-7.5 text-[15px] rounded-tl-xl transition-all
                        ${currentPage === page 
                            ? "bg-[#88ab41] text-[#e8e8da] scale-110 shadow-lg" 
                            : "bg-[#324018] text-[#e8e8da] hover:bg-[#4a5f24]"
                        }`}
                >
                    {page}
                </p>
            ))}

            {/* Tombol Next / Titik-titik untuk ke range selanjutnya */}
            {endWindow < totalPages && (
                <p 
                    onClick={() => onPageChange(endWindow + 1)}
                    className="cursor-pointer flex items-center justify-center w-7.5 h-7.5 bg-[#324018] text-[#e8e8da] rounded-tl-xl hover:bg-[#4a5f24]"
                >
                    ...
                </p>
            )}
        </div>
    );
}

export default Trip_Page;