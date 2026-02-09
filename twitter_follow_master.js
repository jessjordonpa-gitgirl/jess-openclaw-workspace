// Master Twitter/X Follow Script - Fixed Selectors 2026
// Handles full master list + previous, unique ~90 profiles
// Headed browser, slowMo, manual 2FA intervention
// Run: node twitter_follow_master.js

const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Launching headed Chromium (slowMo=1500ms for visibility/manual fix)...');
  const browser = await chromium.launch({ headless: false, slowMo: 1500 });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  const username = 'synthengineers';  // No @
  const password = 'Team21550u!';
  
  // Full unique master list + previous
  const profiles = [
    // ERC-8004
    'dcrapis', 'marco_derossi', 'programmer', 'VittoStack', 'kleffew94', '13yearoldvc', 'austingriffith',
    // Frameworks
    'hwchase17', 'joaomdmoura', 'torantulino', 'yoheinakajima', '0xenzo', 'maaborajs', 'elizaos', 'LangChainAI', 'crewAIInc', 'Auto_GPT',
    // Infra
    'jessepollak', 'david_olas', 'jaboransen_v', 'HumayunSheikh', 'x402org', 'olas_network', 'virtuals_io', 'Fetch_ai',
    // Agents
    'truth_terminal', 'aixbt_agent', 'andyayrey',
    // LLMs
    'AnthropicAI', 'mikeyk', 'OpenAI', 'sama', 'GeminiApp', 'Google', 'GoogleDeepMind', 'xai', 'grok', 'AIatMeta', 'MistralAI', 'deepseek_ai', 'ollama', 'OpenRouterAI',
    // Leaders
    'karpathy', 'simonw', 'emollick', 'swyx', 'fchollet', 'jeremyphoward', 'AndrewYNg', 'rowancheung', 'NathanBenaich', 'KirkDBorne', 'alliekmiller', 'drfeifei',
    // News
    'verge', 'TechCrunch', 'WIRED', 'arstechnica', 'thenextweb', 'VentureBeat', 'mashable', 'DigitalTrends', 'TheRegister', 'slashdot', 'PopSci', 'FastCompany', 'futurism', 'BusinessInsider', 'TechInsider', 'Recode', 'crunchbase', 'hackernoon', 'RWW', 'DecryptMedia', 'TheBlock__',
    // Platforms
    'X', 'github', 'huggingface', 'replicate', 'modal_labs', 'weights_biases', 'scale_AI',
    // Previous unique
    'steipete', 'gregisenberg', 'rileybrown', 'corbin_braun', 'jackfriks', 'levelsio', 'marclou', 'EXM7777', 'eptwts', 'godofprompt', 'vasuman', 'AmirMushich', '0xROAS', 'egeberkina', 'MengTo', 'rryssf_', 'kloss_xyz', 'Hesamation'
  ].filter((handle, idx, arr) => arr.indexOf(handle) === idx);  // Unique

  console.log(`📋 Total unique profiles: ${profiles.length}`);

  const newlyFollowed = [];
  const alreadyFollowing = [];
  const errors = [];
  let batchNum = 0;

  try {
    // === LOGIN ===
    console.log('\n📱 Navigating to login...');
    await page.goto('https://x.com/login', { waitUntil: 'networkidle', timeout: 30000 });
    await page.screenshot({ path: 'screenshot_01_login.png', fullPage: true });
    console.log('📸 screenshot_01_login.png');

    // Check if already logged in
    if (await page.locator('[data-testid="AppTabBar_Home_Link"]').count() > 0 || page.url().includes('/home')) {
      console.log('✅ Already on home feed - logged in!');
    } else {
      // Username step (modern locators)
      console.log('\n👤 Username input...');
      const usernameField = page.getByPlaceholder(/Phone, email or username|username|email|phone/i).or(page.getByLabel(/username|email|phone/i));
      await page.waitForTimeout(3000);\n  await usernameField.waitFor({ state: 'visible', timeout: 15000 });
      await usernameField.fill(username);
      await page.screenshot({ path: 'screenshot_02_username.png' });
      console.log('📸 screenshot_02_username.png');

      await page.getByRole('button', { name: /Next/i }).first().click({ force: true });
      await page.waitForTimeout(3000);

      // Password step
      console.log('\n🔑 Password input...');
      const passwordField = page.getByPlaceholder(/password/i).or(page.getByLabel(/password/i)).or(page.locator('input[type="password"]'));
      await page.waitForTimeout(3000);\n  await passwordField.waitFor({ state: 'visible', timeout: 15000 });
      await passwordField.fill(password);
      await page.screenshot({ path: 'screenshot_03_password.png' });
      console.log('📸 screenshot_03_password.png');

      await page.getByRole('button', { name: /Log in|Login/i }).first().click({ force: true });
      await page.waitForTimeout(5000);
      await page.screenshot({ path: 'screenshot_04_post_login.png' });

      // MANUAL 2FA / Verification pause (critical!)
      console.log('\n🛡️ 2FA/Email/Phone check...');
      console.log('🔴 BROWSER OPEN: Enter code manually if prompted! Waiting 2min...');
      await page.screenshot({ path: 'screenshot_05_2fa.png' });
      await page.waitForTimeout(120000);  // 2 minutes manual intervention

      // Wait for home or profile
      await page.waitForURL(/home|explore|notifications|messages/i, { timeout: 30000 });
      console.log('✅ Login confirmed!');
    }

    await page.screenshot({ path: 'screenshot_06_home.png' });
    console.log('📸 Home page ready.');

    // === FOLLOW BATCHES (groups of 10 to avoid rate limits) ===
    console.log('\n🎯 Starting follow batches...');
    for (let i = 0; i < profiles.length; i += 10) {
      batchNum++;
      const batch = profiles.slice(i, i + 10);
      console.log(`\n📦 Batch ${batchNum}: ${batch.join(', ')}`);

      for (const handle of batch) {
        console.log(`  ➤ Visiting @${handle}...`);
        await page.goto(`https://x.com/${handle}`, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: `batch${batchNum}_${handle}_profile.png`, fullPage: true });

        try {
          // Follow button check (modern)
          const followBtn = page.getByRole('button', { name: /Follow @${handle}|Follow/i }).first().or(
            page.locator('[data-testid=follow]')
          );
          if (await followBtn.isVisible({ timeout: 10000 })) {
            await followBtn.click();
            await page.waitForTimeout(5000);  // Confirmation anim
            newlyFollowed.push(handle);
            console.log(`    ✅ FOLLOWED @${handle}`);
          } else {
            // Check if following
            const followingBtn = page.getByRole('button', { name: /Following|Unfollow/i });
            if (await followingBtn.isVisible({ timeout: 3000 })) {
              alreadyFollowing.push(handle);
              console.log(`    ✅ ALREADY @${handle}`);
            } else {
              console.log(`    ❓ Unknown @${handle}`);
            }
          }
        } catch (e) {
          errors.push(handle);
          console.log(`    ❌ ERROR @${handle}: ${e.message}`);
        }
        await page.waitForTimeout(3000);  // Inter-profile delay
      }
      console.log(`✅ Batch ${batchNum} done. Pausing 10s...`);
      await page.waitForTimeout(10000);
    }

    // === SUMMARY ===
    console.log('\n🎉 TASK COMPLETE!');
    console.log(`✅ Newly followed: ${newlyFollowed.length} (${newlyFollowed.slice(0,10).join(', ')}${newlyFollowed.length > 10 ? '...' : ''})`);
    console.log(`✅ Already following: ${alreadyFollowing.length}`);
    console.log(`❌ Errors: ${errors.length} (${errors.join(', ')})`);
    console.log(`📂 Screenshots: login + home + ~${profiles.length} profiles in workspace.`);
    console.log('🌐 BROWSER KEPT OPEN - inspect/close manually.');

  } catch (error) {
    console.error('\n💥 FATAL ERROR:', error.message);
    await page.screenshot({ path: 'screenshot_error.png' });
  } finally {
    // KEEP OPEN
    console.log('\n⏸️ Script done. Manual browser control.');
  }
})();
