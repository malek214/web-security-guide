import Link from 'next/link'

export default function InsecureDeserializationPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x1F504;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">عدم آمان إعادة التحويل</h1>
            <p className="text-xl text-gray-500 mt-1">Insecure Deserialization</p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <p className="text-danger-700 font-semibold mb-0">
            &#x26A0; مستوى الخطورة: عالي جداً
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">تعريف عدم آمان إعادة التحويل</h2>
        <p>
          عدم آمان إعادة التحويل (Insecure Deserialization) هي ثغرة أمنية تحدث عندما يتم تحويل بيانات مشفرة (serialized) إلى كائنات أو كيانات قابلة للاستخدام مباشرة (deserialized) بدون فحص أو تحقق كافٍ. يمكن للمهاجم استغلال هذه الثغرة لتنفيذ أكواد عbitrary أو تعديل الكائنات أو تغيير سلوك التطبيق.
        </p>
        <p>
          التحويل (Serialization) هو عملية تحويل الكائنات إلى صيغة قابلة للتخزين أو النقل، وإعادة التحويل (Deserialization) هي العملية العكسية. عندما يتم إعادة التحويل بشكل غير آمن، قد يؤدي ذلك إلى ثغرات خطيرة تسمح بتنفيذ أكواد عن بُعد (Remote Code Execution - RCE).
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أنواع إعادة التحويل غير الآمنة</h2>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">1. Java Deserialization</h3>
          <p>
            تحدث ثغرة إعادة التحويل في Java عندما يتم تحويل كائنات Java إلى صيغة ثنائية (binary) ثم إعادة تحويلها بدون تحقق من السلامة. يمكن للمهاجم إنشاء كائن ضار ينفذ أكواد عند إعادة التحويل.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`// كود مصاب في Java
ObjectInputStream ois = new ObjectInputStream(inputStream);
Object obj = ois.readObject(); // إعادة التحويل بدون تحقق

// مثال على هجوم Java Deserialization
// يستخدم gadget chain للتنفيذ التعسفي
public class MaliciousClass implements Serializable {
    private void readObject(ObjectInputStream ois) throws Exception {
        ois.defaultReadObject();
        Runtime.getRuntime().exec("malicious_command");
    }
}`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">2. PHP Object Injection</h3>
          <p>
            يحدث عندما يتم تمرير بيانات مخزنة من المستخدم إلى دالة unserialize() في PHP. يمكن للمهاجم التلاعب بالبيانات لإنشاء كائنات ضارة تؤدي إلى تنفيذ أكواد عbitrary أو SQL Injection أو File Inclusion.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`// كود مصاب في PHP
class User {
    public $name;
    public $isAdmin = false;
    
    public function __wakeup() {
        // يُنفَّذ عند إعادة التحويل
        $this->updateLastLogin();
    }
}

// استقبال بيانات من المستخدم وتحويلها
$user = unserialize($_COOKIE['user_data']);

// مثال على هجوم PHP Object Injection
// من خلال تزوير الكائن
$payload = 'O:4:"User":2:{s:4:"name";s:5:"admin";s:7:"isAdmin";b:1;}';
setcookie('user_data', $payload);`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">3. Python Pickle</h3>
          <p>
            مكتبة pickle في Python غير آمنة عند التعامل مع بيانات من مصادر غير موثوقة. يمكن للمهاجم إنشاء بيانات pickled ضارة ت executing أكواد عند التفريغ (unpickling).
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`# كود مصاب في Python
import pickle

# تحميل بيانات من المستخدم
data = request.get_json()
user_data = pickle.loads(data['serialized_data'])

# مثال على هجوم Python Pickle
import os
import pickle

class MaliciousPickle:
    def __reduce__(self):
        return (os.system, ('echo "Hacked!"',))

# إنشاء بيانات ضارة
malicious_data = pickle.dumps(MaliciousPickle())

# عند التفريغ، سيتم تنفيذ الأمر
pickle.loads(malicious_data)  # ينفِّذ: echo "Hacked!"`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">4. .NET ViewState</h3>
          <p>
            ViewState في ASP.NET هو آلية لتخزين حالة الصفحة بين الطلبات. إذا لم يتم تشفير أو التوقيع بشكل صحيح، يمكن للمهاجم التلاعب به لتنفيذ أكواد على الخادم.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`<!-- كود مصاب في ASP.NET -->
<asp:HiddenField runat="server" ID="ViewState" />

<!-- مثال على هجوم ViewState -->
<!-- إذا كان validationKey معروفاً، يمكن تزوير ViewState -->
<!-- واستخدام it لتنفيذ أكواد عبر ObjectStateFormatter -->

// في ASP.NET Framework، يمكن استخدام ViewState UserControl لـ RCE
// إذا كان مفتاح التشفير (machineKey) معروفاً`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة على الكود المصاب والمحصن</h2>

        <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-danger-700 mb-3">&#x274C; كود مصاب</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`# Python - مثال على كود مصاب
