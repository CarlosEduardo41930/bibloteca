import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from './pagina/Login';
import Cadastro from './pagina/Cadastro';
import Layout from './Componentes/Layout';
import Livros from './pagina/Livros';
import CadastrarLivro from './pagina/CadastrarLivro';
import Leitores from './pagina/Leitores';
import CadastrarLeitor from './pagina/CadastrarLeitor';
import Emprestimos from './pagina/Emprestimos';
import CadastrarEmprestimo from './pagina/CadastrarEmprestimo';

const queryClient = new QueryClient();

function ProtectedRoute() {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Livros />} />
            <Route path="/livros" element={<Livros />} />
            <Route path="/livros/cadastrar" element={<CadastrarLivro />} />
            <Route path="/leitores" element={<Leitores />} />
            <Route path="/leitores/cadastrar" element={<CadastrarLeitor />} />
            <Route path="/emprestimos" element={<Emprestimos />} />
            <Route path="/emprestimos/cadastrar" element={<CadastrarEmprestimo />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;