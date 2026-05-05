import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export const metadata = { title: '404 — Page Not Found' };

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 mesh-bg">
      <div className="text-center">
        <div className="text-8xl sm:text-9xl font-black gradient-text mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Page Not Found
        </h1>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          Looks like this page doesn&apos;t exist. It might have been moved, deleted, or you may have mistyped the URL.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5 shadow-xl shadow-indigo-600/30"
          >
            <Home size={16} />
            Back to Home
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold rounded-xl border border-white/10 transition-all"
          >
            <ArrowLeft size={16} />
            Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
