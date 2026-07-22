"use client";

import Link from "next/link";

const SecurityMisconfigurationPage = () => {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <nav className="mb-8">
            <Link
              href="/"
              className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
            >
              الرئيسية
            </Link>
            <span className="mx-2 text-gray-600">/</span>
            <Link
              href="/vulnerabilities"
              className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
            >
              الثغرات
            </Link>
            <span className="mx-2 text-gray-600">/</span>
            <span className="text-gray-400 text-sm">خطأ في التكوين الأمني</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            خطأ في التكوين الأمني
          </h1>
          <p className="text-xl text-cyan-400 font-mono">
            Security Misconfiguration
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-900/50 text-red-300 border border-red-800">
              مستوى الخطورة: مرتفع
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700">
              OWASP Top 10
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700">
              A05:2021
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Definition */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-800 pb-3">
            التعريف والمفهوم
          </h2>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <p className="text-lg leading-relaxed text-gray-300 mb-4">
              خطأ في التكوين الأمني (
              <span className="text-cyan-400 font-mono">
                Security Misconfiguration
              </span>
              ) هو ثغرة تنشأ عندما يُترك النظام أو التطبيق أو الخادم بتكوين
              افتراضي أو غير آمن، مما يكشف معلومات حساسة أو يسمح بالوصول غير
              المصرح به.
            </p>
            <p className="text-lg leading-relaxed text-gray-300 mb-4">
              تحدث هذه الثغرة في أي مستوى من مستويات التطبيق: من نظام التشغيل
              إلى خادم الويب، قاعدة البيانات، إطار العمل، أو حتى الخدمات
              السحابية. وتصبح مشكلة خطيرة عندما يتجاهل المطورون أو مشرفو
              النظام تأمين هذه الإعدادات.
            </p>
            <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
              <p className="text-sm text-gray-400 font-mono">
                وفقًا لاستبيان OWASP 2021، تحتل ثغرة التكوين الأمني الخاطئ
                المركز الخامس ضمن أهم 10 ثغرات أمنية.
              </p>
            </div>
          </div>
        </section>

        {/* Types */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-800 pb-3">
            أنواع خطأ التكوين الأمني
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Type 1 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-lg bg-red-900/50 flex items-center justify-center text-red-400 font-bold">
                  ١
                </span>
                <h3 className="text-lg font-bold text-white">
                  بيانات الاعتماد الافتراضية
                </h3>
              </div>
              <p className="text-gray-300 mb-3">
                استخدام كلمات مرور وأسماء مستخدمين افتراضية لم تُغيَّر بعد
                التثبيت. هذا خطأ شائع جدًا في الأجهزة السحابية وقواعد
                البيانات.
              </p>
              <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                <p className="text-xs text-gray-400 mb-2">أمثلة:</p>
                <ul className="space-y-1 text-sm text-gray-400 font-mono">
                  <li>• admin / admin</li>
                  <li>• root / password</li>
                  <li>• sa / (فارغ)</li>
                </ul>
              </div>
            </div>

            {/* Type 2 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-lg bg-orange-900/50 flex items-center justify-center text-orange-400 font-bold">
                  ٢
                </span>
                <h3 className="text-lg font-bold text-white">
                  خدمات غير ضرورية مفعلة
                </h3>
              </div>
              <p className="text-gray-300 mb-3">
                تشغيل خدمات أو منافذ غير مستخدمة تزيد من السطح الهجومي
                للمهاجمين.
              </p>
              <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                <p className="text-xs text-gray-400 mb-2">أمثلة:</p>
                <ul className="space-y-1 text-sm text-gray-400 font-mono">
                  <li>• Telnet (منفذ 23)</li>
                  <li>• FTP (منفذ 21)</li>
                  <li>• Debug mode مفعّل في الإنتاج</li>
                </ul>
              </div>
            </div>

            {/* Type 3 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-lg bg-yellow-900/50 flex items-center justify-center text-yellow-400 font-bold">
                  ٣
                </span>
                <h3 className="text-lg font-bold text-white">
                  تحديثات وتصحيحات مفقودة
                </h3>
              </div>
              <p className="text-gray-300 mb-3">
                عدم تثبيت التحديثات الأمنية يترك الثغرات المعروفة مفتوحة
                للمهاجمين.
              </p>
              <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                <p className="text-xs text-gray-400 mb-2">المخاطر:</p>
                <ul className="space-y-1 text-sm text-gray-400 font-mono">
                  <li>• استغلال ثغرات معروفة (CVE)</li>
                  <li>• هجمات Zero-day</li>
                  <li>• اختراق النظام بالكامل</li>
                </ul>
              </div>
            </div>

            {/* Type 4 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-lg bg-purple-900/50 flex items-center justify-center text-purple-400 font-bold">
                  ٤
                </span>
                <h3 className="text-lg font-bold text-white">
                  أذونات غير صحيحة
                </h3>
              </div>
              <p className="text-gray-300 mb-3">
                منح صلاحيات واسعة بشكل غير ضروري تviolates مبدأ الامتياز
                الأدنى.
              </p>
              <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                <p className="text-xs text-gray-400 mb-2">أمثلة:</p>
                <ul className="space-y-1 text-sm text-gray-400 font-mono">
                  <li>• ملفات بـ 777 permissions</li>
                  <li>• مستخدم root لخدمات الويب</li>
                  <li>• أذونات كتابة في مجلد النظام</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Real-world Examples with Code */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-800 pb-3">
            أمثلة واقعية بالكود
          </h2>

          {/* Example 1: Nginx Config */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-cyan-400">
              مثال ١: كشف معلومات في تكوين Nginx
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-xl p-5 border border-red-800">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-red-900/50 text-red-400 font-mono">
                    غير آمن
                  </span>
                </div>
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
{`server {
    listen 80;
    server_name example.com;

    # كشف إصدار Nginx
    server_tokens on;

    location / {
        proxy_pass http://backend;
    }

    # صفحة الخطأ تكشف معلومات النظام
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}`}
                </pre>
              </div>
              <div className="bg-gray-900 rounded-xl p-5 border border-green-800">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-green-900/50 text-green-400 font-mono">
                    آمن
                  </span>
                </div>
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
{`server {
    listen 80;
    server_name example.com;

    # إخفاء إصدار Nginx
    server_tokens off;

    location / {
        proxy_pass http://backend;
    }

    # صفحة خطأ مخصصة لا تكشف معلومات
    error_page 500 502 503 504 /custom_50x.html;
    location = /custom_50x.html {
        root /usr/share/nginx/html;
        internal;
    }
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Example 2: Express.js */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-cyan-400">
              مثال ٢: تكوين خادم Express.js
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-xl p-5 border border-red-800">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-red-900/50 text-red-400 font-mono">
                    غير آمن
                  </span>
                </div>
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
{`const express = require('express');
const app = express();

// تشغيل وضع التطوير في الإنتاج
app.set('env', 'development');

// كشف تفاصيل الأخطاء
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
    stack: err.stack // معلومات حساسة
  });
});

// عدم تكوين helmet
app.listen(3000);`}
                </pre>
              </div>
              <div className="bg-gray-900 rounded-xl p-5 border border-green-800">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-green-900/50 text-green-400 font-mono">
                    آمن
                  </span>
                </div>
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
{`const express = require('express');
const helmet = require('helmet');
const app = express();

// وضع الإنتاج
app.set('env', 'production');

// تطبيق helmet لتأمين Headers
app.use(helmet());

// معالجة الأخطاء بأمان
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'خطأ داخلي في الخادم'
  });
});

