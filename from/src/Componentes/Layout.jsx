import { Outlet } from 'react-router-dom';
import Nav from './Nav';

function Layout() {
  return (
    <div className="min-h-screen bg-[#050516] text-white">
      <div className="flex flex-col md:flex-row">
        <Nav />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
