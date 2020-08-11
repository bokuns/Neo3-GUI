// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');
const esmRequire = require("esm")(module);
const constants = esmRequire('./src/configs/constants');

const { BASE_URL_DEV } = constants.default;
const isLocked = app.requestSingleInstanceLock()

let mainWindow = null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    resizable: false,
    webPreferences: {
      javascript: true,
      plugins: true,
      nodeIntegration: false,
      webSecurity: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  if (process.env.NODE_ENV === 'development') {
    console.log('env:', process.env.NODE_ENV);
    mainWindow.loadURL(BASE_URL_DEV);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  } else {
    //Hide toolBar
    Menu.setApplicationMenu(null);
    mainWindow.loadURL(
      url.format({
        protocol: 'file',
        slashes: true,
        pathname: path.join(__dirname, '/build/index.html'),
      })
    );
  }
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });

  mainWindow.webContents.on('new-window', (event) => {
    event.preventDefault();
  });
};

if (!isLocked) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // app.on('ready', () => createWindow());

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow == null) createWindow();
    });
  });

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
  });

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.
  app.on('web-contents-created', (event, wc) => {
    wc.on('before-input-event', (event, input) => {
        // Windows/Linux hotkeys
        if (process.platform !== 'darwin') {
          if (input.key === 'F12') {
            mainWindow.webContents.openDevTools()
            event.preventDefault()
          }
        }
    });
  });
}
