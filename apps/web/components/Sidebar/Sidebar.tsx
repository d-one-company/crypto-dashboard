import { BadgeDollarSign, Home, Rows2, Vault } from 'lucide-react';
import Profile from './Profile';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  return (
    <aside className="col-span-1 hidden flex-col gap-14 px-6 py-8 sm:flex">
      <Profile />
      <div className="flex flex-col items-start gap-2">
        <p className="px-3 text-sm text-gray-jumbo">MENU</p>
        <SidebarItem icon={<Home />} label="Dashboard" href="/" />
        <SidebarItem icon={<Vault />} label="Portfolio" href="/portfolio" />
        <SidebarItem icon={<Rows2 />} label="Market" href="/market" />
        <SidebarItem icon={<BadgeDollarSign />} label="Exchanges" href="/exchanges" />
      </div>
    </aside>
  );
};

export default Sidebar;
