import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabaseSync('oilchange.db');

export function initDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      current_km INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS maintenances (
      id TEXT PRIMARY KEY NOT NULL,
      vehicle_id TEXT NOT NULL,
      type TEXT NOT NULL,
      last_km INTEGER NOT NULL,
      interval_km INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
    );
  `);
}

export {db}