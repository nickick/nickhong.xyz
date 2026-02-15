const { firefox } = require('playwright');

(async () => {
  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('Opening https://man-classic-cobra.ngrok-free.app');
  await page.goto('https://man-classic-cobra.ngrok-free.app');
  
  await page.waitForTimeout(2000);
  
  // Click the visible desktop nav Blog link (hidden md:block)
  const blogLink = page.locator('.hidden.md\\:block a:has-text("Blog")');
  console.log('Found desktop Blog link:', await blogLink.count());
  
  if (await blogLink.count() > 0) {
    console.log('Clicking desktop Blog link...');
    await blogLink.click();
    
    // Wait for navigation
    await page.waitForTimeout(3000);
    
    console.log('Current URL:', page.url());
    
    if (page.url().includes('/blog')) {
      console.log('✅ SUCCESS: Navigated to blog page');
      await page.screenshot({ path: '/tmp/success.png' });
    } else {
      console.log('❌ FAILED: Still on homepage');
      await page.screenshot({ path: '/tmp/failed.png' });
    }
  }
  
  await browser.close();
})();