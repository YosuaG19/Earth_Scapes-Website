'use client'

import Image from 'next/image';
import logofull from '../../../public/Logo Full.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname()

    return (
        <>
            <nav className="flex items-center justify-between pr-8 pt-6 pl-6 pb-6 bg-white">
                <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="../home">
                <Image src={logofull} className='w-65' alt='EarthScapes'></Image>
                </Link>
                
                <ul className='text-black text-2xl grid grid-cols-3 gap-10 jus'>
                    <li><Link className={`link ${pathname === '/' ? 'active' : ''}`} href="../trips">Trips</Link></li>
                    <li><Link className={`link ${pathname === '/' ? 'active' : ''}`} href="../donate">Donate</Link></li>
                    <li><Link className={`link ${pathname === '/' ? 'active' : ''}`} href="../bookings">Bookings</Link></li>
                </ul>
                
                <button className='bg-[#C12E2E] pr-4 pt-3 pb-3 pl-4 rounded-lg'>
                <p className='text-white'>Log Out</p>
                </button>
            </nav> 
        </>
    )
}