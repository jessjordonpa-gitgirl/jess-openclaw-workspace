const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false, 
    slowMo: 1000,
    args: ['--start-maximized']
  });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error.message));

  console.log('🚀 Starting Twitter login and follows... Headed browser launched.');

  // Step 1: Navigate to login
  console.log('📱 Navigating to https://x.com/login');
  await page.goto('https://x.com/login', { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: 'twitter-login.png', fullPage: true });
  console.log('✅ Screenshot: twitter-login.png');

  // Step 2: Enter phone number
  console.log('📝 Entering phone: +44 7537 166663');
  const usernameField = page.getByRole('textbox', { name: 'Phone, email or @username' });
  await usernameField.fill('+44 7537 166663');
  await page.screenshot({ path: 'twitter-username.png', fullPage: true });
  console.log('✅ Screenshot: twitter-username.png');

  // Step 3: Click Next
  console.log('➡️ Clicking Next');
  const nextBtn = page.getByRole('button', { name: 'Next' });
  await nextBtn.click();
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'twitter-after-username.png', fullPage: true });
  console.log('✅ Screenshot: twitter-after-username.png');

  // Step 4: Enter password
  console.log('🔑 Entering password: Saltwater68!!');
  const passwordField = page.getByRole('textbox', { name: 'Password' });
  await passwordField.fill('Saltwater68!!');
  await page.screenshot({ path: 'twitter-password.png', fullPage: true });
  console.log('✅ Screenshot: twitter-password.png');

  // Step 5: Click Log in
  console.log('🚀 Clicking Log in');
  const loginBtn = page.getByRole('button', { name: 'Log in' });
  await loginBtn.click();
  await page.waitForTimeout(5000); // Allow login to process

  // Wait for successful login (home or profile)
  try {
    await page.waitForURL(/home|\/i\/(home|user\/)/, { timeout: 30000 });
    console.log('✅ Logged in successfully!');
    await page.screenshot({ path: 'twitter-logged-in.png', fullPage: true });
  } catch (e) {
    console.log('⚠️ Login might need manual intervention (2FA/captcha). Check browser.');
    await page.screenshot({ path: 'twitter-login-issue.png', fullPage: true });
  }

  // List of profiles
  const profiles = [
    'karpathy', 'steipete', 'gregisenberg', 'rileybrown', 'corbin_braun',
    'jackfriks', 'levelsio', 'marclou', 'EXM7777', 'eptwts',
    'godofprompt', 'vasuman', 'AmirMushich', '0xROAS', 'egeberkina',
    'MengTo', 'rryssf_', 'kloss_xyz', 'emollick', 'Hesamation'
  ];

  const followed = [];
  const alreadyFollowing = [];
  const errors = [];

  for (const profile of profiles) {
    try {
      console.log(`\\n👤 Visiting @${profile}`);
      await page.goto(`https://x.com/${profile}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: `twitter-profile-${profile}.png`, fullPage: true });
      console.log(`✅ Profile screenshot: twitter-profile-${profile}.png`);

      // Check for Follow button
      const followButton = page.getByRole('button', { name: 'Follow', exact: true });
      if (await followButton.count() > 0) {
        console.log(`👍 Following @${profile}`);
        await followButton.click();
        await page.waitForTimeout(2000);
        followed.push(profile);
      } else {
        // Check if Following
        const followingButton = page.getByRole('button', { name: 'Following', exact: true });
        if (await followingButton.count() > 0) {
          console.log(`ℹ️ Already following @${profile}`);
          alreadyFollowing.push(profile);
        } else {
          console.log(`❓ No follow button found for @${profile} (private/protected?)`);
          errors.push(profile);
        }
      }
    } catch (err) {
      console.error(`💥 Error with @${profile}:`, err.message);
      errors.push(profile);
    }
  }

  console.log('\\n📊 SUMMARY:');
  console.log('✅ Newly followed:', followed.join(', ') || 'None');
  console.log('ℹ️ Already following:', alreadyFollowing.join(', ') || 'None');
  console.log('❌ Errors/Skipped:', errors.join(', ') || 'None');
  console.log('\\nBrowser remains open for verification. Close manually when done.');

  // Do not close browser automatically for verification
  // await browser.close();
})();
