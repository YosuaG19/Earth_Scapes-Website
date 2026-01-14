// app/signup/page.js
import SignupCard from '@/app/components/SignUp';
import Image from 'next/image';

export default function SignupPage() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image untuk SELURUH halaman */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg3.png" // PAKAI IMAGE SAMA atau beda
          alt="Nature Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay untuk gelapkan sedikit biar card terlihat */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      {/* Container utama */}
      <section className="w-screen h-screen flex justify-center items-center p-4 relative z-10">
        <SignupCard />
      </section>
    </div>
  );
}