'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus, Link2, Github, Image, Tag, Star, CheckCircle,
  AlertCircle, Loader, ArrowLeft, Sparkles, X
} from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES = ['Web App', 'Mobile', 'API', 'Tool', 'Open Source', 'Other'];
const STATUSES = ['Completed', 'In Progress', 'Archived'];

const COMMON_TECHS = [
  'React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript',
  'Node.js', 'Express', 'FastAPI', 'Django', 'MongoDB', 'PostgreSQL',
  'MySQL', 'Redis', 'Tailwind CSS', 'GraphQL', 'Docker', 'AWS',
  'Vercel', 'Firebase', 'Supabase', 'Prisma', 'Socket.io', 'REST API',
];

const inputClass =
  'w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200';

const labelClass = 'block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5';

export default function AddProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [techInput, setTechInput] = useState('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    longDescription: '',
    techStack: [],
    liveLink: '',
    githubLink: '',
    imageUrl: '',
    category: 'Web App',
    status: 'Completed',
    featured: false,
    order: 0,
  });

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target?.value ?? e }));

  const addTech = (tech) => {
    const t = tech.trim();
    if (t && !form.techStack.includes(t)) {
      setForm((f) => ({ ...f, techStack: [...f.techStack, t] }));
    }
    setTechInput('');
  };

  const removeTech = (tech) =>
    setForm((f) => ({ ...f, techStack: f.techStack.filter((t) => t !== tech) }));

  const handleTechKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTech(techInput);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      toast.error('Title and description are required.');
      return;
    }
    if (form.techStack.length === 0) {
      toast.error('Add at least one technology.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create project');

      toast.success('Project published successfully!');
      router.push('/admin/manage');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-7">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1
            className="text-2xl font-black text-white"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Add New Project
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Fill in the details below to publish a project to your portfolio.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* ── Basic Info ── */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-white/8 space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={14} className="text-indigo-400" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Basic Information</span>
          </div>

          <div>
            <label className={labelClass}>
              Project Title <span className="text-red-400 normal-case">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={set('title')}
              className={inputClass}
              placeholder="e.g. E-Commerce Platform with Next.js"
              required
              maxLength={100}
            />
            <p className="text-xs text-slate-600 mt-1 text-right">{form.title.length}/100</p>
          </div>

          <div>
            <label className={labelClass}>
              Short Description <span className="text-red-400 normal-case">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={set('description')}
              className={`${inputClass} resize-none`}
              placeholder="A concise description shown on the project card (max 500 chars)..."
              rows={3}
              required
              maxLength={500}
            />
            <p className="text-xs text-slate-600 mt-1 text-right">{form.description.length}/500</p>
          </div>

          <div>
            <label className={labelClass}>Long Description</label>
            <textarea
              value={form.longDescription}
              onChange={set('longDescription')}
              className={`${inputClass} resize-none`}
              placeholder="Detailed description of the project — challenges, solutions, features..."
              rows={5}
              maxLength={2000}
            />
            <p className="text-xs text-slate-600 mt-1 text-right">{form.longDescription.length}/2000</p>
          </div>
        </div>

        {/* ── Tech Stack ── */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-white/8 space-y-4">
          <div className="flex items-center gap-2">
            <Tag size={14} className="text-purple-400" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Tech Stack <span className="text-red-400 normal-case">*</span>
            </span>
          </div>

          {/* Selected tags */}
          {form.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-sm font-medium"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTech(tech)}
                    className="text-indigo-400 hover:text-white transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={handleTechKeyDown}
              className={inputClass}
              placeholder="Type a tech and press Enter or comma..."
            />
            <button
              type="button"
              onClick={() => addTech(techInput)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors flex-shrink-0"
            >
              Add
            </button>
          </div>

          {/* Common tech quick-add */}
          <div>
            <p className="text-xs text-slate-600 mb-2">Quick add:</p>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_TECHS.filter((t) => !form.techStack.includes(t)).map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => addTech(tech)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 border border-white/8 text-slate-400 hover:text-white hover:border-white/20 text-xs transition-all"
                >
                  + {tech}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Links & Image ── */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-white/8 space-y-4">
          <div className="flex items-center gap-2">
            <Link2 size={14} className="text-cyan-400" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Links & Media</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Live Demo URL</label>
              <div className="relative">
                <Link2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="url"
                  value={form.liveLink}
                  onChange={set('liveLink')}
                  className={`${inputClass} pl-9`}
                  placeholder="https://yourproject.com"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>GitHub Repository</label>
              <div className="relative">
                <Github size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="url"
                  value={form.githubLink}
                  onChange={set('githubLink')}
                  className={`${inputClass} pl-9`}
                  placeholder="https://github.com/user/repo"
                />
              </div>
            </div>
          </div>

          <div>
            <label className={labelClass}>Cover Image URL</label>
            <div className="relative">
              <Image size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="url"
                value={form.imageUrl}
                onChange={set('imageUrl')}
                className={`${inputClass} pl-9`}
                placeholder="https://images.unsplash.com/..."
              />
            </div>
            {form.imageUrl && (
              <div className="mt-3 rounded-xl overflow-hidden h-36 bg-slate-800 border border-white/8">
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
          </div>
        </div>

        {/* ── Settings ── */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-white/8 space-y-5">
          <div className="flex items-center gap-2">
            <Star size={14} className="text-amber-400" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Settings</span>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Category</label>
              <select
                value={form.category}
                onChange={set('category')}
                className={`${inputClass} cursor-pointer`}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Status</label>
              <select
                value={form.status}
                onChange={set('status')}
                className={`${inputClass} cursor-pointer`}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Display Order</label>
              <input
                type="number"
                value={form.order}
                onChange={set('order')}
                className={inputClass}
                min={0}
                max={999}
                placeholder="0"
              />
            </div>
          </div>

          {/* Featured toggle */}
          <label className="flex items-center justify-between p-4 rounded-xl border border-white/8 bg-slate-800/50 cursor-pointer hover:bg-slate-800 transition-colors group">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${form.featured ? 'bg-amber-500/20' : 'bg-slate-700/50'}`}>
                <Star size={16} className={form.featured ? 'text-amber-400 fill-amber-400' : 'text-slate-500'} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Feature this project</p>
                <p className="text-xs text-slate-500">Show on homepage and mark as featured</p>
              </div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-colors duration-300 ${form.featured ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${form.featured ? 'left-[22px]' : 'left-0.5'}`} />
              </div>
            </div>
          </label>
        </div>

        {/* ── Submit ── */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 text-sm font-semibold transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
          >
            {loading ? (
              <><Loader size={16} className="animate-spin" /> Publishing...</>
            ) : (
              <><CheckCircle size={16} /> Publish Project</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
