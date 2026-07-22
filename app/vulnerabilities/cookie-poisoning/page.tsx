import Link from "next/link";
import VideoSection from '@/components/VideoSection'

export const metadata = {
  title: "تسميم الكوكيز - Cookie Poisoning | دليل أمن الويب",
  description:
    "دليل شامل عن ثغرة تسميم الكوكيز Cookie Poisoning وكيفية اكتشافها ومنعها في تطبيقات الويب",
};

type CodeBlockProps = {
  title: string;
  children: string;
  language?: string;
};

function CodeBlock({ title, children, language = "javascript" }: CodeBlockProps) {
  return (
    <div className="rounded-lg border border-red-500/20 bg-gray-950 overflow-hidden">
      <div className="flex items-center justify-between border-b border-red-500/20 bg-gray-900 px-4 py-2">
        <span className="text-sm font-mono text-red-400">{title}</span>
        <span className="text-xs text-gray-500">{language}</span>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-gray-300">{children}</code>
      </pre>
    </div>
  );
}

type AlertBoxProps = {
  type: "danger" | "warning" | "info" | "success";
  title: string;
  children: React.ReactNode;
};

function AlertBox({ type, title, children }: AlertBoxProps) {
  const styles = {
    danger: "border-red-500/40 bg-red-500/10 text-red-300",
    warning: "border-yellow-500/40 bg-yellow-500/10 text-yellow-300",
    info: "border-blue-500/40 bg-blue-500/10 text-blue-300",
    success: "border-green-500/40 bg-green-500/10 text-green-300",
  };

  return (
    <div className={`rounded-lg border p-4 ${styles[type]}`}>
      <h4 className="mb-2 font-bold">{title}</h4>
      <div className="text-sm leading-relaxed opacity-90">{children}</div>
    </div>
  );
}

type StepCardProps = {
  number: number;
  title: string;
  children: React.ReactNode;
};

function StepCard({ number, title, children }: StepCardProps) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-lg font-bold text-red-400">
        {number}
      </div>
      <div>
        <h4 className="mb-2 font-bold text-gray-100">{title}</h4>
        <div className="text-sm leading-relaxed text-gray-400">{children}</div>
      </div>
    </div>
  );
}

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-5">
      <div className="mb-3 text-2xl">{icon}</div>
      <h4 className="mb-2 font-bold text-gray-100">{title}</h4>
      <p className="text-sm leading-relaxed text-gray-400">{description}</p>
    </div>
  );
}

