import { Request, Response } from 'express';
import { validate } from 'validate.js';
import Despesas from '../models/despesas';

class DespesasControoler {
  private validarCampos = {
    descricao: { presence: true, type: 'string' },
    observacao: { presence: true, type: 'string' },
    tipo: { presence: true, type: 'string' },
    data: { presence: true, type: 'string' },
    valor: { presence: true, type: 'number' },
  };

  public listar = async (req: Request, res: Response): Promise<Response> => {
    try {
      const registro = await Despesas.findAll();
      return res.json(registro);
    } catch (error) {
      return res.json({ erro: error.message });
    }
  };

  public exibir = async (req: Request, res: Response): Promise<Response> => {
    try {
      const registro = await Despesas.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!registro) throw new Error('Registro não encontrado!');

      return res.json(registro);
    } catch (error) {
      return res.json({ erro: error.message });
    }
  };

  public inserir = async (req: Request, res: Response): Promise<Response> => {
    try {
      const erro = validate(req.body, this.validarCampos);
      if (erro) return res.json(erro);

      await Despesas.create({
        descricao: req.body.descricao,
        observacao: req.body.observacao,
        tipo: req.body.tipo,
        data: req.body.data,
        valor: req.body.valor,
      });

      return res.json('Despesa cadastrada com sucesso!');
    } catch (error) {
      return res.json({ erro: error.message });
    }
  };

  public alterar = async (req: Request, res: Response): Promise<Response> => {
    try {
      const erro = validate(req.body, this.validarCampos);
      if (erro) return res.json(erro);

      const registro = await Despesas.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!registro) throw new Error('Registro não encontrado!');

      await Despesas.update(
        {
          descricao: req.body.descricao,
          observacao: req.body.descricao,
          tipo: req.body.tipo,
          data: req.body.data,
          valor: req.body.valor,
        },
        {
          where: {
            id: req.params.id,
          },
        },
      );

      return res.json('Registro alterado com sucesso!');
    } catch (error) {
      return res.json({ erro: error.message });
    }
  };

  public excluir = async (req: Request, res: Response): Promise<Response> => {
    try {
      const registro = await Despesas.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!registro) throw new Error('Registro não encontrado!');

      await registro.destroy();
      return res.json('Registro deletado com sucesso!');
    } catch (error) {
      return res.json({ erro: error.message });
    }
  };
}
export default DespesasControoler;
