import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("nenchan", {
  platform: process.platform,
  isElectron: true,

  minimize: () => ipcRenderer.send("window:minimize"),
  maximize: () => ipcRenderer.send("window:maximize"),
  close: () => ipcRenderer.send("window:close"),

  onThemeChange: (callback: (isDark: boolean) => void) => {
    ipcRenderer.on("theme:changed", (_, isDark: boolean) => callback(isDark));
  },
});
