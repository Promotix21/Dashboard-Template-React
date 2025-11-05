import { motion } from 'framer-motion';
import { Users2, TrendingUp, DollarSign, MousePointerClick } from 'lucide-react';
import { nitroCollabData } from '../../data/demoData';

const NitroCollab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl flex items-center justify-center text-white shadow-lg">
          <Users2 className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-display font-bold text-navy-900 mb-1">Nitro Collab</h1>
          <p className="text-navy-600">Affiliate & Influencer Marketing Platform</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Affiliates', value: nitroCollabData.totalAffiliates, icon: Users2 },
          { label: 'Total Clicks', value: nitroCollabData.totalClicks.toLocaleString(), icon: MousePointerClick },
          { label: 'Conversions', value: nitroCollabData.conversions.toLocaleString(), icon: TrendingUp },
          { label: 'Revenue Generated', value: `$${(nitroCollabData.revenue / 1000).toFixed(1)}K`, icon: DollarSign },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="card"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-navy-600 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-display font-bold text-navy-900">
                  {stat.value}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-teal-100 text-teal-600">
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <h3 className="text-lg font-display font-bold text-navy-900 mb-4">
          Top Performing Affiliates
        </h3>
        <div className="space-y-4">
          {nitroCollabData.topAffiliates.map((affiliate, index) => (
            <motion.div
              key={affiliate.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="p-4 rounded-lg bg-cream-50 hover:bg-cream-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-navy-900 mb-2">{affiliate.name}</h4>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-navy-500">Clicks:</span>{' '}
                      <span className="font-semibold">{affiliate.clicks.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-navy-500">Conversions:</span>{' '}
                      <span className="font-semibold">{affiliate.conversions.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-navy-500">Revenue:</span>{' '}
                      <span className="font-semibold text-success">
                        ${affiliate.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-navy-500">Commission:</span>{' '}
                      <span className="font-semibold text-primary-600">
                        ${affiliate.commission.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="badge-success">{affiliate.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default NitroCollab;
