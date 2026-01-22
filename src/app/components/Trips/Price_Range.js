"use client";
import { useRef, useEffect } from "react";

const Price_Range = () =>{
    const minLabelRef = useRef(null);
    const maxLabelRef = useRef(null);
    const minSliderRef = useRef(null);
    const maxSliderRef = useRef(null);
    const progressRef = useRef(null);

    const formatIDR = (v) =>
        v === "" ? "" : "Rp " + new Intl.NumberFormat("id-ID").format(v);

    const clean = (v) => v.replace(/[^\d]/g, "");

    const updateProgress = (min, max) => {
        const range = maxSliderRef.current.max - minSliderRef.current.min;
        progressRef.current.style.left =
        ((min - minSliderRef.current.min) / range) * 100 + "%";
        progressRef.current.style.width =
        ((max - min) / range) * 100 + "%";
    };

    const handleInput = (e, type) => {
        const input = e.target;
        const cursor = input.selectionStart;

        const raw = clean(input.value);
        if (!raw) {
        input.value = "";
        return;
        }

        const formatted = formatIDR(raw);
        const diff = formatted.length - input.value.length;

        input.value = formatted;
        input.setSelectionRange(cursor + diff, cursor + diff);

        if (type === "min") minSliderRef.current.value = raw;
        if (type === "max") maxSliderRef.current.value = raw;

        const min = +minSliderRef.current.value;
        const max = +maxSliderRef.current.value;

        if (min > max) {
        if (type === "min") maxSliderRef.current.value = min;
        else minSliderRef.current.value = max;
        }

        updateProgress(
        +minSliderRef.current.value,
        +maxSliderRef.current.value
        );
    };

    const handleBlur = () => {
        let min = +clean(minLabelRef.current.value) || 0;
        let max = +clean(maxLabelRef.current.value) || 0;

        if (min > max) min = max;

        minSliderRef.current.value = min;
        maxSliderRef.current.value = max;

        minLabelRef.current.value = formatIDR(min);
        maxLabelRef.current.value = formatIDR(max);

        updateProgress(min, max);
    };

    const handleSlider = (e) => {
        let min = +minSliderRef.current.value;
        let max = +maxSliderRef.current.value;

        if (e.target === minSliderRef.current && min > max) {
            max = min;
            maxSliderRef.current.value = max;
        }

        if (e.target === maxSliderRef.current && max < min) {
            min = max;
            minSliderRef.current.value = min;
        }

        minLabelRef.current.value = formatIDR(minSliderRef.current.value);
        maxLabelRef.current.value = formatIDR(maxSliderRef.current.value);

        updateProgress(
        +minSliderRef.current.value,
        +maxSliderRef.current.value
        );
    };

    useEffect(() => {
        minLabelRef.current.value = formatIDR(minSliderRef.current.value);
        maxLabelRef.current.value = formatIDR(maxSliderRef.current.value);
        updateProgress(+minSliderRef.current.value,+maxSliderRef.current.value);
    }, []);


    return(
        <>
            <div className="range-slider">
                <div className="range">
                    <input ref={minSliderRef} type="range" min="0" max="20000000" 
                        step="50000" defaultValue="850000" onInput={handleSlider}/>

                    <input ref={maxSliderRef} type="range" min="0" max="20000000"
                        step="50000" defaultValue="15000000"onInput={handleSlider}/>

                    <div className="slider">
                        <div ref={progressRef} className="progress"></div>
                    </div>
                </div>

                <input ref={minLabelRef} type="text" className="text-[12px]"
                onInput={(e) => handleInput(e, "min")} onBlur={handleBlur}/>
                <input ref={maxLabelRef} type="text" className="text-[12px]"
                onInput={(e) => handleInput(e, "max")} onBlur={handleBlur}/>

            </div>
        </>
    )
}

export default Price_Range;