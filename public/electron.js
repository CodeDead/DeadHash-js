const electron = require("electron");
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        title: "DeadHash",
        width: 960,
        height: 520,
        icon: path.join(__dirname, '../build/Icon-512x512.png')
    });

    if (isDev) {
        mainWindow.webContents.openDevTools();
    } else {
        electron.Menu.setApplicationMenu(null);
    }

    mainWindow.removeMenu();
    mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
    mainWindow.on("closed", () => (mainWindow = null));

    mainWindow.webContents.on('new-window', (event, arg) => {
        event.preventDefault();
        electron.shell.openExternal(arg);
    });

    mainWindow.on("maximize", () => {
        mainWindow.webContents.send("window-maximized");
    });

    mainWindow.on("unmaximize", () => {
        mainWindow.webContents.send("window-unmaximized");
    })
};

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on("handle-close", () => {
    mainWindow.close();
});

ipcMain.on("handle-maximize", () => {
    if (!mainWindow.isMaximized()) {
        mainWindow.maximize();
    } else {
        mainWindow.unmaximize();
    }
});

ipcMain.on("handle-minimize", () => {
    mainWindow.minimize();
});

ipcMain.on("get-version", (e) => {
    e.reply('get-version-reply', app.getVersion());
});
