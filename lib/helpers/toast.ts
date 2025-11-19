/**
 * Toast and Redirect Utilities
 *
 * Helper functions for generating redirect URLs with toast messages.
 * Used for displaying success/error messages after form submissions or redirects.
 */

import type { Tables } from '@/types/database.types';

type Price = Tables<'prices'>;

/**
 * Send POST request with JSON data
 *
 * @param url - API endpoint URL
 * @param data - Data to send (optional)
 * @returns JSON response
 *
 * @example
 * ```typescript
 * const result = await postData({
 *   url: '/api/create-checkout',
 *   data: { price: priceObject }
 * });
 * ```
 */
export const postData = async ({
  url,
  data
}: {
  url: string;
  data?: { price: Price };
}) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify(data)
  });

  return res.json();
};

const toastKeyMap: { [key: string]: string[] } = {
  status: ['status', 'status_description'],
  error: ['error', 'error_description']
};

/**
 * Generate a redirect URL with toast parameters
 *
 * Internal helper function used by getStatusRedirect and getErrorRedirect.
 *
 * @param path - Base path to redirect to
 * @param toastType - Type of toast ('status' or 'error')
 * @param toastName - Toast title/name
 * @param toastDescription - Toast description (optional)
 * @param disableButton - Whether to disable buttons after redirect
 * @param arbitraryParams - Additional query parameters
 * @returns Redirect URL with query parameters
 */
const getToastRedirect = (
  path: string,
  toastType: string,
  toastName: string,
  toastDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
): string => {
  const [nameKey, descriptionKey] = toastKeyMap[toastType];

  let redirectPath = `${path}?${nameKey}=${encodeURIComponent(toastName)}`;

  if (toastDescription) {
    redirectPath += `&${descriptionKey}=${encodeURIComponent(toastDescription)}`;
  }

  if (disableButton) {
    redirectPath += `&disable_button=true`;
  }

  if (arbitraryParams) {
    redirectPath += `&${arbitraryParams}`;
  }

  return redirectPath;
};

/**
 * Generate a redirect URL with a success status message
 *
 * @param path - Base path to redirect to
 * @param statusName - Status message title
 * @param statusDescription - Status message description (optional)
 * @param disableButton - Whether to disable buttons after redirect
 * @param arbitraryParams - Additional query parameters
 * @returns Redirect URL with status query parameters
 *
 * @example
 * ```typescript
 * getStatusRedirect('/account', 'Success', 'Your account has been updated')
 * // Returns: "/account?status=Success&status_description=Your%20account%20has%20been%20updated"
 * ```
 */
export const getStatusRedirect = (
  path: string,
  statusName: string,
  statusDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
) =>
  getToastRedirect(
    path,
    'status',
    statusName,
    statusDescription,
    disableButton,
    arbitraryParams
  );

/**
 * Generate a redirect URL with an error message
 *
 * @param path - Base path to redirect to
 * @param errorName - Error message title
 * @param errorDescription - Error message description (optional)
 * @param disableButton - Whether to disable buttons after redirect
 * @param arbitraryParams - Additional query parameters
 * @returns Redirect URL with error query parameters
 *
 * @example
 * ```typescript
 * getErrorRedirect('/signin', 'Authentication Failed', 'Invalid credentials')
 * // Returns: "/signin?error=Authentication%20Failed&error_description=Invalid%20credentials"
 * ```
 */
export const getErrorRedirect = (
  path: string,
  errorName: string,
  errorDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
) =>
  getToastRedirect(
    path,
    'error',
    errorName,
    errorDescription,
    disableButton,
    arbitraryParams
  );
