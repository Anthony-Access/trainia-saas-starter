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

type Price = Tables<'prices'>;

export async function checkoutWithStripe(
    price: Price,
    redirectPath: string = '/',
    referralId?: string,
    referral?: string
) {
    try {
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