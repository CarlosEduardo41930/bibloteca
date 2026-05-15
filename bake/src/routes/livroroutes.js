const express = require('express');
const router = express.Router();
const func = require('../controllers/livroControllers');

router.get('/livros', func.listarLivros);

module.exports = router;