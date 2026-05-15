const db = require('../config/db');

exports.listarLivros = async (req, res) =>{
    try{
        const [rows] = await db.query("SELECT * FROM livros");
        res.json(rows);
    }catch (error) {
        res.status(500).json({erro: error.message});
    }
};