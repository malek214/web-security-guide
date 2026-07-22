import Link from 'next/link'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import ShareButtons from '@/components/ShareButtons'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'

export default function CommandInjectionPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">⌨️</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">حقن أوامر النظام</h1>
            <p className="text-xl text-gray-500 mt-1">Command Injection</p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <span className="inline-block bg-danger-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
            خطيرة جداً
          </span>
          <p className="text-gray-700 mb-0">
            ثغرة أمنية حرجة تسمح للمهاجم بتنفيذ أوامر نظام_operating system عشوائية على الخادم المستضيف، مما قد يؤدي إلى سيطرة كاملة على النظام.
          </p>
        </div>
      </section>

      <div className="mb-6">
        <ShareButtons title="حقن أوامر النظام" url={"https://web-security-guide.vercel.app/vulnerabilities/command-injection"} />
      </div>

      {/* Definition Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">تعريف حقن أوامر النظام</h2>
        <p>
          حقن أوامر النظام (Command Injection) هو ثغرة أمنية تسمح للمهاجم بحقن أوامر نظام_تشغيل (OS commands) ضارة في تطبيقات الويب التي تقوم باستدعاء هذه الأوامر بشكل مباشر. يحدث هذا عندما تقوم تطبيقات الويب بدمج مدخلات المستخدم في أوامر نظام بدون تحقق أو تنقية كافية.
        </p>
        <p>
          على سبيل المثال، قد يستخدم التطبيق وظيفة مثل <code>exec()</code> أو <code>system()</code> لتنفيذ أمر ما، وإذا كان جزء من هذا الأمر يأتي من مدخلات المستخدم دون تحقق، يمكن للمهاجم حقن أوامر إضافية باستخدام رموز نظام التشغيل مثل <code>;</code> أو <code>&amp;</code> أو <code>|</code>.
        </p>
        <p>
          هذه الثغرة خطيرة للغاية لأنها قد تؤدي إلى:
        </p>
        <ul>
          <li><strong>السيطرة الكاملة على الخادم:</strong> تنفيذ أي أمر بنفسيات النظام</li>
          <li><strong>سرقة البيانات:</strong> الوصول إلى ملفات حساسة وقواعد بيانات</li>
          <li><strong>تثبيت برامج ضارة:</strong> تركيب backdoors أو keyloggers</li>
          <li><strong>تدمير النظام:</strong> حذف ملفات نظامية أو تعطيل الخادم</li>
          <li><strong>التنقل الشبكي (Lateral Movement):</strong> استخدام الخادم كنقطة انطلاق لهجمات أخرى</li>
        </ul>
      </section>

      {/* Types Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أنواع حقن أوامر النظام</h2>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">1. OS Command Injection المباشر</h3>
          <p>
            يحدث عندما يقوم التطبيق بتنفيذ أمر نظام مباشرة باستخدام مدخلات المستخدم. يستخدم المهاجم فواصل الأوامر مثل <code>;</code> أو <code>&amp;&amp;</code> أو <code>||</code> لحقن أوامر إضافية.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# مثال على هجوم مباشر
# إذا كان التطبيق ينفذ:
ping $user_input

# المهاجم يدخل:
ping 8.8.8.8; cat /etc/passwd

# النتيجة: سيتم تنفيذ كلا الأمرين`}</code></pre>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">2. Command Injection عبر المتغيرات البيئية</h3>
          <p>
            يحدث عندما يقوم التطبيق بدمج متغيرات بيئة النظام في أوامره دون تنقية. يمكن للمهاجم التلاعب بالمتغيرات البيئية لإضافة أوامر ضارة.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# مثال على استغلال متغيرات البيئة
# إذا كان التطبيق يستخدم:
echo $PATH

# المهاجم يعدل PATH ليشمل دليل ضار:
export PATH="/tmp/malicious:$PATH"

# النتيجة: سيتم تنفيذ البرامج الضارة بدلاً من الأصلية`}</code></pre>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">3. Blind Command Injection (حقن أوامر أعمى)</h3>
          <p>
            يحدث عندما لا تحصل على استجابة مباشرة من الأمر المحقون. يستخدم المهاجم تقنيات مثل Time-based أو Out-of-band لاكتشاف الثغرة واستخراج البيانات.
          </p>
          <ul>
            <li><strong>Time-based:</strong> استخدام <code>sleep</code> أو <code>ping</code> لقياس وقت الاستجابة</li>
            <li><strong>Out-of-band:</strong> إرسال البيانات عبر DNS أو HTTP خارجي</li>
            <li><strong>Blind via output:</strong> كتابة النتائج في ملف ثم قراءته</li>
          </ul>
        </div>
      </section>

      {/* Code Examples Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أمثلة عملية على الأكواد</h2>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 1: أداة Ping</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Vulnerable Code */}
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">أكواد ضعيفة ❌</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// PHP - كود ضعيف
$host = $_GET['host'];
$output = shell_exec("ping -c 4 $host");
echo $output;`}</code></pre>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-3">
              <pre><code className="font-mono text-sm">{`# Python - كود ضعيف
