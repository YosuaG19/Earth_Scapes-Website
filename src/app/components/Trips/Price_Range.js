"use client";
import { useRef, useEffect } from "react";

const Price_Range = ({ priceRange, setPriceRange }) => {
    const minLabelRef = useRef(null);
    const maxLabelRef = useRef(null);
    const minSliderRef = useRef(null);
    const maxSliderRef = useRef(null);
    const progressRef = useRef(null);

    const formatIDR = (v) =>
        v === "" ? "" : "Rp " + new Intl.NumberFormat("id-ID").format(v);

    const clean = (v) => v.toString().replace(/[^\d]/g, "");

    const updateProgress = (min, max) => {
        if (!minSliderRef.current || !maxSliderRef.current || !progressRef.current) return;
        const range = maxSliderRef.current.max - minSliderRef.current.min;
        progressRef.current.style.left =
            ((min - minSliderRef.current.min) / range) * 100 + "%";
        progressRef.current.style.width =
            ((max - min) / range) * 100 + "%";
    };

    const updateParentState = (min, max) => {
        setPriceRange({ min: parseInt(min) || 0, max: parseInt(max) || 0 });
    };

    const handleInput = (e, type) => {
        const input = e.target;
        const cursor = input.selectionStart;
        const raw = clean(input.value);

        if (!raw) {
            input.value = "";
            return;
        }

        // Tampilkan format Rp secara visual saja dulu
        const formatted = formatIDR(raw);
        const diff = formatted.length - input.value.length;
        input.value = formatted;
        input.setSelectionRange(cursor + diff, cursor + diff);

        // Update slider secara visual
        const val = parseInt(raw);
        if (type === "min") {
            minSliderRef.current.value = val;
        } else {
            maxSliderRef.current.value = val;
        }

        // Jangan langsung paksa min/max di sini biar ngetik angka kecil gak mental ke 0
        // Cukup lapor ke parent nilai aslinya
        const currentMin = type === "min" ? val : priceRange.min;
        const currentMax = type === "max" ? val : priceRange.max;
        
        updateProgress(currentMin, currentMax);
        updateParentState(currentMin, currentMax);
    };

    const handleBlur = () => {
        // Baru di sini kita lakukan validasi "pemaksaan" kalau min > max
        let min = parseInt(clean(minLabelRef.current.value)) || 0;
        let max = parseInt(clean(maxLabelRef.current.value)) || 0;

        if (min > max) {
            min = max; // Jika min kegedean, samain sama max
        }

        // Sinkronkan ulang tampilan
        minLabelRef.current.value = formatIDR(min);
        maxLabelRef.current.value = formatIDR(max);
        minSliderRef.current.value = min;
        maxSliderRef.current.value = max;

        updateProgress(min, max);
        updateParentState(min, max);
    };

    const handleSlider = (e) => {
        let min = parseInt(minSliderRef.current.value);
        let max = parseInt(maxSliderRef.current.value);

        // Logic slider tetap ketat agar handle tidak tumpang tindih
        if (e.target === minSliderRef.current && min > max) {
            max = min;
            maxSliderRef.current.value = max;
        }
        if (e.target === maxSliderRef.current && max < min) {
            min = max;
            minSliderRef.current.value = min;
        }

        minLabelRef.current.value = formatIDR(min);
        maxLabelRef.current.value = formatIDR(max);

        updateProgress(min, max);
        updateParentState(min, max);
    };

    useEffect(() => {
        if (minSliderRef.current && maxSliderRef.current) {
            minSliderRef.current.value = priceRange.min;
            maxSliderRef.current.value = priceRange.max;
            minLabelRef.current.value = formatIDR(priceRange.min);
            maxLabelRef.current.value = formatIDR(priceRange.max);
            updateProgress(priceRange.min, priceRange.max);
        }
    }, [priceRange]);

    return (
        <div className="border-[#324018] text-[#324018] border-2 rounded-tr-3xl p-3 flex flex-col gap-4">
            <h3>Price Range</h3>
            <div className="range-slider">
                <div className="range">
                    <input ref={minSliderRef} type="range" min="0" max="20000000" 
                        step="50000" onInput={handleSlider}/>

                    <input ref={maxSliderRef} type="range" min="0" max="20000000"
                        step="50000" onInput={handleSlider}/>

                    <div className="slider">
                        <div ref={progressRef} className="progress"></div>
                    </div>
                </div>

                <div className="flex justify-between gap-2 mt-4">
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-[10px]">Min Price</label>
                        <input ref={minLabelRef} type="text" className="text-[12px] border rounded p-1 outline-none"
                            onInput={(e) => handleInput(e, "min")} onBlur={handleBlur}/>
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-[10px]">Max Price</label>
                        <input ref={maxLabelRef} type="text" className="text-[12px] border rounded p-1 outline-none"
                            onInput={(e) => handleInput(e, "max")} onBlur={handleBlur}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Price_Range;