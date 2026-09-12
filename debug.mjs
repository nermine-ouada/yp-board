import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 420, height: 900 } });
await page.goto("http://localhost:3002/", { waitUntil: "load" });
await page.waitForTimeout(2000);
const info = await page.evaluate(() => {
  const em = document.querySelector('.hero h1 em');
  if (!em) return { found: false };
  const cs = getComputedStyle(em);
  return {
    found: true,
    text: em.textContent,
    className: em.className,
    opacity: cs.opacity,
    color: cs.color,
    backgroundImage: cs.backgroundImage,
    webkitBackgroundClip: cs.webkitBackgroundClip || cs.backgroundClip,
    transform: cs.transform,
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
