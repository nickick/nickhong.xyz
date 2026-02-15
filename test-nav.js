const { firefox } = require('playwright');

(async () => {
  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Listen for navigation events
  page.on('framenavigated', frame => {
    console.log('Navigated to:', frame.url());
  });
  
  console.log('Opening https://man-classic-cobra.ngrok-free.app');
  await page.goto('https://man-classic-cobra.ngrok-free.app');
  
  await page.waitForTimeout(2000);
  
  // Take screenshot of homepage
  await page.screenshot({ path: '/tmp/homepage.png', fullPage: false });
  console.log('Screenshot saved to /tmp/homepage.png');
  
  // Get page HTML to debug
  const html = await page.content();
  console.log('Page HTML contains /blog:', html.includes('/blog'));
  console.log('Page HTML contains Blog:', html.includes('>Blog<'));
  
  // Find and click the Blog link by text
  try {
    const blogLink = page.getByText('Blog', { exact: true });
    console.log('Blog link count:', await blogLink.count());
    
    if (await blogLink.count() > 0) {
      console.log('Clicking Blog link...');
      await blogLink.first().click();
      
      // Wait for navigation
      await page.waitForTimeout(3000);
      
      console.log('Current URL after click:', page.url());
      
      // Take screenshot after click
      await page.screenshot({ path: '/tmp/blogpage.png', fullPage: false });
      console.log('Screenshot saved to /tmp/blogpage.png');
      
      if (page.url().includes('/blog')) {
        console.log('✅ SUCCESS: Navigated to blog page');
      } else {
        console.log('❌ FAILED: Did not navigate to blog page');
      }
    } else {
      console.log('❌ Blog link not found');
    }
  } catch (e) {
    console.log('Error:', e.message);
  }
  
  await browser.close();
})();