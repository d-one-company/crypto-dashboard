import { BadgeDollarSign, Bolt, Brush, CircleHelp, Folders, Home, Landmark, Rows2, ThumbsUp, Vault } from 'lucide-react';
import Profile from './Profile';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  return (
    <aside className="sticky top-0 col-span-1 hidden max-h-screen flex-col gap-14 px-6 py-8 sm:flex">
      <Profile />
      <div className="flex flex-col items-start gap-2">
        <p className="px-3 text-sm text-gray-jumbo">MENU</p>
        <SidebarItem icon={<Home />} label="Dashboard" href="/" />
        <SidebarItem icon={<Vault />} label="Portfolio" href="/portfolio" />
        <SidebarItem icon={<Rows2 />} label="Market" href="/market" />
        <SidebarItem icon={<BadgeDollarSign />} label="Exchanges" href="/exchanges" />
      </div>
      <div className="pointer-events-none flex flex-col items-start gap-2">
        <p className="px-3 text-sm text-gray-jumbo">MORTGAGE</p>
        <SidebarItem icon={<Folders />} label="All files" href="/files" />
        <SidebarItem icon={<ThumbsUp />} label="Rewards" href="/rewards" />
        <SidebarItem icon={<Landmark />} label="My loans" href="/loans" />
      </div>
      <div className="pointer-events-none flex flex-col items-start gap-2">
        <SidebarItem icon={<Bolt />} label="Settings" href="/settings" />
        <SidebarItem icon={<Brush />} label="Appearance" href="/appearance" />
        <SidebarItem icon={<CircleHelp />} label="Support" href="/support" />
      </div>
    </aside>
  );
};

export default Sidebar;
