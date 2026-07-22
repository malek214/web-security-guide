export interface Lab {
  name: string
  url: string
  platform: 'TryHackMe' | 'HackTheBox' | 'PortSwigger' | 'OWASP WebGoat' | 'DVWA'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  description: string
}

export const vulnerabilityLabs: Record<string, Lab[]> = {
  'sql-injection': [
    { name: 'SQL Injection', url: 'https://tryhackme.com/room/sqlinjectionlm', platform: 'TryHackMe', difficulty: 'beginner', description: 'مختبر تفاعلي لتعلم أساسيات SQL Injection والاستغلال' },
    { name: 'SQL Injection', url: 'https://academy.hackthebox.com/path/preview/sql-injection-fundamentals', platform: 'HackTheBox', difficulty: 'beginner', description: 'دورة شاملة في أساسيات SQL Injection مع تدريبات عملية' },
    { name: 'SQL injection', url: 'https://portswigger.net/web-security/sql-injection', platform: 'PortSwigger', difficulty: 'beginner', description: 'أكاديمية PortSwigger لتعلم SQL Injection مع مختبرات تفاعلية' },
    { name: 'SQL Injection Attacks', url: 'https://owasp.org/www-project-webgoat/', platform: 'OWASP WebGoat', difficulty: 'beginner', description: 'مختبر OWASP WebGoat لهجمات SQL Injection' },
    { name: 'SQL Injection', url: 'http://dvwa.co.uk/', platform: 'DVWA', difficulty: 'beginner', description: 'تطبيق DVWA لتدريب SQL Injection بمستويات صعوبة مختلفة' },
  ],
  'xss': [
    { name: 'XSS', url: 'https://tryhackme.com/room/xss', platform: 'TryHackMe', difficulty: 'beginner', description: 'مختبر تفاعلي لتعلم أنواع XSS الثلاثة' },
    { name: 'Cross-Site Scripting', url: 'https://academy.hackthebox.com/path/preview/cross-site-scripting-xss', platform: 'HackTheBox', difficulty: 'intermediate', description: 'دورة متقدمة في XSS مع تدريبات عملية' },
    { name: 'Cross-site scripting', url: 'https://portswigger.net/web-security/cross-site-scripting', platform: 'PortSwigger', difficulty: 'beginner', description: 'مختبرات XSS شاملة من PortSwigger' },
    { name: 'XSS', url: 'https://owasp.org/www-project-webgoat/', platform: 'OWASP WebGoat', difficulty: 'intermediate', description: 'مختبر XSS من OWASP WebGoat' },
    { name: 'Reflected XSS', url: 'http://dvwa.co.uk/', platform: 'DVWA', difficulty: 'beginner', description: 'تدريب على Reflected XSS باستخدام DVWA' },
  ],
  'csrf': [
    { name: 'CSRF', url: 'https://tryhackme.com/room/csrf', platform: 'TryHackMe', difficulty: 'intermediate', description: 'مختبر تفاعلي لفهم واستغلال CSRF' },
    { name: 'Cross-Site Request Forgery', url: 'https://portswigger.net/web-security/csrf', platform: 'PortSwigger', difficulty: 'intermediate', description: 'مختبرات CSRF من PortSwigger مع سيناريوهات واقعية' },
    { name: 'CSRF', url: 'https://owasp.org/www-project-webgoat/', platform: 'OWASP WebGoat', difficulty: 'intermediate', description: 'مختبر CSRF من OWASP WebGoat' },
    { name: 'CSRF', url: 'http://dvwa.co.uk/', platform: 'DVWA', difficulty: 'beginner', description: 'تدريب على CSRF باستخدام DVWA' },
  ],
  'ssrf': [
    { name: 'SSRF', url: 'https://tryhackme.com/room/ssrf', platform: 'TryHackMe', difficulty: 'intermediate', description: 'مختبر تفاعلي لفهم واستغلال SSRF' },
    { name: 'Server-side request forgery', url: 'https://portswigger.net/web-security/ssrf', platform: 'PortSwigger', difficulty: 'intermediate', description: 'مختبرات SSRF شاملة من PortSwigger' },
    { name: 'SSRF', url: 'https://academy.hackthebox.com/path/preview/server-side-request-forgery-ssrf', platform: 'HackTheBox', difficulty: 'intermediate', description: 'دورة SSRF من HackTheBox مع تدريبات عملية' },
  ],
  'command-injection': [
    { name: 'Command Injection', url: 'https://tryhackme.com/room/commandinjection', platform: 'TryHackMe', difficulty: 'intermediate', description: 'مختبر تفاعلي لفهم واستغلال Command Injection' },
    { name: 'OS command injection', url: 'https://portswigger.net/web-security/os-command-injection', platform: 'PortSwigger', difficulty: 'intermediate', description: 'مختبرات OS Command Injection من PortSwigger' },
    { name: 'Command Injection', url: 'http://dvwa.co.uk/', platform: 'DVWA', difficulty: 'beginner', description: 'تدريب على Command Injection باستخدام DVWA' },
  ],
  'jwt': [
    { name: 'JWT Attacks', url: 'https://tryhackme.com/room/jwtattacks', platform: 'TryHackMe', difficulty: 'intermediate', description: 'مختبر تفاعلي لهجمات JWT المتقدمة' },
    { name: 'JWT authentication bypass', url: 'https://portswigger.net/web-security/jwt', platform: 'PortSwigger', difficulty: 'intermediate', description: 'مختبرات JWT Authentication Bypass من PortSwigger' },
    { name: 'JWT', url: 'https://academy.hackthebox.com/path/preview/jwt-attacks', platform: 'HackTheBox', difficulty: 'advanced', description: 'دورة متقدمة في هجمات JWT من HackTheBox' },
  ],
  'oauth': [
    { name: 'OAuth Authentication', url: 'https://tryhackme.com/room/oauth', platform: 'TryHackMe', difficulty: 'intermediate', description: 'مختبر تفاعلي لفهم OAuth Authentication' },
    { name: 'OAuth authentication', url: 'https://portswigger.net/web-security/oauth', platform: 'PortSwigger', difficulty: 'intermediate', description: 'مختبرات OAuth Authentication من PortSwigger' },
    { name: 'OAuth', url: 'https://owasp.org/www-project-webgoat/', platform: 'OWASP WebGoat', difficulty: 'intermediate', description: 'مختبر OAuth من OWASP WebGoat' },
  ],
  'idor': [
    { name: 'IDOR', url: 'https://tryhackme.com/room/idor', platform: 'TryHackMe', difficulty: 'beginner', description: 'مختبر تفاعلي لفهم واستغلال IDOR' },
    { name: 'Insecure direct object references', url: 'https://portswigger.net/web-security/access-control/idor', platform: 'PortSwigger', difficulty: 'beginner', description: 'مختبرات IDOR من PortSwigger' },
    { name: 'IDOR', url: 'http://dvwa.co.uk/', platform: 'DVWA', difficulty: 'beginner', description: 'تدريب على IDOR باستخدام DVWA' },
  ],
  'file-upload': [
    { name: 'File Upload', url: 'https://tryhackme.com/room/fileuploadvulns', platform: 'TryHackMe', difficulty: 'intermediate', description: 'مختبر تفاعلي لثغرات رفع الملفات' },
    { name: 'File upload vulnerabilities', url: 'https://portswigger.net/web-security/file-upload', platform: 'PortSwigger', difficulty: 'intermediate', description: 'مختبرات File Upload من PortSwigger' },
    { name: 'File Upload', url: 'http://dvwa.co.uk/', platform: 'DVWA', difficulty: 'beginner', description: 'تدريب على File Upload باستخدام DVWA' },
  ],
  'xxe': [
    { name: 'XXE', url: 'https://tryhackme.com/room/xxe', platform: 'TryHackMe', difficulty: 'intermediate', description: 'مختبر تفاعلي لفهم واستغلال XXE' },
    { name: 'XML external entity injection', url: 'https://portswigger.net/web-security/xxe', platform: 'PortSwigger', difficulty: 'intermediate', description: 'مختبرات XXE شاملة من PortSwigger' },
    { name: 'XXE', url: 'https://owasp.org/www-project-webgoat/', platform: 'OWASP WebGoat', difficulty: 'intermediate', description: 'مختبر XXE من OWASP WebGoat' },
  ],
  'ssti': [
    { name: 'SSTI', url: 'https://tryhackme.com/room/ssti', platform: 'TryHackMe', difficulty: 'intermediate', description: 'مختبر تفاعلي لفهم واستغلال SSTI' },
    { name: 'Server-side template injection', url: 'https://portswigger.net/web-security/server-side-template-injection', platform: 'PortSwigger', difficulty: 'advanced', description: 'مختبرات SSTI متقدمة من PortSwigger' },
    { name: 'SSTI', url: 'http://dvwa.co.uk/', platform: 'DVWA', difficulty: 'intermediate', description: 'تدريب على SSTI باستخدام DVWA' },
  ],
  'lfi': [
    { name: 'LFI', url: 'https://tryhackme.com/room/lfi', platform: 'TryHackMe', difficulty: 'beginner', description: 'مختبر تفاعلي لفهم واستغلال LFI' },
    { name: 'File path traversal', url: 'https://portswigger.net/web-security/file-path-traversal', platform: 'PortSwigger', difficulty: 'beginner', description: 'مختبرات Path Traversal من PortSwigger' },
    { name: 'LFI', url: 'http://dvwa.co.uk/', platform: 'DVWA', difficulty: 'beginner', description: 'تدريب على LFI باستخدام DVWA' },
  ],
}
