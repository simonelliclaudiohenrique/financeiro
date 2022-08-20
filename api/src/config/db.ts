import { Sequelize } from 'sequelize-typescript';
import Despesas from '../models/despesas';
import Receita from '../models/receita';
import Usuarios from '../models/usuarios';

const sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  dialect: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  storage: ':memory:',
  models: [Usuarios, Receita, Despesas],
});
export default sequelize;
