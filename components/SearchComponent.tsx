'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

interface SearchItem {
  id: string
  title: string
  titleEn: string
  icon: string
  path: string
  category: string
}

const allSearchItems: SearchItem[] = [
  { id: 'sql-injection', title: 'حقن SQL', titleEn: 'SQL Injection', icon: '💉', path: '/vulnerabilities/sql-injection', category: 'ثغرات' },
  { id: 'xss', title: 'XSS', titleEn: 'Cross-Site Scripting', icon: '📜', path: '/vulnerabilities/xss', category: 'ثغرات' },
  { id: 'csrf', title: 'CSRF', titleEn: 'Cross-Site Request Forgery', icon: '🎣', path: '/vulnerabilities/csrf', category: 'ثغرات' },
  { id: 'ssrf', title: 'SSRF', titleEn: 'Server-Side Request Forgery', icon: '🖥️', path: '/vulnerabilities/ssrf', category: 'ثغرات' },
  { id: 'command-injection', title: 'حقن أوامر', titleEn: 'Command Injection', icon: '⌨️', path: '/vulnerabilities/command-injection', category: 'ثغرات' },
  { id: 'nosql-injection', title: 'NoSQL Injection', titleEn: 'NoSQL Injection', icon: '🗄️', path: '/vulnerabilities/nosql-injection', category: 'ثغرات' },
  { id: 'ldap-injection', title: 'LDAP Injection', titleEn: 'LDAP Injection', icon: '📂', path: '/vulnerabilities/ldap-injection', category: 'ثغرات' },
  { id: 'xpath-injection', title: 'XPath Injection', titleEn: 'XPath Injection', icon: '🔍', path: '/vulnerabilities/xpath-injection', category: 'ثغرات' },
  { id: 'crlf-injection', title: 'CRLF Injection', titleEn: 'CRLF Injection', icon: '↩️', path: '/vulnerabilities/crlf-injection', category: 'ثغرات' },
  { id: 'xxe', title: 'XXE', titleEn: 'XML External Entity', icon: '📦', path: '/vulnerabilities/xxe', category: 'ثغرات' },
  { id: 'ssti', title: 'SSTI', titleEn: 'Server-Side Template Injection', icon: '🎨', path: '/vulnerabilities/ssti', category: 'ثغرات' },
  { id: 'lfi', title: 'LFI', titleEn: 'Local File Inclusion', icon: '📁', path: '/vulnerabilities/lfi', category: 'ثغرات' },
  { id: 'idor', title: 'IDOR', titleEn: 'Insecure Direct Object References', icon: '🔗', path: '/vulnerabilities/idor', category: 'ثغرات' },
  { id: 'open-redirect', title: 'Open Redirect', titleEn: 'Open Redirect', icon: '↗️', path: '/vulnerabilities/open-redirect', category: 'ثغرات' },
  { id: 'cors', title: 'CORS Misconfiguration', titleEn: 'CORS Misconfiguration', icon: '🌐', path: '/vulnerabilities/cors', category: 'ثغرات' },
  { id: 'jwt', title: 'JWT Vulnerabilities', titleEn: 'JWT Vulnerabilities', icon: '🔐', path: '/vulnerabilities/jwt', category: 'ثغرات' },
  { id: 'oauth', title: 'OAuth Vulnerabilities', titleEn: 'OAuth Vulnerabilities', icon: '🔑', path: '/vulnerabilities/oauth', category: 'ثغرات' },
  { id: 'password-attacks', title: 'هجمات كلمات المرور', titleEn: 'Password Attacks', icon: '🔒', path: '/vulnerabilities/password-attacks', category: 'ثغرات' },
  { id: 'session-fixation', title: 'تثبيت الجلسة', titleEn: 'Session Fixation', icon: '🎟️', path: '/vulnerabilities/session-fixation', category: 'ثغرات' },
  { id: 'cookie-poisoning', title: 'تسميم الكوكيز', titleEn: 'Cookie Poisoning', icon: '🍪', path: '/vulnerabilities/cookie-poisoning', category: 'ثغرات' },
  { id: 'clickjacking', title: 'اختطاف النقرات', titleEn: 'Clickjacking', icon: '🖱️', path: '/vulnerabilities/clickjacking', category: 'ثغرات' },
  { id: 'api-security', title: 'أمن APIs', titleEn: 'API Security', icon: '🔌', path: '/vulnerabilities/api-security', category: 'ثغرات' },
  { id: 'insecure-deserialization', title: 'عدم آمان إعادة التحويل', titleEn: 'Insecure Deserialization', icon: '🔄', path: '/vulnerabilities/insecure-deserialization', category: 'ثغرات' },
  { id: 'security-misconfiguration', title: 'خطأ في التكوين', titleEn: 'Security Misconfiguration', icon: '⚙️', path: '/vulnerabilities/security-misconfiguration', category: 'ثغرات' },
  { id: 'broken-access-control', title: 'خطأ في التحكم بالوصول', titleEn: 'Broken Access Control', icon: '🚫', path: '/vulnerabilities/broken-access-control', category: 'ثغرات' },
  { id: 'information-disclosure', title: 'الكشف عن المعلومات', titleEn: 'Information Disclosure', icon: '📋', path: '/vulnerabilities/information-disclosure', category: 'ثغرات' },
  { id: 'mass-assignment', title: 'التكليف الجماعي', titleEn: 'Mass Assignment', icon: '📝', path: '/vulnerabilities/mass-assignment', category: 'ثغرات' },
  { id: 'business-logic', title: 'ثغرات المنطق التجاري', titleEn: 'Business Logic', icon: '🧮', path: '/vulnerabilities/business-logic', category: 'ثغرات' },
  { id: 'race-condition', title: 'حالة السباق', titleEn: 'Race Condition', icon: '🏎️', path: '/vulnerabilities/race-condition', category: 'ثغرات' },
  { id: 'http-smuggling', title: 'تهريب الطلبات', titleEn: 'HTTP Request Smuggling', icon: '🚂', path: '/vulnerabilities/http-smuggling', category: 'ثغرات' },
  { id: 'host-header-injection', title: 'حقن رأس الاستضافة', titleEn: 'Host Header Injection', icon: '🏷️', path: '/vulnerabilities/host-header-injection', category: 'ثغرات' },
  { id: 'subdomain-takeover', title: 'استيلاء على النطاقات', titleEn: 'Subdomain Takeover', icon: '🌍', path: '/vulnerabilities/subdomain-takeover', category: 'ثغرات' },
  { id: 'dns-rebinding', title: 'إعادة ربط DNS', titleEn: 'DNS Rebinding', icon: '🔄', path: '/vulnerabilities/dns-rebinding', category: 'ثغرات' },
  { id: 'prototype-pollution', title: 'تلوث النموذج البرمجي', titleEn: 'Prototype Pollution', icon: '🧬', path: '/vulnerabilities/prototype-pollution', category: 'ثغرات' },
  { id: 'denial-of-service', title: 'حجب الخدمة', titleEn: 'Denial of Service', icon: '💥', path: '/vulnerabilities/denial-of-service', category: 'ثغرات' },
  { id: 'file-upload', title: 'ثغرات رفع الملفات', titleEn: 'File Upload Vulnerabilities', icon: '📤', path: '/vulnerabilities/file-upload', category: 'ثغرات' },
  { id: 'ai-security', title: 'أمن الذكاء الاصطناعي', titleEn: 'AI Security', icon: '🤖', path: '/vulnerabilities/ai-security', category: 'ثغرات' },
  { id: 'n8n-security', title: 'أمن n8n', titleEn: 'n8n Security', icon: '⚡', path: '/vulnerabilities/n8n-security', category: 'ثغرات' },
  { id: 'fundamentals', title: 'أساسيات أمن الويب', titleEn: 'Web Security Fundamentals', icon: '📘', path: '/fundamentals', category: 'أقسام' },
  { id: 'owasp-top-10', title: ' OWASP Top 10', titleEn: 'OWASP Top 10', icon: '🏆', path: '/owasp-top-10', category: 'أقسام' },
  { id: 'bug-bounty', title: 'برنامج مكافآت الأخطاء', titleEn: 'Bug Bounty Programs', icon: '🎯', path: '/bug-bounty', category: 'أقسام' },
  { id: 'career-path', title: 'مسار التخصص في الأمن', titleEn: 'Security Career Path', icon: '🚀', path: '/career-path', category: 'أقسام' },
  { id: 'glossary', title: 'مصطلحات أمنية', titleEn: 'Security Glossary', icon: '📚', path: '/glossary', category: 'أقسام' },
  { id: 'best-practices', title: 'أفضل الممارسات', titleEn: 'Best Practices', icon: '✅', path: '/best-practices', category: 'صفحات' },
  { id: 'tools', title: 'أدوات الفحص', titleEn: 'Security Tools', icon: '🔧', path: '/tools', category: 'صفحات' },
  { id: 'resources', title: 'الموارد التعليمية', titleEn: 'Resources', icon: '📖', path: '/resources', category: 'صفحات' },
  { id: 'faq', title: 'أسئلة متكررة', titleEn: 'FAQ', icon: '❓', path: '/faq', category: 'صفحات' },
  { id: 'about', title: 'عن الموقع', titleEn: 'About', icon: 'ℹ️', path: '/about', category: 'صفحات' },
  { id: 'contact', title: 'تواصل معنا', titleEn: 'Contact', icon: '📧', path: '/contact', category: 'صفحات' },
]