import pickle
from flask import request

@app.route('/load-user', methods=['POST'])
def load_user():
    # تحميل بيانات من المستخدم مباشرة بدون تحقق
    user_data = pickle.loads(request.data)
    return f"Welcome {user_data.name}"

# PHP - مثال على كود مصاب
class UserData {
    public $name;
    public $role;
    
    public function __destruct() {
        // يُنفَّذ عند تدمير الكائن
        file_put_contents('logs.txt', $this->name);
    }
}

// استخدام unserialize على بيانات المستخدم
$user = unserialize($_POST['user_data']);`}
            </pre>
          </div>
        </div>

        <div className="bg-success-50 border border-success-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-success-700 mb-3">&#x2705; كود محصن</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`# Python - استخدام JSON بدلاً من pickle
import json
from flask import request

@app.route('/load-user', methods=['POST'])
def load_user():
    # استخدام JSON بدلاً من pickle
    user_data = json.loads(request.data)
    # التحقق من البيانات
    if not isinstance(user_data, dict):
        return "Invalid data", 400
    return f"Welcome {user_data.get('name', 'User')}"

# PHP - استخدام json_decode بدلاً من unserialize
$user_data = json_decode($_POST['user_data'], true);
if (!is_array($user_data)) {
    die("Invalid data");
}

# استخدام فئة آمنة لتخزين البيانات
class SafeUserData {
    public string $name;
    public string $role;
    
    public static function fromJson(string $json): self {
        $data = json_decode($json, true);
        if (!isset($data['name'], $data['role'])) {
            throw new \\InvalidArgumentException("Invalid data");
        }
        $obj = new self();
        $obj->name = $data['name'];
        $obj->role = $data['role'];
        return $obj;
    }
}`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">كيف تكتشف ثغرات إعادة التحويل غير الآمنة</h2>

        <h3 className="text-xl font-bold text-gray-800 mb-3">علامات الضعف</h3>
        <ul className="list-disc mr-6 mb-4">
          <li>استخدام دوال تحويل غير آمنة مثل unserialize() أو pickle.loads()</li>
          <li>استقبال بيانات مشفرة من المستخدم وتحويلها مباشرة</li>
          <li>عدم وجود فحص سلامة (integrity checks) للبيانات المحولة</li>
          <li>استخدام مكتبات تحويل معروفة بالثغرات مثل ysoserial لـ Java</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-800 mb-3">أدوات الاكتشاف</h3>
        <ul className="list-disc mr-6 mb-4">
          <li><strong>Serianalyzer</strong> - أداة تحليل ثغرات Java Deserialization</li>
          <li><strong>ysoserial</strong> - أدوات استغلال Java Deserialization</li>
          <li><strong>Burp Suite</strong> - يدعم اختبار ثغرات التحويل</li>
          <li><strong>PHPUnserialize</strong> - أداة اختبار PHP Object Injection</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-800 mb-3">كيفية الفحص اليدوي</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`# البحث عن استخدام دوال التحويل غير الآمنة في الكود

# في PHP
grep -r "unserialize(" .
grep -r "serialize(" .

# في Python
grep -r "pickle.loads" .
grep -r "pickle.load" .
grep -r "yaml.load" .

# في Java
grep -r "readObject()" .
grep -r "ObjectInputStream" .

# في .NET
grep -r "BinaryFormatter" .
grep -r "ObjectStateFormatter" .`}
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">طرق الحماية</h2>

        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">1. استخدام صيغ التحويل الآمنة</h3>
            <p>
              استخدم JSON بدلاً من صيغ التحويل غير الآمنة مثل pickle و unserialize و BinaryFormatter. JSON لا ي executing أكواد عشوائية.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`# Python - استخدام JSON بدلاً من pickle
import json

# بدلاً من pickle.dumps(data)
json_data = json.dumps(data)

# بدلاً من pickle.loads(data)
data = json.loads(json_data)

