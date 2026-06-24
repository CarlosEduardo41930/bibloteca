const sql = require('../model/useModel');
const z = require('../zod/useZod');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const validacao = z.validacaoLogin.safeParse({ email, senha });
    if (!validacao.success) {
      return res.status(400).json({ message: 'Dados de login inválidos!', errors: validacao.error.issues });
    }

    const rows = await sql.login(email);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    const user = rows[0];
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(400).json({ message: 'Senha incorreta!' });
    }

    const token = jwt.sign({ usuario: user.nome, id: user.id }, process.env.JWT_SECRET, { expiresIn: '5h' });
    return res.status(200).json({ message: 'Login realizado com sucesso!', token, dados: user.nome });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.cadastro = async (req, res) => {
  const { email, senha, nome } = req.body;

  try {
    const validacao = z.validacaoCadastro.safeParse({ email, senha, nome });
    if (!validacao.success) {
      return res.status(400).json({ message: 'Dados de cadastro inválidos!', errors: validacao.error.issues });
    }

    const verificar = await sql.verificarCadastro(email);
    if (verificar.length > 0) {
      return res.status(409).json({ message: 'E-mail já cadastrado!' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const dados = await sql.cadastrarUsuario(email, senhaHash, nome);
    const token = jwt.sign({ usuario: nome, id: dados.insertId }, process.env.JWT_SECRET, { expiresIn: '5h' });

    return res.status(200).json({ message: 'Cadastro realizado com sucesso!', token, dados: nome });
  } catch (error) {
    console.error('Erro ao validar cadastro:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.listarLivros = async (req, res) => {
  try {
    const rows = await sql.livros();
    if (!rows || rows.length === 0) {
      return res.status(204).json({ message: 'vazio' });
    }
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

exports.novoLivro = async (req, res) => {
  const { titulo, autor, categoria, ano, ano_publicacao, image } = req.body;
  const anoLivro = ano ?? ano_publicacao ?? null;

  try {
    const validacao = z.validacaoLivro.safeParse({ titulo, autor, categoria, ano: anoLivro, image });
    if (!validacao.success) {
      return res.status(400).json({ message: 'Dados de cadastro do livro inválidos!', errors: validacao.error.issues });
    }

    await sql.novoLivro(titulo, autor, categoria, anoLivro, image);
    return res.status(200).json({ message: 'Cadastro de livro realizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao validar cadastro:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.listarLeitores = async (req, res) => {
  try {
    const rows = await sql.listarLeitores();
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

exports.novoLeitor = async (req, res) => {
  const { nome, email, cpf, tel } = req.body;

  try {
    const validacao = z.validacaoLeitor.safeParse({ nome, email, cpf, tel });
    if (!validacao.success) {
      return res.status(400).json({ message: 'Dados de cadastro do leitor inválidos!', errors: validacao.error.issues });
    }

    await sql.novoLeitor(nome, email, cpf, tel);
    return res.status(200).json({ message: 'Cadastro de leitor realizado com sucesso!' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.listarEmprestimos = async (req, res) => {
  try {
    const rows = await sql.listarEmprestimos();
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

exports.novoEmprestimo = async (req, res) => {
  const { fk_leitor, fk_livro, data_para_devolucao } = req.body;

  try {
    const validacao = z.validacaoEmprestimo.safeParse({ fk_leitor, fk_livro, data_para_devolucao });
    if (!validacao.success) {
      return res.status(400).json({ message: 'Dados de empréstimo inválidos!', errors: validacao.error.issues });
    }

    await sql.novoEmprestimo(fk_leitor, fk_livro, data_para_devolucao);
    return res.status(200).json({ message: 'Empréstimo realizado com sucesso!' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.devolverEmprestimo = async (req, res) => {
  try {
    const resultado = await sql.devolverEmprestimo(req.params.id);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Empréstimo não encontrado!' });
    }
    return res.status(200).json({ message: 'Livro devolvido com sucesso!' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
