const { firefox } = require('playwright');

(async () => {
  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();
  
  console.log('1. Opening homepage...');
  await page.goto('https://man-classic-cobra.ngrok-free.app');
  
  // Wait for animation to finish
  await page.waitForTimeout(3000);
  
  console.log('2. Taking screenshot of homepage...');
  await page.screenshot({ path: '/tmp/home-loaded.png' });
  
  console.log('3. Clicking Blog link...');
  await page.locator('.hidden.md\\:block a[href="/blog"]').first().click();
  
  // Wait just a bit for navigation
  await page.waitForTimeout(500);
  
  console.log('4. Taking screenshot immediately after click (should show blog without 2s delay)...');
  await page.screenshot({ path: '/tmp/blog-immediate.png' });
  
  // Wait for any animation
  await page.waitForTimeout(3000);
  
  console.log('5. Taking screenshot after 3s...');
  await page.screenshot({ path: '/tmp/blog-final.png' });
  
  console.log('Current URL:', page.url());
  
  if (page.url().includes('/blog')) {
    console.log('✅ SUCCESS: Navigation worked');
  } else {
    console.log('❌ FAILED');
  }
  
  await browser.close();
})();