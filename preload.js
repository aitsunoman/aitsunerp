const {
    contextBridge,
    ipcRenderer
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["toMain"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send('test-print', data);
            }
        },
        bar_send: (channel, data) => {
            // whitelist channels
            let validChannels = ["toBar"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send('bar-print', data);
            }
        }
    }
);