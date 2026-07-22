import Link from 'next/link'

const allVulnerabilities = [
  { id: 'sql-injection', title: 'SQL Injection', icon: '💉', severity: 'critical', category: 'Injection', color: '#f44747' },
  { id: 'xss', title: 'XSS', icon: '📜', severity: 'high', category: 'Injection', color: '#f44747' },
  { id: 'csrf', title: 'CSRF', icon: '🎣', severity: 'high', category: 'Forgery', color: '#ce9178' },
  { id: 'ssrf', title: 'SSRF', icon: '🖥️', severity: 'high', category: 'Forgery', color: '#f44747' },
  { id: 'command-injection', title: 'Command Injection', icon: '⌨️', severity: 'critical', category: 'Injection', color: '#f44747' },
  { id: 'nosql-injection', title: 'NoSQL Injection', icon: '🗄️', severity: 'high', category: 'Injection', color: '#ce9178' },
  { id: 'ldap-injection', title: 'LDAP Injection', icon: '📂', severity: 'high', category: 'Injection', color: '#ce9178' },
  { id: 'xpath-injection', title: 'XPath Injection', icon: '🔍', severity: 'medium', category: 'Injection', color: '#dcdcaa' },
  { id: 'crlf-injection', title: 'CRLF Injection', icon: '↩️', severity: 'medium', category: 'Injection', color: '#dcdcaa' },
  { id: 'xxe', title: 'XXE', icon: '📦', severity: 'high', category: 'Injection', color: '#f44747' },
  { id: 'ssti', title: 'SSTI', icon: '🎨', severity: 'critical', category: 'Injection', color: '#f44747' },
  { id: 'lfi', title: 'LFI', icon: '📁', severity: 'high', category: 'Inclusion', color: '#ce9178' },
  { id: 'idor', title: 'IDOR', icon: '🔗', severity: 'high', category: 'Access Control', color: '#ce9178' },
  { id: 'open-redirect', title: 'Open Redirect', icon: '↗️', severity: 'medium', category: 'Redirect', color: '#dcdcaa' },
  { id: 'cors', title: 'CORS Misconfiguration', icon: '🌐', severity: 'medium', category: 'Config', color: '#dcdcaa' },
  { id: 'jwt', title: 'JWT Vulnerabilities', icon: '🔐', severity: 'high', category: 'Auth', color: '#ce9178' },
  { id: 'oauth', title: 'OAuth Vulnerabilities', icon: '🔑', severity: 'high', category: 'Auth', color: '#ce9178' },
  { id: 'password-attacks', title: 'Password Attacks', icon: '🔒', severity: 'high', category: 'Auth', color: '#ce9178' },
  { id: 'session-fixation', title: 'Session Fixation', icon: '🎟️', severity: 'medium', category: 'Session', color: '#dcdcaa' },
  { id: 'cookie-poisoning', title: 'Cookie Poisoning', icon: '🍪', severity: 'medium', category: 'Session', color: '#dcdcaa' },
  { id: 'clickjacking', title: 'Clickjacking', icon: '🖱️', severity: 'medium', category: 'Frontend', color: '#dcdcaa' },
  { id: 'api-security', title: 'API Security', icon: '🔌', severity: 'info', category: 'Frontend', color: '#569cd6' },
  { id: 'insecure-deserialization', title: 'Insecure Deserialization', icon: '🔄', severity: 'high', category: 'Data', color: '#f44747' },
  { id: 'security-misconfiguration', title: 'Security Misconfiguration', icon: '⚙️', severity: 'medium', category: 'Config', color: '#dcdcaa' },
  { id: 'broken-access-control', title: 'Broken Access Control', icon: '🚫', severity: 'high', category: 'Access Control', color: '#f44747' },
  { id: 'information-disclosure', title: 'Information Disclosure', icon: '📋', severity: 'medium', category: 'Info', color: '#dcdcaa' },
  { id: 'mass-assignment', title: 'Mass Assignment', icon: '📝', severity: 'medium', category: 'Data', color: '#dcdcaa' },
  { id: 'business-logic', title: 'Business Logic', icon: '🧮', severity: 'info', category: 'Logic', color: '#569cd6' },
  { id: 'race-condition', title: 'Race Condition', icon: '🏎️', severity: 'medium', category: 'Timing', color: '#dcdcaa' },
  { id: 'http-smuggling', title: 'HTTP Smuggling', icon: '🚂', severity: 'high', category: 'Protocol', color: '#f44747' },
  { id: 'host-header-injection', title: 'Host Header Injection', icon: '🏷️', severity: 'medium', category: 'Header', color: '#dcdcaa' },
  { id: 'subdomain-takeover', title: 'Subdomain Takeover', icon: '🌍', severity: 'high', category: 'Domain', color: '#ce9178' },
  { id: 'dns-rebinding', title: 'DNS Rebinding', icon: '🔄', severity: 'high', category: 'DNS', color: '#ce9178' },
  { id: 'prototype-pollution', title: 'Prototype Pollution', icon: '🧬', severity: 'medium', category: 'JavaScript', color: '#dcdcaa' },
  { id: 'denial-of-service', title: 'Denial of Service', icon: '💥', severity: 'high', category: 'Availability', color: '#f44747' },
  { id: 'file-upload', title: 'File Upload', icon: '📤', severity: 'high', category: 'Files', color: '#ce9178' },
  { id: 'ai-security', title: 'AI Security', icon: '🤖', severity: 'high', category: 'AI', color: '#ce9178' },
  { id: 'phishing', title: 'Phishing', icon: '🎣', severity: 'high', category: 'Social', color: '#ce9178' },
  { id: 'malware', title: 'Malware', icon: '🦠', severity: 'critical', category: 'Social', color: '#f44747' },
  { id: 'social-engineering', title: 'Social Engineering', icon: '🧠', severity: 'high', category: 'Social', color: '#ce9178' },
]

