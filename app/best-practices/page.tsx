"use client";

import { useState } from "react";

interface Practice {
  title: string;
  description: string;
  steps: string[];
  codeExample?: string;
  severity: "critical" | "high" | "medium" | "low";
}

interface Category {
  id: string;
  icon: string;
  title: string;
  description: string;
  practices: Practice[];
}

interface ChecklistItem {
  id: string;
  text: string;
  category: string;
  checked: boolean;
}

interface AntiPattern {
  id: string;
  badPractice: string;
  goodPractice: string;
  description: string;
}

const categories: Category[] = [
  {
    id: "secure-coding",
    icon: "🔒",
    title: "البرمجة الآمنة",
    description: "ممارسات البرمجة الآمنة لمنع الثغرات الأمنية",
    practices: [
      {
        title: "التحقق من المدخلات (Input Validation)",
        description: "التحقق من جميع المدخلات قبل معالجتها لمنع هجمات SQL Injection و XSS",
        severity: "critical",
        steps: [
          "استخدم التحقق من المدخلات على جانب الخادم (Server-side Validation)",
          "حدد الأنواع المسموح بها لكل حقل",
          "استخدم التعبيرات النمطية (Regular Expressions) للتحقق من التنسيق",
          "رفض أي مدخلات غير متوقعة أو مشبوهة",
          "لا تعتمد فقط على التحقق من جانب العميل (Client-side)",
        ],
        codeExample: `// التحقق من المدخلات باستخدام Zod
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email("بريد إلكتروني غير صالح"),
  age: z.number().min(18).max(120),
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/, "اسم المستخدم يحتوي على أحرف غير صالحة"),
});

// التحقق من المدخلات
const validateInput = (data: unknown) => {
  const result = userSchema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};`,
      },
      {
        title: "الترميز المخرجي (Output Encoding)",
        description: "ترميز جميع المخرجات لمنع هجمات Cross-Site Scripting (XSS)",
        severity: "critical",
        steps: [
          "قم بترميز جميع المحتوى الذي يتم عرضه في الصفحة",
          "استخدم مكتبات الترميز المخصصة",
          " لا تقم بحقن HTML مباشرة من المدخلات",
          "استخدم Content Security Policy (CSP) كطبقة حماية إضافية",
        ],
        codeExample: `// الترميز في React
function UserContent({ content }: { content: string }) {
  // React يقوم بالترميز تلقائياً
  return <div>{content}</div>;
}

// الترميز اليدوي للـ HTML
import DOMPurify from "dompurify";

const sanitizeHTML = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "p"],
    ALLOWED_ATTR: [],
  });
};

// في Next.js
import { escapeHtml } from "@/lib/utils";

const SafeComponent = ({ userInput }: { userInput: string }) => {
  const safeContent = escapeHtml(userInput);
  return <div dangerouslySetInnerHTML={{ __html: safeContent }} />;
};`,
      },
      {
        title: "الاستعلامات المعلمّة (Parameterized Queries)",
        description: "استخدام الاستعلامات المعلمّة لمنع SQL Injection",
        severity: "critical",
        steps: [
          "لا تقم بحقن المتغيرات مباشرة في الاستعلامات",
          "استخدم ORM مثل Prisma أو TypeORM",
          "استخدم المعاملات (Prepared Statements) لقاعدة البيانات",
          "تجنب استخدام string concatenation في الاستعلامات",
        ],
        codeExample: `// ❌ خطأ شائع - SQL Injection
const getUser = (email: string) => {
  return db.query(\`SELECT * FROM users WHERE email = '\${email}'\`);
};

// ✅ صحيح - استخدام Prisma ORM
import { prisma } from "@/lib/prisma";

const getUser = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

// ✅ صحيح - استخدام Parameterized Queries مع raw query
const getUser = async (email: string) => {
  return prisma.$queryRaw\`
    SELECT * FROM users WHERE email = \${email}
  \`;
};

// ✅ صحيح - استخدام Prepared Statements مع pg
import { Pool } from "pg";

const pool = new Pool();

const getUser = async (email: string) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const result = await pool.query(query, [email]);
  return result.rows[0];
};`,
      },
    ],
  },
  {
    id: "authentication",
    icon: "🔐",
    title: "المصادقة والتفويض",
    description: "عمليات المصادقة والتفويض الآمنة",
    practices: [
      {
        title: "تشفير كلمات المرور (Password Hashing)",
        description: "تشفير كلمات المرور بشكل آمن باستخدام خوارزميات متعددة المراحل",
        severity: "critical",
        steps: [
          "استخدم bcrypt أو Argon2 لتشفير كلمات المرور",
          "حدد cost factor مناسب (12+ لـ bcrypt)",
          "لا تخزن كلمات المرور بتنسيق نصي واضح",
          "لا تستخدم MD5 أو SHA-1 للتشفير",
        ],
        codeExample: `// باستخدام bcrypt
import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

// تشفير كلمة المرور
const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

// التحقق من كلمة المرور
const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

// باستخدام Argon2 (أسهل)
import argon2 from "argon2";

// تشفير كلمة المرور
const hashPassword = async (password: string): Promise<string> => {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
  });
};

// التحقق من كلمة المرور
const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return argon2.verify(hashedPassword, password);
};`,
      },
      {
        title: "المصادقة الثنائية (Multi-Factor Authentication)",
        description: "إضافة طبقة حماية إضافية للمصادقة",
        severity: "high",
        steps: [
          "دمج TOTP (Time-based One-Time Password)",
          "دعم المفاتيح الأمنية (WebAuthn/FIDO2)",
          "توفير خيارات احتياطية للحساب",
          "تنبيه المستخدمين عند تغيير إعدادات الأمان",
        ],
        codeExample: `// إعداد TOTP باستخدام speakeasy
import speakeasy from "speakeasy";

// إنشاء مفتاح جديد للمستخدم
const generateSecret = () => {
  const secret = speakeasy.generateSecret({
    name: "MyApp",
    length: 20,
  });
  return {
    secret: secret.base32,
    otpauthUrl: secret.otpauth_url,
  };
};

// التحقق من الرمز
const verifyToken = (secret: string, token: string): boolean => {
  return speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
    window: 1,
  });
};

// WebAuthn (المفاتيح الأمنية)
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";

// إعداد WebAuthn
const setupWebAuthn = async (userId: string) => {
  const options = await generateRegistrationOptions({
    rpName: "My App",
    rpID: "example.com",
    userID: Buffer.from(userId),
    attestationType: "none",
  });
  return options;
};`,
      },
      {
        title: "إدارة الجلسات (Session Management)",
        description: "إدارة آمنة لجلسات المستخدمين",
        severity: "high",
        steps: [
          "استخدم رموز جلسة عشوائية وغير قابلة للتنبؤ",
          "حدد وقت انتهاء صلاحية مناسب للجلسات",
          "قم بإبطال الجلسة عند تسجيل الخروج",
          "استخدم HTTPOnly و Secure و SameSite للكوكيز",
          "لا تخزن معلومات حساسة في الجلسة",
        ],
        codeExample: `// إدارة الجلسات باستخدام NextAuth.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 يوم
  },
  cookies: {
    sessionToken: {
      name: \`__Secure-next-auth.session-token\`,
      options: {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
};

// إعداد الكوكيز بشكل آمن
const setSecureCookie = (res: Response, name: string, value: string) => {
  res.setHeader("Set-Cookie", \`\${name}=\${value}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600\`);
};

// تسجيل الخروج و invalidate الجلسة
const logout = async (sessionId: string) => {
  await prisma.session.delete({
    where: { id: sessionId },
  });
};`,
      },
    ],
  },
  {
    id: "data-protection",
    icon: "🛡️",
    title: "حماية البيانات",
    description: "حماية البيانات الحساسة والتشفير",
    practices: [
      {
        title: "تشفير البيانات (Encryption)",
        description: "تشفير البيانات الحساسة أثناء النقل والتخزين",
        severity: "critical",
        steps: [
          "استخدم TLS 1.3 لجميع الاتصالات",
          "قم بتشفير البيانات المخزنة باستخدام AES-256",
          "استخدم مكتبات التشفير المخصصة بدلاً من التنفيذ اليدوي",
          "إدارة المفاتيح بشكل آمن",
        ],
        codeExample: `// تشفير البيانات باستخدام crypto
import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const KEY_LENGTH = 32;
const ITERATIONS = 100000;

// تشفير البيانات
const encrypt = (
  text: string,
  secretKey: string
): { encrypted: string; iv: string; tag: string; salt: string } => {
  const salt = crypto.randomBytes(SALT_LENGTH);
  const key = crypto.pbkdf2Sync(
    secretKey,
    salt,
    ITERATIONS,
    KEY_LENGTH,
    "sha512"
  );
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const tag = cipher.getAuthTag();

  return {
    encrypted,
    iv: iv.toString("hex"),
    tag: tag.toString("hex"),
    salt: salt.toString("hex"),
  };
};

// فك تشفير البيانات
const decrypt = (
  encryptedData: { encrypted: string; iv: string; tag: string; salt: string },
  secretKey: string
): string => {
  const salt = Buffer.from(encryptedData.salt, "hex");
  const key = crypto.pbkdf2Sync(
    secretKey,
    salt,
    ITERATIONS,
    KEY_LENGTH,
    "sha512"
  );
  const iv = Buffer.from(encryptedData.iv, "hex");
  const tag = Buffer.from(encryptedData.tag, "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  let decrypted = decipher.update(encryptedData.encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

// استخدام مع Prisma
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// تشفير قبل الحفظ
const saveSensitiveData = async (userId: string, ssn: string) => {
  const encryptedSSN = encrypt(ssn, process.env.ENCRYPTION_KEY!);
  await prisma.user.update({
    where: { id: userId },
    data: { ssn: JSON.stringify(encryptedSSN) },
  });
};`,
      },
      {
        title: "التعامل مع البيانات الحساسة",
        description: ".protecting sensitive data throughout its lifecycle",
        severity: "high",
        steps: [
          "حدد أنواع البيانات الحساسة في تطبيقك",
          "قم بتخزين البيانات الحساسة في مكان آمن",
          "لا تقم بتسجيل (Logging) البيانات الحساسة",
          "استخدم التشفير للبيانات أثناء النقل والتخزين",
          "قم بتطبيق سياسات الاحتفاظ بالبيانات وحذفها",
        ],
        codeExample: `// تعريف البيانات الحساسة
interface SensitiveDataConfig {
  fields: string[];
  retentionDays: number;
  encryptionRequired: boolean;
  logRedaction: boolean;
}

const sensitiveDataConfig: SensitiveDataConfig = {
  fields: ["password", "creditCard", "ssn", "email", "phone"],
  retentionDays: 365,
  encryptionRequired: true,
  logRedaction: true,
};

// إخفاء البيانات الحساسة في السجلات
const redactSensitiveData = (data: Record<string, unknown>) => {
  const redacted = { ...data };

  for (const field of sensitiveDataConfig.fields) {
    if (redacted[field]) {
      redacted[field] = "[REDACTED]";
    }
  }

  return redacted;
};

// تسجيل آمن
const secureLog = (message: string, data?: Record<string, unknown>) => {
  const logData = data ? redactSensitiveData(data) : {};
  console.log(message, logData);
};

// تطبيق سياسة الاحتفاظ بالبيانات
const enforceDataRetention = async () => {
  const cutoffDate = new Date();
  cutoffDate.setDate(
    cutoffDate.getDate() - sensitiveDataConfig.retentionDays
  );

  await prisma.auditLog.deleteMany({
    where: {
      createdAt: { lt: cutoffDate },
    },
  });
};`,
      },
      {
        title: "تصنيف البيانات (Data Classification)",
        description: "تصنيف البيانات حسب مستوى الحساسية",
        severity: "medium",
        steps: [
          "حدد مستويات التصنيف (عالي، متوسط، منخفض، عام)",
        "قم بتصنيف جميع البيانات في تطبيقك",
          "طبق سياسات حماية مناسبة لكل مستوى",
          "راجع التصنيف بشكل دوري",
        ],
        codeExample: `// تعريف مستويات التصنيف
enum DataClassification {
  PUBLIC = "public",
  INTERNAL = "internal",
  CONFIDENTIAL = "confidential",
  RESTRICTED = "restricted",
}

// تعريف خصائص كل مستوى
const classificationPolicies = {
  [DataClassification.PUBLIC]: {
    encryption: false,
    accessControl: false,
    auditLog: false,
    retentionDays: Infinity,
  },
  [DataClassification.INTERNAL]: {
    encryption: false,
    accessControl: true,
    auditLog: false,
    retentionDays: 730,
  },
  [DataClassification.CONFIDENTIAL]: {
    encryption: true,
    accessControl: true,
    auditLog: true,
    retentionDays: 365,
  },
  [DataClassification.RESTRICTED]: {
    encryption: true,
    accessControl: true,
    auditLog: true,
    retentionDays: 90,
  },
};

// decorator لتصنيف البيانات
function Classified(classification: DataClassification) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata("classification", classification, target, propertyKey);
  };
}

// استخدام
class UserService {
  @Classified(DataClassification.RESTRICTED)
  async getSSN(userId: string): Promise<string> {
    // منطق جلب رقم الضمان الاجتماعي
    return "encrypted-ssn";
  }

  @Classified(DataClassification.PUBLIC)
  async getPublicProfile(userId: string) {
    // منطق جلب الملف الشخصي العام
    return {};
  }
}`,
      },
    ],
  },
  {
    id: "infrastructure",
    icon: "🏗️",
    title: "أمن البنية التحتية",
    description: "تأمين الخوادم والشبكات والحوسبة السحابية",
    practices: [
      {
        title: "تقوية الخادم (Server Hardening)",
        description: "تأمين الخوادم وتقليل سطح الهجوم",
        severity: "high",
        steps: [
          "قم بتحديث نظام التشغيل والبرامج باستمرار",
          " تعطيل الخدمات غير الضرورية",
          "استخدام جدار حماية (Firewall) بقواعد صارمة",
          "تطبيق مبدأ الامتياز الأدنى (Least Privilege)",
          "تشفير جميع الاتصالات",
        ],
        codeExample: `# إعداد SSH آمن
# /etc/ssh/sshd_config

Port 2222
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2

# تعطيل SSH عبر TCP forwarding
AllowTcpForwarding no
X11Forwarding no

# إعداد جدار الحماية (UFW)
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 2222/tcp
sudo ufw allow 443/tcp
sudo ufw allow 80/tcp
sudo ufw enable

# إعداد جدار الحماية (iptables)
sudo iptables -P INPUT DROP
sudo iptables -P FORWARD DROP
sudo iptables -P OUTPUT ACCEPT
sudo iptables -A INPUT -i lo -j ACCEPT
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 2222 -j ACCEPT

# مراقبة الملفات الحرجة
sudo apt install aide
sudo aideinit
sudo cp /var/lib/aide/aide.db.new /var/lib/aide/aide.db

# فحص الثغرات
sudo apt install lynis
sudo lynis audit system`,
      },
      {
        title: "أمن الشبكة (Network Security)",
        description: "تأمين البنية التحتية للشبكة",
        severity: "high",
        steps: [
          "فصل الشبكات حسب الوظيفة",
          "استخدام VPN للوصول عن بُعد",
          "مراقبة حركة الشبكة",
          "تطبيق قواعد جدار الحماية الصارمة",
        ],
        codeExample: `# Docker Network Segmentation
# docker-compose.yml
version: "3.8"

services:
  frontend:
    image: frontend:latest
    networks:
      - frontend-network
    ports:
      - "443:443"

  backend:
    image: backend:latest
    networks:
      - frontend-network
      - backend-network
    # لا يوجد منفذ خارجي

  database:
    image: postgres:15
    networks:
      - backend-network
    # لا يوجد منفذ خارجي - فقط للشبكة الداخلية

networks:
  frontend-network:
    driver: bridge
  backend-network:
    driver: bridge
    internal: true

# Nginx Reverse Proxy Configuration
# nginx.conf
upstream backend {
    server backend:3000;
}

server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate /etc/ssl/certs/example.crt;
    ssl_certificate_key /etc/ssl/private/example.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'" always;

    location /api/ {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`,
      },
      {
        title: "أمن الحوسبة السحابية (Cloud Security)",
        description: "تأمين البنية التحتية السحابية",
        severity: "high",
        steps: [
          "استخدم IAM (Identity and Access Management) بشكل صحيح",
          "تفعيل السجلات (Logging) والمراقبة",
          "تشفير البيانات المخزنة والمنقولة",
          "استخدام إدارة الأسرار (Secrets Management)",
        ],
        codeExample: `# AWS IAM Policy
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::my-bucket/*"
    },
    {
      "Effect": "Deny",
      "Action": "s3:DeleteBucket",
      "Resource": "arn:aws:s3:::my-bucket"
    }
  ]
}

# Terraform - Infra as Code
# main.tf
provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "secure_bucket" {
  bucket = "my-secure-bucket"

  tags = {
    Environment = "production"
  }
}

resource "aws_s3_bucket_versioning" "example" {
  bucket = aws_s3_bucket.secure_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "example" {
  bucket = aws_s3_bucket.secure_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "aws:kms"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "example" {
  bucket = aws_s3_bucket.secure_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Terraform - Secrets Management
resource "aws_secretsmanager_secret" "db_password" {
  name = "myapp/database-password"
}

resource "aws_secretsmanager_secret_version" "db_password" {
  secret_id = aws_secretsmanager_secret.db_password.id
  secret_string = jsonencode({
    username = "admin"
    password = random_password.db_password.result
  })
}

resource "random_password" "db_password" {
  length           = 16
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}`,
      },
    ],
  },
  {
    id: "devsecops",
    icon: "🔄",
    title: "DevSecOps",
    description: "دمج الأمان في دورة حياة البرمجيات",
    practices: [
      {
        title: "أمن CI/CD",
        description: "تأمين خطوط أنابيب التسليم المستمر",
        severity: "high",
        steps: [
          "حقن فحوصات الأمان في خطوط الأنابيب",
          "فحص الثغرات في التبعيات (Dependencies)",
          "فحص صور Docker",
          "تأمين مخازن Git",
          "استخدام قوائم السماح (Allowlists)",
        ],
        codeExample: `# GitHub Actions Workflow
# .github/workflows/security.yml
name: Security Scan

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: "fs"
          scan-ref: "."
          format: "table"
          exit-code: "1"
          severity: "CRITICAL,HIGH"

      - name: Run Snyk to check for vulnerabilities
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}

      - name: Run ESLint Security Plugin
        run: |
          npm install eslint-plugin-security
          npx eslint . --plugin security

      - name: Run Secret Scanner
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./

  docker-security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build Docker image
        run: docker build -t myapp:latest .

      - name: Scan Docker image
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: "myapp:latest"
          format: "table"
          exit-code: "1"
          severity: "CRITICAL,HIGH"

  dependency-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Check for outdated dependencies
        run: npm outdated

      - name: Audit dependencies
        run: npm audit --audit-level=high`,
      },
      {
        title: "اختبارات الأمان (Security Testing)",
        description: "إجراء اختبارات أمنية شاملة",
        severity: "high",
        steps: [
          "إجراء اختبارات الاختراق (Penetration Testing)",
          "استخدام أدوات فحص الثغرات الآلية",
          "اختبار هجمات OWASP Top 10",
          "إجراء اختبارات الأمان الوظيفية",
          "مراجعة الكود الأمنية بشكل دوري",
        ],
        codeExample: `// اختبارات أمان باستخدام Jest
describe("Security Tests", () => {
  describe("SQL Injection Prevention", () => {
    it("should prevent SQL injection in email field", async () => {
      const maliciousEmail = "' OR '1'='1' --";
      const result = await getUser(maliciousEmail);
      expect(result).toBeNull();
    });

    it("should prevent SQL injection in search", async () => {
      const maliciousQuery = "'; DROP TABLE users; --";
      const result = await search(maliciousQuery);
      expect(result).toEqual([]);
    });
  });

  describe("XSS Prevention", () => {
    it("should sanitize HTML input", () => {
      const maliciousInput = '<script>alert("XSS")</script>';
      const sanitized = sanitizeHTML(maliciousInput);
      expect(sanitized).not.toContain("<script>");
    });

    it("should escape HTML entities", () => {
      const input = '<img src=x onerror=alert("XSS")>';
      const escaped = escapeHtml(input);
      expect(escaped).toContain("&lt;");
      expect(escaped).toContain("&gt;");
    });
  });

  describe("Authentication", () => {
    it("should reject weak passwords", async () => {
      const weakPasswords = ["123456", "password", "admin"];

      for (const password of weakPasswords) {
        const result = validatePassword(password);
        expect(result.isValid).toBe(false);
      }
    });

    it("should enforce rate limiting", async () => {
      const attempts = Array(6).fill({ email: "test@example.com" });

      for (const attempt of attempts) {
        await login(attempt.email, "wrongpassword");
      }

      const result = await login("test@example.com", "password");
      expect(result.error).toContain("rate limit");
    });
  });

  describe("Authorization", () => {
    it("should prevent IDOR attacks", async () => {
      const user1Token = await login("user1@example.com", "password");
      const user2Data = await getUserData("user2-id", user1Token);
      expect(user2Data).toBeNull();
    });

    it("should enforce RBAC", async () => {
      const regularUserToken = await login("user@example.com", "password");
      const result = await adminEndpoint(regularUserToken);
      expect(result.status).toBe(403);
    });
  });
});

// اختبار باستخدام OWASP ZAP
// zap-baseline.conf
context.name=MyApp
context.urls=https://localhost:3000
context.include=https://localhost:3000.*
context.exclude=.*logout.*
context.exclude=.*delete.*
context.exclude=.*admin.*
spider.maxDepth=3
spider.maxDuration=5
scanner.maxScanDurationInMins=10`,
      },
      {
        title: "المراقبة والتنبيهات (Monitoring & Alerting)",
        description: "مراقبة الأحداث الأمنية والتنبيه على الشذوذ",
        severity: "high",
        steps: [
          "تسجيل جميع الأحداث الأمنية",
          "إنشاء تنبيهات للأحداث المشبوهة",
          "مراقبة سلوك المستخدمين",
          "مراقبة الأداء والتوافر",
          "إنشاء خطط الاستجابة للحوادث",
        ],
        codeExample: `// نظام تسجيل الأحداث الأمنية
interface SecurityEvent {
  type: "LOGIN" | "LOGOUT" | "FAILED_LOGIN" | "PERMISSION_DENIED" | "SUSPICIOUS_ACTIVITY";
  userId?: string;
  ip: string;
  userAgent: string;
  timestamp: Date;
  details: Record<string, unknown>;
  severity: "low" | "medium" | "high" | "critical";
}

class SecurityLogger {
  private events: SecurityEvent[] = [];

  async log(event: Omit<SecurityEvent, "timestamp">) {
    const fullEvent: SecurityEvent = {
      ...event,
      timestamp: new Date(),
    };

    // حفظ في قاعدة البيانات
    await prisma.securityEvent.create({
      data: fullEvent,
    });

    // إرسال للنظام الخارجي
    await this.sendToSIEM(fullEvent);

    // التحقق من العتبات
    await this.checkThresholds(fullEvent);
  }

  private async sendToSIEM(event: SecurityEvent) {
    await fetch(process.env.SIEM_ENDPOINT!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
  }

  private async checkThresholds(event: SecurityEvent) {
    // مثال: التنبيه عند 5 محاولات فاشلة خلال 5 دقائق
    if (event.type === "FAILED_LOGIN") {
      const recentAttempts = await prisma.securityEvent.count({
        where: {
          type: "FAILED_LOGIN",
          ip: event.ip,
          timestamp: { gte: new Date(Date.now() - 5 * 60 * 1000) },
        },
      });

      if (recentAttempts >= 5) {
        await this.alert({
          type: "BRUTE_FORCE_DETECTED",
          ip: event.ip,
          attempts: recentAttempts,
        });
      }
    }
  }

  private async alert(data: Record<string, unknown>) {
    // إرسال تنبيه
    await fetch(process.env.ALERT_WEBHOOK!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: \`🚨 Security Alert: \${JSON.stringify(data)}\`,
      }),
    });
  }
}

// استخدام
const securityLogger = new SecurityLogger();

// في route تسجيل الدخول
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const ip = req.headers["x-forwarded-for"] as string;

  try {
    const user = await authenticateUser(email, password);

    if (!user) {
      await securityLogger.log({
        type: "FAILED_LOGIN",
        ip,
        userAgent: req.headers["user-agent"] || "",
        details: { email },
        severity: "medium",
      });
      return res.status(401).json({ error: "Invalid credentials" });
    }

    await securityLogger.log({
      type: "LOGIN",
      userId: user.id,
      ip,
      userAgent: req.headers["user-agent"] || "",
      details: { email },
      severity: "low",
    });

    return res.json({ token: generateToken(user) });
  } catch (error) {
    await securityLogger.log({
      type: "SUSPICIOUS_ACTIVITY",
      ip,
      userAgent: req.headers["user-agent"] || "",
      details: { error: error.message },
      severity: "critical",
    });
    throw error;
  }
});`,
      },
    ],
  },
];

