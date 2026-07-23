'use client'
import VulnerabilityLayout, { VulnSection, CodeBlock, InfoBox, ListItem } from '@/components/VulnerabilityLayout'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'
import ShareButtons from '@/components/ShareButtons'

export default function OpenRedirectPage() {
  return (
    <VulnerabilityLayout
      icon="🔀"
      titleAr="إعادة التوجيه المفتوحة"
      titleEn="Open Redirect"
      severity="medium"
      owasp="A1:2013"
    >
      <ShareButtons title="Open Redirect - إعادة التوجيه المفتوحة" url="https://web-security-guide.vercel.app/vulnerabilities/open-redirect" />

      <VulnSection title="تعريف Open Redirect" icon="📖">
        <p style={{ color: '#cccccc', fontSize: '14px', lineHeight: '1.8' }}>
          إعادة التوجيه المفتوحة (Open Redirect) هو ثغرة أمنية تسمح للمهاجم بإعادة توجيه المستخدمين إلى مواقع ويب مغرضة عن طريق تلاعب بروابط إعادة التوجيه في التطبيق.
        </p>
        <p style={{ color: '#cccccc', fontSize: '14px', lineHeight: '1.8', marginTop: '8px' }}>
          تحدث الثغرة عندما يتحقق التطبيق من عنوان URL لإعادة التوجيه بشكل غير كافٍ، مما يسمح للمهاجم بحقن عناوين URL خارجية.
        </p>
      </VulnSection>

      <VulnSection title="كيف يعمل Open Redirect" icon="🔍">
        <InfoBox type="info">
          <strong>آلية العمل:</strong>
        </InfoBox>
        <ListItem>يكتشف المهاجم أن التطبيق يستخدم إعادة توجيه</ListItem>
        <ListItem>يقوم بحقن عنوان URL مغرض في معامل إعادة التوجيه</ListItem>
        <ListItem>يرسل الرابط المغرض للضحايا</ListItem>
        <ListItem>يتم إعادة توجيه الضحية إلى الموقع المغرض</ListItem>
      </VulnSection>

      <VulnSection title="أنواع Open Redirect" icon="🔍">
        <InfoBox type="warning">
          <strong>1. إعادة التوجيه في URL</strong> - تغيير عنوان URL لإعادة التوجيه
        </InfoBox>
        <CodeBlock title="مثال على إعادة التوجيه في URL" code={`// الرابط الأصلي
https://example.com/login?redirect=/dashboard

// الرابط المغرض
https://example.com/login?redirect=https://attacker.com

// النتيجة: إعادة توجيه إلى موقع المهاجم`} />

        <InfoBox type="warning">
          <strong>2. إعادة التوجيه في نموذج</strong> - حقن عنوان URL في حقل مخفي
        </InfoBox>
        <CodeBlock title="مثال على إعادة التوجيه في نموذج" code={`<!-- نموذج تسجيل الدخول -->
<form action="/login" method="POST">
  <input type="hidden" name="redirect" value="https://attacker.com" />
  <input type="text" name="username" />
  <input type="password" name="password" />
  <button type="submit">تسجيل الدخول</button>
</form>`} />

        <InfoBox type="danger">
          <strong>3. إعادة التوجيه في JavaScript</strong> - استخدام JavaScript لإعادة التوجيه
        </InfoBox>
        <CodeBlock title="مثال على إعادة التوجيه في JavaScript" code={`// كود مصاب
const redirect = new URLSearchParams(window.location.search).get('redirect');
window.location.href = redirect;

// الرابط المغرض
https://example.com/?redirect=https://attacker.com`} />
      </VulnSection>

      <VulnSection title="أمثلة على الهجمات" icon="💻">
        <CodeBlock title="1. هجوم التصيد الاحتيالي" code={`// إنشاء رابط مغرض
https://example.com/login?redirect=https://bank-secure-login.attacker.com

// إعادة التوجيه تلقائياً إلى صفحة تسجيل الدخول المغرضة
// الضحية يدخل بيانات اعتماده في صفحة المهاجم`} />

        <CodeBlock title="2. هجوم تثبيت البرامج الضارة" code={`// إعادة التوجيه إلى صفحة تحميل برامج ضارة
https://example.com/download?file=https://attacker.com/malware.exe

// الضحية يحمّل البرنامج الضار ظناً أنه من الموقع الأصلي`} />

        <CodeBlock title="3. هجوم تسجيل الدخول المزدوج" code={`// إعادة التوجيه بعد تسجيل الدخول الناجح
https://example.com/login?redirect=https://attacker.com

// يسجل الدخول أولاً ثم ينتقل للموقع المغرض`} />
      </VulnSection>

      <VulnSection title="أمثلة كود مصاب ومحصن" icon="💻">
        <CodeBlock title="❌ كود مصاب" variant="vulnerable" code={`// PHP - كود مصاب
$redirect = $_GET['redirect'];
header("Location: " . $redirect);
exit;

// Python - كود مصاب
redirect = request.args.get('redirect')
return redirect(redirect)

// Node.js - كود مصاب
app.get('/redirect', (req, res) => {
  res.redirect(req.query.url);
});`} />

        <CodeBlock title="✅ كود محصن" variant="secure" code={`// PHP - كود محصن
$redirect = $_GET['redirect'];
$parsed_url = parse_url($redirect);

// التحقق من أن الرابط يعود لنفس النطاق
if ($parsed_url['host'] !== $_SERVER['HTTP_HOST']) {
  $redirect = '/dashboard';
}

header("Location: " . $redirect);
exit;

// Python - كود محصن
from urllib.parse import urlparse
redirect = request.args.get('redirect')
parsed = urlparse(redirect)
if parsed.hostname and parsed.hostname != request.host:
    redirect = '/dashboard'
return redirect(redirect)

// Node.js - كود محصن
const { URL } = require('url');
app.get('/redirect', (req, res) => {
  const parsedUrl = new URL(req.query.url);
  if (parsedUrl.hostname !== req.hostname) {
    return res.redirect('/dashboard');
  }
  res.redirect(req.query.url);
});`} />
      </VulnSection>

      <VulnSection title="طرق الحماية" icon="🛡️">
        <InfoBox type="success">
          <strong>1. قائمة مواقع مسموحة</strong> - حدد فقط المواقع المسموح بها لإعادة التوجيه
        </InfoBox>
        <ListItem>أنشئ قائمة بمواقع إعادة التوجيه المسموحة</ListItem>
        <ListItem>أعد التوجيه فقط لمواقع في القائمة</ListItem>
        <ListItem>رفض أي رابط غير مدرج في القائمة</ListItem>

        <InfoBox type="success">
          <strong>2. التحقق من النطاق</strong> - تأكد من أن الرابط يعود لنفس النطاق
        </InfoBox>
        <ListItem>تحقق من أن hostname يطابق اسم النطاق الخاص بك</ListItem>
        <ListItem>استخدم التحقق من النطاق الفرعي إذا لزم الأمر</ListItem>

        <InfoBox type="success">
          <strong>3. استخدام مُعرّفات ثابتة</strong> - استخدم مُعرّفات بدلاً من عناوين URL
        </InfoBox>
        <CodeBlock title="مثال على استخدام مُعرّفات" code={`// بدلاً من:
https://example.com/redirect?url=https://other.com

// استخدم:
https://example.com/redirect?dest=dashboard
https://example.com/redirect?dest=settings

// ثم حوّل المُعرّف إلى عنوان URL في الخادم`} />
      </VulnSection>

      <VulnSection title="نصائح أمنية" icon="💡">
        <InfoBox type="info">
          <strong>القاعدة الذهبية:</strong> لا تقبل عناوين URL للمستخدمين لإعادة التوجيه
        </InfoBox>
        <ListItem>استخدم مُعرّفات ثابتة بدلاً من عناوين URL</ListItem>
        <ListItem>تحقق من أن الرابط يعود لنفس النطاق</ListItem>
        <ListItem>أضف تحذيراً للمستخدم قبل إعادة التوجيه</ListItem>
        <ListItem>راجع الكود بحثاً عن استخدامات header("Location") أو res.redirect()</ListItem>
      </VulnSection>

      <VulnSection title="الأخطاء الشائعة" icon="⚠️">
        <InfoBox type="danger">
          <strong>❌ قبول أي عنوان URL لإعادة التوجيه</strong> - يمكن للمهاجم استخدام أي عنوان
        </InfoBox>
        <InfoBox type="danger">
          <strong>❌ التحقق من الجزء الأول من الرابط فقط</strong> - يمكن تجاوزه بسهولة
        </InfoBox>
        <InfoBox type="danger">
          <strong>❌ عدم تحذير المستخدم</strong> - المستخدم لا يعرف أنه سيتم إعادة توجيهه
        </InfoBox>
      </VulnSection>

      <section className="mb-6">
        <LabsSection slug="open-redirect" />
      </section>

      <section className="mb-6">
        <ToolsSection slug="open-redirect" />
      </section>

      <section className="mb-6">
        <Quiz slug="open-redirect" />
        <VideoSection slug="open-redirect" />
      </section>
    </VulnerabilityLayout>
  )
}
