flowchart TD
    LandingPage[Landing Page]
    LandingPage -->|Click Sign Up Sign In| AuthClerk[Authentication Clerk]
    AuthClerk -->|Success| Dashboard[Protected Dashboard]
    Dashboard --> FetchData[Fetch User Data]
    Dashboard --> AITask[Trigger AI Automation]
    Dashboard --> Subscription[Manage Subscription]
    FetchData --> Supabase[Supabase Database]
    AITask --> AIUtil[utils ai openai]
    AIUtil -->|Return Result| Dashboard
    Subscription --> Stripe[Stripe Payment]
    Stripe --> Webhook[Stripe Webhook Handler]
    Webhook --> Supabase
    Supabase --> Dashboard