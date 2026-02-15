const { firefox } = require('playwright');

(async () => {
  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();
  
  console.log('Opening https://man-classic-cobra.ngrok-free.app');
  await page.goto('https://man-classic-cobra.ngrok-free.app');
  
  await page.waitForTimeout(2000);
  
  // Get all Blog links
  const blogLinks = await page.locator('a[href="/blog"]').all();
  console.log(`Found ${blogLinks.length} Blog links`);
  
  for (let i = 0; i < blogLinks.length; i++) {
    const attrs = await blogLinks[i].evaluate(el => ({
      class: el.className,
      text: el.textContent,
      target: el.getAttribute('target')
    }));
    console.log(`Link ${i}:`, attrs);
  }
  
  // Click the visible one (desktop nav)
  const desktopBlog = page.locator('.hidden.md\\:block a[href="/blog"]').first();
  console.log('Clicking desktop Blog link...');
  await desktopBlog.click();
  
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
  
  await browser.close();
})();