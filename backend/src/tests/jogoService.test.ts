import { JogoService } from "../application/services/JogoService";
import { connectTestDB, createTestTables } from "../infrastructure/database/SQLiteTestDatabase";


describe('JogoService', () => {
  let jogoService: JogoService;
  let jogoId: string;

  beforeAll(async () => {
    const db = await connectTestDB();
    await createTestTables(db);

    jogoService = new JogoService();
  });

  it('deve criar um jogo com sucesso', async () => {
    const id = await jogoService.criar({
      nome: 'Jogo Criado',
      descricao: 'Um jogo criado para teste',
      produtora: 'Produtora Teste',
      ano: 2023,
      idadeMinima: 18,
    });

  expect(id).toMatch(/^IC\d{4}OM$/);
  const jogo = await jogoService.obterPorId(id);
    expect(jogo).toBeDefined();
    expect(jogo?.nome).toBe('Jogo Criado');

    jogoId = id;
  });

  it('deve listar todos os jogos', async () => {
    const jogos = await jogoService.listarTodos();
    expect(jogos.length).toBeGreaterThan(0);
  });

  it('deve obter um jogo pelo ID', async () => {
    const jogo = await jogoService.obterPorId(jogoId);
    expect(jogo).toBeDefined();
    expect(jogo?.nome).toBe('Jogo Criado');
  });

  it('deve editar um jogo com sucesso', async () => {
    const sucesso = await jogoService.editar({
      id: jogoId,
      nome: 'Jogo Atualizado',
      descricao: 'Descrição atualizada',
      produtora: 'Produtora XYZ',
      ano: 2023,
      idadeMinima: 10,
    });
    expect(sucesso).toBe(true);
  });

  it('deve excluir um jogo com sucesso', async () => {
    const sucesso = await jogoService.excluir(jogoId);
    expect(sucesso).toBe(true);
  });
});
