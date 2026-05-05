'use client';

import { ExternalLink, Github, ArrowUpRight, Star } from 'lucide-react';

const CATEGORY_COLORS = {
  'Web App':     'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
  'Mobile':      'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  'API':         'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  'Tool':        'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  'Open Source': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  'Other':       'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
};

const STATUS_COLORS = {
  'Completed':   'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'In Progress': 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  'Archived':    'bg-slate-500/10 text-slate-500 dark:text-slate-500',
};

const TECH_COLORS = [
  'bg-indigo-500/10 text-indigo-600 dark:text-indigo-300',
  'bg-purple-500/10 text-purple-600 dark:text-purple-300',
  'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300',
  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
  'bg-pink-500/10 text-pink-600 dark:text-pink-300',
  'bg-amber-500/10 text-amber-600 dark:text-amber-300',
];

export default function ProjectCard({ project, index = 0 }) {
  const {
    title,
    description,
    techStack = [],
    liveLink,
    githubLink,
    imageUrl,
    category = 'Web App',
    featured = false,
    status = 'Completed',
  } = project;

  const catStyle = CATEGORY_COLORS[category] || CATEGORY_COLORS['Other'];
  const statusStyle = STATUS_COLORS[status] || STATUS_COLORS['Completed'];

  const fallbackImage = `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=340&fit=crop&auto=format&q=80`;
  const imageSrc = imageUrl || fallbackImage;

  return (
    <article
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-white/8 bg-white dark:bg-slate-900/60 backdrop-blur-sm hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-600/90 backdrop-blur-sm text-white text-xs font-semibold shadow-lg shadow-indigo-600/30">
          <Star size={10} fill="currentColor" />
          Featured
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { e.target.src = fallbackImage; }}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick action links on hover */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg shadow-lg transition-all hover:-translate-y-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold rounded-lg shadow-lg transition-all hover:-translate-y-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={14} />
              Code
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">

        {/* Category + Status */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${catStyle}`}>
            {category}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle}`}>
            {status}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-bold text-slate-900 dark:text-white text-lg leading-snug group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors duration-200"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed flex-1 line-clamp-3">
          {description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {techStack.slice(0, 5).map((tech, i) => (
            <span
              key={tech}
              className={`px-2 py-0.5 rounded-md text-xs font-medium ${TECH_COLORS[i % TECH_COLORS.length]}`}
            >
              {tech}
            </span>
          ))}
          {techStack.length > 5 && (
            <span className="px-2 py-0.5 rounded-md text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800">
              +{techStack.length - 5}
            </span>
          )}
        </div>

        {/* Links footer */}
        <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-white/5">
          {liveLink ? (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 font-medium transition-colors group/link"
            >
              <ExternalLink size={14} />
              Live Demo
              <ArrowUpRight size={12} className="opacity-0 -translate-y-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 transition-all" />
            </a>
          ) : (
            <span className="text-sm text-slate-400 dark:text-slate-600">No live demo</span>
          )}

          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
            >
              <Github size={14} />
              Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}