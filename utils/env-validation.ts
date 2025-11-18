/**
 * Environment Variables Validation
 *
 * Validates that all critical environment variables are properly set
 * and prevents deployment with placeholder or invalid values.
 *
 * Security Impact: Prevents misconfiguration vulnerabilities in production
 */

import { SecurityLogger } from './security-logger';

interface ValidationError {
  variable: string;
  issue: string;
  severity: 'error' | 'warning';
}

/**
 * List of required environment variables for the application to function
 */
const REQUIRED_VARIABLES = {
  // Clerk Authentication
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: {
    required: true,
    public: true,
    description: 'Clerk publishable key for authentication',
  },
  CLERK_SECRET_KEY: {
    required: true,
    public: false,
    description: 'Clerk secret key (server-side only)',
  },

  // Supabase Database
  NEXT_PUBLIC_SUPABASE_URL: {
    required: true,
    public: true,
    description: 'Supabase project URL',
  },
  NEXT_PUBLIC_SUPABASE_ANON_KEY: {
    required: true,
    public: true,
    description: 'Supabase anonymous key (client-side)',
  },
  SUPABASE_SERVICE_ROLE_KEY: {
    required: true,
    public: false,
    description: 'Supabase service role key (server-side only, bypasses RLS)',
  },

  // Stripe Payments
  STRIPE_SECRET_KEY: {
    required: true,
    public: false,
    description: 'Stripe secret key for payment processing',
  },
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: {
    required: true,
    public: true,
    description: 'Stripe publishable key (client-side)',
  },
  STRIPE_WEBHOOK_SECRET: {
    required: true,
    public: false,
    description: 'Stripe webhook signing secret',
  },

  // Application
  NEXT_PUBLIC_SITE_URL: {
    required: false,
    public: true,
    description: 'Application URL (optional in development)',
  },
} as const;

/**
 * Patterns that indicate placeholder or invalid values
 */
const FORBIDDEN_PATTERNS = [
  'placeholder',
  'xxxxx',
  'your_',
  'sk_test_xxxxx',
  'pk_test_xxxxx',
  'whsec_xxxxx',
  'example',
  'change_me',
  'TODO',
] as const;

/**
 * Validates a single environment variable
 */
function validateVariable(
  name: string,
  config: typeof REQUIRED_VARIABLES[keyof typeof REQUIRED_VARIABLES]
): ValidationError[] {
  const errors: ValidationError[] = [];
  const value = process.env[name];
  const isProduction = process.env.NODE_ENV === 'production';

  // Check if variable exists
  if (!value || value.trim() === '') {
    if (config.required) {
      errors.push({
        variable: name,
        issue: 'Variable is not defined or is empty',
        severity: isProduction ? 'error' : 'warning',
      });
    }
    return errors;
  }

  // Check for placeholder values
  const hasForbiddenPattern = FORBIDDEN_PATTERNS.some(pattern =>
    value.toLowerCase().includes(pattern.toLowerCase())
  );

  if (hasForbiddenPattern && isProduction) {
    errors.push({
      variable: name,
      issue: `Contains placeholder value: ${value.substring(0, 20)}...`,
      severity: 'error',
    });
  }

  // Validate Supabase URL format
  if (name === 'NEXT_PUBLIC_SUPABASE_URL') {
    try {
      const url = new URL(value);
      if (!url.hostname.includes('supabase')) {
        errors.push({
          variable: name,
          issue: 'URL does not appear to be a valid Supabase URL',
          severity: 'warning',
        });
      }
    } catch {
      errors.push({
        variable: name,
        issue: 'Invalid URL format',
        severity: 'error',
      });
    }
  }

  // Validate Stripe keys format
  if (name === 'STRIPE_SECRET_KEY') {
    if (!value.startsWith('sk_')) {
      errors.push({
        variable: name,
        issue: 'Stripe secret key should start with "sk_"',
        severity: 'error',
      });
    }
    if (isProduction && value.includes('test')) {
      errors.push({
        variable: name,
        issue: 'Using test key in production environment',
        severity: 'error',
      });
    }
  }

  if (name === 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY') {
    if (!value.startsWith('pk_')) {
      errors.push({
        variable: name,
        issue: 'Stripe publishable key should start with "pk_"',
        severity: 'error',
      });
    }
  }

  if (name === 'STRIPE_WEBHOOK_SECRET') {
    if (!value.startsWith('whsec_')) {
      errors.push({
        variable: name,
        issue: 'Stripe webhook secret should start with "whsec_"',
        severity: 'error',
      });
    }
  }

  // Validate Clerk keys format
  if (name === 'CLERK_SECRET_KEY') {
    if (!value.startsWith('sk_')) {
      errors.push({
        variable: name,
        issue: 'Clerk secret key should start with "sk_"',
        severity: 'error',
      });
    }
  }

  if (name === 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY') {
    if (!value.startsWith('pk_')) {
      errors.push({
        variable: name,
        issue: 'Clerk publishable key should start with "pk_"',
        severity: 'error',
      });
    }
  }

  return errors;
}

