import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, HelpCircle, Gift } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import NotificationDropdown from '../ui/NotificationDropdown';
import ProfileDropdown from '../ui/ProfileDropdown';
import GlobalSearch from '../ui/GlobalSearch';
import FullscreenToggle from '../ui/FullscreenToggle';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-navy-900/80 backdrop-blur-md border-b border-cream-200 dark:border-navy-700 shadow-sm">
        <div className="flex items-center justify-between px-8 py-4">
          {/* Search */}
          <div className="flex-1 max-w-xl">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg border border-navy-200 dark:border-navy-600 bg-white dark:bg-navy-800 hover:border-primary-400 dark:hover:border-primary-500 transition-all group"
            >
              <Search className="w-5 h-5 text-navy-400 dark:text-navy-500 group-hover:text-primary-500 transition-colors" />
              <span className="flex-1 text-left text-navy-400 dark:text-navy-500 text-sm">
                Search customers, conversations, automations...
              </span>
              <kbd className="hidden sm:flex items-center gap-0.5 px-2 py-1 text-xs font-mono text-navy-500 dark:text-navy-400 bg-cream-100 dark:bg-navy-700 rounded border border-navy-200 dark:border-navy-600">
                <span className="text-xs">⌘</span>K
              </kbd>
            </motion.button>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 ml-6">
            {/* What's New */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-2 px-3 py-2 rounded-lg text-navy-600 dark:text-cream-300 hover:bg-cream-100 dark:hover:bg-navy-700 transition-colors"
            >
              <Gift className="w-5 h-5" />
              <span className="text-sm font-medium hidden lg:block">What's New</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-teal-400 rounded-full">
                <span className="absolute inset-0 bg-teal-400 rounded-full animate-ping"></span>
              </span>
            </motion.button>

            {/* Help */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg text-navy-600 dark:text-cream-300 hover:bg-cream-100 dark:hover:bg-navy-700 transition-colors"
              title="Help & Support"
            >
              <HelpCircle className="w-5 h-5" />
            </motion.button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Fullscreen Toggle */}
            <FullscreenToggle />

            {/* Notifications */}
            <NotificationDropdown />

            {/* Divider */}
            <div className="w-px h-8 bg-cream-200 dark:bg-navy-700"></div>

            {/* User Profile */}
            <ProfileDropdown />
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
