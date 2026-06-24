import api from './validacao';

export async function loginUsuario(dados) {
  const res = await api.post('/login', dados);
  return { status: res.status, data: res.data };
}

export async function cadastroUsuario(dados) {
  const res = await api.post('/cadastro', dados);
  return { status: res.status, data: res.data };
}

export async function listarLivros() {
  const res = await api.get('/livros');
  return { status: res.status, data: res.data };
}

export async function cadastrarLivro(dados) {
  const payload = {
    ...dados,
    ano: dados.ano ?? dados.ano_publicacao ?? ''
  };

  const res = await api.post('/livros/cadastrar', payload);
  return { status: res.status, data: res.data };
}

export async function listarLeitores() {
  const res = await api.get('/leitores');
  return { status: res.status, data: res.data };
}

export async function cadastrarLeitor(dados) {
  const res = await api.post('/leitores/cadastrar', dados);
  return { status: res.status, data: res.data };
}

export async function listarEmprestimos() {
  const res = await api.get('/emprestimos');
  return { status: res.status, data: res.data };
}

export async function cadastrarEmprestimo(dados) {
  const res = await api.post('/emprestimos/cadastrar', dados);
  return { status: res.status, data: res.data };
}

export async function devolverEmprestimo(id) {
  const res = await api.put(`/emprestimos/devolver/${id}`);
  return { status: res.status, data: res.data };
}
