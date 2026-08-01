import { Code2, Github, Linkedin, Twitter, Heart, ArrowUpRight } from 'lucide-react';

const SOCIALS = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
];

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-200 dark:border-white/5 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <a
            href="#top"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center transition-transform group-hover:scale-105">
              <Code2 size={14} className="text-white" />
            </div>
            <span
              className="text-sm font-semibold text-slate-600 dark:text-slate-400"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              washim<span className="text-indigo-500 dark:text-indigo-400">.</span>dev
            </span>
          </a>

          {/* Quick links */}
          <nav className="flex items-center gap-6">
            {LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-xs font-medium text-slate-500 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-1">
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 text-slate-400 dark:text-slate-600 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/5 to-transparent" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-600 flex items-center gap-1.5 order-2 sm:order-1">
            © {year} Khan Washim Uddin. Built with{' '}
            <Heart size={11} className="text-red-500 fill-red-500" />
            {' '}using Next.js & Tailwind
          </p>

          <a
            href="mailto:hello@washim.dev"
            className="order-1 sm:order-2 inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors group"
          >
            hello@washim.dev
            <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}