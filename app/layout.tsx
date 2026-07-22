import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'
import ThemeToggle from '@/components/ThemeProvider'
import './globals.css'
import SearchComponent from '@/components/SearchComponent'

export const metadata: Metadata = {
  title: 'دليل أمن المواقع الإلكترونية - حماية موقعك من الثغرات',
  description: 'دليل شامل لشرح ثغرات أمن المواقع الإلكترونية وطرق إصلاحها مع أمثلة عملية وأدوات فحص',
  keywords: ['أمن المواقع', 'ثغرات أمنية', 'SQL Injection', 'XSS', 'CSRF', 'أمن سيبراني', 'حماية المواقع'],
  authors: [{ name: 'فريق أمن المواقع' }],
  creator: 'فريق أمن المواقع',
  publisher: 'دليل أمن المواقع',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://web-security-guide.vercel.app'),
  openGraph: {
    title: 'دليل أمن المواقع الإلكترونية',
    description: 'دليل شامل لشرح ثغرات أمن المواقع الإلكترونية وطرق إصلاحها',
    url: 'https://web-security-guide.vercel.app',
    siteName: 'دليل أمن المواقع',
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'دليل أمن المواقع الإلكترونية',
    description: 'دليل شامل لشرح ثغرات أمن المواقع الإلكترونية وطرق إصلاحها',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-screen bg-white dark:bg-gray-900">
        <ThemeProvider>
          <header className="bg-gray-900 dark:bg-gray-950 text-white sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <a href="/" className="text-xl font-bold flex items-center gap-2">
                  <span className="text-2xl">🛡️</span>
                  <span>أمن المواقع</span>
                </a>
                <div className="hidden md:flex items-center gap-4 text-sm">
                  <a href="/" className="hover:text-primary-400 transition-colors">الرئيسية</a>
                  <a href="/fundamentals" className="hover:text-primary-400 transition-colors">الأساسيات</a>
                  <a href="/vulnerabilities/sql-injection" className="hover:text-primary-400 transition-colors">الثغرات</a>
                  <a href="/owasp-top-10" className="hover:text-primary-400 transition-colors">OWASP</a>
                  <a href="/bug-bounty" className="hover:text-primary-400 transition-colors">Bug Bounty</a>
                  <a href="/career-path" className="hover:text-primary-400 transition-colors">المسار الوظيفي</a>
                  <a href="/glossary" className="hover:text-primary-400 transition-colors">القاموس</a>
                </div>
                <div className="hidden md:block w-64">
                  <SearchComponent compact />
                </div>
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <button className="md:hidden text-2xl" aria-label="القائمة">
                    ☰
                  </button>
                </div>
              </div>
            </nav>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-gray-900 dark:bg-gray-950 text-white py-8 mt-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">🛡️ أمن المواقع</h3>
                  <p className="text-gray-400">دليلك الشامل لحماية المواقع الإلكترونية من الثغرات الأمنية</p>
                </div>
                <div>
                  <h4 className="font-bold mb-4">روابط سريعة</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="/" className="hover:text-white transition-colors">الرئيسية</a></li>
                    <li><a href="/vulnerabilities/sql-injection" className="hover:text-white transition-colors">أنواع الثغرات</a></li>
                    <li><a href="/tools" className="hover:text-white transition-colors">أدوات الفحص</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4">موارد تعليمية</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="/best-practices" className="hover:text-white transition-colors">أفضل الممارسات</a></li>
                    <li><a href="/resources" className="hover:text-white transition-colors">مصادر تعليمية</a></li>
                    <li><a href="/faq" className="hover:text-white transition-colors">أسئلة متكررة</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4">تواصل معنا</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="/contact" className="hover:text-white transition-colors">صفحة التواصل</a></li>
                    <li><a href="/report" className="hover:text-white transition-colors">إرسال تقرير</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>© {new Date().getFullYear()} دليل أمن المواقع الإلكترونية. جميع الحقوق محفوظة.</p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
