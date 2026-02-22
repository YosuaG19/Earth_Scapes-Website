'use client'

export default function TripTable({ trips }) {
    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-separate border-spacing-y-3">
                <thead>
                    <tr className="text-[#242D13]/40 text-[11px] h-18 uppercase tracking-[0.2em] font-bold">
                        <th className="px-10 py-2">Trips</th>
                        <th className="px-6 py-2">Date of Departure</th>
                        <th className="px-6 py-2 text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {trips.map((item) => (
                        <tr key={item.id} className="bg-[#F5F5F0]/50 hover:bg-white transition-all shadow-sm">
                            <td className="px-6 py-5 border-y border-l border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#242D13] rounded-full flex items-center justify-center text-lg">
                                        🏝️
                                    </div>
                                    {/* Membaca kolom trip_title */}
                                    <span className="font-bold text-[#242D13]">{item.trip_title}</span>
                                </div>
                            </td>
                            <td className="px-6 py-5 border-y border-gray-100 text-sm font-medium text-gray-500">
                                {new Date(item.start_date).toLocaleDateString('id-ID', {
                                    day: 'numeric', month: 'short', year: 'numeric'
                                })}
                            </td>
                            <td className="px-6 py-5 border-y border-r border-gray-100 text-center">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${
                                    item.status === 'settlement' || item.status === 'paid'
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {item.status === 'settlement' || item.status === 'paid' ? 'Confirmed' : 'Pending'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}