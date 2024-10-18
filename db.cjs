const sqlite3 = require('sqlite3').verbose();
import path from 'path';

const dbPath = path.resolve(__dirname, 'users.sqlite'); // 数据库路径
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('无法连接数据库:', err.message);
    return;
  }

  console.log('成功连接到 SQLite 数据库');
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('查询失败:', err.message);
    } else {
      console.log('查询结果:', rows);
    }
    db.close();
  });
});