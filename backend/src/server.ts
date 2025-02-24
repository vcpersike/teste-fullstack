import express from 'express';
import cors from 'cors';
import jogoRoutes from './interfaces/routes/routes';
import { createTable } from './infrastructure/database/SQLiteDatabase';
import logRoutes from './interfaces/routes/logRoutes';

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(jogoRoutes);
app.use(logRoutes);

createTable().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});
