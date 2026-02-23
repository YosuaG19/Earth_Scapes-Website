'use client'

import { useState, useEffect } from "react";
import Script from "next/script";
import DateSelection from "./Date_Selection";
import Description from "./Description";
import Add_Guest from "../payment/Add_Guest"; 
import Add_Payment from "../payment/Add_Payment"; 

const Information = (props) => {
  const [activeTab, setActiveTab] = useState("Description");
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [passengers, setPassengers] = useState([]);
  const [includeOwner, setIncludeOwner] = useState(true);
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });

  const handleDateApplied = (s, e) => {
    setStartDate(s);
    setEndDate(e);
    setShowGuestPopup(true);
  };

  const handleGuestConfirmed = () => {
    setShowGuestPopup(false);
    setShowPaymentPopup(true);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Script 
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="beforeInteractive"
      />

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

      <div hidden={activeTab !== "Description"} className="h-full">
        <Description 
          desc={props.desc} days={props.days}
          slot={props.slot} svg={props.svg} 
          map={props.map}
        />
      </div>

      <div hidden={activeTab !== "Select Date"}>
        <DateSelection 
          onApply={handleDateApplied}
          days={props.days}
          tripData={props.tripData}
          price={props.tripData?.price || props.price} 
        />
      </div>

      {showGuestPopup && (
        <div className="fixed inset-0 bg-black/50 z-999 flex items-center justify-center">
           <div className="bg-[#e8e8da] p-6 rounded-2xl w-full max-w-md">
              <Add_Guest 
                booking={{ passengers, includeOwner }}
                setPassengers={setPassengers}
                setIncludeOwner={setIncludeOwner}
                onNext={handleGuestConfirmed}
                onClose={() => setShowGuestPopup(false)}
              />
           </div>
        </div>
      )}

      {showPaymentPopup && (
        <div className="fixed inset-0 bg-black/50 z-999 flex items-center justify-center">
           <div className="bg-[#e8e8da] p-6 rounded-2xl w-full max-w-2xl overflow-y-auto max-h-[90vh]">
              <Add_Payment 
                booking={{ passengers, includeOwner }}
                tripData={props.tripData}
                card={card}
                setCard={setCard}
                startDate={startDate}
                endDate={endDate}
                trip_price={props.tripData?.price || props.price}
                onClose={() => setShowPaymentPopup(false)}
              />
           </div>
        </div>
      )}
    </div>
  );
};

export default Information;