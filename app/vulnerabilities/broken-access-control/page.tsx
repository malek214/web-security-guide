import Link from "next/link";
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import ShareButtons from '@/components/ShareButtons'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'

export const metadata = {
  title: "خطأ في التحكم بالوصول - Broken Access Control | دليل أمن الويب",
  description:
    "شرح شامل لثغرة خطأ في التحكم بالوصول (Broken Access Control) وأنواعها وكيفية كشفها وإصلاحها في تطبيقات الويب.",
};

const types = [
  {
    title: "الوصول المباشر للمعرف - IDOR",
    english: "Insecure Direct Object Reference",
    description:
      "عندما يمكن للمستخدم الوصول المباشر لأموال أو بيانات أخرى عن طريق تغيير معرّف (ID) في الرابط أو الطلب، دون التحقق من صلاحياته.",
    code: `// ❌ كود خاطئ - لا يوجد تحقق من الصلاحيات
app.get("/api/invoices/:id", (req, res) => {
  const invoice = db.invoices.findById(req.params.id);
  res.json(invoice);
});

// ✅ كود صحيح - التحقق من ملكية المستخدم
app.get("/api/invoices/:id", authenticate, (req, res) => {
  const invoice = db.invoices.findById(req.params.id);
  if (invoice.userId !== req.user.id) {
    return res.status(403).json({ error: "Forbidden" });
  }
  res.json(invoice);
});`,
  },
  {
    title: "تصعيد الصلاحيات - Privilege Escalation",
    english: "Privilege Escalation",
    description:
      "عندما يتمكن مستخدم عادي من الوصول لصلاحيات مدير أو أدمن عن طريق ثغرة في التحقق من الصلاحيات.",
    code: `// ❌ كود خاطئ - لا يوجد تحقق من دور المستخدم
app.put("/api/users/:id/role", (req, res) => {
  db.users.updateRole(req.params.id, req.body.role);
  res.json({ success: true });
});

// ✅ كود صحيح - السماح للمدير فقط
app.put("/api/users/:id/role", authenticate, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  db.users.updateRole(req.params.id, req.body.role);
  res.json({ success: true });
});`,
  },
  {
    title: "الوصول غير المصرح به للدوال - Missing Function Level Access Control",
    english: "Missing Function Level Access Control",
    description:
      "عدم وجود فحص للصلاحيات على مستوى الدوال أو المسارات في الخادم، مما يسمح للمستخدم الوصول لوظائف مخصصة للمديرين.",
    code: `// ❌ كود خاطئ - لا يوجد middleware للصلاحيات
app.delete("/api/admin/users/:id", (req, res) => {
  db.users.delete(req.params.id);
  res.json({ success: true });
});

// ✅ كود صحيح - استخدام middleware للتحقق
function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
}

app.delete("/api/admin/users/:id", authenticate, requireAdmin, (req, res) => {
  db.users.delete(req.params.id);
  res.json({ success: true });
});`,
  },
];

const detectionMethods = [
  {
    title: "فحص الروابط المباشرة",
    description:
      "جرب تغيير معرّفات (IDs) في الروابط والتأكد من عدم الability للوصول لبيانات المستخدمين الآخرين.",
    icon: "🔗",
  },
  {
    title: "اختبار تغيير الأدوار",
    description:
      "سجّل الدخول كمستخدم عادي وحاول الوصول لصفحات أو واجهات برمجة مخصصة للمديرين.",
    icon: "👤",
  },
  {
    title: "تحليل طلبات الويب",
    description:
      "استخدم أدوات مثل Burp Suite أو OWASP ZAP لاعتراض وتعديل الطلبات واختبار الصلاحيات.",
    icon: "🔍",
  },
  {
    title: "فحص التوكن (JWT/Session)",
    description:
      "تأكد من أن التوكن يحتوي على معلومات الدور ولا يمكن تعديله أو إعادة استخدامه.",
    icon: "🔑",
  },
];

