import Link from 'next/link'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import Quiz from '@/components/Quiz'

export default function SqlInjectionPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">💉</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">حقن SQL</h1>
            <p className="text-xl text-gray-500 mt-1">SQL Injection</p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <span className="inline-block bg-danger-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
            خطيرة جداً
          </span>
          <p className="text-gray-700 mb-0">
            واحدة من أكثر الثغرات شيوعاً وخطورة في تاريخ أمن تطبيقات الويب، حسب تصنيف OWASP Top 10.
          </p>
        </div>
      </section>

      {/* Definition Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">تعريف حقن SQL</h2>
        <p>
          حقن SQL (SQL Injection) هو ثغرة أمنية تسمح للمهاجم بحقن أكواد SQL ضارة في استعلامات قاعدة البيانات عبر مدخلات المستخدم غير المُصحّحة. عندما تقوم تطبيقات الويب بدمج مدخلات المستخدم مباشرة في استعلامات SQL دون تحقق أو تنقية، يمكن للمهاجم التلاعب بالاستعلام ليتم تنفيذ أوامر غير مقصودة.
        </p>
        <p>
          هذه الثغرة قد تؤدي إلى نتائج كارثية مثل:
        </p>
        <ul>
          <li><strong>سرقة البيانات:</strong> الوصول إلى بيانات حساسة مثل كلمات المرور وبطاقات الائتمان</li>
          <li><strong>تعديل البيانات:</strong> تغيير أو حذف بيانات المستخدمين</li>
          <li><strong> Authenticate bypass:</strong> تجاوز مصادقة المستخدم والدخول للنظام</li>
          <li><strong>تشغيل أوامر نظام:</strong> في بعض الحالات، تنفيذ أوامر نظام على الخادم</li>
          <li><strong>تدمير قاعدة البيانات:</strong> حذف جداول أو تدمير قاعدة البيانات بالكامل</li>
        </ul>
      </section>

      {/* Types Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أنواع حقن SQL</h2>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">1. In-band SQL Injection (حقن SQL المباشر)</h3>
          <p>
            هذا هو النوع الأكثر شيوعاً والأكثر مباشرة، حيث يستخدم المهاجم نفس القناة (channel) لإطلاق الهجوم واستلام النتائج.
          </p>
          <h4 className="text-xl font-semibold text-gray-800">أ. Union-based Injection</h4>
          <p>
            يستخدم المهاجم كلمة <code>UNION SELECT</code> لدمج نتائج الاستعلام الأصلي مع نتائج ضارة للحصول على بيانات من جداول أخرى.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`-- مثال على هجوم Union-based
-- الاستعلام الأصلي:
SELECT name, price FROM products WHERE id = 1

-- الاستعلام المحقون:
SELECT name, price FROM products WHERE id = 1 UNION SELECT username, password FROM users--`}</code></pre>
          </div>

          <h4 className="text-xl font-semibold text-gray-800">ب. Error-based Injection</h4>
          <p>
            يستغل المهاجم رسائل الخطأ التي يعيدها الخادم لاكتشاف هيكل قاعدة البيانات واستخراج البيانات منها.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`-- مثال على هجوم Error-based
-- إذا أعاد الخادم رسالة خطأ مفصلة:
SELECT * FROM users WHERE id = 1 AND 1=CONVERT(int, (SELECT TOP 1 table_name FROM information_schema.tables))--`}</code></pre>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">2. Blind SQL Injection (حقن SQL الأعمى)</h3>
          <p>
            في هذا النوع، لا يحصل المهاجم على أي نتائج مباشرة من قاعدة البيانات، ولكنه يستنتج المعلومات من سلوك النظام (مدة الاستجابة أو رسائل الخطأ العامة).
          </p>
          <h4 className="text-xl font-semibold text-gray-800">أ. Boolean-based Blind</h4>
          <p>
            يسأل المهاجم أسئلة نعم/لا ويستنتج الإجابة من تغيّر استجابة النظام.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`-- مثال على Boolean-based Blind
-- إذا كان الحرف الأول من كلمة المرور = 'a':
SELECT * FROM users WHERE id = 1 AND SUBSTRING(password, 1, 1) = 'a'

-- إذا عاد النظام صفحة عادية = الإجابة نعم
-- إذا عاد النظام صفحة خطأ = الإجابة لا`}</code></pre>
          </div>

          <h4 className="text-xl font-semibold text-gray-800">ب. Time-based Blind</h4>
          <p>
            يستخدم المهاجم تأخير زمني لاستخراج البيانات.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`-- مثال على Time-based Blind
-- إذا كان الحرف الأول = 'a':
SELECT * FROM users WHERE id = 1 AND IF(SUBSTRING(password, 1, 1) = 'a', SLEEP(5), 0)

-- إذا تأخر الرد 5 ثوانٍ = الإجابة نعم
-- إذا لم يتأخر = الإجابة لا`}</code></pre>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">3. Out-of-band SQL Injection (حقن SQL خارج النطاق)</h3>
          <p>
            يستخدم هذا النوع قنوات خارجية لاستخراج البيانات، خاصة عندما يكون الخادم غير قادر على إرسال استجابة مباشرة للمهاجم.
          </p>
          <ul>
            <li><strong>DNS exfiltration:</strong> إرسال البيانات عبر طلبات DNS</li>
            <li><strong>HTTP exfiltration:</strong> إرسال البيانات عبر طلبات HTTP خارجية</li>
          </ul>
          <p>
            هذا النوع نادر الاستخدام ولكنه خطير جداً خاصة في بيئات قواعد البيانات مثل Microsoft SQL Server و Oracle.
          </p>
        </div>
      </section>

      {/* Code Examples Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أمثلة عملية على الأكواد</h2>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 1: صفحة تسجيل دخول</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Vulnerable Code */}
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">أكواد ضعيفة ❌</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// PHP - كود ضعيف
$username = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM users 
          WHERE username = '$username' 
          AND password = '$password'";

