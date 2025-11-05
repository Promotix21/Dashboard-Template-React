import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const Integrations = () => {
  const integrations = [
    { name: 'WhatsApp Business API', status: 'connected', icon: '💬', color: 'from-green-500 to-green-600' },
    { name: 'Instagram', status: 'connected', icon: '📸', color: 'from-pink-500 to-pink-600' },
    { name: 'Facebook Messenger', status: 'connected', icon: '👤', color: 'from-blue-500 to-blue-600' },
    { name: 'Shopify', status: 'connected', icon: '🛍️', color: 'from-primary-500 to-primary-600' },
    { name: 'Stripe', status: 'available', icon: '💳', color: 'from-purple-500 to-purple-600' },
    { name: 'Razorpay', status: 'available', icon: '💰', color: 'from-teal-500 to-teal-600' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-display font-bold text-navy-900 mb-2">Integrations</h1>
        <p className="text-navy-600">Connect your favorite tools and platforms</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration, index) => (
          <motion.div
            key={integration.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="card"
          >
            <div className="flex items-start gap-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${integration.color} rounded-xl flex items-center justify-center text-3xl shadow-md`}>
                {integration.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display font-bold text-navy-900">
                    {integration.name}
                  </h3>
                  {integration.status === 'connected' && (
                    <CheckCircle className="w-5 h-5 text-success" />
                  )}
                </div>
                <span
                  className={`badge ${
                    integration.status === 'connected' ? 'badge-success' : 'badge-primary'
                  }`}
                >
                  {integration.status}
                </span>
              </div>
            </div>
            {integration.status === 'available' && (
              <button className="w-full mt-4 btn-primary text-sm">
                Connect
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Integrations;
