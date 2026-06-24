import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { listarLeitores } from '../api/apisRotas';

function Leitores() {
  const navigate = useNavigate();

  const { data: respostaLeitores, isLoading, isError } = useQuery({
    queryKey: ['leitores'],
    queryFn: listarLeitores
  });

  const leitores = respostaLeitores?.data || [];

  return (
    <div className="space-y-8">
      <section className="bg-[#0b1220] p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-cyan-400">Leitores</h2>
            <p className="text-sm text-gray-400 mt-1">Todos os leitores cadastrados no sistema</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{leitores.length} leitores</span>
            <button
              onClick={() => navigate('/leitores/cadastrar')}
              className="bg-cyan-400 text-[#050516] font-semibold px-4 py-2 rounded hover:bg-cyan-300 transition"
            >
              + Novo Leitor
            </button>
          </div>
        </div>

        {isLoading ? (
          <p className="text-gray-400">Carregando leitores...</p>
        ) : isError ? (
          <p className="text-pink-400">Erro ao carregar os leitores.</p>
        ) : leitores.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">Nenhum leitor cadastrado</p>
            <button
              onClick={() => navigate('/leitores/cadastrar')}
              className="bg-cyan-400 text-[#050516] font-semibold px-6 py-2 rounded hover:bg-cyan-300 transition"
            >
              Cadastrar primeiro leitor
            </button>
          </div>
        ) : (
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="text-left py-3 px-2">Nome</th>
                  <th className="text-left py-3 px-2">E-mail</th>
                  <th className="text-left py-3 px-2">CPF</th>
                  <th className="text-left py-3 px-2">Telefone</th>
                </tr>
              </thead>
              <tbody>
                {leitores.map((leitor) => (
                  <tr key={leitor.id} className="border-t border-gray-800 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-2 font-medium text-white">{leitor.nome}</td>
                    <td className="py-3 px-2 text-gray-300">{leitor.email}</td>
                    <td className="py-3 px-2 text-gray-300">{leitor.cpf}</td>
                    <td className="py-3 px-2 text-gray-300">{leitor.tel || '—'}</td>
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

export default Leitores;