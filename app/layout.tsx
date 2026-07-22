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
      <body className="min-h-screen" style={{ background: '#0d1117', color: '#e6edf3' }}>
        <ThemeProvider>
          {/* Premium Header */}
          <header className="glass" style={{ borderBottom: '1px solid #30363d', position: 'sticky', top: 0, zIndex: 50 }}>
            <div className="flex items-center justify-between px-6 py-2">
              {/* Left: Logo & Tabs */}
              <div className="flex items-center gap-6">
                <a href="/" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #58a6ff 0%, #bc8cff 100%)' }}>
                    <span className="text-lg">🛡️</span>
                  </div>
                  <div>
                    <span className="font-bold text-sm" style={{ color: '#e6edf3' }}>WebSec</span>
                    <span className="font-bold text-sm" style={{ color: '#58a6ff' }}> DevTools</span>
                  </div>
                </a>
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
              <div className="flex items-center gap-4">
                <div className="hidden md:block w-72">
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

          {/* Premium Footer */}
          <footer style={{ background: '#161b22', borderTop: '1px solid #30363d' }}>
            <div className="max-w-6xl mx-auto px-6 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                {/* Brand */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #58a6ff 0%, #bc8cff 100%)' }}>
                      <span className="text-xl">🛡️</span>
                    </div>
                    <div>
                      <span className="font-bold" style={{ color: '#e6edf3' }}>WebSec</span>
                      <span className="font-bold" style={{ color: '#58a6ff' }}> DevTools</span>
                    </div>
                  </div>
                  <p style={{ color: '#7d8590', fontSize: '13px', lineHeight: '1.8' }}>
                    دليلك الشامل لأمن المواقع الإلكترونية. تعلم الثغرات والأدوات والحماية.
                  </p>
                </div>
                
                {/* Quick Links */}
                <div>
                  <h4 style={{ color: '#e6edf3', fontSize: '13px', fontWeight: 'bold', marginBottom: '12px' }}>روابط سريعة</h4>
                  <div className="space-y-2">
                    <a href="/fundamentals" className="block" style={{ color: '#7d8590', fontSize: '12px' }}>الأساسيات</a>
                    <a href="/owasp-top-10" className="block" style={{ color: '#7d8590', fontSize: '12px' }}>OWASP Top 10</a>
                    <a href="/bug-bounty" className="block" style={{ color: '#7d8590', fontSize: '12px' }}>Bug Bounty</a>
                    <a href="/career-path" className="block" style={{ color: '#7d8590', fontSize: '12px' }}>المسار الوظيفي</a>
                  </div>
                </div>
                
                {/* Resources */}
                <div>
                  <h4 style={{ color: '#e6edf3', fontSize: '13px', fontWeight: 'bold', marginBottom: '12px' }}>موارد</h4>
                  <div className="space-y-2">
                    <a href="/interview-questions" className="block" style={{ color: '#7d8590', fontSize: '12px' }}>أسئلة المقابلات</a>
                    <a href="/case-studies" className="block" style={{ color: '#7d8590', fontSize: '12px' }}>دراسات حالة</a>
                    <a href="/ctf" className="block" style={{ color: '#7d8590', fontSize: '12px' }}>تحديات CTF</a>
                    <a href="/best-practices" className="block" style={{ color: '#7d8590', fontSize: '12px' }}>أفضل الممارسات</a>
                  </div>
                </div>
                
                {/* Stats */}
                <div>
                  <h4 style={{ color: '#e6edf3', fontSize: '13px', fontWeight: 'bold', marginBottom: '12px' }}>إحصائيات</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: '#f85149' }}></span>
                      <span style={{ color: '#7d8590', fontSize: '12px' }}>40 ثغرة أمنية</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: '#3fb950' }}></span>
                      <span style={{ color: '#7d8590', fontSize: '12px' }}>63 صفحة محتوى</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: '#58a6ff' }}></span>
                      <span style={{ color: '#7d8590', fontSize: '12px' }}>120+ سؤال اختبار</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: '#bc8cff' }}></span>
                      <span style={{ color: '#7d8590', fontSize: '12px' }}>6 دراسات حالة</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom Bar */}
              <div className="pt-6" style={{ borderTop: '1px solid #30363d' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full pulse-glow" style={{ background: '#3fb950' }}></span>
                      <span style={{ color: '#7d8590', fontSize: '11px' }}>Security Score: 95/100</span>
                    </span>
                    <span style={{ color: '#30363d' }}>|</span>
                    <span style={{ color: '#7d8590', fontSize: '11px' }}>WebSec DevTools v2.0</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span style={{ color: '#7d8590', fontSize: '11px' }}>© 2024 Web Security Guide</span>
                    <span style={{ color: '#30363d' }}>|</span>
                    <span style={{ color: '#58a6ff', fontSize: '11px' }}>Built with Next.js</span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
