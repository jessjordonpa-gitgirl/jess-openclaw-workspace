// Fixed Twitter Follow Master Script - 2026 Selectors
// Unique profiles from master + previous lists
// Headed, slowMo, manual 2FA, batches, screenshots, counts/errors
// node twitter_follow_complete_fixed.js

const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Launching headed Chromium slowMo=2000ms...');
  const browser = await chromium.launch({
    headless: false,
    slowMo: 2000
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1024 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  const username = 'gonzofuturim';
  const password = 'Team21550u!';

  // Complete unique list (ERC-8004, Frameworks, Infra, Agents, LLMs, Leaders, News, Platforms + previous)
  const profiles = [
    'dcrapis', 'marco_derossi', 'programmer', 'VittoStack', 'kleffew94', '13yearoldvc', 'austingriffith',
    'hwchase17', 'joaomdmoura', 'torantulino', 'yoheinakajima', '0xenzo', 'maaborajs', 'elizaos', 'LangChainAI', 'crewAIInc', 'Auto_GPT',
    'jessepollak', 'david_olas', 'jaboransen_v', 'HumayunSheikh', 'x402org', 'olas_network', 'virtuals_io', 'Fetch_ai',
    'truth_terminal', 'aixbt_agent', 'andyayrey',
    'AnthropicAI', 'mikeyk', 'OpenAI', 'sama', 'GeminiApp', 'Google', 'GoogleDeepMind', 'xai', 'grok', 'AIatMeta', 'MistralAI', 'deepseek_ai', 'ollama', 'OpenRouterAI',
    'karpathy', 'simonw', 'emollick', 'swyx', 'fchollet', 'jeremyphoward', 'AndrewYNg', 'rowancheung', 'NathanBenaich', 'KirkDBorne', 'alliekmiller', 'drfeifei',
    'verge', 'TechCrunch', 'WIRED', 'arstechnica', 'thenextweb', 'VentureBeat', 'mashable', 'DigitalTrends', 'TheRegister', 'slashdot', 'PopSci', 'FastCompany', 'futurism', 'BusinessInsider', 'TechInsider', 'Recode', 'crunchbase', 'hackernoon', 'RWW', 'DecryptMedia', 'TheBlock__',
    'X', 'github', 'huggingface', 'replicate', 'modal_labs', 'weights_biases', 'scale_AI',
    'steipete', 'gregisenberg', 'rileybrown', 'corbin_braun', 'jackfriks', 'levelsio', 'marclou', 'EXM7777', 'eptwts', 'godofprompt', 'vasuman', 'AmirMushich', '0xROAS', 'egeberkina', 'MengTo', 'rryssf_', 'kloss_xyz', 'Hesamation'
  ].filter((h, i, a) => a.indexOf(h) === i && h.trim());

  console.log(`📋 ${profiles.length} unique profiles to process.`);

  let newlyFollowed = 0;
  let alreadyFollowing = 0;
  let errors = 0;
  let skipped = 0;

  try {
    // Login
    await page.goto('https://x.com/login', { waitUntil: 'networkidle', timeout: 40000 });
    await page.screenshot({ path: 'login_01_initial.png', fullPage: true });
    console.log('📸 login_01_initial.png');

    // Already logged in check
    try {
      await page.waitForSelector('[data-testid="AppTabBar_Home_Link"], [data-testid="SideNav_AccountSwitch_Menu"], a[href="/home"]', { timeout: 5000 });
      console.log('✅ Already logged in - skipping login.');
    } catch {
      console.log('🔐 Performing login...');

      // Username
      console.log('👤 Username...');
      const userSel = 'input[data-testid="login-text-input"], input[autocomplete="username"], input[name="text"], input[placeholder*="username"], input[placeholder*="phone"], input[placeholder*="email"]';
      await page.waitForSelector(userSel, { timeout: 15000 });
      await page.fill(userSel, username);
      await page.screenshot({ path: 'login_02_username.png' });
      await page.click('button[data-testid="LoginForm_NextButton"], [data-testid="LoginForm_NextButton"], button:has-text("Next")', { timeout: 10000 });
      await page.waitForTimeout(3000);

      // Password
      console.log('🔑 Password...');
      const passSel = 'input[data-testid="ocf-password-input"], input[type="password"], input[autocomplete="current-password"], input[name="password"], input[placeholder*="Password"]';
      await page.waitForSelector(passSel, { timeout: 15000 });
      await page.fill(passSel, password);
      await page.screenshot({ path: 'login_03_password.png' });
      await page.click('button[data-testid="LoginForm_LoginButton"], [data-testid="LoginForm_LoginButton"], button:has-text("Log in")', { timeout: 10000 });
      await page.waitForTimeout(5000);
      await page.screenshot({ path: 'login_04_submit.png' });

      // 2FA Manual Intervention - CRITICAL
      console.log('🛡️ 2FA/PHONE/EMAIL PROMPT? ENTER MANUALLY IN BROWSER!');
      console.log('⏳ Waiting 3min for manual input/verification... DO NOT CLOSE BROWSER!');
      await page.screenshot({ path: 'login_05_2fa.png' });
      await page.waitForTimeout(180000);  // 3 min

      // Confirm login
      await page.waitForURL(/\/home|\/i\/|\/explore/, { timeout: 30000 });
      console.log('✅ Login successful!');
    }

    await page.screenshot({ path: 'login_06_home.png' });
    console.log('🏠 Home reached.');

    // Follow loop - batches of 5, slow
    const batchSize = 5;
    for (let i = 0; i < profiles.length; i += batchSize) {
      const batch = profiles.slice(i, i + batchSize);
      console.log(`\n📦 Batch ${(Math.floor(i/batchSize)+1)}/${Math.ceil(profiles.length/batchSize)}: ${batch.join(' ')}`);

      for (const handle of batch) {
        try {
          console.log(`  → @${handle}`);
          await page.goto(`https://x.com/${handle}`, { waitUntil: 'networkidle', timeout: 40000 });
          await page.waitForTimeout(3000);
          await page.screenshot({ path: `follow_${handle}.png`, fullPage: true });

          // Check follow button
          const followSel = '[data-testid="follow"], button[aria-label*="Follow"], button:has-text("Follow")';
          if (await page.locator(followSel).isVisible({ timeout: 10000 })) {
            await page.locator(followSel).first().click();
            await page.waitForTimeout(4000);
            newlyFollowed++;
            console.log(`    ✅ NEW FOLLOW: @${handle}`);
          } else {
            const followingSel = '[data-testid="unfollow"], button:has-text("Following"), button[aria-label*="Following"]';
            if (await page.locator(followingSel).isVisible({ timeout: 5000 })) {
              alreadyFollowing++;
              console.log(`    ✅ ALREADY: @${handle}`);
            } else {
              console.log(`    ❓ UNKNOWN: @${handle}`);
              skipped++;
            }
          }
        } catch (e) {
          console.log(`    ❌ ERROR @${handle}: ${e.message}`);
          errors++;
        }
        await page.waitForTimeout(5000);  // Rate limit safety
      }
      console.log(`✅ Batch done. 20s pause...`);
      await page.waitForTimeout(20000);
    }

    // Summary
    console.log('\n🎉 ALL PROFILES PROCESSED!');
    console.log(`✅ New follows: ${newlyFollowed}`);
    console.log(`✅ Already following: ${alreadyFollowing}`);
    console.log(`❌ Errors: ${errors}`);
    console.log(`❓ Skipped/unknown: ${skipped}`);
    console.log(`📂 Check workspace for screenshots (login_*.png, follow_*.png)`);
    console.log('🌐 BROWSER OPEN - verify & close manually.');

  } catch (err) {
    console.error('\n💥 ERROR:', err.message);
    await page.screenshot({ path: 'error_final.png' });
  } finally {
    console.log('\n👋 Script complete. Browser stays open.');
    // NOT closing
  }
})();