// PHP - استخدام json_encode/json_decode بدلاً من serialize/unserialize
$json = json_encode($data);
$data = json_decode($json, true);`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">2. التحقق من سلامة البيانات (Integrity Checks)</h3>
            <p>
              استخدم التوقيع الرقمي (Digital Signatures) للتحقق من سلامة البيانات قبل إعادة التحويل. تأكد أن البيانات لم يتم التلاعب بها.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// Java - استخدام HMAC للتحقق من سلامة البيانات
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class SecureDeserializer {
    private static final String SECRET_KEY = "your-secret-key";
    
    public Object deserialize(byte[] data, byte[] signature) throws Exception {
        // التحقق من التوقيع أولاً
        if (!verifySignature(data, signature)) {
            throw new SecurityException("Invalid signature");
        }
        // ثم إعادة التحويل
        // ...
    }
    
    private boolean verifySignature(byte[] data, byte[] signature) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(SECRET_KEY.getBytes(), "HmacSHA256"));
            byte[] expectedSignature = mac.doFinal(data);
            return MessageDigest.isEqual(signature, expectedSignature);
        } catch (Exception e) {
            return false;
        }
    }
}`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">3. التحقق من النوع (Type Checking)</h3>
            <p>
              تحقق من نوع الكائنات المحولة قبل استخدامها. لا تعتمد على البيانات المحولة مباشرة دون التحقق من صحتها ونوعها.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// Java - استخدام ObjectInputFilter (Java 9+)
import java.io.ObjectInputFilter;

public class SecureInputFilter implements ObjectInputFilter {
    @Override
    public Status check(ObjectInputFilter.FilterInfo filterInfo) {
        // السماح فقط بأنواع محددة
        String className = filterInfo.serialClass() != null 
            ? filterInfo.serialClass().getName() 
            : "";
        
        // قائمة بالأسماء المسموح بها
        List<String> allowedClasses = Arrays.asList(
            "com.example.User",
            "com.example.Product"
        );
        
        if (!allowedClasses.contains(className)) {
            return Status.REJECTED;
        }
        return Status.ALLOWED;
    }
}

// استخدام الفلتر
ObjectInputStream ois = new ObjectInputStream(inputStream);
ois.setObjectInputFilter(new SecureInputFilter());`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">4. تقييد استخدام الأنواع (Allow-listing)</h3>
            <p>
              أنشئ قائمة بالأسماء المسموح بها فقط للكائنات القابلة للتحويل. ارفض أي كائن غير موجود في القائمة.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`# Python - قائمة بأسماء الكائنات المسموح بها
ALLOWED_CLASSES = {
    'models.User',
    'models.Product',
    'models.Order'
}

class SafeUnpickler(pickle.Unpickler):
    def find_class(self, module, name):
        full_name = f"{module}.{name}"
        if full_name not in ALLOWED_CLASSES:
            raise pickle.UnpicklingError(
                f"Class {full_name} is not allowed"
            )
        return super().find_class(module, name)

# استخدام
safe_data = SafeUnpickler(io.BytesIO(data)).load()`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">نصائح أمنية</h2>
        <div className="bg-success-50 border border-success-200 rounded-lg p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span><strong>القاعدة الذهبية:</strong> لا تستخدم أبداً دوال تحويل غير آمنة مع بيانات من مصادر غير موثوقة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>استخدم JSON بدلاً من pickle و unserialize و BinaryFormatter</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>أضف توقيعات رقمية للتحقق من سلامة البيانات قبل إعادة التحويل</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>استخدم قوائم تقييد (Allow-lists) للكائنات المسموح بها فقط</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>حدّث مكتباتك باستمرار لإصلاح الثغرات المعروفة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>استخدم مكتبات آمنة مثل jsonschema للتحقق من بنية البيانات</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>راجع الكود بشكل دوري وقم باختبار اختراق للتحقق من أمان التحويل</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الأخطاء الشائعة</h2>
        <div className="space-y-4">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; استخدام unserialize() على بيانات المستخدم في PHP</h4>
            <p className="text-gray-600 mb-0">هذا يسمح للمهاجم بإنشاء كائنات ضارة تؤدي لتنفيذ أكواد عbitrary</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; استخدام pickle.loads() على بيانات من مصادر غير موثوقة</h4>
            <p className="text-gray-600 mb-0">pickle لا يُعتبر آمناً لتحويل البيانات من مصادر غير موثوقة</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; عدم استخدام التوقيع الرقمي للتحقق من سلامة ViewState في .NET</h4>
            <p className="text-gray-600 mb-0">يمكن للمهاجم التلاعب بـ ViewState إذا لم يتم توقيعه</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; عدم تحديث المكتبات المعرضة لثغرات التحويل</h4>
            <p className="text-gray-600 mb-0">العديد من المكتبات بها ثغرات معروفة يمكن استغلالها</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الثغرات الأخرى</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vulnerabilities/sql-injection" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F489;</span>
            <h4 className="font-bold mt-2">حقن SQL</h4>
          </Link>
          <Link href="/vulnerabilities/rce" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F4BB;</span>
            <h4 className="font-bold mt-2">تنفيذ أكواد عن بُعد</h4>
          </Link>
          <Link href="/vulnerabilities/prototype-pollution" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F33A;</span>
            <h4 className="font-bold mt-2">تلوث الأ prototypes</h4>
          </Link>
        </div>
      </section>
    </div>
  )
}
