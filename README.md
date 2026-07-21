# دليل أمن المواقع الإلكترونية 🛡️

دليل شامل لشرح ثغرات أمن المواقع الإلكترونية وطرق إصلاحها مع أمثلة عملية وأدوات فحص.

## الميزات

- 📚 شرح مفصل لأنواع الثغرات الأمنية الشائعة
- 💻 أمثلة كود حقيقية (محصّنة vs مصابة)
- 🔧 أدوات فحص واختبار
- ✅ أفضل الممارسات الأمنية
- 📖 موارد تعليمية
- ❓ أسئلة متكررة

## الثغرات المغطاة

- SQL Injection (حقن SQL)
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Server-Side Request Forgery (SSRF)
- Clickjacking (اختطاف النقرات)
- API Security (أمن واجهات البرمجة)

## التقنيات

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- MDX

## التشغيل المحلي

```bash
# تثبيت التبعيات
npm install

# تشغيل خادم التطوير
npm run dev

# البناء للإنتاج
npm run build

# تشغيل الإنتاج
npm start
```

## النشر

### Vercel (الأسهل)

1. أنشئ مستودع على GitHub
2. وصّله بـ Vercel
3. سيتم النشر تلقائياً

### Netlify

1. أنشئ حساب على Netlify
2. اربط المستودع
3. اختر إعدادات البناء: `npm run build` والمجلد: `.next`

## هيكل المشروع

```
web-security-guide/
├── app/
│   ├── layout.tsx          # التخطيط الرئيسي
│   ├── page.tsx            # الصفحة الرئيسية
│   ├── globals.css         # الأنماط العامة
│   ├── sitemap.ts          # خريطة الموقع
│   ├── robots.ts           # ملف robots.txt
│   ├── vulnerabilities/    # صفحات الثغرات
│   │   ├── sql-injection/
│   │   ├── xss/
│   │   ├── csrf/
│   │   ├── ssrf/
│   │   ├── clickjacking/
│   │   └── api-security/
│   ├── tools/              # صفحة الأدوات
│   ├── best-practices/     # أفضل الممارسات
│   ├── resources/          # الموارد التعليمية
│   ├── contact/            # صفحة التواصل
│   ├── report/             # إرسال تقارير
│   ├── faq/                # أسئلة متكررة
│   └── about/              # عن الموقع
├── public/                 # الملفات الثابتة
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.js
```

## الترخيص

هذا المشروع مرخص بموجب رخصة Creative Commons Attribution-ShareAlike 4.0 International.

## المساهمة

نرحب بالمساهمات! يرجى قراءة ملف CONTRIBUTING.md أولاً.

## التواصل

- البريد الإلكتروني: security@example.com
- GitHub: [web-security-guide](https://github.com/example/web-security-guide)
