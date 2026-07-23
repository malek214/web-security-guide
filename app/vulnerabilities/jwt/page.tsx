'use client'
import VulnerabilityLayout, { VulnSection, CodeBlock, InfoBox, ListItem } from '@/components/VulnerabilityLayout'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'
import ShareButtons from '@/components/ShareButtons'

export default function JWTPage() {
  return (
    <VulnerabilityLayout
      icon="🎫"
      titleAr="ثغرات JWT"
      titleEn="JSON Web Token (JWT) Vulnerabilities"
      severity="high"
      owasp="A2:2017"
    >
      <ShareButtons title="JWT - ثغرات JSON Web Token" url="https://web-security-guide.vercel.app/vulnerabilities/jwt" />

      <VulnSection title="تعريف JWT" icon="📖">
        <p style={{ color: '#cccccc', fontSize: '14px', lineHeight: '1.8' }}>
          JWT (JSON Web Token) هو معيار مفتوح لنقل البيانات بين جهتين بشكل آمن. يتكون من ثلاثة أجزاء: Header، Payload، وSignature.
        </p>
        <p style={{ color: '#cccccc', fontSize: '14px', lineHeight: '1.8', marginTop: '8px' }}>
          رغم أن JWT آمن بشكل عام، إلا أنthere are several vulnerabilities that can be exploited if not implemented correctly.
        </p>
      </VulnSection>

      <VulnSection title="أنواع ثغرات JWT" icon="🔍">
        <InfoBox type="warning">
          <strong>1.alg:none attack</strong> - تغيير خوارزمية التوقيع إلى none
        </InfoBox>
        <CodeBlock title="مثال على alg:none attack" code={`// JWT الأصلي
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWRtaW4ifQ.signature

// المهاجم يغير Header
eyJhbGciOiJub25lIiwiYWxnIjoiTk9ORSJ9.eyJ1c2VyIjoiYWRtaW4ifQ.

// النتيجة: يتم قبول JWT بدون توقيع`} />

        <InfoBox type="danger">
          <strong>2. Algorithm Confusion</strong> - خداع الخادم باستخدام خوارزمية مختلفة
        </InfoBox>
        <CodeBlock title="مثال على Algorithm Confusion" code={`// الخادم يستخدم HMAC مع مفتاح سري
// المهاجم يستخدم RSA مع المفتاح العام

// 1. يحصل المهاجم على المفتاح العام للخادم
// 2. يستخدمه كمفتاح HMAC لتوقيع JWT
// 3. الخادم يتحقق بالمفتاح العام (الذي يعرفه المهاجم)

// النتيجة: يتهم المهاجم JWT صالح`} />

        <InfoBox type="warning">
          <strong>3. Weak Secret</strong> - تخمين المفتاح السري
        </InfoBox>
        <CodeBlock title="مثال على هجوم Weak Secret" code={`# استخدام John the Ripper لتخمين المفتاح
john jwt.txt --wordlist=wordlist.txt --format=HMAC-SHA256

# أو باستخدام hashcat
hashcat -m 16500 jwt.txt wordlist.txt

# إذا كان المفتاح ضعيفاً، سيتم تخمينه بسرعة`} />
      </VulnSection>

      <VulnSection title="أمثلة على الهجمات" icon="💻">
        <CodeBlock title="1. تزوير JWT" code={`# المهاجم يحصل على JWT صالح
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWRtaW4ifQ.xxx

# يفك تشفيره ويغير القيمة
{"user": "admin"} → {"user": "superadmin"}

# يوقعه بنفس المفتاح (إذا كان ضعيفاً)
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiY29udHJvbGxlciJ9.xxx`} />

        <CodeBlock title="2. Replay Attack" code={`# المهاجم يحصل على JWT صالح
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWRtaW4ifQ.xxx

# يستخدمه عدة مرات
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.xxx

# النتيجة: استخدام JWT حتى بعد انتهاء صلاحيته`} />

        <CodeBlock title="3. JWT Injection" code={`# حقن payload إضافي
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4ifQ.xxx

# النتيجة: إضافة صلاحيات غير مصرح بها`} />
      </VulnSection>

      <VulnSection title="أمثلة كود مصاب ومحصن" icon="💻">
        <CodeBlock title="❌ كود مصاب" variant="vulnerable" code={`// JavaScript - كود مصاب
const jwt = require('jsonwebtoken');

// استخدام مفتاح ضعيف
const token = jwt.sign({ user: 'admin' }, 'secret123');

// التحقق بدون تحقق من alg
jwt.verify(token, 'secret123');

// قبول أي alg
jwt.verify(token, 'secret123', { algorithms: ['HS256', 'none'] });`} />

        <CodeBlock title="✅ كود محصن" variant="secure" code={`// JavaScript - كود محصن
const jwt = require('jsonwebtoken');

// استخدام مفتاح قوي عشوائي
const secret = require('crypto').randomBytes(64).toString('hex');
const token = jwt.sign({ user: 'admin' }, secret, { algorithm: 'HS256' });

// التحقق مع تحديد alg صارم
jwt.verify(token, secret, { algorithms: ['HS256'] });

// إضافة تاريخ انتهاء الصلاحية
const token = jwt.sign(
  { user: 'admin', exp: Math.floor(Date.now() / 1000) + 3600 },
  secret,
  { algorithm: 'HS256' }
);

// التحقق من الانتهاء
jwt.verify(token, secret, { algorithms: ['HS256'] }, (err, decoded) => {
  if (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).send('Token expired');
    }
    return res.status(401).send('Invalid token');
  }
  req.user = decoded;
});`} />
      </VulnSection>

      <VulnSection title="طرق الحماية" icon="🛡️">
        <InfoBox type="success">
          <strong>1. تحديد الخوارزمية</strong> - حدد الخوارزمية يدوياً ولا تعتمد على Header
        </InfoBox>
        <ListItem>حدد algoritms في jwt.verify()</ListItem>
        <ListItem>لا تقبل alg: none أبداً</ListItem>
        <ListItem>استخدم خوارزمية واحدة فقط</ListItem>

        <InfoBox type="success">
          <strong>2. استخدام مفتاح قوي</strong> - استخدم مفتاح طويل ومعقد
        </InfoBox>
        <ListItem>استخدم مفتاح عشوائي بطول 256 بت على الأقل</ListItem>
        <ListItem>لا تستخدم كلمات مرور بسيطة</ListItem>
        <ListItem>احفظ المفتاح في متغيرات البيئة</ListItem>

        <InfoBox type="success">
          <strong>3. انتهاء الصلاحية</strong> - أضف exp claim لكل JWT
        </InfoBox>
        <ListItem>حدد مدة صلاحية قصيرة (ساعة واحدة)</ListItem>
        <ListItem>استخدم refresh tokens للجلسات الطويلة</ListItem>
        <ListItem>تحقق من exp دائماً</ListItem>

        <InfoBox type="success">
          <strong>4. إصدار JWT (iss) والجمهور (aud)</strong> - أضف iss و aud claims
        </InfoBox>
        <CodeBlock title="مثال على iss و aud" code={`// الإصدار
const token = jwt.sign(
  { user: 'admin', iss: 'your-app', aud: 'your-api' },
  secret
);

// التحقق
jwt.verify(token, secret, {
  algorithms: ['HS256'],
  issuer: 'your-app',
  audience: 'your-api'
});`} />
      </VulnSection>

      <VulnSection title="نصائح أمنية" icon="💡">
        <InfoBox type="info">
          <strong>القاعدة الذهبية:</strong> حدد الخوارزمية دائماً ولا تعتمد على Header
        </InfoBox>
        <ListItem>استخدم مفتاح قوي وطويل</ListItem>
        <ListItem>حدد algorithms في jwt.verify()</ListItem>
        <ListItem>أضف انتهاء الصلاحية لكل JWT</ListItem>
        <ListItem>تحقق من iss و aud claims</ListItem>
        <ListItem>راجع الكود بحثاً عن استخدامات JWT</ListItem>
      </VulnSection>

      <VulnSection title="الأخطاء الشائعة" icon="⚠️">
        <InfoBox type="danger">
          <strong>❌ قبول alg: none</strong> - هذا يسمح بتوثيق JWT بدون مفتاح
        </InfoBox>
        <InfoBox type="danger">
          <strong>❌ استخدام مفتاح ضعيف</strong> - يمكن تخمينه بسهولة
        </InfoBox>
        <InfoBox type="danger">
          <strong>❌ عدم التحقق من انتهاء الصلاحية</strong> - يمكن استخدام JWT لفترة غير محدودة
        </InfoBox>
      </VulnSection>

      <section className="mb-6">
        <LabsSection slug="jwt" />
      </section>

      <section className="mb-6">
        <ToolsSection slug="jwt" />
      </section>

      <section className="mb-6">
        <Quiz slug="jwt" />
        <VideoSection slug="jwt" />
      </section>
    </VulnerabilityLayout>
  )
}
