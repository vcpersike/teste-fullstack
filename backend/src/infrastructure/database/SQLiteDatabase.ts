import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

export async function connect(): Promise<Database> {
  return open({
    filename: "./db.sqlite",
    driver: sqlite3.Database,
  });
}


export async function createTable() {
  const db = await connect();

  await db.run(`
    CREATE TABLE IF NOT EXISTS jogos (
      id TEXT PRIMARY KEY,
      nome TEXT NOT NULL,
      descricao TEXT NOT NULL,
      produtora TEXT NOT NULL,
      ano INTEGER NOT NULL,
      idadeMinima INTEGER NOT NULL
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      idjogo TEXT,
      acao TEXT NOT NULL,
      data TEXT NOT NULL,
      FOREIGN KEY (idjogo) REFERENCES jogos (id) ON DELETE SET NULL
    )
  `);

  console.log("Tabelas verificadas/criadas com sucesso.");
}
