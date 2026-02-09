// Improved Twitter login and follow script based on current selectors (2024/2025)
// Run with: node twitter_login_follow_fixed.js
// Browser stays open for manual 2FA/phone verification if prompted.

const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Launching Chromium browser (headed, slowMo for visibility)...');
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1500,
  });
  const context = await browser.newContext({
    viewport: { width: 1400, height: 1000 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  const username = '@synthengineers';
  const password = 'Team21550u!';
  const profiles = ['karpathy', 'steipete', 'gregisenberg', 'rileybrown', 'corbin_braun', 'jackfriks', 'levelsio', 'marclou', 'EXM7777', 'eptwts', 'godofprompt', 'vasuman', 'AmirMushich', '0xROAS', 'egeberkina', 'MengTo', 'rryssf_', 'kloss_xyz', 'emollick', 'Hesamation'];

  try {
    // Step 1: Go to login
    console.log('\\n📱 Step 1: Loading https://x.com/login');
    await page.goto('https://x.com/login', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.screenshot({ path: 'screenshot_01_login_page.png', fullPage: true });
    console.log('📸 Saved: screenshot_01_login_page.png');

    // Skip if already logged in
    if (page.url().includes('home')) {
      console.log('✅ Already logged in (on home page)');
    } else {
      // Step 2: Username input
      console.log('\\n👤 Step 2: Entering username...');
      await page.waitForSelector('input[data-testid="login-text-input"], input[name="text"], input[autocomplete="username"]', { timeout: 10000 });
      await page.fill('input[data-testid="login-text-input"], input[name="text"]', username);
      await page.screenshot({ path: 'screenshot_02_username.png', fullPage: true });
      
      // Next button
      await page.click('[data-testid="LoginForm_NextButton"], button:has-text("Next")', { timeout: 5000 });
      await page.waitForTimeout(2500);

      // Step 3: Password
      console.log('\\n🔑 Step 3: Entering password...');
      await page.waitForSelector('input[data-testid="ocf-password-input"], input[type="password"], input[name="password"]', { timeout: 10000 });
      await page.fill('input[data-testid="ocf-password-input"], input[type="password"]', password);
      await page.screenshot({ path: 'screenshot_03_password.png', fullPage: true });

      // Login button
      await page.click('[data-testid="LoginForm_LoginButton"], button:has-text("Log in")', { timeout: 5000 });
      await page.waitForTimeout(4000);

      // Step 4: 2FA / Verification wait (MANUAL INTERVENTION)
      console.log('\\n🛡️ Step 4: Checking for 2FA/phone/email verification...');
      console.log('   👀 BROWSER IS OPEN - If prompted for code/phone/email, ENTER IT MANUALLY NOW!');
      console.log('   Waiting 90 seconds for potential manual input...');
      await page.screenshot({ path: 'screenshot_04_verification.png', fullPage: true });
      await page.waitForTimeout(90000);  // 1.5 min pause

      // Wait for successful login (home or dashboard)
      await page.waitForURL(/\/home|\/explore|\/i\/home/, { timeout: 20000 });
      console.log('✅ Login successful!');
    }

    // Step 5: Home page screenshot
    await page.screenshot({ path: 'screenshot_05_home.png', fullPage: true });
    console.log('📸 Saved: screenshot_05_home.png');

    // Step 6: Follow loop
    console.log('\\n🎯 Step 6: Following profiles...');
    const newlyFollowed = [];
    const alreadyFollowing = [];
    const errors = [];

    for (let i = 0; i < profiles.length; i++) {
      const handle = profiles[i];
      console.log(`   ${i+1}/20: @${handle}`);
      
      await page.goto(`https://x.com/${handle}`, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: `profile_${handle.replace(/[^a-zA-Z0-9]/g, '_')}.png`, fullPage: true });

      try {
        // Look for follow button
        const followLocator = page.locator('[data-testid="follow"], [aria-label*="Follow"], button[role="button"]:has-text("Follow")');
        if (await followLocator.isVisible({ timeout: 8000 })) {
          const text = await followLocator.textContent();
          if (text && /follow/i.test(text)) {
            console.log(`      ➕ Clicking "Follow" for @${handle}`);
            await followLocator.first().click();
            await page.waitForTimeout(4000);  // Wait for follow confirmation
            newlyFollowed.push(handle);
            console.log(`      ✅ NEW FOLLOW: @${handle}`);
          } else {
            alreadyFollowing.push(handle);
            console.log(`      ℹ️ Button present but not "Follow" (maybe following): @${handle}`);
          }
        } else {
          // Check unfollow
          const unfollowLocator = page.locator('[data-testid="unfollow"], [aria-label*="Unfollow"], button: has-text("Following")');
          if (await unfollowLocator.isVisible({ timeout: 3000 })) {
            alreadyFollowing.push(handle);
            console.log(`      ✅ ALREADY FOLLOWING: @${handle}`);
          } else {
            console.log(`      ❓ Follow status unclear for @${handle}`);
          }
        }
      } catch (e) {
        errors.push(handle);
        console.log(`      ❌ Error with @${handle}: ${e.message}`);
      }
    }

    // Final summary
    console.log('\\n=== TASK COMPLETE! ===');
    console.log(`✅ Newly followed: ${newlyFollowed.length} (${newlyFollowed.join(', ')})`);
    console.log(`✅ Already following: ${alreadyFollowing.length} (${alreadyFollowing.join(', ')})`);
    console.log(`❌ Errors: ${errors.length} (${errors.join(', ')})`);
    console.log('\\n📂 All screenshots saved to workspace.');
    console.log('🌐 Browser left OPEN for manual verification/inspection.');

  } catch (error) {
    console.error('\\n💥 ERROR:', error.message);
    await page.screenshot({ path: 'screenshot_error.png', fullPage: true });
  } finally {
    // Do NOT close browser - keep open
    console.log('\\n👋 Script finished. Close browser manually when done.');
  }
})();
