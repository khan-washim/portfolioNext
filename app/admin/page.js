'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FolderOpen, MessageSquare, Star, Mail,
  Plus, ArrowRight, TrendingUp, Eye, Clock,
  CheckCircle, AlertCircle, RefreshCw
} from 'lucide-react';

function StatCard({ icon: Icon, label, value, color, sub, loading }) {
  return (
    <div className={`relative overflow-hidden p-5 rounded-2xl bg-slate-900/80 border border-white/8 group hover:border-white/16 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20`}>
      <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full ${color}/10 blur-2xl pointer-events-none group-hover:${color}/20 transition-all`} />
      <div className="relative">
        <div className={`inline-flex p-2.5 rounded-xl ${color}/10 mb-3`}>
          <Icon size={18} className={`${color.replace('bg-', 'text-')}`} />
        </div>
        {loading ? (
          <div className="h-8 w-16 bg-slate-800 rounded-lg animate-pulse mb-1" />
        ) : (
          <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {value}
          </div>
        )}
        <div className="text-sm text-slate-400 font-medium">{label}</div>
        {sub && <div className="text-xs text-slate-600 mt-1">{sub}</div>}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setStats(data.stats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  const STAT_CARDS = [
    {
      icon: FolderOpen,
      label: 'Total Projects',
      value: stats?.totalProjects ?? '—',
      color: 'bg-indigo-500',
      sub: `${stats?.featuredProjects ?? 0} featured`,
    },
    {
      icon: Star,
      label: 'Featured',
      value: stats?.featuredProjects ?? '—',
      color: 'bg-amber-500',
      sub: 'Pinned on homepage',
    },
    {
      icon: MessageSquare,
      label: 'Total Messages',
      value: stats?.totalMessages ?? '—',
      color: 'bg-purple-500',
      sub: `${stats?.unreadMessages ?? 0} unread`,
    },
    {
      icon: Mail,
      label: 'Unread',
      value: stats?.unreadMessages ?? '—',
      color: 'bg-cyan-500',
      sub: stats?.unreadMessages > 0 ? 'Needs attention' : 'All caught up!',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-7">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Welcome back — here&apos;s what&apos;s happening.
          </p>
        </div>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all disabled:opacity-40"
          title="Refresh"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle size={16} className="flex-shrink-0" />
          {error} —{' '}
          <button onClick={fetchStats} className="underline hover:no-underline">
            Try again
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => (
          <StatCard key={card.label} {...card} loading={loading} />
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Quick Actions
        </h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            {
              href: '/admin/add-project',
              icon: Plus,
              label: 'Add New Project',
              desc: 'Publish a new project to your portfolio',
              color: 'indigo',
            },
            {
              href: '/admin/manage',
              icon: FolderOpen,
              label: 'Manage Projects',
              desc: 'Edit, feature or delete existing projects',
              color: 'purple',
            },
            {
              href: '/admin/messages',
              icon: MessageSquare,
              label: 'View Messages',
              desc: `${stats?.unreadMessages ?? 0} unread messages waiting`,
              color: 'cyan',
            },
          ].map(({ href, icon: Icon, label, desc, color }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-white/8 hover:border-white/16 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20"
            >
              <div className={`w-10 h-10 rounded-xl bg-${color}-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-${color}-500/20 transition-colors`}>
                <Icon size={18} className={`text-${color}-400`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">{label}</div>
                <div className="text-xs text-slate-500 truncate mt-0.5">{desc}</div>
              </div>
              <ArrowRight size={14} className="text-slate-600 group-hover:text-slate-300 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* Category breakdown */}
      {stats?.projectsByCategory?.length > 0 && (
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Projects by Category
            </h2>
            <TrendingUp size={14} className="text-slate-500" />
          </div>
          <div className="space-y-3">
            {stats.projectsByCategory.map(({ _id: cat, count }) => {
              const pct = Math.round((count / stats.totalProjects) * 100);
              return (
                <div key={cat}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{cat}</span>
                    <span className="text-slate-500">{count} project{count !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent messages */}
      {stats?.recentMessages?.length > 0 && (
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Recent Messages
            </h2>
            <Link href="/admin/messages" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <ul className="space-y-3">
            {stats.recentMessages.map((msg) => (
              <li key={msg._id} className="flex items-start gap-3">
                <div className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${msg.read ? 'bg-slate-600' : 'bg-indigo-400'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-300 truncate">{msg.name}</span>
                    {!msg.read && (
                      <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-indigo-500/20 text-indigo-400 font-semibold">NEW</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{msg.subject || msg.message}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-600 flex-shrink-0">
                  <Clock size={10} />
                  {new Date(msg.createdAt).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
