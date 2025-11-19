/**
 * Date and Time Utilities
 *
 * Helper functions for date/time manipulation and conversion.
 */

/**
 * Convert Unix timestamp (seconds) to JavaScript Date object
 *
 * @param secs - Unix timestamp in seconds
 * @returns JavaScript Date object
 *
 * @example
 * ```typescript
 * toDateTime(1609459200) // Date object for 2021-01-01 00:00:00 UTC
 * ```
 */
export const toDateTime = (secs: number) => {
  const t = new Date(+0); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

/**
 * Calculate trial end date as Unix timestamp
 *
 * Adds the specified trial period days (plus 1 day buffer) to the current date.
 * Returns undefined if trial period is less than 2 days.
 *
 * @param trialPeriodDays - Number of days in the trial period
 * @returns Unix timestamp in seconds, or undefined if invalid
 *
 * @example
 * ```typescript
 * calculateTrialEndUnixTimestamp(7) // Unix timestamp 8 days from now
 * calculateTrialEndUnixTimestamp(1) // undefined (too short)
 * calculateTrialEndUnixTimestamp(null) // undefined
 * ```
 */
export const calculateTrialEndUnixTimestamp = (
  trialPeriodDays: number | null | undefined
) => {
  // Check if trialPeriodDays is null, undefined, or less than 2 days
  if (
    trialPeriodDays === null ||
    trialPeriodDays === undefined ||
    trialPeriodDays < 2
  ) {
    return undefined;
  }

  const currentDate = new Date(); // Current date and time
  const trialEnd = new Date(
    currentDate.getTime() + (trialPeriodDays + 1) * 24 * 60 * 60 * 1000
  ); // Add trial days
  return Math.floor(trialEnd.getTime() / 1000); // Convert to Unix timestamp in seconds
};
