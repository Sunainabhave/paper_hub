const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run('ALTER TABLE papers ADD COLUMN year INTEGER;', err => {
    if (err) console.log('year column:', err.message);
    else console.log('Added year column');
  });
  db.run('ALTER TABLE papers ADD COLUMN subject TEXT;', err => {
    if (err) console.log('subject column:', err.message);
    else console.log('Added subject column');
  });
});

db.close();
