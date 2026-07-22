import Link from 'next/link'
import VideoSection from '@/components/VideoSection'

export default function MassAssignmentPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">الرئيسية</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Mass Assignment</span>
      </nav>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x1F4DD;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">التكليف الجماعي</h1>
            <p className="text-xl text-gray-500 mt-1">Mass Assignment</p>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-700 font-semibold mb-0">&#x26A0; مستوى الخطورة: متوسطة إلى عالية</p>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">تعريف Mass Assignment</h2>
        <p>
          التكليف الجماعي (Mass Assignment) هو ثغرة تسمح للمهاجم بتعديل حقول غير مصرح بها
          في نموذج عن طريق إضافة معاملات إضافية في الطلب.
        </p>
        <p>
          على سبيل المثال، إذا كان نموذج التسجيل يحتوي على حقل &quot;اسم المستخدم&quot; و &quot;كلمة المرور&quot;،
          يمكن للمهاجم إضافة حقل &quot;role&quot; لجعل نفسه مديراً.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة على الكود</h2>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-red-700 mb-3">&#x274C; كود مصاب</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
{`// Laravel - كود مصاب
Route::post('/register', function (Request $request) {
  // الحقول المسموح بها غير محددة
  $user = User::create($request->all());
  return response()->json($user);
});

// المهاجم يرسل:
// POST /register
// name=ahmed&password=123&role=admin&is_verified=1`}
          </pre>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-green-700 mb-3">&#x2705; كود محصن</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
{`// Laravel - كود محصن
Route::post('/register', function (Request $request) {
  // تحديد الحقول المسموح بها فقط
  $validated = $request->validate([
    'name' => 'required|string|max:255',
    'email' => 'required|email|unique:users',
    'password' => 'required|min:8|confirmed',
  ]);
  
  $user = User::create($validated);
  return response()->json($user);
});

// Rails - كود محصن
user_params = params.require(:user).permit(:name, :email, :password)
@user = User.create(user_params)`}
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">طرق الحماية</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">1. تحديد الحقول المسموح بها</h4>
            <p className="text-gray-600 mb-0">استخدم whitelist للحقول المسموح بتعديلها</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">2. التحقق من المدخلات</h4>
            <p className="text-gray-600 mb-0">تحقق من صحة كل حقل قبل الحفظ</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">3. استخدام DTOs</h4>
            <p className="text-gray-600 mb-0">استخدم كائنات نقل البيانات بدلاً من النماذج المباشرة</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <VideoSection slug="mass-assignment" />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الثغرات الأخرى</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vulnerabilities/idor" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F510;</span>
            <h4 className="font-bold mt-2">IDOR</h4>
          </Link>
          <Link href="/vulnerabilities/broken-access-control" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F6AB;</span>
            <h4 className="font-bold mt-2">خطأ في التحكم بالوصول</h4>
          </Link>
          <Link href="/vulnerabilities/sql-injection" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F489;</span>
            <h4 className="font-bold mt-2">حقن SQL</h4>
          </Link>
        </div>
      </section>
    </div>
  )
}
