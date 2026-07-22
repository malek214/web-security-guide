import Link from "next/link";

export default function BusinessLogicPage() {
  return (
    <div dir="rtl" className="max-w-4xl mx-auto prose prose-lg">
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary-600 transition">
          الرئيسية
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">ثغرات المنطق التجاري</span>
      </nav>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x1F4CA;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">
              ثغرات المنطق التجاري
            </h1>
            <p className="text-xl text-gray-500 mt-1">
              Business Logic Vulnerabilities
            </p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <p className="text-danger-700 font-semibold mb-0">
            &#x26A0; مستوى الخطورة: عالي جداً (يعتمد على السياق)
          </p>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          تعريف ثغرات المنطق التجاري
        </h2>
        <p>
          ثغرات المنطق التجاري (Business Logic Vulnerabilities) هي نقاط ضعف
          أمنية تنشأ عندما يفشل المطورون في التفكير بشكل كافٍ في سيناريوهات
          الاستخدام غير الطبيعية أثناء تصميم ميزات تطبيق الويب. على عكس الثغرات
          التقليدية مثل XSS أو SQL Injection، ثغرات المنطق التجاري لا تعتمد على
          أخطاء تقنية بل على سوء فهم أو تجاهل لقواعد العمل الأساسية للنظام.
        </p>
        <p>
          تتضمن هذه الثغرات التلاعب بالأسعار، التلاعب بالكميات، تجاوز سير العمل،
          إساءة استخدام كوبونات الخصم، والتحكم بالكوبونات والهدايا. المهاجمون
          يستطيعون استغلال هذه الثغرات لتحقيق أرباح غير مشروعة، الوصول إلى
          بيانات حساسة، أو تعطيل العمليات التجارية.
        </p>
        <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 mt-4">
          <p className="text-warning-700 font-semibold mb-0">
            &#x1F4A1; ملاحظة مهمة: ثغرات المنطق التجاري صعبة الاكتشاف
            تلقائياً لأنها تتطلب فهم عميق لطريقة عمل التطبيق والتحقق من صحة
            البيانات على مستوى الخادم.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          أنواع ثغرات المنطق التجاري
        </h2>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            1. التلاعب بالأسعار (Price Manipulation)
          </h3>
          <p>
            يحدث عندما يسمح التطبيق للمستخدم بتغيير سعر المنتج أو الخدمة عبر
            تعديل المدخلات في الطلب. يمكن للمهاجم خفض الأسعار بشكل كبير أو حتى
           جعل المنتجات مجانية.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
              {`// مثال على طلب شراء مُعدّل (JSON)
POST /api/purchase
{
  "product_id": 123,
  "price": 0.01,  // سعر مُعدّل بدلاً من السعر الأصلي 100$
  "quantity": 1
}

// إذا لم يتحقق الخادم من السعر الأصلي في قاعدة البيانات
// سيقبل الطلب ويبيع المنتج بسعر 0.01$ فقط`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            2. التلاعب بالكميات (Quantity Tampering)
          </h3>
          <p>
            عندما يسمح التطبيق للمستخدم بتحديد كمية غير محدودة أو يتجاوز
            الحدود المسموحة. يمكن للمهاجم شراء كميات ضخمة بأسعار مخفضة أو
            استغلال عروض الكمية.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
              {`// مثال على طلب شراء بكمية غير محدودة
POST /api/cart/add
{
  "product_id": 123,
  "quantity": 999999  // كمية غير محدودة
}

// إذا لم يتحقق الخادم من توفر المخزون أو الحد الأقصى
// سيقبل الطلب ويستنزف المخزون`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            3. تجاوز سير العمل (Workflow Bypass)
          </h3>
          <p>
            عندما يتجاوز المستخدم خطوات متسلسلة في سير العمل (مثل تخطي مرحلة
            الدفع أو التحقق). يمكن للمهاجم الوصول إلى خطوات لاحقة دون إكمال
            الخطوات السابقة.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
              {`// مثال على تجاوز سير العمل
// الخطوة 1: إضافة منتج إلى السلة
POST /api/cart/add → 200 OK

// الخطوة 2: إدخال عنوان الشحن (يجب أن تتم أولاً)
POST /api/shipping/address → 200 OK

// الخطوة 3: الدفع
POST /api/payment/checkout → 200 OK

// المهاجم يتخطى الخطوة 2 ويذهب مباشرة إلى الدفع
// إذا لم يتحقق الخادم من اكتمال الخطوات السابقة
// سيقبل الطلب`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            4. إساءة استخدام الكوبونات (Coupon Abuse)
          </h3>
          <p>
            عندما يسمح التطبيق باستخدام كوبون خصم بشكل متكرر أو تجاوز
            الحدود المخصصة. يمكن للمهاجم استخدام كوبون واحد عدة مرات أو
            دمج كوبونات للحصول على خصومات كبيرة.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
              {`// مثال على إساءة استخدام الكوبونات
// استخدام كوبون واحد عدة مرات
POST /api/checkout
{
  "coupon_code": "SAVE50",
  "cart_id": "abc123"
}

// إذا لم يتحقق الخادم من استخدام الكوبون مسبقاً
// يمكن للمهاجم استخدامه في كل طلب

// مثال على دمج كوبونات
POST /api/checkout
{
  "coupon_codes": ["SAVE50", "FREESHIP", "WELCOME10"],
  "cart_id": "abc123"
}

// إذا لم يحدد التطبيق قواعد دمج الكوبونات
// يمكن للمهاجم الجمع بينها`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            5. التلاعب بالنقاط والمكافآت (Loyalty Points Tampering)
          </h3>
          <p>
            عندما يسمح التطبيق للمستخدم بتعديل نقاط الولاء أو المكافآت. يمكن
            للمهاجم زيادة نقاطه بشكل غير مشروع أو استبدالها بمنتجات مجانية.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
              {`// مثال على التلاعب بنقاط الولاء
PUT /api/user/points
{
  "points": 999999  // زيادة النقاط يدوياً
}

// إذا لم يتحقق الخادم من مصدر النقاط
// سيقبل التعديل`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            6. التلاعب بسير الدفع (Payment Bypass)
          </h3>
          <p>
            عندما يتجاوز المستخدم خطوات الدفع أو يغير حالة الطلب. يمكن
            للمهاجم تأكيد طلب دون الدفع فعلياً أو تغيير حالة الدفع من
            &quot;معلق&quot; إلى &quot;مكتمل&quot;.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
              {`// مثال على تجاوز الدفع
POST /api/order/confirm
{
  "order_id": "ORD-12345",
  "payment_status": "completed"  // تغيير الحالة يدوياً
}

// إذا لم يتحقق الخادم من حالة الدفع الحقيقية من بوابة الدفع
// سيقبل الطلب`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            7. التلاعب بالخصومات والعرض (Discount Manipulation)
          </h3>
          <p>
            عندما يسمح التطبيق بتطبيق خصومات إضافية بشكل غير مشروع. يمكن
            للمهاجم تطبيق عدة خصومات على نفس المنتج أو تجاوز الحد الأقصى
            للخصم.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
              {`// مثال على تلاعب الخصومات
POST /api/discount/apply
{
  "product_id": 123,
  "discount_code": "EXTRA70"  // خصم 70% إضافي
}

// إذا لم يتحقق الخادم من صلاحية الكود
// أو إذا كان الكود مخصصاً للمشرفين فقط
// يمكن للمهاجم تطبيقه`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          أمثلة واقعية على الهجمات
        </h2>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            مثال 1: شراء منتج بسعر مخفض
          </h3>
          <p>
            سيناريو: متجر إلكتروني يسمح للمستخدمين بشراء منتجات. المهاجم
            يعدل سعر المنتج في الطلب ويحصل عليه بسعر 0.01$ بدلاً من 100$.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
              {`// الطلب الأصلي
POST /api/purchase HTTP/1.1
Host: shop.example.com
Cookie: session=abc123

{
  "product_id": 456,
  "price": 100.00,
  "quantity": 1,
  "currency": "USD"
}

// الطلب المُعدّل
POST /api/purchase HTTP/1.1
Host: shop.example.com
Cookie: session=abc123

{
  "product_id": 456,
  "price": 0.01,  // تم التعديل
  "quantity": 1,
  "currency": "USD"
}`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            مثال 2: استغلال كوبون غير محدود
          </h3>
          <p>
            سيناريو: موقع توصيل طعام يقدم كوبون خصم 50$ للمستخدمين الجدد.
            المهاجم يستخدم الكوبون عدة مرات عبر حسابات مختلفة.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
              {`// استخدام الكوبون في حساب جديد
POST /api/checkout
{
  "user_id": "user_001",
  "coupon_code": "WELCOME50",
  "cart_total": 60.00
}

// استخدام نفس الكوبون في حساب آخر
POST /api/checkout
{
  "user_id": "user_002",
  "coupon_code": "WELCOME50",
  "cart_total": 55.00
}

// إذا لم يتحقق النظام من:
// - استخدام الكود مسبقاً
// - رقم الهاتف أو البريد الإلكتروني
// يمكن تكرار الاستخدام`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            مثال 3: تجاوز حدود السحب النقدي
          </h3>
          <p>
            سيناريو: تطبيق محفظة إلكترونية يحدد سحباً أقصى قدره 1000$ يومياً.
            المهاجم يتجاوز الحد عبر تعديل مبلغ السحب في الطلب.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
              {`// طلب سحب عادي
POST /api/withdrawal
{
  "amount": 1000.00,
  "currency": "USD",
  "method": "bank_transfer"
}

// طلب سحب مُعدّل
POST /api/withdrawal
{
  "amount": 50000.00,  // تم تجاوز الحد
  "currency": "USD",
  "method": "bank_transfer"
}

// إذا لم يتحقق الخادم من الحد اليومي
// سيقبل الطلب`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          أمثلة على كود مصاب ومحصن
        </h2>

        <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-danger-700 mb-3">
            &#x274C; كود مصاب - التحقق من السعر في الطلب
          </h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
              {`// Node.js/Express - كود مصاب
app.post('/api/purchase', (req, res) => {
  const { product_id, price, quantity } = req.body;

  // ❌ خطأ: استخدام السعر من الطلب مباشرة
  const total = price * quantity;

  // لا يوجد تحقق من السعر الأصلي
  const order = {
    product_id,
    price,
    quantity,
    total
  };

  db.orders.create(order);
  res.json({ success: true, total });
});`}
            </pre>
          </div>
        </div>

        <div className="bg-success-50 border border-success-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-success-700 mb-3">
            &#x2705; كود محصن - التحقق من السعر في قاعدة البيانات
          </h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
              {`// Node.js/Express - كود محصن
app.post('/api/purchase', async (req, res) => {
  const { product_id, quantity } = req.body;

  // ✅ صحيح: جلب السعر من قاعدة البيانات
  const product = await db.products.findById(product_id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // ✅ صحيح: التحقق من توفر المخزون
  if (product.stock < quantity) {
    return res.status(400).json({ error: 'Insufficient stock' });
  }

  // ✅ صحيح: حساب السعر من قاعدة البيانات
  const total = product.price * quantity;

  const order = {
    product_id,
    price: product.price,  // استخدام السعر من قاعدة البيانات
    quantity,
    total,
    status: 'pending'
  };

  await db.orders.create(order);
  res.json({ success: true, total });
});`}
            </pre>
          </div>
        </div>

        <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-danger-700 mb-3">
            &#x274C; كود مصاب - كوبون بدون تحقق
          </h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
              {`// كود مصاب - كوبون بدون تحقق من الاستخدام
app.post('/api/checkout', async (req, res) => {
  const { coupon_code, cart_id } = req.body;

  const coupon = await db.coupons.findOne({ code: coupon_code });

  // ❌ خطأ: لا يوجد تحقق من استخدام الكوبون مسبقاً
  if (coupon) {
    const discount = coupon.discount;
    // تطبيق الخصم
  }

  res.json({ success: true, discount });
});`}
            </pre>
          </div>
        </div>

        <div className="bg-success-50 border border-success-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-success-700 mb-3">
            &#x2705; كود محصن - كوبون مع تحقق شامل
          </h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
              {`// كود محصن - كوبون مع تحقق شامل
app.post('/api/checkout', async (req, res) => {
  const { coupon_code, cart_id, user_id } = req.body;

  const coupon = await db.coupons.findOne({ code: coupon_code });
  if (!coupon) {
    return res.status(400).json({ error: 'Invalid coupon' });
  }

  // ✅ صحيح: التحقق من تاريخ انتهاء الصلاحية
  if (coupon.expires_at < new Date()) {
    return res.status(400).json({ error: 'Coupon expired' });
  }

  // ✅ صحيح: التحقق من عدد الاستخدامات
  if (coupon.used_count >= coupon.max_uses) {
    return res.status(400).json({ error: 'Coupon usage limit reached' });
  }

  // ✅ صحيح: التحقق من عدم استخدام الكوبون من نفس المستخدم
  const previousUse = await db.coupon_usage.findOne({
    coupon_id: coupon.id,
    user_id: user_id
  });

  if (previousUse) {
    return res.status(400).json({ error: 'Coupon already used' });
  }

  // ✅ صحيح: التحقق من الحد الأقصى للخصم
  const maxDiscount = coupon.max_discount || Infinity;
  const discount = Math.min(coupon.discount, maxDiscount);

  // تسجيل الاستخدام
  await db.coupon_usage.create({
    coupon_id: coupon.id,
    user_id,
    used_at: new Date()
  });

  // زيادة عداد الاستخدام
  await db.coupons.update(coupon.id, {
    used_count: coupon.used_count + 1
  });

  res.json({ success: true, discount });
});`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          كيفية اكتشاف ثغرات المنطق التجاري
        </h2>

        <h3 className="text-xl font-bold text-gray-800 mb-3">
          علامات الضعف
        </h3>
        <ul className="list-disc mr-6 mb-4">
          <li>قدرة المستخدم على تعديل الأسعار أو الكمية في الطلب</li>
          <li>عدم وجود تحقق من البيانات على الخادم (Server-side Validation)</li>
          <li>إمكانيه تجاوز خطوات سير العمل المتسلسلة</li>
          <li>عدم تقييد استخدام الكوبونات أو الخصومات</li>
          <li>عدم وجود سجل للعمليات المالية الحساسة</li>
          <li>عدم تطبيق Rate Limiting على العمليات الحساسة</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-800 mb-3">
          أساليب الاكتشاف
        </h3>
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">
              1. مراجعة الكود يدوياً (Manual Code Review)
            </h4>
            <p className="text-gray-600 mb-0">
              مراجعة الكود المصدري للبحث عن عناصر تسمح بتغيير قيم محددة
              مسبقاً أو تجاوز قيود سير العمل.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">
              2. اختبار الاختراق (Penetration Testing)
            </h4>
            <p className="text-gray-600 mb-0">
              محاكاة هجمات حقيقية لاختبار مقاومة التطبيق ضد التلاعب بالبيانات
              والعمليات التجارية.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">
              3. اختبار الوحدات (Unit Testing)
            </h4>
            <p className="text-gray-600 mb-0">
              كتابة اختبارات تتحقق من سلوك التطبيق في سيناريوهات غير طبيعية
              مثل الأسعار السالبة أو الكميات الكبيرة.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">
              4. مراجعة سجلات التدقيق (Audit Log Review)
            </h4>
            <p className="text-gray-600 mb-0">
              تحليل سجلات العمليات لاكتشاف أنماط غير طبيعية مثل طلبات
              الأسعار المنخفضة المتكررة.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">
          أدوات الاكتشاف
        </h3>
        <ul className="list-disc mr-6 mb-4">
          <li>
            <strong>Burp Suite</strong> - أداة شاملة لاختبار أمن تطبيقات الويب
          </li>
          <li>
            <strong>OWASP ZAP</strong> - أداة مجانية لاكتشاف الثغرات
          </li>
          <li>
            <strong>Postman</strong> - اختبار API والتحقق من المنطق التجاري
          </li>
          <li>
            <strong>Selenium</strong> - اختبار تلقائي لسير العمل
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          طرق الحماية والوقاية
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              1. التحقق من البيانات على الخادم (Server-side Validation)
            </h3>
            <p>
              يجب دائماً التحقق من صحة البيانات المرسلة من العميل على الخادم.
              لا تثق أبداً بالبيانات القادمة من متصفح المستخدم.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
                {`// مثال على التحقق من البيانات على الخادم
app.post('/api/purchase', async (req, res) => {
  const { product_id, quantity } = req.body;

  // ✅ التحقق من أن الكمية عدد موجب且within الحد
  if (!Number.isInteger(quantity) || quantity <= 0 || quantity > 100) {
    return res.status(400).json({ error: 'Invalid quantity' });
  }

  // ✅ جلب السعر من قاعدة البيانات
  const product = await db.products.findById(product_id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // ✅ استخدام السعر من قاعدة البيانات فقط
  const total = product.price * quantity;

  // ✅ التحقق من أن المبلغ المدفوع يساوي المبلغ المحسوب
  if (req.body.total_paid !== total) {
    return res.status(400).json({ error: 'Price mismatch' });
  }
});`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              2. سلامة سير العمل (Workflow Integrity)
            </h3>
            <p>
              تأكد من أن المستخدمين لا يمكنهم تخطي خطوات سير العمل المتسلسلة.
              استخدم رموز (Tokens) لتتبع تقدم المستخدم.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
                {`// مثال على حماية سير العمل
app.post('/api/order/step/:step', async (req, res) => {
  const { step } = req.params;
  const { order_id } = req.body;

  const order = await db.orders.findById(order_id);

  // ✅ التحقق من الخطوة الحالية
  const validSteps = ['cart', 'shipping', 'payment', 'confirm'];
  const currentStepIndex = validSteps.indexOf(order.current_step);
  const requestedStepIndex = validSteps.indexOf(step);

  if (requestedStepIndex !== currentStepIndex + 1) {
    return res.status(400).json({
      error: 'Cannot skip steps',
      current_step: order.current_step
    });
  }

  // ✅ تحديث الخطوة الحالية
  await db.orders.update(order_id, { current_step: step });
  res.json({ success: true, next_step: step });
});`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              3. تقييد معدل الطلبات (Rate Limiting)
            </h3>
            <p>
              تقييد عدد الطلبات للمعاملات الحساسة لمنع الاستخدام المتكرر
              والهجمات التكتلية.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
                {`// مثال على Rate Limiting في Node.js
const rateLimit = require('express-rate-limit');

// تقييد عمليات الشراء
const purchaseLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 5, // 5 طلبات كحد أقصى
  message: 'Too many purchase attempts',
  standardHeaders: true,
  legacyHeaders: false
});

app.post('/api/purchase', purchaseLimiter, async (req, res) => {
  // معالجة الطلب
});

// تقييد استخدام الكوبونات
const couponLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // ساعة
  max: 3, // 3 محاولات كحد أقصى
  message: 'Too many coupon attempts'
});

app.post('/api/coupon/apply', couponLimiter, async (req, res) => {
  // معالجة الكوبون
});`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              4. تشفير البيانات الحساسة في الخادم
            </h3>
            <p>
              لا ترسل البيانات الحساسة مثل الأسعار والخصومات من العميل إلى
              الخادم. حفظها في الخادم واحسبها هناك.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
                {`// ❌ خطأ: إرسال السعر من العميل
{
  "product_id": 123,
  "price": 100.00,  // لا تثق بهذا السعر
  "discount": 50    // لا تثق بهذا الخصم
}

// ✅ صحيح: إرسال المعرّفات فقط
{
  "product_id": 123,
  "coupon_code": "SAVE50"  // الخادم يتحقق من الكود ويحسب الخصم
}`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              5. استخدام الرموز المميزة (Idempotency Keys)
            </h3>
            <p>
              استخدم مفاتيح فريدة لكل عملية لتمنع المعالجة المكررة للطلبات
              المتشابهة.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
                {`// مثال على استخدام Idempotency Keys
app.post('/api/payment', async (req, res) => {
  const { idempotency_key, amount, product_id } = req.body;

  // ✅ التحقق من وجود المفتاح مسبقاً
  const existingPayment = await db.payments.findOne({
    idempotency_key
  });

  if (existingPayment) {
    return res.status(409).json({
      error: 'Payment already processed',
      payment_id: existingPayment.id
    });
  }

  // معالجة الدفع
  const payment = await processPayment(amount, product_id);

  // ✅ حفظ المفتاح مع الدفع
  await db.payments.create({
    ...payment,
    idempotency_key
  });

  res.json({ success: true, payment_id: payment.id });
});`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          نصائح أمنية
        </h2>
        <div className="bg-success-50 border border-success-200 rounded-lg p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>
                <strong>القاعدة الذهبية:</strong> لا تثق أبداً بالبيانات
                القادمة من العميل - تحقق دائماً على الخادم
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>
                احسب الأسعار والخصومات على الخادم فقط ولا ترسلها من العميل
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>
                استخدم رموز (Tokens) لتتبع تقدم المستخدم في سير العمل
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>
                فعّل Rate Limiting على جميع العمليات الحساسة
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>
                استخدم Idempotency Keys لمنع المعالجة المكررة
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>
                سجّل جميع العمليات المالية في Audit Log
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>
                قم بمراجعة الكود بشكل دوري واختبار سيناريوهات الهجوم
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>
                استخدم اختبارات الأتمتة للتحقق من سلوك المنطق التجاري
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          الأخطاء الشائعة
        </h2>
        <div className="space-y-4">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">
              &#x274C; استخدام السعر أو الكمية من الطلب مباشرة
            </h4>
            <p className="text-gray-600 mb-0">
              لا تثق بالبيانات القادمة من العميل - احسبها دائماً على الخادم
            </p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">
              &#x274C; عدم تقييد Rate Limiting على العمليات الحساسة
            </h4>
            <p className="text-gray-600 mb-0">
              بدون Rate Limiting، يمكن للمهاجم تكرار العمليات بشكل لا محدود
            </p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">
              &#x274C; عدم التحقق من اكتمال خطوات سير العمل
            </h4>
            <p className="text-gray-600 mb-0">
              يمكن للمهاجم تخطي خطوات مهمة مثل الدفع أو التحقق
            </p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">
              &#x274C; عدم استخدام Idempotency Keys للعمليات المالية
            </h4>
            <p className="text-gray-600 mb-0">
              يمكن للمهاجم إعادة إرسال نفس الطلب عدة مرات
            </p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">
              &#x274C; عدم سجل التدقيق للعمليات الحساسة
            </h4>
            <p className="text-gray-600 mb-0">
              بدون Audit Log، لا يمكنك كشف الهجمات أو التحقيق فيها
            </p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">
              &#x274C; استخدام قيود العميل فقط (Client-side Validation)
            </h4>
            <p className="text-gray-600 mb-0">
              قيود العميل يمكن تجاوزها بسهولة - يجب أن تكون القيود الرئيسية
              على الخادم
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          الثغرات الأخرى
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/vulnerabilities/sql-injection"
            className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
          >
            <span className="text-2xl">&#x1F489;</span>
            <h4 className="font-bold mt-2">حقن SQL</h4>
          </Link>
          <Link
            href="/vulnerabilities/xss"
            className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
          >
            <span className="text-2xl">&#x1F4DC;</span>
            <h4 className="font-bold mt-2">XSS</h4>
          </Link>
          <Link
            href="/vulnerabilities/csrf"
            className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
          >
            <span className="text-2xl">&#x1F3A3;</span>
            <h4 className="font-bold mt-2">CSRF</h4>
          </Link>
        </div>
      </section>
    </div>
  );
}
