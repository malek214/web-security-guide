import Link from 'next/link'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import ShareButtons from '@/components/ShareButtons'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'

export default function PasswordAttacksPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x1F510;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">هجمات كلمات المرور</h1>
            <p className="text-xl text-gray-500 mt-1">Password Attacks</p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <p className="text-danger-700 font-semibold mb-0">
            &#x26A0; مستوى الخطورة: عالي جداً
          </p>
          <p className="text-gray-600 text-sm mt-2">
            تُعد هجمات كلمات المرور من أكثر الهجمات شيوعاً واستخداماً في اختراق الحسابات والأنظمة
          </p>
        </div>
      </section>

      <div className="mb-6">
        <ShareButtons title="هجمات كلمات المرور" url={"https://web-security-guide.vercel.app/vulnerabilities/password-attacks"} />
      </div>

      {/* Definition Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">تعريف هجمات كلمات المرور</h2>
        <p>
          تُعتبر هجمات كلمات المرور (Password Attacks) من أكثر أساليب الاختراق شيوعاً واستخداماً في العالم السيبراني. تهدف هذه الهجمات إلى الحصول على كلمات مرور المستخدمين أو كسر آليات المصادقة (Authentication) للوصول غير المصرح به إلى الحسابات والأنظمة والبيانات الحساسة.
        </p>
        <p>
          يعتمد نجاح هذه الهجمات على عدة عوامل رئيسية: ضعف كلمات المرور المستخدمة، وسوء تطبيق آليات الحماية على مستوى الخادم، وعدم وجود تدابير احترازية كافية مثل Rate Limiting أو حظر المحاولات المشبوهة.
        </p>
        <p>
          تُشير تقارير أمنية عالمية إلى أن أكثر من 80% من ثغرات الاختراق تبدأ بهجمات تتعلق بكلمات المرور، سواء كانت بسبب كلمات مرور ضعيفة أو طرق تخزين غير آمنة أو غياب آليات الحماية المناسبة.
        </p>
      </section>

      {/* Types Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أنواع هجمات كلمات المرور</h2>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">1. Brute Force Attack (القوة الغاشمة)</h3>
          <p>
            يعتمد هذا الهجوم على تجربة جميع التوليدات الممكنة لكلمة المرور بشكل منهجي ومتسلسل حتى يتم العثور على الكلمة الصحيحة. يستخدم المهاجم أدوات آلية تجرّب ملايين التوليدات في الثانية الواحدة.
          </p>
          <p>
            <strong>مثال:</strong> إذا كانت كلمة المرور مكونة من 4 أحرف إنجليزية صغيرة فقط، فإن عدد التوليدات الممكنة هو 26^4 = 456,976 توليد، وهو أمر يمكن إنجازه في ثوانٍ معدودة.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`# مثال على هجوم Brute Force باستخدام Python
import itertools
import string

def brute_force(target_password):
    chars = string.ascii_lowercase
    for length in range(1, 9):
        for combination in itertools.product(chars, repeat=length):
            guess = ''.join(combination)
            if guess == target_password:
                return guess
    return None

# مثال على استخدام Hydra (أداة شائعة)
# hydra -l admin -P wordlist.txt ssh://target.com
# hydra -l admin -P wordlist.txt http-post-form "/login:user=^USER^&pass=^PASS^:F=incorrect"`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">2. Dictionary Attack (هجوم القاموس)</h3>
          <p>
            يستخدم هذا الهجوم قائمة مسبقة التجهيز من كلمات المرور الشائعة والمحتملة بدلاً من تجربة جميع التوليدات. تعتمد فاعلية هذا الهجوم على جودة القاموس المستخدم وشموله لكلمات المرور المستخدمة فعلياً.
          </p>
          <p>
            تتميز هذه الطريقة بسرعتها مقارنة بالقوة الغاشمة لأنها تقتصر على كلمات مرور واقعية ومحتملة فقط.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`# مثال على هجوم Dictionary Attack
def dictionary_attack(wordlist_file, target_password):
    with open(wordlist_file, 'r') as file:
        for word in file:
            word = word.strip()
            if word == target_password:
                return word
    return None

# استخدام john the ripper
# john --wordlist=passwords.txt hash.txt
# john --show hash.txt

# استخدام hashcat
# hashcat -m 0 hash.txt wordlist.txt  (MD5)
# hashcat -m 1000 hash.txt wordlist.txt  (NTLM)`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">3. Credential Stuffing (حشو بيانات الاعتماد)</h3>
          <p>
            يعتمد هذا الهجوم على استخدام بيانات اعتماد (اسم مستخدم وكلمة مرور) تم تسريبها من ثغرات سابقة في مواقع أخرى. يختبر المهاجم هذه البيانات على مواقع مختلفة لأن المستخدمين كثيراً ما يستعيدون كلمات المرور نفسها عبر المنصات المختلفة.
          </p>
          <p>
            هذا الهجوم فعال جداً لأن نسبة كبيرة من المستخدمين يعيدون استخدام نفس كلمة المرور في حساباتهم المختلفة.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`# مثال على هجوم Credential Stuffing
import requests

def credential_stuffing(url, credentials_list):
    for username, password in credentials_list:
        response = requests.post(url, data={
            'username': username,
            'password': password
        })
        if 'dashboard' in response.text:
            print(f"[+] نجح: {username}:{password}")
            return True
    return False

# بيانات مسربة من ثغرات سابقة
#rockyou.txt - قائمة شائعة تحتوي على كلمات مرور حقيقية
#SecLists/Passwords/Combined-Credentials.txt`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">4. Password Spraying (رذاذ كلمات المرور)</h3>
          <p>
            بدلاً من تجربة كلمات مرور كثيرة على حساب واحد، يجرّب المهاجم عدد قليل من كلمات المرور الشائعة على حسابات مستخدمين كثيرة. هذا الأسلوب يتجاوز آليات الحظر التلقائي لأن كل حساب لا يتلقى سوى محاولات قليلة.
          </p>
          <p>
            <strong>مثال:</strong> تجربة كلمات مثل &quot;Password1&quot; و &quot;Summer2024&quot; و &quot;Welcome1&quot; على 1000 حساب مختلف.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`# مثال على هجوم Password Spraying
import requests

def password_spray(usernames, password, url):
    for username in usernames:
        response = requests.post(url, data={
            'username': username,
            'password': password
        })
        if response.status_code == 200:
            print(f"[+] نجح: {username}:{password}")

# كلمات مرور شائعة للتجربة
common_passwords = [
    "Password1",
    "Summer2024",
    "Welcome1",
    "Qwerty123",
    "Company2024"
]

# استخدام CrackMapExec
# crackmapexec smb target.txt -u usernames.txt -p 'Password1' --no-bruteforce`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">5. Rainbow Tables (الجداول القوسية)</h3>
          <p>
            تُستخدم لاسترداد كلمات المرور من التجزئة (Hashing) المخزنة في قواعد البيانات. تحتوي على جداول ضخمة تحسب التجزئة لملايين الكلمات مسبقاً، مما يتيح استرداد كلمة المرور الأصلية بالبحث في الجدول بدلاً من حسابها من جديد.
          </p>
          <p>
            فعالية Rainbow Tables تعتمد على نوع التجزئة المستخدمة ووجود Salt (ملح تشفيري) يمنع استخدام هذه الجداول.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`# مثال على استخدام Rainbow Tables
# توليد جدول قوسي
# rtgen md5 lowercase a-z 1 8 0 3000 100000000

# البحث في الجدول
# rtslookup md5_loweralpha-1-8_0_3000_100000000彩虹表

# مثال على تجزئة بدون Salt (ضعيفة)
import hashlib

def weak_hash(password):
    return hashlib.md5(password.encode()).hexdigest()

def weak_sha1(password):
    return hashlib.sha1(password.encode()).hexdigest()

# هذه التجزئات脆弱ة لـ Rainbow Tables
# hashcat -m 0 hash.txt  (MD5)
# hashcat -m 100 hash.txt  (SHA1)

# الحل: استخدام Salt مع التجزئة
import bcrypt

def secure_hash(password):
    salt = bcrypt.gensalt(rounds=12)
    return bcrypt.hashpw(password.encode(), salt)`}
            </pre>
          </div>
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة واقعية على الأكواد الضعيفة</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Weak Password Hashing */}
          <div>
            <h3 className="text-lg font-bold text-danger-700 mb-3">&#x274C; تجزئة ضعيفة لكلمات المرور</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
              <pre className="text-sm">
{`# تجزئة ضعيفة بدون Salt
import hashlib

# MD5 - ضعيف جداً
def weak_md5(password):
    return hashlib.md5(password.encode()).hexdigest()

# SHA1 - ضعيف
def weak_sha1(password):
    return hashlib.sha1(password.encode()).hexdigest()

# SHA256 بدون Salt - ضعيف
def weak_sha256(password):
    return hashlib.sha256(password.encode()).hexdigest()

# حفظ كلمة المرور مباشرة (كارثي)
user_password = "mypassword123"
stored = weak_md5(user_password)
# المخزن: 482c811da5d5b4bc6d497ffa98491e38`}
              </pre>
            </div>
            <div className="bg-danger-50 border border-danger-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-danger-700 mb-0">
                <strong>المشكلة:</strong> MD5 و SHA1 ضعيفان ويمكن كسرهما بسرعة بـ Rainbow Tables أو Brute Force.
              </p>
            </div>
          </div>

          {/* Insecure Storage */}
          <div>
            <h3 className="text-lg font-bold text-danger-700 mb-3">&#x274C; تخزين غير آمن</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
              <pre className="text-sm">
{`# حفظ كلمات المرور كنص عادي في قاعدة البيانات
# SQL Table:
# CREATE TABLE users (
#   id INT PRIMARY KEY,
#   username VARCHAR(255),
#   password VARCHAR(255)  -- كلمة المرور كنص عادي!
# );

# إدراج مستخدم بكلمة مرور غير مشفرة
cursor.execute(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    ("admin", "admin123")  # كارثة أمنية!
)

# التحقق بكلمة مرور نص عادي
cursor.execute(
    "SELECT * FROM users WHERE username=? AND password=?",
    (username, password)  # مقارنة نصوص عادية
)`}
              </pre>
            </div>
            <div className="bg-danger-50 border border-danger-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-danger-700 mb-0">
                <strong>المشكلة:</strong> إذا تم اختراق قاعدة البيانات، يمكن قراءة جميع كلمات المرور مباشرة.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">مثال واقعي: تسجيل دخول ضعيف</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`# Node.js/Express - تسجيل دخول ضعيف
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // استخدام MD5 مباشرة بدون Salt
  const crypto = require('crypto');
  const hash = crypto.createHash('md5')
    .update(password).digest('hex');

  // استعلام مباشر بدون Prepared Statements
  const query = "SELECT * FROM users WHERE username='" +
    username + "' AND password='" + hash + "'";

  const user = await db.query(query);

  if (user) {
    // لا يوجد Rate Limiting - يمكن تجربة ملايين المحاولات
    // لا يوجد Account Lockout
    res.json({ success: true, token: generateToken(user) });
  } else {
    res.json({ success: false });
  }
});`}
            </pre>
          </div>
        </div>
      </section>

      {/* Secure Code Examples */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة على الكود الآمن</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Secure Hashing */}
          <div>
            <h3 className="text-lg font-bold text-success-700 mb-3">&#x2705; تجزئة آمنة باستخدام bcrypt</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
              <pre className="text-sm">
{`# Python مع bcrypt
import bcrypt

