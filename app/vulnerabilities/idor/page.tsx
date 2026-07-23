'use client'
import VulnerabilityLayout, { VulnSection, CodeBlock, InfoBox, ListItem } from '@/components/VulnerabilityLayout'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'
import ShareButtons from '@/components/ShareButtons'

export default function IDORPage() {
  return (
    <VulnerabilityLayout
      icon="🔑"
      titleAr="الوصول غير المصرح به للموارد"
      titleEn="Insecure Direct Object References (IDOR)"
      severity="high"
      owasp="A1:2013"
    >
      <ShareButtons title="IDOR - الوصول غير المصرح به" url="https://web-security-guide.vercel.app/vulnerabilities/idor" />

      <VulnSection title="تعريف IDOR" icon="📖">
        <p style={{ color: '#cccccc', fontSize: '14px', lineHeight: '1.8' }}>
          الوصول غير المصرح به للموارد (IDOR) هو ثغرة أمنية تسمح للمهاجم بالوصول إلى موارد (مثل ملفات أو بيانات) عن طريق تغيير مُعرّف الكائن في الطلب.
        </p>
        <p style={{ color: '#cccccc', fontSize: '14px', lineHeight: '1.8', marginTop: '8px' }}>
          تحدث الثغرة عندما يعتمد التطبيق على مُعرّفات المستخدم مباشرة في الطلبات دون التحقق من الصلاحيات.
        </p>
      </VulnSection>

      <VulnSection title="كيف يعمل IDOR" icon="🔍">
        <InfoBox type="info">
          <strong>آلية العمل:</strong>
        </InfoBox>
        <ListItem>يلogue المستخدم إلى حسابه</ListItem>
        <ListItem>يقوم بطلب ملف خاص (مثل /download?file=123)</ListItem>
        <ListItem>يكتشف المهاجم أن المُعرّف يعتمد على رقم تسلسلي</ListItem>
        <ListItem>يقوم بتغيير المُعرّف للوصول لملفات المستخدمين الآخرين</ListItem>
      </VulnSection>

      <VulnSection title="أنواع IDOR" icon="🔍">
        <InfoBox type="warning">
          <strong>1. IDOR في URL</strong> - تغيير المُعرّف في عنوان URL
        </InfoBox>
        <CodeBlock title="مثال على IDOR في URL" code={`// طلب المستخدم الأول
GET /profile?id=123

// المهاجم يغير المُعرّف
GET /profile?id=456

// النتيجة: عرض ملف تعريف المستخدم 456`} />

        <InfoBox type="warning">
          <strong>2. IDOR في POST data</strong> - تغيير المُعرّف في بيانات الطلب
        </InfoBox>
        <CodeBlock title="مثال على IDOR في POST" code={`// نموذج تعديل الملف الشخصي
POST /profile/update
user_id=123&name=John

// المهاجم يغير المُعرّف
POST /profile/update
user_id=456&name=Hacker

// النتيجة: تعديل ملف تعريف المستخدم 456`} />

        <InfoBox type="danger">
          <strong>3. IDOR في API</strong> - تغيير المُعرّف في واجهات برمجة التطبيقات
        </InfoBox>
        <CodeBlock title="مثال على IDOR في API" code={`// API endpoint
GET /api/users/123/documents

// المهاجم يغير المُعرّف
GET /api/users/456/documents

// النتيجة: عرض مستندات المستخدم 456`} />
      </VulnSection>

      <VulnSection title="أمثلة على الهجمات" icon="💻">
        <CodeBlock title="1. سرقة بيانات المستخدمين" code={`// سرقة الملفات الشخصية
GET /api/user/456/profile

// سرقة المستندات
GET /api/user/456/documents

// سرقة المعاملات المالية
GET /api/user/456/transactions`} />

        <CodeBlock title="2. تعديل البيانات" code={`// تعديل الملف الشخصي
PUT /api/user/456
{"name": "Hacker", "email": "hacker@evil.com"}

// تغيير كلمة المرور
POST /api/user/456/password
{"password": "newpassword123"}`} />

        <CodeBlock title="3. حذف البيانات" code={`// حذف الملف الشخصي
DELETE /api/user/456

// حذف المستندات
DELETE /api/user/456/documents/789`} />
      </VulnSection>

      <VulnSection title="أمثلة كود مصاب ومحصن" icon="💻">
        <CodeBlock title="❌ كود مصاب" variant="vulnerable" code={`// PHP - كود مصاب
$user_id = $_GET['id'];
$query = "SELECT * FROM users WHERE id = $user_id";
$result = mysqli_query($conn, $query);

// Python - كود مصاب
user_id = request.args.get('id')
user = User.query.get(user_id)

// Node.js - كود مصاب
app.get('/user/:id', (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});`} />

        <CodeBlock title="✅ كود محصن" variant="secure" code={`// PHP - كود محصن
$user_id = $_GET['id'];
// التحقق من أن المستخدم يطلب بياناته فقط
if ($user_id != $_SESSION['user_id']) {
  die('Unauthorized');
}
$query = "SELECT * FROM users WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();

// Python - كود محصن
user_id = request.args.get('id')
if int(user_id) != current_user.id:
    return 'Unauthorized', 403
user = User.query.get(user_id)

// Node.js - كود محصن
app.get('/user/:id', authenticate, (req, res) => {
  if (req.params.id !== req.user.id) {
    return res.status(403).send('Unauthorized');
  }
  const user = await User.findById(req.params.id);
  res.json(user);
});`} />
      </VulnSection>

      <VulnSection title="طرق الحماية" icon="🛡️">
        <InfoBox type="success">
          <strong>1. التحقق من الصلاحيات</strong> - تأكد من أن المستخدم مصرح له بالوصول للمورد
        </InfoBox>
        <ListItem>تحقق من أن المستخدم يطلب بياناته فقط</ListItem>
        <li>استخدم مُعرّفات غير قابلة للتخمين (UUIDs)</li>
        <li>طبّق سياسة الوصول القليل (Least Privilege)</li>

        <InfoBox type="success">
          <strong>2. استخدام مُعرّفات غير تسلسلية</strong> - استخدم UUIDs بدلاً من الأرقام التسلسلية
        </InfoBox>
        <CodeBlock title="مثال على استخدام UUIDs" code={`// بدلاً من:
GET /api/users/123

// استخدم:
GET /api/users/550e8400-e29b-41d4-a716-446655440000

// UUID عشوائي ويصعب تخمينه`} />

        <InfoBox type="success">
          <strong>3. استخدام أنماط آمنة</strong> - استخدم أنماط مثل /api/me بدلاً من /api/users/:id
        </InfoBox>
        <CodeBlock title="مثال على الأنماط الآمنة" code={`// بدلاً من:
GET /api/users/123/documents

// استخدم:
GET /api/me/documents

// أو
GET /api/current-user/documents`} />
      </VulnSection>

      <VulnSection title="نصائح أمنية" icon="💡">
        <InfoBox type="info">
          <strong>القاعدة الذهبية:</strong> تحقق دائماً من صلاحيات المستخدم قبل الوصول للموارد
        </InfoBox>
        <ListItem>لا تعتمد على مُعرّفات تسلسلية يمكن تخمينها</ListItem>
        <ListItem>تحقق من الصلاحيات في كل طلب</ListItem>
        <ListItem>استخدم UUIDs للمُعرّفات</ListItem>
        <ListItem>طبّق سياسة الوصول القليل</ListItem>
        <ListItem>راجع الكود بحثاً عن استخدامات مُعرّفات المستخدم مباشرة</ListItem>
      </VulnSection>

      <VulnSection title="الأخطاء الشائعة" icon="⚠️">
        <InfoBox type="danger">
          <strong>❌ استخدام أرقام تسلسلية للمُعرّفات</strong> - يمكن تخمينها بسهولة
        </InfoBox>
        <InfoBox type="danger">
          <strong>❌ عدم التحقق من الصلاحيات</strong> - أي مستخدم يمكنه الوصول لأي مورد
        </InfoBox>
        <InfoBox type="danger">
          <strong>❌ الاعتماد على المُعرّف فقط للتحقق</strong> - المُعرّف ليس دليلاً على الصلاحيات
        </InfoBox>
      </VulnSection>

      <section className="mb-6">
        <LabsSection slug="idor" />
      </section>

      <section className="mb-6">
        <ToolsSection slug="idor" />
      </section>

      <section className="mb-6">
        <Quiz slug="idor" />
        <VideoSection slug="idor" />
      </section>
    </VulnerabilityLayout>
  )
}
