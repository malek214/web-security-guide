import Link from 'next/link'
import VideoSection from '@/components/VideoSection'

export default function LdapInjectionPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">📁</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">حقن LDAP</h1>
            <p className="text-xl text-gray-500 mt-1">LDAP Injection</p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <span className="inline-block bg-danger-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
            خطيرة
          </span>
          <p className="text-gray-700 mb-0">
            ثغرة أمنية تسمح للمهاجم بالتلاعب بפרופائلات الدirectory Services عبر حقن عبارات LDAP ضارة، مما قد يؤدي إلى تسجيل دخول غير مصرح به أو سرقة بيانات حساسة.
          </p>
        </div>
      </section>

      {/* Definition Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">تعريف حقن LDAP</h2>
        <p>
          حقن LDAP (LDAP Injection) هو ثغرة أمنية تسمح للمهاجم بحقن عبارات LDAP ضارة في استعلامات director services عبر مدخلات المستخدم غير المُصحّحة. يحدث هذا عندما تقوم تطبيقات الويب بدمج مدخلات المستخدم مباشرة في استعلامات LDAP دون تحقق أو تنقية كافية.
        </p>
        <p>
          <strong>Lightweight Directory Access Protocol (LDAP)</strong> هو بروتوكول قياسي لالاتصال و Query دوائر المعلومات في director services مثل Microsoft Active Directory و OpenLDAP. يُستخدم بشكل واسع لتخزين معلومات المستخدمين والأجهزة والموارد في المؤسسات.
        </p>
        <p>
          تتم عمليات LDAP الأساسية على شكل filtres (مرشحات) مكتوبة بنحو خاص، مثال:
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# فلتر LDAP شائع للمصادقة:
(&(uid={username})(userPassword={password}))

# مثال على فلتر البحث:
(cn=*)          # جميع الأسماء
(&(department=IT)(status=active))  # موظفو IT النشطون
(|(cn=admin)(cn=manager))         # المدير أو المشرف`}</code></pre>
        </div>
        <p>
          هذه الثغرة قد تؤدي إلى نتائج خطيرة مثل:
        </p>
        <ul>
          <li><strong>تسجيل دخول غير مصرح به (Authentication Bypass):</strong> تجاوز نظام المصادقة والدخول للحسابات</li>
          <li><strong>سرقة البيانات:</strong> الوصول إلى معلومات المستخدمين الحساسة في الـ directory</li>
          <li><strong>تعديل البيانات:</strong> تغيير صلاحيات المستخدمين أو خصائص الحسابات</li>
          <li><strong>ال escalated privileges:</strong> الحصول على صلاحيات أعلى</li>
          <li><strong>جمع معلومات:</strong> استخراج معلومات عن البنية التحتية للمؤسسة</li>
        </ul>
      </section>

      {/* Types Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">كيف يعمل حقن LDAP</h2>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">1. Authentication Bypass (تجاوز المصادقة)</h3>
          <p>
            هذا هو النوع الأكثر شيوعاً. يستخدم المهاجم حركات خاصة في حقل اسم المستخدم أو كلمة المرور لتجاوز التحقق.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# الاستعلام الأصلي:
(&(uid=admin)(userPassword=secret123))

# ما يدخله المهاجم في حقل المستخدم:
uid: *)(uid=*))(|(uid=*

# الاستعلام الناتج (خاطئ):
(&(uid=*)(uid=*))(|(uid=*)(userPassword=secret123))

# النتيجة: يتم تجاهل شرط كلمة المرور بالكامل!`}</code></pre>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">2. Information Disclosure (كشف المعلومات)</h3>
          <p>
            يمكن للمهاجم حقن فلترات LDAP لاكتشاف معلومات حساسة عن الـ directory والمستخدمين.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# البحث عن جميع المستخدمين:
*)(&)  

# البحث عن المستخدمين النشطين:
*)(&(status=active))

# البحث عن المشرفين:
*)(&(role=admin))

# استخراج جميع الحقول:
*)(objectClass=*)`}</code></pre>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">3. Blind LDAP Injection (حقن LDAP الأعمى)</h3>
          <p>
            في هذا النوع، لا تحصل على استجابة مباشرة من LDAP. يستخدم المهاجم تقنيات Time-based أو Boolean-based لاكتشاف الثغرة واستخراج البيانات.
          </p>
          <ul>
            <li><strong>Boolean-based:</strong> السؤال عن شروط نعم/لا واستنتاج الإجابة من تغيّر سلوك التطبيق</li>
            <li><strong>Time-based:</strong> استخدام فلترات تسبب تأخراً زمنياً لقياس وقت الاستجابة</li>
          </ul>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# Boolean-based Blind LDAP Injection
# إذا كان اسم المستخدم يبدأ بحرف 'a':
*)(uid=admin*)(|(uid=a*))

# إذا كان هناك استجابة مختلفة = الحرف صحيح
# إذا لم تكن هناك فرق = الحرف خاطئ

# Time-based Blind LDAP Injection
*)(|(cn=*)({sleep 5}))

# إذا تأخر الرد 5 ثوانٍ = الثغرة موجودة`}</code></pre>
          </div>
        </div>
      </section>

      {/* Code Examples Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أمثلة عملية على الأكواد</h2>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 1: صفحة تسجيل دخول مع Active Directory</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Vulnerable Code */}
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">أكواد ضعيفة ❌</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// PHP - كود ضعيف مع LDAP
$username = $_POST['username'];
$password = $_POST['password'];

