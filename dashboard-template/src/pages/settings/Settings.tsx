import { motion } from 'framer-motion';
import { User, Bell, Shield, CreditCard } from 'lucide-react';

const Settings = () => {
  const sections = [
    { title: 'Profile', description: 'Manage your account settings', icon: User },
    { title: 'Notifications', description: 'Configure notification preferences', icon: Bell },
    { title: 'Security', description: 'Password and authentication', icon: Shield },
    { title: 'Billing', description: 'Manage subscription and billing', icon: CreditCard },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-display font-bold text-navy-900 mb-2">Settings</h1>
        <p className="text-navy-600">Manage your account and preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="card cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary-100 text-primary-600">
                <section.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-navy-900 mb-1">
                  {section.title}
                </h3>
                <p className="text-sm text-navy-600">{section.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