interface SearchComponentProps {
  compact?: boolean
}

export default function SearchComponent({ compact = false }: SearchComponentProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const search = useCallback((term: string) => {
    if (!term.trim()) {
      setResults([])
      return
    }

    const normalizedQuery = term.toLowerCase().trim()
    const filtered = allSearchItems.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(normalizedQuery)
      const titleEnMatch = item.titleEn.toLowerCase().includes(normalizedQuery)
      const categoryMatch = item.category.toLowerCase().includes(normalizedQuery)
      return titleMatch || titleEnMatch || categoryMatch
    })

    setResults(filtered)
    setSelectedIndex(-1)
  }, [])

  useEffect(() => {
    search(query)
  }, [query, search])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          window.location.href = results[selectedIndex].path
        }
        break
      case 'Escape':
        setIsOpen(false)
        inputRef.current?.blur()
        break
    }
  }

  const highlightMatch = (text: string, term: string) => {
    if (!term.trim()) return text
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200 text-yellow-900 font-bold px-0.5 rounded">
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  const groupedResults = results.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, SearchItem[]>)

  return (
    <div className="relative" dir="rtl">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="ابحث عن ثغرة، أداة، أو صفحة..."
          className={`w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg border border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all ${
            compact ? 'py-2 pr-10 pl-4 text-sm' : 'py-3 pr-12 pl-4 text-base'
          }`}
          aria-label="بحث"
          aria-expanded={isOpen && results.length > 0}
          aria-controls="search-results"
          role="combobox"
          aria-autocomplete="list"
        />
        <svg
          className={`absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none ${
            compact ? 'right-3 w-4 h-4' : 'right-4 w-5 h-5'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setResults([])
              inputRef.current?.focus()
            }}
            className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 hover:text-white transition-colors"
            aria-label="مسح البحث"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && query.trim() && (
        <div
          ref={dropdownRef}
          id="search-results"
          role="listbox"
          className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 max-h-[70vh] overflow-y-auto"
        >
          {results.length === 0 ? (
            <div className="p-6 text-center">
              <span className="text-4xl block mb-3">🔍</span>
              <p className="text-gray-500 font-medium">لا توجد نتائج لـ &quot;{query}&quot;</p>
              <p className="text-gray-400 text-sm mt-1">جرب البحث بكلمات مختلفة</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {Object.entries(groupedResults).map(([category, items]) => (
                <div key={category}>
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      {category} ({items.length})
                    </span>
                  </div>
                  {items.map((item) => {
                    const globalIndex = results.indexOf(item)
                    return (
                      <Link
                        key={item.id}
                        href={item.path}
                        onClick={() => {
                          setIsOpen(false)
                          setQuery('')
                        }}
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                          globalIndex === selectedIndex
                            ? 'bg-primary-50 text-primary-700'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                        role="option"
                        aria-selected={globalIndex === selectedIndex}
                      >
                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold truncate">
                            {highlightMatch(item.title, query)}
                          </div>
                          <div className="text-sm text-gray-400 truncate" dir="ltr">
                            {highlightMatch(item.titleEn, query)}
                          </div>
                        </div>
                        <svg
                          className="w-4 h-4 text-gray-300 flex-shrink-0 rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )
                  })}
                </div>
              ))}
            </div>
          )}

          {results.length > 0 && (
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={() => {
                setIsOpen(false)
              }}
              className="block px-4 py-3 bg-gray-50 text-center text-primary-600 font-semibold hover:bg-primary-50 transition-colors border-t border-gray-200"
            >
              عرض جميع النتائج ({results.length})
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
