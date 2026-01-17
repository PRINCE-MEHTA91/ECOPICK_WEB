const puppeteer = require('puppeteer');
const assert = require('assert');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    
    await page.goto('http://localhost:3000/login.html');
    await page.type('#name', 'Test User');
    await page.type('#phoneNumber', '1234567890');
    await page.click('button');
    await page.waitForNavigation();
    
    
    await page.goto('http://localhost:3000/dashboard.html');
    
    
    const h1 = await page.$eval('h1', el => el.textContent);
    assert.strictEqual(h1, 'Welcome, Test User!');
    
    const totalMaterials = await page.$eval('#totalMaterials', el => el.textContent);
    assert.strictEqual(totalMaterials, '0');
    
    const totalMaterialSold = await page.$eval('#totalMaterialSold', el => el.textContent);
    assert.strictEqual(totalMaterialSold, '0.00');
    
    const totalSellingPrice = await page.$eval('#totalSellingPrice', el => el.textContent);
    assert.strictEqual(totalSellingPrice, '₹0.00');
    
    console.log('Dashboard test passed!');
    
    await browser.close();
})();
