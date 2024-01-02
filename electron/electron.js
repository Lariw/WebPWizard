const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
    webPreferences: {
      
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  ipcMain.on("closeApp", () => {
    if (win) {
      win.close();
    }
  });

  ipcMain.on("minimizeApp", () => {
    if (win) {
      win.minimize();
    }
  });

  ipcMain.on("maximizeRestoreApp", () => {
    if (win) {
      if (win.isMaximized()) {
        win.restore();
      } else {
        win.maximize();
      }
    }
  });

  win.loadFile("./GUI/html/index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
