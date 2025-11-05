import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from '../../contexts/SidebarContext';
import {
  Search,
  Plus,
  Download,
  Upload,
  Users,
  Target,
  Tag,
  CreditCard,
  Play,
  Pause,
  FileText,
  Clock,
  Fingerprint,
  Users2,
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Key,
  Plug,
  ScrollText,
  Pin,
  X
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const secondarySidebarContent: Record<string, any> = {
  customers: {
    title: 'Database',
    search: 'Search customers...',
    sections: [
      {
        items: [
          { icon: Users, label: 'All Contacts', href: '/customers' },
          { icon: Target, label: 'Segments', href: '/customers/segments' },
          { icon: FileText, label: 'Custom Fields', href: '/customers/fields' },
          { icon: Tag, label: 'Tags', href: '/customers/tags' },
          { icon: CreditCard, label: 'Paid Orders', href: '/customers/orders' },
        ],
      },
      {
        title: 'QUICK ACTIONS',
        items: [
          { icon: Plus, label: 'Add Customer', action: true },
          { icon: Upload, label: 'Import', action: true },
          { icon: Download, label: 'Export', action: true },
        ],
      },
    ],
  },
  automations: {
    title: 'Automations',
    search: 'Search automations...',
    sections: [
      {
        items: [
          { icon: FileText, label: 'All Automations', href: '/automations' },
          { icon: Play, label: 'Active (18)', href: '/automations?status=active' },
          { icon: Pause, label: 'Paused (6)', href: '/automations?status=paused' },
          { icon: Clock, label: 'Drafts (3)', href: '/automations?status=draft' },
          { icon: FileText, label: 'Templates', href: '/automations/templates' },
        ],
      },
      {
        title: 'RECENT',
        items: [
          { label: 'Welcome Series', href: '/automations/1', recent: true },
          { label: 'Abandoned Cart', href: '/automations/2', recent: true },
          { label: 'Birthday Campaign', href: '/automations/3', recent: true },
        ],
      },
      {
        items: [
          { icon: Plus, label: 'Create Automation', action: true, primary: true },
        ],
      },
    ],
  },
  'nitro-suite': {
    title: 'Nitro Suite',
    sections: [
      {
        items: [
          { icon: Fingerprint, label: 'Nitro X', sublabel: 'Cookieless Tracking', href: '/nitro-x' },
          { icon: Users2, label: 'Nitro Collab', sublabel: 'Affiliate Management', href: '/nitro-collab' },
        ],
      },
      {
        title: 'ANALYTICS',
        items: [
          { label: 'Combined Reports', href: '/nitro-suite/reports' },
          { label: 'Performance', href: '/nitro-suite/performance' },
        ],
      },
      {
        items: [
          { icon: SettingsIcon, label: 'Settings', href: '/nitro-suite/settings' },
        ],
      },
    ],
  },
  settings: {
    title: 'Settings',
    sections: [
      {
        title: 'ACCOUNT',
        items: [
          { icon: User, label: 'Profile', href: '/settings/profile' },
          { icon: Users, label: 'Team Members', href: '/settings/team' },
          { icon: CreditCard, label: 'Billing & Plans', href: '/settings/billing' },
        ],
      },
      {
        title: 'PREFERENCES',
        items: [
          { icon: Bell, label: 'Notifications', href: '/settings/notifications' },
          { label: 'Appearance', href: '/settings/appearance' },
          { label: 'Keyboard Shortcuts', href: '/settings/shortcuts' },
        ],
      },
      {
        title: 'ADVANCED',
        items: [
          { icon: Plug, label: 'Integrations', href: '/settings/integrations' },
          { icon: Key, label: 'API Keys', href: '/settings/api' },
          { icon: Shield, label: 'Security', href: '/settings/security' },
          { icon: ScrollText, label: 'Audit Logs', href: '/settings/audit' },
        ],
      },
    ],
  },
};

const SecondarySidebar = () => {
  const { activeSection, setActiveSection, isPinned, togglePin } = useSidebar();
  const content = activeSection ? secondarySidebarContent[activeSection] : null;

  const handleClose = () => {
    if (!isPinned) {
      setActiveSection(null);
    }
  };

  const handleLinkClick = () => {
    // Close secondary sidebar on mobile when clicking a link
    if (window.innerWidth < 1024 && !isPinned) {
      setActiveSection(null);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {content && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Secondary Sidebar */}
      <AnimatePresence>
        {content && (
          <motion.aside
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 lg:left-16 top-16 lg:top-0 h-[calc(100vh-4rem)] lg:h-screen w-[280px] bg-white dark:bg-navy-900 border-r border-cream-200 dark:border-navy-800 shadow-lg z-40 overflow-y-auto custom-scrollbar"
          >
          {/* Header */}
          <div className="p-4 border-b border-cream-200 dark:border-navy-800">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-bold text-navy-900 dark:text-cream-50">
                {content.title}
              </h2>
              <div className="flex items-center gap-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePin}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isPinned
                      ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400'
                      : 'hover:bg-cream-100 dark:hover:bg-navy-800 text-navy-600 dark:text-cream-300'
                  }`}
                  title={isPinned ? 'Unpin' : 'Pin sidebar'}
                >
                  <Pin className={`w-4 h-4 ${isPinned ? 'fill-current' : ''}`} />
                </motion.button>
                {!isPinned && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClose}
                    className="p-1.5 rounded-lg hover:bg-cream-100 dark:hover:bg-navy-800 text-navy-600 dark:text-cream-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </div>

            {/* Search */}
            {content.search && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 dark:text-navy-500" />
                <input
                  type="text"
                  placeholder={content.search}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-navy-900 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-primary-400 dark:focus:ring-primary-500 placeholder:text-navy-400 dark:placeholder:text-navy-500"
                />
              </div>
            )}
          </div>

          {/* Content Sections */}
          <div className="p-2">
            {content.sections.map((section: any, sectionIdx: number) => (
              <div key={sectionIdx} className="mb-4">
                {section.title && (
                  <div className="px-3 py-2 text-xs font-semibold text-navy-500 dark:text-navy-400 uppercase tracking-wider">
                    {section.title}
                  </div>
                )}
                <div className="space-y-1">
                  {section.items.map((item: any, itemIdx: number) => {
                    if (item.action) {
                      return (
                        <motion.button
                          key={itemIdx}
                          whileHover={{ x: 2 }}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                            item.primary
                              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 font-semibold'
                              : 'text-navy-700 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-navy-800'
                          }`}
                        >
                          {item.icon && <item.icon className="w-4 h-4" />}
                          <span>{item.label}</span>
                        </motion.button>
                      );
                    }

                    if (item.recent) {
                      return (
                        <NavLink
                          key={itemIdx}
                          to={item.href}
                          onClick={handleLinkClick}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-navy-600 dark:text-cream-300 hover:bg-cream-100 dark:hover:bg-navy-800 transition-colors"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>
                          <span>{item.label}</span>
                        </NavLink>
                      );
                    }

                    return (
                      <NavLink
                        key={itemIdx}
                        to={item.href}
                        onClick={handleLinkClick}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                            isActive
                              ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium'
                              : 'text-navy-700 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-navy-800'
                          }`
                        }
                      >
                        {item.icon && <item.icon className="w-4 h-4 flex-shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <div className={item.sublabel ? 'font-medium' : ''}>{item.label}</div>
                          {item.sublabel && (
                            <div className="text-xs text-navy-500 dark:text-navy-400">{item.sublabel}</div>
                          )}
                        </div>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
    </>
  );
};

export default SecondarySidebar;
