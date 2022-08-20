import {
  Column, Model, PrimaryKey, Table,
} from 'sequelize-typescript';

@Table
class Usuarios extends Model {
  @PrimaryKey
  @Column
    id: number;

  @Column
    nome: string;

  @Column
    email: string;

  @Column
    senha: string;
}
export default Usuarios;
