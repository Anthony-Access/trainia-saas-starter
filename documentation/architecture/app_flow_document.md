# Train-IA SaaS Application Flow Document

## Onboarding and Sign-In/Sign-Up

When a brand-new user first arrives, they land on the public landing page served by `app/page.tsx`. This page welcomes them with Train-IA’s value proposition and offers clear calls to action such as “Sign Up” and “Learn More.” Clicking “Sign Up” triggers Clerk’s hosted sign-up component, which opens as a modal or redirects to Clerk’s dedicated flow. The user can choose to register with their email and password, or if social providers are enabled, they can connect via Google, GitHub, or other supported services. Once they complete the form, Clerk sends a verification email. After verifying their address, the user is automatically signed in and an authenticated session is established. Returning users can click “Sign In” on the landing page to open the Clerk sign-in form, where they may also choose social login. If a user forgets their password, they click the “Forgot password” link in the sign-in form, enter their email, and receive a password reset link to set a new password. Signing out is as simple as clicking a “Sign Out” button available in the dashboard header, which clears the session and brings them back to the public landing page.

## Main Dashboard or Home Page

After signing in, the user is redirected to the protected `/dashboard` route. This welcome page shows a top navigation bar with the Train-IA logo on the left and a profile menu on the right. The left sidebar lists links to the main areas: Dashboard Overview, My Automations, Billing, and Settings. The central panel greets the user by name and displays a summary widget with their active subscription status and a quick link to create a new automation. Below that, a recent activity list shows the last few AI tasks they ran. Each item in the sidebar and in-page links uses client-side navigation via Next.js, so moving from Dashboard to Automations or Billing feels instantaneous without a full page reload.

## Detailed Feature Flows and Page Transitions

### Creating and Running an Automation

When the user clicks “New Automation” in the sidebar or on the overview panel, they are taken to `/dashboard/automations/new`. This page presents a form built with shadcn/ui and styled by Tailwind CSS. The form fields request a name for the automation, the type of input data (text, file upload if implemented later), and any custom parameters or prompt templates. As the user fills out the fields, client-side validation powered by Zod ensures required fields are not left blank. Upon submission, a Next.js Server Action calls the OpenAI API using code in `utils/ai/openai.ts`, saving the request and response in Supabase via the Supabase client in `utils/supabase/`. While the request is in progress, the user sees a loading spinner. When the response arrives, the page displays the AI-generated output in a result panel and offers options to edit or rerun the task. A link in the header of this page leads back to the Automation list.

### Viewing Automation History

Selecting “My Automations” in the sidebar leads to `/dashboard/automations`. Here, React Query fetches a paginated list from Supabase containing all of the user’s automation runs. Each row shows the name, date created, and a status badge (completed, running, or failed). Clicking on a row opens `/dashboard/automations/[id]`, a detail view where the original inputs and AI outputs appear side by side. The user can rerun the automation, delete it, or export results to a file if that feature is added in the future.

### Managing Subscription and Payments

From the sidebar, clicking “Billing” navigates to `/dashboard/billing`. On this page, the user sees their current plan details fetched from Supabase and Stripe via a secure API route. If they are on a free plan, a button invites them to upgrade. Clicking that button triggers a server-side call that creates a Stripe Checkout session and redirects the user to Stripe’s hosted payment page. After a successful payment, Stripe sends a webhook to `app/api/webhooks/route.ts`, which updates the user’s subscription status in Supabase. When the user returns, the billing page shows their active subscription with next billing date and a “Cancel Subscription” link that, when clicked, calls a Server Action to cancel the subscription in Stripe and update the database.

### Editing Profile and Signing Out

The profile menu in the top navigation opens a dropdown where the user can click “Profile Settings.” This navigates to `/dashboard/settings/profile`, a Clerk-powered page where they can update their name, avatar, and connected social accounts. When they save changes, Clerk handles the update and returns them to the settings overview. The same settings area provides a “Change Password” link that takes them through Clerk’s secure password reset flow. To sign out, the user selects “Sign Out” from the profile menu, which clears the session and routes them back to the public landing page.

## Settings and Account Management

The Settings section under `/dashboard/settings` contains two tabs: Profile and Notifications. In the Profile tab, personal data such as display name and contact email can be changed. Clerk’s UI handles validation and persistence. In the Notifications tab, the user can toggle email notifications for completed automations, subscription reminders, or product updates. These preferences are stored in Supabase via a small Server Action that updates a `notification_preferences` table. To return to normal app use, the user clicks “Back to Dashboard” at the top or selects another link in the sidebar.

## Error States and Alternate Paths

If the user enters an invalid email or weak password during sign-up, Clerk immediately shows inline error messages explaining the issue. When a network connectivity problem occurs while fetching automations, React Query displays a retry button and a descriptive error banner. Attempting to access `/dashboard` without an active session redirects the user back to the sign-in page. If an API call to OpenAI fails, the Server Action catches the exception, logs it to an external service, and returns a user-friendly message displayed in a red alert box with an option to retry. Visiting an unknown route brings up a custom 404 page that offers a link back to the landing page or login, ensuring the user never feels stranded.

## Conclusion and Overall App Journey

A new user starts on the Train-IA landing page, signs up through Clerk, and is promptly brought to their personal dashboard. From there they can create and run AI automations, review past results, and adjust settings. When they are ready to unlock more capability, they navigate to Billing to upgrade their plan via Stripe. Throughout their journey they use clear navigation, robust validation, and smooth page transitions. At any point they can manage their profile, change their password, or sign out. Typical end goals include building a new automation, refining existing automations, or upgrading their subscription, all within a coherent and friendly interface that guides them from start to finish.