import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  FileText,
  Settings,
  Mail,
  Boxes,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Products',
      path: '/products',
      icon: Boxes,
    },
    {
      name: 'Projects',
      path: '/projects',
      icon: FolderKanban,
    },
    {
      name: 'Testimonials',
      path: '/testimonials',
      icon: MessageSquare,
    },
    {
      name: 'CMS',
      path: '/cms',
      icon: FileText,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: Settings,
    },
    {
      name: 'Contacts',
      path: '/contacts',
      icon: Mail,
    },
  ];

  return (
    <aside className="w-64 bg-black text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        Admin Panel
      </h1>

      <nav className="space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                location.pathname === item.path
                  ? 'bg-white text-black'
                  : 'hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;