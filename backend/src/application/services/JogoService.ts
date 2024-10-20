import { Jogo } from '../../domain/entities/Jogo';
import { connect } from '../../infrastructure/database/SQLiteDatabase';
import { gerarId } from '../../utils/IdGenerator';
import { LogService } from './LogService';
import { format, parse } from 'date-fns';

const logService = new LogService();

export class JogoService {
  async listarTodos(): Promise<Jogo[]> {
    const db = await connect();
    const jogos = await db.all('SELECT * FROM jogos');

    return jogos.map((jogo) => ({
      ...jogo,
      ano: format(new Date(jogo.ano), 'dd/MM/yyyy'),
    }));
  }

  async obterPorId(id: string): Promise<Jogo | null> {
    const db = await connect();
    const jogo = await db.get<Jogo>('SELECT * FROM jogos WHERE id = ?', [id]);
    await logService.registrarLog(id, 'obtenção');
    return jogo ?? null;
  }

  async criar(jogo: Omit<Jogo, 'id'>): Promise<string> {
    const db = await connect();
    const id = gerarId();
    const { nome, descricao, produtora, ano, idadeMinima } = jogo;

    const anoISO = parse(ano.toString(), 'dd/MM/yyyy', new Date());
    const anoFormatado = format(anoISO, 'yyyy-MM-dd');

    await db.run(
      'INSERT INTO jogos (id, nome, descricao, produtora, ano, idadeMinima) VALUES (?, ?, ?, ?, ?, ?)',
      [id, nome, descricao, produtora, anoFormatado, idadeMinima]
    );

    await logService.registrarLog(id, 'criação');
    return id;
  }

  async editar(jogo: Jogo): Promise<boolean> {
    const db = await connect();
    const { id, nome, descricao, produtora, ano, idadeMinima } = jogo;

    const result = await db.run(
      `UPDATE jogos SET nome = ?, descricao = ?, produtora = ?, ano = ?, idadeMinima = ? WHERE id = ?`,
      [nome, descricao, produtora, ano, idadeMinima, id]
    );
    const sucesso = (result.changes ?? 0) > 0;
    if (sucesso) await logService.registrarLog(id, 'edição');

    return sucesso;
  }

  async excluir(id: string): Promise<boolean> {
    const db = await connect();
    const result = await db.run('DELETE FROM jogos WHERE id = ?', [id]);

    const sucesso = (result.changes ?? 0) > 0;
    if (sucesso) await logService.registrarLog(id, 'exclusão');

    return sucesso;
  }
}