$result = mysqli_query($conn, $query);`}</code></pre>
            </div>
            <div className="bg-danger-50 border border-danger-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-danger-700 mb-0">
                <strong>المشكلة:</strong> يتم دمج مدخلات المستخدم مباشرة في الاستعلام بدون تنقية.
              </p>
            </div>
          </div>

          {/* Secure Code */}
          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن ✅</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// PHP - كود آمن باستخدام Prepared Statements
$username = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM users 
          WHERE username = ? 
          AND password = ?";

$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "ss", 
    $username, $password);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);`}</code></pre>
            </div>
            <div className="bg-success-50 border border-success-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-success-700 mb-0">
                <strong>الحل:</strong> استخدام Prepared Statements لفصل البيانات عن الاستعلام.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 2: صفحة بحث عن منتجات</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Vulnerable Code */}
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود ضعيف ❌</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// Node.js - كود ضعيف
const searchTerm = req.query.q;

const query = \`
  SELECT * FROM products 
  WHERE name LIKE '%\${searchTerm}%'
\`;

const results = await db.query(query);`}</code></pre>
            </div>
          </div>

          {/* Secure Code */}
          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن ✅</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// Node.js - كود آمن
const searchTerm = req.query.q;

const query = \`
  SELECT * FROM products 
  WHERE name LIKE ?
\`;

const results = await db.query(
  query, [\`%\${searchTerm}%\`]
);`}</code></pre>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 3: تطبيق Python مع SQLAlchemy</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود ضعيف ❌</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`# Python - كود ضعيف
user_id = request.args.get('id')

query = f"SELECT * FROM users WHERE id = {user_id}"
cursor.execute(query)`}</code></pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن ✅</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`# Python - كود آمن
user_id = request.args.get('id')

query = "SELECT * FROM users WHERE id = %s"
cursor.execute(query, (user_id,))`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* Detection Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">كيف تكتشف ثغرة SQL Injection</h2>

        <h3 className="text-2xl font-semibold text-gray-800">علامات وجود الثغرة</h3>
        <ul>
          <li>رسائل خطأ SQL واضحة عند إدخال بيانات غير متوقعة</li>
          <li>تغير سلوك التطبيق عند تغيير المدخلات</li>
          <li>تأخر غير عادي في استجابة الخادم</li>
          <li>ظهور بيانات حساسة في رسائل الخطأ</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800">أدوات الاكتشاف</h3>
        <ul>
          <li><strong>SQLMap:</strong> أداة آلية لاكتشاف واستغلال ثغرات SQL Injection</li>
          <li><strong>Burp Suite:</strong> منصة شاملة لاختبار أمن التطبيقات</li>
          <li><strong>OWASP ZAP:</strong> أداة مجانية لفحص ثغرات المواقع</li>
          <li><strong>Manual Testing:</strong> اختبار يدوي باستخدام حركات خاصة مثل <code>&apos; OR 1=1 --</code></li>
        </ul>

        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# مثال على اختبار SQL Injection باستخدام SQLMap
