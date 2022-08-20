import {
  Column, Model, PrimaryKey, Table,
} from 'sequelize-typescript';

@Table
class Receitas extends Model {
  @PrimaryKey
  @Column
    id: number;

  @Column
    descricao: string;

  @Column
    observacao: string;

  @Column
    data: Date;

  @Column
    valor: number;
}
export default Receitas;
