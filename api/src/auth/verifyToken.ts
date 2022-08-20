import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default class HookAutenticacao {
  // eslint-disable-next-line consistent-return
  async checkAutenticate(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(`${req.headers.host} - ${req.method} - ${req.url}`);

      const token = String(req.headers.authorization).replace('Bearer ', '');

      jwt.verify(token, process.env.APP_KEY);

      next();
    } catch (error) {
      return res.status(401).json({ erro: error.message });
    }
  }
}
