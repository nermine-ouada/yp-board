import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 420, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push("console.error: " + msg.text());
});

await page.goto("http://localhost:3002/", { waitUntil: "load" });
await page.waitForTimeout(1500);
await page.screenshot({ path: "shot-home-mobile.png" });

const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } });
desktop.on("pageerror", (e) => errors.push("pageerror(desktop): " + e.message));
desktop.on("console", (msg) => { if (msg.type() === "error") errors.push("console.error(desktop): " + msg.text()); });
await desktop.goto("http://localhost:3002/", { waitUntil: "load" });
await desktop.waitForTimeout(1500);
await desktop.screenshot({ path: "shot-home-desktop.png" });

const linksPage = await browser.newPage({ viewport: { width: 420, height: 900 } });
linksPage.on("pageerror", (e) => errors.push("pageerror(links): " + e.message));
linksPage.on("console", (msg) => { if (msg.type() === "error") errors.push("console.error(links): " + msg.text()); });
await linksPage.goto("http://localhost:3002/links", { waitUntil: "load", timeout: 60000 });
await linksPage.waitForTimeout(1000);
await linksPage.screenshot({ path: "shot-links.png" });

console.log("ERRORS:", JSON.stringify(errors, null, 2));
await browser.close();
