'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Plus, FolderKanban, MessageSquare,
  Menu, X, Code2, ExternalLink, ChevronRight,
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/add-project', label: 'Add Project', icon: Plus },
  { href: '/admin/manage', label: 'Manage Projects', icon: FolderKanban },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href, exact) =>
    exact ? pathname === href : pathname.startsWith(href);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/5">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 flex-shrink-0">
            <Code2 size={18} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              alex<span className="text-indigo-400">.</span>admin
            </div>
            <div className="text-[10px] text-slate-500 font-medium">Portfolio CMS</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="px-2 text-[10px] text-slate-600 font-semibold uppercase tracking-wider mb-2">
          Navigation
        </p>
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(href, exact);
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                    active
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon
                    size={16}
                    className={`flex-shrink-0 ${active ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}
                  />
                  {label}
                  {active && <ChevronRight size={14} className="ml-auto" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/5 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all"
        >
          <ExternalLink size={13} />
          View Portfolio
        </Link>
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-xs text-slate-600">Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-56 flex-shrink-0 flex-col bg-slate-900/80 border-r border-white/5 backdrop-blur-sm">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed left-0 top-0 bottom-0 z-50 w-56 flex-col bg-slate-900 border-r border-white/5 lg:hidden flex">
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 flex items-center justify-between px-5 border-b border-white/5 bg-slate-900/50 backdrop-blur-sm flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Breadcrumb */}
          <div className="hidden lg:flex items-center gap-2 text-sm text-slate-500">
            <span>Admin</span>
            <ChevronRight size={14} />
            <span className="text-slate-300 font-medium">
              {NAV_ITEMS.find((n) => isActive(n.href, n.exact))?.label || 'Dashboard'}
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 ml-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-emerald-400 font-medium">Live</span>
            </div>
            <ThemeToggle className="lg:hidden" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-7">
          {children}
        </main>
      </div>
    </div>
  );
}
