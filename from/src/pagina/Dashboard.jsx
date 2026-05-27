import Nav from '../Components/Nav';
import ListarLivros from '../Components/ListarLivros';
// import Nav2 from './Components/Nav';

function Dashboard() {

  return (
    <>
      <div className='grid grid-cols-[1fr_3fr] h-full'>
        <Nav />
      <ListarLivros/>
      </div>
    </>
  )
}

export default Dashboard;