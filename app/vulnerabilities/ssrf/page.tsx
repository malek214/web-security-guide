import Link from 'next/link'

export default function SsrfPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">🖥️</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">تزوير الطلبات من جانب الخادم</h1>
            <p className="text-xl text-gray-500 mt-1">Server-Side Request Forgery (SSRF)</p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <span className="inline-block bg-danger-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
            خطيرة جداً
          </span>
          <p className="text-gray-700 mb-0">
            ثغرة تسمح للمهاجم بإجبار الخادم على إرسال طلبات HTTP إلى أي عنوان يحدده المهاجم، بما في ذلك البنية التحتية الداخلية للشبكة. تُعد من أخطر الثغرات في تطبيقات الويب الحديثة، حسب تصنيف OWASP Top 10.
          </p>
        </div>
      </section>

      {/* Definition Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">تعريف تزوير الطلبات من جانب الخادم (SSRF)</h2>
        <p>
          تزوير الطلبات من جانب الخادم (Server-Side Request Forgery - SSRF) هو ثغرة أمنية تسمح للمهاجم بإجبار تطبيق الويب على إرسال طلبات HTTP إلى عناوين يختارها المهاجم بدلاً من العناوين المقصودة. تحدث الثغرة عندما يقبل التطبيق عنوان URL من المستخدم ويقوم بإرسال طلب إليه دون تحقق كافٍ أو تقييد للعناوين المسموح بها.
        </p>
        <p>
          على عكس ثغرات مثل XSS التي تعمل على جانب العميل، SSRF خطير لأنه يستغل ثقة الخادم في نفسه - فالخادم يملك صلاحيات أكبر للوصول إلى الموارد الداخلية مقارنة بالمتصفح.
        </p>
        <p>
          هذه الثغرة قد تؤدي إلى نتائج كارثية مثل:
        </p>
        <ul>
          <li><strong>الوصول إلى الخدمات الداخلية:</strong> الوصول إلى خدمات وم APIs لا يمكن الوصول إليها من الإنترنت مباشرة</li>
          <li><strong>قراءة ملفات الخادم:</strong> قراءة ملفات مثل <code>/etc/passwd</code> و <code>/etc/shadow</code></li>
          <li><strong>سرقة بيانات اعتماد AWS:</strong> الوصول إلى خدمات سحابية مثل Amazon EC2 metadata</li>
          <li><strong>تنقل الشبكة الداخلية (Port Scanning):</strong> فحص المنافذ المفتوحة في الشبكة الداخلية</li>
          <li><strong>هجوم DNS Rebinding:</strong> إعادة ربط أسماء النطاقات للوصول إلى الموارد الداخلية</li>
          <li><strong>استخراج البيانات:</strong> سرقة بيانات حساسة من قواعد البيانات الداخلية</li>
          <li><strong>تنفيذ أوامر عشوائية:</strong> في بعض الحالات، تنفيذ أوامر على الخادم المضيف</li>
        </ul>
      </section>

      {/* Types Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أنواع SSRF</h2>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">1. Blind SSRF (تزوير الطلبات الأعمى)</h3>
          <p>
            في هذا النوع، لا يتلقى المهاجم أي استجابة مباشرة من الخادم. يستخدم المهاجم ثغرة SSRF لإرسال طلبات إلى خادمه الخاص للكشف عن وجود الثغرة فقط. لا يمكن استخراج بيانات من الخادم المصاب في هذا النوع.
          </p>
          <ul>
            <li>يتم عبر مراقبة سجلات الخادم الخاص بالمهاجم (HTTP logs)</li>
            <li>يُستخدم للكشف عن الثغرة ولنفاذها فقط</li>
            <li>يمكن استخدامه مع Out-of-Band techniques لاستخراج بيانات محدودة</li>
          </ul>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# مثال على Blind SSRF
# المهاجم يُرسل طلب من خلال التطبيق المصاب إلى خادمه
GET /api/fetch?url=http://attacker-controlled-server.com/ssrf-proof HTTP/1.1

# الخادم يُرسل الطلب إلى الخادم الخاص بالمهاجم
# المهاجم يراقب سجلاته للكشف عن نجاح الهجوم`}</code></pre>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">2. Semi-Blind SSRF (تزوير الطلبات شبه الأعمى)</h3>
          <p>
            يحصل المهاجم على استجابة جزئية من الخادم المصاب، لكنها غير كاملة. قد تحتوي على رسائل خطأ مفصلة أو أجزاء من البيانات تعطي المهاجم معلومات مفيدة.
          </p>
          <ul>
            <li>يتم عبر مراقبة رسائل الخطأ التي يعيدها الخادم</li>
            <li>يمكن أن يكشف معلومات حول البنية التحتية الداخلية</li>
            <li>يُستخدم مع تقنيات Timing-based لاستخراج معلومات إضافية</li>
          </ul>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# مثال على Semi-Blind SSRF
# الخادم يُعيد رسالة خطأ تحتوي على معلومات مفيدة
GET /api/proxy?url=http://192.168.1.1:8080/admin HTTP/1.1

# الاستجابة قد تحتوي:
# "Connection refused to 192.168.1.1:8080"
# "Connection refused to 192.168.1.1:8081"  ← المنافذ المفتوحة
# هذا يكشف أن المنفذ 8080 مفتوح في الشبكة الداخلية`}</code></pre>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">3. Full SSRF (تزوير الطلبات الكامل)</h3>
          <p>
            الأخطر من الأنواع الثلاثة. يحصل المهاجم على استجابة كاملة من الخادم المصاب، مما يسمح له باستخراج بيانات حساسة بالكامل من البنية التحتية الداخلية.
          </p>
          <ul>
            <li>يسمح بقراءة ملفات الخادم وسرقة بيانات اعتماد AWS</li>
            <li>يسمح بالوصول الكامل إلى الخدمات الداخلية</li>
            <li>يمكن أن يؤدي لتنفيذ أوامر عشوائية في بعض الحالات</li>
          </ul>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# مثال على Full SSRF
# قراءة ملفات الخادم
GET /api/fetch?url=file:///etc/passwd HTTP/1.1
# الاستجابة: محتويات ملف passwd كاملة

# الوصول إلى AWS EC2 Metadata
GET /api/fetch?url=http://169.254.169.254/latest/meta-data/ HTTP/1.1
# الاستجابة: بيانات اعتماد AWS IAM

# الوصول إلى قاعدة بيانات داخلية
GET /api/fetch?url=http://10.0.0.5:5432/ HTTP/1.1
# الاستجابة: معلومات PostgreSQL`}</code></pre>
          </div>
        </div>
      </section>

      {/* Code Examples Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أمثلة عملية على الأكواد</h2>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 1: جلب محتوى من URL (Python)</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Vulnerable Code */}
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود ضعيف ❌</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`# Python Flask - كود ضعيف
from flask import Flask, request
import requests

app = Flask(__name__)

@app.route('/api/fetch')
def fetch_url():
    url = request.args.get('url')
    # لا يوجد تحقق من عنوان URL
    response = requests.get(url)
    return response.text`}</code></pre>
            </div>
            <div className="bg-danger-50 border border-danger-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-danger-700 mb-0">
                <strong>المشكلة:</strong> لا يوجد أي تحقق من عنوان URL المُدخل. يمكن للمهاجم إدخال أي عنوان بما في ذلك عناوين الشبكة الداخلية مثل <code>http://169.254.169.254</code> أو <code>file:///etc/passwd</code>.
              </p>
            </div>
          </div>

          {/* Secure Code */}
          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن ✅</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`# Python Flask - كود آمن
from flask import Flask, request
import requests
from urllib.parse import urlparse
import ipaddress

app = Flask(__name__)

ALLOWED_DOMAINS = ['example.com', 'api.example.com']

def is_safe_url(url):
    try:
        parsed = urlparse(url)
        # التحقق من البروتوكول
        if parsed.scheme not in ('http', 'https'):
            return False
        # التحقق من النطاق المسموح
        if parsed.hostname not in ALLOWED_DOMAINS:
            return False
        # التحقق من عدم كونه عنوان داخلي
        ip = ipaddress.ip_address(parsed.hostname)
        if ip.is_private or ip.is_loopback:
            return False
        return True
    except ValueError:
        return False

@app.route('/api/fetch')
def fetch_url():
    url = request.args.get('url')
    if not is_safe_url(url):
        return 'URL not allowed', 403
    response = requests.get(url, timeout=5)
    return response.text`}</code></pre>
            </div>
            <div className="bg-success-50 border border-success-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-success-700 mb-0">
                <strong>الحل:</strong> التحقق من البروتوكول والنطاق، وفحص عدم كون العنوان عنواناً داخلياً، واستخدام قائمة مسموحات للنطاقات.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 2: تحميل صورة من URL (Node.js)</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Vulnerable Code */}
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود ضعيف ❌</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// Node.js Express - كود ضعيف
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/api/download-image', async (req, res) => {
  const imageUrl = req.query.url;
  // لا يوجد تحقق من عنوان URL
  const response = await fetch(imageUrl);
  const buffer = await response.buffer();
  res.set('Content-Type', 'image/png');
  res.send(buffer);
});`}</code></pre>
            </div>
            <div className="bg-danger-50 border border-danger-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-danger-700 mb-0">
                <strong>المشكلة:</strong> يقبل التطبيق أي عنوان URL ويقوم بجلب المحتوى منه دون تحقق. يمكن للمهاجم استخدام هذا للوصول إلى الموارد الداخلية.
              </p>
            </div>
          </div>

          {/* Secure Code */}
          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن ✅</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// Node.js Express - كод آمن
const express = require('express');
const fetch = require('node-fetch');
const { URL } = require('url');
const dns = require('dns').promises;
const app = express();

const ALLOWED_HOSTS = ['images.example.com'];

async function isSafeHost(hostname) {
  if (!ALLOWED_HOSTS.includes(hostname)) return false;

  // فحص DNS Rebinding
  const addresses = await dns.resolve4(hostname);
  for (const addr of addresses) {
    if (isPrivateIP(addr)) return false;
  }
  return true;
}

function isPrivateIP(ip) {
  const parts = ip.split('.').map(Number);
  return (
    parts[0] === 10 ||
    (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
    (parts[0] === 192 && parts[1] === 168) ||
    parts[0] === 127
  );
}

app.get('/api/download-image', async (req, res) => {
  try {
    const parsed = new URL(req.query.url);

    if (parsed.protocol !== 'https:') {
      return res.status(400).json({ error: 'Only HTTPS allowed' });
    }

    if (!(await isSafeHost(parsed.hostname))) {
      return res.status(403).json({ error: 'Host not allowed' });
    }

    const response = await fetch(parsed.href, {
      timeout: 5000,
      redirect: 'error'
    });
    const buffer = await response.buffer();
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    res.status(400).json({ error: 'Invalid URL' });
  }
});`}</code></pre>
            </div>
            <div className="bg-success-50 border border-success-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-success-700 mb-0">
                <strong>الحل:</strong> التحقق من البروتوكول، استخدام قائمة مسموحات للنطاقات، فحص DNS لمنع DNS Rebinding، ورفض التوجيهات.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 3: حركة المرور الوسيطة (Middleware) للتحقق من URLs</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود ضعيف ❌</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`# Python Django - كود ضعيف
import requests
from django.http import HttpResponse

def proxy_view(request):
    target_url = request.GET.get('url')
    # لا يوجد تحقق من البروتوكول
    resp = requests.get(target_url)
    return HttpResponse(resp.content)`}</code></pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن ✅</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`# Python Django - كود آمن
import requests
from django.http import HttpResponse
from django.conf import settings
from urllib.parse import urlparse
import ipaddress
import socket

def is_private_address(hostname):
    try:
        # فحص DNS لتجنب DNS Rebinding
        addrs = socket.getaddrinfo(hostname, None)
        for addr in addrs:
            ip = ipaddress.ip_address(addr[4][0])
            if ip.is_private or ip.is_loopback or ip.is_link_local:
                return True
    except (socket.gaierror, ValueError):
        return True
    return False

def validate_url(url):
    try:
        parsed = urlparse(url)
        if parsed.scheme not in settings.ALLOWED_SCHEMES:
            return False
        if is_private_address(parsed.hostname):
            return False
        return True
    except Exception:
        return False

def proxy_view(request):
    target_url = request.GET.get('url')
    if not validate_url(target_url):
        return HttpResponse('Forbidden', status=403)
    resp = requests.get(target_url, timeout=5,
                        allow_redirects=False)
    return HttpResponse(resp.content)`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* Detection Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">كيف تكتشف ثغرة SSRF</h2>

        <h3 className="text-2xl font-semibold text-gray-800">علامات وجود الثغرة</h3>
        <ul>
          <li>التطبيقات التي تقبل عنوان URL كمدخل من المستخدم</li>
          <li>التطبيقات التي تجلب محتوى أو صور من عناوين خارجية</li>
          <li>خدمات الويبhooks التي تقبل عنوان callback</li>
          <li>تطبيقات PDF generation التي تحمل محتوى من URLs</li>
          <li>منصات الويبท توفر ميزات import من روابط خارجية</li>
          <li>تطبيقات RSS feed aggregation</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800">أدوات الاكتشاف</h3>
        <ul>
          <li><strong>SSRFmap:</strong> أداة آلية لاكتشاف واستغلال ثغرات SSRF</li>
          <li><strong>Burp Suite:</strong> منصة شاملة لاختبار أمن التطبيقات مع إضافة Collaborator</li>
          <li><strong>OWASP ZAP:</strong> أداة مجانية لفحص ثغرات المواقع</li>
          <li><strong>Interactsh:</strong> أداة للكشف عن Out-of-Band interactions</li>
        </ul>

        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# مثال على اختبار SSRF باستخدام curl
