export const vulnerabilityVideos: Record<string, { title: string; url: string; description: string }[]> = {
  'sql-injection': [
    { title: 'SQL Injection Explained [ARABIC]', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح مفصل بالعربي لثغرة SQL Injection وكيفية الهجوم والدفاع' },
    { title: 'شرح SQL Injection باللغة العربية', url: 'https://www.youtube.com/watch?v=thHAyIw62dQ', description: 'شرح بسيط وعملي لثغرة حقن SQL' },
    { title: 'SQL Injection Tutorial - Full Course', url: 'https://www.youtube.com/watch?v=thHAyIw62dQ', description: 'دورة شاملة في SQL Injection من الصفر للمحترف' },
  ],
  'xss': [
    { title: 'Cross Site Scripting (XSS) هتفهمها بنسبة 100%', url: 'https://www.youtube.com/playlist?list=PLdxfDCLPISTRvbPZ_mMUQtDMZuV4nSRJb', description: 'شرح كامل لثغرات XSS بالعربي مع أمثلة عملية' },
    { title: 'Cross-Site Scripting (XSS) Explained', url: 'https://www.youtube.com/watch?v=q0bzXY32xiI', description: 'شرح مفصل لأنواع XSS الثلاثة مع عرض مباشر' },
    { title: 'XSS Bug Bounty Tutorial', url: 'https://www.youtube.com/watch?v=q0bzXY32xiI', description: 'تعلم كيف تكتشف ثغرات XSS في Bug Bounty' },
  ],
  'csrf': [
    { title: 'CSRF Explained in Arabic', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح ثغرة CSRF وكيفية استغلالها' },
    { title: 'Cross-Site Request Forgery Tutorial', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'تعلم CSRF من الصفر مع أمثلة عملية' },
  ],
  'ssrf': [
    { title: 'SSRF Explained - Server Side Request Forgery', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح مفصل لثغرة SSRF وطرق الحماية' },
  ],
  'command-injection': [
    { title: 'Command Injection Tutorial', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح ثغرة حقن أوامر النظام وطرق الاستغلال' },
  ],
  'nosql-injection': [
    { title: 'NoSQL Injection Explained', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح ثغرات NoSQL Injection في MongoDB' },
  ],
  'jwt': [
    { title: 'JWT Security Explained', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح أمان JWT وثغراته الشائعة' },
  ],
  'oauth': [
    { title: 'OAuth 2.0 Security', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح ثغرات OAuth 2.0 وطرق الحماية' },
  ],
  'ssti': [
    { title: 'Server-Side Template Injection', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح SSTI وطرق استغلال القوالب' },
  ],
  'xxe': [
    { title: 'XXE Explained', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح XML External Entity وتأثيره' },
  ],
  'lfi': [
    { title: 'Local File Inclusion Tutorial', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح LFI وطرق قراءة الملفات المحلية' },
  ],
  'idor': [
    { title: 'IDOR Vulnerability Explained', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح IDOR وكيفية اكتشافه' },
  ],
  'open-redirect': [
    { title: 'Open Redirect Vulnerability', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح Open Redirect وتأثيره على الأمان' },
  ],
  'cors': [
    { title: 'CORS Misconfiguration', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح أخطاء تكوين CORS' },
  ],
  'password-attacks': [
    { title: 'Password Attacks Explained', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح هجمات كلمات المرور وطرق الحماية' },
  ],
  'session-fixation': [
    { title: 'Session Fixation Tutorial', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح تثبيت الجلسة وطرق الاستغلال' },
  ],
  'clickjacking': [
    { title: 'Clickjacking Explained', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح اختطاف النقرات' },
  ],
  'api-security': [
    { title: 'API Security Best Practices', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'أفضل ممارسات أمن APIs' },
  ],
  'insecure-deserialization': [
    { title: 'Insecure Deserialization', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح عدم آمان إعادة التحويل' },
  ],
  'security-misconfiguration': [
    { title: 'Security Misconfiguration', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح أخطاء التكوين الأمني' },
  ],
  'broken-access-control': [
    { title: 'Broken Access Control', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح خطأ التحكم بالوصول' },
  ],
  'information-disclosure': [
    { title: 'Information Disclosure', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح الكشف عن المعلومات' },
  ],
  'mass-assignment': [
    { title: 'Mass Assignment Vulnerability', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح التكليف الجماعي' },
  ],
  'business-logic': [
    { title: 'Business Logic Vulnerabilities', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح ثغرات المنطق التجاري' },
  ],
  'race-condition': [
    { title: 'Race Condition Explained', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح حالات السباق' },
  ],
  'http-smuggling': [
    { title: 'HTTP Request Smuggling', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح تهريب الطلبات HTTP' },
  ],
  'host-header-injection': [
    { title: 'Host Header Injection', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح حقن رأس الاستضافة' },
  ],
  'subdomain-takeover': [
    { title: 'Subdomain Takeover', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح استيلاء على النطاقات الفرعية' },
  ],
  'dns-rebinding': [
    { title: 'DNS Rebinding Attack', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح إعادة ربط DNS' },
  ],
  'prototype-pollution': [
    { title: 'Prototype Pollution', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح تلوث النموذج البرمجي' },
  ],
  'denial-of-service': [
    { title: 'DoS Attacks Explained', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح هجمات حجب الخدمة' },
  ],
  'file-upload': [
    { title: 'File Upload Vulnerabilities', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح ثغرات رفع الملفات' },
  ],
  'ai-security': [
    { title: 'AI Security - Prompt Injection', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح أمن الذكاء الاصطناعي وثغرات Prompt Injection' },
    { title: 'LLM Security Attacks', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح هجمات نماذج اللغة الكبيرة' },
  ],
  'ldap-injection': [
    { title: 'LDAP Injection Tutorial', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح حقن LDAP' },
  ],
  'xpath-injection': [
    { title: 'XPath Injection Explained', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح حقن XPath' },
  ],
  'crlf-injection': [
    { title: 'CRLF Injection Tutorial', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح حقن CRLF' },
  ],
  'cookie-poisoning': [
    { title: 'Cookie Poisoning Explained', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح تسميم الكوكيز' },
  ],
  'phishing': [
    { title: 'شرح التصيد الاحتيالي بالعربي', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح شامل لأنواع التصيد الاحتيالي وكيفية الحماية منه' },
    { title: 'Phishing Attacks Explained', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح مفصل لهجمات التصيد بالبريد الإلكتروني' },
  ],
  'malware': [
    { title: 'شرح البرمجيات الخبيثة بالعربي', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح شامل لأنواع البرمجيات الخبيثة وكيفية الكشف عنها' },
    { title: 'Malware Types Explained', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح مفصل لأنواع الفيروسات والديدان وأحصنة طروادة' },
  ],
  'social-engineering': [
    { title: 'شرح الهندسة الاجتماعية بالعربي', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح شامل للهندسة الاجتماعية وتقنياتها مع أمثلة واقعية' },
    { title: 'Social Engineering Attacks', url: 'https://www.youtube.com/watch?v=ISV8U8fheXw', description: 'شرح مفصل لهجمات الهندسة الاجتماعية وكيفية الحماية' },
  ],
}
