import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { cadastrarLivro } from '../api/apisRotas';

function CadastrarLivro() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    titulo: '',
    autor: '',
    categoria: '',
    ano: '',
    image: ''
  });
  const [mensagem, setMensagem] = useState('');

  const mutation = useMutation({
    mutationFn: (dados) => cadastrarLivro(dados),
    onSuccess: (resposta) => {
      setMensagem(resposta.data.message || 'Livro cadastrado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['livros'] });
      setTimeout(() => navigate('/livros'), 1500);
    },
    onError: () => {
      setMensagem('Erro ao cadastrar livro');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensagem('');
    mutation.mutate(form);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <section className="bg-[#0b1220] p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-cyan-400">Cadastrar Livro</h2>
          <p className="text-sm text-gray-400 mt-1">Preencha os dados para adicionar um novo livro ao acervo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Título *</label>
            <input
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              placeholder="Ex: O Senhor dos Anéis"
              className="w-full p-2.5 rounded bg-[#050516] border border-gray-700 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Autor *</label>
            <input
              value={form.autor}
              onChange={(e) => setForm({ ...form, autor: e.target.value })}
              placeholder="Ex: J.R.R. Tolkien"
              className="w-full p-2.5 rounded bg-[#050516] border border-gray-700 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Categoria *</label>
            <input
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              placeholder="Ex: Fantasia, Romance, Ficção"
              className="w-full p-2.5 rounded bg-[#050516] border border-gray-700 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Ano de Publicação</label>
            <input
              value={form.ano}
              onChange={(e) => setForm({ ...form, ano: e.target.value })}
              placeholder="Ex: 1954"
              className="w-full p-2.5 rounded bg-[#050516] border border-gray-700 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">URL da Imagem</label>
            <input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="https://exemplo.com/capa.jpg"
              className="w-full p-2.5 rounded bg-[#050516] border border-gray-700 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition"
            />
          </div>

          {mensagem && (
            <div className={`p-3 rounded text-sm text-center ${
              mensagem.includes('sucesso') || mensagem.includes('Sucesso')
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
            }`}>
              {mensagem}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/livros')}
              className="flex-1 bg-gray-700 text-gray-300 p-2.5 rounded font-semibold hover:bg-gray-600 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex-1 bg-cyan-400 text-[#050516] p-2.5 rounded font-semibold hover:bg-cyan-300 transition disabled:opacity-50"
            >
              {mutation.isPending ? 'Cadastrando...' : 'Cadastrar Livro'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CadastrarLivro;