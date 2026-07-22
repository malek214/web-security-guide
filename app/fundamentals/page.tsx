import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'أساسيات الأمن السيبراني | دليل أمان الويب',
  description: 'تعلم أساسيات الأمن السيبراني من الصفر: الشبكات، HTTP/HTTPS، DNS، وأكثر من ذلك.',
};

const fundamentals = [
  {
    id: 'what-is-cybersecurity',
    icon: '🔒',
    title: 'ما هو الأمن السيبراني؟',
    description: 'الأمن السيبراني هو ممارسة حماية الأنظمة والشبكات والبرامج من الهجمات الرقمية.',
    keyPoints: [
      'حماية البيانات والمعلومات من الوصول غير المصرح به',
      'ضمان سرية البيانات وسلامتها ومصداقيتها',
      'منع الهجمات الإلكترونية والتهديدات المختلفة',
      'تطبيق سياسات وأطر عمل الأمن',
    ],
    categories: [
      { name: 'أمن الشبكات', icon: '🌐', desc: 'حماية البنية التحتية للشبكة' },
      { name: 'أمن التطبيقات', icon: '💻', desc: 'تأمين البرمجيات والتطبيقات' },
      { name: 'أمن المعلومات', icon: '📊', desc: 'حماية البيانات من التسريب' },
      { name: 'أمن العمليات', icon: '⚙️', desc: 'عمليات المراقبة والاستجابة' },
    ],
  },
  {
    id: 'network-basics',
    icon: '🌐',
    title: 'أساسيات الشبكات',
    description: 'فهم كيف تعمل الشبكات هو أساس لفهم الأمن السيبراني.',
    layers: [
      { layer: 7, name: 'طبقة التطبيق', nameEn: 'Application', protocols: 'HTTP, FTP, SMTP, DNS', security: 'XSS, CSRF, SQL Injection' },
      { layer: 6, name: 'طبقة العرض', nameEn: 'Presentation', protocols: 'SSL/TLS, JPEG', security: 'TLS/SSL Configuration' },
      { layer: 5, name: 'طبقة الجلسة', nameEn: 'Session', protocols: 'NetBIOS, RPC', security: 'Session Hijacking' },
      { layer: 4, name: 'طبقة النقل', nameEn: 'Transport', protocols: 'TCP, UDP', security: 'SYN Flood' },
      { layer: 3, name: 'طبقة الشبكة', nameEn: 'Network', protocols: 'IP, ICMP, ARP', security: 'IP Spoofing' },
      { layer: 2, name: 'طبقة ربط البيانات', nameEn: 'Data Link', protocols: 'Ethernet, Wi-Fi', security: 'ARP Poisoning' },
      { layer: 1, name: 'طبقة الفيزيائية', nameEn: 'Physical', protocols: 'USB, Bluetooth', security: 'Physical Access' },
    ],
  },
  {
    id: 'http-basics',
    icon: '📡',
    title: 'بروتوكول HTTP/HTTPS',
    description: 'HTTP هو البروتوكول الأساسي لنقل البيانات على الويب. HTTPS هو النسخة المشفرة منه.',
    methods: [
      { method: 'GET', desc: 'جلب بيانات', security: 'يجب التحقق من المدخلات' },
      { method: 'POST', desc: 'إرسال بيانات', security: 'يجب تشفير البيانات' },
      { method: 'PUT', desc: 'تحديث بيانات', security: 'يجب التحقق من الصلاحيات' },
      { method: 'DELETE', desc: 'حذف بيانات', security: 'يجب تأكيد العملية' },
    ],
    headers: [
      { header: 'Content-Security-Policy', desc: 'منع XSS وحقن المحتوى' },
      { header: 'X-Frame-Options', desc: 'منع Clickjacking' },
      { header: 'Strict-Transport-Security', desc: 'إجبار HTTPS' },
      { header: 'X-Content-Type-Options', desc: 'منع MIME sniffing' },
    ],
  },
  {
    id: 'dns-basics',
    icon: '🌍',
    title: 'نظام DNS',
    description: 'DNS هو دفتر عناوين الإنترنت الذي يترجم أسماء المواقع إلى عناوين IP.',
    records: [
      { type: 'A', desc: 'يربط الاسم بعنوان IPv4' },
      { type: 'AAAA', desc: 'يربط الاسم بعنوان IPv6' },
      { type: 'CNAME', desc: 'اسم مستعار لاسم آخر' },
      { type: 'MX', desc: 'خادم البريد الإلكتروني' },
      { type: 'TXT', desc: 'سجلات نصية للتحقق' },
    ],
  },
  {
    id: 'attack-vectors',
    icon: '⚔️',
    title: 'أنواع الهجمات الشائعة',
    description: 'هناك العديد من أنواع الهجمات التي يجب أن تكون على دراية بها.',
    attacks: [
      { 
        name: 'Phishing', 
        desc: 'رسائل مزيفة لسرقة البيانات', 
        icon: '🎣', 
        slug: 'phishing',
        howItWorks: 'مهاجم ينتحل شخصية جهة موثوقة (بنك، شركة، شخص) لإرسال رسائل أو مواقع مزيفة لسرقة كلمات المرور أو البيانات الحساسة.',
        risks: 'سرقة كلمات المرور، بيانات الائتمان، هوية المستخدم، انتشار البرمجيات الخبيثة.',
        protection: 'التحقق من المرسل، عدم النقر على الروابط المشبوهة، استخدام MFA، التدريب المستمر.',
        tools: ['Gophish', 'King Phisher', 'SET']
      },
      { 
        name: 'Malware', 
        desc: 'برمجيات خبيثة', 
        icon: '🦠', 
        slug: 'malware',
        howItWorks: 'برنامج ضار يُثبَّت على الجهاز بدون علم المستخدم لسرقة البيانات أو تدمير الملفات أو التحكم في النظام.',
        risks: 'سرقة البيانات، تشفير الملفات (Ransomware)، مراقبة المستخدم، تعطيل النظام.',
        protection: 'تحديث antivirus، عدم تحميل ملفات مشبوهة، استخدام防火墙، النسخ الاحتياطي.',
        tools: ['Malwarebytes', 'VirusTotal', 'Wireshark']
      },
      { 
        name: 'DDoS', 
        desc: 'حجب الخدمة الموزع', 
        icon: '💥', 
        slug: 'denial-of-service',
        howItWorks: 'إغراء الخادم بطلبات وهمية من مصادر متعددة لتعطيل الخدمة ومنع المستخدمين الشرعيين من الوصول.',
        risks: 'تعطيل الموقع، خسائر مالية، تلف السمعة، فقدان البيانات.',
        protection: 'استخدام CDNs، Rate Limiting، Firewalls، خوادم موزعة.',
        tools: ['LOIC', 'HULK', 'Cloudflare']
      },
      { 
        name: 'SQL Injection', 
        desc: 'حقن أكواد SQL', 
        icon: '💉', 
        slug: 'sql-injection',
        howItWorks: 'حقن أكواد SQL ضارة في مدخلات التطبيق للتحكم في قاعدة البيانات وسرقة أو تعديل البيانات.',
        risks: 'سرقة جميع البيانات، حذف قاعدة البيانات، تجاوز المصادقة، تنفيذ أوامر.',
        protection: 'Prepared Statements، تنقية المدخلات، تحديث المكتبات، مبدأ الصلاحية الأدنى.',
        tools: ['SQLMap', 'Burp Suite', 'Havij']
      },
      { 
        name: 'XSS', 
        desc: 'حقن نصوص', 
        icon: '📜', 
        slug: 'xss',
        howItWorks: 'حقن سكريبتات ضارة في صفحات الويب لتنفيذها على متصفح المستخدم وسرقة الكوكيز أو الجلسات.',
        risks: 'سرقة الجلسات، تزوير الطلبات، تنصت على المستخدم، تشويه الموقع.',
        protection: 'تنقية المدخلات، CSP Headers، تنقية المخرجات، HttpOnly Cookies.',
        tools: ['XSStrike', 'Dalfox', 'Burp Suite']
      },
      { 
        name: 'Social Engineering', 
        desc: 'الهندسة الاجتماعية', 
        icon: '🧠', 
        slug: 'social-engineering',
        howItWorks: 'التأثير النفسي على الضحية لإقناعه بعمل شيء يضر به (مثل مشاركة كلمة المرور أو تثبيت برنامج ضار).',
        risks: 'سرقة بيانات، اختراق أنظمة، خسائر مالية، تسريب معلومات حساسة.',
        protection: 'التدريب والتوعية، التحقق من الهوية، سياسات الأمان الصارمة.',
        tools: ['SET', 'SocialFish', 'BlackEye']
      },
    ],
  },
];

