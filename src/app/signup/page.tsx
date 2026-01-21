// app/signup/page.tsx
import SignupCard from '@/app/components/SignUp';
import Image from 'next/image';

export default function SignupPage() {
  return (
    <div style={{ margin: 0, padding: 0, height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Background Image */}
      <div className="fixed inset-0 z-0" style={{ margin: 0, padding: 0 }}>
        <Image
          src="/bg3.png"
          alt="Nature Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Container - HAPUS section, langsung div */}
      <div className="fixed inset-0 flex justify-center items-center z-10" style={{ margin: 0, padding: 0 }}>
        <SignupCard />
      </div>
    </div>
  );
}