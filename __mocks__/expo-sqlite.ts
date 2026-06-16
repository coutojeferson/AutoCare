import Database from 'better-sqlite3';

const db = new Database(':memory:');

const mockDb = {
  execSync: (sql: string) => {
    db.exec(sql);
  },
  getAllSync: (sql: string, params?: unknown[]) => {
    return db.prepare(sql).all(params ?? []);
  },
  runSync: (sql: string, params?: unknown[]) => {
    db.prepare(sql).run(params ?? []);
  },
};

export const openDatabaseSync = (_name: string) => mockDb;
export const clearDatabase = () => {
  db.exec('DELETE FROM maintenances; DELETE FROM vehicles;');
};