# اختبار الوصول إلى الخادم الداخلي
curl "http://target.com/api/proxy?url=http://127.0.0.1:8080"

# اختبار الوصول إلى AWS EC2 Metadata
curl "http://target.com/api/proxy?url=http://169.254.169.254/latest/meta-data/"

# اختبار قراءة ملفات الخادم
curl "http://target.com/api/proxy?url=file:///etc/passwd"

# اختبار DNS Rebinding
curl "http://target.com/api/proxy?url=http://rebind.attacker.com"`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">نقاط اختبار شائعة</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <ul className="mb-0">
            <li><code>http://127.0.0.1</code> - الوصول إلى الخادم المحلي</li>
            <li><code>http://localhost</code> - اسم مضيف محلي</li>
            <li><code>http://169.254.169.254</code> - AWS EC2 Metadata endpoint</li>
            <li><code>http://metadata.google.internal</code> - Google Cloud Metadata</li>
            <li><code>file:///etc/passwd</code> - قراءة ملفات الخادم</li>
            <li><code>gopher://</code> - بروتوكول Gopher للوصول إلى خدمات داخلية</li>
            <li><code>dict://</code> - بروتوكول Dict للاختبار</li>
            <li><code>http://192.168.1.1</code> - عنوان الشبكة الداخلية الشائع</li>
          </ul>
        </div>
      </section>

      {/* Prevention Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">كيف تمنع ثغرة SSRF</h2>

        <h3 className="text-2xl font-semibold text-gray-800">1. التحقق من صحة URLs (Input Validation)</h3>
        <p>
          تحقق من أن عنوان URL المُدخل يتوافق مع المتطلبات الأمنية قبل استخدامه.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# مثال على التحقق من صحة URL في Python
from urllib.parse import urlparse
import ipaddress

def validate_url(url):
    try:
        parsed = urlparse(url)

        # 1. التحقق من البروتوكول
        if parsed.scheme not in ('http', 'https'):
            return False

        # 2. التحقق من عدم كونه عنوان IP مباشر
        try:
            ip = ipaddress.ip_address(parsed.hostname)
            if ip.is_private or ip.is_loopback or ip.is_link_local:
                return False
        except ValueError:
            pass  # ليس عنوان IP، وهو مقبول

        # 3. التحقق من عدم استخدام port داخلي
        dangerous_ports = {22, 23, 25, 445, 3389, 5432, 6379, 27017}
        if parsed.port and parsed.port in dangerous_ports:
            return False

        return True
    except Exception:
        return False`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">2. استخدام Allow List (قائمة المسموحات)</h3>
        <p>
          بدلاً من حظر العناوين الضارة (Deny List)، استخدم قائمة مسموحات للنطاقات والمنافذ الآمنة فقط.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# مثال على Allow List في Node.js
