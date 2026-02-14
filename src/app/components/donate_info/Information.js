'use client'

import { useState, useRef } from "react";
import Image_Damper from "../Image_Damper";

const Information = (props) =>{
    const [activeTab, setActiveTab] = useState("overview");
    const Now = props.proggNow
    const Limit = props.proggLim
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [currentProgress, setCurrentProgress] = useState(props.proggNow);


    const AdderAmount = () =>{
        return donateChoice.current.value
    }

    const updateProgress = () => {
        if (!selectedAmount || selectedAmount <= 0) return;

        const newTotal = currentProgress + Number(selectedAmount);

        setCurrentProgress(newTotal);

        setSelectedAmount(0);
    };
    
    
    const ammount = [10000, 50000, 100000, 500000, 1000000, 2000000]
    const other = 0
    
    const formatIDR = (v) =>
        v === "" ? "" : "Rp " + new Intl.NumberFormat("id-ID").format(v);

    const parseIDR = (v) => {
        return Number(v.replace(/[^0-9]/g, ""));
    };
    
    const percentage = Math.min((currentProgress * 100) / Limit, 100);
    return(
        <>
            <div className="flex flex-col w-full px-[1.5rem]">
                <div className="flex items-start gap-[1rem] py-[1rem]">
                    <div className="w-[60%] flex flex-col justify-center pr-[1rem] border-r-[2.5px]">
                        <h2 style={{color: props.color}} className="text-[2.5rem]">Description</h2>
                        <p className="text-[14px] text-justify">{props.desc}</p>
                    </div>  
                    <div className="w-[40%] flex flex-col justify-end h-full gap-[1rem] pt-[1rem]">
                        <div className="flex gap-[1rem]">
                            <button onClick={() => setActiveTab("overview")}
                                style={activeTab === "overview"
                                    ? { color: props.color, borderBottomColor: props.color }
                                    : {}
                                }
                                className="border-b-2 border-transparent">
                                Overview
                            </button>

                            <button onClick={() => setActiveTab("impact")}
                                style={activeTab === "impact"
                                    ? { color: props.color, borderBottomColor: props.color }
                                    : {}
                                }
                                className="border-b-2 border-transparent">
                                Impact
                            </button>
                        </div>
                        
                        <div className="text-[14px] text-justify">
                            {activeTab === "overview" && (
                                <p>{props.orv}</p>
                            )}
                            {activeTab === "impact" && (
                                <p>{props.impact}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex pt-[1rem] h-[50vh] gap-[1rem]">
                    <div className="w-[50%] h-full flex flex-col">
                        <Image_Damper name='Forest' img='/Forest.png'></Image_Damper>
                    </div>
                    <div className="w-[50%] h-full flex flex-col justify-between items-center">
                        <h2 style={{color: props.color}} className="border-b-[4px] w-fit px-[2rem] text-[2.5rem]">Monthly Target</h2>
                        
                        <div className="w-full flex flex-col gap-[1.25rem]">
                            <div className="w-full flex flex-col gap-[.2rem]">
                                <p className="text-right text-[14px]">{formatIDR(currentProgress)} / {formatIDR(Limit)}</p>
                                <div style={{outlineColor: props.color}} className="outline-[3px] w-full relative h-[30px] rounded-full overflow-hidden">
                                    <span style={{width: percentage + '%', background: props.color}} className="absolute w-[65%] h-full left-0 bg-black rounded-full"></span>
                                </div>
                            </div>

                            <div>
                                <p>Select a donation ammount</p>
                                <div className="grid grid-cols-4 w-full gap-[.25rem]">
                                    {ammount.map((choice) => {
                                        // console.log(Book)
                                        return(
                                            <button onClick={() => setSelectedAmount(choice)} key={choice} className="px-[1rem] py-[.5rem] border-[1px] text-[12px]" 
                                                    style={selectedAmount === choice ? {backgroundColor: props.color, color: "#e8e8da", borderColor: props.color,} : {}}>
                                                {formatIDR(choice)}
                                            </button>
                                        )        
                                    })}
                                    <input
                                        type="text"
                                        placeholder="Other"
                                        value={selectedAmount === 0 ? "" : formatIDR(selectedAmount)}
                                        onChange={(e) => {
                                            const rawValue = parseIDR(e.target.value);
                                            setSelectedAmount(rawValue);
                                        }}
                                        className="col-span-2 px-[1rem] py-[.5rem] border-[1px] text-[12px]"
                                    />
                                </div>
                            </div>
                            <button style={{background: props.color}} onClick={updateProgress} type="button" className="self-center text-white w-[50%] py-[.5rem] rounded-[.5rem]">Donate</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Information;