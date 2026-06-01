const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.listarLivros = async (req, res) =>{
    try{
        const [rows] = await db.query("SELECT * FROM livros");
        res.json(rows);
    }catch (error) {
        res.status(500).json({erro: error.message});
    }
};

exports.loginUsuario = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(401).json({ erro: "Usuário não encontrado" });
        }
        const usuario = rows[0];
        const senhaHash = await bcrypt.compare(senha, usuario.password);
        if(senhaHash) {
            const token = jwt.sign({ email: usuario.email, nome: usuario.nome }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: "Login bem-sucedido", usuario, token });
        } else {
            res.status(401).json({ erro: "Senha incorreta" });
        }
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
};

exports.cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const senhaHash = await bcrypt.hash(senha, 10);

        await db.query("INSERT INTO usuarios (nome, email, password) VALUES (?, ?, ?)", [nome, email, senhaHash]);

        res.json({ message: "Usuário cadastrado com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
};

module.exports = exports;