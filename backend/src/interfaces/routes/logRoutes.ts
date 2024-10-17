import { Router } from 'express';
import { LogController } from '../controllers/LogController';

const router = Router();
const logController = new LogController();

router.get('/api/logs', (req, res) => logController.listarLogs(req, res));

export default router;
