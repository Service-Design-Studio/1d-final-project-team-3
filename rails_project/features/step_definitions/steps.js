const {Given, When, Then, Before, After} = require('@cucumber/cucumber')
const {expect} = require('chai')
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

var options = new chrome.Options();
options.addArguments("use-fake-ui-for-media-stream");

let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

Given('that I am at {string} section of {string} page', async (string1, string2) => {
    await driver.get('http://localhost:3000/recording/new');
});

When('I click on the "Start" button', async () => {
    var button = driver.findElement(webdriver.By.id('control-button'));
    button.click()
});

Then('I should see {string} button', async (string) => {
    expect(string).equal('Stop')
});

// Then('the "Stop" button should be "red"', async (string) => {
//     expect(string).equal('Stop')
// });

When('I click on the "Stop" button', async () => {
    await driver.findElement(webdriver.By.id('control-button')).click()
});

Then('I should be brought to the "show" section of "recording" page', async (string) => {
    var url = driver.getCurrentUrl();
    console.log(url)
    expect(url).equal('http://localhost:3000/recording/show');
});

When('10 seconds has passed', async () => {
    await driver.wait(() => documentInitialised(), 10000);
});

Then('I should see the time increment by 10', async (string) => {
    var textarea = driver.findElement(webdriver.By.id('transcription')).getText();
    assert( textarea.contains('00:00:10,000 --> 00:00:20,000:'),"Text not found!");
});