import Link from 'next/link'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'

export default function XPathInjectionPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">الرئيسية</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">XPath Injection</span>
      </nav>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x1F50D;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">حقن XPath</h1>
            <p className="text-xl text-gray-500 mt-1">XPath Injection</p>
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-orange-700 font-semibold mb-0">&#x26A0; مستوى الخطورة: عالية</p>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">تعريف XPath Injection</h2>
        <p>
          حقن XPath هو ثغرة أمنية تسمح للمهاجم بحقن عبارات XPath في استعلامات XML.
          يمكن أن يؤدي إلى التحايل على المصادقة أو الوصول لبيانات غير مصرح بها.
        </p>
        <p>
          XPath (XML Path Language) هي لغة用于 التنقل في مستندات XML.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أنواعه</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">1. Boolean-based</h3>
            <p>يستخدم المهاجم تعبيرات منطقية لإرجاع true أو false، ويتم استخدامه في حالات Blind Injection حيث لا توجد استجابة مباشرة.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">2. String-based</h3>
            <p>استخراج نصوص من XML عن طريق مراقبة الاستجابات.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">3. Error-based</h3>
            <p>استخدام أخطاء XPath لاكتشاف هيكل المستند.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة على الكود</h2>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-red-700 mb-3">&#x274C; كود مصاب</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
{`// Python - كود مصاب
import lxml.etree as ET

def authenticate(username, password):
    tree = ET.parse('users.xml')
    query = f"//user[username/text()='{username}' and password/text()='{password}']"
    result = tree.xpath(query)
    return len(result) > 0

# المهاجم يدخل:
# username: ' or '1'='1
# password: ' or '1'='1
# الاستعلام يصبح:
# //user[username/text()='' or '1'='1' and password/text()='' or '1'='1']
# هذا يرجع جميع المستخدمين!`}
          </pre>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-green-700 mb-3">&#x2705; كود محصن</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
{`// Python - كود محصن
import lxml.etree as ET
from lxml.etree import XPath

def authenticate(username, password):
    tree = ET.parse('users.xml')
    
    # استخدام parameterized queries
    query = XPath("//user[username=$u and password=$p]")
    result = tree.xpath(query, u=username, p=password)
    
    return len(result) > 0

# أو استخدام XPath 2.0 مع functions
def safe_authenticate(username, password):
    tree = ET.parse('users.xml')
    
    # تحقق من المدخلات
    if not all(isinstance(x, str) for x in [username, password]):
        return False
    
    # استخدم XPath آمن
    query = "//user[username = ? and password = ?]"
    result = tree.xpath(query, username, password)
    
    return len(result) > 0`}
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">طرق الحماية</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">1. الاستعلامات المعلمومية</h4>
            <p className="text-gray-600 mb-0">استخدم معلمات (parameters) بدلاً من دمج النصوص</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">2. تنقية المدخلات</h4>
            <p className="text-gray-600 mb-0">احرف الأحرف الخاصة في XPath</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">3. تجنب XPath الديناميكي</h4>
            <p className="text-gray-600 mb-0">لا تبناء استعلامات XPath من مدخلات المستخدم مباشرة</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <ToolsSection slug="xpath-injection" />
      </section>

      <VideoSection slug="xpath-injection" />

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الثغرات الأخرى</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vulnerabilities/sql-injection" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F489;</span>
            <h4 className="font-bold mt-2">حقن SQL</h4>
          </Link>
          <Link href="/vulnerabilities/xxe" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F4E6;</span>
            <h4 className="font-bold mt-2">XXE</h4>
          </Link>
          <Link href="/vulnerabilities/nosql-injection" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F5C4;&#xFE0F;</span>
            <h4 className="font-bold mt-2">NoSQL Injection</h4>
          </Link>
        </div>
      </section>
    </div>
  )
}
