import Link from 'next/link'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import ShareButtons from '@/components/ShareButtons'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'

export default function CRLFInjectionPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">الرئيسية</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">CRLF Injection</span>
      </nav>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x21A9;&#xFE0F;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">حقن CRLF</h1>
            <p className="text-xl text-gray-500 mt-1">CRLF Injection</p>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-700 font-semibold mb-0">&#x26A0; مستوى الخطورة: متوسطة إلى عالية</p>
        </div>
      </header>

      <div className="mb-6">
        <ShareButtons title="CRLF Injection" url={"https://web-security-guide.vercel.app/vulnerabilities/crlf-injection"} />
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">تعريف CRLF Injection</h2>
        <p>
          حقن CRLF هو ثغرة أمنية تسمح للمهاجم بإدخال أحرف خاصة (Carriage Return و Line Feed) في استجابات الخادم.
          يتم استخدام هذه الأحرف للتحكم في كيفية عرض المحتوى أوحقن رؤوس HTTP إضافية.
        </p>
        <p>
          يمكن أن يؤدي هذا إلى several هجمات مثل: تسميم السجلات (Log Injection)، حقن الرؤوس (Header Injection)،
          وتقسيم الاستجابة (Response Splitting).
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">كيف يعمل CRLF</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">أنواعه:</h3>
          <ul className="list-disc mr-6">
            <li><strong>حقن رؤوس HTTP:</strong> إضافة رؤوس وهمية في الاستجابة</li>
            <li><strong>تقسيم الاستجابة:</strong> فصل الاستجابة إلى استجابتين</li>
            <li><strong>تسميم السجلات:</strong> إدخال سجلات كاذبة في ملفات السجل</li>
            <li><strong>XSS عبر CRLF:</strong> حقن JavaScript من خلال تسميم السجلات</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة على الكود</h2>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-red-700 mb-3">&#x274C; كود مصاب</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
{`// Node.js - كود مصاب
app.get('/search', (req, res) => {
  const query = req.query.q;
  // حقن CRLF ممكن عبر parameter
  res.redirect('/results?q=' + query);
});

// إذا أدخل المهاجم: /search?q=test%0D%0ASet-Cookie:hacked=true
// سيتم إضافة Cookie مخفي للاستجابة`}
          </pre>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-green-700 mb-3">&#x2705; كود محصن</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
{`// Node.js - كود محصن
app.get('/search', (req, res) => {
  const query = req.query.q
    .replace(/[\\r\\n]/g, '') // إزالة CRLF
    .trim();
  res.redirect('/results?q=' + encodeURIComponent(query));
});

// أو استخدام helmet ل设置 رؤوس أمان
const helmet = require('helmet');
app.use(helmet());`}
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">طرق الحماية</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">1. تنقية المدخلات</h4>
            <p className="text-gray-600 mb-0">إزالة أو ترميز أحرف CRLF من جميع مدخلات المستخدم</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">2. ترميز URL</h4>
            <p className="text-gray-600 mb-0">استخدام encodeURIComponent() لترميز المعاملات</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">3. استخدام Helmet</h4>
            <p className="text-gray-600 mb-0">مكتبة تضبط رؤوس الأمان تلقائياً في Express</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">4. تحديث الأطر العمل</h4>
            <p className="text-gray-600 mb-0">استخدام أحدث إصدارات الأطر التي تعالج هذه الثغرة</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <LabsSection slug="crlf-injection" />
      </section>

      <section className="mb-12">
        <ToolsSection slug="crlf-injection" />
      </section>

      <Quiz slug="crlf-injection" />
      <VideoSection slug="crlf-injection" />

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الثغرات الأخرى</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vulnerabilities/sql-injection" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F489;</span>
            <h4 className="font-bold mt-2">حقن SQL</h4>
          </Link>
          <Link href="/vulnerabilities/xss" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F4DC;</span>
            <h4 className="font-bold mt-2">XSS</h4>
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
