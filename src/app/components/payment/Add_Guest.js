'use client';
import { useState } from 'react';

const Add_Guest = ({ booking, setBooking }) => {
    const owner = {
        name : "Yosua Wibisono Gozali",
        phone : "+6281 XXXX XX21",
        email : "yosuawg19@gmail.com"
    }

    const ownerFields = [
        { id: 'owner_name', label: 'Name', value: owner.name },
        { id: 'owner_phone', label: 'Phone Number', value: owner.phone },
        { id: 'owner_email', label: 'Email', value: owner.email },
    ];
        
    const { passengers, includeOwner } = booking;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState('add'); // add | edit
    const [editIndex, setEditIndex] = useState(null);

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const addFields = [
        { id: 'name', label: 'Name', value: form.name, holder : "Input your Name" },
        { id: 'phone', label: 'Phone Number', value: form.phone, holder : "Input your Phone Number"  },
        { id: 'email', label: 'Email', value: form.email, holder : "Input your Email"  },
    ];

    const getPassengerFields = (p) => [
        { id: 'name', label: 'Name', value: p.name },
        { id: 'phone', label: 'Phone Number', value: p.phone },
        { id: 'email', label: 'Email', value: p.email },
    ];

    /* =====================
        HANDLERS
    ===================== */

    const openAdd = () => {
        setMode('add');
        setForm({ name: '', email: '', phone: '' });
        setIsModalOpen(true);
    };

    const openEdit = (index) => {
        setMode('edit');
        setEditIndex(index);
        setForm(passengers[index]);
        setIsModalOpen(true);
    };

    const saveGuest = () => {
        if (!form.name || !form.email || !form.phone) return;

        if (mode === 'add') {
        setBooking({
            ...booking,
            passengers: [...passengers, form],
        });
        } else {
        const updated = [...passengers];
        updated[editIndex] = form;

        setBooking({
            ...booking,
            passengers: updated,
        });
        }

        setIsModalOpen(false);
    };

    const deleteGuest = (index) => {
        setBooking({
        ...booking,
        passengers: passengers.filter((_, i) => i !== index),
        });
    };

  /* =====================
      RENDER
  ===================== */

  return (
    <>
      <div className="w-full h-full flex flex-col justify-between">
        <span className="w-full h-[2px] bg-[#242D13]"></span>

        {/* TOP COUNTER + ADD */}
        <div className="w-full text-[18px] text-[#e8e8da] flex justify-end gap-[.75rem]">
          <input
            type="text"
            className="w-[20px] text-center border-b-[2px] text-[#5a7527]"
            value={passengers.length + (includeOwner ? 1 : 0)}
            readOnly
          />
          <button
            type="button"
            onClick={openAdd}
            className="h-[30px] w-[30px] rounded-full bg-[#5a7527]"
          >
            +
          </button>
        </div>

        {/* LIST */}
        <div className="h-[90%] w-full grid auto-rows-[30%] gap-[.5rem] overflow-y-scroll pr-[.25rem]">

          {/* OWNER (TOGGLE ONLY) */}
          <div className="h-full w-full bg-[#5a7527] flex flex-col justify-between p-[.75rem] text-[#e8e8da]">
            <div className='grid grid-cols-2 gap-[.5rem] h-full'>
                {ownerFields.map((field) => (
                    <div key={field.id} className='flex relative flex-col px-[.5rem] gap-[.3rem]'>
                        <label className='z-[12] px-[.5rem] bg-[#5a7527] text-[12px] w-fit' htmlFor={field.id}>{field.label}</label>
                        <input className='z-[12] -mt-[.5rem]' id={field.id} type='text' disabled value={field.value}></input>
                        <span className='z-[11] w-full h-[80%] border-[#e8e8da] border-[2px] absolute -bottom-0 left-0 rounded-tr-[1rem]'></span>
                    </div>
                ))}

                <div className="flex justify-end items-end gap-[.5rem]">
                <p>Add as Guest</p>

                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={includeOwner}
                    onChange={() =>
                        setBooking({
                        ...booking,
                        includeOwner: !includeOwner,
                        })
                    }
                    />
                    <div className="w-11 h-6 bg-[#5a7527] rounded-full peer outline-[2px]
                        peer-checked:bg-[#242D13]
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                        after:bg-[#e8e8da] after:rounded-full after:h-5 after:w-5
                        after:transition-all peer-checked:after:translate-x-full">
                    </div>
                </label>
                </div>
            </div>
          </div>

          {/* PASSENGERS */}
          {passengers.map((p, idx) => {
            const passengerFields = getPassengerFields(p);

            return (
                <div
                key={idx}
                className="h-full w-full bg-[#5a7527] p-[.75rem] text-[#e8e8da]"
                >
                <div className="grid grid-cols-2 gap-[.5rem] h-full">

                    {/* PASSENGER DATA */}
                    {passengerFields.map((field) => (
                    <div
                        key={field.id}
                        className="flex relative flex-col px-[.5rem] gap-[.3rem]"
                    >
                        <label
                        className="z-[12] px-[.5rem] bg-[#5a7527] text-[12px] w-fit"
                        >
                        {field.label}
                        </label>

                        <input
                        className="z-[12] -mt-[.5rem]"
                        type="text"
                        disabled
                        value={field.value}
                        />

                        <span className="z-[11] w-full h-[80%] border-[#e8e8da] border-[2px] absolute -bottom-0 left-0 rounded-tr-[1rem]" />
                    </div>
                    ))}

                    {/* ACTIONS */}
                    <div className="flex justify-end items-end gap-[.5rem]">
                    <button
                        type="button"
                        onClick={() => openEdit(idx)}
                        className="px-3 py-1 bg-[#e8e8da] text-[#5a7527] rounded-r-[.5rem] rounded-bl-[.5rem]"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() => deleteGuest(idx)}
                        className="px-3 py-1 bg-[#b82525] text-[#e8e8da] rounded-r-[.5rem] rounded-bl-[.5rem]"
                    >
                        Delete
                    </button>
                    </div>
                </div>
                </div>
            );
            })}
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="z-[12] bg-[#5a7527] w-[90%] max-w-[400px] p-[1rem] flex flex-col gap-[.5rem]"
          onKeyDown={(e) => {if (e.key === 'Enter') { e.preventDefault(); saveGuest(); } e.stopPropagation(); }}>
            <p className="text-[#e8e8da] text-[18px]">
              {mode === 'add' ? 'Add Passenger' : 'Edit Passenger'}
            </p>

            {addFields.map((field) => (
                <div key={field.id} className='flex relative flex-col px-[.5rem] gap-[.3rem] text-[#e8e8da]'>
                    <label className='z-[12] px-[.5rem] bg-[#5a7527] text-[12px] w-fit' htmlFor={field.id}>{field.label}</label>
                    <input className='z-[12] -mt-[.5rem] border-none focus:outline-none focus:ring-0' id={field.id} type='text' placeholder={field.holder} value={field.value}
                        onChange={(e) =>setForm({ ...form, [field.id]: e.target.value })}>

                    </input>
                    <span className='w-full h-[85%] border-[#e8e8da] border-[2px] absolute -bottom-1 left-0 rounded-tr-[1rem]'></span>
                </div>
            ))}

            <div className="flex justify-end gap-[.5rem] mt-[.5rem]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1 bg-[#e8e8da] text-[#5a7527] rounded-[.25rem]"
              >
                Cancel
              </button>
              <button
                type='submit'
                onClick={saveGuest}
                className="px-3 py-1 bg-[#242D13] text-[#e8e8da] rounded-[.25rem]"
              >
                {mode === 'add' ? 'Save' : 'Update'}
              </button>
            </div>
          </div>

        <div className='z-[10] fixed inset-0 ' onClick={() => setIsModalOpen(false)}/>
        </div>
      )}
    </>
  );
};

export default Add_Guest;
