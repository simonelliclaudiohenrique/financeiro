import {
  AutoIncrement, Column, Model, PrimaryKey, Table,
} from 'sequelize-typescript';

@Table
class Despesas extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
    id: number;

    @Column
      descricao: string;

    @Column
      observacao: string;

    @Column
      tipo: string;

    @Column
      data: Date;

      @Column
        valor: number;
}
export default Despesas;
