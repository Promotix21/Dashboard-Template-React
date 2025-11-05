import { motion } from 'framer-motion';
import { Fingerprint, Eye, Target, ShieldCheck, TrendingUp } from 'lucide-react';
import { nitroXData } from '../../data/demoData';

const NitroX = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center text-white shadow-lg">
          <Fingerprint className="w-8 h-8" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-4xl font-display font-bold text-navy-900">Nitro X</h1>
            <span className="badge-teal">NEW</span>
          </div>
          <p className="text-navy-600">Privacy-first cookieless tracking & identification</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Visitors', value: nitroXData.totalVisitors.toLocaleString(), icon: Eye },
          { label: 'Identified Users', value: nitroXData.identifiedUsers.toLocaleString(), icon: Target },
          { label: 'High-Intent Users', value: nitroXData.highIntentUsers.toLocaleString(), icon: TrendingUp },
          { label: 'Consent Rate', value: `${nitroXData.consentRate}%`, icon: ShieldCheck },
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
              <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
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
          Recent High-Intent Users
        </h3>
        <div className="space-y-4">
          {nitroXData.recentHighIntentUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="p-4 rounded-lg bg-cream-50 hover:bg-cream-100 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-bold">
                    {user.score}
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900">{user.sessionId}</h4>
                    <p className="text-sm text-navy-600">
                      {user.location} • {user.device}
                    </p>
                  </div>
                </div>
                <span className="badge-success">{user.status}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-navy-500">Page Views:</span>{' '}
                  <span className="font-semibold">{user.pageViews}</span>
                </div>
                <div>
                  <span className="text-navy-500">Time on Site:</span>{' '}
                  <span className="font-semibold">{user.timeOnSite}</span>
                </div>
                <div>
                  <span className="text-navy-500">Intent Score:</span>{' '}
                  <span className="font-semibold text-success">{user.score}/100</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default NitroX;