app.listen(3000);`}
                </pre>
              </div>
            </div>
          </div>

          {/* Example 3: Docker */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-cyan-400">
              مثال ٣: تكوين Docker غير الآمن
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-xl p-5 border border-red-800">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-red-900/50 text-red-400 font-mono">
                    غير آمن
                  </span>
                </div>
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
{`# تشغيل كمستخدم root
FROM node:18

WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000

# تشغيل كـ root
CMD ["node", "server.js"]`}
                </pre>
              </div>
              <div className="bg-gray-900 rounded-xl p-5 border border-green-800">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-green-900/50 text-green-400 font-mono">
                    آمن
                  </span>
                </div>
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
{`# تشغيل كمستخدم غير root
FROM node:18-alpine

RUN addgroup -S appgroup && \\
    adduser -S appuser -G appgroup

WORKDIR /app
COPY --chown=appuser:appgroup . .
RUN npm install --production

EXPOSE 3000

USER appuser
CMD ["node", "server.js"]`}
                </pre>
              </div>
            </div>
          </div>

          {/* Example 4: Environment Variables */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-cyan-400">
              مثال ٤: تسريب متغيرات البيئة
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-xl p-5 border border-red-800">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-red-900/50 text-red-400 font-mono">
                    غير آمن
                  </span>
                </div>
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
{`// عرض جميع متغيرات البيئة
app.get('/debug', (req, res) => {
  res.json(process.env);
});

