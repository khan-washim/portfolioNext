import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-dvh bg-white dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}