import { useAuth } from '../context/AuthContext';
import { LogOut, Moon, Sun, BrainCircuit } from 'lucide-react'; // Added Brain icon
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-800">
      <div className="container px-6 py-4 mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <BrainCircuit size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Rare Minds
            </h1>
            <p className="text-xs text-gray-500 font-medium tracking-wider uppercase">
              Workspace • {user?.role}
            </p>
          </div>
        </div>
        
        {/* Right Side Controls */}
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-gray-500 rounded-full hover:bg-gray-100 transition-colors dark:text-gray-400 dark:hover:bg-gray-800"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="flex items-center gap-3 pl-6 border-l border-gray-200 dark:border-gray-700">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button 
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;