// تسريب معلومات في السجلات
console.log('DB Password:', DB_PASSWORD);
console.log('API Key:', API_KEY);`}
                </pre>
              </div>
              <div className="bg-gray-900 rounded-xl p-5 border border-green-800">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-green-900/50 text-green-400 font-mono">
                    آمن
                  </span>
                </div>
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
{`// استخدام Dotenv بشكل آمن
require('dotenv').config();

// عدم تسريب المفاتيح
console.log('DB connected successfully');

// استخدام متغيرات آمنة فقط
const safeConfig = {
  port: process.env.PORT,
  env: process.env.NODE_ENV
};`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Detection */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-800 pb-3">
            كيفية اكتشاف خطأ التكوين الأمني
          </h2>
          <div className="space-y-6">
            {/* Automated Scanning */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                الفحص الأوتوماتيكي
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                  <p className="text-cyan-400 font-mono text-sm mb-2">
                    Nessus
                  </p>
                  <p className="text-gray-400 text-sm">
                    أداة مسحة أمنية شاملة تكشف الثغرات الناتجة عن التكوين
                    الخاطئ
                  </p>
                </div>
                <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                  <p className="text-cyan-400 font-mono text-sm mb-2">
                    OpenVAS
                  </p>
                  <p className="text-gray-400 text-sm">
                    أداة فحص مفتوحة المصدر لاكتشاف المشاكل الأمنية
                  </p>
                </div>
                <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                  <p className="text-cyan-400 font-mono text-sm mb-2">
                    Scout Suite
                  </p>
                  <p className="text-gray-400 text-sm">
                    فحص تكوين الخدمات السحابية (AWS, Azure, GCP)
                  </p>
                </div>
                <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                  <p className="text-cyan-400 font-mono text-sm mb-2">
                    Prowler
                  </p>
                  <p className="text-gray-400 text-sm">
                    فحص أمان AWS وفقًا لمعايير CIS Benchmark
                  </p>
                </div>
              </div>
            </div>

            {/* Manual Inspection */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                الفحص اليدوي
              </h3>
              <div className="space-y-3">
                <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                  <p className="text-gray-300 text-sm mb-2 font-mono">
                    # فحص المنافذ المفتوحة
                  </p>
                  <code className="text-cyan-400 text-sm">
                    nmap -sV -sC target_ip
                  </code>
                </div>
                <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                  <p className="text-gray-300 text-sm mb-2 font-mono">
                    # فحص بيانات الاعتماد الافتراضية
                  </p>
                  <code className="text-cyan-400 text-sm">
                    hydra -l admin -P passwords.txt target_ip http-post-form
                  </code>
                </div>
                <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                  <p className="text-gray-300 text-sm mb-2 font-mono">
                    # فحص تكوين Apache
                  </p>
                  <code className="text-cyan-400 text-sm">
                    nikto -h target_ip
                  </code>
                </div>
              </div>
            </div>

            {/* Code Review */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                مراجعة الكود والتكوين
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  مراجعة ملفات التكوين (.env, config.json, docker-compose.yml)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  التحقق من عدم وجود بيانات اعتمافت افتراضية
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  فحص أذونات الملفات والمجلدات
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  التحقق من تعطيل وضع التطوير في بيئة الإنتاج
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  مراجعة سجلات الأخطاء للتأكد من عدم تسريب المعلومات
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Prevention */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-800 pb-3">
            كيفية الوقاية والإصلاح
          </h2>
          <div className="space-y-6">
            {/* Hardening */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold mb-4 text-white">
                تعزيز التكوين (Hardening)
              </h3>
              <div className="bg-gray-950 rounded-lg p-4 border border-gray-800 mb-4">
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
{`# Apache Security Hardening
# تعطيل إصدار Apache
ServerTokens Prod
ServerSignature Off