const ALLOWED_HOSTS = new Set([
  'api.example.com',
  'cdn.example.com',
  'images.example.com'
]);

const ALLOWED_PORTS = new Set([80, 443]);

function isAllowedUrl(urlString) {
  try {
    const url = new URL(urlString);
    return (
      ALLOWED_HOSTS.has(url.hostname) &&
      ALLOWED_PORTS.has(parseInt(url.port || (url.protocol === 'https:' ? '443' : '80'))) &&
      url.protocol === 'https:'
    );
  } catch {
    return false;
  }
}`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">3. تجزئة الشبكة (Network Segmentation)</h3>
        <p>
          افصل بين الشبكات الداخلية والخارجية باستخدام جدران الحماية والـ VLAN.
        </p>
        <ul>
          <li>ضع تطبيقات الويب في zone منفصلة عن الخدمات الداخلية</li>
          <li>استخدم جدران الحماية لتقييد حركة المرور بين الشبكات</li>
          <li>امنع التطبيقات من الوصول مباشرة إلى الشبكة الداخلية</li>
          <li>استخدم proxy خاص للطلبات الداخلية مع تقييد صارم</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800">4. تعطيل البروتوكولات غير الضرورية</h3>
        <p>
          قم بتعطيل دعم البروتوكولات غير الضرورية مثل <code>file://</code> و <code>gopher://</code> و <code>dict://</code>.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# Python - تعطيل البروتوكولات غير الضرورية
import requests

def safe_fetch(url):
    parsed = urlparse(url)

    # السماح فقط بـ HTTP و HTTPS
    if parsed.scheme not in ('http', 'https'):
        raise ValueError(f"Unsupported protocol: {parsed.scheme}")

    # استخدام timeout لمنع الاستخدام المفرط
    response = requests.get(
        url,
        timeout=5,
        allow_redirects=False,  # منع التوجيهات
        verify=True  # التحقق من شهادات SSL
    )
    return response.text`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">5. استخدام DNS Validation</h3>
        <p>
          تحقق من أن عنوان IP الذي يحل إليه اسم المضيف ليس عنواناً داخلياً. هذا يحمي من هجمات DNS Rebinding.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# Python - التحقق من DNS
