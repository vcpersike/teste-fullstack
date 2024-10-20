import { Request, Response } from 'express';
import { JogoService } from '../../application/services/JogoService';

const jogoService = new JogoService();

export class JogoController {
  async listarTodos(req: Request, res: Response): Promise<void> {
    const jogos = await jogoService.listarTodos();
    res.json(jogos);
  }

  async obterPorId(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const jogo = await jogoService.obterPorId(id);

    if (jogo) {
      res.json(jogo);
    } else {
      res.status(404).json({ error: `Jogo com ID ${id} não encontrado.` });
    }
  }

  async criar(req: Request, res: Response): Promise<void> {
    try {
      const jogoData = req.body;
      const id = await jogoService.criar(jogoData);
      res.status(201).json({ id });
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar jogo.' });
    }
  }

  async editar(req: Request, res: Response): Promise<void> {
    try {
      const jogoData = req.body;
      const sucesso = await jogoService.editar(jogoData);

      if (sucesso) {
        res.json(true);
      } else {
        res.status(404).json({ error: `Jogo com ID ${jogoData.id} não encontrado.` });
      }
    } catch (error) {
      res.status(400).json({ error: 'Erro ao editar jogo.' });
    }
  }

  async excluir(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const sucesso = await jogoService.excluir(id);

      if (sucesso) {
        res.json(true);
      } else {
        res.status(404).json({ error: `Jogo com ID ${id} não encontrado.` });
      }
    } catch (error) {
      res.status(400).json({ error: 'Erro ao excluir jogo.' });
    }
  }
}
