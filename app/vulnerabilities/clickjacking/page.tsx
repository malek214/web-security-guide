import Link from "next/link";
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'

export default function ClickjackingPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-400">
          <Link href="/" className="hover:text-cyan-400 transition">الرئيسية</Link>
          <span className="mx-2">/</span>
          <Link href="/vulnerabilities" className="hover:text-cyan-400 transition">الثغرات</Link>
          <span className="mx-2">/</span>
          <span className="text-cyan-400">Clickjacking</span>
        </nav>

        {/* Hero Section */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🖱️</span>
            <div>
              <h1 className="text-4xl font-bold text-cyan-400 mb-1">
                اختطاف النقرات
              </h1>
              <p className="text-2xl text-gray-300 font-mono">Clickjacking</p>
            </div>
          </div>
          <p className="mt-4 text-lg text-gray-400">
            ثغرة تسمح للمهاجم بتزوير نقرات المستخدم عبر تغليف الصفحة في طبقة شفافة خبيثة
          </p>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mt-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">خطيرة</span>
            </div>
            <p className="text-gray-300 text-sm mb-0">
              ثغرة Clickjacking (أو UI Redressing) من الثغرات الشائعة التي تصيب مواقع الويب التي لا تستخدم حماية iframe. تسمح للمهاجم بتضمين صفحة ويب مستهدفة في iframe شفاف وتقديمها للمستخدم بشكل يوحي بأنه صفحة أخرى完全不同.
            </p>
          </div>
        </header>

        {/* Definition Section */}
        <section className="mb-12 bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">تعريف Clickjacking</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            <strong className="text-white">اختطاف النقرات (Clickjacking)</strong> هو تقنية هجوم تنتمي إلى فئة &quot;هجمات واجهة المستخدم&quot; (UI Redressing Attacks). يقوم المهاجم بتضمين صفحة ويب مستهدفة داخل صفحة أخرى يستخدمها المستخدم، حيث يتم عرض الصفحة المستهدفة في طبقة شفافة (opacity منخفضة) فوق أزرار أو عناصر تفاعلية يبدو أن المستخدم يتفاعل معها.
          </p>
          <p className="text-gray-300 leading-relaxed">
            عندما ينقر المستخدم على العنصر الذي يبدو أنه جزء من الصفحة العادية، فإن النقر في الواقع يتم على الصفحة المضمنة في الخلفية، مما يؤدي إلى تنفيذ إجراء غير متوقع دون علم المستخدم.
          </p>
        </section>

        {/* How It Works Section */}
        <section className="mb-12 bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">كيف تعمل هجمات Clickjacking</h2>

          {/* ASCII Diagram */}
          <div className="bg-gray-900 rounded-xl p-6 mb-6 font-mono text-sm text-green-400 border border-gray-700 overflow-x-auto">
            <pre className="whitespace-pre">{`المهاجم                              المستخدم                        الموقع المستهدف
  |                                    |                                    |
  |  1. إنشاء صفحة ملغومة              |                                    |
  |     (تحتوي على iframe شفاف)        |                                    |
  |------------------------------------>                                    |
  |                                    |                                    |
  |  2. المستخدم يزور الصفحة الملغومة  |                                    |
  |                                    |                                    |
  |                                    |  3. الصفحة تحميل صفحة المستهدف    |
  |                                    |     في iframe شفاف                |
  |                                    |----------------------------------->|
  |                                    |                                    |
  |                                    |  4. المستخدم ينقر على زر &quot;أشترك&quot;  |
  |                                    |     (في الواقع ينقر على صفحة المستهدف)
  |                                    |                                    |
  |                                    |  5. الموقع المستهدف ينفذ الإجراء  |
  |                                    |     بنجاح                         |`}</pre>
          </div>

          <h3 className="text-xl font-bold text-white mb-3">مراحل الهجوم بالتفصيل:</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-300">
            <li>يقوم المهاجم بإنشاء صفحة ويب تحتوي على iframe يحمّل صفحة المستهدف في الخلفية بشفافية منخفضة (مثل opacity: 0.1)</li>
            <li>يضع المهاجم زر أو عنصر تفاعلي على الصفحة يبدو أنه جزء من واجهة مستخدم عادية (مثل زر &quot;افتح&quot; أو &quot;تنزيل&quot;)</li>
            <li>يتم محاذاة زر المستخدم مع الزر المستهدف داخل الiframe (مثل زر &quot;اشترك&quot; أو &quot;شراء&quot;)</li>
            <li>يرسل المهاجم الرابط للضحية عبر البريد الإلكتروني أو رسالة أو منشور</li>
            <li>عند فتح الرابط، ينقر المستخدم على الزر ظناً أنه يتفاعل مع الصفحة، لكنه في الواقع ينقر على الزر المستهدف في الiframe</li>
            <li>يتم تنفيذ الإجراء المستهدف (اشتراك، شراء، حذف حساب، إلخ) دون علم المستخدم</li>
          </ol>

          <div className="bg-gray-900 rounded-xl p-6 mt-6 border border-gray-700 overflow-x-auto">
            <pre className="text-sm text-cyan-300 font-mono whitespace-pre">{`<!-- صفحة المهاجم (malicious.html) -->
<!DOCTYPE html>
<html>
<head>
  <title>صفحة عادية يبدو عليها</title>
  <style>
    .overlay {
      position: relative;
      width: 300px;
      height: 200px;
    }
    .hidden-iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.0001;  /* شبه شفاف */
      z-index: 2;
    }
    .fake-button {
      position: absolute;
      top: 80px;  /* محاذاة مع الزر المستهدف */
      left: 50px;
      z-index: 1;
      padding: 10px 30px;
      background: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <h1>的机会 مسابقة ربح هاتف!</h1>
  <p>اضغط الزر أدناه للمشاركة</p>

  <div class="overlay">
    <!-- الiframe الشفاف يحمّل صفحة المستهدف -->
    <iframe
      src="https://target-site.com/unsubscribe?user=12345"
      class="hidden-iframe"
    ></iframe>

    <!-- الزر الوهمي -->
    <button class="fake-button">شارك الآن!</button>
  </div>
</body>
</html>`}</pre>
          </div>
        </section>

        {/* Real-World Examples Section */}
        <section className="mb-12 bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">أمثلة واقعية وهجمات شائعة</h2>

          <div className="space-y-6">
            {/* Example 1 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-2">1. سرقة حسابات عبر حذف الحساب</h3>
              <p className="text-gray-300 mb-3">
                يقوم المهاجم بإنشاء صفحة تحتوي على زر &quot;تنزيل مجاني&quot; محاذي مع زر &quot;حذف الحساب&quot; في موقع المستهدف.
                عندما ينقر المستخدم، يتم حذف حسابه فوراً.
              </p>
              <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-cyan-300 font-mono whitespace-pre">{`<!-- صفحة المهاجم -->
<div class="fake-button-container">
  <iframe src="https://victim-site.com/account/delete"
    style="opacity: 0.0001; position: absolute; ..."></iframe>
  <button class="fake-btn">احصل على هدية مجانية!</button>
</div>`}</pre>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-2">2. اشتراك غير مرغوب في خدمات</h3>
              <p className="text-gray-300 mb-3">
                يتم تغليف صفحة اشتراك في خدمة مدفوعة فوق زر &quot;اقرأ المزيد&quot;، فيشترك المستخدم في الخدمة دون علمه.
              </p>
              <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-cyan-300 font-mono whitespace-pre">{`<!-- صفحة المهاجم -->
<div class="overlay-container">
  <iframe src="https://premium-service.com/subscribe?plan=yearly"
    style="opacity: 0; position: absolute; ..."></iframe>
  <button class="fake-btn">اقرأ المزيد عن العرض</button>
</div>`}</pre>
              </div>
            </div>

            {/* Example 3 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-2">3. سرقة بيانات الدخول عبر نموذج تسجيل الدخول المزيف</h3>
              <p className="text-gray-300 mb-3">
                يتم وضع نموذج تسجيل دخول مزيف فوق نموذج حقيقي في موقع المستهدف، فيدخل المستخدم بيانات اعتماده في النموذج المزيف.
              </p>
              <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-cyan-300 font-mono whitespace-pre">{`<!-- صفحة المهاجم -->
<div class="login-form-overlay">
  <iframe src="https://target-site.com/login"
    style="opacity: 0.0001; position: absolute; ..."></iframe>
  <div class="fake-login-form">
    <input type="text" placeholder="البريد الإلكتروني" />
    <input type="password" placeholder="كلمة المرور" />
    <button>تسجيل الدخول</button>
  </div>
</div>`}</pre>
              </div>
            </div>

            {/* Example 4 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-2">4. تغيير إعدادات الحساب</h3>
              <p className="text-gray-300 mb-3">
                يُغلف المهاجم صفحة تغيير إعدادات البريد الإلكتروني أو كلمة المرور فوق صفحة عادية، فيقوم المستخدم بتغيير إعداداته دون علمه، مما يمنح المهاجم السيطرة على الحساب.
              </p>
            </div>
          </div>
        </section>

        {/* Detection Section */}
        <section className="mb-12 bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">كيف تكتشف ثغرة Clickjacking</h2>

          <h3 className="text-xl font-bold text-white mb-3">علامات وجود الثغرة</h3>
          <ul className="space-y-3 text-gray-300 mb-6">
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 mt-1">•</span>
              <span>يمكن تضمين صفحة ويب في iframe من موقع آخر</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 mt-1">•</span>
              <span>غياب رؤوس X-Frame-Options و CSP frame-ancestors في استجابة الخادم</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 mt-1">•</span>
              <span>عدم وجود حماية ضد التضمين في صفحات تسجيل الدخول والإعدادات</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 mt-1">•</span>
              <span>الصفحة تظهر بشكل طبيعي داخل iframe في صفحة أخرى</span>
            </li>
          </ul>

          <h3 className="text-xl font-bold text-white mb-3">أدوات الاكتشاف</h3>
          <ul className="space-y-3 text-gray-300 mb-6">
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">•</span>
              <span><strong className="text-white">Burp Suite:</strong> فاحص شامل يكشف اكتشاف Clickjacking ويعيد تحليل رؤوس HTTP</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">•</span>
              <span><strong className="text-white">OWASP ZAP:</strong> أداة مجانية تفحص وجود حماية Clickjacking تلقائياً</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">•</span>
              <span><strong className="text-white">Clickjacking Test Tool:</strong> أداة متخصصة من OWASP لاختبار الثغرة</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">•</span>
              <span><strong className="text-white">Browser DevTools:</strong> فحص رؤوس HTTP من تبويب Network</span>
            </li>
          </ul>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 overflow-x-auto">
            <pre className="text-sm text-green-400 font-mono whitespace-pre">{`# اختبار Clickjacking باستخدام curl
curl -I "https://example.com" 2>/dev/null | grep -i "x-frame-options"

# اختبار عبر JavaScript في المتصفح
// افتح Console في DevTools وأدخل:
fetch('https://target-site.com')
  .then(r => {
    const headers = r.headers;
    console.log('X-Frame-Options:', headers.get('x-frame-options'));
    console.log('CSP:', headers.get('content-security-policy'));
  });

# اختبار مباشر بإنشاء صفحة اختبار
echo '<iframe src="https://target-site.com" width="800" height="600"></iframe>' > test.html
# افتح test.html في المتصفح

# استخدام نموذج اختبار Clickjacking من OWASP
# https://owasp.org/www-community/attacks/Clickjacking-Screen-Capture`}</pre>
          </div>
        </section>

        {/* Prevention Section */}
        <section className="mb-12 bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">كيف تمنع ثغرة Clickjacking</h2>

          <div className="space-y-6">
            {/* Prevention 1 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-2">1. رأس X-Frame-Options</h3>
              <p className="text-gray-300 mb-3">
                رأس HTTP يتحكم في ما إذا كان يمكن تضمين الصفحة في iframe. هذا هو الحل الأساسي والأشهر.
              </p>
              <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-cyan-300 font-mono whitespace-pre">{`# إعداد X-Frame-Options في Node.js (Express)
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY'); // رفض التضمين تماماً
  next();
});

# أو السماح فقط بمصادر محددة
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});

# القيم المتاحة:
# DENY        - رفض التضمين في أي iframe
# SAMEORIGIN  - السماح بالتضمين من نفس النطاق فقط
# ALLOW-FROM https://example.com - السماح بموقع محدد (متقادم)`}</pre>
              </div>
            </div>

            {/* Prevention 2 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-2">2. سياسة أمان المحتوى - CSP frame-ancestors</h3>
              <p className="text-gray-300 mb-3">
                ن Directive في CSP يحدد أي المواقع يمكنها تضمين الصفحة. يحل محل X-Frame-Options ويقدم مرونة أكبر.
              </p>
              <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-cyan-300 font-mono whitespace-pre">{`# إعداد CSP frame-ancestors في Next.js
// next.config.mjs
const nextConfig = {
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "frame-ancestors 'none'"
        }
      ]
    }
  ]
};
export default nextConfig;

# أو في Express
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
  next();
});

# القيم المتاحة:
# frame-ancestors 'none'          - رفض التضمين تماماً
# frame-ancestors 'self'           - السماح بالموقع نفسه فقط
# frame-ancestors 'self' https://trusted.com  - السماح بمواقع محددة
# frame-ancestors https://*.example.com       - السماح بنطاق معين`}</pre>
              </div>
            </div>

            {/* Prevention 3 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-2">3. استخدام JavaScript للكشف عن التضمين</h3>
              <p className="text-gray-300 mb-3">
                كشف ما إذا كانت الصفحة تعمل داخل iframe وإعادة توجيه المستخدم أو إخفاء المحتوى الحساس.
              </p>
              <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-cyan-300 font-mono whitespace-pre">{`// كشف Clickjacking باستخدام JavaScript
(function() {
  // الطريقة الأولى: التحقق من top.location
  if (window.top !== window.self) {
    // الصفحة تعمل داخل iframe
    document.body.innerHTML = '';
    window.top.location = window.self.location;
    // أو إعادة توجيه إلى صفحة خطأ
  }

  // الطريقة الثانية: استخدام X-Frame-Options مع JavaScript
  // (ملاحظة: هذه الطريقة أقل فعالية)
  if (document.referrer === '') {
    // قد يكون من iframe
  }
})();

// في React/Next.js
'use client';
import { useEffect } from 'react';

export default function ClickjackingProtection() {
  useEffect(() => {
    if (window.top !== window.self) {
      window.top.location = window.self.location;
    }
  }, []);

  return null;
}

// استخدام في الصفحة
import ClickjackingProtection from '@/components/ClickjackingProtection';

export default function SensitivePage() {
  return (
    <div>
      <ClickjackingProtection />
      <h1>صفحة حساسة</h1>
    </div>
  );
}`}</pre>
              </div>
            </div>

            {/* Prevention 4 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-2">4. حماية صفحات تسجيل الدخول والعمليات الحساسة</h3>
              <p className="text-gray-300 mb-3">
                تطبيق حماية إضافية على الصفحات الحساسة مثل تسجيل الدخول والدفع وإعدادات الحساب.
              </p>
              <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-cyan-300 font-mono whitespace-pre">{`// Next.js Middleware - حماية جميع الصفحات الحساسة
// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const response = NextResponse.next();

  // حماية صفحات تسجيل الدخول
  if (request.nextUrl.pathname.startsWith('/auth')) {
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Content-Security-Policy', "frame-ancestors 'none'");
  }

  // حماية صفحات الإعدادات
  if (request.nextUrl.pathname.startsWith('/settings')) {
    response.headers.set('X-Frame-Options', 'DENY');
  }

  // حماية صفحات الدفع
  if (request.nextUrl.pathname.startsWith('/checkout')) {
    response.headers.set('X-Frame-Options', 'DENY');
  }

  return response;
}

export const config = {
  matcher: ['/auth/:path*', '/settings/:path*', '/checkout/:path*']
};

// تطبيق عام على جميع الصفحات (الأكثر أماناً)
export function middleware(request: Request) {
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Content-Security-Policy', "frame-ancestors 'self'");
  return response;
}`}</pre>
              </div>
            </div>

            {/* Prevention 5 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-2">5. حماية عبر frameworks وأدوات الاختبار</h3>
              <p className="text-gray-300 mb-3">
                استخدام الإعدادات المدمجة في أطر العمل المختلفة.
              </p>
              <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-cyan-300 font-mono whitespace-pre">{`# React/Next.js - next.config.mjs
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; frame-ancestors 'none'"
  }
];

const nextConfig = {
  headers: async () => [{
    source: '/(.*)',
    headers: securityHeaders
  }]
};

# Django - settings.py
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# Laravel - app/Http/Middleware/TrustProxies.php
# إضافة middleware للحماية
'Referrer-Policy' => 'strict-origin-when-cross-origin',

# Apache - .htaccess
Header always set X-Frame-Options "DENY"
Header always set Content-Security-Policy "frame-ancestors 'none'"

# Nginx - nginx.conf
add_header X-Frame-Options "DENY" always;
add_header Content-Security-Policy "frame-ancestors 'none'" always;`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* Security Tips Section */}
        <section className="mb-12 bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">نصائح أمنية مهمة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "استخدم X-Frame-Options: DENY على جميع الصفحات الحساسة",
              "أضف CSP frame-ancestors 'none' كخط دفاع إضافي لحماية شاملة",
              "لا تعتمد فقط على حماية JavaScript للكشف عن Clickjacking",
              "تأكد من أن صفحات تسجيل الدخول محمية من التضمين في أي حال",
              "استخدمSAMEORIGIN فقط إذا كان لديك سبب مشروع لالتضمين الداخلي",
              "اختبر حماية Clickjacking بانتظام باستخدام أدوات مثل OWASP ZAP",
              "تأكد من أن جميع صفحات API محمية من التضمين في المتصفح",
              "استخدم middleware في Next.js لتطبيق الحماية على جميع الصفحات الحساسة",
              "تحقق من أن صفحات الدفع والإعدادات محمية بشكل خاص",
              "استخدم أدوات DevTools للتحقق من وجود رؤوس الحماية في استجابة الخادم",
            ].map((tip, index) => (
              <div key={index} className="flex items-start gap-3 bg-gray-900 rounded-lg p-4 border border-gray-700">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-gray-300">{tip}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section className="mb-12 bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">الأخطاء الشائعة التي يجب تجنبها</h2>
          <div className="space-y-4">
            {[
              {
                mistake: "عدم استخدام X-Frame-Options أو CSP frame-ancestors",
                consequence: "يسمح لأي موقع بضمين صفحتك في iframe والتحكم في كيفية عرضها للمستخدم"
              },
              {
                mistake: "استخدام JavaScript كحل وحيد للحماية من Clickjacking",
                consequence: "يمكن للمهاجم تعطيل JavaScript أو استخدام تقنيات أخرى لتجاوز الحماية"
              },
              {
                mistake: "عدم حماية صفحات تسجيل الدخول والإعدادات بشكل خاص",
                consequence: "هذه الصفحات هي الهدف الأساسي لهجمات Clickjacking لسرقة الحسابات"
              },
              {
                mistake: "استخدام ALLOW-FROM بدلاً من CSP frame-ancestors",
                consequence: "ALLOW-FROM متقادم وتمت إزالته من معظم المتصفحات الحديثة"
              },
              {
                mistake: "عدم اختبار الحماية على جميع الصفحات",
                consequence: "صفحة واحدة غير محمية يمكن أن تكون نقطة الدخول لهجمات Clickjacking"
              },
              {
                mistake: "الاعتماد فقط على حماية الجهة الأمامية (Frontend)",
                consequence: "يجب تطبيق الحماية على مستوى الخادم لضمان فعاليتها حتى مع تعطيل JavaScript"
              },
              {
                mistake: "استخدام SAMEORIGIN عندما لا يكون هناك سبب مشروع",
                consequence: "يسمح لمواقع أخرى في نفس النطاق بضمين صفحتك في iframe"
              },
              {
                mistake: "عدم تحديث إعدادات الحماية عند تغيير بنية التطبيق",
                consequence: "الصفحات الجديدة قد تفتقر للحماية بعد التحديثات"
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-5 border border-red-500/20">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl mt-1">✗</span>
                  <div>
                    <h4 className="text-white font-bold">{item.mistake}</h4>
                    <p className="text-gray-400 mt-1">{item.consequence}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Section */}
        <section className="mb-12 bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">تأثير الثغرة ومدى خطورتها</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🔴</div>
              <h4 className="font-bold text-red-400 mb-2">التأثير على النزاهة</h4>
              <p className="text-gray-300 text-sm mb-0">مرتفع - تنفيذ عمليات غير مصرح بها (حذف حساب، اشتراك، شراء)</p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🟠</div>
              <h4 className="font-bold text-orange-400 mb-2">التأثير على السرية</h4>
              <p className="text-gray-300 text-sm mb-0">متوسط - سرقة بيانات الدخول عبر نماذج مزيفة</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🟡</div>
              <h4 className="font-bold text-yellow-400 mb-2">التأثير على التوفر</h4>
              <p className="text-gray-300 text-sm mb-0">منخفض إلى متوسط - تعطيل الحسابات أو تغيير إعداداتها</p>
            </div>
          </div>

          <blockquote className="border-r-4 border-cyan-500 pr-4 italic text-gray-400 my-6">
            حسب تصنيف OWASP Top 10، Clickjacking مدرج ضمن فئة &quot;A05:2021 - Security Misconfiguration&quot; (سوء التكوين الأمني). تأثر تطبيقات الويب بهذه الثغرة بشكل واسع، خاصة تلك التي لا تستخدم تأمينات HTTP Headers بشكل صحيح. تقارير أمنية تشير إلى أن أكثر من 50% من مواقع الويب لا تستخدم X-Frame-Options أو CSP frame-ancestors.
          </blockquote>
        </section>

        {/* Comparison Table */}
        <section className="mb-12 bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">مقارنة بين طرق الحماية</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-700">
              <thead>
                <tr className="bg-gray-900">
                  <th className="border border-gray-700 p-3 text-right">الطريقة</th>
                  <th className="border border-gray-700 p-3 text-right">المرونة</th>
                  <th className="border border-gray-700 p-3 text-right">التوافق</th>
                  <th className="border border-gray-700 p-3 text-right">التوصية</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-700 p-3 font-semibold text-white">X-Frame-Options</td>
                  <td className="border border-gray-700 p-3 text-gray-300">محدودة (DENY/SAMEORIGIN/ALLOW-FROM)</td>
                  <td className="border border-gray-700 p-3 text-gray-300">متوسط - متقادم في بعض المتصفحات</td>
                  <td className="border border-gray-700 p-3">
                    <span className="text-yellow-400 font-semibold">جيد كحل أساسي</span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 p-3 font-semibold text-white">CSP frame-ancestors</td>
                  <td className="border border-gray-700 p-3 text-gray-300">مرنة جداً (تحديد مواقع محددة وأنماط)</td>
                  <td className="border border-gray-700 p-3 text-gray-300">ممتاز - مدعوم في جميع المتصفحات الحديثة</td>
                  <td className="border border-gray-700 p-3">
                    <span className="text-green-400 font-semibold">الأفضل والأحدث</span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 p-3 font-semibold text-white">JavaScript Detection</td>
                  <td className="border border-gray-700 p-3 text-gray-300">محدودة</td>
                  <td className="border border-gray-700 p-3 text-gray-300">ضعيف - يمكن تجاوزه بتعطيل JS</td>
                  <td className="border border-gray-700 p-3">
                    <span className="text-red-400 font-semibold">غير كافٍ كحل وحيد</span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 p-3 font-semibold text-white">X-Frame-Options + CSP</td>
                  <td className="border border-gray-700 p-3 text-gray-300">ممتازة - تغطية شاملة</td>
                  <td className="border border-gray-700 p-3 text-gray-300">ممتازة - حماية متعددة الطبقات</td>
                  <td className="border border-gray-700 p-3">
                    <span className="text-green-400 font-semibold">الأكثر أماناً</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <ToolsSection slug="clickjacking" />
        <VideoSection slug="clickjacking" />

        {/* Navigation to Other Vulnerabilities */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">أنواع أخرى من الثغرات</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/vulnerabilities/xss" className="block bg-gray-800 hover:bg-gray-700 transition rounded-xl p-6 border border-gray-700 hover:border-cyan-400">
              <h3 className="text-white font-bold mb-2">XSS</h3>
              <p className="text-gray-400 text-sm">حقن الشفرة الخبيثة في صفحات الويب</p>
            </Link>
            <Link href="/vulnerabilities/csrf" className="block bg-gray-800 hover:bg-gray-700 transition rounded-xl p-6 border border-gray-700 hover:border-cyan-400">
              <h3 className="text-white font-bold mb-2">CSRF</h3>
              <p className="text-gray-400 text-sm">تزوير الطلبات بين المواقع</p>
            </Link>
            <Link href="/vulnerabilities/sql-injection" className="block bg-gray-800 hover:bg-gray-700 transition rounded-xl p-6 border border-gray-700 hover:border-cyan-400">
              <h3 className="text-white font-bold mb-2">SQL Injection</h3>
              <p className="text-gray-400 text-sm">حقن استعلامات SQL في قواعد البيانات</p>
            </Link>
            <Link href="/vulnerabilities/ssrf" className="block bg-gray-800 hover:bg-gray-700 transition rounded-xl p-6 border border-gray-700 hover:border-cyan-400">
              <h3 className="text-white font-bold mb-2">SSRF</h3>
              <p className="text-gray-400 text-sm">تزوير الطلبات من الخادم إلى الخادم</p>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-block bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-cyan-700 transition-colors"
            >
              العودة للرئيسية
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm border-t border-gray-700 pt-8 mt-12">
          <p>دليل أمان تطبيقات الويب - جميع الحقوق محفوظة</p>
        </footer>
      </div>
    </div>
  );
}
