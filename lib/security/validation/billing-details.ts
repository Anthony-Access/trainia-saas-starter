/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { SecurityLogger } from '@/lib/security/monitoring/security-logger';

// Schéma de validation pour le téléphone
const PhoneSchema = z.string()
    .min(10)
    .max(20)
    .regex(/^[+\d\s()-]+$/, 'Invalid phone format');

// Schéma pour l'adresse
const AddressSchema = z.object({
    line1: z.string().min(1).max(200),
    line2: z.string().max(200).optional().nullable(),
    city: z.string().min(1).max(100),
    state: z.string().max(100).optional().nullable(),
    postal_code: z.string().min(1).max(20),
    country: z.string().length(2).regex(/^[A-Z]{2}$/, 'Country must be ISO 3166-1 alpha-2')
});

// Schéma complet
const BillingDetailsSchema = z.object({
    name: z.string().min(1).max(200),
    phone: PhoneSchema,
    address: AddressSchema
});

/**
 * Valide et sanitise les billing details
 */
export function validateBillingDetails(details: any): {
    name: string;
    phone: string;
    address: any;
} | null {
    try {
        const validated = BillingDetailsSchema.parse(details);

        // Sanitiser le nom (retirer HTML et caractères dangereux)
        const sanitizedName = validated.name
            .replace(/<[^>]*>/g, '') // Retirer HTML
            .replace(/[^\w\s.-]/g, '') // Ne garder que alphanum, espaces, points, tirets
            .trim();

        return {
            name: sanitizedName,
            phone: validated.phone,
            address: validated.address
        };
    } catch (error) {
        console.error('❌ Invalid billing details:', error);

        SecurityLogger.logSuspiciousActivity({
            ip: 'stripe-webhook',
            activity: 'INVALID_BILLING_DETAILS',
            details: {
                error: error instanceof Error ? error.message : 'Unknown error',
                providedDetails: JSON.stringify(details).substring(0, 200)
            },
            path: '/api/webhooks',
        });

        return null;
    }
}
