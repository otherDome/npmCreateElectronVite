import sqlite3, { Database } from 'sqlite3';
import path  from 'node:path';;

// 创建一个类型来描述 rows 的结构
interface User {
  id: number;
  username: string;
  // 其他用户字段...
}

// 定义一个函数来创建数据库连接
function getDbInstance(dbPath: string): Database {
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('无法连接数据库:', err.message);
      return;
    }
    console.log('成功连接到 SQLite 数据库');
  });
  return db;
}

// 数据库路径
const dbPath = path.resolve(__dirname, 'users.sqlite');

// 创建数据库实例
const db = getDbInstance(dbPath);

// 导出一个方法来执行查询
export async function queryUsers(): Promise<User[]> {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users', (err, rows: User[]) => {
      if (err) {
        console.error('查询失败:', err.message);
        reject(err);
      } else {
        console.log('查询结果:', rows);
        resolve(rows);
      }
      db.close();
    });
  });
}