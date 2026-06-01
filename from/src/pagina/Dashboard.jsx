import ListarLivros from '../Components/ListarLivros';
import Nav from '../Components/Nav';

function Dashboard() {
  return (
    <div className='grid grid-cols-[1fr_3fr] h-full'>
      <Nav />
      <ListarLivros />
    </div>
  )
}

export default Dashboard;