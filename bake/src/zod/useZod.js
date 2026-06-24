const { z } = require('zod');

exports.validacaoCadastro = z.object({
  email: z.string().trim().email('E-mail inválido'),
  senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  nome: z.string().trim().min(2, 'O nome deve ter pelo menos 2 caracteres').max(100, 'O nome deve ter no máximo 100 caracteres')
});

exports.validacaoLogin = z.object({
  email: z.string().trim().email('E-mail inválido'),
  senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
});

exports.validacaoLivro = z.object({
  titulo: z.string().trim().min(2, 'O título deve ter pelo menos 2 caracteres').max(100, 'O título deve ter no máximo 100 caracteres'),
  autor: z.string().trim().min(2, 'O nome do autor deve ter pelo menos 2 caracteres').max(100, 'O nome do autor deve ter no máximo 100 caracteres'),
  categoria: z.string().trim().min(2, 'Categoria não encontrada'),
  ano: z.coerce.number().int().min(1900).max(2100).optional().or(z.literal('')).or(z.string().optional()),
  image: z.string().trim().url('A imagem deve ser uma URL válida').optional().or(z.literal(''))
});

exports.validacaoLeitor = z.object({
  nome: z.string().trim().min(2, 'Informe o nome do leitor'),
  email: z.string().trim().email('E-mail inválido'),
  cpf: z.string().trim().min(11, 'CPF inválido'),
  tel: z.string().trim().optional().or(z.literal(''))
});

exports.validacaoEmprestimo = z.object({
  fk_leitor: z.coerce.number().int().positive(),
  fk_livro: z.coerce.number().int().positive(),
  data_para_devolucao: z.string().trim().min(1, 'Informe a data para devolução')
});

module.exports = exports;