import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

// Conectar ao banco de dados de teste
export async function connectTestDB(): Promise<Database> {
  return open({
    filename: ':memory:', // Banco em memória (apenas para testes)
    driver: sqlite3.Database,
  });
}

// Criar tabelas no banco de testes
export async function createTestTables(db: Database) {
  await db.exec(`
    CREATE TABLE jogos (
      id TEXT PRIMARY KEY,
      nome TEXT NOT NULL,
      descricao TEXT NOT NULL,
      produtora TEXT NOT NULL,
      ano INTEGER NOT NULL,
      idadeMinima INTEGER NOT NULL
    );

    CREATE TABLE logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      idjogo TEXT,
      acao TEXT NOT NULL,
      data TEXT NOT NULL,
      FOREIGN KEY (idjogo) REFERENCES jogos (id) ON DELETE SET NULL
    );
  `);
}
