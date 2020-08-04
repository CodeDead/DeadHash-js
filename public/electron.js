const electron = require("electron");
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const crypto = require("crypto");
let mainWindow, fileWorkerWindow, textWorkerWindow;

const createWindow = () => {

    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        title: "DeadHash",
        width: 960,
        height: 520,
        icon: path.join(__dirname, '../build/logo512.png')
    });

    fileWorkerWindow = new BrowserWindow({
        show: isDev,
        icon: path.join(__dirname, '../build/logo512.png'),
        webPreferences: {nodeIntegration: true}
    });

    textWorkerWindow = new BrowserWindow({
        show: isDev,
        icon: path.join(__dirname, '../build/logo512.png'),
        webPreferences: {nodeIntegration: true}
    });

    if (isDev) {
        mainWindow.webContents.openDevTools();
        fileWorkerWindow.webContents.openDevTools();
        textWorkerWindow.webContents.openDevTools();
    } else {
        electron.Menu.setApplicationMenu(null);
    }

    mainWindow.removeMenu();
    mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
    mainWindow.on("closed", () => {
        mainWindow = null;
        if (fileWorkerWindow) fileWorkerWindow.close();
        if (textWorkerWindow) textWorkerWindow.close();
    });

    fileWorkerWindow.loadURL(`file://${path.join(__dirname, isDev ? "./workers/FileWorker/index.html" : "../build/workers/FileWorker/index.html")}`);
    fileWorkerWindow.on("closed", () => {
        fileWorkerWindow = null;
        if (textWorkerWindow) textWorkerWindow.close();
        if (mainWindow) mainWindow.close();
    });

    textWorkerWindow.loadURL(`file://${path.join(__dirname, isDev ? "./workers/TextWorker/index.html" : "../build/workers/TextWorker/index.html")}`);
    textWorkerWindow.on("closed", () => {
        textWorkerWindow = null;
        if (fileWorkerWindow) fileWorkerWindow.close();
        if (mainWindow) mainWindow.close();
    });

    mainWindow.webContents.on('new-window', (event, arg) => {
        event.preventDefault();
        electron.shell.openExternal(arg);
    });

    mainWindow.on("maximize", () => {
        mainWindow.webContents.send("window-maximized");
    });

    mainWindow.on("unmaximize", () => {
        mainWindow.webContents.send("window-unmaximized");
    });
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
    if (mainWindow) mainWindow.close();
});

ipcMain.on("handle-maximize", () => {
    if (mainWindow)
        mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});

ipcMain.on("handle-minimize", () => {
    if (mainWindow)
        mainWindow.minimize();
});

ipcMain.on("get-version", (e) => {
    e.reply('get-version-reply', app.getVersion());
});

ipcMain.on("calculate-file-hash", (e, data) => {
    if (fileWorkerWindow)
        fileWorkerWindow.webContents.send("calculate-file-hash", data);
});

ipcMain.on("file-hash-calculated", (e, data) => {
    if (mainWindow)
        mainWindow.webContents.send("file-hash-calculated", data);
});

ipcMain.on("file-hash-calculation-error", (e, data) => {
    if (mainWindow)
        mainWindow.webContents.send("file-hash-calculation-error", data);
});

ipcMain.on("calculate-text-hash", (e, data) => {
    if (textWorkerWindow)
        textWorkerWindow.webContents.send("calculate-text-hash", data);
});

ipcMain.on("text-hash-calculated", (e, data) => {
    if (mainWindow)
        mainWindow.webContents.send("text-hash-calculated", data);
});

ipcMain.on("text-hash-calculation-error", (e, data) => {
    if (mainWindow)
        mainWindow.webContents.send("text-hash-calculation-error", data);
});
