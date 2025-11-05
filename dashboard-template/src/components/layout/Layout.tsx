import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import SecondarySidebar from './SecondarySidebar';
import Header from './Header';
import { useSidebar } from '../../contexts/SidebarContext';

const Layout = () => {
  const { activeSection } = useSidebar();

  return (
    <div className="min-h-screen gradient-bg dark:bg-gradient-to-b dark:from-navy-900 dark:to-navy-800">
      <Sidebar />
      <SecondarySidebar />
      <div className={`
        transition-all duration-300
        ml-0 lg:ml-16
        ${activeSection ? 'lg:ml-[344px]' : 'lg:ml-16'}
      `}>
        <Header />
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
