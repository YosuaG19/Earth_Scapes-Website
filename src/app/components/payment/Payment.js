'use client';

import { useState } from 'react';
import Add_Guest from './Add_Guest';
import Add_Payment from './Add_Payemnt';

const STEPS = {
  GUEST: 1,
  PAYMENT: 2,
};

const Payment = ({ onClose, startDate, endDate }) => {
  const [step, setStep] = useState(STEPS.GUEST);

  // 🔥 DATA UTAMA DI SINI
  const [booking, setBooking] = useState({
    passengers: [],
    includeOwner: false,
  });

  const [card, setCard] = useState({
    number: '',
    expiry: '',
    cvv: '',
  });

  const guestCount =
    booking.passengers.length + (booking.includeOwner ? 1 : 0);

  const next = () => {
    if (guestCount < 1) alert("Tolong diisi dulu yah guestnya, gua tahu lu coba coba");
    else setStep(STEPS.PAYMENT);
  };

  const prev = () => setStep(STEPS.GUEST);

  const isValidExpiry = (expiry) => {
    // if (!/^\d{2}\s\/\s\d{2}$/.test(expiry)) return false;

    const [month, year] = expiry.split(' / ').map(Number);
    if (month < 1 || month > 12) return false;

    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    return (
      year > currentYear ||
      (year === currentYear && month >= currentMonth)
    );
  };

  const isValidCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
  };

  const pay = () => {
    if (card.number.replace(/\s/g, '').length === 16 && isValidExpiry(card.expiry) && isValidCVV(card.cvv)) {
      alert("Transaksi sudah terekam")
      console.log({
        booking,
        guestCount,
        card,
      });
      onClose?.();
    }
    
    else {
      alert("pliss diisi yang bener dong")
    }
  };

  return (
    <div className="fixed inset-0 z-[10] flex items-center justify-center bg-black/50">
      <div className="h-[90vh] z-[11] w-[50vw] bg-[#e8e8da] overflow-hidden rounded-tr-[2.5rem] rounded-bl-[2.5rem]"
        onKeyDown={(e) => {if (e.key === 'Enter' && step === STEPS.PAYMENT) {e.preventDefault(); pay(); } e.stopPropagation();}}>
        <div className="relative w-full h-full flex flex-col items-center p-[1.5rem]">

          <button
            onClick={onClose}
            className="w-[60px] h-[60px] absolute left-0 top-0 bg-[#5a7527] rounded-br-[2rem] text-[#e8e8da]"
          >
            X
          </button>

          {/* HEADER */}
          <h2 className="text-[2rem] h-[10%] text-[#242D13]">
            {step === STEPS.GUEST ? 'Guest Information' : 'Payment Details'}
          </h2>

          {/* CONTENT */}
          <div className="flex w-full h-[80%] overflow-auto">
            {step === STEPS.GUEST && (
              <Add_Guest booking={booking} setBooking={setBooking} />
            )}

            {step === STEPS.PAYMENT && (
              <Add_Payment
                startDate={startDate}
                endDate={endDate}
                booking={booking}
                card={card}
                setCard={setCard}
                trip_price={20000000}
              />
            )}
          </div>

          {/* FOOTER */}
          <div className="h-[10%] flex justify-end items-end w-full">
            {step === STEPS.PAYMENT ? (
              <div className="flex gap-[1rem]">
                <button type='button' onClick={prev} className="bg-[#a8a8a8] text-[#e8e8da] px-6 py-3 rounded-[.5rem]">
                  Prev
                </button>
                <button type='submit' onClick={pay} className="bg-[#5a7527] text-[#e8e8da] px-6 py-3 rounded-[.5rem]">
                  Pay Now
                </button>
              </div>
            ) : (
              <button type='button' onClick={next} className="bg-[#5a7527] text-[#e8e8da] px-6 py-3 rounded-[.5rem]">
                Next
              </button>
            )}
          </div>

        </div>


      </div>

      <div className='fixed inset-0 z-[10]' onClick={onClose}/>
    </div>
  );
};

export default Payment;
