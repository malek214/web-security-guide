import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'
import ThemeToggle from '@/components/ThemeProvider'
import './globals.css'
import SearchComponent from '@/components/SearchComponent'

export const metadata: Metadata = {
  title: 'CyberSec 2033 - دليل أمن المواقع',
  description: 'أدوات مطورين لأمن المواقع الإلكترونية - شرح الثغرات والأدوات والحماية',
  keywords: ['أمن المواقع', 'ثغرات أمنية', 'CyberSec', 'Security', 'Web Security', '2033'],
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
      <body className="min-h-screen" style={{ background: '#0a0a0f', color: '#ffffff' }}>
        <ThemeProvider>
          {/* Cyber Header */}
          <header className="glass" style={{ borderBottom: '1px solid rgba(0, 240, 255, 0.2)', position: 'sticky', top: 0, zIndex: 50 }}>
            {/* Neon Line */}
            <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #00f0ff, #a855f7, #ff00ff, transparent)' }}></div>
            
            <div className="flex items-center justify-between px-6 py-3">
              {/* Left: Logo & Tabs */}
              <div className="flex items-center gap-8">
                <a href="/" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center relative" style={{ background: 'linear-gradient(135deg, #00f0ff 0%, #a855f7 50%, #ff00ff 100%)' }}>
                    <span className="text-xl">🛡️</span>
                    <div className="absolute inset-0 rounded-xl" style={{ boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}></div>
                  </div>
                  <div>
                    <span className="font-bold text-lg" style={{ fontFamily: 'Orbitron, sans-serif', color: '#00f0ff', textShadow: '0 0 10px rgba(0, 240, 255, 0.5)' }}>CYBER</span>
                    <span className="font-bold text-lg" style={{ fontFamily: 'Orbitron, sans-serif', color: '#a855f7', textShadow: '0 0 10px rgba(168, 85, 247, 0.5)' }}>SEC</span>
                    <span className="text-xs block" style={{ color: '#5a5a7a', fontFamily: 'Share Tech Mono, monospace' }}>2033</span>
                  </div>
                </a>
                
                <nav className="hidden md:flex items-center gap-1">
                  <a href="/" className="devtools-tab active">
                    <span>🔍</span> الرئيسية
                  </a>
                  <a href="/scanner" className="devtools-tab">
                    <span>⚡</span> الفحص
                  </a>
                  <a href="/fundamentals" className="devtools-tab">
                    <span>📖</span> الأساسيات
                  </a>
                  <a href="/vulnerabilities/sql-injection" className="devtools-tab">
                    <span>🛡️</span> الثغرات
                  </a>
                  <a href="/owasp-top-10" className="devtools-tab">
                    <span>🌐</span> OWASP
                  </a>
                  <a href="/bug-bounty" className="devtools-tab">
                    <span>🎯</span> Bug Bounty
                  </a>
                  <a href="/career-path" className="devtools-tab">
                    <span>📦</span> المسار
                  </a>
                  <a href="/glossary" className="devtools-tab">
                    <span>💾</span> المصطلحات
                  </a>
                </nav>
              </div>
              
              {/* Right: Search & Theme */}
              <div className="flex items-center gap-4">
                <div className="hidden md:block w-72">
                  <SearchComponent compact />
                </div>
                <ThemeToggle />
                <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg" style={{ background: 'rgba(0, 240, 255, 0.1)', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00ff88' }}></span>
                  <span style={{ color: '#00ff88', fontSize: '11px', fontFamily: 'Share Tech Mono, monospace' }}>ONLINE</span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="min-h-[calc(100vh-32px)]" style={{ position: 'relative', zIndex: 1 }}>
            {children}
          </main>

          {/* Cyber Footer */}
          <footer style={{ background: '#0a0a0f', borderTop: '1px solid rgba(0, 240, 255, 0.2)', position: 'relative', zIndex: 1 }}>
            {/* Neon Line */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #00f0ff, #a855f7, #ff00ff, transparent)' }}></div>
            
            <div className="max-w-6xl mx-auto px-6 py-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                {/* Brand */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center relative" style={{ background: 'linear-gradient(135deg, #00f0ff 0%, #a855f7 50%, #ff00ff 100%)' }}>
                      <span className="text-2xl">🛡️</span>
                      <div className="absolute inset-0 rounded-xl" style={{ boxShadow: '0 0 30px rgba(0, 240, 255, 0.4)' }}></div>
                    </div>
                    <div>
                      <span className="font-bold text-xl" style={{ fontFamily: 'Orbitron, sans-serif', color: '#00f0ff', textShadow: '0 0 10px rgba(0, 240, 255, 0.5)' }}>CYBER</span>
                      <span className="font-bold text-xl" style={{ fontFamily: 'Orbitron, sans-serif', color: '#a855f7', textShadow: '0 0 10px rgba(168, 85, 247, 0.5)' }}>SEC</span>
                    </div>
                  </div>
                  <p style={{ color: '#5a5a7a', fontSize: '13px', lineHeight: '1.8', fontFamily: 'Rajdhani, sans-serif' }}>
                    دليلك المستقبلي لأمن المواقع الإلكترونية. تعلم الثغرات والأدوات والحماية.
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00ff88' }}></span>
                    <span style={{ color: '#00ff88', fontSize: '11px', fontFamily: 'Share Tech Mono, monospace' }}>SYSTEM STATUS: ACTIVE</span>
                  </div>
                </div>
                
                {/* Quick Links */}
                <div>
                  <h4 style={{ color: '#00f0ff', fontSize: '12px', fontWeight: 'bold', marginBottom: '16px', fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px', textShadow: '0 0 10px rgba(0, 240, 255, 0.3)' }}>روابط سريعة</h4>
                  <div className="space-y-3">
                    <a href="/fundamentals" className="block animated-underline" style={{ color: '#a0a0b8', fontSize: '13px', fontFamily: 'Rajdhani, sans-serif' }}>الأساسيات</a>
                    <a href="/owasp-top-10" className="block animated-underline" style={{ color: '#a0a0b8', fontSize: '13px', fontFamily: 'Rajdhani, sans-serif' }}>OWASP Top 10</a>
                    <a href="/bug-bounty" className="block animated-underline" style={{ color: '#a0a0b8', fontSize: '13px', fontFamily: 'Rajdhani, sans-serif' }}>Bug Bounty</a>
                    <a href="/career-path" className="block animated-underline" style={{ color: '#a0a0b8', fontSize: '13px', fontFamily: 'Rajdhani, sans-serif' }}>المسار الوظيفي</a>
                  </div>
                </div>
                
                {/* Resources */}
                <div>
                  <h4 style={{ color: '#a855f7', fontSize: '12px', fontWeight: 'bold', marginBottom: '16px', fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px', textShadow: '0 0 10px rgba(168, 85, 247, 0.3)' }}>موارد</h4>
                  <div className="space-y-3">
                    <a href="/interview-questions" className="block animated-underline" style={{ color: '#a0a0b8', fontSize: '13px', fontFamily: 'Rajdhani, sans-serif' }}>أسئلة المقابلات</a>
                    <a href="/case-studies" className="block animated-underline" style={{ color: '#a0a0b8', fontSize: '13px', fontFamily: 'Rajdhani, sans-serif' }}>دراسات حالة</a>
                    <a href="/ctf" className="block animated-underline" style={{ color: '#a0a0b8', fontSize: '13px', fontFamily: 'Rajdhani, sans-serif' }}>تحديات CTF</a>
                    <a href="/best-practices" className="block animated-underline" style={{ color: '#a0a0b8', fontSize: '13px', fontFamily: 'Rajdhani, sans-serif' }}>أفضل الممارسات</a>
                  </div>
                </div>
                
                {/* Stats */}
                <div>
                  <h4 style={{ color: '#ff00ff', fontSize: '12px', fontWeight: 'bold', marginBottom: '16px', fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px', textShadow: '0 0 10px rgba(255, 0, 255, 0.3)' }}>إحصائيات</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 rounded-lg" style={{ background: 'rgba(255, 51, 102, 0.1)' }}>
                      <span className="w-2 h-2 rounded-full" style={{ background: '#ff3366', boxShadow: '0 0 8px rgba(255, 51, 102, 0.5)' }}></span>
                      <span style={{ color: '#a0a0b8', fontSize: '13px', fontFamily: 'Rajdhani, sans-serif' }}>40 ثغرة أمنية</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg" style={{ background: 'rgba(0, 255, 136, 0.1)' }}>
                      <span className="w-2 h-2 rounded-full" style={{ background: '#00ff88', boxShadow: '0 0 8px rgba(0, 255, 136, 0.5)' }}></span>
                      <span style={{ color: '#a0a0b8', fontSize: '13px', fontFamily: 'Rajdhani, sans-serif' }}>63 صفحة محتوى</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg" style={{ background: 'rgba(0, 240, 255, 0.1)' }}>
                      <span className="w-2 h-2 rounded-full" style={{ background: '#00f0ff', boxShadow: '0 0 8px rgba(0, 240, 255, 0.5)' }}></span>
                      <span style={{ color: '#a0a0b8', fontSize: '13px', fontFamily: 'Rajdhani, sans-serif' }}>120+ سؤال اختبار</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg" style={{ background: 'rgba(168, 85, 247, 0.1)' }}>
                      <span className="w-2 h-2 rounded-full" style={{ background: '#a855f7', boxShadow: '0 0 8px rgba(168, 85, 247, 0.5)' }}></span>
                      <span style={{ color: '#a0a0b8', fontSize: '13px', fontFamily: 'Rajdhani, sans-serif' }}>6 دراسات حالة</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom Bar */}
              <div className="pt-6" style={{ borderTop: '1px solid rgba(0, 240, 255, 0.1)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00ff88', boxShadow: '0 0 10px rgba(0, 255, 136, 0.5)' }}></span>
                      <span style={{ color: '#5a5a7a', fontSize: '11px', fontFamily: 'Share Tech Mono, monospace' }}>SECURITY SCORE: 95/100</span>
                    </span>
                    <span style={{ color: 'rgba(0, 240, 255, 0.2)' }}>|</span>
                    <span style={{ color: '#5a5a7a', fontSize: '11px', fontFamily: 'Share Tech Mono, monospace' }}>CYBERSEC v3.0.33</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span style={{ color: '#5a5a7a', fontSize: '11px', fontFamily: 'Share Tech Mono, monospace' }}>© 2033 CYBERSEC</span>
                    <span style={{ color: 'rgba(0, 240, 255, 0.2)' }}>|</span>
                    <span style={{ color: '#00f0ff', fontSize: '11px', fontFamily: 'Share Tech Mono, monospace', textShadow: '0 0 5px rgba(0, 240, 255, 0.3)' }}>POWERED BY NEXT.JS</span>
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
