import { useAuth } from '../contexts/AuthContext';
import { Briefcase, LogOut } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Briefcase className="w-8 h-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-800">Job Portal</span>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => onNavigate('home')}
              className={`font-medium transition ${
                currentPage === 'home'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('jobs')}
              className={`font-medium transition ${
                currentPage === 'jobs' || currentPage === 'jobDetails' || currentPage === 'apply'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Jobs
            </button>
            {user && (
              <button
                onClick={handleSignOut}
                className="flex items-center text-gray-600 hover:text-red-600 font-medium transition"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