export default function CookiePoisoningPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-200" dir="rtl">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-300">
            الرئيسية
          </Link>
          <span className="mx-2">/</span>
          <Link href="/vulnerabilities" className="hover:text-gray-300">
            الثغرات
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">تسميم الكوكيز</span>
        </nav>

        {/* Hero Section */}
        <header className="mb-12 rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/10 via-gray-900 to-gray-950 p-8 text-center">
          <div className="mb-4 inline-block rounded-full bg-red-500/20 px-4 py-1 text-sm font-medium text-red-400">
            Cookie Poisoning
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white">
            تسميم الكوكيز
          </h1>
          <p className="mb-2 text-lg text-gray-400">
            Cookie Poisoning
          </p>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500">
            ثغرة أمنية تسمح للمهاجم بتعديل محتوى الكوكيز أوحقنه ببيانات ضارة
            لاستهداف الجلسات والمستخدمين والتحكم في سلوك التطبيق
          </p>
        </header>

        {/* Table of Contents */}
        <nav className="mb-12 rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h2 className="mb-4 text-lg font-bold text-white">محتويات الصفحة</h2>
          <ul className="space-y-2 text-sm">
            {[
              { href: "#definition", label: "تعريف تسميم الكوكيز" },
              { href: "#types", label: "أنواع تسميم الكوكيز" },
              { href: "#examples", label: "أمثلة واقعية بالكود" },
              { href: "#detection", label: "كيفية اكتشاف الثغرة" },
              { href: "#prevention", label: "طرق الحماية والمنع" },
              { href: "#tips", label: "نصائح أمنية وأخطاء شائعة" },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Definition Section */}
        <section id="definition" className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">
            تعريف تسميم الكوكيز
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-gray-400">
            <p>
              <strong className="text-white">تسميم الكوكيز (Cookie Poisoning)</strong> هو تقنية هجوم
              تتضمن تعديل أوحقن بيانات ضارة في ملفات الكوكيز المخزنة في متصفح
              المستخدم. يقوم المهاجم بتغيير قيم الكوكيز لإعادة توجيه الجلسات أو
              التلاعب ببيانات المستخدم أوال获取 معلومات حساسة.
            </p>
            <p>
              الكوكيز هي ملفات نصية صغيرة يتم تخزينها في متصفح المستخدم وتُرسل
              مع كل طلب HTTP إلى الخادم. بما أن الكوكيز مخزنة على جانب العميل
              (Client-side)، يمكن للمستخدم أوالمهاجم الوصول إليها وتعديلها بسهولة
              إذا لم يتم اتخاذ الإجراءات الأمنية المناسبة.
            </p>
          </div>

          <AlertBox type="danger" title="لماذا تسميم الكوكيز خطير؟">
            <p>
              يتيح للمهاجم اختراق الجلسات والاستيلاء على حسابات المستخدمين،
              وتغيير الصلاحيات، والتلاعب ببيانات المستخدم الشخصية، وتنفيذ هجمات
              Session Hijacking بشكل فعال.
            </p>
          </AlertBox>
        </section>

        {/* Types Section */}
        <section id="types" className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">
            أنواع تسميم الكوكيز
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon="🔧"
              title="التعديل السريع (Cookie Tampering)"
              description="تعديل القيم المخزنة في الكوكيز مباشرة عبر محرر الكوكيز في المتصفح أوأدوات التصحيح ل更改 صلاحيات المستخدم أوبياناته."
            />
            <FeatureCard
              icon="💉"
              title="حقن الكوكيز (Cookie Injection)"
              description="إدخال بيانات ضارة في الكوكيز من خلال ثغرات XSS أومن خلال تعديل الطلبات HTTP لإضافة كوكيز مزيفة."
            />
            <FeatureCard
              icon="🔗"
              title="تثبيت الجلسة (Session Fixation)"
              description="إرسال رابط يحتوي على معرّف جلسة محدد للمستخدم، ثم استخدام هذا المعرّف للاستيلاء على الجلسة بعد تسجيل الدخول."
            />
            <FeatureCard
              icon="🔄"
              title="استبدال الكوكيز (Cookie Replacement)"
              description="استبدال الكوكيز الأصلية بكوكيز مزيفة تحتوي على بيانات مخالفة، مثل تغيير معرّف المستخدم أوالدور."
            />
            <FeatureCard
              icon="📦"
              title="تلوث الكوكيز (Cookie Contamination)"
              description="حقن بيانات غير متوقعة في الكوكيز مما يسبب سلوكاً غير مرجو في التطبيق أوأخطاء في المعالجة."
            />
            <FeatureCard
              icon="🎯"
              title="استهداف الكوكيز (Targeted Cookie Attacks)"
              description="استهداف كوكيز محددة مثل كوكيز المفضلة أوسلة التسوق أوبيانات الدفع لإعادة توجيه المعاملات."
            />
          </div>
        </section>

        {/* Examples Section */}
        <section id="examples" className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">
            أمثلة واقعية بالكود
          </h2>

          <div className="space-y-8">
            {/* Example 1: Basic Cookie Poisoning */}
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 text-lg font-bold text-white">
                مثال 1: تعديل الكوكيز يدوياً
              </h3>
              <p className="mb-4 text-sm text-gray-400">
                عندما يخزن التطبيق معلومات المستخدم في كوكبز غير مشفرة:
              </p>
              <CodeBlock title="app/api/login/route.ts" language="typescript">
{`import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  const user = await authenticateUser(username, password);

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // ❌ خطأ: تخزين معلومات حساسة في الكوكيز بدون تشفير
  const cookieStore = cookies();
  (await cookieStore).set("user_session", JSON.stringify({
    userId: user.id,
    username: user.username,
    role: user.role,
    email: user.email,
  }));

  return NextResponse.json({ success: true });
}`}
              </CodeBlock>

              <div className="mt-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
                <p className="text-sm text-yellow-300">
                  <strong>المشكلة:</strong> يمكن للمهاجم فتح محرر الكوكيز في
                  المتصفح (F12 → Application → Cookies) وتعديل قيمة
                  user_session مباشرة، مثل تغيير Role من &quot;user&quot; إلى
                  &quot;admin&quot;.
                </p>
              </div>
            </div>

            {/* Example 2: Cookie-Based Access Control */}
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 text-lg font-bold text-white">
                مثال 2: التحقق من الصلاحيات عبر الكوكيز
              </h3>
              <CodeBlock title="app/api/admin/route.ts" language="typescript">
{`import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const session = (await cookieStore).get("user_session")?.value;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userData = JSON.parse(session);

  // ❌ خطأ: التحقق من الصلاحيات من كوكبز غير مشفرة
  if (userData.role === "admin") {
    return NextResponse.json({
      users: await getAllUsers(),
      settings: await getSystemSettings(),
    });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}`}
              </CodeBlock>

              <AlertBox type="warning" title="iskey المهاجم">
                <p>
                  يمكن للمهاجم إنشاء كوكبز يدوياً بقيمة:
                  <code className="mx-1 rounded bg-gray-800 px-1 py-0.5 text-xs">
                    {`{"userId":1,"username":"victim","role":"admin","email":"victim@example.com"}`}
                  </code>
                  ثم إرساله مع الطلب للحصول على وصول كامل.
                </p>
              </AlertBox>
            </div>

            {/* Example 3: Secure Implementation */}
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 text-lg font-bold text-white">
                مثال 3: التحقق من الكوكيز المشفرة (الحل الصحيح)
              </h3>
              <CodeBlock title="lib/auth.ts" language="typescript">
{`import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

interface SessionPayload {
  userId: string;
  role: string;
  exp: number;
}

// توقيع الكوكيز بـ JWT
export async function createSession(payload: Omit<SessionPayload, "exp">) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET_KEY);

  const cookieStore = cookies();
  (await cookieStore).set("session", token, {
    httpOnly: true,    // ❌ لا يمكن الوصول إليها من JavaScript
    secure: true,      // ❌ فقط عبر HTTPS
    sameSite: "strict", // ❌ لا تُرسل مع الطلبات الخارجية
    maxAge: 60 * 60 * 24, // 24 ساعة
    path: "/",
  });
}

// التحقق من الكوكيز المشفرة
export async function verifySession(): Promise<SessionPayload | null> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("session")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as unknown as SessionPayload;
  } catch {
    return null; // الكوكيز غير صالحة أومنتهية الصلاحية
  }
}`}
              </CodeBlock>

              <CodeBlock title="app/api/admin/route.ts" language="typescript">
{`import { verifySession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await verifySession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ✅ التحقق من الصلاحيات من الجلسة المشفرة والموثقة
  if (session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({
    users: await getAllUsers(),
    settings: await getSystemSettings(),
  });
}`}
              </CodeBlock>
            </div>

            {/* Example 4: Session Fixation */}
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 text-lg font-bold text-white">
                مثال 4: هجوم تثبيت الجلسة (Session Fixation)
              </h3>
              <CodeBlock title="app/api/login/route.ts" language="typescript">
{`import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// ❌ خاطئ: إعادة استخدام الجلسة القديمة بعد تسجيل الدخول
export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  const user = await authenticateUser(username, password);
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const cookieStore = cookies();

  // ❌ لا يتم مسح الكوكيز القديمة وإنشاء جلسة جديدة
  (await cookieStore).set("session_id", user.sessionId);

  return NextResponse.json({ success: true });
}

// ✅ صحيح: إنشاء جلسة جديدة بعد المصادقة
export async function POST_Secure(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  const user = await authenticateUser(username, password);
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const cookieStore = cookies();

  // ✅ مسح أي جلسة قديمة وإنشاء جلسة جديدة
  (await cookieStore).delete("session_id");
  const newSessionId = crypto.randomUUID();
  (await cookieStore).set("session_id", newSessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  await createServerSession(newSessionId, user.id);

  return NextResponse.json({ success: true });
}`}
              </CodeBlock>
            </div>

            {/* Example 5: Cookie with user preferences */}
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 text-lg font-bold text-white">
                مثال 5: التلاعب بكوكيز التفضيلات
              </h3>
              <CodeBlock title="app/api/preferences/route.ts" language="typescript">
{`import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// ❌ خاطئ: استخدام كوكبز مفتوحة بدون تحقق
export async function GET_Insecure() {
  const cookieStore = cookies();
  const preferences = (await cookieStore).get("user_preferences")?.value;

  if (preferences) {
    const prefs = JSON.parse(preferences);
    // ❌ عرض السعر بناءً على الكوكيز - يمكن التلاعب به
    return NextResponse.json({ price: prefs.discount ? 50 : 100 });
  }

  return NextResponse.json({ price: 100 });
}

// ✅ صحيح: استخدام كوكبز مشفرة مع التحقق من الخادم
export async function GET_Secure() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ✅ التحقق من الخصم من قاعدة البيانات وليس من الكوكيز
  const userDiscount = await getUserDiscount(session.userId);
  const price = userDiscount ? 50 : 100;

  return NextResponse.json({ price });
}`}
              </CodeBlock>
            </div>
          </div>
        </section>

        {/* Detection Section */}
        <section id="detection" className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">
            كيفية اكتشاف تسميم الكوكيز
          </h2>

          <div className="space-y-6">
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 text-lg font-bold text-white">
                أدوات وتقنيات الاكتشاف
              </h3>
              <div className="space-y-4 text-sm text-gray-400">
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-blue-400">●</span>
                  <div>
                    <strong className="text-white">Web Proxy Tools:</strong>{" "}
                    استخدام أدوات مثل Burp Suite أوOWASP ZAP لاعتراض الطلبات
                    والردود وفحص الكوكيز المرسلة.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-blue-400">●</span>
                  <div>
                    <strong className="text-white">Browser DevTools:</strong>{" "}
                    فتح عناصر المطور (F12) والتحقق من تبويب Application →
                    Cookies لفحص الكوكيز المخزنة.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-blue-400">●</span>
                  <div>
                    <strong className="text-white">Network Monitoring:</strong>{" "}
                    مراقبة الطلبات الصادرة والتحقق من وجود كوكيز مشفرة أو
                    حساسة.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-blue-400">●</span>
                  <div>
                    <strong className="text-white">Automated Scanners:</strong>{" "}
                    استخدام ماسحات الأمان الآلية مثل Nessus أوAcunetix
                    لفحص الثغرات.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 text-lg font-bold text-white">
                علامات الثغرة
              </h3>
              <CodeBlock title="signs-of-vulnerability.txt" language="text">
{`العلامات الدالة على وجود ثغرة تسميم الكوكيز:

1. ❌ الكوكيز تحتوي على بيانات حساسة كنص واضح (بدون تشفير)
   Example: user_id=123&role=admin&name=John

2. ❌ عدم استخدام HttpOnly flag
   → يمكن للـ JavaScript الوصول للكوكيز

3. ❌ عدم استخدام Secure flag
   → الكوكيز تُرسل عبر HTTP غير مشفرة

4. ❌ عدم استخدام SameSite flag
   → الكوكيز تُرسل مع الطلبات الخارجية

5. ❌ عدم توقيع الكوكيز أواستخدام توقيع ضعيف
   → يمكن تعديل القيم بسهولة

6. ❌ استخدام معلومات حساسة في الكوكيز
   → كلمات مرور، أرقام بطاقات ائتمان، بيانات دخول`}
              </CodeBlock>
            </div>
          </div>
        </section>

        {/* Prevention Section */}
        <section id="prevention" className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">
            طرق الحماية والمنع
          </h2>

          <div className="space-y-8">
            <StepCard number={1} title="توقيع الكوكيز بـ JWT أوMAC">
              <p>
                استخدم JWT (JSON Web Token) أوMAC (Message Authentication Code)
                لتوقيع الكوكيز. هذا يضمن عدم تعديلها دون اكتشاف.
              </p>
              <CodeBlock title="توقيع الكوكيز بـ JWT" language="typescript">
{`import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// إنشاء توقيع
const token = await new SignJWT({ userId: "123", role: "user" })
  .setProtectedHeader({ alg: "HS256" })
  .setIssuedAt()
  .setExpirationTime("24h")
  .sign(SECRET);

// التحقق من التوقيع
const { payload } = await jwtVerify(token, SECRET);`}
              </CodeBlock>
            </StepCard>

            <StepCard number={2} title="تفعيل HttpOnly Flag">
              <p>
                يمنع الوصول إلى الكوكيز من JavaScript، مما يحول دون سرقتها
                عبر هجمات XSS.
              </p>
              <CodeBlock title="Node.js / Express" language="javascript">
{`res.cookie("session", token, {
  httpOnly: true,  // لا يمكن الوصول من JavaScript
  secure: true,
  sameSite: "strict",
});`}
              </CodeBlock>
              <CodeBlock title="Next.js (Route Handlers)" language="typescript">
{`import { cookies } from "next/headers";

const cookieStore = cookies();
(await cookieStore).set("session", token, {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  path: "/",
});`}
              </CodeBlock>
            </StepCard>

            <StepCard number={3} title="تفعيل Secure Flag">
              <p>
                يضمن أن الكوكيز تُرسل فقط عبر اتصال HTTPS المشفر.
              </p>
              <CodeBlock title="Secure Cookie" language="javascript">
{`res.cookie("session", token, {
  httpOnly: true,
  secure: true,    // فقط عبر HTTPS
  sameSite: "strict",
});`}
              </CodeBlock>
              <AlertBox type="info" title="ملاحظة">
                <p>
                  في بيئة التطوير المحلي، قد تحتاج إلى تعطيل Secure flag
                  مؤقتاً إذا كنت تستخدم HTTP. لكن تأكد من تفعيله في بيئة
                  الإنتاج.
                </p>
              </AlertBox>
            </StepCard>

            <StepCard number={4} title="تفعيل SameSite Flag">
              <p>
                يتحكم في كيفية إرسال الكوكيز مع الطلبات الخارجية، مما يحول
                دون هجمات CSRF.
              </p>
              <CodeBlock title="SameSite Options" language="text">
{`sameSite: "strict"  // الكوكيز لا تُرسل مع أي طلب خارجي
sameSite: "lax"     // الكوكيز تُرسل فقط مع الروابط العادية
sameSite: "none"    // الكوكيز تُرسل مع كل الطلبات (يجب أن يكون Secure)`}
              </CodeBlock>
              <CodeBlock title="تطبيق SameSite" language="javascript">
{`res.cookie("session", token, {
  httpOnly: true,
  secure: true,
  sameSite: "strict",  // ✅ أفضل حماية ضد CSRF
  path: "/",
});`}
              </CodeBlock>
            </StepCard>

            <StepCard number={5} title="تحديد مسار الكوكيز (Path)">
              <p>
                حدد مساراً محدداً للكوكيز لتقييد نطاق استخدامها.
              </p>
              <CodeBlock title="تحديد المسار" language="javascript">
{`res.cookie("session", token, {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  path: "/api",  // الكوكيز متاحة فقط لمسار /api
});`}
              </CodeBlock>
            </StepCard>

            <StepCard number={6} title="تحديد انتهاء الصلاحية (MaxAge / Expires)">
              <p>
                حدد وقت انتهاء صلاحية الكوكيز لتقليل مدة التعرض.
              </p>
              <CodeBlock title="تحديد الصلاحية" language="javascript">
{`res.cookie("session", token, {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  maxAge: 60 * 60 * 24 * 7,  // 7 أيام بالثواني
  // أو
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
});`}
              </CodeBlock>
            </StepCard>
          </div>
        </section>

        {/* Summary Table */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">
            ملخص إعدادات الحماية
          </h2>
          <div className="overflow-x-auto rounded-lg border border-gray-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900">
                  <th className="px-4 py-3 text-right font-bold text-gray-300">
                    الإعداد
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-gray-300">
                    الوظيفة
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-gray-300">
                    الحالة
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {[
                  {
                    setting: "HttpOnly",
                    purpose: "منع الوصول من JavaScript",
                    status: "ضروري",
                  },
                  {
                    setting: "Secure",
                    purpose: "إرسال فقط عبر HTTPS",
                    status: "ضروري",
                  },
                  {
                    setting: "SameSite",
                    purpose: "منع هجمات CSRF",
                    status: "ضروري",
                  },
                  {
                    setting: "Path",
                    purpose: "تقييد نطاق الكوكيز",
                    status: "مُوصى به",
                  },
                  {
                    setting: "MaxAge",
                    purpose: "تحديد مدة الصلاحية",
                    status: "مُوصى به",
                  },
                  {
                    setting: "JWT Signature",
                    purpose: "منع التعديل",
                    status: "ضروري",
                  },
                ].map((row) => (
                  <tr key={row.setting} className="hover:bg-gray-900/50">
                    <td className="px-4 py-3 font-mono text-gray-300">
                      {row.setting}
                    </td>
                    <td className="px-4 py-3 text-gray-400">{row.purpose}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          row.status === "ضروري"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tips Section */}
        <section id="tips" className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">
            نصائح أمنية وأخطاء شائعة
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-6">
              <h3 className="mb-4 text-lg font-bold text-green-400">
                ✅ Practices الممارسات الصحيحة
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-green-400">✓</span>
                  استخدم JWT أوMAC لتوقيع جميع الكوكيز الحساسة
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-green-400">✓</span>
                  فعّل HttpOnly, Secure, SameSite على جميع الكوكيز
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-green-400">✓</span>
                  لا تخزن معلومات حساسة في الكوكيز (استخدم قاعدة البيانات)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-green-400">✓</span>
                  حدّث معرّف الجلسة بعد تسجيل الدخول
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-green-400">✓</span>
                  استخدم HTTPS في جميع أجزاء التطبيق
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-green-400">✓</span>
                  راجع الكوكيز دورياً وأزل الكوكيز غير الضرورية
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-6">
              <h3 className="mb-4 text-lg font-bold text-red-400">
                ❌ الأخطاء الشائعة
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-red-400">✗</span>
                  تخزين كلمات المرور أوبيانات الدفع في الكوكيز
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-red-400">✗</span>
                  عدم استخدام HttpOnly مما يعرض الكوكيز لهجمات XSS
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-red-400">✗</span>
                  التحقق من الصلاحيات من كوكيز غير مشفرة
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-red-400">✗</span>
                  عدم تجديد الجلسة بعد تسجيل الدخول (Session Fixation)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-red-400">✗</span>
                  استخدام HTTP بدون HTTPS في بيئة الإنتاج
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-red-400">✗</span>
                  عدم تعيين انتهاء صلاحية للكوكيز
                </li>
              </ul>
            </div>
          </div>
        </section>

        <VideoSection slug="cookie-poisoning" />

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-800 pt-8">
          <Link
            href="/vulnerabilities/xss"
            className="flex items-center gap-2 rounded-lg border border-gray-800 px-4 py-3 text-sm text-gray-400 transition-colors hover:border-gray-700 hover:text-white"
          >
            <span>→</span>
            <span>حقن السكربتات (XSS)</span>
          </Link>
          <Link
            href="/vulnerabilities/csrf"
            className="flex items-center gap-2 rounded-lg border border-gray-800 px-4 py-3 text-sm text-gray-400 transition-colors hover:border-gray-700 hover:text-white"
          >
            <span>تزييف الطلبات عبر المواقع (CSRF)</span>
            <span>←</span>
          </Link>
        </nav>

        {/* Footer */}
        <footer className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-600">
          <p>
            دليل أمن الويب - تسميم الكوكيز Cookie Poisoning
          </p>
        </footer>
      </div>
    </main>
  );
}
