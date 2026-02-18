'use client'

export default function DonationTable({ donations }) {
    return (
        <table className="w-full text-left border-separate h-full border-spacing-y-3 relative">
            <thead className="sticky top-1 bg-white">
                <tr className="text-[#242D13]/40 text-[11px] uppercase tracking-[0.2em] font-bold">
                    <th className="px-6 py-2">Conservation Program</th>
                    <th className="px-6 py-2">Transaction Date</th>
                    <th className="px-6 py-2">Amount</th>
                    <th className="px-6 py-2 text-right">Status</th>
                </tr>
            </thead>
            <tbody>
                {donations.map((item) => (
                    <tr key={item.id} className="bg-[#F5F5F0]/50 hover:bg-white transition-all group shadow-sm">
                        <td className="px-6 py-5 rounded-l-3xl border-y border-l border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#242D13] rounded-full flex items-center justify-center text-lg shadow-inner">
                                    {/* Logika Emoji berdasarkan kata kunci di judul */}
                                    {item.type?.toLowerCase().includes('marine') ? '🌊' : 
                                        item.type?.toLowerCase().includes('forest') ? '🌳' : '🌿'}
                                </div>
                                {/* Langsung tampilkan item.type karena sudah berisi nama lengkap */}
                                <span className="font-bold text-[#242D13]">{item.type}</span>
                            </div>
                        </td>
                        <td className="px-6 py-5 border-y border-gray-100 text-sm font-medium text-gray-500">
                            {new Date(item.created_at).toLocaleDateString('id-ID', {
                                day: 'numeric', month: 'short', year: 'numeric'
                            })}
                        </td>
                        <td className="px-6 py-5 border-y border-gray-100 font-black text-[#242D13]">
                            Rp {item.amount.toLocaleString('id-ID')}
                        </td>
                        <td className="px-6 py-5 rounded-r-3xl border-y border-r border-gray-100 text-right">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                                item.status === 'settlement' || item.status === 'success'
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                                {item.status === 'settlement' || item.status === 'success' ? 'Berhasil' : 'Pending'}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}