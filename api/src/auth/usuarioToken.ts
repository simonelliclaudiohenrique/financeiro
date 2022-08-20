import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

export default function getUser(req: Request) {
  const token = String(req.headers.authorization);
  const payload: any = jwt.verify(token.replace('Bearer ', ''), process.env.APP_KEY);

  return payload.data.nome;
}
