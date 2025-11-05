import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { campaigns } from '../../data/demoData';

const Campaigns = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-display font-bold text-navy-900 mb-2">Campaigns</h1>
          <p className="text-navy-600">Create and manage broadcast campaigns</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Campaign
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="card"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-display font-bold text-navy-900 text-lg">
                {campaign.name}
              </h3>
              <span
                className={`badge ${
                  campaign.status === 'active' ? 'badge-success' : 'badge-primary'
                }`}
              >
                {campaign.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-navy-600">Sent:</span>
                <span className="font-semibold text-navy-900">
                  {campaign.sent.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-navy-600">Opened:</span>
                <span className="font-semibold text-navy-900">
                  {campaign.opened.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-navy-600">Conversions:</span>
                <span className="font-semibold text-success">
                  {campaign.conversions.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-navy-600">Revenue:</span>
                <span className="font-semibold text-success">
                  ${campaign.revenue.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-cream-200">
              <p className="text-xs text-navy-500">Created {campaign.createdAt}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
