import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Zap,
  Megaphone,
  BarChart3,
  Fingerprint,
  Users2,
  Plug,
  Settings,
  Sparkles,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Conversations', href: '/conversations', icon: MessageSquare, badge: 12 },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Automations', href: '/automations', icon: Zap },
  { name: 'Campaigns', href: '/campaigns', icon: Megaphone },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Nitro X', href: '/nitro-x', icon: Fingerprint, badge: 'NEW' },
  { name: 'Nitro Collab', href: '/nitro-collab', icon: Users2 },
  { name: 'Integrations', href: '/integrations', icon: Plug },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar = () => {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-white to-cream-50 border-r border-cream-200 shadow-lg overflow-y-auto custom-scrollbar"
    >
      {/* Logo */}
      <div className="p-6 border-b border-cream-200">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-glow"
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-xl font-display font-bold text-gradient">SpurNitro</h1>
            <p className="text-xs text-navy-500">AI-Powered SaaS</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navigation.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                    : 'text-navy-600 hover:bg-cream-100 hover:text-primary-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isActive ? 'scale-110' : 'group-hover:scale-110'
                    }`}
                  />
                  <span className="font-medium flex-1">{item.name}</span>
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                        typeof item.badge === 'number'
                          ? isActive
                            ? 'bg-white text-primary-600'
                            : 'bg-primary-100 text-primary-700'
                          : isActive
                          ? 'bg-teal-400 text-white'
                          : 'bg-teal-100 text-teal-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Bottom card */}
      <div className="p-4 mt-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl p-4 text-white shadow-glow"
        >
          <h3 className="font-display font-bold text-sm mb-1">Upgrade to Pro</h3>
          <p className="text-xs text-white/80 mb-3">
            Unlock unlimited automations and AI credits
          </p>
          <button className="w-full bg-white text-primary-600 font-semibold text-sm py-2 rounded-lg hover:bg-cream-50 transition-colors">
            Upgrade Now
          </button>
        </motion.div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
