'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname()

    return (
        <>
            <nav className="sticky top-0 flex items-center justify-between pl-[2rem] pr-[3rem] pt-[.5rem] pb-[.5rem] bg-[#242D13] z-[10]">
                <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="../">
                    <div className='flex items-center gap-[1rem]'>
                        <div className="overflow-hidden flex items-center justify-center w-[65px] h-[65px] rounded-full bg-[#fffff3] max-w-[65px] max-h-[65px]">
                            <Image width='60' height='60' src="/logo.png" alt='logo'></Image>
                        </div>
                        <h1 className='text-[#fffff3] text-[2rem]'>EarthScapes</h1>
                    </div>
                </Link>
                
                <ul className='text-[#fffff3] text-2xl grid grid-cols-3 gap-10 jus'>
                    <li><Link className={`link ${pathname === '/' ? 'active' : ''}`} href="../trips">Trips</Link></li>
                    <li><Link className={`link ${pathname === '/' ? 'active' : ''}`} href="../donate">Donate</Link></li>
                    <li><Link className={`link ${pathname === '/' ? 'active' : ''}`} href="../bookings">Bookings</Link></li>
                </ul>
                
                <Link className='bg-[#fffff3] pr-4 pt-3 pb-3 pl-4 rounded-lg' href='../signin'>
                    <p className='text-[#242D13]'>Log Out</p>
                </Link>
            </nav> 
        </>
    )
}