$ldap_conn = ldap_connect("ldap://dc.example.com");

$filter = "(&(uid=$username)(userPassword=$password))";

$result = ldap_search($ldap_conn, 
    "dc=example,dc=com", $filter);`}</code></pre>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-3">
              <pre><code className="font-mono text-sm">{`# Python - كود ضعيف
import ldap

username = request.form['username']
password = request.form['password']

conn = ldap.initialize('ldap://dc.example.com')

filter_str = f"(&(uid={username})(userPassword={password}))"

result = conn.search_s(
    "dc=example,dc=com",
    ldap.SCOPE_SUBTREE,
    filter_str
)`}</code></pre>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-3">
              <pre><code className="font-mono text-sm">{`// Node.js - كود ضعيف
const ldap = require('ldapjs');

const username = req.body.username;
const password = req.body.password;

const client = ldap.createClient({
  url: 'ldap://dc.example.com'
});

const filter = \`(&(uid=\${username})(userPassword=\${password}))\`;

client.search('dc=example,dc=com', {
  filter: filter,
  scope: 'sub'
});`}</code></pre>
            </div>
            <div className="bg-danger-50 border border-danger-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-danger-700 mb-0">
                <strong>المشكلة:</strong> يتم دمج مدخلات المستخدم مباشرة في فلتر LDAP بدون تنقية أو تثبيت.
              </p>
            </div>
          </div>

          {/* Secure Code */}
          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن ✅</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// PHP - كود آمن
$username = $_POST['username'];
$password = $_POST['password'];

// تنقية مدخلات LDAP
$safe_username = ldap_escape(
    $username, null, LDAP_ESCAPE_FILTER
);
$safe_password = ldap_escape(
    $password, null, LDAP_ESCAPE_FILTER
);

$ldap_conn = ldap_connect("ldap://dc.example.com");

$filter = "(&(uid=$safe_username)(userPassword=$safe_password))";

$result = ldap_search($ldap_conn, 
    "dc=example,dc=com", $filter);`}</code></pre>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-3">
              <pre><code className="font-mono text-sm">{`# Python - كود آمن
import ldap

username = request.form['username']
password = request.form['password']

# تنقية مدخلات LDAP
safe_username = ldap.filter.escape_filter_chars(username)
safe_password = ldap.filter.escape_filter_chars(password)

conn = ldap.initialize('ldap://dc.example.com')

filter_str = f"(&(uid={safe_username})(userPassword={safe_password}))"

result = conn.search_s(
    "dc=example,dc=com",
    ldap.SCOPE_SUBTREE,
    filter_str
)`}</code></pre>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-3">
              <pre><code className="font-mono text-sm">{`// Node.js - كود آمن
const ldap = require('ldapjs');

