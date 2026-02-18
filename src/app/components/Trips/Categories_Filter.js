'use client'

// Kita terima props dari Trip_Filter (Bapak)
const Categories_Filter = ({ selectedCat, setSelectedCat }) => {
    const cat = [
        "Mountain", "Forest", "Marine", "Fresh Water", "Coastal", "Volcano"
    ];

    // Fungsi toggle sekarang mengupdate state yang ada di Trip_List
    const toggleCategory = (name) => {
        setSelectedCat((prev) =>
            prev.includes(name)
                ? prev.filter((c) => c !== name)
                : [...prev, name]
        );
    };

    const clearCategories = () => {
        setSelectedCat([]);
    };

    return (
        <>
            <div className="border-[#324018] text-[#324018] border-[2px] rounded-tr-[1.5rem] h-full w-full p-[.75rem] flex flex-col gap-[.2rem]">
                <div className="flex w-full justify-between">
                    <h3>Categories</h3>
                    <button 
                        type="button" 
                        onClick={clearCategories} 
                        className="text-[12px] px-[.75rem] py-[.25rem] rounded-tr-[.5rem] hover:bg-[#324018] hover:text-[#e8e8da] transition"
                    >
                        Clear
                    </button>
                </div>
                <div className="grid grid-cols-2 grid-rows-auto gap-[.35rem]">
                    {cat.map((names) => {
                        return (
                            <span key={names} className="flex gap-[.5rem] text-[12px]">
                                <input 
                                    className="cursor-pointer" 
                                    id={names} 
                                    type="checkbox" 
                                    // Mengecek ke state pusat apakah kategori ini terpilih
                                    checked={selectedCat.includes(names)} 
                                    onChange={() => toggleCategory(names)}
                                />
                                <label className="cursor-pointer" htmlFor={names}>{names}</label>
                            </span>
                        )        
                    })}
                </div>
            </div>
        </>
    )
}

export default Categories_Filter;