import os
host = request.args.get('host')
output = os.popen(f"ping -c 4 {host}").read()
return output`}</code></pre>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-3">
              <pre><code className="font-mono text-sm">{`// Node.js - كود ضعيف
const { exec } = require('child_process');
const host = req.query.host;
exec(\`ping -c 4 \${host}\`, (err, stdout) => {
  res.send(stdout);
});`}</code></pre>
            </div>
            <div className="bg-danger-50 border border-danger-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-danger-700 mb-0">
                <strong>المشكلة:</strong> يتم دمج مدخلات المستخدم مباشرة في أمر النظام بدون تنقية.
              </p>
            </div>
          </div>

          {/* Secure Code */}
          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن ✅</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// PHP - كود آمن
$host = $_GET['host'];

// التحقق من صحة المدخلات
if (!preg_match('/^[a-zA-Z0-9.-]+$/', $host)) {
    die('Invalid host');
}

// استخدام escapeshellarg لحماية المدخلات
$output = shell_exec(
    "ping -c 4 " . escapeshellarg($host)
);
echo $output;`}</code></pre>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-3">
              <pre><code className="font-mono text-sm">{`# Python - كود آمن
import subprocess
import re

host = request.args.get('host')

# التحقق من صحة المدخلات
if not re.match(r'^[a-zA-Z0-9.-]+$', host):
    return 'Invalid host', 400

# استخدام subprocess مع قائمة.arguments
result = subprocess.run(
    ['ping', '-c', '4', host],
    capture_output=True,
    text=True
)
return result.stdout`}</code></pre>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-3">
              <pre><code className="font-mono text-sm">{`// Node.js - كود آمن
const { execFile } = require('child_process');
const host = req.query.host;

// التحقق من صحة المدخلات
if (!/^[a-zA-Z0-9.-]+$/.test(host)) {
  return res.status(400).send('Invalid host');
}

// استخدام execFile بدلاً من exec
execFile('ping', ['-c', '4', host], 
  (err, stdout) => {
    res.send(stdout);
  }
);`}</code></pre>
            </div>
            <div className="bg-success-50 border border-success-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-success-700 mb-0">
                <strong>الحل:</strong> استخدام التحقق من المدخلات وـ Argument List بدلاً من Command String.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 2: أداة حساب الملفات</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Vulnerable Code */}
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود ضعيف ❌</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// PHP - كود ضعيف
$file = $_GET['file'];
$size = shell_exec("du -sh $file");
echo "حجم الملف: $size";`}</code></pre>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-3">
              <pre><code className="font-mono text-sm">{`# Python - كود ضعيف
import os
filename = request.args.get('file')
result = os.popen(f"du -sh {filename}").read()
return f'حجم الملف: {result}'`}</code></pre>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-3">
              <pre><code className="font-mono text-sm">{`// Node.js - كود ضعيف
const { exec } = require('child_process');
const file = req.query.file;
exec(\`du -sh \${file}\`, (err, stdout) => {
  res.send(\`حجم الملف: \${stdout}\`);
});`}</code></pre>
            </div>
          </div>

          {/* Secure Code */}
          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن ✅</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// PHP - كود آمن
$file = $_GET['file'];

// التحقق من أن المسار آمن
$allowed = ['/uploads/', '/tmp/'];
$realPath = realpath($file);
$isAllowed = false;
foreach ($allowed as $dir) {
    if (strpos($realPath, $dir) === 0) {
        $isAllowed = true;
        break;
    }
}

if (!$isAllowed || !$realPath) {
    die('مسار غير مصرح به');
}

// استخدام execFile بدلاً من shell_exec
$size = exec('du -sh ' . escapeshellarg($realPath));
echo "حجم الملف: $size";`}</code></pre>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-3">
              <pre><code className="font-mono text-sm">{`# Python - كود آمن
import subprocess
import os

filename = request.args.get('file')

# التحقق من المسار
allowed_dirs = ['/uploads/', '/tmp/']
real_path = os.path.realpath(filename)

if not any(real_path.startswith(d) 
           for d in allowed_dirs):
    return 'مسار غير مصرح به', 403

