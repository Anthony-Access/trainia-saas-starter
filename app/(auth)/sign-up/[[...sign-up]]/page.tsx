import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Join Train-IA
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Create your account and start automating today
          </p>
        </div>
        <div className="mt-8">
          <SignUp
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-lg border border-gray-200 dark:border-gray-700"
              }
            }}
            redirectUrl="/dashboard"
            forceRedirectUrl={false}
            signInUrl="/sign-in"
            fallbackRedirectUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  )
}