import socket
import ipaddress

def resolve_and_validate(hostname):
    try:
        # حل اسم المضيف
        result = socket.getaddrinfo(hostname, None)
        for family, _, _, _, sockaddr in result:
            ip = ipaddress.ip_address(sockaddr[0])
            if ip.is_private or ip.is_loopback or ip.is_link_local:
                return False, f"Private IP: {ip}"
        return True, "Safe"
    except socket.gaierror:
        return False, "DNS resolution failed"`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">6. تطبيق مبدأ الصلاحية الأدنى (Least Privilege)</h3>
        <ul>
          <li>قلل صلاحيات تطبيق الويب للوصول إلى الموارد الداخلية</li>
          <li>لا تستخدم حسابات root أو admin للتطبيق</li>
          <li>استخدم IAM Roles محدودة للوصول إلى الخدمات السحابية</li>
          <li>قيّد وصول التطبيق إلى البنية التحتية الداخلية</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800">7. استخدام Web Application Firewall (WAF)</h3>
        <ul>
          <li>استخدم WAF لحظر طلبات SSRF المعروفة</li>
          <li>اكتب قواعد مخصصة لحظر عناوين IP الداخلية</li>
          <li>راقب الطلبات غير الطبيعية وسجّلها</li>
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
                لا تثق أبداً في أي عنوان URL يُقدمه المستخدم. جميع عناوين URL يجب أن تُتحقق وتُقيّد قبل استخدامها من قبل الخادم.
              </p>
            </div>
          </div>
        </div>

        <ul>
          <li><strong>استخدم Allow List دائماً:</strong> حدد النطاقات والمنافذ المسموح بها بدلاً من حظر العناوين الضارة</li>
          <li><strong>تحقق من البروتوكول:</strong> ارفض جميع البروتوكولات غير HTTP و HTTPS</li>
          <li><strong>افحص DNS قبل الاتصال:</strong> تأكد من أن عنوان IP لا يشير إلى مورد داخلي</li>
          <li><strong>استخدم Timeout:</strong> حدد مهلة زمنية لمنع الاستخدام المفرط للموارد</li>
          <li><strong>امنع التوجيهات:</strong> ارفض التوجيهات HTTP للمنع من تجاوز التقييدات</li>
          <li><strong>سجّل جميع الطلبات:</strong> راقب وسجّل طلبات URL غير الطبيعية</li>
          <li><strong>استخدم Rate Limiting:</strong> حدد عدد الطلبات للحد من محاولات الاستكشاف</li>
          <li><strong>افصل الشبكات:</strong> قسّم الشبكات باستخدام VLAN و جدران الحماية</li>
          <li><strong>حدّث المكتبات بانتظام:</strong> تأكد من تحديث مكتبات HTTP client مثل requests و fetch</li>
          <li><strong>استخدم Cloud Metadata Protection:</strong> احمِ الوصول إلى metadata endpoints في بيئات السحابة</li>
        </ul>
      </section>

      {/* Common Mistakes Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">الأخطاء الشائعة التي يجب تجنبها</h2>

        <div className="space-y-4">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ قبول أي URL من المستخدم</h4>
            <p className="text-danger-700 mb-0">
              السماح للمستخدم بإدخال أي عنوان URL دون تحقق هو السبب الرئيسي لثغرات SSRF. يجب استخدام Allow List دائماً.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ استخدام Deny List بدلاً من Allow List</h4>
            <p className="text-danger-700 mb-0">
              محاولة حظر العناوين الضارة فاشلة دائماً لأن المهاجمين يجدون طرقاً للتحايل. مثلاً: <code>http://127.1</code> بدلاً من <code>http://127.0.0.1</code> أو استخدام <code>http://0177.0.0.1</code>.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ عدم فحص DNS قبل الاتصال</h4>
            <p className="text-danger-700 mb-0">
              عدم التحقق من أن عنوان IP الذي يحل إليه اسم المضيف ليس عنواناً داخلياً يعرض التطبيق لهجمات DNS Rebinding.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ السماح بالبروتوكولات غير الضرورية</h4>
            <p className="text-danger-700 mb-0">
              دعم <code>file://</code> و <code>gopher://</code> و <code>dict://</code> يفتح هجمات إضافية خطيرة مثل قراءة ملفات الخادم.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ عدم استخدام Timeout</h4>
            <p className="text-danger-700 mb-0">
              عدم تحديد مهلة زمنية للطلبات يسمح للمهاجم باستخدام التطبيق كـ proxy بطيء أو استنزاف موارد الخادم.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ السماح بالتوجيهات (Redirects)</h4>
            <p className="text-danger-700 mb-0">
              السماح بالتوجيهات HTTP يسمح للمهاجم بتحويل الطلبات إلى عناوين محظورة عبر تسلسل من التوجيهات.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ عدم تسجيل الطلبات</h4>
            <p className="text-danger-700 mb-0">
              عدم تسجيل وmonitoring طلبات URL يجعل اكتشاف محاولات SSRF شبه مستحيل.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ استخدام صلاحيات عالية للتطبيق</h4>
            <p className="text-danger-700 mb-0">
              تشغيل تطبيق الويب بصلاحيات root أو admin يزيد من تأثير ثغرة SSRF إذا نجح المهاجم في استغلالها.
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
            <p className="text-danger-700 mb-0">مرتفع جداً - سرقة بيانات من البنية التحتية الداخلية</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🔴</div>
            <h4 className="font-bold text-danger-800 mb-2">التأثير على النزاهة</h4>
            <p className="text-danger-700 mb-0">مرتفع - تعديل البيانات أو تشويهها عبر الخدمات الداخلية</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🟠</div>
            <h4 className="font-bold text-danger-800 mb-2">التأثير على التوفر</h4>
            <p className="text-danger-700 mb-0">متوسط إلى مرتفع - تعطيل الخدمات الداخلية أو استنزاف الموارد</p>
          </div>
        </div>

        <blockquote className="border-r-4 border-danger-500 pr-4 italic text-gray-600 my-6">
          وفقاً لـ OWASP Top 10 (2021)، أصبح SSRF ثغرة مستقلة تحت فئة A10: Server-Side Request Forgery. أثرت على تطبيقات كبرى مثل Microsoft, Shopify, و GitHub. في عام 2023، تم اكتشاف أكثر من 15,000 ثغرة SSRF في منصات حكومية وتجارية.
        </blockquote>
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
            href="/vulnerabilities/sql-injection"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">💉</span>
            <h4 className="font-bold text-gray-900 mb-1">SQL Injection</h4>
            <p className="text-sm text-gray-600 mb-0">حقن SQL</p>
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
