const { _electron: electron } = require('playwright')
const { test, expect } = require('@playwright/test')

test('example test', async () => {
  const electronApp = await electron.launch({ args: ['../arkas-desktop/'] })
  const isPackaged = await electronApp.evaluate(async ({ app }) => {
    // This runs in Electron's main process, parameter here is always
    // the result of the require('electron') in the main app script.
    return app.isPackaged;
  });

  // Evaluation expression in the Electron context.
    const appPath = await electronApp.evaluate(async ({ app }) => {
      // This runs in the main Electron process, parameter here is always
      // the result of the require('electron') in the main app script.
      return app.getAppPath();
    });
    console.log(appPath);

  expect(isPackaged).toBe(false);

  // Wait for the first BrowserWindow to open
  // and return its Page object
  const window = await electronApp.firstWindow()
  // await window.screenshot({ path: 'intro.png' })
  window.on('console', console.log);

  await electronApp.process()

  // debug 
  await new Promise(resolve => setTimeout(resolve, 5000000));
  // close app
  await electronApp.close()
});
