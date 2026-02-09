const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false, 
    slowMo: 2000 
  });
  const context = await browser.newContext({ 
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  const username = 'synthengineers';
  const password = 'Team21550u!';
  const users = ['karpathy','steipete','gregisenberg','rileybrown','corbin_braun','jackfriks','levelsio','marclou','EXM7777','eptwts','godofprompt','vasuman','AmirMushich','0xROAS','egeberkina','MengTo','rryssf_','kloss_xyz','emollick','Hesamation'];

  console.log('Step 1: Navigating to https://x.com/login');
  await page.goto('https://x.com/login');
  await page.screenshot({ path: '01_login.png', fullPage: true });
  console.log('Screenshot: 01_login.png');

  // Login
  if (!page.url().includes('home')) {
    console.log('Step 2: Username');
    await page.fill('[data-testid=\\"login-text-input\\"]', `@${username}`);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(3000);

    console.log('Step 3: Password');
    await page.fill('[data-testid=\\"ocf-password-input\\"]', password);
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(5000);

    console.log('Step 4: If 2FA prompted, complete manually in opened browser. Waiting 2min...');
    await page.waitForTimeout(120000); // 2 min for manual 2FA

    await expect(page).toHaveURL(/home/);
    console.log('Login complete!');
  }

  await page.screenshot({ path: '02_home.png', fullPage: true });
  console.log('Screenshot: 02_home.png');

  const newlyFollowed = [];
  const already = [];

  for (const user of users) {
    console.log(`\\n--- Profile: @${user} ---`);
    await page.goto(`https://x.com/${user}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `profile_${user.replace(/[^a-z0-9]/gi, '_')}.png` });

    const followBtn = page.locator('[data-testid=\\"follow\\"]');
    if (await followBtn.isVisible({ timeout: 5000 })) {
      console.log('Follow button found, clicking...');
      await followBtn.click();
      await page.waitForTimeout(3000);
      newlyFollowed.push(user);
      console.log('✅ Followed!');
    } else {
      const unfollow = page.locator('[data-testid=\\"unfollow\\"]');
      if (await unfollow.isVisible()) {
        already.push(user);
        console.log('✅ Already following');
      } else {
        console.log('❓ Status unclear');
      }
    }
  }

  console.log('\\n=== FINAL SUMMARY ===');
  console.log('Newly followed:', newlyFollowed);
  console.log('Already following:', already);
  console.log('All screenshots in workspace.');

  // browser.close(); // Keep open
})();
