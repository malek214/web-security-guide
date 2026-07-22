import Link from 'next/link'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'
import ShareButtons from '@/components/ShareButtons'

export default function IdorPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">الرئيسية</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">IDOR</span>
      </nav>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x1F510;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">مراجع كائنات مباشرة غير آمنة</h1>
            <p className="text-xl text-gray-500 mt-1">Insecure Direct Object References (IDOR)</p>
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-orange-700 font-semibold mb-0">&#x26A0; مستوى الخطورة: عالية</p>
        </div>
      </header>

      <div className="mb-6">
        <ShareButtons title="IDOR" url={"https://web-security-guide.vercel.app/vulnerabilities/idor"} />
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">تعريف IDOR</h2>
        <p>
          مراجع كائنات مباشرة غير آمنة (IDOR) هي ثغرة أمنية تسمح للمهاجم بالوصول غير المصرح به
          إلى كائنات بيانات عن طريق تعديل معرفات (IDs) في الطلبات.
        </p>
        <p>
          على سبيل المثال، إذا كان بإمكان المستخدم الوصول إلى ملفه الشخصي عبر
          <code>/profile?id=123</code>، يمكن للمهاجم تجربة <code>/profile?id=124</code>
          للوصول إلى حساب مستخدم آخر.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أنواع IDOR</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">1. أفقي (Horizontal IDOR)</h3>
            <p>الوصول لحسابات مستخدمين آخرين بنفس المستوى الصلاحيات.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">2. عمودي (Vertical IDOR)</h3>
            <p>الوصول لحسابات بصلاحيات أعلى (مثل الوصول للوحة الإدارة).</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة على الكود</h2>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-red-700 mb-3">&#x274C; كود مصاب</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
{`// Express.js - كود مصاب
app.get('/api/invoice/:id', (req, res) => {
  const invoice = db.invoices.findById(req.params.id);
  // لا يوجد تحقق من صاحب الفاتورة!
  res.json(invoice);
});

// المهاجم يغير ID: /api/invoice/124 بدلاً من 123`}
          </pre>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-green-700 mb-3">&#x2705; كود محصن</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
{`// Express.js - كود محصن
app.get('/api/invoice/:id', authenticate, (req, res) => {
  const invoice = db.invoices.findById(req.params.id);
  
  // تحقق من أن الفاتورة تنتمي للمستخدم الحالي
  if (invoice.userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  res.json(invoice);
});

// استخدام UUID بدلاً من IDs التسلسلي
// /api/invoice/a1b2c3d4-e5f6-7890-abcd-ef1234567890`}
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">طرق الحماية</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">1. تحقق من الصلاحيات دائماً</h4>
            <p className="text-gray-600 mb-0">تأكد من أن المستخدم مخول للوصول لكل كائن يطلبه</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">2. استخدم UUID بدلاً من IDs</h4>
            <p className="text-gray-600 mb-0">المعرفات العشوائية أصعب في التخمين</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">3. استخدم مراجع غير مباشرة</h4>
            <p className="text-gray-600 mb-0">اربط الكائنات بجلسة المستخدم بدلاً من المعاملات</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الثغرات الأخرى</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vulnerabilities/broken-access-control" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F6AB;</span>
            <h4 className="font-bold mt-2">خطأ في التحكم بالوصول</h4>
          </Link>
          <Link href="/vulnerabilities/sql-injection" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F489;</span>
            <h4 className="font-bold mt-2">حقن SQL</h4>
          </Link>
          <Link href="/vulnerabilities/xss" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F4DC;</span>
            <h4 className="font-bold mt-2">XSS</h4>
          </Link>
        </div>
      </section>

      <LabsSection slug="idor" />
      <ToolsSection slug="idor" />
      <Quiz slug="idor" />
      <VideoSection slug="idor" />
    </div>
  )
}
