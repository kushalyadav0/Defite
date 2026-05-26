import { LogOut } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate('/');
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h2 className="text-2xl font-semibold">
        Dashboard
      </h2>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
      >
        <LogOut size={18} />

        Logout
      </button>
    </header>
  );
};

export default Navbar;