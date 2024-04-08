// @ts-check
const { test, expect } = require("@playwright/test");

test("Login Page", async ({ browser }) => {
const context = await browser.newContext();
const page = await context.newPage();
const productName = 'ZARA COAT 3';
const products = page.locator(".card-body"); //this are the list of products in dashboard page
await page.goto("https://rahulshettyacademy.com/client");
await page.locator("#userEmail").fill("anshika@gmail.com");
await page.locator("#userPassword").fill("Iamking@000");
await page.locator("[value='Login']").click();
await page.waitForLoadState('networkidle');
const titles = await page.locator(".card-body b").allTextContents();
console.log(titles);
const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
 
   await page.locator("[routerlink*='cart']").click();
   //await page.pause();
 
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
 
   await page.locator("[placeholder*='Country']").type("ind");
 
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
 
   await expect(page.locator(".user__name [type='text']").first()).toHaveText("anshika@gmail.com");
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

});
