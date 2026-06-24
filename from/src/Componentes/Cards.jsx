function Cards({ livro }) {
  return (
    <div className="bg-[#0b1220] p-4 rounded-lg border border-gray-800 shadow-md">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="font-semibold text-cyan-400">{livro.titulo}</h3>
          <p className="text-sm text-gray-400">{livro.autor}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${livro.status === 'Disponível' ? 'bg-green-500/20 text-green-400' : 'bg-pink-500/20 text-pink-400'}`}>
          {livro.status}
        </span>
      </div>
      <div className="mt-3 text-sm text-gray-300">
        <p>Categoria: {livro.categoria}</p>
        <p>Ano: {livro.ano_publicacao || '—'}</p>
      </div>
    </div>
  );
}

export default Cards;
