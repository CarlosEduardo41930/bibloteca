import { Link, useNavigate, useLocation } from 'react-router-dom';

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const linkClass = (path) =>
    `p-3 rounded transition-colors ${
      isActive(path) ? 'bg-[#0b1220] text-cyan-400' : 'hover:bg-[#0b1220]'
    }`;

  return (
    <aside className="bg-[#111629] p-4 min-h-screen w-full md:w-72">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-cyan-400">LibManager</h1>
        <p className="text-sm text-gray-400">Gestão da biblioteca</p>
      </div>
      <nav className="flex flex-col gap-1">
        <p className="text-xs text-gray-500 uppercase tracking-wider px-3 mb-1 mt-2">Livros</p>
        <Link to="/livros" className={linkClass('/livros')}>Lista de Livros</Link>
        <Link to="/livros/cadastrar" className={linkClass('/livros/cadastrar')}>Cadastrar Livro</Link>

        <p className="text-xs text-gray-500 uppercase tracking-wider px-3 mb-1 mt-4">Leitores</p>
        <Link to="/leitores" className={linkClass('/leitores')}>Lista de Leitores</Link>
        <Link to="/leitores/cadastrar" className={linkClass('/leitores/cadastrar')}>Cadastrar Leitor</Link>

        <p className="text-xs text-gray-500 uppercase tracking-wider px-3 mb-1 mt-4">Empréstimos</p>
        <Link to="/emprestimos" className={linkClass('/emprestimos')}>Lista de Empréstimos</Link>
        <Link to="/emprestimos/cadastrar" className={linkClass('/emprestimos/cadastrar')}>Cadastrar Empréstimo</Link>

        <div className="mt-6 pt-4 border-t border-gray-800">
          <button
            type="button"
            onClick={handleLogout}
            className="p-3 rounded text-left w-full hover:bg-[#0b1220] text-red-400 transition-colors"
          >
            Sair
          </button>
        </div>
      </nav>
    </aside>
  );
}

export default Nav;