const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function main() {
  const screenshotsDir = path.join(__dirname, '../verification_screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('Launching browser with system Chrome...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  console.log('Navigating to http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });

  // Wait for loader to finish
  await page.waitForFunction(() => {
    const loader = document.querySelector('.fixed.inset-0.z-50');
    return !loader || loader.classList.contains('opacity-0');
  }, { timeout: 15000 });

  console.log('Loader completed. Capturing Scene 01 (Awakening)...');
  await page.screenshot({ path: path.join(screenshotsDir, '01_scene_awakening.png') });

  // Scroll function to test scenes
  const scrollTrack = async (progress) => {
    await page.evaluate((p) => {
      const track = document.getElementById('fragrance');
      if (track) {
        const maxScroll = track.offsetHeight - window.innerHeight;
        window.scrollTo({ top: maxScroll * p, behavior: 'instant' });
      }
    }, progress);
    // Wait a brief moment for canvas redraw
    await new Promise(r => setTimeout(r, 600));
  };

  console.log('Scrubbing to Scene 02 (The Reveal, 20%)...');
  await scrollTrack(0.20);
  await page.screenshot({ path: path.join(screenshotsDir, '02_scene_reveal.png') });

  console.log('Scrubbing to Scene 03 (The Liquid Soul, 38%)...');
  await scrollTrack(0.38);
  await page.screenshot({ path: path.join(screenshotsDir, '03_scene_liquid.png') });

  console.log('Scrubbing to Scene 04 (The Anatomy, 58%)...');
  await scrollTrack(0.58);
  await page.screenshot({ path: path.join(screenshotsDir, '04_scene_anatomy.png') });

  console.log('Scrubbing to Scene 05 (The Transformation, 76%)...');
  await scrollTrack(0.76);
  await page.screenshot({ path: path.join(screenshotsDir, '05_scene_transformation.png') });

  console.log('Scrubbing to Scene 06 (The Grand Finale, 94%)...');
  await scrollTrack(0.94);
  await page.screenshot({ path: path.join(screenshotsDir, '06_scene_finale.png') });

  console.log('Scrolling down to Philosophy section...');
  await page.evaluate(() => {
    document.getElementById('philosophy')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(screenshotsDir, '07_philosophy_section.png') });

  console.log('Testing Olfactory Notes interactive tabs...');
  await page.evaluate(() => {
    document.getElementById('notes')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 500));
  // Click Heart tab
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Heart')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(screenshotsDir, '08_notes_heart.png') });

  console.log('Scrolling down to Product Showcase...');
  await page.evaluate(() => {
    document.getElementById('discover')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(screenshotsDir, '09_product_showcase.png') });

  // Mobile viewport test
  console.log('Testing mobile viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await scrollTrack(0.20);
  await page.screenshot({ path: path.join(screenshotsDir, '10_mobile_reveal.png') });

  console.log('=== TEST RESULTS ===');
  console.log('Console errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  } else {
    console.log('SUCCESS: Zero console errors detected!');
  }

  await browser.close();
  console.log('All verification screenshots saved to verification_screenshots/');
}

main().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
