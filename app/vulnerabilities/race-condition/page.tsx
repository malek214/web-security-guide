import Link from "next/link";
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import ShareButtons from '@/components/ShareButtons'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'

export default function RaceConditionPage() {
  return (
    <div dir="rtl" className="max-w-4xl mx-auto prose prose-lg">
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary-600 transition">الرئيسية</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Race Condition</span>
      </nav>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x1F3C1;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">حالة السباق</h1>
            <p className="text-xl text-gray-500 mt-1">Race Condition</p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <p className="text-danger-700 font-semibold mb-0">
            &#x26A0; مستوى الخطورة: عالي جداً
          </p>
        </div>
      </header>

      <div className="mb-6">
        <ShareButtons title="حالة السباق" url={"https://web-security-guide.vercel.app/vulnerabilities/race-condition"} />
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">تعريف Race Condition</h2>
        <p>
          حالة السباق (Race Condition) هي ثغرة أمنية تحدث عندما يعتمد سلوك النظام على التوقيت أو ترتيب تنفيذ العمليات المتزامنة بشكل غير متوقع. تنشأ المشكلة عندما يحاول نظامين أو أكثر الوصول إلى مورد مشترك في نفس الوقت، ويؤدي ترتيب التنفيذ العشوائي إلى نتائج غير صحيحة أو غير آمنة.
        </p>
        <p>
          في تطبيقات الويب، تحدث حالات السباق عادةً عندما يحاول مستخدمون متعددون تنفيذ عمليات على نفس المورد في نفس الوقت (مثل سحب أموال من حساب بنكي أو شراء تذكرة محدودة). إذا لم يتم التعامل مع هذه المزامنة بشكل صحيح، يمكن للمهاجم استغلال الفجوة الزمنية لتحقيق أشياء غير مسموح بها.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أنواع Race Conditions</h2>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">1. TOCTOU - Time-of-Check to Time-of-Use</h3>
          <p>
            فجوة التحقق من الوقت للاستخدام. يحدث عندما يتحقق النظام من شرط ما ثم يستخدم النتيجة لاحقاً، لكن الحالة قد تغيرت بين التحقق والاستخدام. على سبيل المثال، التحقق من صلاحية ملف قبل فتحه، لكن الملف يتغير بين خطوتين.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`// مثال على ثغرة TOCTOU في Node.js
app.post('/delete-file', async (req, res) => {
  // الخطوة 1: التحقق من الصلاحيات
  const hasPermission = await checkPermission(req.user, req.body.fileId);
  
  // ⚠️ الفجوة هنا! قد يتغير الملف أو الصلاحيات
  
  // الخطوة 2: حذف الملف (قد يكون المستخدم فقد الصلاحيات)
  if (hasPermission) {
    await deleteFile(req.body.fileId);
    res.json({ success: true });
  }
});`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">2. Double Spending / Double Spending</h3>
          <p>
            الإنفاق المزدوج. هي الثغرة الأكثر شيوعاً في تطبيقات الويب. يحدث عندما يرسل المستخدم عدة طلبات دفعة واحدة لإنفاق نفس المبلغ، ويعالج الخادم كل طلب بشكل منفصل قبل تحديث الرصيد، مما يسمح بالحصول على أكثر من المسموح.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`// مثال على Double Spending في نظام محفظة رقمية
app.post('/transfer', async (req, res) => {
  const { amount, to } = req.body;
  const wallet = await Wallet.findOne({ userId: req.user.id });
  
  // ⚠️ لا يوجد قفل! يمكن تنفيذ عدة طلبات في وقت واحد
  if (wallet.balance >= amount) {
    // الطلب الأول يتحقق من الرصيد (100$)
    // الطلب الثاني يتحقق أيضاً من الرصيد (100$)
    // كلا الطلبين يمران!
    
    wallet.balance -= amount;
    await wallet.save();
    
    await createTransfer(req.user.id, to, amount);
    res.json({ success: true });
  }
});`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">3. Elevated Privileges Race Condition</h3>
          <p>
            ثغرة رفع الصلاحيات عبر حالة السباق. يحدث عندما يحاول المستخدم ترقية صلاحياته في نفس الوقت الذي تقوم فيه العملية بتحديث الحالة. يمكن للمهاجم استغلال الفجوة للحصول على صلاحيات أعلى من المسموح.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`// مثال على رفع الصلاحيات عبر Race Condition
app.post('/update-role', async (req, res) => {
  const user = await User.findById(req.user.id);
  
  // ⚠️ لا يوجد قفل على المستخدم
  // يمكن إرسال عدة طلبات في نفس الوقت
  if (user.role === 'user') {
    // الطلب الأول: يتحقق من الدور (user)
    // الطلب الثاني: يتحقق أيضاً من الدور (user)
    // كلاهما يمران ويغيران الدور!
    
    user.role = 'admin';
    await user.save();
    res.json({ success: true, role: user.role });
  }
});`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة واقعية على الهجمات</h2>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">1. هجوم Double Spending على نظام بنكي</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`// هجوم Double Spending على تطبيق محفظة رقمية
// المهاجم يرسل 5 طلبات تحويل في نفس الوقت

// طلب 1: سحب 100$
// طلب 2: سحب 100$
// طلب 3: سحب 100$
// طلب 4: سحب 100$
// طلب 5: سحب 100$

// النتيجة: الرصيد الأصلي 150$ أصبح 0$
// لكن المهاجم سحب 500$ بدلاً من 150$ فقط!

// السبب: جميع الطلبات تحقق من الرصيد قبل تحديثه
// ولم يتم تطبيق أي قفل أو عملية ذرّية`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">2. هجوم رفع الصلاحيات</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`// هجوم رفع الصلاحيات عبر Race Condition
// المهاجم يحاول ترقية حسابه إلى admin

// طلب 1: POST /update-role {"role": "admin"}
// طلب 2: POST /update-role {"role": "admin"}
// طلب 3: POST /update-role {"role": "admin"}

// النتيجة: تم ترقية الحساب إلى admin
// لأن الطلبات تمت معالجتها قبل تحديث الصلاحيات`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">3. هجوم شراء محدود (Ticket Scalping)</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`// هجوم على نظام حجز تذاكر محدود (مثلاً 5 تذاكر متبقية)
// المهاجم يرسل 10 طلبات شراء في نفس الوقت

// طلب 1: شراء 3 تذاكر → تم (المتبقي: 2)
// طلب 2: شراء 3 تذاكر → تم (المتبقي: -1)
// طلب 3: شراء 3 تذاكر → تم (المتبقي: -4)

// النتيجة: المهاجم حجز 9 تذاكر بدلاً من 5 فقط!
// لأن التحقق من الكمية تم قبل تحديثها`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">كيف تكتشف حالات السباق</h2>

        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">1. اختبار الطلبات المتزامنة</h3>
            <p>
              أرسل عدة طلبات في نفس الوقت باستخدام أدوات مثل Burp Suite Intruder أو أداة curl متعددة. راقب هل تتم معالجة جميع الطلبات بنجاح أم يتم رفض بعضها.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`# اختبار Race Condition باستخدام curl
for i in {1..10}; do
  curl -X POST https://target.com/transfer \\
    -H "Content-Type: application/json" \\
    -H "Authorization: Bearer \$TOKEN" \\
    -d '{"amount": 100, "to": "attacker"}' &
done
wait
echo "All requests sent"`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">2. استخدام أدوات اختبار Race Conditions</h3>
            <p>
              تتوفر أدوات متخصصة مثل Turbo Intruder (إضافة Burp Suite) وRace The Web لاختبار حالات السباق بشكل منهجي.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`# استخدام Turbo Intruder في Burp Suite
# 1. أرسل الطلب إلى Burp Intruder
# 2. اختر وضع Payload: Null Payload
# 3. اضبط عدد الطلبات على 10-50
# 4. شغّل الاختبار

# أو استخدام Python مع threading
import threading
import requests

def send_request():
    requests.post(
        'https://target.com/transfer',
        json={'amount': 100, 'to': 'attacker'},
        headers={'Authorization': 'Bearer TOKEN'}
    )

threads = [threading.Thread(target=send_request) for _ in range(10)]
for t in threads:
    t.start()
for t in threads:
    t.join()`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">3. مراقبة السجلات والنتائج</h3>
            <p>
              راقب سجلات الخادم وتأكد من أن جميع الطلبات المتزامنة تتم معالجتها بشكل صحيح. ابحث عن حالات حيث تتم معالجة أكثر من طلب بنجاح في نفس الوقت.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة كود مصاب ومحصن</h2>

        <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-danger-700 mb-3">&#x274C; كود مصاب - نظام بدون قفل</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`// نظام محفظة بدون حماية Race Condition
app.post('/transfer', async (req, res) => {
  const { amount, to } = req.body;
  
  // لا يوجد قفل! الطلبات المتزامنة ستمر جميعها
  const sender = await User.findById(req.user.id);
  const receiver = await User.findById(to);
  
  if (sender.balance >= amount) {
    // ⚠️ فجوة Race Condition هنا
    sender.balance -= amount;
    receiver.balance += amount;
    
    await sender.save();
    await receiver.save();
    
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Insufficient balance' });
  }
});`}
            </pre>
          </div>
        </div>

        <div className="bg-success-50 border border-success-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-success-700 mb-3">&#x2705; كود محصن - استخدام MongoDB Transactions</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`// نظام محفظة محصن باستخدام MongoDB Transactions
const mongoose = require('mongoose');

app.post('/transfer', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { amount, to } = req.body;
    
    // قفل المستخدمين خلال المعاملة
    const sender = await User.findOne({ _id: req.user.id })
      .session(session);
    const receiver = await User.findOne({ _id: to })
      .session(session);
    
    if (sender.balance < amount) {
      throw new Error('Insufficient balance');
    }
    
    sender.balance -= amount;
    receiver.balance += amount;
    
    await sender.save({ session });
    await receiver.save({ session });
    
    await session.commitTransaction();
    res.json({ success: true });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
});`}
            </pre>
          </div>
        </div>

        <div className="bg-success-50 border border-success-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-success-700 mb-3">&#x2705; كود محصن - استخدام Distributed Lock</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`// نظام محفظة محصن باستخدام Redis Lock
const Redis = require('ioredis');
const redis = new Redis();

app.post('/transfer', async (req, res) => {
  const { amount, to } = req.body;
  const lockKey = \`lock:transfer:\${req.user.id}\`;
  
  // الحصول على القفل مع مهلة زمنية
  const lock = await redis.set(lockKey, '1', 'NX', 'PX', 5000);
  
  if (!lock) {
    return res.status(429).json({ 
      error: 'Another transfer is in progress' 
    });
  }
  
  try {
    const sender = await User.findById(req.user.id);
    const receiver = await User.findById(to);
    
    if (sender.balance < amount) {
      throw new Error('Insufficient balance');
    }
    
    sender.balance -= amount;
    receiver.balance += amount;
    
    await sender.save();
    await receiver.save();
    
    res.json({ success: true });
  } finally {
    // إزالة القفل
    await redis.del(lockKey);
  }
});`}
            </pre>
          </div>
        </div>

        <div className="bg-success-50 border border-success-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-success-700 mb-3">&#x2705; كود محصن - استخدام Optimistic Locking</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`// نظام محفظة محسن باستخدام Optimistic Locking
// مثال مع MongoDB

const userSchema = new mongoose.Schema({
  balance: Number,
  version: { type: Number, default: 0 }
});

app.post('/transfer', async (req, res) => {
  const { amount, to } = req.body;
  let retries = 3;
  
  while (retries > 0) {
    try {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(to);
      
      if (sender.balance < amount) {
        return res.status(400).json({ 
          error: 'Insufficient balance' 
        });
      }
      
      // تحديث مع شرط الإصدار
      const result = await User.updateOne(
        { 
          _id: req.user.id, 
          version: sender.version,
          balance: { $gte: amount }
        },
        { 
          $inc: { balance: -amount, version: 1 } 
        }
      );
      
      if (result.modifiedCount === 0) {
        // فشل التحديث، إعادة المحاولة
        retries--;
        continue;
      }
      
      await User.updateOne(
        { _id: to },
        { $inc: { balance: amount } }
      );
      
      return res.json({ success: true });
    } catch (error) {
      retries--;
    }
  }
  
  res.status(409).json({ 
    error: 'Transfer failed due to concurrent modification' 
  });
});`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">طرق الحماية</h2>

        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">1. آليات القفل (Locking Mechanisms)</h3>
            <p>
              استخدام القفل لضمان أن عملية واحدة فقط تتم في وقت واحد على مورد معين. يوجد نوعان: Pessimistic Locking (قفل يدوي) و Optimistic Locking (قفل باستخدام إصدارات).
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// Pessimistic Locking مع Redis
async function withLock(key, fn, ttl = 5000) {
  const acquired = await redis.set(
    key, '1', 'NX', 'PX', ttl
  );
  
  if (!acquired) {
    throw new Error('Lock acquisition failed');
  }
  
  try {
    return await fn();
  } finally {
    await redis.del(key);
  }
}

// الاستخدام
await withLock('transfer:user123', async () => {
  // العملية المحصنة
});`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">2. العمليات الذرّية (Atomic Operations)</h3>
            <p>
              استخدام عمليات ذرّية لا يمكن تقسيمها. كل العملية تتم بالكامل أو لا تتم أبداً. مثل استخدام MongoDB Transactions أو Redis MULTI.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// استخدام MongoDB Transactions
const session = await mongoose.startSession();
session.startTransaction();

try {
  await User.updateOne(
    { _id: senderId },
    { $inc: { balance: -amount } },
    { session }
  );
  
  await User.updateOne(
    { _id: receiverId },
    { $inc: { balance: amount } },
    { session }
  );
  
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">3. قواعد الانتظار (Queues)</h3>
            <p>
              استخدام قواعد الانتظار لمعالجة الطلبات بالتسلسل بدلاً من المعالجة المتزامنة. هذا يضمن أن الطلبات تتم معالجتها واحدة تلو الأخرى.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// استخدام Bull Queue مع Redis
const Queue = require('bull');
const transferQueue = new Queue('transfers');

// إضافة طلب إلى القائمة
app.post('/transfer', async (req, res) => {
  const job = await transferQueue.add({
    userId: req.user.id,
    amount: req.body.amount,
    to: req.body.to
  });
  
  res.json({ 
    success: true, 
    jobId: job.id 
  });
});

// معالجة الطلبات بالتسلسل
transferQueue.process(async (job) => {
  const { userId, amount, to } = job.data;
  
  const sender = await User.findById(userId);
  const receiver = await User.findById(to);
  
  if (sender.balance < amount) {
    throw new Error('Insufficient balance');
  }
  
  sender.balance -= amount;
  receiver.balance += amount;
  
  await sender.save();
  await receiver.save();
});`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">4. استخدام معرّفات فريدة (Unique Identifiers)</h3>
            <p>
              استخدام معرّفات فريدة لكل عملية لمنع المعالجة المزدوجة. يمكن التحقق من عدم تكرار المعرّف قبل تنفيذ العملية.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// استخدام معرّف فريد لمنع المعالجة المزدوجة
app.post('/transfer', async (req, res) => {
  const { amount, to, requestId } = req.body;
  
  // التحقق من عدم تكرار الطلب
  const exists = await redis.get(\`request:\${requestId}\`);
  if (exists) {
    return res.status(409).json({ 
      error: 'Request already processed' 
    });
  }
  
  // حفظ المعرّف
  await redis.set(\`request:\${requestId}\`, '1', 'EX', 3600);
  
  // تنفيذ العملية
  // ...
});`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">5. استخدام قيود قاعدة البيانات</h3>
            <p>
              استخدام قيود Integrity في قاعدة البيانات لمنع الحالات غير الصالحة. مثل استخدام.Unique constraints وال-Check constraints.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`-- استخدام قيود قاعدة البيانات
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  -- قيد فريد لمنع المعالجة المزدوجة
  UNIQUE(user_id, status, created_at)
);

-- استخدام stored procedure لعمليات آمنة
CREATE OR REPLACE FUNCTION transfer(
  sender_id UUID,
  receiver_id UUID,
  amount DECIMAL
) RETURNS BOOLEAN AS $$
BEGIN
  -- قفل الصفوف
  PERFORM * FROM users 
  WHERE id IN (sender_id, receiver_id) 
  FOR UPDATE;
  
  -- التحقق من الرصيد
  IF (SELECT balance FROM users WHERE id = sender_id) < amount THEN
    RETURN FALSE;
  END IF;
  
  -- تنفيذ التحويل
  UPDATE users SET balance = balance - amount 
  WHERE id = sender_id;
  UPDATE users SET balance = balance + amount 
  WHERE id = receiver_id;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;`}
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
              <span><strong>القاعدة الذهبية:</strong> استخدم العمليات الذرّية لكل التعاملات المالية</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>استخدم قفل قاعدة البيانات (Database Locking) للعمليات الحساسة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>استخدم قواعد الانتظار للمعالجة المتتالية</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>أضف معرّفات فريدة لكل طلب لمنع المعالجة المزدوجة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>استخدم Optimistic Locking مع عمليات القراءة الكثيرة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>اختبر حالات السباق بشكل منهجي أثناء تطوير التطبيق</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الأخطاء الشائعة</h2>
        <div className="space-y-4">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; استخدام Read-Before-Write بدون قفل</h4>
            <p className="text-gray-600 mb-0">التحقق من الحالة ثم تحديثها بدون قفل يسبب ثغرات TOCTOU</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; الاعتماد على التوقيت لمنع التكرار</h4>
            <p className="text-gray-600 mb-0">التحقق من الوقت لا يكفي لمنع المعالجة المزدوجة</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; عدم استخدام Transactions في قواعد البيانات</h4>
            <p className="text-gray-600 mb-0">العمليات المتعددة بدون Transaction قد تترك البيانات في حالة غير متسقة</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; استخدام Application-Level Locking وحده</h4>
            <p className="text-gray-600 mb-0">القفل على مستوى التطبيق لا يكفي إذا كان هناك نسخ متعددة من التطبيق</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <LabsSection slug="race-condition" />
        <ToolsSection slug="race-condition" />
      </section>

      <section className="mb-12">
        <Quiz slug="race-condition" />
        <VideoSection slug="race-condition" />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الثغرات الأخرى</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vulnerabilities/sql-injection" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F489;</span>
            <h4 className="font-bold mt-2">حقن SQL</h4>
          </Link>
          <Link href="/vulnerabilities/xss" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F4DC;</span>
            <h4 className="font-bold mt-2">XSS</h4>
          </Link>
          <Link href="/vulnerabilities/csrf" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F3A3;</span>
            <h4 className="font-bold mt-2">CSRF</h4>
          </Link>
        </div>
      </section>
    </div>
  );
}
