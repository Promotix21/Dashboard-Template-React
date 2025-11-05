import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Zap,
  Megaphone,
  BarChart3,
  Sparkles,
  Settings,
  Plug,
} from 'lucide-react';
import { useSidebar } from '../../contexts/SidebarContext';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, section: null },
  { name: 'Conversations', href: '/conversations', icon: MessageSquare, badge: 12, section: null },
  { name: 'Customers', href: '/customers', icon: Users, section: 'customers' },
  { name: 'Automations', href: '/automations', icon: Zap, section: 'automations' },
  { name: 'Campaigns', href: '/campaigns', icon: Megaphone, section: null },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, section: null },
  { name: 'Nitro Suite', href: '/nitro-x', icon: Sparkles, badge: 'NEW', section: 'nitro-suite' },
  { name: 'Integrations', href: '/integrations', icon: Plug, section: null },
  { name: 'Settings', href: '/settings', icon: Settings, section: 'settings' },
];

const Sidebar = () => {
  const { activeSection, setActiveSection, isPinned } = useSidebar();

  const handleItemClick = (section: string | null) => {
    if (section) {
      if (activeSection === section && !isPinned) {
        setActiveSection(null);
      } else {
        setActiveSection(section);
      }
    } else {
      if (!isPinned) {
        setActiveSection(null);
      }
    }
  };

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 h-screen w-16 bg-gradient-to-b from-white to-cream-50 dark:from-navy-900 dark:to-navy-800 border-r border-cream-200 dark:border-navy-700 shadow-lg overflow-y-auto custom-scrollbar z-50"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-cream-200 dark:border-navy-700">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-glow cursor-pointer"
        >
          <Sparkles className="w-6 h-6 text-white" />
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="py-4 space-y-2">
        {navigation.map((item, index) => {
          const isSecondaryActive = activeSection === item.section && item.section !== null;

          return (
            <motion.div
              key={item.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="relative group px-2"
            >
              <NavLink
                to={item.href}
                onClick={() => handleItemClick(item.section)}
                className={({ isActive }) => {
                  const baseClasses = 'relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200';
                  const activeClasses = isActive || isSecondaryActive
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                    : 'text-navy-600 dark:text-cream-300 hover:bg-cream-100 dark:hover:bg-navy-700 hover:text-primary-600 dark:hover:text-primary-400';

                  return `${baseClasses} ${activeClasses}`;
                }}
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isActive || isSecondaryActive ? 'scale-110' : 'group-hover:scale-110'
                      }`}
                    />
                    {item.badge && (
                      <span
                        className={`absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] text-[10px] font-bold rounded-full ${
                          typeof item.badge === 'number'
                            ? 'bg-red-500 text-white px-1'
                            : 'bg-teal-400 text-white px-1.5'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>

              {/* Tooltip */}
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-navy-900 dark:bg-cream-50 text-white dark:text-navy-900 text-sm font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap pointer-events-none z-50">
                {item.name}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-navy-900 dark:border-r-cream-50"></div>
              </div>
            </motion.div>
          );
        })}
      </nav>

      {/* Bottom Upgrade Badge */}
      <div className="absolute bottom-4 left-2 right-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white cursor-pointer shadow-glow relative group"
        >
          <span className="text-xl font-bold">↑</span>

          {/* Tooltip */}
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-navy-900 dark:bg-cream-50 text-white dark:text-navy-900 text-sm font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap pointer-events-none z-50">
            Upgrade to Pro
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-navy-900 dark:border-r-cream-50"></div>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
