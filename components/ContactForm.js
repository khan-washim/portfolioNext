'use client';

import { useState } from 'react';
import { Send, CheckCircle, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      toast.success("Message sent! I'll get back to you soon.");
    } catch (err) {
      toast.error(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 backdrop-blur-sm';

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center h-full">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <CheckCircle size={32} className="text-emerald-500 dark:text-emerald-400" />
        </div>
        <h3
          className="text-xl font-bold text-slate-900 dark:text-white"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Message Received!
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs">
          Thanks for reaching out. I&apos;ll review your message and get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/8 backdrop-blur-sm space-y-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClass}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Project inquiry, collaboration, etc."
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project or idea..."
          rows={5}
          className={`${inputClass} resize-none`}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
      >
        {loading ? (
          <>
            <Loader size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={16} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}