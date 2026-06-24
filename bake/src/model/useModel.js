const db = require('../config/db');

exports.login = async (email) => {
  const [resultado] = await db.query('SELECT * FROM bibliotecario WHERE email = ?', [email]);
  return resultado;
};

exports.verificarCadastro = async (email) => {
  const [resultado] = await db.query('SELECT id, email FROM bibliotecario WHERE email = ?', [email]);
  return resultado;
};

exports.cadastrarUsuario = async (email, senha, nome) => {
  const [resultado] = await db.query('INSERT INTO bibliotecario (email, senha, nome) VALUES (?, ?, ?)', [email, senha, nome]);
  return resultado;
};

exports.livros = async () => {
  const [resultado] = await db.query('SELECT id, titulo, autor, categoria, ano_publicacao, image FROM livros ORDER BY id DESC');
  return resultado;
};

exports.novoLivro = async (titulo, autor, categoria, ano, image) => {
  const [resultado] = await db.query(
    'INSERT INTO livros (titulo, autor, categoria, ano_publicacao, image) VALUES (?, ?, ?, ?, ?)',
    [titulo, autor, categoria, ano || null, image || null]
  );
  return resultado;
};

exports.listarLeitores = async () => {
  const [resultado] = await db.query('SELECT id, nome, email, cpf, tel, data_criacao FROM leitor ORDER BY id DESC');
  return resultado;
};

exports.novoLeitor = async (nome, email, cpf, tel) => {
  const [resultado] = await db.query('INSERT INTO leitor (nome, email, cpf, tel) VALUES (?, ?, ?, ?)', [nome, email, cpf, tel || null]);
  return resultado;
};

exports.listarEmprestimos = async () => {
  const [resultado] = await db.query(`
    SELECT e.id, e.fk_leitor, e.fk_livro, e.data_emprestimo, e.data_para_devolucao, e.data_devolvido, e.status, e.divida,
           l.nome AS leitor, liv.titulo AS livro
    FROM emprestimo e
    JOIN leitor l ON e.fk_leitor = l.id
    JOIN livros liv ON e.fk_livro = liv.id
    ORDER BY e.id DESC
  `);
  return resultado;
};

exports.novoEmprestimo = async (fk_leitor, fk_livro, data_para_devolucao) => {
  const [resultado] = await db.query(
    'INSERT INTO emprestimo (fk_leitor, fk_livro, data_emprestimo, data_para_devolucao, status, divida) VALUES (?, ?, CURDATE(), ?, ?, 0.00)',
    [fk_leitor, fk_livro, data_para_devolucao, 'EMPRESTADO']
  );
  return resultado;
};

exports.devolverEmprestimo = async (id) => {
  const [resultado] = await db.query('UPDATE emprestimo SET data_devolvido = CURDATE(), status = ? WHERE id = ?', ['DEVOLVIDO', id]);
  return resultado;
};

module.exports = exports;