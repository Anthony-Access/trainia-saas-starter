/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { SecurityLogger } from '@/lib/security/monitoring/security-logger';

/**
 * Schéma de validation pour les metadata Stripe
 * Empêche l'injection de contenu malveillant (XSS, injection)
 */
export const MetadataSchema = z.record(
    z.string().max(100), // Keys: max 100 caractères
    z.string().max(5000) // Values: max 5000 caractères
).refine(
    (metadata) => {
        // Patterns dangereux à détecter
        const dangerousPatterns = [
            /<script/i,           // Scripts XSS
            /javascript:/i,       // Javascript dans href
            /on\w+=/i,           // Event handlers
            /<iframe/i,          // iframes
            /eval\(/i,           // eval calls
            /expression\(/i,     // CSS expressions
        ];

        const allValues = Object.values(metadata).join(' ');
        return !dangerousPatterns.some(pattern => pattern.test(allValues));
    },
    { message: 'Metadata contains potentially malicious content' }
);

/**
 * Valide et sanitise les metadata Stripe
 * Retourne un objet vide en cas d'échec (fail-safe)
 */
export function validateStripeMetadata(
    metadata: any,
    context: { source: string; id: string }
): Record<string, string> {
    try {
        return MetadataSchema.parse(metadata);
    } catch (error) {
        console.error('❌ Invalid Stripe metadata:', {
            context,
            error: error instanceof Error ? error.message : 'Unknown error',
            metadata: JSON.stringify(metadata).substring(0, 200)
        });

        SecurityLogger.logSuspiciousActivity({
            ip: 'stripe-webhook',
            activity: 'INVALID_STRIPE_METADATA',
            details: {
                ...context,
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            path: '/api/webhooks',
        });

        // Fail-safe: retourner un objet vide plutôt que d'injecter du contenu malveillant
        return {};
    }
}

/**
 * Sanitise un string pour affichage (retire tout HTML)
 */
export function sanitizeForDisplay(value: string): string {
    return value
        .replace(/<[^>]*>/g, '') // Retirer toutes les balises HTML
        .replace(/javascript:/gi, '') // Retirer javascript:
        .replace(/on\w+=/gi, '') // Retirer les event handlers
        .trim();
}
