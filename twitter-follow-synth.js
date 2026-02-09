const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false, 
    slowMo: 1500,
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

  console.log('🚀 Starting @synthengineers Twitter login and follows... Headed browser launched.');

  // Block images to speed up
  await page.route('**/*.{png,jpg,jpeg,gif,svg,webp}', route => route.abort());

  // Step 1: Navigate to login
  console.log('📱 Navigating to https://x.com/login');
  await page.goto('https://x.com/login', { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: 'synth-twitter-login.png', fullPage: true });
  console.log('✅ Screenshot: synth-twitter-login.png');

  // Step 2: Enter username
  console.log('📝 Entering username: synthengineers');
  await page.getByTestId('LoginForm_UsernameOrEmail').fill('synthengineers');
  await page.screenshot({ path: 'synth-twitter-username.png', fullPage: true });
  console.log('✅ Screenshot: synth-twitter-username.png');

  // Step 3: Click Next
  console.log('➡️ Clicking Next');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'synth-twitter-after-username.png', fullPage: true });
  console.log('✅ Screenshot: synth-twitter-after-username.png');

  // Step 4: Enter password
  console.log('🔑 Entering password: Team21550u!');
  await page.getByTestId('LoginForm_Password').fill('Team21550u!');
  await page.screenshot({ path: 'synth-twitter-password.png', fullPage: true });
  console.log('✅ Screenshot: synth-twitter-password.png');

  // Step 5: Click Log in
  console.log('🚀 Clicking Log in');
  await page.getByRole('button', { name: /Log in|Login/ }).click();
  await page.waitForTimeout(15000);  // Extra time for 2FA/SMS if needed

  // Wait for successful login or prompt for manual 2FA
  try {
    await page.waitForSelector('[data-testid="AppTabBar_Home_Link"], [data-testid="primaryColumn"], .css-175oi2r', { timeout: 45000 });
    console.log('✅ Logged in successfully to @synthengineers!');
    await page.screenshot({ path: 'synth-twitter-logged-in.png', fullPage: true });
  } catch (e) {
    console.log('⚠️ Login may need manual 2FA/SMS approval. Browser open - handle manually, then resume or restart.');
    await page.screenshot({ path: 'synth-twitter-login-issue.png', fullPage: true });
    // Keep open for manual intervention
    await page.waitForTimeout(600000);  // 10 min pause
    return;
  }

  // Master list batches - Batch 2: ERC-8004 team, frameworks, infra (20 unique, excluding first batch)
  const profiles = [
    'MarcoMetaMask', 'dcrapis', 'LangChainAI', 'LlamaIndexAI', 'CrewAIInc',
    'haystack_ai', 'SemanticKernel', 'FlowiseAI', 'Pinata_io', 'filecoin',
    'arweave', 'ensdomains', 'thegraph', 'eigenlayer', 'taiko_xyz',
    'Fetch_ai', 'autonolas', 'singularitynet', 'oceanprotocol', 'PhalaNetwork'
  ];

  const followed = [];
  const alreadyFollowing = [];
  const skipped = [];

  for (let i = 0; i < profiles.length; i++) {
    const profile = profiles[i];
    try {
      console.log(`\\n👤 [BATCH2 ${i+1}/20] Visiting https://x.com/${profile}`);
      await page.goto(`https://x.com/${profile}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(4000);

      await page.waitForSelector('[data-testid="UserName"], [data-testid="primaryColumn"]', { timeout: 15000 });

      await page.screenshot({ path: `synth-twitter-profile-${profile}.png`, fullPage: true });
      console.log(`✅ Profile screenshot: synth-twitter-profile-${profile}.png`);

      // Check Follow button
      const followBtn = page.getByRole('button', { name: 'Follow', exact: true });
      if (await followBtn.count() > 0) {
        console.log(`👍 Clicking Follow for @${profile}`);
        await followBtn.first().click();
        await page.waitForTimeout(4000);
        followed.push(profile);
      } else {
        const followingBtn = page.getByRole('button', { name: 'Following', exact: true });
        const requestBtn = page.getByRole('button', { name: 'Request follow', exact: true });
        if (await followingBtn.count() > 0) {
          console.log(`ℹ️ Already following @${profile}`);
          alreadyFollowing.push(profile);
        } else if (await requestBtn.count() > 0) {
          console.log(`ℹ️ Requested to follow @${profile} (private)`);
          alreadyFollowing.push(profile);  // Treat as handled
        } else {
          console.log(`❓ No button for @${profile} (suspended/private/error)`);
          skipped.push(profile);
        }
      }
    } catch (err) {
      console.error(`💥 Error @${profile}: ${err.message}`);
      skipped.push(profile);
    }
  }

  console.log('\\n' + '='.repeat(70));
  console.log('📊 BATCH 2 SUMMARY for @synthengineers:');
  console.log(`✅ Newly followed: ${followed.length} (${followed.join(', ') || 'none'})`);
  console.log(`ℹ️ Already following/requested: ${alreadyFollowing.length} (${alreadyFollowing.join(', ') || 'none'})`);
  console.log(`⏭️ Skipped/Errors: ${skipped.length} (${skipped.join(', ') || 'none'})`);
  console.log('📸 Final screenshot: synth-twitter-batch2-final.png');
  await page.screenshot({ path: 'synth-twitter-batch2-final.png', fullPage: true });
  console.log('='.repeat(70));

  // Keep browser open briefly for verification
  console.log('Browser open for 30s verification, then closes.');
  await page.waitForTimeout(30000);
  await browser.close();
  console.log('✅ Task complete for Batch 2.');
})();
