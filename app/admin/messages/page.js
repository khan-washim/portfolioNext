'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  MessageSquare, Mail, Trash2, CheckCheck, RefreshCw,
  AlertCircle, Clock, Search, X, Loader, Eye, Reply,
  Filter, MailOpen, MailX
} from 'lucide-react';
import toast from 'react-hot-toast';

function MessageModal({ message, onClose, onUpdated }) {
  const [loading, setLoading] = useState(false);

  const markRead = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onUpdated({ ...message, read: true });
      toast.success('Marked as read');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-white/8">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-1">
              {!message.read && (
                <span className="w-2 h-2 bg-indigo-400 rounded-full flex-shrink-0" />
              )}
              <h2 className="text-base font-bold text-white truncate" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {message.subject || 'No subject'}
              </h2>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <span className="font-semibold text-slate-300">{message.name}</span>
              <span>·</span>
              <a href={`mailto:${message.email}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">
                {message.email}
              </a>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors flex-shrink-0">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
            <Clock size={12} />
            {new Date(message.createdAt).toLocaleString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long',
              day: 'numeric', hour: '2-digit', minute: '2-digit',
            })}
          </div>
          <div className="bg-slate-800/60 rounded-xl p-4 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
            {message.message}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-white/8">
          {!message.read && (
            <button
              onClick={markRead}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold disabled:opacity-60 transition-all"
            >
              {loading ? <Loader size={14} className="animate-spin" /> : <CheckCheck size={14} />}
              Mark as Read
            </button>
          )}
          <a
            href={`mailto:${message.email}?subject=Re: ${message.subject || 'Your message'}`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all"
          >
            <Reply size={14} />
            Reply via Email
          </a>
          <button onClick={onClose} className="ml-auto px-4 py-2 rounded-xl border border-white/10 text-slate-400 hover:text-white text-sm font-semibold transition-all">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | unread | read
  const [deleting, setDeleting] = useState(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setMessages(data.messages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const handleUpdated = (updated) => {
    setMessages((prev) => prev.map((m) => (m._id === updated._id ? updated : m)));
    setSelected(updated);
  };

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success('Message deleted');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(null);
    }
  };

  const markRead = async (id) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, read: true } : m)));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filtered = messages.filter((m) => {
    const matchSearch =
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase()) ||
      (m.subject || '').toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'all' ||
      (filter === 'unread' && !m.read) ||
      (filter === 'read' && m.read);
    return matchSearch && matchFilter;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <>
      {selected && (
        <MessageModal
          message={selected}
          onClose={() => setSelected(null)}
          onUpdated={handleUpdated}
        />
      )}

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Messages
              </h1>
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-xs font-bold">
                  {unreadCount} new
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 mt-0.5">
              {messages.length} message{messages.length !== 1 ? 's' : ''} from your contact form
            </p>
          </div>
          <button
            onClick={fetchMessages}
            disabled={loading}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all disabled:opacity-40"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex gap-1.5">
            {[
              { key: 'all', label: 'All', icon: MessageSquare },
              { key: 'unread', label: 'Unread', icon: MailOpen },
              { key: 'read', label: 'Read', icon: Mail },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  filter === key
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                    : 'bg-slate-900/70 border border-white/8 text-slate-400 hover:text-white'
                }`}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <AlertCircle size={16} />
            {error}
            <button onClick={fetchMessages} className="ml-auto underline">Retry</button>
          </div>
        )}

        {/* Messages List */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 rounded-2xl bg-slate-900/70 border border-white/8 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={28} className="text-slate-600" />
            </div>
            <h3 className="text-base font-semibold text-slate-400 mb-2">No messages found</h3>
            <p className="text-sm text-slate-600">
              {search || filter !== 'all'
                ? 'Try changing your search or filter.'
                : 'Messages from your contact form will appear here.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((msg) => (
              <div
                key={msg._id}
                className={`group relative flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 ${
                  !msg.read
                    ? 'bg-indigo-500/5 border-indigo-500/20 hover:border-indigo-500/40'
                    : 'bg-slate-900/60 border-white/8 hover:border-white/16'
                }`}
                onClick={() => { setSelected(msg); if (!msg.read) markRead(msg._id); }}
              >
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${!msg.read ? 'bg-indigo-600/30 text-indigo-300' : 'bg-slate-800 text-slate-400'}`}>
                  {msg.name.charAt(0).toUpperCase()}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-sm font-bold ${!msg.read ? 'text-white' : 'text-slate-300'}`}>
                      {msg.name}
                    </span>
                    {!msg.read && (
                      <span className="px-1.5 py-0.5 rounded-full bg-indigo-600/30 text-indigo-300 text-[10px] font-bold">NEW</span>
                    )}
                    <span className="text-xs text-slate-600 ml-auto hidden sm:flex items-center gap-1">
                      <Clock size={10} />
                      {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="text-xs text-indigo-400 mt-0.5">{msg.email}</div>
                  <p className="text-sm text-slate-500 mt-1 truncate">
                    {msg.subject && <span className="font-medium text-slate-400">{msg.subject} — </span>}
                    {msg.message}
                  </p>
                </div>

                {/* Actions */}
                <div
                  className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  {!msg.read && (
                    <button
                      onClick={() => markRead(msg._id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"
                      title="Mark as read"
                    >
                      <CheckCheck size={14} />
                    </button>
                  )}
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${msg.subject || 'Your message'}`}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                    title="Reply via email"
                  >
                    <Reply size={14} />
                  </a>
                  <button
                    onClick={() => handleDelete(msg._id)}
                    disabled={deleting === msg._id}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-40"
                    title="Delete"
                  >
                    {deleting === msg._id ? (
                      <Loader size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <p className="text-xs text-slate-600 text-center">
            {filtered.length} of {messages.length} message{messages.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </>
  );
}