/**
 * Validates all environment variables
 *
 * @throws {Error} In production if critical errors are found
 * @returns {boolean} True if validation passed
 */
export function validateEnvironmentVariables(): boolean {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development';
  const allErrors: ValidationError[] = [];

  console.log('🔍 Validating environment variables...');
  console.log(`   Environment: ${process.env.NODE_ENV || 'unknown'}`);
  console.log('');

  // Validate each variable
  for (const [name, config] of Object.entries(REQUIRED_VARIABLES)) {
    const errors = validateVariable(name, config);
    allErrors.push(...errors);
  }

  // Separate errors and warnings
  const errors = allErrors.filter(e => e.severity === 'error');
  const warnings = allErrors.filter(e => e.severity === 'warning');

  // Display errors
  if (errors.length > 0) {
    console.error('❌ CRITICAL CONFIGURATION ERRORS:');
    console.error('');
    errors.forEach(error => {
      console.error(`   ❌ ${error.variable}`);
      console.error(`      Issue: ${error.issue}`);
      console.error('');

      // ✅ SECURITY: Log environment validation errors
      SecurityLogger.logEnvValidationError({
        variable: error.variable,
        issue: error.issue,
        severity: error.severity,
      });
    });
  }

  // Display warnings
  if (warnings.length > 0) {
    console.warn('⚠️  CONFIGURATION WARNINGS:');
    console.warn('');
    warnings.forEach(warning => {
      console.warn(`   ⚠️  ${warning.variable}`);
      console.warn(`      Issue: ${warning.issue}`);
      console.warn('');
    });
  }

  // Handle validation results
  if (errors.length > 0) {
    if (isProduction) {
      console.error('🚨 DEPLOYMENT BLOCKED: Fix the errors above before deploying to production.');
      console.error('');
      throw new Error(
        `Environment validation failed with ${errors.length} error(s). ` +
        'Check your environment variables configuration.'
      );
    } else {
      console.warn('⚠️  Development mode: Continuing despite errors, but fix them before production!');
      console.warn('');
    }
  }

  if (warnings.length > 0 && !isDevelopment) {
    console.warn('⚠️  Please review and fix the warnings above.');
    console.warn('');
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All environment variables are properly configured!');
    console.log('');
  }

  return errors.length === 0;
}

/**
 * Gets a summary of the environment configuration status
 */
export function getEnvironmentStatus() {
  const allErrors: ValidationError[] = [];

  for (const [name, config] of Object.entries(REQUIRED_VARIABLES)) {
    const errors = validateVariable(name, config);
    allErrors.push(...errors);
  }

  const errors = allErrors.filter(e => e.severity === 'error');
  const warnings = allErrors.filter(e => e.severity === 'warning');

  return {
    isValid: errors.length === 0,
    errorCount: errors.length,
    warningCount: warnings.length,
    errors,
    warnings,
  };
}