sqlmap -u "http://example.com/page?id=1" --dbs
sqlmap -u "http://example.com/page?id=1" -D mydb --tables
sqlmap -u "http://example.com/page?id=1" -D mydb -T users --dump`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">حركات اختبار شائعة</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <ul className="mb-0">
            <li><code>&apos;</code> - علامة اقتباس لاختبار وجود خطأ</li>
            <li><code>OR 1=1</code> - شرط دائماً صحيح</li>
            <li><code>OR 1=2</code> - شرط دائماً خاطئ</li>
            <li><code>--</code> - تعليق لاختبار تعليق باقي الاستعلام</li>
            <li><code>UNION SELECT NULL--</code> - لاختبار إمكانية الدمج</li>
          </ul>
        </div>
      </section>

      {/* Prevention Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">كيف تمنع ثغرة SQL Injection</h2>

        <h3 className="text-2xl font-semibold text-gray-800">1. استخدام Prepared Statements (البيانات المحضّرة)</h3>
        <p>
          هذه هي الطريقة الأكثر فعالية ومناسبة. يتم فصل الاستعلام SQL عن البيانات المُدخلة.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`// مثال في JavaScript مع MySQL2
const [rows] = await connection.execute(
  'SELECT * FROM users WHERE email = ? AND status = ?',
  [email, status]
);

// مثال في Python مع psycopg2
cursor.execute(
  "SELECT * FROM users WHERE email = %s AND status = %s",
  (email, status)
);

// مثال في Java مع PreparedStatement
PreparedStatement stmt = conn.prepareStatement(
  "SELECT * FROM users WHERE email = ? AND status = ?"
);
stmt.setString(1, email);
stmt.setString(2, status);
ResultSet rs = stmt.executeQuery();`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">2. استخدام ORM (كائنات علاقات قاعدة البيانات)</h3>
        <p>
          تستخدم مكتبات مثل SQLAlchemy و Sequelize و Prisma Prepared Statements تلقائياً.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`// مثال مع Prisma (TypeScript)
const user = await prisma.user.findFirst({
  where: {
    email: userEmail,
    status: 'active'
  }
});

// مثال مع SQLAlchemy (Python)
user = session.query(User).filter(
    User.email == email,
    User.status == 'active'
).first()`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">3. تنقية المدخلات (Input Validation)</h3>
        <ul>
          <li>التحقق من نوع البيانات (رقم، نص، إلخ)</li>
          <li>تحديد طول المدخلات</li>
          <li>السماح فقط بالأنماط المقبولة (whitelist validation)</li>
          <li>حذف الأحرف الخطرة مثل <code>&apos;</code> و <code>&quot;</code> و <code>;</code></li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800">4. تطبيق مبدأ الصلاحية الأدنى (Least Privilege)</h3>
        <ul>
          <li>لا تستخدم حساب root أو admin في الاتصال بقاعدة البيانات</li>
          <li>أنشئ حساب خاص بالتطبيق بصلاحيات محدودة</li>
          <li>امنع صلاحيات <code>DROP</code> و <code>DELETE</code> غير الضرورية</li>
          <li>استخدم منفصل للقراءة والكتابة إذا أمكن</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800">5. التعامل مع رسائل الخطأ</h3>
        <ul>
          <li>لا تُظهر رسائل خطأ SQL مفصلة للمستخدمين</li>
          <li>استخدم رسائل خطأ عامة مثل "حدث خطأ"</li>
          <li>سجّل الأخطاء التفصيلية في ملفات السجل الخاصة بالخادم</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800">6. المكتبات والمحللات (Escaping)</h3>
        <p>
          إذا كنت تستخدم SQL ديناميكياً، استخدم وظائف التنقية المخصصة:
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`// PHP
$safe = mysqli_real_escape_string($conn, $input);

// Python
from MySQLdb import escape_string
safe = escape_string(input)

