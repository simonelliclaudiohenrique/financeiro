import validate from 'validate.js';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import Usuarios from '../models/usuarios';

class UsuariosController {
  private validarUsuario = {
    nome: { presence: { allowEmpty: false, type: 'string' } },
    email: { presence: true, email: true },
    senha: { presence: { allowEmpty: false, type: 'string' } },
  };

  public listar = async (req: Request, res: Response): Promise<Response> => {
    try {
      const resgistro = await Usuarios.findAll();
      return res.json(resgistro.map((el) => ({
        nome: el?.nome,
        email: el?.email,
      })));
    } catch (error) {
      return res.json({ erro: error.message });
    }
  };

  public exibir = async (req: Request, res: Response): Promise<Response> => {
    try {
      const resgistro = await Usuarios.findOne({
        attributes: ['nome', 'email'],
        where: {
          id: req.params.id,
        },
      });
      if (!resgistro) throw new Error('Usuario não encontrado!');

      return res.json(resgistro);
    } catch (error) {
      return res.json({ erro: error.message });
    }
  };

  public inserir = async (req: Request, res: Response): Promise<Response> => {
    try {
      const erro = validate(req.body, this.validarUsuario);
      const encriptPassword = (password: any) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
      };
      if (erro) return res.status(400).json(erro);

      const resgistro = await Usuarios.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!resgistro) {
        await Usuarios.create({
          nome: req.body.nome,
          email: req.body.email,
          senha: encriptPassword(req.body.senha),
        });
      } else {
        throw Error('Usuário já cadastrado com este email!');
      }

      return res.json('Usuario inserido com sucesso!');
    } catch (error) {
      return res.json({ erro: error.message });
    }
  };

  public alterar = async (req: Request, res: Response): Promise<Response> => {
    try {
      const erro = validate(req.body, this.validarUsuario);
      const encriptPassword = (password: any) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
      };

      if (erro) return res.status(400).json(erro);
      if (!req.params.id) throw new Error('Usuario não informado');
      const resgistro = await Usuarios.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!resgistro) throw new Error('Usuario não encontrado!');

      const usuario = await Usuarios.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (usuario.id !== resgistro.id) throw new Error('Usuario já cadastrado com este email!');

      const novoUsuario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: encriptPassword(req.body.senha),
      };

      await Usuarios.update(novoUsuario, { where: { id: req.params.id } });

      return res.json('Usuario Alterado com sucesso');
    } catch (error) {
      return res.json({ erro: error.message });
    }
  };

  public excluir = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!req.params.id) throw new Error('Usuario não informado');
      const resgistro = await Usuarios.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!resgistro) throw new Error('Usuario não encontrado!');

      await resgistro.destroy();
      return res.json('Usuário removido com sucesso!');
    } catch (error) {
      return res.json({ erro: error.message });
    }
  };
}
export default UsuariosController;
