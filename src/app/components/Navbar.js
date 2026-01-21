'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname()

    return (
        <>
            <nav className="sticky top-0 flex items-center justify-between pl-[2rem] pr-[3rem] pt-[.5rem] pb-[.5rem] bg-[#e8e8da] z-[10] shadow-xl/30">
                <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="../">
                    <div className='flex items-center gap-[1rem]'>
                        <div className="overflow-hidden flex items-center justify-center w-[55px] h-[55px] rounded-full bg-[#324018] max-w-[65px] max-h-[65px]">
                            <Image width='50' height='50' src="/logo.png" alt='logo'></Image>
                        </div>
                        <h1 className='text-[#242D13] text-[1.5rem]'>EarthScapes</h1>
                    </div>
                </Link>
                
                <ul className='text-[#242D13] text-[1.25rem] grid grid-cols-3 gap-10 jus'>
                    <li><Link className={`link ${pathname === '/' ? 'active' : ''}`} href="../trips">Trips</Link></li>
                    <li><Link className={`link ${pathname === '/' ? 'active' : ''}`} href="../donate">Donate</Link></li>
                    <li><Link className={`link ${pathname === '/' ? 'active' : ''}`} href="../bookings">Bookings</Link></li>
                </ul>
                
                <Link className='bg-[#242D13] pr-4 pt-3 pb-3 pl-4 rounded-lg' href='../signin'>
                    <p className='text-[#e8e8da]'>Log Out</p>
                </Link>
            </nav> 
        </>
    )
}