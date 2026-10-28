const Database = require('better-sqlite3');
const fs = require('node:fs');
const path = require('node:path');
const file = process.env.DB_PATH || path.join(__dirname, 'ecommerce.sqlite');
const db = new Database(file);
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');
db.exec(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'));
module.exports = db;
