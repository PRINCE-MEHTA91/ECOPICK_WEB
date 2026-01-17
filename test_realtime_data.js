const puppeteer = require('puppeteer');
const assert = require('assert');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    
    await page.goto('http://localhost:3000');
    
    
    const h2 = await page.$eval('.realtime-data h2', el => el.textContent);
    assert.strictEqual(h2, 'Real-Time Impact');
    
    
    await page.waitForSelector('#total-materials');
    
    const totalMaterials = await page.$eval('#total-materials', el => el.textContent);
    assert.strictEqual(totalMaterials, '0');
    
    const totalKg = await page.$eval('#total-kg', el => el.textContent);
    assert.strictEqual(totalKg, '0.00');
    
    const totalPrice = await page.$eval('#total-price', el => el.textContent);
    assert.strictEqual(totalPrice, '$0.00');
    
    console.log('Real-time data test passed!');
    
    await browser.close();
})();