const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const firefox = require("selenium-webdriver/firefox");

describe("Open Belajar Bareng", function () {
    let driver;

    before (async function(){
        const options = new firefox.Options();
        // options.addArguments("--headless");

        driver = await new Builder()
            .forBrowser("firefox")
            .setFirefoxOptions(options)
            .build();
    });

    beforeEach (async function(){
        await driver.get("https://belajar-bareng.onrender.com/");

        let usernameInput = await driver.findElement(By.xpath('//input[@data-testid="username-input"]'));

        let passwordInput = await driver.findElement(By.xpath('//input[@data-testid="password-input"]'));

        let loginButton = await driver.findElement(By.xpath('//button[@data-testid="login-button"]'));

        await usernameInput.sendKeys("admin");
        await passwordInput.sendKeys("admin");
        await loginButton.click();
    });

    beforeEach (async function(){
        console.log ("Test Start");
    });


    afterEach (async function(){
        await driver.manage().deleteAllCookies();

        console.log ("Test Completed");
    });

    after (async function(){
        if (driver) {
            await driver.quit();

            console.log("driver closed");
        }
    });


    it("Should login and display List Users", async function () {

        let shoppingCart = await driver.wait(
            until.elementLocated(
                By.xpath("//*[@data-testid='shop-button']")
            ),
            20000
        )

        assert.strictEqual(
            await shoppingCart.isDisplayed(),
            true
        );
    });

    it("Should Successfully Add User", async function () {
        
        let addButton = await driver.wait(
            until.elementLocated(
                By.xpath('//button[@data-testid="add-button"]')
            ),
            20000
        );

        await driver.sleep(1000);
        await addButton.click();

        let usernameUser = await driver.wait(
            until.elementLocated(
                By.xpath('//input[@data-testid="username-input"]')
            ),
            20000
        );

        let ageInput = await driver.wait(
            until.elementLocated(
                By.xpath('//input[@data-testid="age-input"]')
            ),
            20000
        );

        let submitButton = await driver.wait(
            until.elementLocated(
                By.xpath('//button[@data-testid="submit-button"]')
            ),
            20000
        );

        await usernameUser.sendKeys("hanadulsetnet");
        await ageInput.sendKeys("235");
        await submitButton.click();

        let deleteButton = await driver.wait(
            until.elementLocated(
                By.xpath("//*[@data-testid='delete-button']")
            ),
            20000
        )

        assert.strictEqual(
            await deleteButton.isDisplayed(),
            true
        );
    });
});
