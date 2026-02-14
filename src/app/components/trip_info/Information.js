'use client'

import { useState } from "react";
// import "../../globals.css";
import DateSelection from "./Date_Selection";
import Description from "./Description";

const Information = (props) => {
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Tabs */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setActiveTab("Description")}
          className={`border-b-2 ${
            activeTab === "Description" ? "border-[#5a7527] text-[#5a7527]" : "border-transparent"
          }`}
        >
          Description
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("Select Date")}
          className={`border-b-2 ${
            activeTab === "Select Date" ? "border-[#5a7527] text-[#5a7527]" : "border-transparent"
          }`}
        >
          Select Date
        </button>
      </div>

      {/* Content (PAKE HIDDEN → STATE AMAN) */}
      <div hidden={activeTab !== "Description"}>
        <Description 
          desc={props.desc} days={props.days}
          slot={props.slot} svg={props.svg} 
        />
      </div>

      <div hidden={activeTab !== "Select Date"}>
        <DateSelection />
      </div>
    </div>
  );
};

export default Information;