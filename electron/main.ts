import { app, BrowserWindow, Menu, dialog, Notification,ipcMain } from 'electron';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { autoUpdater } from 'electron-updater';
import express from 'express'; // 确保这里是正确引入 express

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 设置应用根目录
process.env.APP_ROOT = path.join(__dirname, '..');

// 定义一些常量
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

let mainWindow: BrowserWindow | null;

// ------------------------------------
const sqlite3 = require('sqlite3').verbose();

// import sqlite3 from 'sqlite3';
// squliteDb()
// function squliteDb() {

  // 确保数据库路径正确
  // const dbPath = path.resolve(process.env.APP_ROOT, '9999.db');
  const dbPath ='D:/dome/npmCreateElectronVite/9999.db'
  // 创建 SQLite 数据库连接
  let db = null;

  try {
    db = new sqlite3.Database(dbPath, (err: any) => {
      if (err) {
        console.error('无法连接数据库:', err.message);
      } else {
        console.log('成功连接到 SQLite 数据库');
      }
    });
    db.all('SELECT * FROM user', (err: any, rows: any) => {
      if (err) {
        console.error('查询失败:', err.message);
      } else {
        console.log('查询结果:', rows);
      }
      // db.close();
    });


  } catch (error) {
    console.error('SQLite 连接出错:', error);
  }
// }

// 创建一个 Express 应用
const expressApp = express();

const PORT = 3000;
expressApp.listen(PORT, () => {
  console.log(`Express HTTP server is running at http://localhost:${PORT}`);
});

// 定义一个 API 接口查询数据库
expressApp.get('/api/users', (req:any, res:any) => {
  db.all('SELECT * FROM user', [], (err:any, rows:any) => {
    if (err) {
      console.log(req)
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows); // 返回查询结果
  });
});

async function dbGet(): Promise<any> {
  // 创建 SQLite 数据库连接
  let db:any = null;

  try {
    db = await new Promise((resolve, reject) => {
      db = new sqlite3.Database(dbPath, (err: any) => {
        if (err) {
          console.error('无法连接数据库:', err.message);
          reject(err);
        } else {
          console.log('成功连接到 SQLite 数据库');
          resolve(db);
        }
      });
    });

    // 使用 db 对象进行数据库操作
    const rows = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM user', (err: any, rows: any) => {
        if (err) {
          console.error('查询失败:', err.message);
          reject(err);
        } else {
          console.log('查询结果:', rows);
          resolve(rows);
        }
      });
    });

    // 在这里关闭数据库连接
    await new Promise((resolve, reject) => {
      db.close((err: any) => {
        if (err) {
          console.error('关闭数据库连接失败:', err.message);
          reject(err);
        } else {
          console.log('成功关闭数据库连接',resolve);
          resolve('数据库连接已关闭');
        }
      });
    });

    return rows;
  } catch (error) {
    console.error('SQLite 操作出错:', error);
    throw error; // 向外抛出错误
  }
}

async function dbChange(SQL:string): Promise<any> {
  // 创建 SQLite 数据库连接
  let db:any = null;

  try {
    db = await new Promise((resolve, reject) => {
      db = new sqlite3.Database(dbPath, (err: any) => {
        if (err) {
          console.error('无法连接数据库:', err.message);
          reject(err);
        } else {
          console.log('成功连接到 SQLite 数据库');
          resolve(db);
        }
      });
    });

    // 使用 db 对象进行数据库操作
    const rows = await new Promise((resolve, reject) => {
      db.all(SQL, (err: any, rows: any) => {
        if (err) {
          console.error('添加失败:', err.message);
          reject(err);
        } else {
          console.log('添加成功', rows);
          resolve(rows);
        }
      });
    });

    // 在这里关闭数据库连接
    await new Promise((resolve, reject) => {
      db.close((err: any) => {
        if (err) {
          console.error('关闭数据库连接失败:', err.message);
          reject(err);
        } else {
          console.log('成功关闭数据库连接',resolve);
          resolve('数据库连接已关闭');
        }
      });
    });

    return rows;
  } catch (error) {
    console.error('SQLite 操作出错:', error);
    throw error; // 向外抛出错误
  }
}

// ------------------------------------
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
              message: '大胆我真想给你🔪了1.0.4必须🔪🔪🔪🔪了你',
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

  
  ipcMain.on('openFlyCar', () => {
    dbGet().then(rows => {
      console.log('Fetched rows:', rows);
      if (mainWindow) {
        mainWindow.webContents.send('add', rows)
      }
    }).catch(error => {
      console.error('Error fetching rows:', error);
    });
  })

  ipcMain.on('changeSQ', (event,SQL) => {
    console.log(event)
    dbChange(SQL).then(rows => {
      console.log('Fetched rows:', rows);
      // if (mainWindow) {
      //   mainWindow.webContents.send('add', rows)
      // }
      dbGet().then(rows => {
        console.log('Fetched rows:', rows);
        if (mainWindow) {
          mainWindow.webContents.send('add', rows)
        }
      }).catch(error => {
        console.error('Error fetching rows:', error);
      });
    }).catch(error => {
      console.error('Error fetching rows:', error);
    });
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