# تعطيل Directory Listing
<Directory /var/www/html>
    Options -Indexes
    AllowOverride None
</Directory>

# تأمين Headers الأمنية
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"`}
                </pre>
              </div>
            </div>

            {/* Minimization */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold mb-4 text-white">
                تقليل السطح الهجومي (Minimization)
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold mt-1">→</span>
                  <div>
                    <p className="font-bold text-white mb-1">
                      إزالة الخدمات غير الضرورية
                    </p>
                    <p className="text-sm text-gray-400">
                      أوقف Telnet, FTP, Rlogin واستبدلها بـ SSH و SFTP
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold mt-1">→</span>
                  <div>
                    <p className="font-bold text-white mb-1">
                      تعطيل المنافذ غير المستخدمة
                    </p>
                    <code className="text-sm text-cyan-400 font-mono">
                      sudo ufw deny 23/tcp
                    </code>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold mt-1">→</span>
                  <div>
                    <p className="font-bold text-white mb-1">
                      استخدام صور Docker مصغرة
                    </p>
                    <p className="text-sm text-gray-400">
                      استخدم alpine أو distroless بدلاً من الصور الكاملة
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Regular Audits */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold mb-4 text-white">
                المراجعات الدورية (Regular Audits)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                  <p className="font-bold text-white mb-2">أتمتة المراجعات</p>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• استخدام CIS Benchmarks</li>
                    <li>• تطبيق Infrastructure as Code</li>
                    <li>• مراجعة سجلات التدقيق بشكل دوري</li>
                  </ul>
                </div>
                <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                  <p className="font-bold text-white mb-2">الصيانة الدورية</p>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• تحديث البرمجيات بشكل منتظم</li>
                    <li>• تدوير كلمات المرور والأفات</li>
                    <li>• مراجعة أذونات المستخدمين</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Secure Defaults */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold mb-4 text-white">
                استخدام الإعدادات الآمنة الافتراضية
              </h3>
              <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
{`# مثال: التحقق من الإعدادات الآمنة في تطبيق Next.js

// next.config.js
module.exports = {
  // تعطيل التشخيص في الإنتاج
  poweredByHeader: false,

  // تأمين Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Security Tips */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-800 pb-3">
            نصائح أمنية وممارسات مثلى
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold mb-4 text-green-400">
                ممارسات مثلى
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  تطبيق مبدأ الامتياز الأدنى (Principle of Least Privilege)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  تغيير جميع كلمات المرور الافتراضية فور التثبيت
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  استخدام Infrastructure as Code (IaC)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  تطبيق CIS Benchmarks لتكوين الأنظمة
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  استخدام DevSecOps لدمج الأمان في عملية التطوير
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  إجراء مراجعات أمنية دورية
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold mb-4 text-red-400">
                أخطاء شائعة يجب تجنبها
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  استخدام كلمة مرور افتراضية بعد التثبيت
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  تشغيل التطبيقات بصلاحيات root
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  تجاهل تحديثات الأمان والتصحيحات
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  ترك ملفات التكوين بأذونات宽松
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  تشغيل وضع التطوير في بيئة الإنتاج
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  عدم استخدام SSL/TLS في الاتصالات
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-800 pb-3">
            أخطاء شائعة في التكوين
          </h2>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-right py-3 px-4 text-gray-400 font-normal">
                      الخطأ
                    </th>
                    <th className="text-right py-3 px-4 text-gray-400 font-normal">
                      المخاطر
                    </th>
                    <th className="text-right py-3 px-4 text-gray-400 font-normal">
                      الحل
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-mono text-cyan-400">
                      server_tokens on
                    </td>
                    <td className="py-3 px-4">كشف إصدار الخادم</td>
                    <td className="py-3 px-4">تعيين server_tokens off</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-mono text-cyan-400">
                      DEBUG = True
                    </td>
                    <td className="py-3 px-4">كشف معلومات التصحيح</td>
                    <td className="py-3 px-4">تعيين DEBUG = False</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-mono text-cyan-400">
                      chmod 777 *
                    </td>
                    <td className="py-3 px-4">أذونات宽松 للغاية</td>
                    <td className="py-3 px-4">chmod 750 أو 640</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-mono text-cyan-400">
                      Expose: 5000
                    </td>
                    <td className="py-3 px-4">كشف المنافذ الداخلية</td>
                    <td className="py-3 px-4">استخدام reverse proxy</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-cyan-400">
                      Error reporting: E_ALL
                    </td>
                    <td className="py-3 px-4">كشف أخطاء PHP</td>
                    <td className="py-3 px-4">
                      error_reporting = E_ERROR
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Navigation Links */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-800 pb-3">
            روابط متعلقة
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/vulnerabilities/injection"
              className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-cyan-800 transition-colors"
            >
              <h3 className="font-bold text-white mb-2">حقن الأكواد</h3>
              <p className="text-sm text-gray-400">SQL Injection, XSS, و daha fazlası</p>
              <span className="text-cyan-400 text-sm mt-2 inline-block">
                ← السابق
              </span>
            </Link>
            <Link
              href="/vulnerabilities"
              className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-cyan-800 transition-colors text-center"
            >
              <h3 className="font-bold text-white mb-2">جميع الثغرات</h3>
              <p className="text-sm text-gray-400"> العودة لقائمة الثغرات</p>
              <span className="text-cyan-400 text-sm mt-2 inline-block">
                ↑ الأعلى
              </span>
            </Link>
            <Link
              href="/vulnerabilities/broken-access-control"
              className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-cyan-800 transition-colors"
            >
              <h3 className="font-bold text-white mb-2">
                خلل في التحكم بالوصول
              </h3>
              <p className="text-sm text-gray-400">Broken Access Control</p>
              <span className="text-cyan-400 text-sm mt-2 inline-block">
                التالي →
              </span>
            </Link>
          </div>
        </section>

        {/* References */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-800 pb-3">
            مراجع ومصادر
          </h2>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                • OWASP Foundation -{" "}
                <span className="text-cyan-400 font-mono">
                  Security Misconfiguration
                </span>
              </li>
              <li>
                • NIST SP 800-53 - Security and Privacy Controls
              </li>
              <li>
                • CIS Benchmarks - Center for Internet Security
              </li>
              <li>
                • CWE-16 - Configuration
              </li>
              <li>
                • SANS Top 25 Software Errors
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>دليل الأمان على الويب - دليل شامل لثغرات وحماية تطبيقات الويب</p>
        </div>
      </footer>
    </div>
  );
};

export default SecurityMisconfigurationPage;
