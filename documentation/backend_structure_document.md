# Backend Structure Document

This document outlines the backend setup for Train-IA’s starter kit (`trainia-saas-starter`). It explains the architecture, databases, APIs, hosting, infrastructure, security, monitoring, and maintenance practices in everyday language.

## 1. Backend Architecture

**Overall Design**
- Based on **Next.js 14** with the App Router. This gives us:
  - Server and client components out-of-the-box.
  - File-system routing for pages and API routes.
  - Server Actions for secure, server-side form handling and business logic.
- Written in **TypeScript** for type safety and easier maintenance.
- Follows a **modular structure**:
  - `app/` for routes and layouts
  - `components/` for reusable UI
  - `utils/` for business logic (AI, Stripe, Supabase)
  - `hooks/` for custom React hooks
  - `supabase/migrations/` for database schema

**Scalability, Maintainability & Performance**
- **Serverless functions**: Each API route and Server Action scales independently on Vercel.
- **Context providers** (Clerk, React Query) keep state logic organized.
- **Code splitting**: Next.js only loads what the user needs, boosting performance.
- **Database-first workflow**: Migrations keep the schema versioned and consistent across environments.

## 2. Database Management

**Technology**
- **PostgreSQL** database managed by **Supabase** (a Backend-as-a-Service).
- Supabase provides:
  - Hosted database with built-in backups
  - Client libraries for JavaScript/TypeScript
  - Automatic TypeScript type generation from the schema
  - Row-Level Security (RLS) policies for data access control

**Data Structure & Access**
- Customer and user metadata stored in dedicated tables.
- Subscription and billing records tied to Stripe events.
- AI process configurations and results stored in custom tables.
- Access through Supabase client utilities and Server Actions.
- Migrations are tracked under `supabase/migrations/` as SQL files.

## 3. Database Schema

### Human-Readable Overview
- **user_profiles**: stores additional info for each user (name, settings).
- **subscriptions**: tracks user subscription plan, status, and start/end dates.
- **ai_tasks**: records each AI automation job, its parameters, status, and results.
- **stripe_events**: logs raw webhook events from Stripe for auditing and reconciliation.

### SQL Schema (PostgreSQL)
```sql
-- Stores extra user data
CREATE TABLE user_profiles (
  id uuid PRIMARY KEY,
  full_name text,
  preferences jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tracks subscription plans and statuses
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES user_profiles(id),
  stripe_subscription_id text UNIQUE,
  plan_name text,
  status text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Logs AI automation tasks
CREATE TABLE ai_tasks (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES user_profiles(id),
  input prompt jsonb,
  result jsonb,
  status text,
  error_message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Captures incoming Stripe webhooks
CREATE TABLE stripe_events (
  id serial PRIMARY KEY,
  event_id text UNIQUE,
  raw_payload jsonb,
  processed_at timestamptz
);
```  

## 4. API Design and Endpoints

**Approach**
- Uses **RESTful** API routes via Next.js under `app/api/`.
- Secure Server Actions for form submissions and AI calls.

**Key Endpoints**
- `POST /api/webhooks/stripe`  
  Handles incoming Stripe events (subscription updates, invoices).

- `POST /api/ai/run`  
  Accepts user input, calls OpenAI via `utils/ai/openai.ts`, saves the result in `ai_tasks`.

- `GET /api/users/profile`  
  Returns the authenticated user's profile information from `user_profiles`.

- `PUT /api/users/profile`  
  Updates user settings or preferences.

- `GET /api/subscriptions`  
  Retrieves current subscription details for display in the dashboard.

- `POST /api/subscriptions/upgrade`  
  Initiates a plan change via Stripe.

## 5. Hosting Solutions

**Provider**
- **Vercel** for seamless Next.js and serverless function hosting.

**Benefits**
- **Automatic scaling**: Serverless functions scale with traffic.
- **Global CDN**: Static assets and serverless routes are served from edge locations.
- **Zero-configuration** deployments with Git integration.
- Cost is usage-based, optimizing for early-stage projects.

## 6. Infrastructure Components

- **Load Balancer & Edge Network** (via Vercel): Distributes traffic globally.
- **CDN** (Vercel’s edge): Caches static assets and serverless responses.
- **Caching Mechanisms**:
  - **React Query** caches API data on the client.
  - **Edge cache headers** on server responses for public content.
- **Database Connection Pooling**: Managed by Supabase for efficient queries.
- **Webhook Receiver**: Dedicated API route to process Stripe events and ensure idempotency.

## 7. Security Measures

- **Authentication**: Clerk handles user sign-up, sign-in, sessions, and multi-factor if enabled.
- **Authorization**: Supabase Row-Level Security (RLS) ensures users see only their own data.
- **Data Validation**: Use **Zod** schemas on both client and server to prevent bad or malicious input.
- **Encryption**:
  - TLS (HTTPS) for all traffic.
  - Database encryption at rest (managed by Supabase).
- **Secret Management**:
  - Environment variables for API keys (OpenAI, Stripe) stored securely in Vercel.
- **Audit Logging**: Stripe events and critical actions logged in the database.
- **Vulnerability Monitoring**: Dependabot or Snyk for dependency scanning.

## 8. Monitoring and Maintenance

**Monitoring Tools**
- **Sentry** for real-time error tracking in both serverless functions and front-end.
- **Pino** (or similar structured logger) for server logs, searchable in a logging service.
- **Supabase Dashboard** for database performance metrics and query insights.
- **Vercel Analytics** for traffic patterns, performance, and error rates.

**Maintenance Practices**
- **Schema Migrations**: Track changes via SQL files; run with Supabase CLI.
- **Automated Type Generation**: Supabase CLI regenerates TypeScript types after each migration.
- **Dependency Updates**: Scheduled checks and periodic reviews.
- **RLS Policy Audits**: Regularly verify that row-level security rules match business requirements.
- **Backup & Recovery**: Supabase provides automated backups; test restore procedures quarterly.

## 9. Conclusion and Overall Backend Summary

Train-IA’s backend is built on a modern, serverless-first stack that balances developer productivity with robust, scalable infrastructure. Key highlights:

- **Next.js App Router** with serverless functions for secure, efficient business logic.
- **Supabase (PostgreSQL)** for a managed database with migrations, types, and RLS.
- **Clerk** for drop-in, secure user authentication flows.
- **Stripe integration** for future subscription and payment automation.
- **Vercel hosting** for global CDNs, automatic scaling, and seamless deployments.
- **Security & Monitoring** baked in from day one with RLS, Zod validation, Sentry, and structured logging.

This setup aligns perfectly with Train-IA’s goal: deliver a reliable, maintainable, and performance-oriented SaaS backbone so you can focus on building your core AI automation features.