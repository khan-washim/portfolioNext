'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Search, Plus, Edit2, Trash2, Star, ExternalLink, Github,
  RefreshCw, AlertCircle, FolderOpen, X, Check, Loader,
  Filter, ChevronDown, Eye
} from 'lucide-react';
import toast from 'react-hot-toast';

const STATUS_STYLES = {
  Completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'In Progress': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Archived: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

const CAT_STYLES = {
  'Web App': 'bg-indigo-500/10 text-indigo-400',
  Mobile: 'bg-cyan-500/10 text-cyan-400',
  API: 'bg-emerald-500/10 text-emerald-400',
  Tool: 'bg-amber-500/10 text-amber-400',
  'Open Source': 'bg-purple-500/10 text-purple-400',
  Other: 'bg-slate-500/10 text-slate-400',
};

const inputClass =
  'w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 transition-all';

/* ── Inline Edit Modal ──────────────────────────────────────────────────── */
function EditModal({ project, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: project.title,
    description: project.description,
    techStack: project.techStack?.join(', ') || '',
    liveLink: project.liveLink || '',
    githubLink: project.githubLink || '',
    imageUrl: project.imageUrl || '',
    category: project.category || 'Web App',
    status: project.status || 'Completed',
    featured: project.featured || false,
    order: project.order || 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/projects/${project._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          techStack: form.techStack
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed');
      toast.success('Project updated!');
      onSaved(data.project);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const CATEGORIES = ['Web App', 'Mobile', 'API', 'Tool', 'Open Source', 'Other'];
  const STATUSES = ['Completed', 'In Progress', 'Archived'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 flex-shrink-0">
          <h2 className="text-base font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Edit Project
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="overflow-y-auto p-6 space-y-4 flex-1">
          {[
            { label: 'Title', key: 'title', type: 'text', placeholder: 'Project title' },
            { label: 'Description', key: 'description', type: 'textarea', placeholder: 'Short description...' },
            { label: 'Tech Stack (comma separated)', key: 'techStack', type: 'text', placeholder: 'React, Node.js, MongoDB' },
            { label: 'Live URL', key: 'liveLink', type: 'url', placeholder: 'https://' },
            { label: 'GitHub URL', key: 'githubLink', type: 'url', placeholder: 'https://github.com/...' },
            { label: 'Image URL', key: 'imageUrl', type: 'url', placeholder: 'https://...' },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">{label}</label>
              {type === 'textarea' ? (
                <textarea
                  value={form[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className={`${inputClass} resize-none`}
                  rows={3}
                  placeholder={placeholder}
                />
              ) : (
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className={inputClass}
                  placeholder={placeholder}
                />
              )}
            </div>
          ))}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className={`${inputClass} cursor-pointer`}
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                className={`${inputClass} cursor-pointer`}
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <label className="flex items-center gap-3 p-3 rounded-xl border border-white/8 bg-slate-800/50 cursor-pointer hover:bg-slate-800 transition-colors">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              className="w-4 h-4 accent-indigo-500"
            />
            <div>
              <span className="text-sm font-medium text-white">Featured Project</span>
              <span className="text-xs text-slate-500 block">Show on homepage</span>
            </div>
            <Star size={14} className={`ml-auto ${form.featured ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
          </label>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-white/8 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white text-sm font-semibold transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold disabled:opacity-60 transition-all shadow-lg shadow-indigo-600/25"
          >
            {saving ? <Loader size={15} className="animate-spin" /> : <Check size={15} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Delete Confirm ──────────────────────────────────────────────────────── */
function DeleteModal({ project, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${project._id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      toast.success('Project deleted.');
      onDeleted(project._id);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={24} className="text-red-400" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Delete Project?
        </h3>
        <p className="text-sm text-slate-400 mb-6">
          <span className="font-semibold text-white">&ldquo;{project.title}&rdquo;</span> will be permanently removed. This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white text-sm font-semibold transition-all">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold disabled:opacity-60 transition-all"
          >
            {loading ? <Loader size={14} className="animate-spin" /> : <Trash2 size={14} />}
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────────────────────── */
export default function ManageProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [editProject, setEditProject] = useState(null);
  const [deleteProject, setDeleteProject] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setProjects(data.projects);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const handleSaved = (updated) => {
    setProjects((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
    setEditProject(null);
  };

  const handleDeleted = (id) => {
    setProjects((prev) => prev.filter((p) => p._id !== id));
    setDeleteProject(null);
  };

  const CATEGORIES = ['All', 'Web App', 'Mobile', 'API', 'Tool', 'Open Source', 'Other'];
  const STATUSES = ['All', 'Completed', 'In Progress', 'Archived'];

  const filtered = projects.filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = filterCat === 'All' || p.category === filterCat;
    const matchStatus = filterStatus === 'All' || p.status === filterStatus;
    return matchSearch && matchCat && matchStatus;
  });

  return (
    <>
      {editProject && (
        <EditModal
          project={editProject}
          onClose={() => setEditProject(null)}
          onSaved={handleSaved}
        />
      )}
      {deleteProject && (
        <DeleteModal
          project={deleteProject}
          onClose={() => setDeleteProject(null)}
          onDeleted={handleDeleted}
        />
      )}

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Manage Projects
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {projects.length} project{projects.length !== 1 ? 's' : ''} total
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchProjects}
              disabled={loading}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all disabled:opacity-40"
              title="Refresh"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            <Link
              href="/admin/add-project"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5"
            >
              <Plus size={15} /> Add Project
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/8 space-y-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects by title, description or tech..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <Filter size={13} className="text-slate-500" />
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCat(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    filterCat === cat
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                      : 'bg-slate-800 text-slate-400 hover:text-white border border-white/8'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <span className="w-px bg-white/10 mx-1" />
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    filterStatus === s
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                      : 'bg-slate-800 text-slate-400 hover:text-white border border-white/8'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <AlertCircle size={16} className="flex-shrink-0" />
            {error}
            <button onClick={fetchProjects} className="ml-auto underline hover:no-underline">Retry</button>
          </div>
        )}

        {/* List */}
        {loading ? (
          <div className="grid gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 rounded-2xl bg-slate-900/70 border border-white/8 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-4">
              <FolderOpen size={28} className="text-slate-600" />
            </div>
            <h3 className="text-base font-semibold text-slate-400 mb-2">No projects found</h3>
            <p className="text-sm text-slate-600 mb-5">
              {search || filterCat !== 'All' || filterStatus !== 'All'
                ? 'Try adjusting your search or filters.'
                : 'Get started by adding your first project.'}
            </p>
            <Link
              href="/admin/add-project"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all"
            >
              <Plus size={15} /> Add First Project
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((project) => (
              <div
                key={project._id}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-900/70 border border-white/8 hover:border-white/16 transition-all duration-200"
              >
                {/* Thumbnail */}
                <div className="w-16 h-14 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 border border-white/8">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                      <FolderOpen size={20} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-white truncate group-hover:text-indigo-300 transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {project.title}
                    </h3>
                    {project.featured && (
                      <Star size={12} className="text-amber-400 fill-amber-400 flex-shrink-0" title="Featured" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${CAT_STYLES[project.category] || CAT_STYLES['Other']}`}>
                      {project.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${STATUS_STYLES[project.status] || STATUS_STYLES['Completed']}`}>
                      {project.status}
                    </span>
                    <span className="text-xs text-slate-600 hidden sm:block">
                      {project.techStack?.slice(0, 3).join(' · ')}
                      {project.techStack?.length > 3 && ` +${project.techStack.length - 3}`}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                      title="Live demo"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all"
                      title="GitHub"
                    >
                      <Github size={15} />
                    </a>
                  )}
                  <button
                    onClick={() => setEditProject(project)}
                    className="p-2 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"
                    title="Edit"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => setDeleteProject(project)}
                    className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer count */}
        {filtered.length > 0 && (
          <p className="text-xs text-slate-600 text-center">
            Showing {filtered.length} of {projects.length} project{projects.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </>
  );
}
