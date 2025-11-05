import { motion } from 'framer-motion';
import { Bell, Search, HelpCircle, Gift } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-cream-200 shadow-sm">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
            <input
              type="text"
              placeholder="Search customers, conversations, automations..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-navy-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all placeholder:text-navy-400"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3 ml-6">
          {/* What's New */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center gap-2 px-3 py-2 rounded-lg text-navy-600 hover:bg-cream-100 transition-colors"
          >
            <Gift className="w-5 h-5" />
            <span className="text-sm font-medium hidden lg:block">What's New</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-teal-400 rounded-full"></span>
          </motion.button>

          {/* Help */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg text-navy-600 hover:bg-cream-100 transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-lg text-navy-600 hover:bg-cream-100 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
          </motion.button>

          {/* Divider */}
          <div className="w-px h-8 bg-cream-200"></div>

          {/* User Profile */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-cream-100 transition-colors cursor-pointer"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-navy-900">Snehal Panchal</p>
              <p className="text-xs text-navy-500">Admin</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
              SP
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
