import { app, BrowserWindow, Menu, dialog, Notification, ipcMain } from 'electron';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { autoUpdater } from 'electron-updater';
import express from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 设置应用根目录
process.env.APP_ROOT = path.join(__dirname, '..');

// 定义一些常量
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

let mainWindow: BrowserWindow | null;
// -------------------
// 创建一个 Express 应用
const expressApp = express();

const PORT = 3000;
expressApp.listen(PORT, () => {
  console.log(`Express HTTP server is running at http://localhost:${PORT}`);
});

// 定义一个 API 接口查询数据库
expressApp.get('/api/test', (req: any, res: any) => {
  res.json(req + '调用成功'); // 返回查询结果
});
// -------------------
function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      webSecurity: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.mjs'),
    },
    width: 800,
    height: 600,
  });

  // 创建菜单
  const menuTemplate = [
    {
      label: '帮助',
      submenu: [
        {
          label: '关于',
          click() {
            dialog.showMessageBox({
              type: 'info',
              title: '关于',
              message: '我是1.0.5版本',
              buttons: ['确定'],
            });
          },
        },
      ],
    },
  ] as any;

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // 打开开发者工具
  mainWindow.webContents.openDevTools();

  // 发送消息到渲染进程
  mainWindow.webContents.on('did-finish-load', () => {
    if (mainWindow) {
      mainWindow.webContents.send('main-process-message', (new Date()).toLocaleString());
    }
  });

  // 加载内容
  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }


  ipcMain.on('test', () => {
    const rows = '主线程接受到了渲染线程的消息'
    console.log('rows:', rows);
    if (mainWindow) {
      mainWindow.webContents.send('add', '主线程向渲染线程发送消息')
    }
    console.error('Error fetching rows:');
  })
}
// 监听更新事件
autoUpdater.on('update-available', async (info) => {
  const response = await dialog.showMessageBox(mainWindow as BrowserWindow, {
    type: 'info',
    title: '更新可用',
    message: `新版本 ${info.version} 可用，您想要下载吗？`,
    buttons: ['下载', '取消'],
  });

  if (response.response === 0) { // 0 是“下载”按钮
    autoUpdater.downloadUpdate();
  }
});

// 下载进度
autoUpdater.on('download-progress', (progressObj) => {
  const { percent } = progressObj;
  console.log(`下载进度: ${percent}%`);
});

// 更新下载完成
autoUpdater.on('update-downloaded', () => {
  const notification = new Notification({
    title: '更新下载完成',
    body: '新版本将被安装，应用程序将会重新启动。',
  });

  notification.on('click', () => {
    autoUpdater.quitAndInstall();
  });

  notification.show();
});

// 处理窗口关闭事件
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    mainWindow = null;
  }
});

// 处理应用激活事件
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 当应用准备就绪时创建窗口
app.whenReady().then(() => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify(); // 检查更新
});