def secure_hash_password(password):
    # توليد Salt عشوائي
    salt = bcrypt.gensalt(rounds=12)
    # تجزئة كلمة المرور
    hashed = bcrypt.hashpw(
        password.encode('utf-8'),
        salt
    )
    return hashed

def verify_password(password, hashed):
    return bcrypt.checkpw(
        password.encode('utf-8'),
        hashed
    )

# مثال
password = "StrongP@ssw0rd!"
hashed = secure_hash_password(password)
print(f"المخزن: {hashed}")
print(f"التحقق: {verify_password(password, hashed)}")`}
              </pre>
            </div>
          </div>

          {/* Secure Hashing with Argon2 */}
          <div>
            <h3 className="text-lg font-bold text-success-700 mb-3">&#x2705; تجزئة آمنة باستخدام Argon2</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
              <pre className="text-sm">
{`# Python مع argon2
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

# إعداد Argon2 مع معاملات أمنية
ph = PasswordHasher(
    time_cost=3,        # عدد التكرارات
    memory_cost=65536,  # 64 MB
    parallelism=4,      # عدد الخيوط
    hash_len=32,        # طول التجزئة
    salt_len=16         # طول Salt
)

def hash_password(password):
    return ph.hash(password)

def verify_password(password, hash):
    try:
        return ph.verify(hash, password)
    except VerifyMismatchError:
        return False

