export const vulnerabilityTools: Record<string, { name: string; url: string; description: string; type: 'free' | 'paid' | 'both' }[]> = {
  'sql-injection': [
    { name: 'SQLMap', url: 'https://sqlmap.org', description: 'أقوى أداة مجانية لاكتشاف واستغلال ثغرات SQL Injection تلقائياً. تدعم أكثر من 300 نوع من قواعد البيانات وتعمل على جميع أنظمة التشغيل.', type: 'free' },
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'منصة شاملة لاختبار أمن التطبيقات. الإصدار المجاني يكفي للاكتشاف الأساسي، والمدفوع يوفر اختباراً آلياً متقدماً.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'أداة مجانية ومفتوحة المصدر لاكتشاف الثغرات تلقائياً. ممتازة للمبتدئين وتدعم الإضافات.', type: 'free' },
    { name: 'Havij', url: 'https://www.itsecgames.com', description: 'أداة SQL Injection آلية سهلة الاستخدام特别适合初学者. تدعم استخراج البيانات وتجاوز WAF.', type: 'free' },
    { name: 'jSQL Injection', url: 'https://github.com/tennc/jsql', description: 'أداة مجانية مفتوحة المصدر لاكتشاف واستغلال SQL Injection. واجهة سهلة ودعم لعدة أنواع من الهجمات.', type: 'free' },
  ],
  'xss': [
    { name: 'XSStrike', url: 'https://github.com/s0md3v/xssstrike', description: 'أداة مجانية متقدمة لاكتشاف ثغرات XSS. تستخدم تقنيات ذكية لتجاوز الحماية وتدعم جميع أنواع XSS.', type: 'free' },
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'ال	best tool لاختبار XSS يدوياً وآلياً. يحتوي على مولد payloads مخصص.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يحتوي على Active Scanner لاكتشاف XSS تلقائياً مع تقارير مفصلة.', type: 'free' },
    { name: 'kxss', url: 'https://github.com/Emoe/kxss', description: 'أداة سريعة لاكتشاف XSS من خلال فحص الـ reflection points في الصفحة.', type: 'free' },
    { name: 'Dalfox', url: 'https://github.com/hahwul/dalfox', description: 'أداة حديثة وسريعة لاكتشاف XSS مع دعم لـ Parameter Analysis و –blind modes.', type: 'free' },
  ],
  'csrf': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاكتشاف CSRF يدوياً. يكشف عن tokens المفقودة أو الضعيفة ويساعد في بناء هجمات CSRF.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يحتوي على scanner خاص بـ CSRF يكشف عن المشاكل الشائعة في حماية النماذج.', type: 'free' },
    { name: 'CSRFTester', url: 'https://github.com/SpiderLabs/csrfTester', description: 'أداة مجانية متخصصة في اختبار CSRF. تسجل الطلبات وتعيد تشغيلها مع تعديلات.', type: 'free' },
  ],
  'ssrf': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار SSRF يدوياً. يكشف عن endpoints التي تقبل URLs ويختبرها.', type: 'both' },
    { name: 'SSRFmap', url: 'https://github.com/sw33tLie/ssrfmap', description: 'أداة آلية متخصصة في استغلال SSRF. تدعم استخراج البيانات وتنفيذ أوامر.', type: 'free' },
    { name: 'Gopherus', url: 'https://github.com/tarunkant/Gopherus', description: 'أداة لتوليد payloads SSRF باستخدام بروتوكول Gopher. ممتازة لاستغلال ثغرات SSRF.', type: 'free' },
    { name: 'Interactsh', url: 'https://github.com/projectdiscovery/interactsh', description: 'أداة لاكتشاف SSRF من خلال مراقبة الطلبات الخارجية.', type: 'free' },
  ],
  'command-injection': [
    { name: 'Commix', url: 'https://github.com/commixproject/commix', description: 'أقوى أداة مجانية لاكتشاف واستغلال ثغرات Command Injection تلقائياً. تدعم أكثر من 300 payload.', type: 'free' },
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أداة ممتازة لاختبار Command Injection يدوياً مع مولد payloads.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف Command Injection من خلال Active Scanner.', type: 'free' },
  ],
  'nosql-injection': [
    { name: 'NoSQLMap', url: 'https://github.com/codingo/NoSQLMap', description: 'أداة مجانية متخصصة في اكتشاف واستغلال ثغرات NoSQL في MongoDB وCouchDB.', type: 'free' },
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أداة ممتازة لاختبار NoSQL Injection يدوياً مع فهم لـ JSON queries.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف NoSQL Injection من خلال custom scripts.', type: 'free' },
  ],
  'ldap-injection': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار LDAP Injection يدوياً مع فهم لـ LDAP queries.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف LDAP Injection من خلال Active Scanner.', type: 'free' },
    { name: 'LdapFuzz', url: 'https://github.com/GoSecure/ldapfuzz', description: 'أداة متخصصة في اختبار LDAP Injection مع قواعد بيانات مخصصة.', type: 'free' },
  ],
  'xpath-injection': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار XPath Injection يدوياً مع فهم لـ XPath expressions.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف XPath Injection من خلال Active Scanner.', type: 'free' },
    { name: 'XCat', url: 'https://github.com/orf/xcat', description: 'أداة سريعة لاكتشاف واستغلال XPath Injection.', type: 'free' },
  ],
  'crlf-injection': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار CRLF Injection يدوياً مع فهم HTTP headers.', type: 'both' },
    { name: 'CRLF-Injection-Scanner', url: 'https://github.com/nitishyadav/CRLF-Injection-Scanner', description: 'أداة مجانية لفحص CRLF Injection في URLs.', type: 'free' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف CRLF Injection من خلال Passive Scanner.', type: 'free' },
  ],
  'xxe': [
    { name: 'XXEinjector', url: 'https://github.com/ianxtianxt/XXEinjector', description: 'أداة آلية لاكتشاف واستغلال XXE injection تلقائياً.', type: 'free' },
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار XXE يدوياً مع فهم XML payloads.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف XXE من خلال Active Scanner و Add-ons.', type: 'free' },
  ],
  'ssti': [
    { name: 'Tplmap', url: 'https://github.com/epinna/tplmap', description: 'أقوى أداة مجانية لاكتشاف واستغلال SSTI تلقائياً. تدعم أكثر من 15 نوع من القوالب.', type: 'free' },
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار SSTI يدوياً مع فهم قوالب مختلفة.', type: 'both' },
    { name: 'Interactsh', url: 'https://github.com/projectdiscovery/interactsh', description: 'أداة لاكتشاف SSTI من خلال مراقبة الطلبات الخارجية.', type: 'free' },
  ],
  'lfi': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار LFI يدوياً مع فهم Path Traversal.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف LFI من خلال Active Scanner.', type: 'free' },
    { name: 'Fuzzdb', url: 'https://github.com/fuzzdb-project/fuzzdb', description: 'قاعدة بيانات ضخمة من payloads للاختبار بما في ذلك LFI patterns.', type: 'free' },
  ],
  'idor': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار IDOR يدوياً مع فهم parameter manipulation.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف IDOR من خلال Active Scanner.', type: 'free' },
    { name: 'Autorize', url: 'https://github.com/DoSelect/autorize', description: 'إضافة Burp Suite لاختبار IDOR و Broken Access Control تلقائياً.', type: 'free' },
  ],
  'open-redirect': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار Open Redirect يدوياً.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف Open Redirect من خلال Active Scanner.', type: 'free' },
    { name: 'OpenRedirect', url: 'https://github.com/daeken/OpenRedirect', description: 'أداة سريعة لاكتشاف Open Redirect في URLs.', type: 'free' },
  ],
  'cors': [
    { name: 'CORScanner', url: 'https://github.com/chenjj/CORScanner', description: 'أداة مجانية متخصصة في اكتشاف أخطاء تكوين CORS.', type: 'free' },
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار CORS يدوياً مع فهم headers.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف CORS Misconfiguration من خلال Passive Scanner.', type: 'free' },
  ],
  'jwt': [
    { name: 'JWT_Tool', url: 'https://github.com/ticarpi/jwt_tool', description: 'أقوى أداة مجانية لاختبار أمان JWT. تدعم اختبار جميع الثغرات الشائعة.', type: 'free' },
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'يحتوي على JWT Editor plugin لاختبار JWT بشكل متقدم.', type: 'both' },
    { name: 'jwt-cracker', url: 'https://github.com/brendan-rius/c-jwt-cracker', description: 'أداة لكسر JWT tokens باستخدام Brute Force.', type: 'free' },
  ],
  'oauth': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار OAuth يدوياً مع فهم flows.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف مشاكل OAuth من خلال scripts مخصصة.', type: 'free' },
    { name: 'oauth2-client', url: 'https://github.com/chaostoolkit/chaostoolkit-oauth2', description: 'أداة لاختبار أمان OAuth2 flows.', type: 'free' },
  ],
  'password-attacks': [
    { name: 'Hashcat', url: 'https://hashcat.net/hashcat/', description: 'أقوى أداة مجانية لكسر كلمات المرور باستخدام GPU. تدعم أكثر من 300 نوع من التشفير.', type: 'free' },
    { name: 'John the Ripper', url: 'https://www.openwall.com/john/', description: 'أداة كلاسيكية لكسر كلمات المرور مع قواعد بيانات ضخمة.', type: 'free' },
    { name: 'Hydra', url: 'https://github.com/vanhauser-thc/thc-hydra', description: 'أداة سريعة لهجمات Brute Force على أنظمة تسجيل الدخول.', type: 'free' },
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'يحتوي على Intruder لهجمات Brute Force على تطبيقات الويب.', type: 'both' },
  ],
  'session-fixation': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار Session Fixation يدوياً مع فهم session management.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف Session Fixation من خلال Session Analysis.', type: 'free' },
  ],
  'cookie-poisoning': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار Cookie Poisoning يدوياً مع فهم cookie attributes.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف Cookie Poisoning من خلال Passive Scanner.', type: 'free' },
  ],
  'clickjacking': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار Clickjacking يدوياً مع فهم X-Frame-Options.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف Clickjacking من خلال Passive Scanner.', type: 'free' },
    { name: 'Clickjacking-POC', url: 'https://github.com/nicedayzhu/clickjacking-poc', description: 'أداة لإنشاء Proof of Concept لهجمات Clickjacking.', type: 'free' },
  ],
  'api-security': [
    { name: 'Postman', url: 'https://www.postman.com', description: 'أداة ممتازة لاختبار APIs يدوياً مع فهم REST و GraphQL.', type: 'both' },
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'يحتوي على REST Client لاختبار APIs بشكل متقدم.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف ثغرات APIs من خلال OpenAPI Support.', type: 'free' },
    { name: 'Nuclei', url: 'https://github.com/projectdiscovery/nuclei', description: 'أداة سريعة لفحص APIs باستخدام templates مخصصة.', type: 'free' },
  ],
  'insecure-deserialization': [
    { name: 'ysoserial', url: 'https://github.com/frohoff/ysoserial', description: 'أداة لإنشاء payloads لأتمتة اختبار Insecure Deserialization في Java.', type: 'free' },
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'يحتوي على Deserialization plugins لاختبار 다양한 اللغات.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف Insecure Deserialization من خلال Add-ons.', type: 'free' },
  ],
  'security-misconfiguration': [
    { name: 'Nmap', url: 'https://nmap.org', description: 'أقوى أداة مجانية لفحص الشبكات واكتشاف خدمات مفتوحة وتكوينات خاطئة.', type: 'free' },
    { name: 'Nikto', url: 'https://github.com/sullo/nikto', description: 'أداة كلاسيكية لفحص أمان خوادم الويب واكتشاف أخطاء التكوين.', type: 'free' },
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'يحتوي على scanner شامل لاكتشاف أخطاء التكوين.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'أداة شاملة لاكتشاف أخطاء التكوين الأمني.', type: 'free' },
  ],
  'broken-access-control': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار Broken Access Control يدوياً مع فهم authorization.', type: 'both' },
    { name: 'Autorize', url: 'https://github.com/DoSelect/autorize', description: 'إضافة Burp Suite لاكتشاف Broken Access Control تلقائياً.', type: 'free' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف Broken Access Control من خلال Active Scanner.', type: 'free' },
  ],
  'information-disclosure': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار Information Disclosure يدوياً.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف Information Disclosure من خلال Passive Scanner.', type: 'free' },
    { name: 'DirBuster', url: 'https://github.com/OJ/gobuster', description: 'أداة لفحص الدليركتوريات واكتشاف ملفات مخفية.', type: 'free' },
  ],
  'mass-assignment': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار Mass Assignment يدوياً مع فهم parameter pollution.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف Mass Assignment من خلال Active Scanner.', type: 'free' },
  ],
  'business-logic': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار ثغرات المنطق التجاري يدوياً.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف ثغرات المنطق التجاري من خلال custom scripts.', type: 'free' },
    { name: 'Postman', url: 'https://www.postman.com', description: 'أداة ممتازة لاختبار APIs والمنطق التجاري.', type: 'both' },
  ],
  'race-condition': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'يحتوي على Turbo Intruder لاختبار Race Conditions.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف Race Conditions من خلال custom scripts.', type: 'free' },
    { name: 'Turbo Intruder', url: 'https://github.com/PortSwigger/turbo-intruder', description: 'إضافة Burp Suite لاختبار Race Conditions والـ performance issues.', type: 'free' },
  ],
  'http-smuggling': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار HTTP Smuggling يدوياً مع فهم HTTP specifications.', type: 'both' },
    { name: 'HTTP Request Smuggler', url: 'https://github.com/PortSwigger/http-request-smuggler', description: 'إضافة Burp Suite لاكتشاف HTTP Smuggling تلقائياً.', type: 'free' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف HTTP Smuggling من خلال Active Scanner.', type: 'free' },
  ],
  'host-header-injection': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار Host Header Injection يدوياً.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف Host Header Injection من خلال Active Scanner.', type: 'free' },
    { name: 'HostHeaderInjection', url: 'https://github.com/0xInfection/Awesome-WAF', description: 'مجموعة أدوات لاكتشاف Host Header Injection.', type: 'free' },
  ],
  'subdomain-takeover': [
    { name: 'SubOver', url: 'https://github.com/Ice3man543/SubOver', description: 'أداة سريعة لاكتشاف Subdomain Takeover باستخدام DNS records.', type: 'free' },
    { name: 'Can-I-Take-Over-XYZ', url: 'https://github.com/EdOverflow/can-i-take-over-xyz', description: 'قائمة شاملة بأطر العمل القابلة للاستغلال في Subdomain Takeover.', type: 'free' },
    { name: 'Nuclei', url: 'https://github.com/projectdiscovery/nuclei', description: 'أداة لفحص Subdomain Takeover باستخدام templates مخصصة.', type: 'free' },
  ],
  'dns-rebinding': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار DNS Rebinding يدوياً.', type: 'both' },
    { name: 'rbndr', url: 'https://github.com/taviso/rbndr', description: 'أداة لإنشاء DNS servers لاختبار DNS Rebinding.', type: 'free' },
    { name: 'Singularity', url: 'https://github.com/nccgroup/singularity', description: 'أداة لإنشاء هجمات DNS Rebinding.', type: 'free' },
  ],
  'prototype-pollution': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار Prototype Pollution يدوياً.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف Prototype Pollution من خلال custom scripts.', type: 'free' },
    { name: 'NodeJsScan', url: 'https://github.com/ajinabraham/nodejsscan', description: 'أداة لفحص ثغرات Node.js بما في ذلك Prototype Pollution.', type: 'free' },
  ],
  'denial-of-service': [
    { name: 'LOIC', url: 'https://github.com/NewEraCracker/LOIC', description: 'أداة معروفة لاختبار Denial of Service (استخدام غير قانوني بدون إذن).', type: 'free' },
    { name: 'HULK', url: 'https://github.com/flashsphere/HULK', description: 'أداة لتوليد حركة مرور عشوائية لاختبار DoS.', type: 'free' },
    { name: 'GoldenEye', url: 'https://github.com/jseidl/GoldenEye', description: 'أداة HTTP DoS لاختبار مقاومة الخادم.', type: 'free' },
  ],
  'file-upload': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار File Upload يدوياً مع فهم content types.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف File Upload vulnerabilities من خلال Active Scanner.', type: 'free' },
    { name: 'Upload Scanner', url: 'https://github.com/nicedayzhu/upload-scanner', description: 'إضافة Burp Suite لفحص File Upload بشكل متقدم.', type: 'free' },
  ],
  'ai-security': [
    { name: 'Burp Suite', url: 'https://portswigger.net/burp', description: 'أفضل أداة لاختبار AI endpoints يدوياً.', type: 'both' },
    { name: 'OWASP ZAP', url: 'https://www.zaproxy.org', description: 'يدعم اكتشاف AI security issues من خلال custom scripts.', type: 'free' },
    { name: 'Promptfoo', url: 'https://github.com/promptfoo/promptfoo', description: 'أداة لاختبار أمان نماذج AI واكتشاف Prompt Injection.', type: 'free' },
  ],
  'phishing': [
    { name: 'Gophish', url: 'https://getgophish.com', description: 'أداة مجانية ومفتوحة المصدر لإنشاء حملات تصيد احتيالي تجريبية لتدريب الموظفين.', type: 'free' },
    { name: 'KnowBe4', url: 'https://www.knowbe4.com', description: 'منصة شاملة لتثقيف الموظفين واختبار التصيد الاحتيالي مع تقارير مفصلة.', type: 'paid' },
    { name: 'PhishMe', url: 'https://www.proofpoint.com/us/products/security-awareness-training', description: 'أداة لمحاكاة هجمات التصيد وتدريب المستخدمين على كشفها.', type: 'paid' },
  ],
  'malware': [
    { name: 'Malwarebytes', url: 'https://www.malwarebytes.com', description: 'من أقوى الأدوات المجانية للكشف عن البرمجيات الخبيثة وإزالتها.', type: 'both' },
    { name: 'VirusTotal', url: 'https://www.virustotal.com', description: 'خدمة مجانية لفحص الملفات والروابط ضد أكثر من 70 محرك كشف فيروسات.', type: 'free' },
    { name: 'Any.Run', url: 'https://any.run', description: 'منصة تحليل البرمجيات الخبيثة التفاعلية مع بيئة اختبار آمنة.', type: 'both' },
  ],
  'social-engineering': [
    { name: 'Social Engineering Toolkit (SET)', url: 'https://github.com/trustedsec/social-engineer-toolkit', description: 'أداة مجانية ومفتوحة المصدر لإنشاء هجمات الهندسة الاجتماعية التجريبية.', type: 'free' },
    { name: 'King Phisher', url: 'https://github.com/securestate/king-phisher', description: 'أداة مجانية لحملات التصيد الاحتيالي التدريبية مع تحليل النتائج.', type: 'free' },
    { name: 'GoPhish', url: 'https://getgophish.com', description: 'أداة سهلة الاستخدام لإنشاء محاكاة تصيد احتيالي لتقييم المخاطر.', type: 'free' },
  ],
}