const preventionTips = [
  {
    title: "الرفض كقاعدة افتراضية - Deny by Default",
    description:
      "ابدأ برفض كل الطلبات افتراضيًا، ثم أضف صلاحيات الوصول بشكل صريح فقط للمسارات المطلوبة.",
  },
  {
    title: "التحقق على الخادم - Server-Side Checks",
    description:
      "لا تعتمد أبدًا على التحقق من_side client-side فقط. يجب أن يكون التحقق من الصلاحيات على الخادم دائمًا.",
  },
  {
    title: "التحكم بالوصول القائم على الأدوار - RBAC",
    description:
      "استخدم نظام RBAC لتعريف الأدوار والصلاحيات بشكل واضح وصريح لكل دور.",
  },
  {
    title: "المصادقة والتفويض",
    description:
      "افصل بين المصادقة (Authentication) والتفويض (Authorization). تأكد من وجود middleware لكل منهما.",
  },
  {
    title: "سجل التدقيق - Audit Logging",
    description:
      "سجّل جميع محاولات الوصول غير المصرح بها للكشف المبكر عن محاولات الاختراق.",
  },
];

const commonMistakes = [
  "الاعتماد على معرّفات UUID القابلة للاكتشاف بدلاً من UUID العشوائية",
  "عدم وجود فحص للصلاحيات على مستوى API أو المسارات",
  "التخزين الكلي للصلاحيات في جلسة المستخدم بدون تحديث",
  "عدم فحص الصلاحيات عند استخدام REST API Methods المختلفة",
  "سماح الوصول بالكامل لمسارات الـ Admin interface",
  "عدم استخدام middleware للتحقق من الصلاحيات في جميع المسارات",
];

const securityTips = [
  "استخدم UUID عشوائية بدلاً من IDs متسلسلة للموارد",
  "فعّل CORS بشكل صحيح لمنع الوصول غير المصرح به من نطاقات أخرى",
  "استخدم HTTPS لمنع اعتراض الطلبات وتعديلها",
  "راجع الصلاحيات địnhريًا واختبرها بشكل مستمر",
  "استخدم أنظمة إدارة الصلاحيات الجاهزة مثل Casbin أو OPA",
];

