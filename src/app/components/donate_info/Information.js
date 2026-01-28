'use client'

import { useState } from "react";

const Information = (props) =>{
    const [activeTab, setActiveTab] = useState("overview");


    return(
        <>
            <div className="grid grid-rows-2 w-full h-[65vh] px-[2.5rem]">
                <div className="flex gap-[1rem]">
                    <div className="w-[50%] flex flex-col justify-center">
                        <h2 className="text-[3rem]">Title Description</h2>
                        <p>Praesent ultrices eget felis at accumsan. Etiam dolor risus, feugiat vitae fermentum ut, tempus ac neque. Sed imperdiet velit sit amet lectus ullamcorper posuere. Maecenas ullamcorper, orci ut lobortis elementum.</p>
                    </div>
                    <div className="w-[50%] flex flex-col justify-center gap-[1rem]">
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
                        
                        <div className="text-sm leading-relaxed">
                            {activeTab === "overview" && (
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
                            )}
                            {activeTab === "impact" && (
                                <p> Donation kamu membantu konservasi alam, mengurangi kerusakan ekosistem, dan mendukung komunitas lokal.</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row-reverse gap-[1rem]">
                    <div className="w-[50%] flex flex-col justify-center">
                        <h2 className="text-[3rem]">Title Description</h2>
                        <p>Praesent ultrices eget felis at accumsan. Etiam dolor risus, feugiat vitae fermentum ut, tempus ac neque. Sed imperdiet velit sit amet lectus ullamcorper posuere. Maecenas ullamcorper, orci ut lobortis elementum.</p>
                    </div>
                    <div className="w-[50%] flex flex-col justify-center gap-[1rem]">
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
                        
                        <div className="text-sm leading-relaxed">
                            {activeTab === "overview" && (
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
                            )}
                            {activeTab === "impact" && (
                                <p> Donation kamu membantu konservasi alam, mengurangi kerusakan ekosistem, dan mendukung komunitas lokal.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Information;