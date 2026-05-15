import { useEffect, useState } from "react";

function ListarLivros(){
  const [livros, setLivros] = useState([]);
  useEffect(() => {
    fetch('http://localhost:418/livros')
      .then(res => res.json())
      .then(data => setLivros(data))
      .catch(err => console.error('Erro ao carregar livros:', err));
  }, []);

    return (
  <div className="bg-[#050516] min-h-screen flex flex-col text-white p-8 gap-8">


    <div>
      <h1 className="text-3xl font-bold text-cyan-400 border-b border-cyan-400 pb-2">
        DASHBOARD DO BIBLIOTECÁRIO
      </h1>
    </div>


    <div className="bg-[#0b1220] w-full p-6 rounded-lg shadow-lg">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Acervo de Livros</h2>
        <p className="text-green-400 text-sm">84 livros cadastrados</p>
      </div>

      <table className="w-full text-sm text-left">
        <thead className="text-gray-400 border-b border-gray-700">
          <tr>
            <th className="py-2">Título</th>
            <th>Autor</th>
            <th>Ano</th>
            <th>Status</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>
          {livros.map(livro => (
            <tr key={livro.id} className="border-b border-gray-800">
              <td className="py-3">{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.ano}</td>
              <td className={livro.disponivel ? 'text-cyan-400' : 'text-pink-500'}>{livro.disponivel ? 'Disponível' : 'Emprestado'}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="flex gap-4 w-full">
      <div className="flex-1 border-l-4 border-cyan-400 pl-4 text-sm text-gray-300">
        <strong>Estética Tailwind:</strong> Cores sóbrias (cinza/azul) para sistemas administrativos.
      </div>

      <div className="flex-1 border-l-4 border-cyan-400 pl-4 text-sm text-gray-300">
        <strong>Dados Estruturados:</strong> Foco em tabelas para manipulação eficiente de informações.
      </div>
    </div>

  </div>
);
}
export default ListarLivros