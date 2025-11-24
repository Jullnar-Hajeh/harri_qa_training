const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  
  helpers: {
    WebDriver: {
      url: 'https://opensource-demo.orangehrmlive.com',
      browser: 'chrome',
      smartWait: 5000,
      restart: true,
      windowSize: '1920x1080',
      timeouts: {
        script: 60000,
        pageLoad: 60000
      },
      desiredCapabilities: {
        chromeOptions: {
          args: [ 
            '--disable-gpu', 
            '--no-sandbox',
            '--window-size=1920,1080',
          ]
        }
      }
    },
    
    REST: {
      endpoint: 'https://reqres.in',
      onRequest: (request) => {
        request.headers = { 
          ...request.headers,
          'Content-Type': 'application/json'
        };
      },
      defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    },

    JSONResponse: {}
  },

  include: {
    I: './steps_file.js',
    orangePage: './pages/orangePage.js'
  },

  name: 'task-automation'
}