# Frontend Guideline Document for Train-IA

## 1. Frontend Architecture

We use a modern, modular setup based on Next.js 14 (App Router) and TypeScript. This combination gives us great performance, SEO benefits for public pages, and strong type safety throughout the code.

- **Next.js App Router**: Enables file-based routing, server components, and server actions to keep sensitive logic on the server. Supports hybrid rendering (static, SSR, ISR).  
- **TypeScript**: Catches errors at compile time, enforces consistent data shapes, and improves IDE support.  
- **Clerk**: Handles authentication and user sessions. It provides React context for auth state and middleware to protect routes.  
- **Supabase**: Provides a PostgreSQL database with auto-generated TypeScript types, client SDK, and migration files for schema management.  
- **TanStack React Query**: Manages data fetching, caching, and synchronization with the server, reducing boilerplate and improving UX.  
- **shadcn/ui + Tailwind CSS**: A utility-first styling approach with accessible, pre-built UI primitives that we can compose and theme easily.  
- **Stripe**: Preconfigured payment integration with webhooks to handle billing events.  
- **Vercel**: (implied) Seamless deployment for Next.js, serverless functions, and static assets.

This architecture is:
- **Scalable**: Modular folders (`app/`, `components/`, `utils/`, `supabase/`, `types/`) let us add new features without clutter.
- **Maintainable**: Strong typing and clear separation of concerns reduce regressions and onboarding time.
- **Performant**: Next.js optimizes bundles, images, and critical CSS by default; React Query minimizes unnecessary network calls.

## 2. Design Principles

Our UI is guided by three core principles:

1. **Usability**: We keep interactions clear and predictable. Forms provide immediate feedback on errors. Buttons and links are labeled clearly.  
2. **Accessibility**: Components follow WAI-ARIA best practices. We ensure proper keyboard navigation, screen-reader labels, and sufficient color contrast.  
3. **Responsiveness**: Layouts adapt from mobile to desktop using Tailwind’s responsive utilities. We test breakpoints at common device widths.

How we apply them:
- **Form Validation**: Using Zod schemas on both client and server to give users clear, field-level error messages.  
- **Component Variants**: shadcn/ui components include accessible props (e.g., `aria-label`, `role`).  
- **Responsive Utilities**: Tailwind’s `sm:`, `md:`, `lg:` classes ensure elements stack or resize as needed.

## 3. Styling and Theming

### Approach
- We use **Tailwind CSS**, a utility-first framework that promotes consistency and rapid iteration.  
- **BEM-like naming** for any custom CSS modules when needed, but most styling comes from Tailwind.

### Theming
- A single `tailwind.config.js` file defines colors, fonts, and breakpoints.  
- We expose custom utilities for dark/light mode using the `class` strategy.

### Visual Style
- **Overall Style**: Modern, flat design with subtle shadows and rounded corners. We emphasize clarity over heavy decoration.  
- **Glassmorphism Elements**: Used sparingly on modals or cards to create a sense of depth without sacrificing readability.

### Color Palette
- Primary: #3B82F6 (blue-500)  
- Secondary: #6366F1 (indigo-500)  
- Accent: #10B981 (emerald-500)  
- Neutral dark: #111827 (gray-900)  
- Neutral light: #F3F4F6 (gray-100)  
- Background: #FFFFFF  
- Error: #EF4444 (red-500)  
- Success: #22C55E (green-500)

### Typography
- Primary font: **Inter**, a clean, modern sans-serif.  
- Fallbacks: system-ui, -apple-system, BlinkMacSystemFont.

## 4. Component Structure

We follow a component-based architecture to maximize reuse and clarity.

- **`app/`** folder: Contains routing and layout logic.  
  • `layout.tsx`: Global wrappers (ClerkProvider, ReactQueryProvider).  
  • `page.tsx`: Public landing page.  
- **`components/`**: Reusable UI pieces.  
  • `ui/`: shadcn/ui primitives like Button, Card, Input.  
  • `sections/`: Hero, Features, Footer.  
