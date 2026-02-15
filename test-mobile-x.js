const { firefox } = require('playwright');

(async () => {
  // Mobile viewport
  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 375, height: 667 } });
  const page = await context.newPage();
  
  console.log('1. Opening homepage (mobile)...');
  await page.goto('https://man-classic-cobra.ngrok-free.app');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '/tmp/mobile-home.png' });
  
  console.log('2. Opening blog (immediate screenshot)...');
  await page.goto('https://man-classic-cobra.ngrok-free.app/blog');
  await page.waitForTimeout(100);
  await page.screenshot({ path: '/tmp/mobile-blog-immediate.png' });
  
  console.log('3. Blog after 1s...');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/mobile-blog-1s.png' });
  
  console.log('Screenshots saved');
  await browser.close();
})();