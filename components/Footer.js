import { Code2, Github, Linkedin, Twitter, Heart } from 'lucide-react';

const SOCIALS = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 dark:border-white/5 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Code2 size={14} className="text-white" />
          </div>
          <span
            className="text-sm font-semibold text-slate-600 dark:text-slate-400"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            alex<span className="text-indigo-500 dark:text-indigo-400">.</span>dev
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-400 dark:text-slate-600 flex items-center gap-1.5">
          © {year} Alex Morgan. Built with{' '}
          <Heart size={11} className="text-red-500 fill-red-500" />
          {' '}using Next.js & Tailwind
        </p>

        {/* Socials */}
        <div className="flex items-center gap-1">
          {SOCIALS.map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 text-slate-400 dark:text-slate-600 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-white/5"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}