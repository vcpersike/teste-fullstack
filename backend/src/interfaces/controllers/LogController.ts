import { Request, Response } from 'express';
import { LogService } from '../../application/services/LogService';

const logService = new LogService();

export class LogController {
  async listarLogs(req: Request, res: Response): Promise<void> {
    const logs = await logService.listarLogs();
    res.json(logs);
  }
}
