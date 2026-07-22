import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'
import ThemeToggle from '@/components/ThemeProvider'
import './globals.css'
import SearchComponent from '@/components/SearchComponent'

export const metadata: Metadata = {
  title: 'WebSec DevTools - دليل أمن المواقع',
  description: 'أدوات مطورين لأمن المواقع الإلكترونية - شرح الثغرات والأدوات والحماية',
  keywords: ['أمن المواقع', 'ثغرات أمنية', 'DevTools', 'Security', 'Web Security'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen" style={{ background: '#1e1e1e', color: '#cccccc' }}>
        <ThemeProvider>
          {/* DevTools Top Bar */}
          <header style={{ background: '#323233', borderBottom: '1px solid #3c3c3c' }}>
            <div className="flex items-center justify-between px-4 py-1">
              {/* Left: Logo & Tabs */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛡️</span>
                  <span className="font-bold text-sm" style={{ color: '#cccccc' }}>WebSec DevTools</span>
                </div>
                <nav className="hidden md:flex items-center gap-1">
                  <a href="/" className="devtools-tab active">
                    <span>🔍</span> Elements
                  </a>
                  <a href="/fundamentals" className="devtools-tab">
                    <span>📖</span> Console
                  </a>
                  <a href="/vulnerabilities/sql-injection" className="devtools-tab">
                    <span>⚡</span> Sources
                  </a>
                  <a href="/owasp-top-10" className="devtools-tab">
                    <span>🌐</span> Network
                  </a>
                  <a href="/bug-bounty" className="devtools-tab">
                    <span>🎯</span> Application
                  </a>
                  <a href="/career-path" className="devtools-tab">
                    <span>📦</span> Lighthouse
                  </a>
                  <a href="/glossary" className="devtools-tab">
                    <span>💾</span> Storage
                  </a>
                </nav>
              </div>
              {/* Right: Search & Theme */}
              <div className="flex items-center gap-3">
                <div className="hidden md:block w-64">
                  <SearchComponent compact />
                </div>
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="min-h-[calc(100vh-32px)]">
            {children}
          </main>

          {/* DevTools Bottom Bar */}
          <footer style={{ background: '#007acc', color: 'white', fontSize: '12px', padding: '4px 12px' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ec9b0', display: 'inline-block' }}></span>
                  Security Score: 95/100
                </span>
                <span>|</span>
                <span>40 Vulnerabilities</span>
                <span>|</span>
                <span>63 Pages</span>
              </div>
              <div className="flex items-center gap-4">
                <span>WebSec DevTools v2.0</span>
                <span>|</span>
                <span>© 2024 Web Security Guide</span>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
