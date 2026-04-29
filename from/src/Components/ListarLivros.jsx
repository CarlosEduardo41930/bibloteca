function ListarLivros(){
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
          <tr className="border-b border-gray-800">
            <td className="py-3">Clean Code</td>
            <td>Robert Martin</td>
            <td>2008</td>
            <td className="text-green-400">Disponível</td>
            <td>
              <button className="bg-pink-500 px-3 py-1 rounded text-xs font-semibold hover:bg-pink-600">
                EMPRESTAR
              </button>
            </td>
          </tr>

          <tr>
            <td className="py-3">Refactoring</td>
            <td>Martin Fowler</td>
            <td>1999</td>
            <td className="text-red-400">Emprestado</td>
            <td>
              <button className="bg-gray-600 px-3 py-1 rounded text-xs font-semibold cursor-not-allowed">
                INDISPONÍVEL
              </button>
            </td>
          </tr>
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