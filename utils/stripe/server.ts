'use server';

import Stripe from 'stripe';
import { stripe } from '@/utils/stripe/config';
import { createOrRetrieveCustomer, supabaseAdmin } from '@/utils/supabase/admin';
import {
    getURL,
    getErrorRedirect,
    calculateTrialEndUnixTimestamp
} from '@/utils/helpers';
import { Tables } from '@/types/database.types';
import { auth, currentUser } from '@clerk/nextjs/server';
import { RateLimiters } from '@/utils/rate-limit-actions';
import { AuditLoggers } from '@/utils/audit-logger';

type Price = Tables<'prices'>;

export async function checkoutWithStripe(
    price: Price,
    redirectPath: string = '/',
    referralId?: string,
    referral?: string
) {
    try {
        // ✅ SECURITY: Rate limit checkout sessions (3 per 5 minutes)
        const rateLimitResult = await RateLimiters.checkout();
        if (!rateLimitResult.success) {
            throw new Error(
                `Too many checkout attempts. Please try again in ${Math.ceil((rateLimitResult.reset - Date.now() / 1000) / 60)} minutes.`
            );
        }

        // Get the user from Supabase auth
        const user = await currentUser()

        if (referralId) {
            console.log("checkout with referral id:", referralId)
        }

        if (!user) {
            throw new Error('Could not get user session.');
        }

        // Retrieve or create the customer in Stripe
        let customer: string;
        try {
            customer = await createOrRetrieveCustomer({
                uuid: user.id || '',
                email: user?.primaryEmailAddress?.emailAddress || '',
                referral: referralId
            });
        } catch (err) {
            console.error(err);
            throw new Error('Unable to access customer record.');
        }

        const referralMetadata = referral || referralId ? {
            metadata: {
                referral: referral || null,
                referral_id: referralId || null
            }
        } : {}

        let params: Stripe.Checkout.SessionCreateParams = {
            allow_promotion_codes: true,
            billing_address_collection: 'required',
            customer,
            customer_update: {
                address: 'auto'
            },
            line_items: [
                {
                    price: price.id,
                    quantity: 1
                }
            ],
            cancel_url: getURL(),
            success_url: getURL(redirectPath),
            client_reference_id: referralId,
            ...referralMetadata
        };

        if (price.type === 'recurring') {
            params = {
                ...params,
                mode: 'subscription',
                subscription_data: {
                    trial_end: calculateTrialEndUnixTimestamp(price.trial_period_days),
                    ...referralMetadata
                }
            };
        } else if (price.type === 'one_time') {
            params = {
                ...params,
                mode: 'payment'
            };
        }

        // Create a checkout session in Stripe
        let session: Stripe.Checkout.Session
        try {
            session = await stripe.checkout.sessions.create(params);
        } catch (err) {
            console.error(err);
            throw new Error('Unable to create checkout session.');
        }

        // ✅ SECURITY: Log checkout session creation for audit trail
        if (session) {
            await AuditLoggers.checkoutInitiated({
                priceId: price.id,
                amount: price.unit_amount || undefined,
            });
        }

        // Instead of returning a Response, just return the data or error.
        if (session) {
            return session
        } else {
            throw new Error('Unable to create checkout session.');
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                errorRedirect: getErrorRedirect(
                    redirectPath,
                    error.message,
                    'Please try again later or contact a system administrator.'
                )
            };
        } else {
            return {
                errorRedirect: getErrorRedirect(
                    redirectPath,
                    'An unknown error occurred.',
                    'Please try again later or contact a system administrator.'
                )
            };
        }
    }
}

// Note: Removed obsolete createStripePortal() function
// Use createBillingPortalSession() instead

export async function createBillingPortalSession() {
    try {
        // ✅ SECURITY: Rate limit billing portal access (10 per hour)
        const rateLimitResult = await RateLimiters.billingPortal();
        if (!rateLimitResult.success) {
            throw new Error(
                `Too many billing portal requests. Please try again in ${Math.ceil((rateLimitResult.reset - Date.now() / 1000) / 60)} minutes.`
            );
        }

        const user = await currentUser()

        if (!user) {
            throw new Error("Unauthorized: No user session found")
        }

        // ✅ SECURITY: Use single() instead of maybeSingle() to ensure customer exists
        const { data: customer, error } = await supabaseAdmin
            .from("customers")
            .select("stripe_customer_id")
            .eq("id", user.id)
            .single()

        if (error) {
            console.error('Error fetching customer:', {
                userId: user.id,
                error: error.message
            });
            throw new Error("Customer not found. Please complete checkout first.")
        }

        // ✅ SECURITY: Validate stripe_customer_id exists before using it
        if (!customer?.stripe_customer_id) {
            throw new Error("No Stripe customer ID found. Please complete checkout first.")
        }

        // Create a billing portal session
        const session = await stripe.billingPortal.sessions.create({
            customer: customer.stripe_customer_id,
            return_url: getURL('/settings'),
        });

        if (!session?.url) {
            throw new Error("Failed to create billing portal session")
        }

        // ✅ SECURITY: Log billing portal access for audit trail
        await AuditLoggers.billingPortalAccessed();

        return session.url;
    } catch (error) {
        console.error('Error creating billing portal session:', {
            error: error instanceof Error ? error.message : 'Unknown error'
        });
        return {
            error: error instanceof Error
                ? error.message
                : "Error creating billing portal session"
        }
    }
}