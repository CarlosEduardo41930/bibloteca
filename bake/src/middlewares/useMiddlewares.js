const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.autenticar = (req, res, next) => {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token) return res.status(403).json({ message: 'Nenhum token fornecido!' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido ou expirado!' });

    req.user = decoded;
    req.usuario = decoded;
    next();
  });
};