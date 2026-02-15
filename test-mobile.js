const { firefox } = require('playwright');

(async () => {
  // Mobile viewport
  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 375, height: 667 } });
  const page = await context.newPage();
  
  console.log('Opening https://man-classic-cobra.ngrok-free.app (mobile)');
  await page.goto('https://man-classic-cobra.ngrok-free.app');
  
  await page.waitForTimeout(2000);
  
  // Click hamburger menu
  console.log('Clicking hamburger menu...');
  await page.locator('.hamburger-react').first().click();
  
  await page.waitForTimeout(1000);
  
  // Take screenshot of drawer open
  await page.screenshot({ path: '/tmp/mobile-drawer.png' });
  console.log('Screenshot saved to /tmp/mobile-drawer.png');
  
  // Find Blog link in drawer
  const mobileBlog = page.locator('[class*="fixed"] a:has-text("Blog")');
  console.log('Found mobile Blog link:', await mobileBlog.count());
  
  // Get attributes
  const attrs = await mobileBlog.evaluate(el => ({
    href: el.getAttribute('href'),
    onclick: el.getAttribute('onclick'),
    anchor: el.getAttribute('data-anchor')
  }));
  console.log('Blog link attributes:', attrs);
  
  console.log('Clicking mobile Blog link...');
  await mobileBlog.click();
  
  await page.waitForTimeout(3000);
  
  console.log('Current URL:', page.url());
  
  if (page.url().includes('/blog')) {
    console.log('✅ SUCCESS: Mobile navigation works!');
    await page.screenshot({ path: '/tmp/mobile-blog.png' });
  } else {
    console.log('❌ FAILED: Did not navigate to blog');
    await page.screenshot({ path: '/tmp/mobile-failed.png' });
  }
  
  await browser.close();
})();