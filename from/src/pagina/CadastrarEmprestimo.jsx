import { useState, useRef, useEffect, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { cadastrarEmprestimo, listarLeitores, listarLivros } from '../api/apisRotas';

function CadastrarEmprestimo() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ fk_leitor: '', fk_livro: '', data_para_devolucao: '' });
  const [mensagem, setMensagem] = useState('');

  // Busca de leitor
  const [buscaLeitor, setBuscaLeitor] = useState('');
  const [leitorSelecionado, setLeitorSelecionado] = useState(null);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const dropdownRef = useRef(null);

  const { data: respostaLeitores } = useQuery({
    queryKey: ['leitores'],
    queryFn: listarLeitores
  });

  const { data: respostaLivros } = useQuery({
    queryKey: ['livros'],
    queryFn: listarLivros
  });

  const leitores = respostaLeitores?.data || [];
  const livros = respostaLivros?.data || [];

  // Filtra leitores disponíveis (sem livro emprestado) e pela busca
  const leitoresFiltrados = useMemo(() => {
    const disponiveis = leitores.filter((l) => !l.livro_emprestado);
    if (!buscaLeitor.trim()) return disponiveis;
    const termo = buscaLeitor.toLowerCase();
    return disponiveis.filter(
      (l) =>
        l.nome.toLowerCase().includes(termo) ||
        l.cpf.includes(termo) ||
        l.email.toLowerCase().includes(termo)
    );
  }, [leitores, buscaLeitor]);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownAberto(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selecionarLeitor = (leitor) => {
    setLeitorSelecionado(leitor);
    setForm({ ...form, fk_leitor: leitor.id });
    setBuscaLeitor('');
    setDropdownAberto(false);
  };

  const limparLeitor = () => {
    setLeitorSelecionado(null);
    setForm({ ...form, fk_leitor: '' });
    setBuscaLeitor('');
  };

  // Filtra livros disponíveis
  const livrosDisponiveis = livros.filter((l) => l.status === 'Disponível' || !l.status);

  const mutation = useMutation({
    mutationFn: (dados) => cadastrarEmprestimo(dados),
    onSuccess: (resposta) => {
      setMensagem(resposta.data.message || 'Empréstimo cadastrado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['emprestimos'] });
      queryClient.invalidateQueries({ queryKey: ['livros'] });
      queryClient.invalidateQueries({ queryKey: ['leitores'] });
      setTimeout(() => navigate('/emprestimos'), 1500);
    },
    onError: () => {
      setMensagem('Erro ao criar empréstimo');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensagem('');
    if (!form.fk_leitor) {
      setMensagem('Selecione um leitor');
      return;
    }
    mutation.mutate(form);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <section className="bg-[#0b1220] p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-cyan-400">Cadastrar Empréstimo</h2>
          <p className="text-sm text-gray-400 mt-1">Selecione o leitor, o livro e a data de devolução</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Seletor de Leitor com busca */}
          <div ref={dropdownRef} className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Leitor *</label>

            {leitorSelecionado ? (
              <div className="flex items-center gap-2 p-2.5 rounded bg-[#050516] border border-cyan-400/50">
                <div className="flex-1">
                  <p className="text-white font-medium">{leitorSelecionado.nome}</p>
                  <p className="text-xs text-gray-400">{leitorSelecionado.cpf} · {leitorSelecionado.email}</p>
                </div>
                <button
                  type="button"
                  onClick={limparLeitor}
                  className="text-gray-400 hover:text-red-400 transition-colors text-sm px-2"
                >
                  Trocar
                </button>
              </div>
            ) : (
              <input
                type="text"
                value={buscaLeitor}
                onChange={(e) => {
                  setBuscaLeitor(e.target.value);
                  setDropdownAberto(true);
                }}
                onFocus={() => setDropdownAberto(true)}
                placeholder="Buscar por nome, CPF ou e-mail..."
                className="w-full p-2.5 rounded bg-[#050516] border border-gray-700 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition"
              />
            )}

            {dropdownAberto && !leitorSelecionado && (
              <div className="absolute z-10 w-full mt-1 bg-[#050516] border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-auto">
                {leitoresFiltrados.length === 0 ? (
                  <p className="p-3 text-sm text-gray-400 text-center">
                    Nenhum leitor encontrado
                  </p>
                ) : (
                  leitoresFiltrados.map((leitor) => (
                    <button
                      key={leitor.id}
                      type="button"
                      onClick={() => selecionarLeitor(leitor)}
                      className="w-full text-left p-3 hover:bg-[#0b1220] transition-colors border-b border-gray-800 last:border-0"
                    >
                      <p className="text-white font-medium">{leitor.nome}</p>
                      <p className="text-xs text-gray-400">{leitor.cpf} · {leitor.email}</p>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Seletor de Livro */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Livro *</label>
            <select
              value={form.fk_livro}
              onChange={(e) => setForm({ ...form, fk_livro: e.target.value })}
              className="w-full p-2.5 rounded bg-[#050516] border border-gray-700 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition"
              required
            >
              <option value="">Selecione um livro disponível</option>
              {livrosDisponiveis.map((livro) => (
                <option key={livro.id} value={livro.id}>{livro.titulo} — {livro.autor}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {livrosDisponiveis.length} livro(s) disponível(is)
            </p>
          </div>

          {/* Data de devolução */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Data de Devolução *</label>
            <input
              type="date"
              value={form.data_para_devolucao}
              onChange={(e) => setForm({ ...form, data_para_devolucao: e.target.value })}
              className="w-full p-2.5 rounded bg-[#050516] border border-gray-700 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition"
              required
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
              onClick={() => navigate('/emprestimos')}
              className="flex-1 bg-gray-700 text-gray-300 p-2.5 rounded font-semibold hover:bg-gray-600 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex-1 bg-cyan-400 text-[#050516] p-2.5 rounded font-semibold hover:bg-cyan-300 transition disabled:opacity-50"
            >
              {mutation.isPending ? 'Reservando...' : 'Reservar Livro'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CadastrarEmprestimo;