const username = req.body.username;
const password = req.body.password;

// تنقية مدخلات LDAP
const safeUsername = ldap.parseFilter(username)
    .toString();
const safePassword = ldap.parseFilter(password)
    .toString();

const client = ldap.createClient({
  url: 'ldap://dc.example.com'
});

const filter = \`(&(uid=\${safeUsername})(userPassword=\${safePassword}))\`;`}</code></pre>
            </div>
            <div className="bg-success-50 border border-success-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-success-700 mb-0">
                <strong>الحل:</strong> استخدام دوال escape المخصصة لـ LDAP لحماية الفلترات من الحقن.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 2: صفحة بحث في الدirectory</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Vulnerable Code */}
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود ضعيف ❌</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// PHP - كود ضعيف
$search_term = $_GET['q'];

$filter = "(cn=*$search_term*)";

$result = ldap_search($conn, 
    "ou=users,dc=example,dc=com", $filter);
$entries = ldap_get_entries($conn, $result);`}</code></pre>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-3">
              <pre><code className="font-mono text-sm">{`# Python - كود ضعيف
search_term = request.args.get('q')

filter_str = f"(cn=*{search_term}*)"

result = conn.search_s(
    "ou=users,dc=example,dc=com",
    ldap.SCOPE_SUBTREE,
    filter_str
)`}</code></pre>
            </div>
          </div>

          {/* Secure Code */}
          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن ✅</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// PHP - كود آمن
$search_term = $_GET['q'];

// تنقية مدخلات البحث
$safe_search = ldap_escape(
    $search_term, null, LDAP_ESCAPE_FILTER
);

// استخدام Parameterized filter
$filter = "(cn=*$safe_search*)";

$result = ldap_search($conn, 
    "ou=users,dc=example,dc=com", $filter);
$entries = ldap_get_entries($conn, $result);`}</code></pre>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-3">
              <pre><code className="font-mono text-sm">{`# Python - كود آمن
import ldap

search_term = request.args.get('q')

# تنقية مدخلات البحث
safe_search = ldap.filter.escape_filter_chars(
    search_term
)

filter_str = f"(cn=*{safe_search}*)"

result = conn.search_s(
    "ou=users,dc=example,dc=com",
    ldap.SCOPE_SUBTREE,
    filter_str
)`}</code></pre>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 3: تطبيق Java مع JNDI</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود ضعيف ❌</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// Java - كود ضعيف مع JNDI
String username = request.getParameter("username");
String password = request.getParameter("password");

String filter = "(&(uid=" + username + 
    ")(userPassword=" + password + "))";

