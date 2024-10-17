import { Router } from 'express';
import { JogoController } from '../controllers/JogoController';

const router = Router();
const jogoController = new JogoController();

router.get('/api/jogo', (req, res) => jogoController.listarTodos(req, res));
router.get('/api/jogo/:id', (req, res) => jogoController.obterPorId(req, res));
router.post('/api/jogo', (req, res) => jogoController.criar(req, res));
router.put('/api/jogo', (req, res) => jogoController.editar(req, res));
router.delete('/api/jogo/:id', (req, res) => jogoController.excluir(req, res));


export default router;
