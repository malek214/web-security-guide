import Link from 'next/link'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import ShareButtons from '@/components/ShareButtons'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'

export default function FileUploadPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">📤</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">ثغرات رفع الملفات</h1>
            <p className="text-xl text-gray-500 mt-1">File Upload Vulnerabilities</p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <span className="inline-block bg-danger-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
            خطيرة جداً
          </span>
          <p className="text-gray-700 mb-0">
            ثغرات تسمح للمهاجم برفع ملفات ضارة إلى الخادم، مما قد يؤدي لتنفيذ أكواد عشوائية أو الوصول غير المصرح به.
          </p>
        </div>
      </section>

      <div className="mb-6">
        <ShareButtons title="ثغرات رفع الملفات" url={"https://web-security-guide.vercel.app/vulnerabilities/file-upload"} />
      </div>

      {/* Definition */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">تعريف ثغرات رفع الملفات</h2>
        <p>
          ثغرات رفع الملفات تحدث عندما لا يتم التحقق بشكل صحيح من نوع أو محتوى الملفات المرفوعة. يمكن للمهاجم استغلال هذا لرفع ملفات خطيرة مثل:
        </p>
        <ul>
          <li><strong>ملفات Web Shell:</strong> ملفات PHP أو ASP تسمح بتحكم كامل في الخادم</li>
          <li><strong>ملفات ضارة:</strong> ملفات تحتوي على برمجيات خبيثة</li>
          <li><strong>ملفات با☓ extension خاطئ:</strong> ملفات تتنكر كصور لكنها تنفذ أكواد</li>
        </ul>
      </section>

      {/* Types */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أنواع هجمات رفع الملفات</h2>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">1. Direct File Upload (رفع مباشر)</h3>
          <p>رفع ملف ضار مباشرة إلى الخادم وتنفيذه عبر URL مباشرة.</p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">2. Content-Type Bypass (تجاوز نوع المحتوى)</h3>
          <p>تغيير header Content-Type للملف لإيهام الخادم بأنه ملف آمن.</p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">3. Double Extension (امتداد مزدوج)</h3>
          <p>استخدام امتداد مزدوج مثل <code>shell.php.jpg</code> لتجاوز الفلاتر.</p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">4. Null Byte Injection</h3>
          <p>استخدام null byte مثل <code>shell.php%00.jpg</code> لقطع الامتداد.</p>
        </div>
      </section>

      {/* Code Examples */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أمثلة عملية</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود ضعيف ❌</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`# PHP - رفع ملف ضعيف
<?php
$target = "uploads/" . basename($_FILES["file"]["name"]);
move_uploaded_file($_FILES["file"]["tmp_name"], $target);
echo "تم الرفع: " . $target;
?>`}</code></pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن ✅</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`# PHP - رفع ملف آمن
<?php
$allowed = ['jpg', 'jpeg', 'png', 'gif'];
$ext = strtolower(pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION));

if (!in_array($ext, $allowed)) {
    die("نوع الملف غير مسموح");
}

// فحص محتوى المfile
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $_FILES["file"]["tmp_name"]);
$allowedMime = ['image/jpeg', 'image/png', 'image/gif'];

if (!in_array($mime, $allowedMime)) {
    die("نوع المحتوى غير مسموح");
}

// توليد اسم عشوائي
$newName = uniqid() . '.' . $ext;
$target = "uploads/" . $newName;
move_uploaded_file($_FILES["file"]["tmp_name"], $target);
?>`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">كيف تحمي تطبيقاتك</h2>
        <ul>
          <li><strong>التحقق من الامتداد:</strong> استخدم قائمة بيضاء للامتدادات المسموحة</li>
          <li><strong>التحقق من MIME Type:</strong> افحص محتوى الملف فعلياً وليس فقط header</li>
          <li><strong>توليد اسم عشوائي:</strong> لا تحفظ الاسم الأصلي للملف</li>
          <li><strong>حفظ خارج Web Root:</strong> احفظ الملفات في مجلد غير قابل للتنفيذ</li>
          <li><strong>حد الحجم:</strong> حدد الحد الأقصى لحجم الملف</li>
          <li><strong>فحص الفيروسات:</strong> افحص جميع الملفات المرفوعة</li>
          <li><strong>تعطيل تنفيذ PHP:</strong> عطّل تنفيذ ملفات PHP في مجلد الرفع</li>
        </ul>
      </section>

      <LabsSection slug="file-upload" />
      <ToolsSection slug="file-upload" />

      <Quiz slug="file-upload" />
      <VideoSection slug="file-upload" />

      {/* Navigation */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أنواع أخرى من الثغرات</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/vulnerabilities/lfi"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">📁</span>
            <h4 className="font-bold text-gray-900 mb-1">LFI</h4>
            <p className="text-sm text-gray-600 mb-0">تضمين ملفات محلية</p>
          </Link>
          <Link
            href="/vulnerabilities/command-injection"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">⌨️</span>
            <h4 className="font-bold text-gray-900 mb-1">Command Injection</h4>
            <p className="text-sm text-gray-600 mb-0">حقن أوامر النظام</p>
          </Link>
          <Link
            href="/vulnerabilities/ssti"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">🎨</span>
            <h4 className="font-bold text-gray-900 mb-1">SSTI</h4>
            <p className="text-sm text-gray-600 mb-0">حقن قوالب الخادم</p>
          </Link>
        </div>
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            العودة للرئيسية
          </Link>
        </div>
      </section>
    </div>
  )
}