# مثال
password = "MySecureP@ss123"
hashed = hash_password(password)
print(f"التجزئة: {hashed}")
print(f"التحقق: {verify_password(password, hashed)")`}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-4">Node.js - تسجيل دخول آمن مع Rate Limiting</h3>
          <pre className="text-sm">
{`const express = require('express');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();

// Rate Limiting - الحد من المحاولات
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 5, // 5 محاولات كحد أقصى
  message: {
    error: 'تم تجاوز الحد الأقصى للمحاولات. حاول مرة أخرى بعد 15 دقيقة.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// حماية الأرقام/IP
const ipLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // ساعة
  max: 100, // 100 طلب في الساعة
  keyGenerator: (req) => req.ip
});

app.use(helmet());
app.use(express.json());

// تسجيل الدخول الآمن
app.post('/login', loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    // التحقق من صحة المدخلات
    if (!username || !password) {
      return res.status(400).json({
        error: 'جميع الحقول مطلوبة'
      });
    }

    // استخدام Prepared Statements
    const user = await db.query(
      'SELECT id, username, password_hash FROM users WHERE username = ?',
      [username]
    );

    if (!user) {
      // رسالة خطأ عامة (لا تكشف عن وجود المستخدم)
      return res.status(401).json({
        error: 'بيانات الدخول غير صحيحة'
      });
    }

    // مقارنة كلمة المرور باستخدام bcrypt
    const isValidPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isValidPassword) {
      // تسجيل المحاولة الفاشلة
      await logFailedAttempt(user.id, req.ip);
      return res.status(401).json({
        error: 'بيانات الدخول غير صحيحة'
      });
    }

    // إعادة تعيين عداد المحاولات بعد النجاح
    await resetFailedAttempts(user.id);

    // إنشاء توكن آمن
    const token = generateSecureToken(user.id);

    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ error: 'خطأ داخلي في الخادم' });
  }
});`}
          </pre>
        </div>
      </section>

      {/* Detection Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">كيف تكتشف ثغرات كلمات المرور</h2>

        <h3 className="text-xl font-bold text-gray-800 mb-3">علامات الضعف في النظام</h3>
        <ul className="list-disc mr-6 mb-4">
          <li>عدم وجود سياسة قوية لكلمات المرور (طول، تعقيد، تجديد)</li>
          <li>تخزين كلمات المرور كنص عادي أو بتشفير ضعيف (MD5, SHA1)</li>
          <li>غياب آليات Rate Limiting على نماذج تسجيل الدخول</li>
          <li>عدم وجود آليات حظر الحسابات (Account Lockout) بعد محاولات فاشلة</li>
          <li>استخدام كلمات مرور افتراضية للمستخدمين الجدد</li>
          <li>عدم تفعيل المصادقة الثنائية (MFA)</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-800 mb-3">أدوات الكشف</h3>
        <ul className="list-disc mr-6 mb-4">
          <li><strong>John the Ripper:</strong> أداة قوية لكسر كلمات المرور المجزأة واختبار قوة كلمات المرور</li>
          <li><strong>Hashcat:</strong> أداة سريعة لكسر التجزئات باستخدام GPU</li>
          <li><strong>Burp Suite:</strong> اختبار ثغرات تسجيل الدخول والحد من المحاولات</li>
          <li><strong>Hydra:</strong> اختبار هجمات Brute Force على خدمات مختلفة</li>
          <li><strong>Ncrack:</strong> اختبار قوة كلمات المرور على خدمات الشبكة</li>
        </ul>

        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`# اختبار قوة كلمات المرور باستخدام John the Ripper