export default function FundamentalsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#1e1e1e' }} dir="rtl">
      {/* Page Header - DevTools Style */}
      <div style={{ background: '#252526', borderBottom: '1px solid #3c3c3c' }} className="p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2" style={{ color: '#858585', fontSize: '12px' }}>
            <span>Elements</span>
            <span>›</span>
            <span>Console</span>
            <span>›</span>
            <span style={{ color: '#cccccc' }}>Fundamentals</span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3" style={{ color: '#cccccc' }}>
            <span className="text-4xl">🔒</span>
            أساسيات الأمن السيبراني
          </h1>
          <p style={{ color: '#858585', fontSize: '14px' }} className="mt-2">
            دليلك الشامل لفهم أساسيات الأمان والشبكات
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        {/* What is Cybersecurity */}
        <section className="mb-8">
          <div style={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ background: '#333333', borderBottom: '1px solid #3c3c3c', padding: '8px 16px' }} className="flex items-center justify-between">
              <span style={{ color: '#cccccc', fontSize: '12px', fontWeight: 'bold' }}>🔒 ما هو الأمن السيبراني؟</span>
              <span style={{ color: '#858585', fontSize: '11px' }}>Cybersecurity</span>
            </div>
            <div className="p-6">
              <p style={{ color: '#cccccc' }} className="mb-6">{fundamentals[0]?.description}</p>
              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {fundamentals[0]?.keyPoints?.map((point) => (
                  <div key={point} className="flex items-start gap-2 p-3" style={{ background: '#1e1e1e', border: '1px solid #3c3c3c', borderRadius: '4px' }}>
                    <span style={{ color: '#4ec9b0' }}>✓</span>
                    <span style={{ color: '#cccccc', fontSize: '13px' }}>{point}</span>
                  </div>
                ))}
              </div>
              <h3 style={{ color: '#cccccc', fontSize: '14px', fontWeight: 'bold' }} className="mb-3">فروع الأمن السيبراني</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {fundamentals[0]?.categories?.map((cat) => (
                  <div key={cat.name} className="text-center p-4" style={{ background: '#1e1e1e', border: '1px solid #3c3c3c', borderRadius: '4px' }}>
                    <span className="text-3xl block mb-2">{cat.icon}</span>
                    <h4 style={{ color: '#cccccc', fontSize: '13px', fontWeight: 'bold' }}>{cat.name}</h4>
                    <p style={{ color: '#858585', fontSize: '11px' }}>{cat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Network Basics */}
        <section className="mb-8">
          <div style={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ background: '#333333', borderBottom: '1px solid #3c3c3c', padding: '8px 16px' }} className="flex items-center justify-between">
              <span style={{ color: '#cccccc', fontSize: '12px', fontWeight: 'bold' }}>🌐 أساسيات الشبكات</span>
              <span style={{ color: '#858585', fontSize: '11px' }}>OSI Model</span>
            </div>
            <div className="p-6">
              <p style={{ color: '#cccccc' }} className="mb-4">{fundamentals[1]?.description}</p>
              <h3 style={{ color: '#cccccc', fontSize: '14px', fontWeight: 'bold' }} className="mb-3">نموذج OSI - 7 طبقات</h3>
              <div className="space-y-2" dir="ltr">
                {fundamentals[1]?.layers?.map((layer) => (
                  <div key={layer.layer} className="flex flex-col md:flex-row md:items-center justify-between p-3" style={{ background: '#1e1e1e', border: '1px solid #3c3c3c', borderRadius: '4px' }}>
                    <div className="flex items-center gap-3">
                      <span style={{ background: '#007acc', color: '#ffffff', width: '28px', height: '28px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>{layer.layer}</span>
                      <div>
                        <span style={{ color: '#cccccc', fontSize: '13px', fontWeight: 'bold' }}>{layer.name}</span>
                        <span style={{ color: '#858585', fontSize: '11px', marginRight: '8px' }}>({layer.nameEn})</span>
                      </div>
                    </div>
                    <div className="text-sm mt-2 md:mt-0 flex gap-4">
                      <span style={{ color: '#858585', fontSize: '12px' }}>{layer.protocols}</span>
                      <span className="severity-high">{layer.security}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HTTP Basics */}
        <section className="mb-8">
          <div style={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ background: '#333333', borderBottom: '1px solid #3c3c3c', padding: '8px 16px' }} className="flex items-center justify-between">
              <span style={{ color: '#cccccc', fontSize: '12px', fontWeight: 'bold' }}>📡 بروتوكول HTTP/HTTPS</span>
              <span style={{ color: '#858585', fontSize: '11px' }}>HTTP Methods & Headers</span>
            </div>
            <div className="p-6">
              <p style={{ color: '#cccccc' }} className="mb-4">{fundamentals[2]?.description}</p>
              <h3 style={{ color: '#cccccc', fontSize: '14px', fontWeight: 'bold' }} className="mb-3">HTTP Methods</h3>
              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {fundamentals[2]?.methods?.map((m) => (
                  <div key={m.method} className="p-4" style={{ background: '#1e1e1e', border: '1px solid #3c3c3c', borderRadius: '4px' }}>
                    <span style={{ background: '#007acc', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>{m.method}</span>
                    <p style={{ color: '#cccccc', fontSize: '13px' }} className="mt-2">{m.desc}</p>
                    <p style={{ color: '#ce9178', fontSize: '12px' }} className="mt-1">⚠️ {m.security}</p>
                  </div>
                ))}
              </div>
              <h3 style={{ color: '#cccccc', fontSize: '14px', fontWeight: 'bold' }} className="mb-3">Security Headers المهمة</h3>
              <div className="space-y-2">
                {fundamentals[2]?.headers?.map((h) => (
                  <div key={h.header} className="p-3" style={{ background: '#1e1e1e', border: '1px solid #3c3c3c', borderRadius: '4px' }}>
                    <code style={{ color: '#ce9178', fontSize: '12px', fontWeight: 'bold' }}>{h.header}</code>
                    <p style={{ color: '#cccccc', fontSize: '12px' }} className="mt-1">{h.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DNS Basics */}
        <section className="mb-8">
          <div style={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ background: '#333333', borderBottom: '1px solid #3c3c3c', padding: '8px 16px' }} className="flex items-center justify-between">
              <span style={{ color: '#cccccc', fontSize: '12px', fontWeight: 'bold' }}>🌍 نظام DNS</span>
              <span style={{ color: '#858585', fontSize: '11px' }}>DNS Records</span>
            </div>
            <div className="p-6">
              <p style={{ color: '#cccccc' }} className="mb-4">{fundamentals[3]?.description}</p>
              <div className="grid md:grid-cols-3 gap-3">
                {fundamentals[3]?.records?.map((r) => (
                  <div key={r.type} className="text-center p-4" style={{ background: '#1e1e1e', border: '1px solid #3c3c3c', borderRadius: '4px' }}>
                    <span style={{ background: '#569cd6', color: '#ffffff', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>{r.type}</span>
                    <p style={{ color: '#cccccc', fontSize: '12px' }} className="mt-2">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Attack Vectors */}
        <section className="mb-8">
          <div style={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ background: '#333333', borderBottom: '1px solid #3c3c3c', padding: '8px 16px' }} className="flex items-center justify-between">
              <span style={{ color: '#cccccc', fontSize: '12px', fontWeight: 'bold' }}>⚔️ أنواع الهجمات الشائعة</span>
              <span style={{ color: '#858585', fontSize: '11px' }}>Common Attacks</span>
            </div>
            <div className="p-6">
              <p style={{ color: '#cccccc' }} className="mb-4">{fundamentals[4]?.description}</p>
              <div className="space-y-4">
                {fundamentals[4]?.attacks?.map((a) => (
                  <div key={a.name} style={{ border: '1px solid #3c3c3c', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ background: '#333333', borderBottom: '1px solid #3c3c3c', padding: '12px 16px' }} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{a.icon}</span>
                        <div>
                          <h4 style={{ color: '#cccccc', fontSize: '14px', fontWeight: 'bold' }}>{a.name}</h4>
                          <p style={{ color: '#858585', fontSize: '12px' }}>{a.desc}</p>
                        </div>
                      </div>
                      <Link href={`/vulnerabilities/${a.slug}`} style={{ background: '#007acc', color: '#ffffff', padding: '6px 12px', borderRadius: '4px', fontSize: '12px' }} className="hover:opacity-80 transition-opacity">
                        التفاصيل ←
                      </Link>
                    </div>
                    <div className="p-4" style={{ background: '#1e1e1e' }}>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h5 style={{ color: '#cccccc', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>📌 كيف يعمل؟</h5>
                          <p style={{ color: '#858585', fontSize: '12px' }}>{a.howItWorks}</p>
                        </div>
                        <div>
                          <h5 style={{ color: '#f44747', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>⚠️ المخاطر</h5>
                          <p style={{ color: '#858585', fontSize: '12px' }}>{a.risks}</p>
                        </div>
                        <div>
                          <h5 style={{ color: '#4ec9b0', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>🛡️ الحماية</h5>
                          <p style={{ color: '#858585', fontSize: '12px' }}>{a.protection}</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3" style={{ borderTop: '1px solid #3c3c3c' }}>
                        <h5 style={{ color: '#dcdcaa', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>🔧 أفضل الأدوات</h5>
                        <div className="flex flex-wrap gap-2">
                          {a.tools?.map((tool) => (
                            <span key={tool} style={{ background: '#333333', color: '#dcdcaa', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', border: '1px solid #3c3c3c' }}>{tool}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
