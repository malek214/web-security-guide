'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import SearchComponent from '@/components/SearchComponent'

interface SearchItem {
  id: string
  title: string
  titleEn: string
  icon: string
  path: string
  category: string
  description: string
  severity?: string
  color?: string
}

const allSearchItems: SearchItem[] = [
  { id: 'sql-injection', title: 'حقن SQL', titleEn: 'SQL Injection', icon: '💉', path: '/vulnerabilities/sql-injection', category: 'ثغرات', description: 'ثغرة خطيرة تسمح بحقن استعلامات SQL في قاعدة البيانات', severity: 'خطيرة جداً', color: 'red' },
  { id: 'xss', title: 'XSS', titleEn: 'Cross-Site Scripting', icon: '📜', path: '/vulnerabilities/xss', category: 'ثغرات', description: 'حقن سكريبتات ضارة في صفحات الويب', severity: 'خطيرة', color: 'red' },
  { id: 'csrf', title: 'CSRF', titleEn: 'Cross-Site Request Forgery', icon: '🎣', path: '/vulnerabilities/csrf', category: 'ثغرات', description: 'تزوير الطلبات عبر المواقع', severity: 'خطيرة', color: 'orange' },
  { id: 'ssrf', title: 'SSRF', titleEn: 'Server-Side Request Forgery', icon: '🖥️', path: '/vulnerabilities/ssrf', category: 'ثغرات', description: 'تزوير الطلبات من جانب الخادم', severity: 'خطيرة', color: 'red' },
  { id: 'command-injection', title: 'حقن أوامر', titleEn: 'Command Injection', icon: '⌨️', path: '/vulnerabilities/command-injection', category: 'ثغرات', description: 'حقن أوامر نظام التشغيل', severity: 'خطيرة جداً', color: 'red' },
  { id: 'nosql-injection', title: 'NoSQL Injection', titleEn: 'NoSQL Injection', icon: '🗄️', path: '/vulnerabilities/nosql-injection', category: 'ثغرات', description: 'حقن قواعد البيانات NoSQL', severity: 'خطيرة', color: 'red' },
  { id: 'ldap-injection', title: 'LDAP Injection', titleEn: 'LDAP Injection', icon: '📂', path: '/vulnerabilities/ldap-injection', category: 'ثغرات', description: 'حقن خدمات الدليل', severity: 'خطيرة', color: 'orange' },
  { id: 'xpath-injection', title: 'XPath Injection', titleEn: 'XPath Injection', icon: '🔍', path: '/vulnerabilities/xpath-injection', category: 'ثغرات', description: 'حقن تعبيرات XPath', severity: 'متوسطة', color: 'yellow' },
  { id: 'crlf-injection', title: 'CRLF Injection', titleEn: 'CRLF Injection', icon: '↩️', path: '/vulnerabilities/crlf-injection', category: 'ثغرات', description: 'حقن أسطر جديدة في الاستجابة', severity: 'متوسطة', color: 'yellow' },
  { id: 'xxe', title: 'XXE', titleEn: 'XML External Entity', icon: '📦', path: '/vulnerabilities/xxe', category: 'ثغرات', description: 'استغلال كيانات XML الخارجية', severity: 'خطيرة', color: 'red' },
  { id: 'ssti', title: 'SSTI', titleEn: 'Server-Side Template Injection', icon: '🎨', path: '/vulnerabilities/ssti', category: 'ثغرات', description: 'حقن قوالب جانب الخادم', severity: 'خطيرة جداً', color: 'red' },
  { id: 'lfi', title: 'LFI', titleEn: 'Local File Inclusion', icon: '📁', path: '/vulnerabilities/lfi', category: 'ثغرات', description: 'تضمين ملفات محلية', severity: 'خطيرة', color: 'orange' },
  { id: 'idor', title: 'IDOR', titleEn: 'Insecure Direct Object References', icon: '🔗', path: '/vulnerabilities/idor', category: 'ثغرات', description: 'مراجع كائنات مباشرة غير آمنة', severity: 'خطيرة', color: 'orange' },
  { id: 'open-redirect', title: 'Open Redirect', titleEn: 'Open Redirect', icon: '↗️', path: '/vulnerabilities/open-redirect', category: 'ثغرات', description: 'توجيه مفتوح لمواقع خارجية', severity: 'متوسطة', color: 'yellow' },
  { id: 'cors', title: 'CORS Misconfiguration', titleEn: 'CORS Misconfiguration', icon: '🌐', path: '/vulnerabilities/cors', category: 'ثغرات', description: 'خطأ في تكوين سياسة CORS', severity: 'متوسطة', color: 'yellow' },
  { id: 'jwt', title: 'JWT Vulnerabilities', titleEn: 'JWT Vulnerabilities', icon: '🔐', path: '/vulnerabilities/jwt', category: 'ثغرات', description: 'ثغرات رموز JWT', severity: 'خطيرة', color: 'orange' },
  { id: 'oauth', title: 'OAuth Vulnerabilities', titleEn: 'OAuth Vulnerabilities', icon: '🔑', path: '/vulnerabilities/oauth', category: 'ثغرات', description: 'ثغرات بروتوكول OAuth', severity: 'خطيرة', color: 'orange' },
  { id: 'password-attacks', title: 'هجمات كلمات المرور', titleEn: 'Password Attacks', icon: '🔒', path: '/vulnerabilities/password-attacks', category: 'ثغرات', description: 'هجمات على كلمات المرور', severity: 'خطيرة', color: 'orange' },
  { id: 'session-fixation', title: 'تثبيت الجلسة', titleEn: 'Session Fixation', icon: '🎟️', path: '/vulnerabilities/session-fixation', category: 'ثغرات', description: 'تثبيت معرّف الجلسة', severity: 'متوسطة', color: 'yellow' },
  { id: 'cookie-poisoning', title: 'تسميم الكوكيز', titleEn: 'Cookie Poisoning', icon: '🍪', path: '/vulnerabilities/cookie-poisoning', category: 'ثغرات', description: 'تعديل ملفات تعريف الارتباط', severity: 'متوسطة', color: 'yellow' },
  { id: 'clickjacking', title: 'اختطاف النقرات', titleEn: 'Clickjacking', icon: '🖱️', path: '/vulnerabilities/clickjacking', category: 'ثغرات', description: 'خداع المستخدم بالنقر', severity: 'متوسطة', color: 'yellow' },
  { id: 'api-security', title: 'أمن APIs', titleEn: 'API Security', icon: '🔌', path: '/vulnerabilities/api-security', category: 'ثغرات', description: 'ثغرات واجهات البرمجة', severity: 'متغيرة', color: 'blue' },
  { id: 'insecure-deserialization', title: 'عدم آمان إعادة التحويل', titleEn: 'Insecure Deserialization', icon: '🔄', path: '/vulnerabilities/insecure-deserialization', category: 'ثغرات', description: 'ثغرات في تحويل البيانات', severity: 'خطيرة', color: 'red' },
  { id: 'security-misconfiguration', title: 'خطأ في التكوين', titleEn: 'Security Misconfiguration', icon: '⚙️', path: '/vulnerabilities/security-misconfiguration', category: 'ثغرات', description: '错误在系统配置中', severity: 'متوسطة', color: 'yellow' },
  { id: 'broken-access-control', title: 'خطأ في التحكم بالوصول', titleEn: 'Broken Access Control', icon: '🚫', path: '/vulnerabilities/broken-access-control', category: 'ثغرات', description: 'فشل في التحكم بالصلاحيات', severity: 'خطيرة', color: 'red' },
  { id: 'information-disclosure', title: 'الكشف عن المعلومات', titleEn: 'Information Disclosure', icon: '📋', path: '/vulnerabilities/information-disclosure', category: 'ثغرات', description: 'تسريب معلومات حساسة', severity: 'متوسطة', color: 'yellow' },
  { id: 'mass-assignment', title: 'التكليف الجماعي', titleEn: 'Mass Assignment', icon: '📝', path: '/vulnerabilities/mass-assignment', category: 'ثغرات', description: 'تعيين خصائص بشكل جماعي', severity: 'متوسطة', color: 'yellow' },
  { id: 'business-logic', title: 'ثغرات المنطق التجاري', titleEn: 'Business Logic', icon: '🧮', path: '/vulnerabilities/business-logic', category: 'ثغرات', description: 'ثغرات في منطق الأعمال', severity: 'متغيرة', color: 'blue' },
  { id: 'race-condition', title: 'حالة السباق', titleEn: 'Race Condition', icon: '🏎️', path: '/vulnerabilities/race-condition', category: 'ثغرات', description: 'تعارض في التوقيت', severity: 'متوسطة', color: 'yellow' },
  { id: 'http-smuggling', title: 'تهريب الطلبات', titleEn: 'HTTP Request Smuggling', icon: '🚂', path: '/vulnerabilities/http-smuggling', category: 'ثغرات', description: 'تهريب طلبات HTTP', severity: 'خطيرة', color: 'red' },
  { id: 'host-header-injection', title: 'حقن رأس الاستضافة', titleEn: 'Host Header Injection', icon: '🏷️', path: '/vulnerabilities/host-header-injection', category: 'ثغرات', description: 'حقن رأس HTTP Host', severity: 'متوسطة', color: 'yellow' },
  { id: 'subdomain-takeover', title: 'استيلاء على النطاقات', titleEn: 'Subdomain Takeover', icon: '🌍', path: '/vulnerabilities/subdomain-takeover', category: 'ثغرات', description: 'استيلاء على النطاقات الفرعية', severity: 'خطيرة', color: 'orange' },
  { id: 'dns-rebinding', title: 'إعادة ربط DNS', titleEn: 'DNS Rebinding', icon: '🔄', path: '/vulnerabilities/dns-rebinding', category: 'ثغرات', description: 'إعادة تعيين سجلات DNS', severity: 'خطيرة', color: 'orange' },
  { id: 'prototype-pollution', title: 'تلوث النموذج البرمجي', titleEn: 'Prototype Pollution', icon: '🧬', path: '/vulnerabilities/prototype-pollution', category: 'ثغرات', description: 'تلوث سلسلة الت Prototype في JavaScript', severity: 'متوسطة', color: 'yellow' },
  { id: 'denial-of-service', title: 'حجب الخدمة', titleEn: 'Denial of Service', icon: '💥', path: '/vulnerabilities/denial-of-service', category: 'ثغرات', description: 'هجمات حجب الخدمة', severity: 'خطيرة', color: 'red' },
  { id: 'file-upload', title: 'ثغرات رفع الملفات', titleEn: 'File Upload Vulnerabilities', icon: '📤', path: '/vulnerabilities/file-upload', category: 'ثغرات', description: 'ثغرات في رفع الملفات', severity: 'خطيرة', color: 'orange' },
  { id: 'ai-security', title: 'أمن الذكاء الاصطناعي', titleEn: 'AI Security', icon: '🤖', path: '/vulnerabilities/ai-security', category: 'ثغرات', description: 'أمن تطبيقات الذكاء الاصطناعي', severity: 'خطيرة', color: 'purple' },
  { id: 'n8n-security', title: 'أمن n8n', titleEn: 'n8n Security', icon: '⚡', path: '/vulnerabilities/n8n-security', category: 'ثغرات', description: 'أمن منصة الأتمتة n8n', severity: 'خطيرة', color: 'orange' },
  { id: 'fundamentals', title: 'أساسيات أمن الويب', titleEn: 'Web Security Fundamentals', icon: '📘', path: '/fundamentals', category: 'أقسام', description: 'تعلم المبادئ الأساسية لأمن تطبيقات الويب' },
  { id: 'owasp-top-10', title: 'OWASP Top 10', titleEn: 'OWASP Top 10', icon: '🏆', path: '/owasp-top-10', category: 'أقسام', description: 'قائمة OWASP العشرة الأولى للثغرات' },
  { id: 'bug-bounty', title: 'برنامج مكافآت الأخطاء', titleEn: 'Bug Bounty Programs', icon: '🎯', path: '/bug-bounty', category: 'أقسام', description: 'دليل شامل لبرامج مكافآت الأخطاء الأمنية' },
  { id: 'career-path', title: 'مسار التخصص في الأمن', titleEn: 'Security Career Path', icon: '🚀', path: '/career-path', category: 'أقسام', description: 'دليل المسار المهني في مجال الأمن السيبراني' },
  { id: 'glossary', title: 'مصطلحات أمنية', titleEn: 'Security Glossary', icon: '📚', path: '/glossary', category: 'أقسام', description: 'قاموس المصطلحات الأمنية الشائعة' },
  { id: 'best-practices', title: 'أفضل الممارسات', titleEn: 'Best Practices', icon: '✅', path: '/best-practices', category: 'صفحات', description: 'أفضل الممارسات الأمنية للمطورين' },
  { id: 'tools', title: 'أدوات الفحص', titleEn: 'Security Tools', icon: '🔧', path: '/tools', category: 'صفحات', description: 'أدوات فحص واكتشاف الثغرات' },
  { id: 'resources', title: 'الموارد التعليمية', titleEn: 'Resources', icon: '📖', path: '/resources', category: 'صفحات', description: 'موارد تعليمية لتعلم أمن الويب' },
  { id: 'faq', title: 'أسئلة متكررة', titleEn: 'FAQ', icon: '❓', path: '/faq', category: 'صفحات', description: 'الأسئلة الشائعة حول أمن الويب' },
  { id: 'about', title: 'عن الموقع', titleEn: 'About', icon: 'ℹ️', path: '/about', category: 'صفحات', description: 'معلومات عن دليل أمن المواقع' },
  { id: 'contact', title: 'تواصل معنا', titleEn: 'Contact', icon: '📧', path: '/contact', category: 'صفحات', description: 'التواصل مع فريق العمل' },
]

