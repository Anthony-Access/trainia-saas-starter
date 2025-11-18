/**
 * IDOR (Insecure Direct Object Reference) Security Test Suite
 *
 * This script tests if users can access or modify data belonging to other users.
 * Run this in your browser's DevTools Console while logged in as different users.
 *
 * IMPORTANT: You need to have the Supabase client initialized in your app
 * for these tests to work. Run them from your app's frontend (e.g., dashboard page).
 *
 * SETUP:
 * 1. Create 2 test accounts (User A and User B)
 * 2. Log in as User A
 * 3. Open DevTools Console (F12)
 * 4. Copy and paste this entire script
 * 5. Run: await runIDORTests()
 */

/**
 * IDOR Test Configuration
 * Replace these with actual IDs from your database
 */
const IDOR_TEST_CONFIG = {
  // User B's customer ID (get this from Supabase dashboard or User B's session)
  userB_customerId: 'user_2xxxxxxxxxxxxx',  // ⚠️ REPLACE THIS

  // User B's subscription ID (if exists)
  userB_subscriptionId: 'sub_xxxxxxxxxxxxx',  // ⚠️ REPLACE THIS

  // Test limits
  timeout: 5000  // 5 second timeout per test
};

/**
 * Test Results Tracker
 */
const testResults = {
  passed: 0,
  failed: 0,
  critical: 0,
  tests: []
};

/**
 * Log test result
 */
function logTest(testName, passed, severity, details) {
  const result = {
    test: testName,
    passed,
    severity, // 'low', 'medium', 'high', 'critical'
    details,
    timestamp: new Date().toISOString()
  };

  testResults.tests.push(result);

  if (passed) {
    testResults.passed++;
    console.log(`✅ PASS: ${testName}`);
  } else {
    testResults.failed++;
    if (severity === 'critical') testResults.critical++;
    console.error(`❌ FAIL: ${testName} [${severity.toUpperCase()}]`);
    console.error(`   Details: ${details}`);
  }
}

/**
 * TEST 1: Access another user's customer data
 */
async function testCustomerAccess() {
  console.log('\n🧪 TEST 1: Customer Data Access Control');

  try {
    // Get Supabase client from window (injected by your app)
    if (typeof window.supabase === 'undefined') {
      throw new Error('Supabase client not found. Make sure you are on a page with Supabase initialized.');
    }

    const { data, error } = await window.supabase
      .from('customers')
      .select('*')
      .eq('id', IDOR_TEST_CONFIG.userB_customerId);

    if (error) {
      logTest('Customer Access - Error Response', true, 'low', 'Query returned error as expected');
      return;
    }

    if (data && data.length > 0) {
      logTest(
        'Customer Access - IDOR Vulnerability Found',
        false,
        'critical',
        `Can access User B's customer data! Retrieved ${data.length} record(s). This is a CRITICAL security issue.`
      );
    } else {
      logTest('Customer Access - RLS Working', true, 'low', 'RLS correctly prevented access to other user data');
    }
  } catch (err) {
    logTest('Customer Access - Exception', true, 'low', `Exception thrown: ${err.message}`);
  }
}

/**
 * TEST 2: Modify another user's subscription
 */
async function testSubscriptionModification() {
  console.log('\n🧪 TEST 2: Subscription Modification Control');

  try {
    const { data, error } = await window.supabase
      .from('subscriptions')
      .update({ status: 'canceled' })
      .eq('id', IDOR_TEST_CONFIG.userB_subscriptionId);

    if (error) {
      logTest('Subscription Modification - Error Response', true, 'low', 'Update returned error as expected');
      return;
    }

    if (data && data.length > 0) {
      logTest(
        'Subscription Modification - IDOR Vulnerability Found',
        false,
        'critical',
        `Can modify User B's subscription! This is a CRITICAL security issue. Reverting changes recommended.`
      );
    } else {
      logTest('Subscription Modification - RLS Working', true, 'low', 'RLS correctly prevented modification');
    }
  } catch (err) {
    logTest('Subscription Modification - Exception', true, 'low', `Exception thrown: ${err.message}`);
  }
}

/**
 * TEST 3: Access another user's subscription data
 */
async function testSubscriptionAccess() {
  console.log('\n🧪 TEST 3: Subscription Data Access Control');

  try {
    const { data, error } = await window.supabase
      .from('subscriptions')
      .select('*')
      .eq('id', IDOR_TEST_CONFIG.userB_subscriptionId);

    if (error) {
      logTest('Subscription Access - Error Response', true, 'low', 'Query returned error as expected');
      return;
    }

    if (data && data.length > 0) {
      logTest(
        'Subscription Access - IDOR Vulnerability Found',
        false,
        'critical',
        `Can access User B's subscription data! Retrieved ${data.length} record(s).`
      );
    } else {
      logTest('Subscription Access - RLS Working', true, 'low', 'RLS correctly prevented access');
    }
  } catch (err) {
    logTest('Subscription Access - Exception', true, 'low', `Exception thrown: ${err.message}`);
  }
}

/**
 * TEST 4: Access all customers (should only see own)
 */
