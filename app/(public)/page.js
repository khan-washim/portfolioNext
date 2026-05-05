import ContactForm from '@/components/ContactForm';
import ProjectCard from '@/components/ProjectCard';
import {
  ArrowDown, ArrowRight, Download, MapPin, Briefcase, Star,
  Code2, Database, Globe, Cpu, Layers, Terminal, Zap
} from 'lucide-react';

// ── Data ────────────────────────────────────────────────────────────────────

const SKILLS = [
  {
    category: 'Frontend',
    icon: Globe,
    color: 'from-indigo-500 to-blue-500',
    glow: 'group-hover:shadow-indigo-500/20',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux Toolkit'],
  },
  {
    category: 'Backend',
    icon: Terminal,
    color: 'from-emerald-500 to-teal-500',
    glow: 'group-hover:shadow-emerald-500/20',
    items: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'WebSockets', 'Microservices'],
  },
  {
    category: 'Database',
    icon: Database,
    color: 'from-amber-500 to-orange-500',
    glow: 'group-hover:shadow-amber-500/20',
    items: ['MongoDB', 'PostgreSQL', 'Redis', 'Prisma', 'Mongoose', 'SQL'],
  },
  {
    category: 'DevOps & Tools',
    icon: Cpu,
    color: 'from-purple-500 to-pink-500',
    glow: 'group-hover:shadow-purple-500/20',
    items: ['Docker', 'AWS', 'CI/CD', 'Git', 'Linux', 'Vercel'],
  },
];

const STATS = [
  { value: '3+', label: 'Years Experience' },
  { value: '40+', label: 'Projects Shipped' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '12K+', label: 'GitHub Stars' },
];

// ── Fetch projects server-side ───────────────────────────────────────────────

