import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { listarLivros, listarEmprestimos } from '../api/apisRotas';
import { useMemo } from 'react';

function Livros() {
  const navigate = useNavigate();

  const { data: respostaLivros, isLoading, isError } = useQuery({
    queryKey: ['livros'],
    queryFn: listarLivros
  });

  const { data: respostaEmprestimos } = useQuery({
    queryKey: ['emprestimos'],
    queryFn: listarEmprestimos
  });

  const livros = respostaLivros?.data || [];
  const emprestimos = respostaEmprestimos?.data || [];

  // Cria um mapa de livros que estão emprestados no momento
  const livrosEmprestados = useMemo(() => {
    const mapa = {};
    emprestimos.forEach((emp) => {
      if (emp.status === 'EMPRESTADO') {
        // Marca por ID do livro (fk_livro) e também por título como fallback
        if (emp.fk_livro) mapa[emp.fk_livro] = emp;
        if (emp.livro) mapa[emp.livro] = emp;
      }
    });
    return mapa;
  }, [emprestimos]);

  // Determina o status real de cada livro
  const getStatusLivro = (livro) => {
    if (livrosEmprestados[livro.id] || livrosEmprestados[livro.titulo]) {
      const emp = livrosEmprestados[livro.id] || livrosEmprestados[livro.titulo];
      return {
        texto: 'Emprestado',
        classe: 'bg-yellow-500/20 text-yellow-400',
        leitor: emp.leitor || null
      };
    }
    if (livro.status && livro.status !== 'Disponível') {
      return {
        texto: livro.status,
        classe: 'bg-pink-500/20 text-pink-400',
        leitor: null
      };
    }
    return {
      texto: 'Disponível',
      classe: 'bg-green-500/20 text-green-400',
      leitor: null
    };
  };

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

  return (
    <div className="space-y-8">
      <section className="bg-[#0b1220] p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-cyan-400">Livros</h2>
            <p className="text-sm text-gray-400 mt-1">Acervo completo da biblioteca</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{livros.length} livros cadastrados</span>
            <button
              onClick={() => navigate('/livros/cadastrar')}
              className="bg-cyan-400 text-[#050516] font-semibold px-4 py-2 rounded hover:bg-cyan-300 transition"
            >
              + Novo Livro
            </button>
          </div>
        </div>

        {isLoading ? (
          <p className="text-gray-400">Carregando livros...</p>
        ) : isError ? (
          <p className="text-pink-400">Erro ao carregar os livros.</p>
        ) : livros.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">Nenhum livro cadastrado</p>
            <button
              onClick={() => navigate('/livros/cadastrar')}
              className="bg-cyan-400 text-[#050516] font-semibold px-6 py-2 rounded hover:bg-cyan-300 transition"
            >
              Cadastrar primeiro livro
            </button>
          </div>
        ) : (
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="text-left py-3 px-2">Título</th>
                  <th className="text-left py-3 px-2">Autor</th>
                  <th className="text-left py-3 px-2">Categoria</th>
                  <th className="text-left py-3 px-2">Ano</th>
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-left py-3 px-2">Emprestado para</th>
                </tr>
              </thead>
              <tbody>
                {livros.map((livro) => {
                  const status = getStatusLivro(livro);
                  return (
                    <tr key={livro.id} className="border-t border-gray-800 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-2 font-medium text-white">{livro.titulo}</td>
                      <td className="py-3 px-2 text-gray-300">{livro.autor}</td>
                      <td className="py-3 px-2 text-gray-300">{livro.categoria}</td>
                      <td className="py-3 px-2 text-gray-300">{livro.ano_publicacao || '—'}</td>
                      <td className="py-3 px-2">
                        <span className={`text-xs px-2 py-1 rounded ${status.classe}`}>
                          {status.texto}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-gray-300">
                        {status.leitor || '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default Livros;