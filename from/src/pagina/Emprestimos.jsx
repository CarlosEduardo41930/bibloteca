import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { devolverEmprestimo, listarEmprestimos } from '../api/apisRotas';

function Emprestimos() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [mensagem, setMensagem] = useState('');

  const { data: respostaEmprestimos, isLoading, isError } = useQuery({
    queryKey: ['emprestimos'],
    queryFn: listarEmprestimos
  });

  const emprestimos = respostaEmprestimos?.data || [];

  // Formata data ISO para dd/mm/aaaa
  const formatarData = (data) => {
    if (!data) return '—';
    const d = new Date(data);
    if (isNaN(d.getTime())) return data;
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const devolverMutation = useMutation({
    mutationFn: (id) => devolverEmprestimo(id),
    onSuccess: (resposta) => {
      setMensagem(resposta.data.message || 'Livro devolvido com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['emprestimos'] });
      queryClient.invalidateQueries({ queryKey: ['livros'] });
      queryClient.invalidateQueries({ queryKey: ['leitores'] });
    },
    onError: () => {
      setMensagem('Erro ao devolver livro');
    }
  });

  return (
    <div className="space-y-8">
      {mensagem && (
        <div className="bg-[#0b1220] text-cyan-300 p-3 rounded border border-cyan-400/30">
          {mensagem}
        </div>
      )}

      <section className="bg-[#0b1220] p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-cyan-400">Empréstimos</h2>
            <p className="text-sm text-gray-400 mt-1">Controle de livros emprestados e devoluções</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{emprestimos.length} registros</span>
            <button
              onClick={() => navigate('/emprestimos/cadastrar')}
              className="bg-cyan-400 text-[#050516] font-semibold px-4 py-2 rounded hover:bg-cyan-300 transition"
            >
              + Novo Empréstimo
            </button>
          </div>
        </div>

        {isLoading ? (
          <p className="text-gray-400">Carregando empréstimos...</p>
        ) : isError ? (
          <p className="text-pink-400">Erro ao carregar os empréstimos.</p>
        ) : emprestimos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">Nenhum empréstimo registrado</p>
            <button
              onClick={() => navigate('/emprestimos/cadastrar')}
              className="bg-cyan-400 text-[#050516] font-semibold px-6 py-2 rounded hover:bg-cyan-300 transition"
            >
              Registrar primeiro empréstimo
            </button>
          </div>
        ) : (
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="text-left py-3 px-2">Leitor</th>
                  <th className="text-left py-3 px-2">Livro</th>
                  <th className="text-left py-3 px-2">Data Devolução</th>
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-left py-3 px-2">Ação</th>
                </tr>
              </thead>
              <tbody>
                {emprestimos.map((emprestimo) => (
                  <tr key={emprestimo.id} className="border-t border-gray-800 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-2 font-medium text-white">{emprestimo.leitor}</td>
                    <td className="py-3 px-2 text-gray-300">{emprestimo.livro}</td>
                    <td className="py-3 px-2 text-gray-300">{formatarData(emprestimo.data_para_devolucao)}</td>
                    <td className="py-3 px-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        emprestimo.status === 'EMPRESTADO'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {emprestimo.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      {emprestimo.status === 'EMPRESTADO' ? (
                        <button
                          onClick={() => devolverMutation.mutate(emprestimo.id)}
                          disabled={devolverMutation.isPending}
                          className="text-cyan-400 hover:underline disabled:opacity-50"
                        >
                          Marcar devolvido
                        </button>
                      ) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default Emprestimos;