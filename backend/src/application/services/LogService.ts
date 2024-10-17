import { connect } from '../../infrastructure/database/SQLiteDatabase';

export class LogService {
  async registrarLog(idjogo: string | null, acao: string): Promise<void> {
    const db = await connect();
    const data = new Date().toISOString(); // Armazena a data no formato ISO

    await db.run(
      'INSERT INTO logs (idjogo, acao, data) VALUES (?, ?, ?)',
      [idjogo, acao, data]
    );
  }

  async listarLogs(): Promise<any[]> {
    const db = await connect();
    return db.all('SELECT * FROM logs');
  }
}