const securityChecklist: ChecklistItem[] = [
  { id: "1", text: "جميع المدخلات متحقق منها", category: "secure-coding", checked: false },
  { id: "2", text: "جميع المخرجات مرمّزة", category: "secure-coding", checked: false },
  { id: "3", text: "يتم استخدام الاستعلامات المعلمّة", category: "secure-coding", checked: false },
  { id: "4", text: "كلمات المرور مشفرة باستخدام bcrypt/Argon2", category: "authentication", checked: false },
  { id: "5", text: "MFA متاح وموصى به", category: "authentication", checked: false },
  { id: "6", text: "الجلسات تنتهي تلقائياً", category: "authentication", checked: false },
  { id: "7", text: "الكوكيز آمنة (HttpOnly, Secure, SameSite)", category: "authentication", checked: false },
  { id: "8", text: "TLS 1.3 مستخدم لجميع الاتصالات", category: "data-protection", checked: false },
  { id: "9", text: "البيانات الحساسة مشفرة أثناء التخزين", category: "data-protection", checked: false },
  { id: "10", text: "البيانات الحساسة غير مسجلة في السجلات", category: "data-protection", checked: false },
  { id: "11", text: "النظام التشغيل محدّث", category: "infrastructure", checked: false },
  { id: "12", text: "جدار الحماية مُعد ومفعّل", category: "infrastructure", checked: false },
  { id: "13", text: "SSH آمن (كلمات مرور معطّلة)", category: "infrastructure", checked: false },
  { id: "14", text: "الشبكات مفصّلة حسب الوظيفة", category: "infrastructure", checked: false },
  { id: "15", text: "IAM مُعد بشكل صحيح", category: "infrastructure", checked: false },
  { id: "16", text: "فحص الثغرات في CI/CD مفعّل", category: "devsecops", checked: false },
  { id: "17", text: "فحص صور Docker مفعّل", category: "devsecops", checked: false },
  { id: "18", text: "اختبارات أمان تلقائية موجودة", category: "devsecops", checked: false },
  { id: "19", text: "مراقبة الأحداث الأمنية مفعّلة", category: "devsecops", checked: false },
  { id: "20", text: "تنبيهات الأمان مُعدة", category: "devsecops", checked: false },
];

