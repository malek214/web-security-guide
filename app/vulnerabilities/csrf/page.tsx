import VulnerabilityLayout, { VulnSection, CodeBlock, InfoBox, ListItem } from '@/components/VulnerabilityLayout'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'
import ShareButtons from '@/components/ShareButtons'

export default function CSRFPage() {
  return (
    <VulnerabilityLayout
      icon="🎣"
      titleAr="تزوير الطلبات بين المواقع"
      titleEn="Cross-Site Request Forgery (CSRF)"
      severity="high"
      owasp="A1:2021"
    >
      <ShareButtons title="CSRF - تزوير الطلبات" url="https://web-security-guide.vercel.app/vulnerabilities/csrf" />

      <VulnSection title="تعريف CSRF" icon="📖">
        <p style={{ color: '#cccccc', fontSize: '14px', lineHeight: '1.8' }}>
          تزوير الطلبات بين المواقع (CSRF) هو ثغرة أمنية تسمح للمهاجم بإجبار متصفح المستخدم على إرسال طلب HTTP مزور إلى تطبيق ويب آخر دون علم المستخدم أو موافقته.
        </p>
        <p style={{ color: '#cccccc', fontSize: '14px', lineHeight: '1.8', marginTop: '8px' }}>
          يستغل المهاجم الثقة التي يوليها التطبيق لمصادقات المستخدم (مثل ملفات تعريف الارتباط الجلسة). عندما يزور المستخدم موقع المهاجم أو صفحة تحتوي على كود مغرض، يتم إرسال طلب تلقائي إلى التطبيق المستهدف باستخدام جلسة المستخدم الحالية.
        </p>
      </VulnSection>

      <VulnSection title="كيف تعمل هجمات CSRF" icon="🔍">
        <InfoBox type="info">
          <strong>خطوات الهجوم:</strong>
        </InfoBox>
        <ListItem>يلogue المستخدم إلى موقع الويب المستهدف (مثل البنك الإلكتروني)</ListItem>
        <ListItem>يخزّن المتصفح ملف تعريف الارتباط (Session Cookie) للصيانة</ListItem>
        <ListItem>يزور المستخدم موقع المهاجم أو صفحة تحتوي على كود مغرض</ListItem>
        <ListItem>يتم إرسال طلب HTTP مزور تلقائياً إلى الموقع المستهدف</ListItem>
        <ListItem>يرسل المتصفح ملف تعريف الارتباط مع الطلب تلقائياً</ListItem>
        <ListItem>يقبل الموقع الطلب لأنه يحمل ملف تعريف الارتباط الصحيح</ListItem>
      </VulnSection>

      <VulnSection title="أمثلة على الهجمات" icon="💻">
        <CodeBlock title="1. نموذج بنكي مخفي" code={`<!-- صفحة مغرضة تحتوي على نموذج مخفي -->
<html>
<body onload="document.getElementById('csrf-form').submit()">
  <form id="csrf-form" action="https://bank.com/transfer" method="POST">
    <input type="hidden" name="to" value="attacker-account" />
    <input type="hidden" name="amount" value="10000" />
  </form>
</body>
</html>`} />

        <CodeBlock title="2. صورة مغرضة" code={`<!-- استخدام وسم صورة لإرسال طلب GET مزور -->
<img src="https://bank.com/transfer?to=attacker&amount=10000"
     style="display:none" />`} />

        <CodeBlock title="3. JavaScript مخفي" code={`<!-- كود JavaScript مخفي في صفحة -->
<script>
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://bank.com/transfer", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("to=attacker&amount=10000");
</script>`} />
      </VulnSection>

      <VulnSection title="أمثلة كود مصاب ومحصن" icon="💻">
        <CodeBlock title="❌ كود مصاب - نموذج بدون حماية" variant="vulnerable" code={`<!-- نموذج تحويل بنكي بدون CSRF Token -->
<form action="/transfer" method="POST">
  <input type="text" name="to" placeholder="الحساب المستلم" />
  <input type="number" name="amount" placeholder="المبلغ" />
  <button type="submit">تحويل</button>
</form>`} />

        <CodeBlock title="✅ كود محصن - نموذج مع CSRF Token" variant="secure" code={`<!-- نموذج مع CSRF Token -->
<form action="/transfer" method="POST">
  <input type="hidden" name="_csrf" value="{{csrfToken}}" />
  <input type="text" name="to" placeholder="الحساب المستلم" />
  <input type="number" name="amount" placeholder="المبلغ" />
  <button type="submit">تحويل</button>
</form>

<!-- في الخادم (Node.js/Express) -->
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.get('/transfer', csrfProtection, (req, res) => {
  res.render('transfer', { csrfToken: req.csrfToken() });
});

app.post('/transfer', csrfProtection, (req, res) => {
  // يتم التحقق من CSRF Token تلقائياً
  // إذا كان الطلب مزوراً، سيرفض
});`} />
      </VulnSection>

      <VulnSection title="طرق الحماية" icon="🛡️">
        <InfoBox type="success">
          <strong>1. رموز CSRF (CSRF Tokens)</strong> - يتم إنشاء رمز فريد لكل جلسة أو طلب ويُرسل مع كل نموذج. يتحقق الخادم من صحة الرمز قبل معالجة الطلب.
        </InfoBox>
        <CodeBlock title="توليد CSRF Token في Node.js" code={`const crypto = require('crypto');

function generateCsrfToken() {
  return crypto.randomBytes(32).toString('hex');
}

// تخزين الرمز في الجلسة
req.session.csrfToken = generateCsrfToken();

// التحقق من الرمز في الطلبات POST
function verifyCsrfToken(req, res, next) {
  const token = req.body._csrf || req.headers['x-csrf-token'];
  if (!token || token !== req.session.csrfToken) {
    return res.status(403).json({ error: 'CSRF token invalid' });
  }
  next();
}`} />

        <InfoBox type="success">
          <strong>2. SameSite Cookies</strong> - تحدد الخاصية SameSite متى يتم إرسال ملفات تعريف الارتباط. القيمة &quot;Strict&quot; تمنع الإرسال في الطلبات بين المواقع.
        </InfoBox>
        <CodeBlock title="إعداد SameSite Cookie في Node.js" code={`res.cookie('sessionId', sessionId, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',  // يمنع إرسال الكوكيز في الطلبات بين المواقع
  maxAge: 24 * 60 * 60 * 1000
});

// في Python/Django
SESSION_COOKIE_SAMESITE = 'Strict'
CSRF_COOKIE_SAMESITE = 'Strict'`} />

        <InfoBox type="success">
          <strong>3. التحقق من رؤوس Origin و Referer</strong> - تحقق من رؤوس HTTP للتأكد من أن الطلب قادم من مصدر موثوق.
        </InfoBox>
        <CodeBlock title="التحقق من Origin و Referer في Node.js" code={`function checkOrigin(req, res, next) {
  const origin = req.headers.origin || req.headers.referer;
  const allowedOrigins = ['https://yourdomain.com'];
  
  if (!origin || !allowedOrigins.some(o => origin.startsWith(o))) {
    return res.status(403).json({ error: 'Invalid origin' });
  }
  next();
}

// استخدام مع Express
app.use('/api', checkOrigin, apiRoutes);`} />

        <InfoBox type="success">
          <strong>4. المصادقة الثنائية (2FA) للعمليات الحساسة</strong> - تتطلب المصادقة الثنائية للمعاملات المالية أو تغييرات الحساب، مما يضيف طبقة حماية إضافية.
        </InfoBox>
      </VulnSection>

      <VulnSection title="نصائح أمنية" icon="💡">
        <InfoBox type="info">
          <strong>القاعدة الذهبية:</strong> استخدم CSRF Token في جميع النماذج
        </InfoBox>
        <ListItem>فعّل SameSite=Strict على جميع الكوكيز الحساسة</ListItem>
        <ListItem>استخدم POST بدلاً من GET للعمليات الحساسة</ListItem>
        <ListItem>تحقق من رؤوس Origin و Referer في الطلبات المهمة</ListItem>
        <ListItem>أضف المصادقة الثنائية للعمليات المالية</ListItem>
      </VulnSection>

      <VulnSection title="الأخطاء الشائعة" icon="⚠️">
        <InfoBox type="danger">
          <strong>❌ استخدام GET للعمليات المالية</strong> - طلبات GET يمكن حقنها بسهولة في صفحات مغرضة
        </InfoBox>
        <InfoBox type="danger">
          <strong>❌ عدم استخدام CSRF Token</strong> - بدون CSRF Token، النماذج معرضة للتزوير بسهولة
        </InfoBox>
        <InfoBox type="danger">
          <strong>❌ استخدام SameSite=None</strong> - يسمح بإرسال الكوكيز في الطلبات بين المواقع
        </InfoBox>
      </VulnSection>

      <section className="mb-6">
        <LabsSection slug="csrf" />
      </section>

      <section className="mb-6">
        <ToolsSection slug="csrf" />
      </section>

      <section className="mb-6">
        <Quiz slug="csrf" />
        <VideoSection slug="csrf" />
      </section>
    </VulnerabilityLayout>
  )
}