# إنشاء هاش لاختباره
echo -n "password123" | md5sum | cut -d' ' -f1 > hash.txt
john --format=raw-md5 --wordlist=passwords.txt hash.txt

# استخدام Hashcat لكسر MD5
hashcat -m 0 hash.txt wordlist.txt -a 0

# استخدام Hydra لاختبار تسجيل الدخول
hydra -l admin -P common_passwords.txt \
  http-post-form://example.com/login:username=^USER^&password=^PASS^:F=Invalid

# اختبار قوة كلمة مرور باستخدام Python
import zxcvbn

password = "MyPassword123"
result = zxcvbn.zxcvbn(password)
print(f"القوة: {result['score']}/4")
print(f"الوقت المطلوب للكسر: {result['crack_times_display']['offline_slow_hashing_1e4_per_second']}")`}
          </pre>
        </div>
      </section>

      {/* Prevention Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">طرق الحماية ومنع هجمات كلمات المرور</h2>

        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">1. استخدام تجزئة قوية لكلمات المرور</h3>
            <p>
              استخدم bcrypt أو Argon2 أو scrypt بدلاً من MD5 أو SHA1. هذه الخوارزميات مصممة خصيصاً لحماية كلمات المرور وتتميز ببطئها المتعمد مما يصعّب هجمات القوة الغاشمة.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`# مقارنة بين خوارزميات التجزئة
