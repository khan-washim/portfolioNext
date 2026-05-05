import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata = {
  title: {
    default: 'Khan Washim — Full Stack Developer',
    template: '%s | Khan Washim',
  },
  description:
    'Full Stack Developer specializing in React, Next.js, Node.js and modern web technologies. MERN Stack expert available for freelance and full-time opportunities.',
  keywords: ['developer', 'portfolio', 'react', 'nextjs', 'fullstack', 'javascript', 'MERN'],
  authors: [{ name: 'Khan Washim' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Khan Washim Portfolio',
    title: 'Khan Washim — Full Stack Developer',
    description: 'Full Stack Developer specializing in React, Next.js and Node.js.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khan Washim — Full Stack Developer',
    description: 'Full Stack Developer specializing in React, Next.js and Node.js.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e1b4b',
                color: '#e2e8f0',
                border: '1px solid rgba(99,102,241,0.3)',
                borderRadius: '12px',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
              },
              success: { iconTheme: { primary: '#6366f1', secondary: '#fff' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}