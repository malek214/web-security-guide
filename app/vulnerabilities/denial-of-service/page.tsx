import Link from 'next/link'

export default function DenialOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">الرئيسية</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Denial of Service</span>
      </nav>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x1F4A5;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">حجب الخدمة</h1>
            <p className="text-xl text-gray-500 mt-1">Denial of Service (DoS)</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-semibold mb-0">&#x26A0; مستوى الخطورة: عالية</p>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">تعريف DoS</h2>
        <p>
          هجوم حجب الخدمة (DoS) هو محاولة لجعل خدمة الويب غير متاحة للمستخدمين الشرعيين
          عن طريق إغراق الخادم بطلبات وهمية أو استغلال ثغرات تسبب توقف الخادم.
        </p>
        <p>
          عندما يكون الهجوم من عدة مصادر، يُعرف بهجوم حجب الخدمة الموزع (DDoS).
          يمكن أن تؤدي هذه الهجمات إلى خسائر مالية كبيرة وسمعة سيئة.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أنواع هجمات DoS</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">1. هجمات الحجم (Volumetric)</h3>
            <p>إغراق الشبكة ببيانات كبيرة لاستنفاد عرض النطاق.</p>
            <ul className="list-disc mr-6 mt-2">
              <li>UDP Flood</li>
              <li>ICMP Flood</li>
              <li>DNS Amplification</li>
            </ul>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">2. هجمات البروتوكول</h3>
            <p>استغلال ثغرات في بروتوكولات الشبكة.</p>
            <ul className="list-disc mr-6 mt-2">
              <li>SYN Flood</li>
              <li>Ping of Death</li>
              <li>Teardrop</li>
            </ul>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">3. هجمات طبقة التطبيق</h3>
            <p>استهداف تطبيقات الويب مباشرة.</p>
            <ul className="list-disc mr-6 mt-2">
              <li>HTTP Flood</li>
              <li>Slowloris</li>
              <li>ReDoS (Regular Expression DoS)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة على الكود</h2>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-red-700 mb-3">&#x274C; ReDoS - تعبير نمطي ضار</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
{`// تعبير نمطي مصاب بثغرة ReDoS
const maliciousRegex = /^(a+)+$/;

// عند إدخال: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!"
// سيأخذ وقتاً هائلاً للتحقق (Exponential Backtracking)

// اختبار
console.time('ReDoS');
maliciousRegex.test('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!');
console.timeEnd('ReDoS'); // قد يستغرق ثوانٍ`}
          </pre>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-green-700 mb-3">&#x2705; كود محصن - Rate Limiting</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
{`// Node.js مع express-rate-limit
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100, // أقصى 100 طلب لكل IP
  message: 'تم تجاوز الحد المسموح',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// تقييد حجم الطلب
app.use(express.json({ limit: '10kb' }));`}
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">طرق الحماية</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">1. تقييد معدل الطلبات (Rate Limiting)</h4>
            <p className="text-gray-600 mb-0">تحديد عدد الطلبات المسموح بها لكل مستخدم</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">2. استخدام CDN</h4>
            <p className="text-gray-600 mb-0">توزيع الحمل على عدة خوادم</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">3. WAF (جدار حماية تطبيقات الويب)</h4>
            <p className="text-gray-600 mb-0">تصفية الطلبات الضارة قبل وصولها للخادم</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">4. تقييد الموارد</h4>
            <p className="text-gray-600 mb-0">تحديد الحد الأقصى لاستهلاك CPU والذاكرة</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الثغرات الأخرى</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vulnerabilities/ddos" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F30D;</span>
            <h4 className="font-bold mt-2">DDoS</h4>
          </Link>
          <Link href="/vulnerabilities/redos" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F522;</span>
            <h4 className="font-bold mt-2">ReDoS</h4>
          </Link>
          <Link href="/vulnerabilities/slowloris" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F6CC;</span>
            <h4 className="font-bold mt-2">Slowloris</h4>
          </Link>
        </div>
      </section>
    </div>
  )
}
