const { firefox } = require('playwright');

(async () => {
  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('Opening https://man-classic-cobra.ngrok-free.app');
  await page.goto('https://man-classic-cobra.ngrok-free.app');
  
  await page.waitForTimeout(2000);
  
  // Get page HTML to check the link attributes
  const linkHtml = await page.locator('a[href="/blog"]').first().evaluate(el => ({
    href: el.getAttribute('href'),
    target: el.getAttribute('target'),
    onclick: el.getAttribute('onclick'),
    class: el.className
  }));
  console.log('Blog link attributes:', linkHtml);
  
  // Click the first Blog link
  console.log('Clicking first Blog link...');
  await page.locator('a[href="/blog"]').first().click();
  
  // Wait for navigation
  await page.waitForTimeout(3000);
  
  console.log('Current URL:', page.url());
  
  if (page.url().includes('/blog')) {
    console.log('✅ SUCCESS: Navigated to blog page');
  } else {
    console.log('❌ FAILED: Did not navigate to blog');
  }
  
  await browser.close();
})();