const antiPatterns: AntiPattern[] = [
  {
    id: "1",
    badPractice: "تخزين كلمات المرور كنص واضح",
    goodPractice: "استخدام Argon2 أو bcrypt لتشفير كلمات المرور",
    description: "يجب عدم تخزين كلمات المرور أبداً كما هي. استخدم خوارزميات تشفير بطيئة مثل Argon2id أو bcrypt مع cost factor مناسب.",
  },
  {
    id: "2",
    badPractice: "التحقق من المدخلات فقط في جانب العميل",
    goodPractice: "التحقق من المدخلات على الخادم والعميل",
    description: "يمكن للمهاجم تعطيل التحقق من جانب العميل بسهولة. يجب دائماً التحقق من المدخلات على الخادم.",
  },
  {
    id: "3",
    badPractice: "استخدام SQL مع string concatenation",
    goodPractice: "استخدام الاستعلامات المعلمّة أو ORM",
    description: "يؤدي هذا مباشرة إلى SQL Injection. استخدم دائماً المعاملات (Prepared Statements) أو ORM مثل Prisma.",
  },
  {
    id: "4",
    badPractice: "استخدام MD5 أو SHA-1 لكلمات المرور",
    goodPractice: "استخدام bcrypt أو Argon2",
    description: "MD5 و SHA-1 سريعتان جداً وضعيفتان لتشفير كلمات المرور. استخدم خوارزميات بطيئة مصممة لكلمات المرور.",
  },
  {
    id: "5",
    badPractice: "تسجيل جميع المعلومات في السجلات",
    goodPractice: "إخفاء البيانات الحساسة من السجلات",
    description: "لا تسجّل كلمات المرور أو أرقام البطاقات أو أي معلومات حساسة. استخدم Data Redaction.",
  },
  {
    id: "6",
    badPractice: "استخدام HTTP بدون TLS",
    goodPractice: "فرض HTTPS مع TLS 1.3",
    description: "HTTP غير آمن ويعرض البيانات للاعتراض. استخدم دائماً HTTPS مع شهادة SSL صالحة.",
  },
  {
    id: "7",
    badPractice: "تخزين الأسرار في الكود المصدري",
    goodPractice: "استخدام متغيرات البيئة أو Secrets Manager",
    description: "لا تحفظ كلمات المرور أو المفاتيح في الكود. استخدم متغيرات البيئة أو خدمات إدارة الأسرار.",
  },
  {
    id: "8",
    badPractice: "السماح لـ CORS بالوصول من أي مصدر",
    goodPractice: "تحديد المصادر المسموح بها بدقة",
    description: "لا تستخدم Access-Control-Allow-Origin: *. حدد المواقع المسموح لها بالوصول.",
  },
  {
    id: "9",
    badPractice: "عدم تطبيق Least Privilege",
    goodPractice: "منح الصلاحيات الأدنى اللازمة فقط",
    description: "كل مستخدم وخدمة يجب أن يكون لديه فقط الصلاحيات اللازمة لأداء مهامه.",
  },
  {
    id: "10",
    badPractice: "تجاهل تحديثات الأمان",
    goodPractice: "تحديث جميع المكونات بشكل دوري",
    description: "الثغرات المعروفة يجب إصلاحها فوراً. فعّل التحديثات التلقائية وأجرِ فحوصات دورية.",
  },
  {
    id: "11",
    badPractice: "عدم وجود خطة استجابة للحوادث",
    goodPractice: "وضع خطة واضحة للاستجابة للحوادث الأمنية",
    description: "حدد من المسؤول، وكيفية التواصل، والخطوات المطلوبة عند اكتشاف حادثة أمنية.",
  },
  {
    id: "12",
    badPractice: "استخدام كلمات مرور ضعيفة للمستخدمين",
    goodPractice: "فرض سياسة كلمات مرور قوية",
    description: "حدد الحد الأدنى للطول، والتعقيد، وتجنب كلمات المرور الشائعة. استخدم مكتبات مثل zxcvbn.",
  },
];

