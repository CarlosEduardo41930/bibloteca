const express = require('express');
const router = express.Router();
const func = require('../controllers/livroControllers');


router.post('/login', func.loginUsuario);
router.post('/cadastro', func.cadastrarUsuario);
router.get('/livros', func.listarLivros);

module.exports = router;