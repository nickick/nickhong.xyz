const { firefox } = require('playwright');

(async () => {
  // Mobile viewport
  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 375, height: 667 } });
  const page = await context.newPage();
  
  console.log('1. Opening homepage (mobile)...');
  await page.goto('https://man-classic-cobra.ngrok-free.app');
  await page.waitForTimeout(3000);
  
  // Get all links
  const links = await page.locator('a').all();
  console.log(`Found ${links.length} links`);
  for (let i = 0; i < Math.min(links.length, 10); i++) {
    const text = await links[i].textContent();
    const href = await links[i].getAttribute('href');
    const visible = await links[i].isVisible().catch(() => false);
    console.log(`  ${i}: text="${text?.trim()}", href=${href}, visible=${visible}`);
  }
  
  console.log('2. Clicking hamburger menu...');
  await page.locator('.hamburger-react').first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/m1-drawer-open.png' });
  
  console.log('3. Clicking Blog in drawer...');
  await page.getByText('Blog', { exact: true }).click();
  await page.waitForTimeout(100);
  await page.screenshot({ path: '/tmp/m2-blog-immediate.png' });
  
  console.log('4. Blog after 500ms...');
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/m3-blog-500ms.png' });
  
  console.log('Screenshots saved');
  await browser.close();
})();