export default function BestPracticesPage() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(securityChecklist);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedPractice, setExpandedPractice] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"practices" | "checklist" | "anti-patterns">("practices");

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const getCheckedCount = () => checklist.filter((item) => item.checked).length;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case "critical":
        return "حرج";
      case "high":
        return "عالي";
      case "medium":
        return "متوسط";
      case "low":
        return "منخفض";
      default:
        return "غير محدد";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-4xl mb-6 shadow-lg">
            🛡️
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            أفضل الممارسات الأمنية
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            دليل شامل لأفضل الممارسات الأمنية في تطوير تطبيقات الويب الحديثة
          </p>
        </header>

        {/* Navigation Tabs */}
        <nav className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg bg-white dark:bg-slate-800 p-1 shadow-sm border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab("practices")}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === "practices"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              الممارسات الأمنية
            </button>
            <button
              onClick={() => setActiveTab("checklist")}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === "checklist"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              قائمة التحقق ({getCheckedCount()}/{checklist.length})
            </button>
            <button
              onClick={() => setActiveTab("anti-patterns")}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === "anti-patterns"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              الأخطاء الشائعة
            </button>
          </div>
        </nav>

        {/* Practices Tab */}
        {activeTab === "practices" && (
          <div className="space-y-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedCategory(expandedCategory === category.id ? null : category.id)
                  }
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{category.icon}</span>
                    <div className="text-right">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {category.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
                    </div>
                  </div>
                  <svg
                    className={`w-6 h-6 text-gray-500 transition-transform ${
                      expandedCategory === category.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {expandedCategory === category.id && (
                  <div className="border-t border-gray-200 dark:border-gray-700">
                    {category.practices.map((practice, practiceIndex) => (
                      <div
                        key={practiceIndex}
                        className="border-b border-gray-100 dark:border-gray-700/50 last:border-b-0"
                      >
                        <button
                          onClick={() =>
                            setExpandedPractice(
                              expandedPractice === `${category.id}-${practiceIndex}`
                                ? null
                                : `${category.id}-${practiceIndex}`
                            )
                          }
                          className="w-full flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                                practice.severity
                              )}`}
                            >
                              {getSeverityLabel(practice.severity)}
                            </span>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-right">
                              {practice.title}
                            </h3>
                          </div>
                          <svg
                            className={`w-5 h-5 text-gray-500 transition-transform ${
                              expandedPractice === `${category.id}-${practiceIndex}`
                                ? "rotate-180"
                                : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {expandedPractice === `${category.id}-${practiceIndex}` && (
                          <div className="px-6 pb-6">
                            <p className="text-gray-600 dark:text-gray-400 mb-4 text-right">
                              {practice.description}
                            </p>

                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 text-right">
                                خطوات التنفيذ:
                              </h4>
                              <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-400 text-right">
                                {practice.steps.map((step, stepIndex) => (
                                  <li key={stepIndex}>{step}</li>
                                ))}
                              </ol>
                            </div>

                            {practice.codeExample && (
                              <div className="bg-gray-900 rounded-lg overflow-hidden">
                                <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                                  <span className="text-gray-400 text-sm">مثال على الكود</span>
                                  <span className="text-gray-500 text-xs">Code Example</span>
                                </div>
                                <pre className="p-4 overflow-x-auto">
                                  <code className="text-sm text-gray-300 font-mono whitespace-pre">
                                    {practice.codeExample}
                                  </code>
                                </pre>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Checklist Tab */}
        {activeTab === "checklist" && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  قائمة التحقق الأمنية
                </h2>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {getCheckedCount()} من {checklist.length} مكتمل
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-8">
                <div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(getCheckedCount() / checklist.length) * 100}%` }}
                />
              </div>

              <div className="space-y-3">
                {checklist.map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                      item.checked
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                        : "bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleChecklistItem(item.id)}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span
                      className={`text-right flex-1 ${
                        item.checked
                          ? "text-green-700 dark:text-green-400 line-through"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {item.text}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        item.checked
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {item.checked ? "مكتمل" : "قيد التنفيذ"}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Anti-Patterns Tab */}
        {activeTab === "anti-patterns" && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                الأخطاء الأمنية الشائعة وكيفية تجنبها
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                تجنب هذه الممارسات الخاطئة لتحسين أمان تطبيقك
              </p>
            </div>

            <div className="space-y-4">
              {antiPatterns.map((pattern) => (
                <div
                  key={pattern.id}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <span className="text-2xl">⚠️</span>
                      </div>
                      <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                            <div className="text-sm font-semibold text-red-800 dark:text-red-400 mb-1">
                              ❌ ممارسة خاطئة
                            </div>
                            <p className="text-red-700 dark:text-red-300 text-right">
                              {pattern.badPractice}
                            </p>
                          </div>
                          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                            <div className="text-sm font-semibold text-green-800 dark:text-green-400 mb-1">
                              ✅ ممارسة صحيحة
                            </div>
                            <p className="text-green-700 dark:text-green-300 text-right">
                              {pattern.goodPractice}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-right">
                          {pattern.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600 dark:text-gray-400">
          <p>آخر تحديث: {new Date().toLocaleDateString("ar-SA")}</p>
          <p className="mt-2 text-sm">
            تذكر: الأمان ليس خطوة واحدة، بل عملية مستمرة
          </p>
        </footer>
      </div>
    </div>
  );
}
