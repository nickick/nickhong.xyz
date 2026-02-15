const { firefox } = require('playwright');

(async () => {
  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();
  
  // Listen to console logs
  page.on('console', msg => console.log('Console:', msg.text()));
  
  console.log('1. Opening homepage (first load - should animate)...');
  await page.goto('https://man-classic-cobra.ngrok-free.app');
  
  // Wait for animation
  await page.waitForTimeout(3000);
  
  console.log('2. Clicking Blog link (should NOT animate on blog page)...');
  await page.locator('.hidden.md\\:block a[href="/blog"]').first().click();
  
  // Wait for navigation
  await page.waitForTimeout(2000);
  
  console.log('Current URL:', page.url());
  
  // Check sessionStorage
  const sessionData = await page.evaluate(() => ({
    navKey: sessionStorage.getItem('nickhongxyz-navigation'),
    navTs: sessionStorage.getItem('nickhongxyz-navigation-ts'),
  }));
  console.log('Session storage:', sessionData);
  
  await page.screenshot({ path: '/tmp/blog-nav-check.png' });
  console.log('Screenshot saved to /tmp/blog-nav-check.png');
  
  console.log('3. Clicking Home link to go back (should NOT animate on home page)...');
  await page.locator('.hidden.md\\:block a[href="/#home"]').first().click();
  
  await page.waitForTimeout(2000);
  
  console.log('Current URL after going back:', page.url());
  
  const sessionData2 = await page.evaluate(() => ({
    navKey: sessionStorage.getItem('nickhongxyz-navigation'),
    navTs: sessionStorage.getItem('nickhongxyz-navigation-ts'),
  }));
  console.log('Session storage after back:', sessionData2);
  
  await page.screenshot({ path: '/tmp/home-return-check.png' });
  console.log('Screenshot saved to /tmp/home-return-check.png');
  
  await browser.close();
})();