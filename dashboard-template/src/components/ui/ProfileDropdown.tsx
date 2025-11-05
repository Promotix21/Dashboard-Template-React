import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Settings,
  CreditCard,
  Users,
  HelpCircle,
  Keyboard,
  LogOut,
  ChevronRight,
} from 'lucide-react';

const menuItems = [
  { icon: User, label: 'View Profile', href: '/profile' },
  { icon: Settings, label: 'Account Settings', href: '/settings' },
  { icon: CreditCard, label: 'Billing & Plans', href: '/settings/billing', badge: 'Pro' },
  { icon: Users, label: 'Team Management', href: '/settings/team' },
  { divider: true },
  { icon: HelpCircle, label: 'Help & Support', href: '/help' },
  { icon: Keyboard, label: 'Keyboard Shortcuts', kbd: '⌘K' },
  { divider: true },
  { icon: LogOut, label: 'Log Out', danger: true },
];

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-cream-100 dark:hover:bg-navy-800 transition-colors cursor-pointer"
      >
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-navy-900 dark:text-cream-50">Snehal Panchal</p>
          <p className="text-xs text-navy-500 dark:text-navy-400">Admin</p>
        </div>
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
            SP
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-navy-950 rounded-full"></div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-white dark:bg-navy-900 rounded-xl shadow-lg border border-cream-200 dark:border-navy-800 overflow-hidden z-50"
          >
            {/* User Info */}
            <div className="p-4 border-b border-cream-200 dark:border-navy-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  SP
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-navy-900 dark:text-cream-50">
                    Snehal Panchal
                  </p>
                  <p className="text-xs text-navy-500 dark:text-navy-400">
                    snehal@nexara.com
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) =>
                item.divider ? (
                  <div
                    key={`divider-${index}`}
                    className="my-2 border-t border-cream-200 dark:border-navy-800"
                  />
                ) : (
                  <motion.button
                    key={index}
                    whileHover={{ x: 4 }}
                    onClick={() => {
                      if (item.label === 'Log Out') {
                        console.log('Logging out...');
                      }
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      item.danger
                        ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                        : 'text-navy-700 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-navy-800'
                    }`}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="badge-primary text-[10px] px-1.5 py-0.5">
                        {item.badge}
                      </span>
                    )}
                    {item.kbd && (
                      <span className="text-xs text-navy-400 dark:text-navy-500 font-mono">
                        {item.kbd}
                      </span>
                    )}
                    {item.href && <ChevronRight className="w-3 h-3 opacity-50" />}
                  </motion.button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
