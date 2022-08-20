/* eslint-disable no-new */
import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import sequelize from './config/db';
import RouterController from './router/routes';

const app = express();

app.use(express.json());
app.use(cors());
new RouterController(app);

app.listen(process.env.APP_PORT, () => {
  sequelize.sync();
  console.log(`Executando na porta ${process.env.APP_PORT}`);
});
