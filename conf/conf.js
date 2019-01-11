// An example configuration file
exports.config = {

    // The address of a running selenium server
    seleniumAddress: 'http://localhost:4444/wd/hub',
    // geckoDriver: "/usr/local/lib/node_modules/protractor/node_modules/webdriver-manager/selenium/geckodriver-v0.20.1",

    // chromeDriver: "/usr/local/lib/node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.38",
 
    directConnect: true,

    //Capabilities to be passed to the webdriver instance
    capabilities: {
        browserName: 'chrome'
    },

    onPrepare: async function () {

        //This is used to close browser at the end of test run
        console.log(await browser.waitForAngularEnabled())
        browser.waitForAngularEnabled(false);

        //This is used to maximize browser window
        browser.manage().window().maximize();

    },

    // Spec patterns are relative to current working directory when protractor is called
    // Here * indicates any name before _spec.js like zoo_test_spec.js
    specs:['../testScript/*_spec.js'],
    // specs:['../testScript/new_script.js'],

    //options to be passed to the jasmine node

    jasmineNodeOpts: {

        showColors: true,
        defaultTimeoutInterval: 30000,
        includeStackTrace: true
    }

};