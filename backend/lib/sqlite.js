const path = require('path');
const sqlite3 = require('sqlite3').verbose();

class SQLite {

    static instance = null;

    constructor() {
        this.dbPath = path.resolve(__dirname, '..', 'data', 'test_db.sqlite');
        this.db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) {
            console.error('Ошибка подключения к базе:', err.message);
        } else {
            console.log('Подключено к базе SQLite:', this.dbPath);
        }
        });
    }

    init() {
        this.db.serialize(() => {
        this.db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
            deleted_at TEXT
        )`);
        });
    }

    static getInstance() {
        if (!SQLite.instance) {
        SQLite.instance = new SQLite();
        }
        return SQLite.instance;
    }
}

module.exports = SQLite;