async function testCustomerEnumeration() {
  console.log('\n🧪 TEST 4: Customer Enumeration Control');

  try {
    const { data, error } = await window.supabase
      .from('customers')
      .select('id, stripe_customer_id')
      .limit(100);

    if (error) {
      logTest('Customer Enumeration - Error Response', true, 'low', 'Query returned error');
      return;
    }

    if (data && data.length > 1) {
      logTest(
        'Customer Enumeration - Multiple Records Accessible',
        false,
        'high',
        `Can access ${data.length} customer records. Should only see own record.`
      );
    } else if (data && data.length === 1) {
      logTest('Customer Enumeration - Only Own Record', true, 'low', 'Can only access own customer record');
    } else {
      logTest('Customer Enumeration - No Records', true, 'low', 'No records accessible (might not have created customer yet)');
    }
  } catch (err) {
    logTest('Customer Enumeration - Exception', true, 'low', `Exception thrown: ${err.message}`);
  }
}

/**
 * TEST 5: Access all subscriptions (should only see own)
 */
async function testSubscriptionEnumeration() {
  console.log('\n🧪 TEST 5: Subscription Enumeration Control');

  try {
    const { data, error } = await window.supabase
      .from('subscriptions')
      .select('id, user_id, status')
      .limit(100);

    if (error) {
      logTest('Subscription Enumeration - Error Response', true, 'low', 'Query returned error');
      return;
    }

    if (data && data.length > 1) {
      logTest(
        'Subscription Enumeration - Multiple Records Accessible',
        false,
        'high',
        `Can access ${data.length} subscription records. Should only see own records.`
      );
    } else if (data && data.length === 1) {
      logTest('Subscription Enumeration - Only Own Record', true, 'low', 'Can only access own subscription');
    } else {
      logTest('Subscription Enumeration - No Records', true, 'low', 'No records accessible (might not have subscription yet)');
    }
  } catch (err) {
    logTest('Subscription Enumeration - Exception', true, 'low', `Exception thrown: ${err.message}`);
  }
}

/**
 * TEST 6: Delete another user's customer record
 */
async function testCustomerDeletion() {
  console.log('\n🧪 TEST 6: Customer Deletion Control');

  try {
    const { data, error } = await window.supabase
      .from('customers')
      .delete()
      .eq('id', IDOR_TEST_CONFIG.userB_customerId);

    if (error) {
      logTest('Customer Deletion - Error Response', true, 'low', 'Delete returned error as expected');
      return;
    }

    if (data && data.length > 0) {
      logTest(
        'Customer Deletion - IDOR Vulnerability Found',
        false,
        'critical',
        `Can delete User B's customer record! This is a CRITICAL security issue.`
      );
    } else {
      logTest('Customer Deletion - RLS Working', true, 'low', 'RLS correctly prevented deletion');
    }
  } catch (err) {
    logTest('Customer Deletion - Exception', true, 'low', `Exception thrown: ${err.message}`);
  }
}

/**
 * Print final test results
 */
function printResults() {
  console.log('\n' + '='.repeat(60));
  console.log('🔒 IDOR SECURITY TEST RESULTS');
  console.log('='.repeat(60));
  console.log(`Total Tests: ${testResults.tests.length}`);
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`🔴 Critical Issues: ${testResults.critical}`);
  console.log('='.repeat(60));

  if (testResults.critical > 0) {
    console.error('\n⚠️  CRITICAL VULNERABILITIES FOUND!');
    console.error('Your application has IDOR vulnerabilities that must be fixed immediately.');
    console.error('Users can access or modify data belonging to other users.');
    console.error('\nFailed Tests:');
    testResults.tests
      .filter(t => !t.passed)
      .forEach(t => {
        console.error(`  - ${t.test} [${t.severity}]: ${t.details}`);
      });
  } else if (testResults.failed > 0) {
    console.warn('\n⚠️  Some tests failed, but no critical issues found.');
    console.warn('Review the failed tests to ensure proper security.');
  } else {
    console.log('\n✅ All security tests passed!');
    console.log('Your RLS policies appear to be working correctly.');
  }

  console.log('\n📋 Detailed Results:');
  console.table(testResults.tests);

  return testResults;
}

/**
 * Run all IDOR tests
 */
async function runIDORTests() {
  console.clear();
  console.log('🔒 Starting IDOR Security Tests...\n');
  console.log('⚠️  Make sure you have updated IDOR_TEST_CONFIG with actual IDs!\n');

  // Reset results
  testResults.passed = 0;
  testResults.failed = 0;
  testResults.critical = 0;
  testResults.tests = [];

  // Run all tests
  await testCustomerAccess();
  await testSubscriptionModification();
  await testSubscriptionAccess();
  await testCustomerEnumeration();
  await testSubscriptionEnumeration();
  await testCustomerDeletion();

  // Print results
  return printResults();
}

/**
 * Quick test (most important tests only)
 */
async function runQuickIDORTest() {
  console.clear();
  console.log('🔒 Starting Quick IDOR Security Tests...\n');

  testResults.passed = 0;
  testResults.failed = 0;
  testResults.critical = 0;
  testResults.tests = [];

  await testCustomerAccess();
  await testSubscriptionAccess();
  await testSubscriptionModification();

  return printResults();
}

// Export functions for manual testing
window.runIDORTests = runIDORTests;
window.runQuickIDORTest = runQuickIDORTest;

console.log('✅ IDOR test suite loaded!');
console.log('\nUsage:');
console.log('  1. Update IDOR_TEST_CONFIG with User B\'s IDs');
console.log('  2. Run: await runIDORTests()');
console.log('  3. Or run quick test: await runQuickIDORTest()');
console.log('\nAvailable functions:');
console.log('  - runIDORTests()       - Run all tests');
console.log('  - runQuickIDORTest()   - Run critical tests only');