# استخدام subprocess مع قائمة
result = subprocess.run(
    ['du', '-sh', real_path],
    capture_output=True,
    text=True
)
return f'حجم الملف: {result.stdout}'`}</code></pre>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-3">
              <pre><code className="font-mono text-sm">{`// Node.js - كود آمن
const { execFile } = require('child_process');
const path = require('path');
const file = req.query.file;

// التحقق من المسار
const allowedDirs = ['/uploads/', '/tmp/'];
const realPath = path.resolve(file);
const isAllowed = allowedDirs.some(
  dir => realPath.startsWith(dir)
);

if (!isAllowed) {
  return res.status(403).send('مسار غير مصرح به');
}

// استخدام execFile مع مصفوفة
execFile('du', ['-sh', realPath], 
  (err, stdout) => {
    res.send(\`حجم الملف: \${stdout}\`);
  }
);`}</code></pre>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 3: معالجة صور</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود ضعيف ❌</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`# Python - كود ضعيف
import os

filename = request.args.get('filename')
size = request.args.get('size', '200x200')

# حقن أوامر عبر حجم الصورة
os.system(f"convert {filename} -resize {size} output.jpg")`}</code></pre>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-3">
              <pre><code className="font-mono text-sm">{`// PHP - كود ضعيف
$filename = $_GET['filename'];
$size = $_GET['size'];

// حقن أوامر عبر اسم الملف
exec("convert $filename -resize $size output.jpg");`}</code></pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن ✅</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`# Python - كود آمن
import subprocess
import re

filename = request.args.get('filename')
size = request.args.get('size', '200x200')

# التحقق من تنسيق الحجم
if not re.match(r'^\d+x\d+$', size):
    return 'حجم غير صالح', 400

# التحقق من اسم الملف
if not re.match(r'^[a-zA-Z0-9._-]+$', filename):
    return 'اسم ملف غير صالح', 400

# استخدام subprocess مع قائمة
subprocess.run([
    'convert', filename, 
    '-resize', size, 
    'output.jpg'
], check=True)`}</code></pre>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-3">
              <pre><code className="font-mono text-sm">{`// PHP - كود آمن
$filename = $_GET['filename'];
$size = $_GET['size'];

// التحقق من صحة المدخلات
if (!preg_match('/^[a-zA-Z0-9._-]+$/', $filename)) {
    die('اسم ملف غير صالح');
}
if (!preg_match('/^\d+x\d+$/', $size)) {
    die('حجم غير صالح');
}

// استخدام escapeshellarg مع execFile
exec("convert " . escapeshellarg($filename) . 
     " -resize " . escapeshellarg($size) . 
     " output.jpg");`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* Detection Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">كيف تكتشف ثغرة Command Injection</h2>

        <h3 className="text-2xl font-semibold text-gray-800">علامات وجود الثغرة</h3>
        <ul>
          <li>تأخر غير عادي في استجابة الخادم عند إدخال أحرف خاصة</li>
          <li>ظهور نتائج غير متوقعة عند إدخال أحرف مثل <code>;</code> أو <code>|</code> أو <code>&amp;</code></li>
          <li>أخطاء نظام تظهر في استجابة التطبيق</li>
          <li>تغير سلوك التطبيق مع تغيير المدخلات</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800">حركات اختبار شائعة</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <ul className="mb-0">
            <li><code>; ls</code> - فاصل أمر + عرض الملفات</li>
            <li><code>| cat /etc/passwd</code> - أنبوب + قراءة ملف</li>
            <li><code>&amp;&amp; whoami</code> - و + تنفيذ أمر</li>
            <li><code>|| id</code> - أو + معرفة المستخدم</li>
            <li><code>`id`</code> - تنفيذ أمر داخل backticks</li>
            <li><code>$(id)</code> - تنفيذ أمر داخل $()</li>
            <li><code>%0a ls%0a</code> - سطر جديد + عرض الملفات</li>
            <li><code>127.0.0.1; cat /etc/shadow</code> - حقن بعد IP</li>
          </ul>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">أدوات الاكتشاف</h3>
        <ul>
          <li><strong>Commix:</strong> أداة آلية لاكتشاف واستغلال ثغرات Command Injection</li>
          <li><strong>Burp Suite:</strong> منصة شاملة لاختبار أمن التطبيقات</li>
          <li><strong>OWASP ZAP:</strong> أداة مجانية لفحص ثغرات المواقع</li>
          <li><strong>Manual Testing:</strong> اختبار يدوي باستخدام حركات خاصة</li>
        </ul>

        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# مثال على اختبار Command Injection باستخدام Commix
commix --url="http://example.com/page?host=127.0.0.1"

# اختبار يدوي باستخدام curl
curl "http://example.com/ping?host=127.0.0.1;ls"
curl "http://example.com/ping?host=127.0.0.1|cat%20/etc/passwd"`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">تقنيات Blind Command Injection</h3>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# Time-based detection
# إذا تأخر الرد 5 ثوانٍ، فالثغرة موجودة
; sleep 5

# أو باستخدام ping
; ping -c 5 127.0.0.1

# أو باستخدام timeout
; timeout 5

# Blind via file output
; whoami > /tmp/output.txt

# Out-of-band via DNS
; nslookup attacker.com`}</code></pre>
        </div>
      </section>

      {/* Prevention Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">كيف تمنع ثغرة Command Injection</h2>

        <h3 className="text-2xl font-semibold text-gray-800">1. تجنب استخدام أوامر النظام مباشرة</h3>
        <p>
          هذه هي الطريقة الأكثر فعالية. استخدم مكتبات برمجة بدلاً من استدعاء أوامر النظام مباشرة.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# بدلاً من استخدام os.system("ping -c 4 $host")
# استخدم مكتبة pythonping
from pythonping import ping
ping(host, count=4)

# بدلاً من shell_exec("du -sh $file")
# استخدم مكتبة os
import os
size = os.path.getsize(file)
formatted_size = os.path.getsize(file) / (1024*1024)`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">2. استخدام Argument Lists بدلاً من Command Strings</h3>
        <p>
          عند استدعاء أوامر النظام، استخدم مصفوفة من البدائل بدلاً من نص واحد.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# Python - استخدام subprocess مع قائمة
import subprocess

# ❌ خطأ - نص واحد
subprocess.run(f"ping -c 4 {host}", shell=True)

# ✅ صحيح - مصفوفة من البدائل
subprocess.run(['ping', '-c', '4', host])

# Node.js - استخدام execFile بدلاً dari exec
const { execFile } = require('child_process');

// ❌ خطأ
exec(\`ping -c 4 \${host}\`);

// ✅ صحيح
execFile('ping', ['-c', '4', host]);`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">3. تنقية المدخلات (Input Validation)</h3>
        <ul>
          <li>التحقق من نوع البيانات (أرقام، نصوص، إلخ)</li>
          <li>استخدام Regular Expressions للتحقق من النمط</li>
          <li>تحديد طول المدخلات</li>
          <li>السماح فقط بالأنماط المقبولة (whitelist validation)</li>
          <li>حذف الأحرف الخطرة مثل <code>;</code> و <code>|</code> و <code>&amp;</code> و <code>`</code></li>
        </ul>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# Python - تنقية المدخلات
import re

def validate_host(host):
    # السماح فقط بأحرف وأرقام ونقطة وشرط
    pattern = r'^[a-zA-Z0-9.-]+$'
    return bool(re.match(pattern, host))

def validate_filename(filename):
    # السماح فقط بأحرف وأرقام ونقطة وشرط سفلي
    pattern = r'^[a-zA-Z0-9._-]+$'
    return bool(re.match(pattern, filename))

# استخدام
if not validate_host(user_input):
    raise ValueError('Invalid host')`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">4. استخدام Sandboxing (العزل)</h3>
        <ul>
          <li>تنفيذ الأوامر في بيئة معزولة (Docker container)</li>
          <li>استخدام AppArmor أو SELinux لتحديد صلاحيات النظام</li>
          <li>تشغيل التطبيق بحساب مستخدم محدود الصلاحيات</li>
          <li>استخدام chroot لعزل نظام الملفات</li>
        </ul>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# مثال على تنفيذ في Docker container
docker run --rm -it \\
  --network none \\
  --read-only \\
  --tmpfs /tmp \\
  --memory 128m \\
  --cpus 0.5 \\
  ubuntu:latest \\
  ping -c 4 $HOST`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">5. تطبيق مبدأ الصلاحية الأدنى (Least Privilege)</h3>
        <ul>
          <li>لا تستخدم حساب root في تنفيذ الأوامر</li>
          <li>أنشئ حساب خاص بالتطبيق بصلاحيات محدودة</li>
          <li>امنع صلاحيات التعديل والحذف غير الضرورية</li>
          <li>استخدم capabilities بدلاً من sudo</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800">6. التعامل مع رسائل الخطأ</h3>
        <ul>
          <li>لا تُظهر رسائل خطأ مفصلة للمستخدمين</li>
          <li>استخدم رسائل خطأ عامة مثل &quot;حدث خطأ&quot;</li>
          <li>سجّل الأخطاء التفصيلية في ملفات السجل الخاصة بالخادم</li>
          <li>لا تكشف معلومات عن هيكل النظام</li>
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
                لا تثق أبداً في مدخلات المستخدم. جميع المدخلات يجب أن تُعتبر ضارة حتىثبت العكس. تجنب استخدام أوامر النظام قدر الإمكان.
              </p>
            </div>
          </div>
        </div>

        <ul>
          <li><strong>استخدم مكتبات برمجة بدلاً من أوامر النظام:</strong> معظم المهام يمكن تنفيذها باستخدام مكتبات أمان أفضل</li>
          <li><strong>استخدم Argument Lists دائماً:</strong> عند استدعاء أوامر النظام، استخدم مصفوفة من البدائل بدلاً من نص واحد</li>
          <li><strong>طبّق تنقية المدخلات:</strong> تحقق من جميع مدخلات المستخدم قبل استخدامها في أوامر النظام</li>
          <li><strong>استخدم Sandboxing:</strong> عزل بيئات التنفيذ باستخدام Docker أو containers</li>
          <li><strong>طبّق مبدأ الصلاحية الأدنى:</strong> لا تستخدم حساب root أبداً</li>
          <li><strong>راقب سجلات النظام:</strong> تتبع جميع أوامر النظام المنفذة</li>
          <li><strong>استخدم WAF:</strong> يمكن أن يساعد في كشف بعض أنماط Command Injection</li>
          <li><strong>راجع الكود بشكل دوري:</strong> افحص جميع الأكواد التي تستخدم أوامر النظام</li>
        </ul>
      </section>

      {/* Common Mistakes Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">الأخطاء الشائعة التي يجب تجنبها</h2>

        <div className="space-y-4">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ استخدام shell=True في Python</h4>
            <p className="text-danger-700 mb-0">
              استخدام <code>subprocess.run(cmd, shell=True)</code> يسمح بحقن أوامر إضافية عبر النص.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ استخدام exec() أو eval() مع مدخلات المستخدم</h4>
            <p className="text-danger-700 mb-0">
              هذه الدوال تنفيذ أي كود عشوائي، يجب تجنبها تماماً مع مدخلات المستخدم.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ استخدام shell_exec() أو system() في PHP</h4>
            <p className="text-danger-700 mb-0">
              هذه الدوال تنفيذ أوامر نظام مباشرة. استخدم <code>execFile()</code> بدلاً منها.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ عدم التحقق من المدخلات</h4>
            <p className="text-danger-700 mb-0">
              استخدام مدخلات المستخدم مباشرة في أوامر النظام بدون أي تحقق أو تنقية.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ استخدام backticks في PHP</h4>
            <p className="text-danger-700 mb-0">
              استخدام <code>`$cmd`</code> في PHP يعادل <code>shell_exec()</code> ويجب تجنبه.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ تشغيل التطبيق بصلاحيات root</h4>
            <p className="text-danger-700 mb-0">
              إذا تم اختراق التطبيق، سيحصل المهاجم على صلاحيات root الكاملة على النظام.
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
            <p className="text-danger-700 mb-0">مرتفع جداً - تعديل البيانات والنظام</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🔴</div>
            <h4 className="font-bold text-danger-800 mb-2">التأثير على التوفر</h4>
            <p className="text-danger-700 mb-0">مرتفع جداً - تعطيل النظام بالكامل</p>
          </div>
        </div>

        <blockquote className="border-r-4 border-danger-500 pr-4 italic text-gray-600 my-6">
          حسب تصنيف OWASP Top 10، تُعتبر Command Injection من أكثر الثغرات خطورة لأنها يمكن أن تؤدي إلى سيطرة كاملة على الخادم المستضيف. في كثير من الحالات، يمكن للمهاجم الحصول على shell كامل على النظام.
        </blockquote>
      </section>

      <section className="mb-12">
        <LabsSection slug="command-injection" />
      </section>

      <section className="mb-12">
        <ToolsSection slug="command-injection" />
      </section>

      <section className="mb-12">
        <Quiz slug="command-injection" />
        <VideoSection slug="command-injection" />
      </section>

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
          <Link
            href="/vulnerabilities/clickjacking"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">🖱️</span>
            <h4 className="font-bold text-gray-900 mb-1">اختطاف النقرات</h4>
            <p className="text-sm text-gray-600 mb-0">Clickjacking</p>
          </Link>
          <Link
            href="/vulnerabilities/api-security"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">🔌</span>
            <h4 className="font-bold text-gray-900 mb-1">أمن APIs</h4>
            <p className="text-sm text-gray-600 mb-0">API Security</p>
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
