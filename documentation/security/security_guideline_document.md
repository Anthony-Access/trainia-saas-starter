# Security Guidelines for the `trainia-saas-starter` (Train-IA)

This document outlines the security principles, controls, and best practices you should follow when building **Train-IA** on top of the `trainia-saas-starter` repository. It is aligned with core security-by-design tenets and tailored to the project’s technology stack (Next.js 14 App Router, TypeScript, Clerk, Supabase, Stripe, OpenAI).

---

## 1. Security by Design

• **Embed security from day one** – treat every feature (landing page, dashboard, AI workflows) as a potential attack surface.
• **Least privilege** – services and components (e.g., Supabase service role, Stripe webhooks) should only have permissions they absolutely need.
• **Defense in depth** – layer controls at the network, application, and data levels.

---

## 2. Authentication & Access Control

### 2.1 Clerk Integration
• Enforce **strong password policies** (min length, complexity) via Clerk’s configuration.
• Enable **Multi-Factor Authentication (MFA)** for sensitive accounts.
• Use Clerk’s **secure session management**: short-lived tokens, HttpOnly & Secure cookies, `SameSite`=Strict.

### 2.2 Role-Based Access Control (RBAC)
• Define explicit roles (e.g., `user`, `admin`) in your database.
• Always verify Clerk JWTs and check user roles server-side before granting access to protected routes (e.g., `/dashboard`).

### 2.3 Session & Token Security
• Disallow `alg=none` in JWTs; enforce signature validation and `exp` claims.
• Rotate session tokens on privilege changes (e.g., role escalations).

---

## 3. Input Validation & Output Encoding

### 3.1 Server-Side Validation
• Use a schema validation library (e.g., **Zod**) for:
  - Form inputs (sign-up, AI prompts, settings)
  - API routes and Server Actions
• Reject all unexpected or malformed fields.

### 3.2 Prevent Injection
• Use parameterized queries or Supabase’s query builder to avoid SQL injection.
• Never interpolate user input into dynamic SQL or system commands.

### 3.3 XSS & Template Injection
• Output-encode all user-controlled data rendered in React components.
• Do not dangerously set HTML without sanitization.
• Implement a strict Content Security Policy via HTTP headers.

---

## 4. Data Protection & Privacy

### 4.1 Encryption
• **At rest:** Ensure Supabase disk encryption (default in managed Postgres).
• **In transit:** Enforce TLS 1.2+ for all API calls (Next.js, Clerk, Supabase, Stripe, OpenAI).

### 4.2 Secrets Management
• Store API keys (OpenAI, Stripe) in a secrets vault (e.g., AWS Secrets Manager, Vault). Do **not** commit them to source.
• Access secrets at runtime via environment variables and inject them into server-side only.

### 4.3 PII Handling
• Mask or hash sensitive user data where possible.
• Audit logs and API responses to avoid exposing PII or internal stack traces.

---

## 5. API & Service Security

### 5.1 HTTPS & Rate Limiting
• Enforce HTTPS in production with HSTS.
• Implement rate limiting on critical endpoints (e.g., login, AI invocation) to mitigate brute-force and abuse.

### 5.2 CORS
• Restrict CORS to known origins (your landing page domain).

### 5.3 Webhooks (Stripe)
• Validate Stripe signatures on incoming webhook events.
• Use a dedicated, least-privileged secret for webhook verification.

### 5.4 API Versioning & Minimal Exposure
• Prefix custom endpoints (e.g., `/api/v1/ai-process`).
• Return only necessary fields, avoid verbose database dumps.

---

## 6. Web Application Security Hygiene

• **CSRF Protection:** Use Next.js built-in CSRF tokens or a library (e.g., `next-csrf`) for state-changing forms.
• **Security Headers:** Configure via `next.config.js` or middleware:
  - `Content-Security-Policy`
  - `Strict-Transport-Security`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: no-referrer-when-downgrade`
• **Secure Cookies:** Always set `HttpOnly`, `Secure`, `SameSite=Strict` for auth cookies.

---

## 7. Infrastructure & Configuration Management

• **Harden Next.js host (e.g., Vercel):** disable directory listing, debug endpoints.
• **Environment Segregation:** Use separate projects/envs for dev, staging, prod in Supabase and Clerk.
• **TLS Configuration:** Disable TLS <1.2; use strong cipher suites.
• **File Permissions:** Store uploaded files outside `/public`; enforce restrictive ACLs.

---

## 8. Dependency Management

• Use a lockfile (`package-lock.json`) and scan with SCA tools (e.g., `npm audit`, Snyk).
• Only include necessary packages; vet 3rd-party UI libs (shadcn/ui) for vulnerabilities.
• Keep Next.js, Clerk, Supabase client, and other libraries up-to-date.

---

## 9. Testing & Monitoring

• **Automated Testing:** Write unit/integration tests (Jest, React Testing Library) and E2E tests (Playwright/Cypress) for:
  - Authentication flows
  - AI request handling
  - Payment webhook processing
• **Logging & Alerting:** Use structured logging (Pino) and integrate an APM (e.g., Sentry) to catch exceptions and performance anomalies.

---

## 10. Specific Recommendations for Train-IA

1. **Schema Validation with Zod:** Define Zod schemas for every Server Action and API route to enforce data contracts.
2. **Supabase Row Level Security (RLS):** Authorize each table so users can only access their own records.
3. **Server-Side AI Proxy:** Keep OpenAI keys server-only. Throttle and meter AI usage per user to avoid abuse.
4. **Centralized Error Handling:** Implement a Next.js error boundary plus a common API error wrapper that logs to Sentry and returns sanitized messages.

---

Adhering to these guidelines will help you build a secure, resilient, and maintainable Train-IA application on top of the `trainia-saas-starter` framework. Always update and review security controls as features evolve and new threats emerge.