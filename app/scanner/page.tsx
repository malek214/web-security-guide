'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ScannerPage() {
  const [url, setUrl] = useState('')
  const [scanning, setScanning] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [expandedVulns, setExpandedVulns] = useState<Set<number>>(new Set())
  const [error, setError] = useState('')

  const toggleVuln = (index: number) => {
    setExpandedVulns(prev => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const expandAll = () => {
    if (results?.findings) {
      setExpandedVulns(new Set(results.findings.map((_: any, i: number) => i)))
    }
  }

  const collapseAll = () => {
    setExpandedVulns(new Set())
  }

  const handleScan = async () => {
    if (!url) return
    
    let finalUrl = url
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      finalUrl = 'https://' + url
    }
    
    setScanning(true)
    setError('')
    setResults(null)
    setExpandedVulns(new Set())

    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: finalUrl }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        setError(data.error || 'حدث خطأ أثناء الفحص')
      } else {
        setResults(data)
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال بالخادم')
    } finally {
      setScanning(false)
    }
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
            أدخل رابط الموقع لفحصه واكتشاف الثغرات المحتملة
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
                  placeholder="example.com"
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

        {/* Error */}
        {error && (
          <div className="gradient-border p-4 mb-6" style={{ borderColor: '#f85149' }}>
            <div className="flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <p style={{ color: '#f85149', fontSize: '14px' }}>{error}</p>
            </div>
          </div>
        )}

        {/* Scanning Animation */}
        {scanning && (
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-4 h-4 rounded-full animate-pulse" style={{ background: '#58a6ff' }}></div>
              <div className="w-4 h-4 rounded-full animate-pulse" style={{ background: '#bc8cff', animationDelay: '0.2s' }}></div>
              <div className="w-4 h-4 rounded-full animate-pulse" style={{ background: '#f778ba', animationDelay: '0.4s' }}></div>
            </div>
            <p style={{ color: '#e6edf3', fontSize: '16px', fontWeight: 'bold' }}>جاري فحص الموقع...</p>
            <p style={{ color: '#7d8590', fontSize: '13px', marginTop: '8px' }}>تحليل الرؤوس والتقنيات والثغرات المحتملة</p>
          </div>
        )}

        {/* Results */}
        {results && !scanning && (
          <div className="space-y-6">
            {/* Site Info */}
            <div className="gradient-border p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #58a6ff 0%, #bc8cff 100%)' }}>
                    <span className="text-2xl">🌐</span>
                  </div>
                  <div>
                    <h3 style={{ color: '#e6edf3', fontSize: '18px', fontWeight: 'bold' }}>{results.domain}</h3>
                    <p style={{ color: '#7d8590', fontSize: '12px', direction: 'ltr' }}>{results.url}</p>
                  </div>
                </div>
                {results.statusCode && (
                  <span className={`severity-${results.statusCode < 400 ? 'low' : 'high'}`}>
                    {results.statusCode}
                  </span>
                )}
              </div>

              {/* Technologies */}
              {results.technologies?.length > 0 && (
                <div className="mb-4">
                  <h4 style={{ color: '#58a6ff', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>التقنيات المكتشفة</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.technologies.map((tech: string) => (
                      <span key={tech} className="severity-info">{tech}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Headers */}
              {Object.keys(results.headers || {}).length > 0 && (
                <div>
                  <h4 style={{ color: '#58a6ff', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>رؤوس HTTP</h4>
                  <div className="code-devtools">
                    <div className="code-devtools-body" style={{ maxHeight: '200px', overflow: 'auto' }}>
                      {Object.entries(results.headers).map(([key, value]) => (
                        <div key={key} className="flex gap-2 mb-1" style={{ fontSize: '11px' }}>
                          <span style={{ color: '#7d8590' }}>{key}:</span>
                          <span style={{ color: '#a5d6ff', direction: 'ltr' }}>{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Findings Summary */}
            <div className="grid grid-cols-3 gap-4">
              <div className="gradient-border p-4 text-center">
                <div className="text-3xl mb-2" style={{ 
                  background: 'linear-gradient(135deg, #f85149 0%, #d29922 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>{results.findings?.filter((f: any) => f.severity === 'critical').length || 0}</div>
                <div style={{ color: '#7d8590', fontSize: '11px', fontWeight: '600' }}>حرجة</div>
              </div>
              <div className="gradient-border p-4 text-center">
                <div className="text-3xl mb-2" style={{ 
                  background: 'linear-gradient(135deg, #d29922 0%, #e3b341 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>{results.findings?.filter((f: any) => f.severity === 'high').length || 0}</div>
                <div style={{ color: '#7d8590', fontSize: '11px', fontWeight: '600' }}>عالية</div>
              </div>
              <div className="gradient-border p-4 text-center">
                <div className="text-3xl mb-2" style={{ 
                  background: 'linear-gradient(135deg, #58a6ff 0%, #bc8cff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>{results.findings?.filter((f: any) => f.severity === 'medium').length || 0}</div>
                <div style={{ color: '#7d8590', fontSize: '11px', fontWeight: '600' }}>متوسطة</div>
              </div>
            </div>

            {/* Vulnerability List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ color: '#e6edf3', fontSize: '16px', fontWeight: 'bold' }}>الثغرات المحتملة</h3>
                <div className="flex gap-2">
                  <button onClick={expandAll} className="btn-ghost" style={{ fontSize: '11px', padding: '4px 12px' }}>
                    توسيع الكل
                  </button>
                  <button onClick={collapseAll} className="btn-ghost" style={{ fontSize: '11px', padding: '4px 12px' }}>
                   طي الكل
                  </button>
                </div>
              </div>
              
              {results.findings?.map((vuln: any, index: number) => {
                const isExpanded = expandedVulns.has(index)
                return (
                <div key={index} className="gradient-border overflow-hidden">
                  {/* Vuln Header */}
                  <div 
                    className="p-4 cursor-pointer transition-all hover:bg-[rgba(88,166,255,0.05)]"
                    onClick={() => toggleVuln(index)}
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
                        <span style={{ color: '#7d8590', fontSize: '12px', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>▶</span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="p-4" style={{ background: '#0d1117', borderTop: '1px solid #30363d' }}>
                      {/* Description */}
                      <div className="mb-4">
                        <h5 style={{ color: '#58a6ff', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>📝 الوصف</h5>
                        <p style={{ color: '#e6edf3', fontSize: '13px', lineHeight: '1.8' }}>{vuln.description}</p>
                      </div>

                      {/* Payloads */}
                      {vuln.payloads && (
                        <div className="mb-4">
                          <h5 style={{ color: '#f85149', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>💉 Payloads للاختبار</h5>
                          <div className="code-devtools">
                            <div className="code-devtools-body">
                              {vuln.payloads.map((payload: string, i: number) => (
                                <div key={i} className="flex items-center gap-2 mb-1">
                                  <span style={{ color: '#7d8590' }}>{'>'}</span>
                                  <code style={{ color: '#a5d6ff', fontSize: '12px', direction: 'ltr' }}>{payload}</code>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Commands */}
                      {vuln.commands && (
                        <div className="mb-4">
                          <h5 style={{ color: '#3fb950', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>⚡ الأوامر</h5>
                          <div className="code-devtools">
                            <div className="code-devtools-body">
                              {vuln.commands.map((cmd: string, i: number) => (
                                <div key={i} className="flex items-center gap-2 mb-1">
                                  <span style={{ color: '#7d8590' }}>$</span>
                                  <code style={{ color: '#7ee787', fontSize: '12px', direction: 'ltr' }}>{cmd}</code>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* YouTube Video */}
                      {vuln.videoId && (
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
                      )}

                      {/* Link to full page */}
                      {vuln.id && (
                        <div className="mt-4 pt-4" style={{ borderTop: '1px solid #30363d' }}>
                          <Link 
                            href={`/vulnerabilities/${vuln.id}`}
                            className="btn-ghost inline-block"
                          >
                            عرض التفاصيل الكاملة ←
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!results && !scanning && !error && (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 style={{ color: '#e6edf3', fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>أدخل رابط الموقع</h3>
            <p style={{ color: '#7d8590', fontSize: '14px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.8' }}>
              أدخل رابط الموقع الذي تريد فحصه وسنقوم بتحليله واكتشاف الثغرات المحتملة مع عرض طرق التشغيل والفيديوهات التعليمية
            </p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="gradient-border p-3 text-center">
                <span className="text-2xl block mb-2">💉</span>
                <span style={{ color: '#7d8590', fontSize: '11px' }}>SQL Injection</span>
              </div>
              <div className="gradient-border p-3 text-center">
                <span className="text-2xl block mb-2">📜</span>
                <span style={{ color: '#7d8590', fontSize: '11px' }}>XSS</span>
              </div>
              <div className="gradient-border p-3 text-center">
                <span className="text-2xl block mb-2">🎣</span>
                <span style={{ color: '#7d8590', fontSize: '11px' }}>CSRF</span>
              </div>
              <div className="gradient-border p-3 text-center">
                <span className="text-2xl block mb-2">⌨️</span>
                <span style={{ color: '#7d8590', fontSize: '11px' }}>Command Injection</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
