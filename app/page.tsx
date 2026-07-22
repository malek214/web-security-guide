import Link from 'next/link'

const allVulnerabilities = [
  { id: 'sql-injection', title: 'SQL Injection', icon: '💉', severity: 'critical', category: 'Injection', color: '#f85149' },
  { id: 'xss', title: 'XSS', icon: '📜', severity: 'high', category: 'Injection', color: '#d29922' },
  { id: 'csrf', title: 'CSRF', icon: '🎣', severity: 'high', category: 'Forgery', color: '#d29922' },
  { id: 'ssrf', title: 'SSRF', icon: '🖥️', severity: 'high', category: 'Forgery', color: '#d29922' },
  { id: 'command-injection', title: 'Command Injection', icon: '⌨️', severity: 'critical', category: 'Injection', color: '#f85149' },
  { id: 'nosql-injection', title: 'NoSQL Injection', icon: '🗄️', severity: 'high', category: 'Injection', color: '#d29922' },
  { id: 'ldap-injection', title: 'LDAP Injection', icon: '📂', severity: 'high', category: 'Injection', color: '#d29922' },
  { id: 'xpath-injection', title: 'XPath Injection', icon: '🔍', severity: 'medium', category: 'Injection', color: '#58a6ff' },
  { id: 'crlf-injection', title: 'CRLF Injection', icon: '↩️', severity: 'medium', category: 'Injection', color: '#58a6ff' },
  { id: 'xxe', title: 'XXE', icon: '📦', severity: 'high', category: 'Injection', color: '#d29922' },
  { id: 'ssti', title: 'SSTI', icon: '🎨', severity: 'critical', category: 'Injection', color: '#f85149' },
  { id: 'lfi', title: 'LFI', icon: '📁', severity: 'high', category: 'Inclusion', color: '#d29922' },
  { id: 'idor', title: 'IDOR', icon: '🔗', severity: 'high', category: 'Access Control', color: '#d29922' },
  { id: 'open-redirect', title: 'Open Redirect', icon: '↗️', severity: 'medium', category: 'Redirect', color: '#58a6ff' },
  { id: 'cors', title: 'CORS Misconfiguration', icon: '🌐', severity: 'medium', category: 'Config', color: '#58a6ff' },
  { id: 'jwt', title: 'JWT Vulnerabilities', icon: '🔐', severity: 'high', category: 'Auth', color: '#d29922' },
  { id: 'oauth', title: 'OAuth Vulnerabilities', icon: '🔑', severity: 'high', category: 'Auth', color: '#d29922' },
  { id: 'password-attacks', title: 'Password Attacks', icon: '🔒', severity: 'high', category: 'Auth', color: '#d29922' },
  { id: 'session-fixation', title: 'Session Fixation', icon: '🎟️', severity: 'medium', category: 'Session', color: '#58a6ff' },
  { id: 'cookie-poisoning', title: 'Cookie Poisoning', icon: '🍪', severity: 'medium', category: 'Session', color: '#58a6ff' },
  { id: 'clickjacking', title: 'Clickjacking', icon: '🖱️', severity: 'medium', category: 'Frontend', color: '#58a6ff' },
  { id: 'api-security', title: 'API Security', icon: '🔌', severity: 'info', category: 'Frontend', color: '#bc8cff' },
  { id: 'insecure-deserialization', title: 'Insecure Deserialization', icon: '🔄', severity: 'high', category: 'Data', color: '#d29922' },
  { id: 'security-misconfiguration', title: 'Security Misconfiguration', icon: '⚙️', severity: 'medium', category: 'Config', color: '#58a6ff' },
  { id: 'broken-access-control', title: 'Broken Access Control', icon: '🚫', severity: 'high', category: 'Access Control', color: '#d29922' },
  { id: 'information-disclosure', title: 'Information Disclosure', icon: '📋', severity: 'medium', category: 'Info', color: '#58a6ff' },
  { id: 'mass-assignment', title: 'Mass Assignment', icon: '📝', severity: 'medium', category: 'Data', color: '#58a6ff' },
  { id: 'business-logic', title: 'Business Logic', icon: '🧮', severity: 'info', category: 'Logic', color: '#bc8cff' },
  { id: 'race-condition', title: 'Race Condition', icon: '🏎️', severity: 'medium', category: 'Timing', color: '#58a6ff' },
  { id: 'http-smuggling', title: 'HTTP Smuggling', icon: '🚂', severity: 'high', category: 'Protocol', color: '#d29922' },
  { id: 'host-header-injection', title: 'Host Header Injection', icon: '🏷️', severity: 'medium', category: 'Header', color: '#58a6ff' },
  { id: 'subdomain-takeover', title: 'Subdomain Takeover', icon: '🌍', severity: 'high', category: 'Domain', color: '#d29922' },
  { id: 'dns-rebinding', title: 'DNS Rebinding', icon: '🔄', severity: 'high', category: 'DNS', color: '#d29922' },
  { id: 'prototype-pollution', title: 'Prototype Pollution', icon: '🧬', severity: 'medium', category: 'JavaScript', color: '#58a6ff' },
  { id: 'denial-of-service', title: 'Denial of Service', icon: '💥', severity: 'high', category: 'Availability', color: '#d29922' },
  { id: 'file-upload', title: 'File Upload', icon: '📤', severity: 'high', category: 'Files', color: '#d29922' },
  { id: 'ai-security', title: 'AI Security', icon: '🤖', severity: 'high', category: 'AI', color: '#d29922' },
  { id: 'phishing', title: 'Phishing', icon: '🎣', severity: 'high', category: 'Social', color: '#d29922' },
  { id: 'malware', title: 'Malware', icon: '🦠', severity: 'critical', category: 'Social', color: '#f85149' },
  { id: 'social-engineering', title: 'Social Engineering', icon: '🧠', severity: 'high', category: 'Social', color: '#d29922' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: '#0d1117' }}>
      {/* Hero Section - Premium */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #161b22 0%, #0d1117 100%)' }}>
        {/* Background Grid Effect */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(88, 166, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(88, 166, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
          <div className="text-center mb-12 fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(88, 166, 255, 0.1)', border: '1px solid rgba(88, 166, 255, 0.3)' }}>
              <span className="w-2 h-2 rounded-full pulse-glow" style={{ background: '#3fb950' }}></span>
              <span style={{ color: '#58a6ff', fontSize: '12px', fontWeight: '600' }}>v2.0 - DevTools Edition</span>
            </div>
            
            {/* Logo */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #58a6ff 0%, #bc8cff 50%, #f778ba 100%)', boxShadow: '0 8px 32px rgba(88, 166, 255, 0.4)' }}>
                <span className="text-4xl">🛡️</span>
              </div>
            </div>
            
            <h1 className="text-5xl font-bold mb-4" style={{ 
              background: 'linear-gradient(135deg, #e6edf3 0%, #58a6ff 50%, #bc8cff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: '1.3'
            }}>
              WebSec DevTools
            </h1>
            <p className="text-xl mb-2" style={{ color: '#e6edf3' }}>أدوات مطورين لأمن المواقع الإلكترونية</p>
            <p style={{ color: '#7d8590', fontSize: '14px' }}>Web Security Guide for Developers</p>
          </div>

          {/* Console Log - Premium */}
          <div className="max-w-3xl mx-auto mb-12 fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="code-devtools">
              <div className="code-devtools-header">
                <div className="flex items-center gap-2">
                  <div className="code-devtools-dot" style={{ background: '#f85149' }}></div>
                  <div className="code-devtools-dot" style={{ background: '#d29922' }}></div>
                  <div className="code-devtools-dot" style={{ background: '#3fb950' }}></div>
                </div>
                <span style={{ color: '#7d8590', fontSize: '11px' }}>Console</span>
              </div>
              <div className="code-devtools-body">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span style={{ color: '#7d8590' }}>{'>'}</span>
                    <span style={{ color: '#79c0ff' }}>WebSec</span>
                    <span style={{ color: '#e6edf3' }}>.init()</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ color: '#7d8590' }}>{'>'}</span>
                    <span style={{ color: '#3fb950' }}>✓</span>
                    <span style={{ color: '#7d8590' }}>&quot;40 vulnerabilities documented&quot;</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ color: '#7d8590' }}>{'>'}</span>
                    <span style={{ color: '#3fb950' }}>✓</span>
                    <span style={{ color: '#7d8590' }}>&quot;Interactive labs & real-world case studies&quot;</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ color: '#7d8590' }}>{'>'}</span>
                    <span style={{ color: '#3fb950' }}>✓</span>
                    <span style={{ color: '#7d8590' }}>&quot;Ready to learn?&quot;</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ color: '#7d8590' }}>{'>'}</span>
                    <span className="cursor-blink" style={{ color: '#58a6ff' }}>await explore()</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats - Premium Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="gradient-border p-4 text-center card-hover">
              <div className="text-4xl mb-2 stat-number" style={{ 
                background: 'linear-gradient(135deg, #f85149 0%, #d29922 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>40</div>
              <div style={{ color: '#7d8590', fontSize: '11px', fontWeight: '600', letterSpacing: '1px' }}>VULNERABILITIES</div>
              <div style={{ color: '#58a6ff', fontSize: '10px' }}>ثغرة أمنية</div>
            </div>
            <div className="gradient-border p-4 text-center card-hover">
              <div className="text-4xl mb-2 stat-number" style={{ 
                background: 'linear-gradient(135deg, #3fb950 0%, #39d2c0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>63</div>
              <div style={{ color: '#7d8590', fontSize: '11px', fontWeight: '600', letterSpacing: '1px' }}>PAGES</div>
              <div style={{ color: '#3fb950', fontSize: '10px' }}>صفحة محتوى</div>
            </div>
            <div className="gradient-border p-4 text-center card-hover">
              <div className="text-4xl mb-2 stat-number" style={{ 
                background: 'linear-gradient(135deg, #58a6ff 0%, #bc8cff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>120+</div>
              <div style={{ color: '#7d8590', fontSize: '11px', fontWeight: '600', letterSpacing: '1px' }}>QUIZ</div>
              <div style={{ color: '#bc8cff', fontSize: '10px' }}>سؤال اختبار</div>
            </div>
            <div className="gradient-border p-4 text-center card-hover">
              <div className="text-4xl mb-2 stat-number" style={{ 
                background: 'linear-gradient(135deg, #bc8cff 0%, #f778ba 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>6</div>
              <div style={{ color: '#7d8590', fontSize: '11px', fontWeight: '600', letterSpacing: '1px' }}>CASE STUDIES</div>
              <div style={{ color: '#f778ba', fontSize: '10px' }}>دراسة حالة</div>
            </div>
          </div>

          {/* Quick Links - Premium */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Link href="/fundamentals" className="gradient-border p-5 card-hover group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(88, 166, 255, 0.15)' }}>
                  <span className="text-xl">📖</span>
                </div>
                <div>
                  <h3 style={{ color: '#e6edf3', fontSize: '14px', fontWeight: 'bold' }}>الأساسيات</h3>
                  <p style={{ color: '#7d8590', fontSize: '11px' }}>Fundamentals</p>
                </div>
              </div>
              <p style={{ color: '#7d8590', fontSize: '12px' }}>تعلم أساسيات الأمن السيبراني من الصفر</p>
            </Link>
            
            <Link href="/owasp-top-10" className="gradient-border p-5 card-hover group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(248, 81, 73, 0.15)' }}>
                  <span className="text-xl">🌐</span>
                </div>
                <div>
                  <h3 style={{ color: '#e6edf3', fontSize: '14px', fontWeight: 'bold' }}>OWASP Top 10</h3>
                  <p style={{ color: '#7d8590', fontSize: '11px' }}>2024 Edition</p>
                </div>
              </div>
              <p style={{ color: '#7d8590', fontSize: '12px' }}>أهم 10 ثغرات حسب تصنيف OWASP</p>
            </Link>
            
            <Link href="/bug-bounty" className="gradient-border p-5 card-hover group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(63, 185, 80, 0.15)' }}>
                  <span className="text-xl">🎯</span>
                </div>
                <div>
                  <h3 style={{ color: '#e6edf3', fontSize: '14px', fontWeight: 'bold' }}>Bug Bounty</h3>
                  <p style={{ color: '#7d8590', fontSize: '11px' }}>Programs & Platforms</p>
                </div>
              </div>
              <p style={{ color: '#7d8590', fontSize: '12px' }}>برامج ومواقع مكافآت الثغرات</p>
            </Link>
            
            <Link href="/career-path" className="gradient-border p-5 card-hover group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(188, 140, 255, 0.15)' }}>
                  <span className="text-xl">💼</span>
                </div>
                <div>
                  <h3 style={{ color: '#e6edf3', fontSize: '14px', fontWeight: 'bold' }}>المسار الوظيفي</h3>
                  <p style={{ color: '#7d8590', fontSize: '11px' }}>Career Path</p>
                </div>
              </div>
              <p style={{ color: '#7d8590', fontSize: '12px' }}>مسارك لتصبح خبير أمن سيبراني</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Vulnerabilities Table - Premium */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="gradient-border overflow-hidden fade-in-up" style={{ animationDelay: '0.8s' }}>
          {/* Table Header */}
          <div className="flex items-center justify-between p-4" style={{ background: '#161b22', borderBottom: '1px solid #30363d' }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(88, 166, 255, 0.15)' }}>
                <span>📋</span>
              </div>
              <div>
                <span style={{ color: '#e6edf3', fontSize: '13px', fontWeight: 'bold' }}>استكشاف الثغرات</span>
                <span style={{ color: '#7d8590', fontSize: '11px', marginRight: '8px' }}>Security Vulnerabilities</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="severity-critical">{allVulnerabilities.filter(v => v.severity === 'critical').length} حرجة</span>
              <span className="severity-high">{allVulnerabilities.filter(v => v.severity === 'high').length} عالية</span>
              <span style={{ color: '#7d8590', fontSize: '11px' }}>{allVulnerabilities.length} عنصر</span>
            </div>
          </div>
          
          {/* Table */}
          <div>
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 p-3 px-5" style={{ background: '#1c2128', borderBottom: '1px solid #30363d' }} dir="ltr">
              <div style={{ color: '#7d8590', fontSize: '10px', fontWeight: '600', gridColumn: 'span 1' }}>#</div>
              <div style={{ color: '#7d8590', fontSize: '10px', fontWeight: '600', gridColumn: 'span 4' }}>الثغرة</div>
              <div style={{ color: '#7d8590', fontSize: '10px', fontWeight: '600', gridColumn: 'span 3' }}>الفئة</div>
              <div style={{ color: '#7d8590', fontSize: '10px', fontWeight: '600', gridColumn: 'span 2' }}>الخطورة</div>
              <div style={{ color: '#7d8590', fontSize: '10px', fontWeight: '600', gridColumn: 'span 2' }}>الإجراء</div>
            </div>
            
            {/* Data Rows */}
            {allVulnerabilities.map((vuln, index) => (
              <Link key={vuln.id} href={`/vulnerabilities/${vuln.id}`} className="block transition-all hover:bg-[rgba(88,166,255,0.05)]" style={{ borderBottom: '1px solid #21262d' }}>
                <div className="grid grid-cols-12 gap-4 items-center p-3 px-5" dir="ltr">
                  <div style={{ color: '#484f58', fontSize: '11px', gridColumn: 'span 1' }}>{index + 1}</div>
                  <div style={{ gridColumn: 'span 4' }} className="flex items-center gap-3">
                    <span className="text-lg">{vuln.icon}</span>
                    <span style={{ color: '#e6edf3', fontSize: '13px', fontWeight: '500' }}>{vuln.title}</span>
                  </div>
                  <div style={{ color: '#7d8590', fontSize: '11px', gridColumn: 'span 3' }}>{vuln.category}</div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <span className={`severity-${vuln.severity}`}>{vuln.severity.toUpperCase()}</span>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <span className="animated-underline" style={{ color: '#58a6ff', fontSize: '12px', fontWeight: '500' }}>عرض التفاصيل ←</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