export default function BrokenAccessControlPage() {
  return (
    <main dir="rtl" lang="ar" className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-900/30 to-gray-950 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/vulnerabilities"
            className="text-red-400 hover:text-red-300 text-sm mb-6 inline-block"
          >
            &larr; العودة لقائمة الثغرات
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            خطأ في التحكم بالوصول
          </h1>
          <p className="text-xl text-gray-300 font-mono">
            Broken Access Control
          </p>
        </div>
      </section>

      <div className="mb-6">
        <ShareButtons title="خطأ في التحكم بالوصول" url={"https://web-security-guide.vercel.app/vulnerabilities/broken-access-control"} />
      </div>

      {/* Definition */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">التعريف</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <p className="text-gray-300 leading-relaxed text-lg">
              خطأ في التحكم بالوصول (Broken Access Control) هو ثغرة تحدث عندما
              لا يتحقق التطبيق بشكل صحيح من صلاحيات المستخدم قبل السماح له
              بالوصول لموارد أو وظائف غير مصرح له بها. وفقًا لـ OWASP، هذه
              الثغرة هي الأكثر شيوعًا في قائمة ثغرات تطبيقات الويب (OWASP Top
              10).
            </p>
            <div className="mt-4 p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
              <p className="text-red-300 font-semibold">
                التأثير المحتمل: يمكن أن يؤدي هذا الخطأ إلى تسريب البيانات
                الشخصية، وسرقة الحسابات، وتغيير الصلاحيات، والوصول غير المصرح
                به للمعلومات الحساسة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Types */}
      <section className="py-12 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">أنواع الثغرة</h2>
          <div className="space-y-8">
            {types.map((type, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden"
              >
                <div className="p-6 border-b border-gray-800">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {type.title}
                  </h3>
                  <p className="text-sm text-gray-400 font-mono mb-3">
                    {type.english}
                  </p>
                  <p className="text-gray-300">{type.description}</p>
                </div>
                <div className="bg-gray-950 p-4">
                  <p className="text-xs text-gray-500 mb-2 font-mono">
                    مثال على الكود:
                  </p>
                  <pre className="text-sm overflow-x-auto text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">
                    {type.code}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            مثال واقعي
          </h2>
          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-3">
                سيناريو: تطبيق فواتير إلكترونية
              </h3>
              <p className="text-gray-300 mb-4">
                تخيّل تطبيق ويب لإدارة الفواتير. عند تسجيل الدخول، يمكنك عرض
                فاتورتك عبر الرابط:
              </p>
              <div className="bg-gray-950 rounded p-4 font-mono text-sm text-blue-400 mb-4">
                https://example.com/invoices/12345
              </div>
              <p className="text-gray-300 mb-4">
                إذا غيّرت الرقم إلى <code className="text-yellow-400">12346</code> وحصلت
                على فاتورة مستخدم آخر، فأنت أمام ثغرة IDOR.
              </p>
            </div>
            <div className="bg-gray-950 p-4 border-t border-gray-800">
              <p className="text-xs text-gray-500 mb-2 font-mono">
                كيف يبدو الكود الخاطئ:
              </p>
              <pre className="text-sm overflow-x-auto text-gray-300 font-mono leading-relaxed">
{`// الخادم يبحث فقط بالـ ID بدون التحقق من ملكية الفاتورة
const invoice = await db.query(
  "SELECT * FROM invoices WHERE id = ?",
  [req.params.id]
);
res.json(invoice);`}
              </pre>
            </div>
            <div className="bg-gray-950 p-4 border-t border-gray-800">
              <p className="text-xs text-gray-500 mb-2 font-mono">
                الكود المُصحّح:
              </p>
              <pre className="text-sm overflow-x-auto text-gray-300 font-mono leading-relaxed">
{`// التحقق من أن الفاتورة تنتمي للمستخدم الحالي
const invoice = await db.query(
  "SELECT * FROM invoices WHERE id = ? AND user_id = ?",
  [req.params.id, req.user.id]
);
if (!invoice) {
  return res.status(404).json({ error: "Not found" });
}
res.json(invoice);`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Detection */}
      <section className="py-12 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            كيف تكتشف ثغرة خطأ التحكم بالوصول
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {detectionMethods.map((method, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-lg p-5"
              >
                <div className="text-3xl mb-3">{method.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-400 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prevention */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            كيف تمنع ثغرة خطأ التحكم بالوصول
          </h2>
          <div className="space-y-4">
            {preventionTips.map((tip, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-green-800/30 rounded-lg p-5 flex gap-4"
              >
                <div className="text-green-500 text-2xl font-bold shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {tip.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-12 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            الأخطاء الشائعة
          </h2>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <ul className="space-y-3">
              {commonMistakes.map((mistake, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">&#x2717;</span>
                  <span className="text-gray-300">{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Security Tips */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            نصائح أمنية
          </h2>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <ul className="space-y-3">
              {securityTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">&#x2713;</span>
                  <span className="text-gray-300">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="py-12 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            مراجع ومصادر
          </h2>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://owasp.org/www-community/attacks/Access_Control"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  OWASP - Access Control
                </a>
              </li>
              <li>
                <a
                  href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  OWASP Top 10 - A01:2021 Broken Access Control
                </a>
              </li>
              <li>
                <a
                  href="https://cwe.mitre.org/data/definitions/284.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  CWE-284: Improper Access Control
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <LabsSection slug="broken-access-control" />
          <ToolsSection slug="broken-access-control" />
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
           <Quiz slug="broken-access-control" />
           <VideoSection slug="broken-access-control" />
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Link
              href="/vulnerabilities"
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-6 py-3 rounded-lg transition-colors text-center"
            >
              &rarr; العودة لقائمة الثغرات
            </Link>
            <Link
              href="/vulnerabilities/cross-site-scripting"
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-6 py-3 rounded-lg transition-colors text-center"
            >
              الثغرة التالية: التزوير عبر المواقع &larr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