// JavaScript (MySQL2)
const safe = mysql.escape(input);`}</code></pre>
        </div>
      </section>

      {/* Security Tips Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">نصائح أمنية مهمة</h2>

        <div className="bg-success-50 border border-success-200 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <h4 className="font-bold text-success-800 mb-2">القاعدة الذهبية</h4>
              <p className="mb-0 text-success-700">
                لا تثق أبداً في مدخلات المستخدم. جميع المدخلات يجب أن تُعتبر ضارة حتىثبت العكس.
              </p>
            </div>
          </div>
        </div>

        <ul>
          <li><strong>استخدم Prepared Statements دائماً:</strong> هذه هي الخط الدفاع الأولى والأقوى</li>
          <li><strong>حدّث المكتبات بانتظام:</strong> تأكد من تحديث مكتبات ORM و database drivers</li>
          <li><strong>استخدم Web Application Firewall:</strong> يمكن أن يساعد في كشف ومنع بعض الهجمات</li>
          <li><strong>أجرِ اختبارات اختراق دورية:</strong> افحص تطبيقك بانتظام باستخدام أدوات مثل SQLMap</li>
          <li><strong>راجع الكود بشكل أمني:</strong> راجع جميع الأكواد التي تتفاعل مع قاعدة البيانات</li>
          <li><strong>سجّل جميع الاستعلامات:</strong> راقب الاستعلامات غير الطبيعية في ملفات السجل</li>
          <li><strong>استخدم Rate Limiting:</strong> حدد عدد الطلبات للحد من محاولات الاختراق</li>
          <li><strong>فعّل HTTPS:</strong> تشفير الاتصال يمنع التنصت على حركة المرور</li>
        </ul>
      </section>

      {/* Common Mistakes Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">الأخطاء الشائعة التي يجب تجنبها</h2>

        <div className="space-y-4">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ دمج المدخلات في الاستعلام</h4>
            <p className="text-danger-700 mb-0">
              استخدام <code>string concatenation</code> أو <code>template literals</code> لدمج المدخلات مباشرة في الاستعلام.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ استخدام مكتبات SQL القديمة</h4>
            <p className="text-danger-700 mb-0">
              استخدام مكتبات قديمة مثل <code>mysql</code> في PHP بدلاً من <code>mysqli</code> أو <code>PDO</code>.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ عرض رسائل الخطأ التفصيلية</h4>
            <p className="text-danger-700 mb-0">
              إظهار رسائل خطأ SQL للمستخدمين تساعد المهاجمين في فهم هيكل قاعدة البيانات.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ استخدام صلاحيات عالية لقاعدة البيانات</h4>
            <p className="text-danger-700 mb-0">
              استخدام حساب root أو admin يمكن أن يُعطي المهاجم صلاحيات تدميرية.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ الاعتماد فقط على Client-side Validation</h4>
            <p className="text-danger-700 mb-0">
              التحقق من صحة المدخلات في الجهة العميلة فقط يمكن تجاوزه بسهولة. التحقق من الخادم مطلوب دائماً.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ عدم استخدام Parameterized Queries مع Dynamic SQL</h4>
            <p className="text-danger-700 mb-0">
              حتى مع استخدام Parameterized Queries، يجب توخي الحذر عند بناء SQL ديناميكياً.
            </p>
          </div>
        </div>
      </section>

      {/* Severity Impact */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">تأثير الثغرة ومدى خطورتها</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🔴</div>
            <h4 className="font-bold text-danger-800 mb-2">التأثير على السرية</h4>
            <p className="text-danger-700 mb-0">مرتفع جداً - سرقة جميع البيانات</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🔴</div>
            <h4 className="font-bold text-danger-800 mb-2">التأثير على النزاهة</h4>
            <p className="text-danger-700 mb-0">مرتفع جداً - تعديل البيانات</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🔴</div>
            <h4 className="font-bold text-danger-800 mb-2">التأثير على التوفر</h4>
            <p className="text-danger-700 mb-0">مرتفع - تعطيل النظام</p>
          </div>
        </div>

        <blockquote className="border-r-4 border-danger-500 pr-4 italic text-gray-600 my-6">
          وفقاً لتقارير OWASP، لا تزال SQL Injection ضمن أهم 10 ثغرات أمنية في تطبيقات الويب. في عام 2023، أثرت على أكثر من 200,000 موقع ويب.
        </blockquote>
      </section>

      <section className="mb-12">
        <ToolsSection slug="sql-injection" />
      </section>

      <section className="mb-12">
        <VideoSection slug="sql-injection" />
      </section>

      <section className="mb-12">
        <Quiz slug="sql-injection" />
      </section>

      {/* Navigation Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أنواع أخرى من الثغرات</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/vulnerabilities/xss"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">📜</span>
            <h4 className="font-bold text-gray-900 mb-1">XSS</h4>
            <p className="text-sm text-gray-600 mb-0">برمجة النصوص بين المواقع</p>
          </Link>
          <Link
            href="/vulnerabilities/csrf"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">🎣</span>
            <h4 className="font-bold text-gray-900 mb-1">CSRF</h4>
            <p className="text-sm text-gray-600 mb-0">تزوير الطلبات بين المواقع</p>
          </Link>
          <Link
            href="/vulnerabilities/ssrf"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">🖥️</span>
            <h4 className="font-bold text-gray-900 mb-1">SSRF</h4>
            <p className="text-sm text-gray-600 mb-0">تزوير الطلبات من جانب الخادم</p>
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