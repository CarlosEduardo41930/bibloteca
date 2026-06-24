import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { cadastrarLeitor } from '../api/apisRotas';

function CadastrarLeitor() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ nome: '', email: '', cpf: '', tel: '' });
  const [mensagem, setMensagem] = useState('');

  const formatarCPF = (valor) => {
    const numeros = valor.replace(/\D/g, '').slice(0, 11);
    if (numeros.length <= 3) return numeros;
    if (numeros.length <= 6) return `${numeros.slice(0, 3)}.${numeros.slice(3)}`;
    if (numeros.length <= 9) return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`;
    return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9)}`;
  };

  const formatarTelefone = (valor) => {
    const numeros = valor.replace(/\D/g, '').slice(0, 11);
    if (numeros.length <= 2) return numeros.length ? `(${numeros}` : '';
    if (numeros.length <= 6) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    if (numeros.length <= 10) return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  };

  const handleCpfChange = (e) => {
    setForm({ ...form, cpf: formatarCPF(e.target.value) });
  };

  const handleTelChange = (e) => {
    setForm({ ...form, tel: formatarTelefone(e.target.value) });
  };

  const mutation = useMutation({
    mutationFn: (dados) => cadastrarLeitor(dados),
    onSuccess: (resposta) => {
      setMensagem(resposta.data.message || 'Leitor cadastrado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['leitores'] });
      setTimeout(() => navigate('/leitores'), 1500);
    },
    onError: () => {
      setMensagem('Erro ao cadastrar leitor');
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
          <h2 className="text-2xl font-semibold text-cyan-400">Cadastrar Leitor</h2>
          <p className="text-sm text-gray-400 mt-1">Preencha os dados para cadastrar um novo leitor</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Nome Completo *</label>
            <input
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              placeholder="Ex: João da Silva"
              className="w-full p-2.5 rounded bg-[#050516] border border-gray-700 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">E-mail *</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Ex: joao@email.com"
              className="w-full p-2.5 rounded bg-[#050516] border border-gray-700 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">CPF *</label>
            <input
              value={form.cpf}
              onChange={handleCpfChange}
              placeholder="000.000.000-00"
              maxLength={14}
              className="w-full p-2.5 rounded bg-[#050516] border border-gray-700 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Telefone</label>
            <input
              value={form.tel}
              onChange={handleTelChange}
              placeholder="(00) 00000-0000"
              maxLength={16}
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
              onClick={() => navigate('/leitores')}
              className="flex-1 bg-gray-700 text-gray-300 p-2.5 rounded font-semibold hover:bg-gray-600 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex-1 bg-cyan-400 text-[#050516] p-2.5 rounded font-semibold hover:bg-cyan-300 transition disabled:opacity-50"
            >
              {mutation.isPending ? 'Cadastrando...' : 'Cadastrar Leitor'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CadastrarLeitor;