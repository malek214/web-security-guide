import Link from 'next/link'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import ShareButtons from '@/components/ShareButtons'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'

export default function PrototypePollutionPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">الرئيسية</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Prototype Pollution</span>
      </nav>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x1F9EC;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">تلوث النموذج البرمجي</h1>
            <p className="text-xl text-gray-500 mt-1">Prototype Pollution</p>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-700 font-semibold mb-0">&#x26A0; مستوى الخطورة: متوسطة إلى عالية</p>
        </div>
      </header>

      <div className="mb-6">
        <ShareButtons title="تلوث النموذج البرمجي" url={"https://web-security-guide.vercel.app/vulnerabilities/prototype-pollution"} />
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">تعريف Prototype Pollution</h2>
        <p>
          تلوث النموذج البرمجي (Prototype Pollution) هو ثغرة أمنية في لغة JavaScript
          تسمح للمهاجم بإضافة خصائص غير مرغوب فيها إلى Object.prototype.
        </p>
        <p>
          يمكن أن تؤدي هذه الثغرة إلى تنفيذ أكواد عشوائية، حجب الخدمة، أو تعديل سلوك التطبيق.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">كيف يعمل</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
{`// في JavaScript، كل الكائنات ترث من Object.prototype
const obj = {};
console.log(obj.__proto__); // {}

// الثغرة: إذا سمحنا بتعديل __proto__
function merge(target, source) {
  for (let key in source) {
    if (typeof source[key] === 'object') {
      target[key] = merge(target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// هجوم: حقن properties ضارة
merge({}, JSON.parse('{"__proto__": {"isAdmin": true}}'));

// الآن كل الكائنات الجديدة ستكون isAdmin: true
const user = {};
console.log(user.isAdmin); // true!`}
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة على الكود</h2>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-red-700 mb-3">&#x274C; كود مصاب</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
{`// دالة merge مصابة
function merge(target, source) {
  for (let key in source) {
    if (typeof source[key] === 'object') {
      target[key] = merge(target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// استخدام lodash merge القديم
_.merge({}, userInput); // مصاب!`}
          </pre>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-green-700 mb-3">&#x2705; كود محصن</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
{`// استخدام Object.create(null) لتجنب الوراثة
const safeObject = Object.create(null);

// استخدام structuredClone (آمن)
const cloned = structuredClone(original);

// استخدام lodash.merge مع hash serialization
const _ = require('lodash');
const isObject = (item) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

const merge = (target, source) => {
  for (let key in source) {
    if (key === '__proto__' || key === 'constructor') {
      continue; // تجاهل الخصائص الضارة
    }
    if (isObject(source[key])) {
      if (!isObject(target[key])) target[key] = {};
      merge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
};`}
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">طرق الحماية</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">1. Object.create(null)</h4>
            <p className="text-gray-600 mb-0">إنشاء كائنات بدون prototype chain</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">2. تجميد Prototype</h4>
            <p className="text-gray-600 mb-0">استخدام Object.freeze() لمنع التعديل</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">3. فلترة المدخلات</h4>
            <p className="text-gray-600 mb-0">حظر الخصائص الضارة مثل __proto__ و constructor</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <LabsSection slug="prototype-pollution" />
        <ToolsSection slug="prototype-pollution" />
      </section>

      <section className="mb-12">
        <Quiz slug="prototype-pollution" />
        <VideoSection slug="prototype-pollution" />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الثغرات الأخرى</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vulnerabilities/xss" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F4DC;</span>
            <h4 className="font-bold mt-2">XSS</h4>
          </Link>
          <Link href="/vulnerabilities/command-injection" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x2328;&#xFE0F;</span>
            <h4 className="font-bold mt-2">Command Injection</h4>
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
