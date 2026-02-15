const { firefox } = require('playwright');

(async () => {
  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();
  
  console.log('1. Opening homepage (should animate)...');
  await page.goto('https://man-classic-cobra.ngrok-free.app');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '/tmp/1-home-initial.png' });
  
  console.log('2. Clicking Blog link (should NOT animate on blog)...');
  await page.locator('.hidden.md\\:block a[href="/blog"]').first().click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/2-blog-nav.png' });
  console.log('   Blog URL:', page.url());
  
  console.log('3. Clicking logo to go home (should NOT animate on return)...');
  await page.locator('a[href="/"]').first().click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/3-home-return.png' });
  console.log('   Home URL:', page.url());
  
  console.log('4. Clicking Blog link again (should NOT animate)...');
  await page.locator('.hidden.md\\:block a[href="/blog"]').first().click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/4-blog-again.png' });
  console.log('   Blog URL:', page.url());
  
  console.log('5. Browser back button (should NOT animate)...');
  await page.goBack();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/5-home-back.png' });
  console.log('   URL after back:', page.url());
  
  await browser.close();
})();