- **`hooks/`**: Custom hooks (e.g., `useCurrentUser`, `useAIProcess`).  
- **`utils/`**: Business logic helpers.  
  • `ai/openai.ts`: OpenAI API interactions (server-side).  
  • `stripe/`: Payment helper functions.  
  • `supabase/`: Database client and admin utilities.  
- **`supabase/migrations/`**: SQL files defining tables and RLS policies.  
- **`types/`**: Shared TypeScript types (database, API responses).

Benefits:
- **Reusability**: Build once, use everywhere.  
- **Maintainability**: Small, focused components are easier to test and update.  

## 5. State Management

- **React Query** (TanStack): Fetches, caches, and updates data from Supabase. Query keys and mutation functions live in `utils/supabase/`.  
- **Clerk Context**: Provides `useUser` hook to access auth state and user metadata.  
- **Local Component State**: For UI concerns (e.g., modal open/close), we use React’s `useState` or `useReducer` when logic grows complex.  
- **Global State (if needed)**: We can introduce React Context or Zustand for global flags (e.g., theme).  

React Query’s automatic refetching, cache invalidation, and optimistic updates ensure data is fresh without manual orchestration.

## 6. Routing and Navigation

- **File-based Routing**: Every folder in `app/` becomes a route.  
- **Protected Routes**: We wrap authenticated pages (e.g., `app/dashboard`) in a `WithAuth` layout/component that checks `useUser()` and redirects to sign-in if needed.  
- **Navigation Components**: Use `next/link` for internal links and `Clerk`’s `SignInButton`/`SignOutButton` for auth actions.  
- **Dynamic Routes**: For AI job details or user profiles, we use `[id]/page.tsx` patterns.

This structure makes it easy to see the app’s navigation map at a glance and add new pages securely.

## 7. Performance Optimization

1. **Code Splitting & Lazy Loading**: Next.js automatically splits pages. For large components, we use `next/dynamic`.  
2. **Image Optimization**: Use `next/image` for responsive, lazy-loaded images with built-in caching and format selection.  
3. **Caching**: React Query’s cache minimizes redundant network calls. We configure stale times and background refetch to balance freshness and speed.  
4. **Server Components**: Keep heavy logic on the server to reduce client bundle size.  
5. **Critical CSS**: Tailwind’s PurgeCSS removes unused styles in production, keeping CSS bundles small.

Together, these measures ensure fast load times and a responsive feel, even on slower networks.

## 8. Testing and Quality Assurance

- **Unit & Integration Tests**:  
  • Jest + React Testing Library for components, hooks, and utilities.  
  • Snapshot tests for UI stability.  
- **End-to-End Tests**:  
  • Playwright (or Cypress) to automate critical flows: sign-up, sign-in, dashboard access, AI job creation.  
- **Schema Validation**:  
  • Zod for validating incoming data to Server Actions and API routes, with clear error objects sent back to the client.  
- **Error Tracking**:  
  • Sentry (or similar) to capture runtime exceptions in production, with source maps for traceability.  
- **Linting & Formatting**:  
  • ESLint (with TypeScript rules) and Prettier ensure consistent style and catch common errors.  
- **CI Pipeline**:  
  • Run tests, linting, and type-checks on each pull request.  

These steps help maintain a reliable, predictable codebase as Train-IA grows.

## 9. Conclusion and Overall Frontend Summary

This guideline outlines a robust, scalable frontend built on Next.js 14, TypeScript, and a suite of best-in-class tools. We prioritize:

- **Modularity & Reuse**: Small, focused components and utilities.  
- **Strong Typing & Validation**: TypeScript + Zod for data safety.  
- **Performance & UX**: Next.js optimizations, React Query caching, and responsive design.  
- **Security & Accessibility**: Clerk for auth, Supabase RLS, screen-reader support, and color contrast.  
- **Maintainability**: Clear folder structure, linting, testing, and CI.

By following these guidelines, any developer—regardless of prior exposure to this codebase—can confidently build, extend, and maintain the Train-IA frontend, delivering a polished, performant, and user-friendly SaaS experience.