const categories = Array.from(new Set(allVulnerabilities.map(v => v.category)))

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: '#1e1e1e' }}>
      {/* Hero Section - DevTools Style */}
      <div style={{ background: '#252526', borderBottom: '1px solid #3c3c3c' }} className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🛡️</span>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#cccccc' }}>WebSec DevTools</h1>
              <p style={{ color: '#858585', fontSize: '14px' }}>دليل أمن المواقع الإلكترونية | Web Security Guide</p>
            </div>
          </div>
          
          {/* Console Log Style */}
          <div className="mt-6" style={{ background: '#1e1e1e', border: '1px solid #3c3c3c', borderRadius: '4px', padding: '12px', fontFamily: 'monospace', fontSize: '13px' }}>
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color: '#6a9955' }}>{'>'}</span>
              <span style={{ color: '#cccccc' }}>console.log(&quot;Welcome to Web Security Guide&quot;)</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color: '#6a9955' }}>{'>'}</span>
              <span style={{ color: '#4ec9b0' }}>&gt; &quot;40 vulnerabilities documented with detailed explanations&quot;</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color: '#6a9955' }}>{'>'}</span>
              <span style={{ color: '#dcdcaa' }}>&gt; &quot;Interactive labs, tools, and real-world case studies&quot;</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: '#6a9955' }}>{'>'}</span>
              <span style={{ color: '#569cd6' }}>&gt; &quot;Ready to learn? Start exploring!&quot;</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: '#252526', borderBottom: '1px solid #3c3c3c' }} className="px-4">
        <div className="max-w-6xl mx-auto flex">
          <a href="/" className="devtools-tab active">
            <span>🔍</span> Elements
          </a>
          <a href="/fundamentals" className="devtools-tab">
            <span>📖</span> Console
          </a>
          <a href="/owasp-top-10" className="devtools-tab">
            <span>🌐</span> Network
          </a>
          <a href="/bug-bounty" className="devtools-tab">
            <span>🎯</span> Application
          </a>
          <a href="/interview-questions" className="devtools-tab">
            <span>📦</span> Lighthouse
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div style={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '4px', padding: '12px' }}>
            <div style={{ color: '#858585', fontSize: '11px', marginBottom: '4px' }}>VULNERABILITIES</div>
            <div style={{ color: '#cccccc', fontSize: '24px', fontWeight: 'bold' }}>40</div>
          </div>
          <div style={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '4px', padding: '12px' }}>
            <div style={{ color: '#858585', fontSize: '11px', marginBottom: '4px' }}>PAGES</div>
            <div style={{ color: '#cccccc', fontSize: '24px', fontWeight: 'bold' }}>63</div>
          </div>
          <div style={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '4px', padding: '12px' }}>
            <div style={{ color: '#858585', fontSize: '11px', marginBottom: '4px' }}>QUIZ QUESTIONS</div>
            <div style={{ color: '#cccccc', fontSize: '24px', fontWeight: 'bold' }}>120+</div>
          </div>
          <div style={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '4px', padding: '12px' }}>
            <div style={{ color: '#858585', fontSize: '11px', marginBottom: '4px' }}>CASE STUDIES</div>
            <div style={{ color: '#cccccc', fontSize: '24px', fontWeight: 'bold' }}>6</div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Link href="/fundamentals" style={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '4px', padding: '12px' }} className="hover:border-[#007acc] transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span>📖</span>
              <span style={{ color: '#cccccc', fontSize: '13px', fontWeight: 'bold' }}>الأساسيات</span>
            </div>
            <div style={{ color: '#858585', fontSize: '11px' }}>Fundamentals</div>
          </Link>
          <Link href="/owasp-top-10" style={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '4px', padding: '12px' }} className="hover:border-[#007acc] transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span>🌐</span>
              <span style={{ color: '#cccccc', fontSize: '13px', fontWeight: 'bold' }}>OWASP Top 10</span>
            </div>
            <div style={{ color: '#858585', fontSize: '11px' }}>2024 Edition</div>
          </Link>
          <Link href="/bug-bounty" style={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '4px', padding: '12px' }} className="hover:border-[#007acc] transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span>🎯</span>
              <span style={{ color: '#cccccc', fontSize: '13px', fontWeight: 'bold' }}>Bug Bounty</span>
            </div>
            <div style={{ color: '#858585', fontSize: '11px' }}>Programs & Platforms</div>
          </Link>
          <Link href="/career-path" style={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '4px', padding: '12px' }} className="hover:border-[#007acc] transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span>💼</span>
              <span style={{ color: '#cccccc', fontSize: '13px', fontWeight: 'bold' }}>المسار الوظيفي</span>
            </div>
            <div style={{ color: '#858585', fontSize: '11px' }}>Career Path</div>
          </Link>
        </div>

        {/* Vulnerabilities Table - DevTools Style */}
        <div style={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '4px', overflow: 'hidden' }}>
          {/* Table Header */}
          <div style={{ background: '#333333', borderBottom: '1px solid #3c3c3c', padding: '8px 16px' }} className="flex items-center justify-between">
            <span style={{ color: '#cccccc', fontSize: '12px', fontWeight: 'bold' }}>📋 DOM Explorer - Security Vulnerabilities</span>
            <span style={{ color: '#858585', fontSize: '11px' }}>{allVulnerabilities.length} items</span>
          </div>
          
          {/* Table */}
          <div>
            {/* Header Row */}
            <div style={{ background: '#2d2d2d', borderBottom: '1px solid #3c3c3c', padding: '8px 16px' }} className="grid grid-cols-12 gap-4" dir="ltr">
              <div style={{ color: '#858585', fontSize: '11px', gridColumn: 'span 1' }}>#</div>
              <div style={{ color: '#858585', fontSize: '11px', gridColumn: 'span 4' }}>Vulnerability</div>
              <div style={{ color: '#858585', fontSize: '11px', gridColumn: 'span 3' }}>Category</div>
              <div style={{ color: '#858585', fontSize: '11px', gridColumn: 'span 2' }}>Severity</div>
              <div style={{ color: '#858585', fontSize: '11px', gridColumn: 'span 2' }}>Action</div>
            </div>
            
            {/* Data Rows */}
            {allVulnerabilities.map((vuln, index) => (
              <Link key={vuln.id} href={`/vulnerabilities/${vuln.id}`} style={{ borderBottom: '1px solid #3c3c3c' }} className="block hover:bg-[#2a2d2e] transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center p-3 px-4" dir="ltr">
                  <div style={{ color: '#858585', fontSize: '12px', gridColumn: 'span 1' }}>{index + 1}</div>
                  <div style={{ gridColumn: 'span 4' }} className="flex items-center gap-2">
                    <span>{vuln.icon}</span>
                    <span style={{ color: '#cccccc', fontSize: '13px' }}>{vuln.title}</span>
                  </div>
                  <div style={{ color: '#858585', fontSize: '12px', gridColumn: 'span 3' }}>{vuln.category}</div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <span className={`severity-${vuln.severity}`}>{vuln.severity.toUpperCase()}</span>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <span style={{ color: '#007acc', fontSize: '12px' }}>View Details →</span>
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
