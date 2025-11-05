import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-display font-bold text-navy-900 mb-2">Analytics</h1>
        <p className="text-navy-600">Track performance and insights</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$234.5K', icon: DollarSign, change: '+23%' },
          { label: 'Conversions', value: '1,234', icon: TrendingUp, change: '+12%' },
          { label: 'Active Users', value: '1,834', icon: Users, change: '+8%' },
          { label: 'Avg Order Value', value: '$189', icon: BarChart3, change: '+15%' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="card"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-navy-600 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-display font-bold text-navy-900">
                  {stat.value}
                </h3>
                <span className="text-sm font-semibold text-success">{stat.change}</span>
              </div>
              <div className="p-3 rounded-xl bg-primary-100 text-primary-600">
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
        className="card min-h-[400px] flex items-center justify-center"
      >
        <div className="text-center">
          <BarChart3 className="w-16 h-16 text-navy-400 mx-auto mb-4" />
          <h3 className="text-xl font-display font-bold text-navy-900 mb-2">
            Advanced Analytics Dashboard
          </h3>
          <p className="text-navy-600">
            Detailed charts and insights will be displayed here
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
