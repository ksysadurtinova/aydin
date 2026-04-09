import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, Settings, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/saved', icon: Heart, label: 'Saved' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-primary">Aydin</h1>
            <ThemeToggle />
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === item.to
                    ? 'bg-primary text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            ))}
          </nav>
          {user && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={logout}
                className="w-full px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-64">
        <main className="flex-1">{children}</main>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <nav className="flex justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center p-2 text-xs font-medium transition-colors ${
                location.pathname === item.to
                  ? 'text-primary'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <item.icon className="w-6 h-6 mb-1" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}