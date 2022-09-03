import { Request, Response } from 'express';
import { validate } from 'validate.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Usuarios from '../models/usuarios';

class LoginController {
  private validarUsuario = {
    email: { presence: true, email: true },
    senha: { presence: true, type: 'string' },
  };

  public login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const erro = validate(req.body, this.validarUsuario);
      if (erro) return res.json({ erro: 'Email ou senha inválidos Verifique e tente novamente!' });

      const usuario = await Usuarios.findOne({
        where: {
          email: req.body.email,
        },
      });
      const compare = bcrypt.compareSync(req.body.senha, usuario.senha);
      if (!compare) return res.json({ erro: 'Usuario ou senha inválidos' });

      const token = jwt.sign({
        nome: usuario.nome,
        email: usuario.email,
      }, process.env.APP_KEY, { expiresIn: '7h' });

      return res.json({
        token,
        payload: {
          nome: usuario.nome,
          email: usuario.email,
        },
      });
    } catch (error) {
      return res.json({ erro: error.message });
    }
  };
}
export default LoginController;
