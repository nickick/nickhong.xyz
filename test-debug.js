const { firefox } = require('playwright');

(async () => {
  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Capture console logs
  page.on('console', msg => console.log('Console:', msg.text()));
  page.on('pageerror', err => console.log('Page error:', err.message));
  
  console.log('Opening https://man-classic-cobra.ngrok-free.app');
  await page.goto('https://man-classic-cobra.ngrok-free.app');
  
  await page.waitForTimeout(2000);
  
  // Get the href of the Blog link
  const blogHref = await page.locator('text=Blog').first().evaluate(el => el.getAttribute('href'));
  console.log('Blog link href:', blogHref);
  
  // Get the onclick attribute
  const blogOnClick = await page.locator('text=Blog').first().evaluate(el => el.getAttribute('onclick'));
  console.log('Blog link onclick:', blogOnClick);
  
  // Get the target attribute
  const blogTarget = await page.locator('text=Blog').first().evaluate(el => el.getAttribute('target'));
  console.log('Blog link target:', blogTarget);
  
  // Try clicking with force
  console.log('Clicking Blog link with force...');
  await page.locator('text=Blog').first().click({ force: true });
  
  // Wait for navigation
  await page.waitForTimeout(3000);
  
  console.log('Current URL after click:', page.url());
  
  await browser.close();
})();