# Project Requirements Document for Train-IA

## 1. Project Overview

Train-IA is a SaaS platform designed to help businesses automate their internal processes using AI. At its core, Train-IA allows companies to define, train, and deploy AI-driven workflows that handle repetitive tasks—like data entry, report generation, and basic customer interactions—without manual coding. This speeds up operations, reduces errors, and frees up teams to focus on higher-value work.

We’re building Train-IA because many small- and medium-sized businesses lack the bandwidth or technical expertise to integrate AI into their daily operations. By offering a polished SaaS solution with built-in user management, subscription billing, and a user-friendly dashboard, we lower the barrier to entry for AI automation. Success will be measured by user adoption (number of active accounts), engagement (frequency of automation runs), and customer satisfaction (feedback scores and renewal rates).

---

## 2. In-Scope vs. Out-of-Scope

### In-Scope (MVP Features)
- Public-facing landing page with marketing copy, hero section, and clear call-to-action buttons.  
- Secure user sign-up, sign-in, password reset, and profile management powered by Clerk.  
- Protected dashboard route (`/dashboard`) where authenticated users land after login.  
- Core AI integration utility (`utils/ai/openai.ts`) to send prompts to the OpenAI API and receive responses.  
- Data storage in a Supabase-managed PostgreSQL database for user records, automation configurations, and activity logs.  
- Stripe integration for creating subscription plans and handling customer billing, plus a webhook endpoint to process Stripe events.  
- Reusable UI components built with shadcn/ui and styled using Tailwind CSS.  
- Data fetching and cache management using TanStack React Query.  

### Out-of-Scope (Future Phases)
- Multi-tenant or enterprise-level role-based access control beyond basic user accounts.  
- Advanced workflow builder with drag-and-drop interfaces.  
- On-premises deployment options; initial launch is cloud-only.  
- Built-in monitoring dashboards or detailed analytics—only basic usage logs.  
- Mobile apps or React Native support—web only.  
- Custom AI model hosting—reliance on third-party APIs (OpenAI).  

---

## 3. User Flow

A first-time visitor lands on the Train-IA homepage and is greeted by a Hero section that briefly explains how AI automation works. They scroll down to see feature highlights and click a **"Sign Up"** button. This takes them to a Clerk-powered sign-up form where they enter an email and password. After verifying their email (if required), they’re automatically signed in.

Upon login, the user is redirected to their protected dashboard at `/dashboard`. Here, they see a welcome message and a prompt to create their first automation. They click **"Create Automation,** fill out a simple form (name, description, input/output definitions), and submit. Behind the scenes, the form uses React Query to call a Next.js Server Action, which stores the configuration in Supabase. The user then runs a test, triggering an API call to OpenAI, and sees the response displayed on-screen. In parallel, billing status and plan information (fetched via Stripe) are shown in a sidebar for quick reference.

---

## 4. Core Features

- **Landing Page & Marketing**  
  • Hero section, feature callouts, and responsive design.  
- **Authentication & User Management**  
  • Sign-up, sign-in, password reset, profile update (Clerk).  
- **Protected Routes & Dashboard**  
  • Auth guard for `/dashboard` using Clerk middleware.  
- **AI Automation Module**  
  • `utils/ai/openai.ts` to handle prompt construction, API calls, and response parsing.  
- **Database & Data Persistence**  
  • Supabase client for CRUD operations on users, automations, and logs.  
- **Subscription & Payments**  
  • Stripe setup for plan creation, customer billing, and webhook processing (`app/api/webhooks/route.ts`).  
- **UI Component Library**  
  • shadcn/ui components (buttons, cards, modals) plus Tailwind CSS for custom styling.  
- **Data Fetching & State Management**  
  • TanStack React Query for server state syncing and caching.  

---

## 5. Tech Stack & Tools

- **Frontend Framework:** Next.js 14 (App Router) for routing and server components.  
- **Language:** TypeScript for type safety.  
- **Authentication:** Clerk for secure user sign-up, sign-in, and session management.  
- **Database & BaaS:** Supabase (PostgreSQL with auto-generated TypeScript types).  
- **Styling:** Tailwind CSS (utility-first CSS).  
- **UI Components:** shadcn/ui (accessible React primitives).  
- **Payment Processor:** Stripe (recurring billing, customer portals, webhooks).  
- **Data Fetching:** TanStack React Query (caching and synchronization).  
- **AI Integration:** OpenAI API via `utils/ai/openai.ts`.  
- **Deployment:** Vercel for hosting Next.js applications and serverless functions.  
- **IDE & Plugins (optional):** VS Code with extensions like Prisma, ESLint, Prettier, and GitLens.  

---

## 6. Non-Functional Requirements

- **Performance:** Page loads under 1.5 seconds on 3G networks for the landing page; dashboard interactions under 500ms for common API calls.  
- **Security:**  
  • All sensitive keys (OpenAI, Stripe) stored in environment variables, never exposed to the client.  
  • Supabase Row Level Security (RLS) policies ensure a user can only access their own data.  
  • HTTPS enforced for all traffic.  
- **Compliance:** Basic GDPR compliance—users can delete their account and data.  
- **Usability:** Responsive design for mobile and desktop; accessible color contrast and keyboard navigation.  
- **Reliability:** 99.9% uptime for authentication and core API endpoints.  

---

## 7. Constraints & Assumptions

- **API Dependencies:** Assumes reliable access to OpenAI and Stripe APIs without rate-limit bottlenecks.  
- **Cloud Services:** Relies on Vercel and Supabase availability.  
- **User Scale:** Initial design for up to 10,000 users; further scaling may require database indexing and horizontal function scaling.  
- **Email Delivery:** Clerk’s email verification depends on their SMTP configuration.  
- **Browser Support:** Modern evergreen browsers (Chrome, Firefox, Safari, Edge); no IE11 support.  

---

## 8. Known Issues & Potential Pitfalls

- **API Rate Limits:** OpenAI free-tier rate limits may delay automation tests—consider implementing retry logic or user notifications.  
- **Stripe Webhook Idempotency:** Duplicate events can cause inconsistent subscription states—use idempotency keys and verify event signatures.  
- **RLS Misconfiguration:** Incorrect Supabase policies can lock users out or expose data—test policies thoroughly with staging data.  
- **Validation Gaps:** Without schema validation (e.g., Zod), malformed input could crash server actions—plan to integrate server- and client-side validation early.  
- **Error Monitoring:** No built-in logging—set up a service like Sentry or Pino to capture runtime exceptions and improve troubleshooting.  


This PRD serves as the definitive guide for Train-IA’s MVP development. It outlines exactly which features belong in version one, what frameworks and services to use, and where potential risks lie. With this clarity, subsequent technical documents—like API specs, UI wireframes, or test plans—can be drafted without any guesswork.