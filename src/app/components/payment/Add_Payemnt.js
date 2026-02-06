'use client';

import Image from "next/image";
import mstrcard from "../../../../public/mastercard.svg"
import visa from "../../../../public/visa.svg"

const Add_Payment = ({ booking, card, setCard, startDate, endDate, trip_price }) => {
  const total =
    booking.passengers.length + (booking.includeOwner ? 1 : 0);

    const formatDate = (date) =>
      date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, '')        // hapus non-angka
      .slice(0, 16)              // max 16 digit
      .replace(/(.{4})/g, '$1 ') // spasi tiap 4
      .trim();
  };

  const formatExpiry = (value) => {
    let clean = value.replace(/\D/g, '').slice(0, 4);

    if (clean.length >= 3) {
      return `${clean.slice(0, 2)} / ${clean.slice(2)}`;
    }

    return clean;
  };

  const formatCVV = (value) => {
    return value.replace(/\D/g, '').slice(0, 3);
  };

  const total_spent = total * trip_price;

  const formatIDR = (v) =>
        v === "" ? "" : "Rp " + new Intl.NumberFormat("id-ID").format(v);


  return (
    <div className="w-full flex flex-col gap-4">
      <span className="w-full h-[2px] bg-[#242D13]"></span>
      <div className="grid grid-cols-2 gap-[.25rem] justify-between text-[#242D13]">
        <p className="text-left">Total Guest: {total}</p>
        <p className="text-right">{formatDate(startDate)} - {formatDate(endDate)}</p>
        <p className="col-span-2 text-left">Total Spent: {formatIDR(total_spent)}</p>
      </div>


      <div className="grid grid-cols-2 gap-[.75rem] text-[#5a7527]">
          <div className="col-span-2 flex relative flex-col px-[.5rem] gap-[.5rem] w-[100%]">
              <label className="z-[12] px-[.5rem] bg-[#e8e8da] text-[12px] w-fit">Card Number</label>
              <input placeholder="XXXX XXXX XXXX XXXX" className="border-none focus:outline-none focus:ring-0 abo z-[12] -mt-[.5rem]" type="text" 
              value={formatCardNumber(card.number)} onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value)})}/>

              <span className="z-[11] w-full h-[90%] border-[#5a7527] border-[2px] absolute -bottom-1 left-0 rounded-tr-[1rem]" />

              <div className="absolute right-0 flex items-center justify-end py-[.35rem] -bottom-1 px-[.5rem] gap-[.5rem] w-[20%]">
                <Image className="w-[40%]" src={visa} alt="visa"></Image> 
                <Image className="w-[40%]" src={mstrcard} alt="mstrcard"></Image>
              </div>
          </div>

          <div className="flex relative flex-col px-[.5rem] gap-[.5rem] w-[100%]">
              <label className="z-[12] px-[.5rem] bg-[#e8e8da] text-[12px] w-fit">Expiry</label>
              <input placeholder="MM / YY" className="border-none focus:outline-none focus:ring-0 abo z-[12] -mt-[.5rem]" type="text" 
              value={formatExpiry(card.expiry)} onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}/>

              <span className="z-[11] w-full h-[90%] border-[#5a7527] border-[2px] absolute -bottom-1 left-0 rounded-tr-[1rem]" />
          </div>

          <div className="flex relative flex-col px-[.5rem] gap-[.5rem] w-[100%]">
              <label className="z-[12] px-[.5rem] bg-[#e8e8da] text-[12px] w-fit">CVV</label>
              <input placeholder="CVV" className="border-none focus:outline-none focus:ring-0 abo z-[12] -mt-[.5rem]" type="password" 
              value={formatCVV(card.cvv)} onChange={(e) => setCard({ ...card, cvv: formatCVV(e.target.value) })}/>

              <span className="z-[11] w-full h-[90%] border-[#5a7527] border-[2px] absolute -bottom-1 left-0 rounded-tr-[1rem]" />
          </div>
      </div>
      
    </div>
  );
};

export default Add_Payment;
