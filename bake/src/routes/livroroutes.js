const express = require('express');
const router = express.Router();
const useControllers = require('../controllers/useControllers');
const { autenticar } = require('../middlewares/useMiddlewares');

router.post('/login', useControllers.loginUsuario);
router.post('/cadastro', useControllers.cadastro);

router.get('/livros', autenticar, useControllers.listarLivros);
router.post('/livros/cadastrar', autenticar, useControllers.novoLivro);
router.get('/leitores', autenticar, useControllers.listarLeitores);
router.post('/leitores/cadastrar', autenticar, useControllers.novoLeitor);
router.get('/emprestimos', autenticar, useControllers.listarEmprestimos);
router.post('/emprestimos/cadastrar', autenticar, useControllers.novoEmprestimo);
router.put('/emprestimos/devolver/:id', autenticar, useControllers.devolverEmprestimo);

module.exports = router;