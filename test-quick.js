const { firefox } = require('playwright');

(async () => {
  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();
  
  // Test 1: Initial load - should animate
  console.log('Test 1: Initial load - wait for animation to finish...');
  await page.goto('https://man-classic-cobra.ngrok-free.app');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '/tmp/t1-home-initial.png' });
  
  // Test 2: Navigate to blog - should NOT animate
  console.log('Test 2: Navigate to blog (immediate screenshot)...');
  await page.locator('.hidden.md\\:block a[href="/blog"]').first().click();
  await page.waitForTimeout(100); // Very short wait - should catch any animation
  await page.screenshot({ path: '/tmp/t2-blog-immediate.png' });
  
  // Wait and take another
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/t3-blog-1s.png' });
  
  // Test 3: Back to home - should NOT animate
  console.log('Test 3: Back to home (immediate screenshot)...');
  await page.locator('a[href="/"]').first().click();
  await page.waitForTimeout(100);
  await page.screenshot({ path: '/tmp/t4-home-immediate.png' });
  
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/t5-home-1s.png' });
  
  console.log('All screenshots saved!');
  await browser.close();
})();