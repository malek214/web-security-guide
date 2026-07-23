import VulnerabilityLayout, { VulnSection, CodeBlock, InfoBox, ListItem } from '@/components/VulnerabilityLayout'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'
import ShareButtons from '@/components/ShareButtons'

export default function SSRFPage() {
  return (
    <VulnerabilityLayout
      icon="🖥️"
      titleAr="تزييف𠮹ر على الخادم"
      titleEn="Server-Side Request Forgery (SSRF)"
      severity="high"
      owasp="A10:2021"
    >
      <ShareButtons title="SSRF - تزييف طلبات الخادم" url="https://web-security-guide.vercel.app/vulnerabilities/ssrf" />

      <VulnSection title="تعريف SSRF" icon="📖">
        <p style={{ color: '#cccccc', fontSize: '14px', lineHeight: '1.8' }}>
          تزييف طلبات الخادم (SSRF) هو ثغرة أمنية تسمح للمهاجم بإجبار تطبيق الويب على إرسال طلبات HTTP إلى مصادر داخلية أو خارجية لم يكن مقصوداً الوصول إليها.
        </p>
        <p style={{ color: '#cccccc', fontSize: '14px', lineHeight: '1.8', marginTop: '8px' }}>
          يستغل المهاجم الثغرة لإرسال طلبات إلى الخدمات الداخلية (مثل قواعد البيانات أو واجهات برمجة التطبيقات الداخلية) أو لتجاوز جدران الحماية (Firewall).
        </p>
      </VulnSection>

      <VulnSection title="كيف يعمل SSRF" icon="🔍">
        <InfoBox type="info">
          <strong>آلية العمل:</strong>
        </InfoBox>
        <ListItem>يكتشف المهاجم نقطة إدخال URL في التطبيق</ListItem>
        <ListItem>يقوم بحقن عنوان URL داخلي أو خارجي</ListItem>
        <ListItem>يتم إرسال الطلب من الخادم إلى العنوان المحدد</ListItem>
        <ListItem>يتمكن المهاجم من الوصول للخدمات الداخلية</ListItem>
      </VulnSection>

      <VulnSection title="أنواع SSRF" icon="🔍">
        <InfoBox type="warning">
          <strong>1. SSRF مباشر</strong> - يستطيع المهاجم رؤية استجابة الطلب مباشرة
        </InfoBox>
        <CodeBlock title="مثال على SSRF مباشر" code={`// نقطة ضعيفة في التطبيق
$url = $_GET['url'];
$response = file_get_contents($url);

// هجوم SSRF
// https://example.com/fetch?url=http://192.168.1.1/admin
// https://example.com/fetch?url=http://localhost:3306`} />

        <InfoBox type="danger">
          <strong>2. SSRF غير مباشر (Blind SSRF)</strong> - لا يستطيع المهاجم رؤية الاستجابة مباشرة، لكن يمكنه استنتاج معلومات
        </InfoBox>
        <CodeBlock title="مثال على Blind SSRF" code={`// لا يتم عرض الاستجابة للمهاجم
// لكن يمكنه مراقبة waktu الاستجابة أو الأخطاء

// مثال على URL مغرض
https://example.com/image?url=http://192.168.1.100:22

// إذا كان هناك تأخير، يعني أن المنفذ مفتوح`} />
      </VulnSection>

      <VulnSection title="أمثلة على الهجمات" icon="💻">
        <CodeBlock title="1. الوصول للخدمات الداخلية" code={`// الوصول لقاعدة البيانات الداخلية
https://example.com/proxy?url=http://192.168.1.50:3306

// الوصول لواجهة إدارة الخادم
https://example.com/proxy?url=http://192.168.1.1:8080/admin

// الوصول للمetadata service في AWS
https://example.com/proxy?url=http://169.254.169.254/latest/meta-data/`} />

        <CodeBlock title="2. تجاوز جدران الحماية" code={`// استخدام IPv6 لتجاوز ACL
https://example.com/proxy?url=http://[::1]:8080

// استخدام DNS rebinding
https://example.com/proxy?url=http://localtest.me:8080`} />

        <CodeBlock title="3. قراءة الملفات المحلية" code={`// قراءة /etc/passwd
https://example.com/proxy?url=file:///etc/passwd

// في تطبيقات Windows
https://example.com/proxy?url=file:///c:/windows/win.ini`} />
      </VulnSection>

      <VulnSection title="أمثلة كود مصاب ومحصن" icon="💻">
        <CodeBlock title="❌ كود مصاب" variant="vulnerable" code={`// PHP - كود مصاب
$url = $_GET['url'];
$response = file_get_contents($url);
echo $response;

// Node.js - كود مصاب
const axios = require('axios');
app.get('/fetch', async (req, res) => {
  const response = await axios.get(req.query.url);
  res.send(response.data);
});`} />

        <CodeBlock title="✅ كود محصن" variant="secure" code={`// PHP - كود محصن
$allowed_hosts = ['api.example.com', 'cdn.example.com'];
$parsed_url = parse_url($_GET['url']);

if (!in_array($parsed_url['host'], $allowed_hosts)) {
  die('Host not allowed');
}

// Node.js - كود محصن
const { URL } = require('url');
const blockedHosts = ['169.254.169.254', 'localhost', '127.0.0.1'];

app.get('/fetch', async (req, res) => {
  const parsedUrl = new URL(req.query.url);
  
  if (blockedHosts.includes(parsedUrl.hostname)) {
    return res.status(403).send('Blocked');
  }
  
  // استخدام allowlist
  const response = await axios.get(req.query.url);
  res.send(response.data);
});`} />
      </VulnSection>

      <VulnSection title="طرق الحماية" icon="🛡️">
        <InfoBox type="success">
          <strong>1. قائمة المواقع المسموحة (Allowlist)</strong> - حدد فقط المواقع المسموح بها للوصول إليها
        </InfoBox>
        <ListItem>حدد قائمة بمواقع الويب المسموح بها</ListItem>
        <ListItem>رفض أي طلب إلى موقع غير مدرج في القائمة</ListItem>
        <ListItem>حدّث القائمة بشكل دوري</ListItem>

        <InfoBox type="success">
          <strong>2. تصفية DNS</strong> - تحقق من أن عنوان IP المُحلّل ليس عنواناً داخلياً
        </InfoBox>
        <ListItem>تحقق من أن IP المُحلّل ليس في النطاقات الخاصة</ListItem>
        <ListItem>استخدم مكتبات لتحليل عناوين IP</ListItem>

        <InfoBox type="success">
          <strong>3. تعطيل التحويلات</strong> - امنع الخادم من اتباع تحويلات HTTP
        </InfoBox>
        <ListItem>استخدم خيار follow_redirects: false</ListItem>
        <ListItem>تحقق من رؤوس Location يدوياً</ListItem>

        <InfoBox type="success">
          <strong>4. عزل الشبكة</strong> - افصل خدمات الويب عن الخدمات الداخلية
        </InfoBox>
        <ListItem>استخدم VLANs منفصلة</ListItem>
        <ListItem>قيّد الوصول بين الشبكات</ListItem>
      </VulnSection>

      <VulnSection title="نصائح أمنية" icon="💡">
        <InfoBox type="info">
          <strong>القاعدة الذهبية:</strong> لا تثق أبداً بمدخلات المستخدم عند تحديد عناوين URL
        </InfoBox>
        <ListItem>استخدم قائمة مواقع مسموحة (Allowlist) لعناوين URL</ListItem>
        <ListItem>تحقق من أن عنوان IP المُحلّل ليس داخلياً</ListItem>
        <ListItem>عطل التحويلات التلقائية</ListItem>
        <ListItem>عزل الخدمات الداخلية عن خدمات الويب</ListItem>
        <ListItem>استخدم الجدران النارية لتصفية حركة المرور</ListItem>
      </VulnSection>

      <VulnSection title="الأخطاء الشائعة" icon="⚠️">
        <InfoBox type="danger">
          <strong>❌ قبول أي عنوان URL من المستخدم</strong> - بدون تحقق، يمكن للمهاجم الوصول لأي عنوان
        </InfoBox>
        <InfoBox type="danger">
          <strong>❌ استخدام عنوان IP 127.0.0.1 فقط للتحقق</strong> - يمكن تجاوزه باستخدام ::1 أو 0
        </InfoBox>
        <InfoBox type="danger">
          <strong>❌ عدم تصفية المنافذ</strong> - يمكن للمهاجم الوصول لمنافذ داخلية غير مقصودة
        </InfoBox>
      </VulnSection>

      <section className="mb-6">
        <LabsSection slug="ssrf" />
      </section>

      <section className="mb-6">
        <ToolsSection slug="ssrf" />
      </section>

      <section className="mb-6">
        <Quiz slug="ssrf" />
        <VideoSection slug="ssrf" />
      </section>
    </VulnerabilityLayout>
  )
}
