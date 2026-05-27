import Nav from './Components/Nav';
import Dashboard from './pagina/Dashboard';
// import Nav2 from './Components/Nav';

function App() {
  const [logado, setLogado] = useState(false);

  return (
    <>
      <div className='grid grid-cols-[1fr_3fr] h-full'>
        <Nav />
        <Dashboard />
      </div>
    </>
  )
}

export default App;