async function getProjects() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/projects?featured=true&limit=6`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.projects || [];
  } catch {
    return [];
  }
}

// ── Page Component ───────────────────────────────────────────────────────────

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg pt-16"
      >
        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-600/8 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8 animate-fade-up">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Available for new opportunities
          </div>

          {/* Main heading */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight mb-6 animate-fade-up"
            style={{ fontFamily: 'Space Grotesk, sans-serif', animationDelay: '100ms' }}
          >
            <span className="text-white">Hi, I&apos;m </span>
            <span className="gradient-text">Alex Morgan</span>
            <span className="block text-white mt-2">Full Stack</span>
            <span className="gradient-text-cyan">Developer.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
            style={{ animationDelay: '200ms' }}
          >
            I craft{' '}
            <span className="text-indigo-400 font-medium">performant web applications</span>
            {' '}with React & Next.js, backed by{' '}
            <span className="text-purple-400 font-medium">scalable Node.js APIs</span>
            {' '}and modern databases. From idea to deployment.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up"
            style={{ animationDelay: '300ms' }}
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
            >
              View My Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 backdrop-blur-sm"
            >
              Get In Touch
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 text-slate-400 hover:text-white font-medium transition-colors duration-200"
            >
              <Download size={16} />
              Resume
            </a>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-up"
            style={{ animationDelay: '400ms' }}
          >
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-200"
              >
                <div className="text-2xl sm:text-3xl font-black gradient-text" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {value}
                </div>
                <div className="text-xs text-slate-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#skills"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 hover:text-slate-400 transition-colors animate-bounce"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown size={16} />
        </a>
      </section>

      {/* ── Skills ───────────────────────────────────────────────── */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Layers size={12} />
              Tech Stack
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Skills &{' '}
              <span className="gradient-text">Technologies</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto">
              Tools and technologies I use to bring ideas to life — from design systems to distributed infrastructure.
            </p>
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SKILLS.map(({ category, icon: Icon, color, glow, items }) => (
              <div
                key={category}
                className={`group relative p-6 rounded-2xl bg-slate-900/60 border border-white/8 hover:border-white/16 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${glow}`}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                    <Icon size={16} className="text-white" />
                  </div>
                  <h3 className="font-bold text-white text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {category}
                  </h3>
                </div>

                {/* Tech items */}
                <ul className="space-y-2">
                  {items.map((tech) => (
                    <li key={tech} className="flex items-center gap-2 text-sm text-slate-400">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${color} flex-shrink-0`} />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ─────────────────────────────────────────────── */}
      <section id="projects" className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <Code2 size={12} />
                Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Featured{' '}
                <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-slate-400 mt-3 max-w-lg">
                A curated selection of my best work. Each project is a unique solution built with care.
              </p>
            </div>
            <a
              href="#contact"
              className="self-start sm:self-auto flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 text-sm font-medium transition-all"
            >
              <Star size={14} />
              See All Work
            </a>
          </div>

          {/* Projects grid */}
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project, i) => (
                <ProjectCard key={project._id} project={project} index={i} />
              ))}
            </div>
          ) : (
            /* Fallback sample projects when DB is empty */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SAMPLE_PROJECTS.map((project, i) => (
                <ProjectCard key={project._id} project={project} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── About / CTA Banner ────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/10 border border-white/10 p-10 sm:p-14 text-center">
            {/* Decorative orbs */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-4">
                <MapPin size={14} />
                <span>Based in San Francisco, CA</span>
                <span className="mx-2">·</span>
                <Briefcase size={14} />
                <span>Open to remote</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-5 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Let&apos;s build something{' '}
                <span className="gradient-text">amazing together</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                I&apos;m always excited to work on ambitious projects that push boundaries. Whether it&apos;s a startup MVP or a large-scale platform, I&apos;m ready to help.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all duration-200 shadow-xl hover:-translate-y-0.5"
                >
                  Start a Project
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="mailto:alex@example.com"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/5 transition-all duration-200"
                >
                  <Zap size={16} />
                  Quick Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────────── */}
      <section id="contact" className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left info */}
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-5">
                Contact
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-5 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Get in{' '}
                <span className="gradient-text-cyan">Touch</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Have a project in mind, or just want to say hi? My inbox is always open. Whether it&apos;s a question or a collaboration opportunity, I&apos;ll try my best to get back to you!
              </p>

              <div className="space-y-4">
                {[
                  { label: 'Email', value: 'alex@example.com', href: 'mailto:alex@example.com' },
                  { label: 'Twitter / X', value: '@alexmorgan_dev', href: 'https://twitter.com' },
                  { label: 'LinkedIn', value: 'linkedin.com/in/alexmorgan', href: 'https://linkedin.com' },
                ].map(({ label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/8 hover:bg-white/[0.06] hover:border-white/16 transition-all group"
                  >
                    <div>
                      <div className="text-xs text-slate-500 mb-0.5">{label}</div>
                      <div className="text-sm text-slate-300 group-hover:text-white font-medium transition-colors">{value}</div>
                    </div>
                    <ArrowRight size={16} className="ml-auto text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right: contact form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

// ── Sample projects (shown when DB is empty) ─────────────────────────────────
const SAMPLE_PROJECTS = [
  {
    _id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack shopping platform with real-time inventory, Stripe payments, and admin dashboard.',
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com',
    category: 'Web App',
    featured: true,
    status: 'Completed',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=340&fit=crop&auto=format&q=80',
  },
  {
    _id: '2',
    title: 'AI Chat Application',
    description: 'Real-time chat app powered by OpenAI GPT-4 with streaming responses and conversation history.',
    techStack: ['React', 'Express', 'OpenAI API', 'Socket.io', 'PostgreSQL'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com',
    category: 'Web App',
    featured: true,
    status: 'Completed',
    imageUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=340&fit=crop&auto=format&q=80',
  },
  {
    _id: '3',
    title: 'DevOps Dashboard',
    description: 'Kubernetes cluster monitoring dashboard with real-time metrics, alerts, and log aggregation.',
    techStack: ['React', 'Kubernetes', 'Prometheus', 'Grafana', 'Docker'],
    liveLink: '',
    githubLink: 'https://github.com',
    category: 'Tool',
    featured: false,
    status: 'In Progress',
    imageUrl: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=340&fit=crop&auto=format&q=80',
  },
];
