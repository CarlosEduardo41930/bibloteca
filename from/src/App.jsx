import { useState } from "react";
import Login from './pagina/Login';
import Cadastro from './pagina/Cadastro';
import Dashboard from './pagina/Dashboard';

function App() {
  const [logado, setLogado] = useState(false);
  const [tela, setTela] = useState('login');

  return (
    <>
      {logado ? (
          <div>
            <Dashboard />
          </div>
      ) : (
        tela === 'login' ? (
          <Login setLogado={setLogado} setTela={setTela} />
        ) : (
          <Cadastro setTela={setTela} />
        )
      )}
    </>
  )
}

export default App;