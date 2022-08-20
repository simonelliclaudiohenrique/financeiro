import { Request, Response } from 'express';
import validate from 'validate.js';
import Receitas from '../models/receita';

class RecitasController {
  private validarCampos = {
    descricao: { presence: true, type: 'string' },
    observacao: { presence: true, type: 'string' },
    data: { presence: true, type: 'string' },
    valor: { presence: true, type: 'number' },
  };

  public listar = async (req: Request, res: Response): Promise<Response> => {
    try {
      const registros = await Receitas.findAll();

      return res.json(registros);
    } catch (error) {
      return res.json({ erro: error.message });
    }
  };

  public exibir = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!req.params.id) throw new Error('Receita não informada');

      const resgistro = await Receitas.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!resgistro) throw new Error('Registro não encontrado!');

      return res.json(resgistro);
    } catch (error) {
      return res.json({ erro: error.message });
    }
  };

  public inserir = async (req: Request, res: Response): Promise<Response> => {
    try {
      const erro = validate(req.body, this.validarCampos);
      if (erro) return res.json(erro);

      await Receitas.create({
        descricao: req.body.descricao,
        observacao: req.body.observacao,
        data: req.body.data,
        valor: req.body.valor,
      });

      return res.json('Receita inserida com sucesso');
    } catch (error) {
      return res.json({ erro: error.message });
    }
  };

  public aleterar = async (req: Request, res: Response): Promise<Response> => {
    try {
      const erro = validate(req.body, this.validarCampos);
      if (erro) return res.json(erro);

      const resgistro = await Receitas.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!resgistro) throw new Error('Registro não encontrado!');

      await Receitas.update({
        descricao: req.body.descricao,
        observacao: req.body.observacao,
        data: req.body.data,
        valor: req.body.valor,
      }, { where: { id: req.params.id } });

      return res.json('Registro alterado com sucesso!');
    } catch (error) {
      return res.json({ erro: error.message });
    }
  };

  public excluir = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!req.params.id) throw new Error('Receita não informada');
      const resgistro = await Receitas.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!resgistro) throw new Error('Registro não encontrado!');

      await resgistro.destroy();
      return res.json('Registro excluido com sucesso');
    } catch (error) {
      return res.json({ erro: error.message });
    }
  };
}
export default RecitasController;
