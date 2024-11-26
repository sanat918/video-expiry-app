const { contextBridge, ipcRenderer } = require('electron');

// Expose a secure API to the renderer process
contextBridge.exposeInMainWorld('electron', {
  openFileDialog: () => ipcRenderer.invoke('dialog:openFile'),  // IPC call to open the file dialog
});
