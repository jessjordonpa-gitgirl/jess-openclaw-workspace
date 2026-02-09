const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false, 
    slowMo: 1000,
    args: ['--start-maximized', '--disable-blink-features=AutomationControlled']
  });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error.message));
  page.on('dialog', async dialog => {
    console.log('DIALOG:', dialog.message());
    await dialog.accept();
  });

  console.log('🚀 Starting Twitter login and follows... Headed browser launched.');

  // Block images to speed up
  await page.route('**/*.{png,jpg,jpeg,gif,svg,webp}', route => route.abort());

  // Step 1: Navigate to login
  console.log('📱 Navigating to https://x.com/login');
  await page.goto('https://x.com/login', { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: 'twitter-v2-login.png', fullPage: true });
  console.log('✅ Screenshot: twitter-v2-login.png');

  // Step 2: Enter phone number
  console.log('📝 Entering phone: +44 7537 166663');
  await page.getByTestId('LoginForm_UsernameOrEmail').fill('+44 7537 166663');
  await page.screenshot({ path: 'twitter-v2-username.png', fullPage: true });
  console.log('✅ Screenshot: twitter-v2-username.png');

  // Step 3: Click Next
  console.log('➡️ Clicking Next');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(4000);
  await page.screenshot({ path: 'twitter-v2-after-username.png', fullPage: true });
  console.log('✅ Screenshot: twitter-v2-after-username.png');

  // Step 4: Enter password
  console.log('🔑 Entering password');
  await page.getByTestId('LoginForm_Password').fill('Saltwater68!!');
  await page.screenshot({ path: 'twitter-v2-password.png', fullPage: true });
  console.log('✅ Screenshot: twitter-v2-password.png');

  // Step 5: Click Log in
  console.log('🚀 Clicking Log in');
  await page.getByTestId('LoginForm_Login_Button').click();
  await page.waitForTimeout(10000);

  // Wait for successful login
  try {
    await page.waitForSelector('[data-testid="AppTabBar_Home_Link"], [data-testid="primaryColumn"]', { timeout: 30000 });
    console.log('✅ Logged in successfully!');
    await page.screenshot({ path: 'twitter-v2-logged-in.png', fullPage: true });
  } catch (e) {
    console.log('⚠️ Login check failed - possible 2FA/captcha/manual needed. Screenshot taken.');
    await page.screenshot({ path: 'twitter-v2-login-issue.png', fullPage: true });
  }

  // Profiles to follow
  const profiles = [
    'karpathy', 'steipete', 'gregisenberg', 'rileybrown', 'corbin_braun',
    'jackfriks', 'levelsio', 'marclou', 'EXM7777', 'eptwts',
    'godofprompt', 'vasuman', 'AmirMushich', '0xROAS', 'egeberkina',
    'MengTo', 'rryssf_', 'kloss_xyz', 'emollick', 'Hesamation'
  ];

  const followed = [];
  const alreadyFollowing = [];
  const skipped = [];

  for (let i = 0; i < profiles.length; i++) {
    const profile = profiles[i];
    try {
      console.log(`\\n👤 [${i+1}/20] Visiting https://x.com/${profile}`);
      await page.goto(`https://x.com/${profile}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(3000);

      // Wait for profile header
      await page.waitForSelector('[data-testid="UserName"]', { timeout: 10000 });

      await page.screenshot({ path: `twitter-v2-profile-${profile}.png`, fullPage: true });
      console.log(`✅ Profile screenshot: twitter-v2-profile-${profile}.png`);

      // Look for Follow button
      const followBtn = page.getByRole('button', { name: 'Follow', exact: true });
      if (await followBtn.count() === 1) {
        console.log(`👍 Clicking Follow for @${profile}`);
        await followBtn.click();
        await page.waitForTimeout(3000);
        // Check if it changed to Following
        const followingBtn = page.getByRole('button', { name: 'Following', exact: true });
        if (await followingBtn.count() === 1) {
          followed.push(profile);
        } else {
          skipped.push(profile);
        }
      } else {
        const followingBtn = page.getByRole('button', { name: 'Following', exact: true });
        if (await followingBtn.count() === 1) {
          console.log(`ℹ️ Already following @${profile}`);
          alreadyFollowing.push(profile);
        } else {
          console.log(`❓ No follow/following button for @${profile} (private/blocked/etc)`);
          skipped.push(profile);
        }
      }
    } catch (err) {
      console.error(`💥 Error with @${profile}: ${err.message}`);
      skipped.push(profile);
    }
  }

  console.log('\\n' + '='.repeat(60));
  console.log('📊 FINAL SUMMARY:');
  console.log(`✅ Newly followed: ${followed.length} (${followed.join(', ') || 'none'})`);
  console.log(`ℹ️ Already following: ${alreadyFollowing.length} (${alreadyFollowing.join(', ') || 'none'})`);
  console.log(`⏭️ Skipped/Errors: ${skipped.length} (${skipped.join(', ') || 'none'})`);
  console.log('📸 Final screenshot: twitter-v2-final.png');
  await page.screenshot({ path: 'twitter-v2-final.png', fullPage: true });
  console.log('Browser kept open for verification. Close manually.');
  console.log('='.repeat(60));

  // Keep open
})();