# MD5 (ضعيف جداً) - يمكن كسره في ثوانٍ
md5("password") = "5f4dcc3b5aa765d61d8327deb882cf99"

# SHA1 (ضعيف) - يمكن كسره في دقائق
sha1("password") = "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8"

# bcrypt (قوي) - يستغرق ساعات أو أيام
bcrypt("password", cost=12) = "$2b$12$LJ3m4ys...مدة الكسر: سنوات"

# Argon2 (الأقوى) - مقاوم لهجمات GPU
argon2("password") = "$argon2id$v=19$m=65536...مدة الكسر: עשרות שנים"

# التوصية: استخدام bcrypt مع cost >= 12
# أو Argon2id مع المعاملات المناسبة`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">2. تطبيق Rate Limiting و Account Lockout</h3>
            <p>
              حدد عدد محاولات تسجيل الدخول الفاشلة وأوقف الحساب مؤقتاً بعد عدد معين من المحاولات الفاشلة.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`# Node.js مع express-rate-limit
const rateLimit = require('express-rate-limit');

// Rate Limiter لتسجيل الدخول
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // نافذة 15 دقيقة
  max: 5, // حد أقصى 5 محاولات
  message: 'تم تجاوز الحد الأقصى للمحاولات',
  standardHeaders: true,
  legacyHeaders: false,
  // تطبيق على مستوى IP
  keyGenerator: (req) => req.ip,
});

// Account Lockout
class AccountLockout {
  constructor() {
    this.attempts = new Map();
    this.lockouts = new Map();
  }

  async checkAndRecord(userId, ip) {
    if (this.isLocked(userId)) {
      throw new Error('الحساب مقفل مؤقتاً');
    }

    const key = userId;
    const attempts = this.attempts.get(key) || 0;

    if (attempts >= 5) {
      this.lockouts.set(key, Date.now() + 900000); // 15 دقيقة
      throw new Error('تم قفل الحساب');
    }

    this.attempts.set(key, attempts + 1);
  }

  resetAttempts(userId) {
    this.attempts.delete(userId);
  }

  isLocked(userId) {
    const lockout = this.lockouts.get(userId);
    if (lockout && lockout > Date.now()) {
      return true;
    }
    this.lockouts.delete(userId);
    return false;
  }
}`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">3. تفعيل المصادقة الثنائية (MFA/2FA)</h3>
            <p>
              أضف طبقة أمان إضافية عبر المصادقة الثنائية. حتى لو حصل المهاجم على كلمة المرور، لن يستطيع الدخول بدون الرمز الثاني.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`# تطبيق TOTP (Time-based One-Time Password)
import pyotp
import qrcode

# إنشاء مفتاح سري للمستخدم
def generate_mfa_secret():
    return pyotp.random_base32()

# إنشاء رمز QR للمصادقة
def generate_qr_code(secret, username):
    totp = pyotp.TOTP(secret)
    uri = totp.provisioning_uri(
        name=username,
        issuer_name="MyApp"
    )
    img = qrcode.make(uri)
    img.save(f"mfa_{username}.png")
    return uri

# التحقق من الرمز
def verify_mfa_code(secret, code):
    totp = pyotp.TOTP(secret)
    return totp.verify(code, valid_window=1)

# مثال
secret = generate_mfa_secret()
print(f"المفتاح السري: {secret}")

# التحقق من رمز المستخدم
user_code = "123456"
is_valid = verify_mfa_code(secret, user_code)
print(f"الرمز صحيح: {is_valid}")`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">4. تطبيق سياسات كلمات المرور القوية</h3>
            <p>
              فرض متطلبات للطول والتعقيد والتجديد ومنع استخدام كلمات المرور الشائعة والمسربة.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`# سياسة كلمات مرور قوية
import re
import requests

class PasswordPolicy:
    def __init__(self):
        self.min_length = 12
        self.max_length = 128
        self.require_uppercase = True
        self.require_lowercase = True
        self.require_numbers = True
        self.require_special = True
        self.disallow_common = True

    def validate(self, password):
        errors = []

        if len(password) < self.min_length:
            errors.append(f"الطول الأدنى {self.min_length} حرف")

        if self.require_uppercase and not re.search(r'[A-Z]', password):
            errors.append("يجب أن تحتوي على حرف كبير")

        if self.require_lowercase and not re.search(r'[a-z]', password):
            errors.append("يجب أن تحتوي على حرف صغير")

        if self.require_numbers and not re.search(r'\\d', password):
            errors.append("يجب أن تحتوي على رقم")

        if self.require_special and not re.search(
            r'[!@#$%^&*(),.?":{}|<>]', password
        ):
            errors.append("يجب أن تحتوي على رمز خاص")

        if self.disallow_common:
            if self.is_common_password(password):
                errors.append("كلمة المرور شائعة وممنوعة")

        return errors

    def is_common_password(self, password):
        # قائمة بكلمات المرور الشائعة
        common = [
            "password", "123456", "qwerty", "admin",
            "letmein", "welcome", "monkey", "master"
        ]
        return password.lower() in common

# استخدام API للتحقق من تسريب كلمات المرور
def check_password_breach(password):
    import hashlib
    sha1_hash = hashlib.sha1(
        password.encode('utf-8')
    ).hexdigest().upper()
    prefix = sha1_hash[:5]
    suffix = sha1_hash[5:]

    response = requests.get(
        f"https://api.pwnedpasswords.com/range/{prefix}"
    )

    for line in response.text.splitlines():
        hash_suffix, count = line.split(":")
        if hash_suffix == suffix:
            return int(count)
    return 0

# مثال
password = "password123"
breach_count = check_password_breach(password)
if breach_count > 0:
    print(f"تمت المخاطرة {breach_count} مرة!")`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">5. تخزين آمن لكلمات المرور</h3>
            <p>
              استخدم Prepared Statements و تشفير كلمة المرور قبل الحفظ في قاعدة البيانات، ولا تحفظ كلمة المرور كنص عادي أبداً.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`# Node.js مع Prisma - تخزين آمن
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const SALT_ROUNDS = 12;

// إنشاء مستخدم جديد
async function createUser(username, password) {
  // تجزئة كلمة المرور
  const hashedPassword = await bcrypt.hash(
    password, SALT_ROUNDS
  );

  // حفظ في قاعدة البيانات
  const user = await prisma.user.create({
    data: {
      username,
      passwordHash: hashedPassword,
      // لا تحفظ كلمة المرور الأصلية أبداً!
    }
  });

  return user;
}

// التحقق من تسجيل الدخول
async function authenticate(username, password) {
  const user = await prisma.user.findUnique({
    where: { username }
  });

  if (!user) {
    throw new Error('بيانات الدخول غير صحيحة');
  }

  const isValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isValid) {
    throw new Error('بيانات الدخول غير صحيحة');
  }

  return user;
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Security Tips */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">نصائح أمنية مهمة</h2>
        <div className="bg-success-50 border border-success-200 rounded-lg p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span><strong>استخدم bcrypt أو Argon2:</strong> لا تستخدم MD5 أو SHA1 لتشفير كلمات المرور</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span><strong>فعّل MFA:</strong> المصادقة الثنائية تحمي حتى لو تم كسر كلمة المرور</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span><strong>حدد طول كلمة المرور:</strong> 12 حرفاً على الأقل مع تعقيد مناسب</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span><strong>استخدم Rate Limiting:</strong> ا حد عدد محاولات تسجيل الدخول</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span><strong>احذر من كلمات المرور المسربة:</strong> استخدم HIBP API للتحقق</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span><strong>لا تُظهر رسائل خطأ تفصيلية:</strong> استخدم رسائل عامة مثل &quot;بيانات الدخول غير صحيحة&quot;</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span><strong>راجع الكود بشكل دوري:</strong> تحقق من أن جميع كلمات المرور مجزأة بشكل صحيح</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span><strong>استخدم HTTPS دائماً:</strong> تشفير حركة المرور يمنع التنصت على كلمات المرور</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الأخطاء الشائعة التي يجب تجنبها</h2>
        <div className="space-y-4">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; حفظ كلمات المرور كنص عادي</h4>
            <p className="text-gray-600 mb-0">إذا تم اختراق قاعدة البيانات، يمكن قراءة جميع كلمات المرور مباشرة</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; استخدام MD5 أو SHA1 لتشفير كلمات المرور</h4>
            <p className="text-gray-600 mb-0">هذه الخوارزميات سريعة جداً ويمكن كسرها باستخدام Rainbow Tables أو GPU</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; عدم استخدام Rate Limiting</h4>
            <p className="text-gray-600 mb-0">يسمح للمهاجم بتجربة ملايين المحاولات دون أي قيود</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; عدم تفعيل المصادقة الثنائية</h4>
            <p className="text-gray-600 mb-0">الاعتماد فقط على كلمة المرور يترك حسابك عرضة للخطر</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; استخدام كلمات مرور متشابهة عبر الحسابات</h4>
            <p className="text-gray-600 mb-0">إذا تم اختراق حساب واحد، يمكن اختراق جميع حساباتك</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; إظهار رسائل خطأ مفصلة</h4>
            <p className="text-gray-600 mb-0">رسائل مثل &quot;اسم المستخدم غير موجود&quot; تساعد المهاجم في تخمين المستخدمين</p>
          </div>
        </div>
      </section>

      <LabsSection slug="password-attacks" />
      <ToolsSection slug="password-attacks" />
      <Quiz slug="password-attacks" />
      <VideoSection slug="password-attacks" />

      {/* Navigation Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أنواع أخرى من الثغرات</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vulnerabilities/sql-injection" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F489;</span>
            <h4 className="font-bold mt-2">حقن SQL</h4>
            <p className="text-sm text-gray-600">SQL Injection</p>
          </Link>
          <Link href="/vulnerabilities/xss" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F4DC;</span>
            <h4 className="font-bold mt-2">XSS</h4>
            <p className="text-sm text-gray-600">برمجة النصوص بين المواقع</p>
          </Link>
          <Link href="/vulnerabilities/csrf" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F3A3;</span>
            <h4 className="font-bold mt-2">CSRF</h4>
            <p className="text-sm text-gray-600">تزوير الطلبات بين المواقع</p>
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
