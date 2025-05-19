const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role INTEGER DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS papers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    department TEXT,
    type TEXT,
    file_path TEXT,
    uploaded_by INTEGER,
    FOREIGN KEY(uploaded_by) REFERENCES users(id)
  )`);
});

db.serialize(() => {
  db.run('ALTER TABLE papers ADD COLUMN year INTEGER', (err) => {
    if (err) console.log("Year column already exists");
  });
  db.run('ALTER TABLE papers ADD COLUMN subject TEXT', (err) => {
    if (err) console.log("Subject column already exists");
  });
});

module.exports = db;