const severityColors: Record<string, string> = {
  'red': 'bg-red-100 text-red-700 border-red-200',
  'orange': 'bg-orange-100 text-orange-700 border-orange-200',
  'yellow': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'blue': 'bg-blue-100 text-blue-700 border-blue-200',
  'purple': 'bg-purple-100 text-purple-700 border-purple-200',
}

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<SearchItem[]>([])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const normalizedQuery = query.toLowerCase().trim()
    const filtered = allSearchItems.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(normalizedQuery)
      const titleEnMatch = item.titleEn.toLowerCase().includes(normalizedQuery)
      const descMatch = item.description.toLowerCase().includes(normalizedQuery)
      const categoryMatch = item.category.toLowerCase().includes(normalizedQuery)
      return titleMatch || titleEnMatch || descMatch || categoryMatch
    })

    setResults(filtered)
  }, [query])

  const groupedResults = results.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, SearchItem[]>)

  return (
    <div className="max-w-6xl mx-auto" dir="rtl">
      <section className="text-center py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">نتائج البحث</h1>
        <p className="text-gray-600 text-lg mb-8">ابحث في جميع الثغرات والأقسام والصفحات</p>

        <div className="max-w-2xl mx-auto">
          <SearchComponent />
        </div>
      </section>

      <section className="mb-12">
        {initialQuery && !query && (
          <div className="text-center py-8">
            <span className="text-5xl block mb-4">🔍</span>
            <p className="text-gray-500 text-lg">جاري البحث عن &quot;{initialQuery}&quot;...</p>
          </div>
        )}

        {query.trim() && results.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl block mb-4">📭</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">لا توجد نتائج</h2>
            <p className="text-gray-500 mb-6">
              لم نجد نتائج تطابق &quot;{query}&quot;. جرّب كلمات بحث مختلفة.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['SQL Injection', 'XSS', 'CSRF', 'OWASP', 'أدوات'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setQuery(suggestion)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-8">
            <div className="text-sm text-gray-500 font-medium">
              عُثر على {results.length} نتيجة لـ &quot;{query}&quot;
            </div>

            {Object.entries(groupedResults).map(([category, items]) => (
              <div key={category}>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                  {category}
                  <span className="text-sm font-normal text-gray-400">({items.length})</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((item) => (
                    <Link
                      key={item.id}
                      href={item.path}
                      className="group block bg-white border border-gray-200 rounded-xl p-5 card-hover"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl group-hover:scale-110 transition-transform">
                          {item.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-1" dir="ltr">
                            {item.titleEn}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          {item.severity && item.color && (
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${severityColors[item.color]}`}
                            >
                              {item.severity}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {!query.trim() && (
          <div className="text-center py-12">
            <span className="text-6xl block mb-4">💡</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">ابدأ البحث</h2>
            <p className="text-gray-500 mb-8">
              اكتب كلمة في مربع البحث أعلاه للعثور على الثغرات والأقسام والصفحات
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-xl p-6 text-center card-hover">
                <span className="text-4xl block mb-3">💉</span>
                <h3 className="font-bold text-gray-900 mb-1">الثغرات</h3>
                <p className="text-gray-500 text-sm">more than 35 ثغرة أمنية موثقة</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 text-center card-hover">
                <span className="text-4xl block mb-3">🏆</span>
                <h3 className="font-bold text-gray-900 mb-1">الأقسام</h3>
                <p className="text-gray-500 text-sm">أساسيات، OWASP، مسار مهني</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 text-center card-hover">
                <span className="text-4xl block mb-3">🔧</span>
                <h3 className="font-bold text-gray-900 mb-1">الأدوات</h3>
                <p className="text-gray-500 text-sm">أدوات فحص واكتشاف الثغرات</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto text-center py-20" dir="rtl">
          <span className="text-5xl block mb-4">🔍</span>
          <p className="text-gray-500 text-lg">جاري التحميل...</p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  )
}
