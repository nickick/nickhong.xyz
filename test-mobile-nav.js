const { firefox } = require('playwright');

(async () => {
  // Mobile viewport
  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 375, height: 667 } });
  const page = await context.newPage();
  
  console.log('1. Opening homepage (mobile), waiting for animation...');
  await page.goto('https://man-classic-cobra.ngrok-free.app');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '/tmp/m1-home.png' });
  
  console.log('2. Clicking Blog link (immediate screenshot)...');
  await page.locator('a[href="/blog"]').first().click();
  await page.waitForTimeout(100);
  await page.screenshot({ path: '/tmp/m2-blog-click.png' });
  
  console.log('3. Blog after 500ms...');
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/m3-blog-500ms.png' });
  
  console.log('Screenshots saved');
  await browser.close();
})();