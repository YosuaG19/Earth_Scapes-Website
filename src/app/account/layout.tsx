import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-b from-green-900 via-green-800 to-green-700">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}