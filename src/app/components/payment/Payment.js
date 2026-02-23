'use client';

import { useState } from 'react';
import Add_Guest from './Add_Guest';
import Add_Payment from './Add_Payment';

const STEPS = { GUEST: 1, PAYMENT: 2 };

const Payment = ({ onClose, startDate, endDate, tripData, trip_price }) => {
  const [step, setStep] = useState(STEPS.GUEST);
  const [booking, setBooking] = useState({ passengers: [], includeOwner: false });
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '' });

  const guestCount = booking.passengers.length + (booking.includeOwner ? 1 : 0);

  const next = () => {
    if (guestCount < 1) alert("Tolong diisi dulu yah guestnya");
    else setStep(STEPS.PAYMENT);
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-xs ">
      <div className="h-[90vh] z-11 w-[50vw] bg-[#e8e8da] overflow-hidden rounded-tr-[2.5rem] rounded-bl-[2.5rem]">
        <div className="relative w-full h-full flex flex-col items-center p-6">
          <button onClick={onClose} className="w-15 h-15 absolute left-0 top-0 bg-[#5a7527] rounded-br-4xl text-[#e8e8da]">X</button>
          <h2 className="text-[2rem] h-[10%] text-[#242D13]">{step === STEPS.GUEST ? 'Guest Information' : 'Payment Details'}</h2>
          <div className="flex w-full h-[80%] overflow-auto">
            {step === STEPS.GUEST && <Add_Guest booking={booking} setBooking={setBooking} />}
            {step === STEPS.PAYMENT && (
              <Add_Payment
                startDate={startDate}
                endDate={endDate}
                booking={booking}
                card={card}
                setCard={setCard}
                tripData={tripData}
                trip_price={tripData?.price || trip_price}
                onClose={onClose}
              />
            )}
          </div>
          <div className="h-[10%] flex justify-end items-end w-full">
            {step === STEPS.PAYMENT ? (
              <div className="flex gap-4">
                {/* <button onClick={() => setStep(STEPS.GUEST)} className="bg-[#a8a8a8] text-[#e8e8da] px-6 py-3 rounded-[.5rem]">Prev</button>
                <button className="bg-[#5a7527] text-[#e8e8da] px-6 py-3 rounded-[.5rem]">Pay Now</button> */}
              </div>
            ) : (
              <button onClick={next} className="bg-[#5a7527] text-[#e8e8da] px-6 py-3 rounded-lg">Next</button>
            )}
          </div>
        </div>
      </div>
      <div className='fixed inset-0 z-10' onClick={onClose}/>
    </div>
  );
};

export default Payment;