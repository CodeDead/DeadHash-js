const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        title: "DeadHash",
        width: 980,
        height: 550,
        icon: path.join(__dirname, '../build/Icon-512x512.png')
    });

    if (isDev) {
        mainWindow.webContents.openDevTools();
    } else {
        electron.Menu.setApplicationMenu(null);
    }

    // noinspection JSUndefinedPropertyAssignment
    global.mainWindow = mainWindow;

    mainWindow.removeMenu();
    mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
    mainWindow.on("closed", () => (mainWindow = null));

    mainWindow.webContents.on('new-window', (event, arg) => {
        event.preventDefault();
        electron.shell.openExternal(arg);
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
