import express from 'express';
import LoginController from '../auth/login';
import HookAutenticacao from '../auth/verifyToken';
import DespesasControoler from '../controller/despesas';
import RecitasController from '../controller/receitaController';
import UsuariosController from '../controller/usuariosController';

class RouterController {
  constructor(app: express.Express) {
    const usuario = new UsuariosController();
    const login = new LoginController();
    const autenticacao = new HookAutenticacao();
    const receita = new RecitasController();
    const despesas = new DespesasControoler();

    // Rota de login e autenticação
    app.post('/login', login.login);
    app.get('*', autenticacao.checkAutenticate);

    // Rotas de crud de usuario
    app.get('/usuarios', usuario.listar);
    app.get('/usuarios/:id', usuario.exibir);
    app.post('/usuarios', usuario.inserir);
    app.delete('/usuarios/:id', usuario.excluir);
    app.put('/usuarios/:id', usuario.alterar);

    // Rotas de receitas financeira
    app.get('/receitas', receita.listar);
    app.get('/receitas/:id', receita.exibir);
    app.post('/receitas', receita.inserir);
    app.put('/receitas/:id', receita.aleterar);
    app.delete('/receitas/:id', receita.excluir);

    // Rotas de despesas
    app.get('/despesas', despesas.listar);
    app.get('/despesas/:id', despesas.exibir);
    app.post('/despesas', despesas.inserir);
    app.put('/despesas/:id', despesas.alterar);
    app.delete('/despesas/:id', despesas.excluir);
  }
}
export default RouterController;
