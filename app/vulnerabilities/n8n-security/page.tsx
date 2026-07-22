import Link from 'next/link'
import VideoSection from '@/components/VideoSection'

export default function N8nSecurityPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">⚡</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">أمن n8n</h1>
            <p className="text-xl text-gray-500 mt-1">n8n Security</p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <span className="inline-block bg-danger-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
            خطيرة
          </span>
          <p className="text-gray-700 mb-0">
            ثغرات أمنية في منصة n8n لأتمتة سير العمل، والتي يمكن أن تؤدي لتسريب بيانات حساسة أو تشغيل أوامر غير مصرح بها.
          </p>
        </div>
      </section>

      {/* Definition */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">تعريف أمن n8n</h2>
        <p>
          n8n هي منصة مفتوحة المصدر لأتمتة سير العمل. عندما لا يتم تكوينها بشكل صحيح، يمكن أن تتعرض لثغرات أمنية خطيرة تسمح للمهاجمين بالسيطرة على الـ workflows والوصول للبيانات الحساسة.
        </p>
      </section>

      {/* Common Vulnerabilities */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">الثغرات الشائعة في n8n</h2>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">1. Webhook Exposure (التعرض للـ Webhooks)</h3>
          <p>
            إذا لم يتم حماية الـ webhooks بشكل صحيح، يمكن للمهاجمين إطلاق workflows بشكل تعسفي.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# مثال على webhook معرض
# إذا كان الـ webhook بدون مصادقة:
POST /webhook/my-workflow
{"command": "delete_all_users"}

# الحل: إضافة مصادقة
# استخدم Authentication Header أو Basic Auth`}</code></pre>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">2. Credential Exposure (تسريب بيانات الاعتماد)</h3>
          <p>
            تخزين كلمات مرور API وtokens في workflows بدون تشفير أو حماية كافية.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">3. Command Injection في Execute Command Node</h3>
          <p>
            استخدام Execute Command Node مع مدخلات المستخدم بدون تنقية.
          </p>
        </div>
      </section>

      {/* Code Examples */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أمثلة عملية</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كوكيز ضعيفة ❌</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`# إعداد n8n ضعيف
# - بدون مصادقة على webhooks
# - كلمات مرور في نص واضح
# - وضع التشغيل كـ root

# Docker Compose ضعيف:
services:
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    # بدون أي حماية!`}</code></pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كوكيز آمنة ✅</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`# إعداد n8n آمن
services:
  n8n:
    image: n8nio/n8n
    ports:
      - "127.0.0.1:5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=strong_password_here
      - N8N_ENCRYPTION_KEY=your-encryption-key
    volumes:
      - ./data:/home/node/.n8n`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">كيف تحمي n8n</h2>
        <ul>
          <li><strong>فعّل المصادقة:</strong> استخدم Basic Auth أو OAuth على جميع الـ webhooks</li>
          <li><strong>استخدم HTTPS:</strong> شفّل الاتصال بـ SSL/TLS</li>
          <li><strong>حد الوصول:</strong> اربط الـ n8n بعنوان localhost فقط</li>
          <li><strong>تشفير بيانات الاعتماد:</strong> لا تخزن كلمات مرور في نص واضح</li>
          <li><strong>حد الأذونات:</strong> استخدم صلاحيات最小ية لكل workflow</li>
          <li><strong>السجلات:</strong> راقب جميع الأنشطة في n8n</li>
        </ul>
      </section>

      <VideoSection slug="n8n-security" />

      {/* Navigation */}
      <section className="mt-16">
        <div className="text-center">
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
