import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, Moon, Shield } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white font-heading">
            Credibility Evaluation
          </h1>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`
            }
            end
          >
            Evaluate
          </NavLink>
          <NavLink 
            to="/batch" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`
            }
          >
            Batch Evaluation
          </NavLink>
          <NavLink 
            to="/history" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`
            }
          >
            History
          </NavLink>
          <NavLink 
            to="/knowledge" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`
            }
          >
            Knowledge Base
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`
            }
          >
            About
          </NavLink>
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;