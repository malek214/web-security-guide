import type { Metadata } from 'next'
import VulnerabilityLayout, { VulnSection, CodeBlock, InfoBox, ListItem } from '@/components/VulnerabilityLayout'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import Quiz from '@/components/Quiz'
import ShareButtons from '@/components/ShareButtons'
import LabsSection from '@/components/LabsSection'

export const metadata: Metadata = {
  title: 'حقن SQL - SQL Injection | دليل أمان الويب',
  description: 'شرح شامل لثغرة SQL Injection مع أمثلة عملية وكود آمن ومضاد.',
}

export default function SqlInjectionPage() {
  return (
    <VulnerabilityLayout icon="💉" titleAr="حقن SQL" titleEn="SQL Injection" severity="critical" owasp="A03:2021">
      <div className="mb-6">
        <ShareButtons title="حقن SQL - SQL Injection" url="https://web-security-guide.vercel.app/vulnerabilities/sql-injection" />
      </div>

      <VulnSection title="تعريف حقن SQL" icon="📖">
        <p style={{ color: '#cccccc', fontSize: '14px', lineHeight: '1.8' }}>
          حقن SQL (SQL Injection) هو ثغرة أمنية تسمح للمهاجم بحقن أكواد SQL ضارة في استعلامات قاعدة البيانات عبر مدخلات المستخدم غير المُصحّحة. عندما تقوم تطبيقات الويب بدمج مدخلات المستخدم مباشرة في استعلامات SQL دون تحقق أو تنقية، يمكن للمهاجم التلاعب بالاستعلام ليتم تنفيذ أوامر غير مقصودة.
        </p>
        <div className="mt-4">
          <InfoBox type="danger">
            <strong>التأثير:</strong> سرقة جميع البيانات، حذف قاعدة البيانات، تجاوز المصادقة، تنفيذ أوامر نظام.
          </InfoBox>
        </div>
      </VulnSection>

      <VulnSection title="أنواع حقن SQL" icon="🔍">
        <div className="space-y-4">
          <div>
            <h4 style={{ color: '#cccccc', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>1. In-band SQL Injection (المباشر)</h4>
            <p style={{ color: '#858585', fontSize: '13px', marginBottom: '8px' }}>يستخدم المهاجم نفس القناة لإطلاق الهجوم واستلام النتائج.</p>
            <CodeBlock title="Union-based Injection" code={`-- الاستعلام الأصلي:
SELECT name, price FROM products WHERE id = 1

-- الاستعلام المحقون:
SELECT name, price FROM products WHERE id = 1 
UNION SELECT username, password FROM users--`} />
            <CodeBlock title="Error-based Injection" code={`-- إذا أعاد الخادم رسالة خطأ مفصلة:
SELECT * FROM users WHERE id = 1 
AND 1=CONVERT(int, (SELECT TOP 1 table_name 
FROM information_schema.tables))--`} />
          </div>

          <div>
            <h4 style={{ color: '#cccccc', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>2. Blind SQL Injection (الأعمى)</h4>
            <p style={{ color: '#858585', fontSize: '13px', marginBottom: '8px' }}>لا يحصل المهاجم على نتائج مباشرة، بل يستنتج المعلومات من سلوك النظام.</p>
            <CodeBlock title="Boolean-based Blind" code={`-- إذا كان الحرف الأول من كلمة المرور = 'a':
SELECT * FROM users WHERE id = 1 
AND SUBSTRING(password, 1, 1) = 'a'

-- عادية = نعم، خطأ = لا`} />
            <CodeBlock title="Time-based Blind" code={`-- إذا تأخر الرد 5 ثوانٍ = نعم:
SELECT * FROM users WHERE id = 1 
AND IF(SUBSTRING(password, 1, 1) = 'a', SLEEP(5), 0)`} />
          </div>

          <div>
            <h4 style={{ color: '#cccccc', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>3. Out-of-band Injection (خارج النطاق)</h4>
            <p style={{ color: '#858585', fontSize: '13px' }}>يستخدم قنوات خارجية لاستخراج البيانات مثل DNS exfiltration و HTTP exfiltration.</p>
          </div>
        </div>
      </VulnSection>

      <VulnSection title="أمثلة عملية على الأكواد" icon="💻">
        <h4 style={{ color: '#cccccc', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>مثال 1: صفحة تسجيل دخول</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <CodeBlock title="❌ كود ضعيف - PHP" variant="vulnerable" code={`$username = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM users 
          WHERE username = '$username' 
          AND password = '$password'";

$result = mysqli_query($conn, $query);`} />
          <CodeBlock title="✅ كود آمن - PHP" variant="secure" code={`$username = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM users 
          WHERE username = ? 
          AND password = ?";

$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "ss", 
    $username, $password);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);`} />
        </div>

        <h4 style={{ color: '#cccccc', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>مثال 2: صفحة بحث - Node.js</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <CodeBlock title="❌ كود ضعيف" variant="vulnerable" code={`const searchTerm = req.query.q;

const query = \`
  SELECT * FROM products 
  WHERE name LIKE '%\${searchTerm}%'
\`;

const results = await db.query(query);`} />
          <CodeBlock title="✅ كود آمن" variant="secure" code={`const searchTerm = req.query.q;

const query = \`
  SELECT * FROM products 
  WHERE name LIKE ?
\`;

const results = await db.query(
  query, [\`%\${searchTerm}%\`]
);`} />
        </div>

        <h4 style={{ color: '#cccccc', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>مثال 3: Python مع SQLAlchemy</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CodeBlock title="❌ كود ضعيف" variant="vulnerable" code={`user_id = request.args.get('id')

query = f"SELECT * FROM users WHERE id = {user_id}"
cursor.execute(query)`} />
          <CodeBlock title="✅ كود آمن" variant="secure" code={`user_id = request.args.get('id')

query = "SELECT * FROM users WHERE id = %s"
cursor.execute(query, (user_id,))`} />
        </div>
      </VulnSection>

      <VulnSection title="كيف تكتشف ثغرة SQL Injection" icon="🔎">
        <h4 style={{ color: '#cccccc', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>علامات وجود الثغرة</h4>
        <ListItem>رسائل خطأ SQL واضحة عند إدخال بيانات غير متوقعة</ListItem>
        <ListItem>تغير سلوك التطبيق عند تغيير المدخلات</ListItem>
        <ListItem>تأخر غير عادي في استجابة الخادم</ListItem>
        <ListItem>ظهور بيانات حساسة في رسائل الخطأ</ListItem>

        <h4 style={{ color: '#cccccc', fontSize: '13px', fontWeight: 'bold', marginTop: '16px', marginBottom: '8px' }}>حركات اختبار شائعة</h4>
        <CodeBlock code={`'               -- علامة اقتباس لاختبار وجود خطأ
OR 1=1          -- شرط دائماً صحيح
OR 1=2          -- شرط دائماً خاطئ
--              -- تعليق لاختبار تعليق باقي الاستعلام
UNION SELECT NULL--  -- لاختبار إمكانية الدمج`} />

        <h4 style={{ color: '#cccccc', fontSize: '13px', fontWeight: 'bold', marginTop: '16px', marginBottom: '8px' }}>أدوات الاكتشاف</h4>
        <ListItem><strong>SQLMap:</strong> أداة آلية لاكتشاف واستغلال ثغرات SQL Injection</ListItem>
        <ListItem><strong>Burp Suite:</strong> منصة شاملة لاختبار أمن التطبيقات</ListItem>
        <ListItem><strong>OWASP ZAP:</strong> أداة مجانية لفحص ثغرات المواقع</ListItem>

        <InfoBox type="info">
          <strong>مثال باستخدام SQLMap:</strong><br />
          sqlmap -u &quot;http://example.com/page?id=1&quot; --dbs<br />
          sqlmap -u &quot;http://example.com/page?id=1&quot; -D mydb --tables<br />
          sqlmap -u &quot;http://example.com/page?id=1&quot; -D mydb -T users --dump
        </InfoBox>
      </VulnSection>

      <VulnSection title="كيف تمنع ثغرة SQL Injection" icon="🛡️">
        <div className="space-y-4">
          <InfoBox type="success">
            <strong>القاعدة الذهبية:</strong> لا تثق أبداً في مدخلات المستخدم. جميع المدخلات يجب أن تُ considered ضارة حتىثبت العكس.
          </InfoBox>

          <div>
            <h4 style={{ color: '#4ec9b0', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>1. استخدام Prepared Statements</h4>
            <CodeBlock variant="secure" code={`// JavaScript مع MySQL2
const [rows] = await connection.execute(
  'SELECT * FROM users WHERE email = ? AND status = ?',
  [email, status]
);

// Python مع psycopg2
cursor.execute(
  "SELECT * FROM users WHERE email = %s AND status = %s",
  (email, status)
);`} />
          </div>

          <div>
            <h4 style={{ color: '#4ec9b0', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>2. استخدام ORM</h4>
            <CodeBlock variant="secure" code={`// Prisma (TypeScript)
const user = await prisma.user.findFirst({
  where: { email: userEmail, status: 'active' }
});

// SQLAlchemy (Python)
user = session.query(User).filter(
    User.email == email,
    User.status == 'active'
).first()`} />
          </div>

          <div>
            <h4 style={{ color: '#4ec9b0', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>3. تنقية المدخلات</h4>
            <ListItem>التحقق من نوع البيانات (رقم، نص، إلخ)</ListItem>
            <ListItem>تحديد طول المدخلات</ListItem>
            <ListItem>السماح فقط بالأنماط المقبولة (whitelist validation)</ListItem>
          </div>

          <div>
            <h4 style={{ color: '#4ec9b0', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>4. تطبيق مبدأ الصلاحية الأدنى</h4>
            <ListItem>لا تستخدم حساب root أو admin في الاتصال بقاعدة البيانات</ListItem>
            <ListItem>أنشئ حساب خاص بالتطبيق بصلاحيات محدودة</ListItem>
            <ListItem>امنع صلاحيات DROP و DELETE غير الضرورية</ListItem>
          </div>

          <div>
            <h4 style={{ color: '#4ec9b0', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>5. التعامل مع رسائل الخطأ</h4>
            <ListItem>لا تُظهر رسائل خطأ SQL مفصلة للمستخدمين</ListItem>
            <ListItem>استخدم رسائل خطأ عامة مثل &quot;حدث خطأ&quot;</ListItem>
            <ListItem>سجّل الأخطاء التفصيلية في ملفات السجل الخاصة بالخادم</ListItem>
          </div>
        </div>
      </VulnSection>

      <VulnSection title="الأخطاء الشائعة" icon="⚠️">
        <InfoBox type="danger">
          <strong>دمج المدخلات في الاستعلام</strong> - استخدام string concatenation أو template literals لدمج المدخلات مباشرة في الاستعلام.
        </InfoBox>
        <InfoBox type="danger">
          <strong>استخدام مكتبات SQL القديمة</strong> - استخدام مكتبات قديمة مثل mysql في PHP بدلاً من mysqli أو PDO.
        </InfoBox>
        <InfoBox type="danger">
          <strong>عرض رسائل الخطأ التفصيلية</strong> - إظهار رسائل خطأ SQL للمستخدمين تساعد المهاجمين في فهم هيكل قاعدة البيانات.
        </InfoBox>
        <InfoBox type="danger">
          <strong>الاعتماد فقط على Client-side Validation</strong> - التحقق من صحة المدخلات في الجهة العميلة فقط يمكن تجاوزه بسهولة.
        </InfoBox>
      </VulnSection>

      <VulnSection title="تأثير الثغرة" icon="📊">
        <div className="grid grid-cols-3 gap-3">
          <div style={{ background: '#1e1e1e', border: '1px solid #f44747', borderRadius: '4px', padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>🔴</div>
            <div style={{ color: '#f44747', fontSize: '12px', fontWeight: 'bold' }}>السرية</div>
            <div style={{ color: '#858585', fontSize: '11px' }}>مرتفع جداً</div>
          </div>
          <div style={{ background: '#1e1e1e', border: '1px solid #f44747', borderRadius: '4px', padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>🔴</div>
            <div style={{ color: '#f44747', fontSize: '12px', fontWeight: 'bold' }}>النزاهة</div>
            <div style={{ color: '#858585', fontSize: '11px' }}>مرتفع جداً</div>
          </div>
          <div style={{ background: '#1e1e1e', border: '1px solid #f44747', borderRadius: '4px', padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>🔴</div>
            <div style={{ color: '#f44747', fontSize: '12px', fontWeight: 'bold' }}>التوفر</div>
            <div style={{ color: '#858585', fontSize: '11px' }}>مرتفع</div>
          </div>
        </div>
      </VulnSection>

      <section className="mb-6"><LabsSection slug="sql-injection" /></section>
      <section className="mb-6"><ToolsSection slug="sql-injection" /></section>
      <section className="mb-6"><VideoSection slug="sql-injection" /></section>
      <section className="mb-6"><Quiz slug="sql-injection" /></section>
    </VulnerabilityLayout>
  )
}