DirContext ctx = new InitialDirContext(env);
NamingEnumeration<SearchResult> results = 
    ctx.search("dc=example,dc=com", filter, 
        new SearchControls());`}</code></pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن ✅</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// Java - كود آمن
String username = request.getParameter("username");
String password = request.getParameter("password");

// تنقية مدخلات LDAP
String safeUsername = filterEncode(username);
String safePassword = filterEncode(password);

String filter = "(&(uid=" + safeUsername + 
    ")(userPassword=" + safePassword + "))";

// استخدام Parameterized Search
DirContext ctx = new InitialDirContext(env);
Object[] filterArgs = {safeUsername, safePassword};
String paramFilter = 
    "(&(uid={0})(userPassword={1}))";

NamingEnumeration<SearchResult> results = 
    ctx.search("dc=example,dc=com", paramFilter, 
        filterArgs, new SearchControls());

// دالة التنقية
private String filterEncode(String input) {
    return input
        .replace("\\", "\\\\5c")
        .replace("*", "\\2a")
        .replace("(", "\\28")
        .replace(")", "\\29")
        .replace("\\0", "\\5c0");
}`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* Detection Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">كيف تكتشف ثغرة LDAP Injection</h2>

        <h3 className="text-2xl font-semibold text-gray-800">علامات وجود الثغرة</h3>
        <ul>
          <li>رسائل خطأ LDAP واضحة عند إدخال بيانات غير متوقعة</li>
          <li>تغير سلوك التطبيق عند تغيير المدخلات (مثل نجاح تسجيل الدخول بكلمة مرور خاطئة)</li>
          <li>ظهور معلومات غير متوقعة عن المستخدمين أو الـ directory</li>
          <li>تأخر غير عادي في استجابة الخادم عند إدخال أحرف خاصة</li>
          <li>التمكن من تسجيل الدخول بدون كلمة مرور صحيحة</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800">حركات اختبار شائعة</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <ul className="mb-0">
            <li><code>*</code> - نجمة للبحث عن جميع العناصر</li>
            <li><code>)(</code> - إغلاق وفتح أقواس لتغيير بنية الفلتر</li>
            <li><code>)(uid=*</code> - حقن شرط إضافي</li>
            <li><code>*)(&</code> - إنهاء الفلتر وبدء فلتر جديد</li>
            <li><code>admin*)(&</code> - البحث عن المستخدم admin مع شرط إضافي</li>
            <li><code>*)|(uid=*</code> - تجاوز جميع الشروط</li>
            <li><code>*)|(1=1</code> - شرط دائماً صحيح</li>
          </ul>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">أدوات الاكتشاف</h3>
        <ul>
          <li><strong>LDAP Injection Testing Tools:</strong> أدوات متخصصة في اختبار ثغرات LDAP</li>
          <li><strong>Burp Suite:</strong> منصة شاملة لاختبار أمن التطبيقات مع extensions خاصة بـ LDAP</li>
          <li><strong>OWASP ZAP:</strong> أداة مجانية لفحص ثغرات المواقع</li>
          <li><strong>ldapsearch:</strong> أداة سطر أوامر للاتصال وفحص خوادم LDAP</li>
          <li><strong>Manual Testing:</strong> اختبار يدوي باستخدام حركات خاصة</li>
        </ul>

        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# اختبار LDAP Injection باستخدام ldapsearch
ldapsearch -x -H ldap://target.com \
  -b "dc=example,dc=com" \
  "(&(uid=*)(uid=*))"
  
# اختبار Authentication Bypass
ldapsearch -x -H ldap://target.com \
  -b "dc=example,dc=com" \
  -D "uid=admin)(*)" \
  -W "objectClass=*"

# اختبار عبر curl
curl "http://example.com/login" \\
  -d "username=admin*)(&)&password=test"`}</code></pre>
        </div>
      </section>

      {/* Prevention Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">كيف تمنع ثغرة LDAP Injection</h2>

        <h3 className="text-2xl font-semibold text-gray-800">1. تنقية مدخلات LDAP (LDAP Escape)</h3>
        <p>
          هذه هي الخط الدفاع الأولى والأهم. استخدم دوال escape المخصصة لكل لغة لتنقية جميع المدخلات قبل استخدامها في فلترات LDAP.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`// PHP - استخدام ldap_escape()
$safe_input = ldap_escape($input, null, LDAP_ESCAPE_FILTER);

// Python - استخدام ldap.filter
import ldap.filter
safe_input = ldap.filter.escape_filter_chars(input)

// Java - دالة يدوية
public String escapeLdap(String input) {
    return input
        .replace("\\", "\\\\5c")
        .replace("*", "\\2a")
        .replace("(", "\\28")
        .replace(")", "\\29")
        .replace("\\0", "\\5c0")
        .replace("/", "\\2f");
}

// Node.js - استخدام ldapjs
const safeInput = ldap.parseFilter(input).toString();`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">2. استخدام Parameterized Queries (الاستعلامات المعاملة)</h3>
        <p>
          بعض مكتبات LDAP تدعم الاستعلامات المعاملة التي تفصل البيانات عن الفلتر.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`// Java - استخدام Parameterized Search
Object[] filterArgs = {username, password};
String filter = "(&(uid={0})(userPassword={1}))";

ctx.search(baseDN, filter, filterArgs, controls);

// Python - استخدام python-ldap مع filter args
filter_str = "(&(uid=%s)(userPassword=%s))"
result = conn.search_s(
    base_dn,
    ldap.SCOPE_SUBTREE,
    filter_str % (escape(username), escape(password))
)`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">3. Input Validation (التحقق من صحة المدخلات)</h3>
        <ul>
          <li>التحقق من نوع البيانات (أرقام، نصوص، إلخ)</li>
          <li>تحديد طول المدخلات</li>
          <li>السماح فقط بالأنماط المقبولة (whitelist validation)</li>
          <li>رفض أي أحرف خاصة مثل <code>*</code> و <code>(</code> و <code>)</code> و <code>\</code></li>
        </ul>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`// PHP - التحقق من صحة اسم المستخدم
function validateUsername($username) {
    // السماح فقط بأحرف وأرقام وشرطة سفلية
    return preg_match('/^[a-zA-Z0-9_]{1,50}$/', 
        $username);
}

if (!validateUsername($_POST['username'])) {
    die('اسم المستخدم غير صالح');
}

// Python - التحقق من صحة المدخلات
import re

def validate_username(username):
    pattern = r'^[a-zA-Z0-9_]{1,50}$'
    return bool(re.match(pattern, username))`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">4. استخدام Bind Variables (المتغيرات المرتبطة)</h3>
        <p>
          عند استخدام Active Directory أو LDAP servers متقدمة، استخدم bind variables لفصل البيانات عن الاستعلام.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`// C# - استخدام System.DirectoryServices
using (var entry = new DirectoryEntry(
    "LDAP://dc.example.com"))
using (var searcher = new DirectorySearcher(entry)) 
{
    searcher.Filter = 
        "(&(uid={0})(userPassword={1}))";
    searcher.Parameters.Add(username);
    searcher.Parameters.Add(password);
    
    var result = searcher.FindOne();
}`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">5. تطبيق مبدأ الصلاحية الأدنى (Least Privilege)</h3>
        <ul>
          <li>لا تستخدم حساب admin للاتصال بالـ LDAP</li>
          <li>أنشئ حساب خاص بالتطبيق بصلاحيات محدودة</li>
          <li>استخدم Service Accounts بصلاحيات محددة فقط</li>
          <li>فصل حسابات القراءة والكتابة إذا أمكن</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800">6. التعامل مع رسائل الخطأ</h3>
        <ul>
          <li>لا تُظهر رسائل خطأ LDAP مفصلة للمستخدمين</li>
          <li>استخدم رسائل خطأ عامة مثل &quot;حدث خطأ&quot; أو &quot;بيانات الدخول غير صحيحة&quot;</li>
          <li>سجّل الأخطاء التفصيلية في ملفات السجل الخاصة بالخادم</li>
          <li>لا تكشف معلومات عن هيكل الـ directory أو أسماء المستخدمين</li>
        </ul>
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
                لا تثق أبداً في مدخلات المستخدم. جميع المدخلات يجب أن تُعتبر ضارة حتىثبت العكس. استخدم escape دائماً قبل إدراج أي مدخلات في فلترات LDAP.
              </p>
            </div>
          </div>
        </div>

        <ul>
          <li><strong>استخدم دوال escape دائماً:</strong> لا تتوقف عن استخدام ldap_escape أو ما يعادلها</li>
          <li><strong>استخدم Parameterized Queries:</strong> عند توفرها، فصل البيانات عن الفلتر</li>
          <li><strong>طبّق Whitelist Validation:</strong> ارفض أي مدخل لا يطابق النمط المتوقع</li>
          <li><strong>استخدم LDAPS:</strong> تشفير الاتصال يمنع التنصت على حركة المرور</li>
          <li><strong>راقب سجلات LDAP:</strong> تتبع الاستعلامات غير الطبيعية والمحاولات الفاشلة</li>
          <li><strong>استخدم Rate Limiting:</strong> حدد عدد محاولات تسجيل الدخول</li>
          <li><strong>فعّل Account Lockout:</strong> قفل الحساب بعد عدد محدد من المحاولات الفاشلة</li>
          <li><strong>راجع الكود بشكل دوري:</strong> افحص جميع الأكواد التي تتفاعل مع LDAP</li>
          <li><strong>استخدم Service Accounts محدودة:</strong> لا تستخدم حسابات Administrators</li>
        </ul>
      </section>

      {/* Common Mistakes Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">الأخطاء الشائعة التي يجب تجنبها</h2>

        <div className="space-y-4">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ دمج المدخلات في الفلتر مباشرة</h4>
            <p className="text-danger-700 mb-0">
              استخدام <code>string concatenation</code> أو <code>template literals</code> لدمج المدخلات مباشرة في فلتر LDAP.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ عدم استخدام دوال escape</h4>
            <p className="text-danger-700 mb-0">
              الاعتماد على &quot;تنقية يدوية&quot; أو تجاهل التنقية بالكامل. دوال ldap_escape مصممة خصيصاً لهذا الغرض.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ عرض رسائل الخطأ التفصيلية</h4>
            <p className="text-danger-700 mb-0">
              إظهار رسائل خطأ LDAP للمستخدمين تساعد المهاجمين في فهم هيكل الـ directory وبناء هجمات أدق.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ استخدام صلاحيات عالية للاتصال بالـ LDAP</h4>
            <p className="text-danger-700 mb-0">
              استخدام حساب Domain Admin أو Service Account بصلاحيات واسعة يمكن أن يُعطي المهاجم صلاحيات تدميرية.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ الاعتماد فقط على Client-side Validation</h4>
            <p className="text-danger-700 mb-0">
              التحقق من صحة المدخلات في الجهة العميلة فقط يمكن تجاوزه بسهولة عبر أدوات مثل Burp Suite. التحقق من الخادم مطلوب دائماً.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ استخدام LDAP بدون تشفير (LDAP بدل LDAPS)</h4>
            <p className="text-danger-700 mb-0">
              استخدام LDAP بدون تشفير يسمح للمهاجمين بالتنصت على حركة المرور وسرقة بيانات الدخول.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ عدم تسجيل محاولات الاختراق</h4>
            <p className="text-danger-700 mb-0">
              عدم رصد أو تسجيل محاولات LDAP Injection يمنعك من اكتشاف الهجمات والتعامل معها في الوقت المناسب.
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
            <p className="text-danger-700 mb-0">مرتفع - سرقة بيانات المستخدمين الحساسة</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🔴</div>
            <h4 className="font-bold text-danger-800 mb-2">التأثير على النزاهة</h4>
            <p className="text-danger-700 mb-0">مرتفع - تعديل الصلاحيات والحسابات</p>
          </div>
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🟡</div>
            <h4 className="font-bold text-warning-800 mb-2">التأثير على التوفر</h4>
            <p className="text-warning-700 mb-0">متوسط - تعطيل خدمة الدirectory</p>
          </div>
        </div>

        <blockquote className="border-r-4 border-danger-500 pr-4 italic text-gray-600 my-6">
          تُعتبر ثغرات LDAP Injection خطيرة خاصة في بيئات المؤسسات التي تعتمد بشكل كبير على Active Directory لإدارة المستخدمين والصلاحيات. يمكن أن يؤدي استغلالها إلى سيطرة كاملة على الـ domain.
        </blockquote>
      </section>

      <VideoSection slug="ldap-injection" />

      {/* Navigation Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أنواع أخرى من الثغرات</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/vulnerabilities/sql-injection"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">💉</span>
            <h4 className="font-bold text-gray-900 mb-1">حقن SQL</h4>
            <p className="text-sm text-gray-600 mb-0">حقن أكواد SQL الضارة</p>
          </Link>
          <Link
            href="/vulnerabilities/nosql-injection"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">🗄️</span>
            <h4 className="font-bold text-gray-900 mb-1">حقن NoSQL</h4>
            <p className="text-sm text-gray-600 mb-0">حقن قواعد البيانات غير العلائقية</p>
          </Link>
          <Link
            href="/vulnerabilities/xss"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">📜</span>
            <h4 className="font-bold text-gray-900 mb-1">XSS</h4>
            <p className="text-sm text-gray-600 mb-0">برمجة النصوص بين المواقع</p>
          </Link>
          <Link
            href="/vulnerabilities/command-injection"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">⌨️</span>
            <h4 className="font-bold text-gray-900 mb-1">حقن أوامر النظام</h4>
            <p className="text-sm text-gray-600 mb-0">Command Injection</p>
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
