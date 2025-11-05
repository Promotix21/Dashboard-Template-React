import { motion } from 'framer-motion';
import { Plus, Play, Pause, Copy, Trash2, TrendingUp, Zap, GitBranch, MessageSquare } from 'lucide-react';
import { automations } from '../../data/demoData';

const Automations = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-display font-bold text-navy-900 mb-2">Automations</h1>
          <p className="text-navy-600">Build powerful automated workflows</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Automation
        </motion.button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Automations', value: '24', icon: Zap, color: 'from-primary-500 to-primary-600' },
          { label: 'Active Flows', value: '18', icon: Play, color: 'from-green-500 to-green-600' },
          { label: 'Executions Today', value: '2,456', icon: TrendingUp, color: 'from-blue-500 to-blue-600' },
          { label: 'Success Rate', value: '96.5%', icon: GitBranch, color: 'from-teal-500 to-teal-600' },
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
                <h3 className="text-3xl font-display font-bold text-navy-900">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Templates Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <h3 className="text-lg font-display font-bold text-navy-900 mb-4">
          Popular Templates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'Welcome Series',
              description: 'Greet new customers with a warm welcome message',
              icon: '👋',
              color: 'from-blue-500 to-blue-600',
            },
            {
              name: 'Abandoned Cart',
              description: 'Recover lost sales with timely reminders',
              icon: '🛒',
              color: 'from-primary-500 to-primary-600',
            },
            {
              name: 'Birthday Wishes',
              description: 'Send personalized birthday messages',
              icon: '🎂',
              color: 'from-pink-500 to-pink-600',
            },
          ].map((template, index) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="p-6 rounded-xl bg-gradient-to-br from-white to-cream-50 border border-cream-200 cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-3">{template.icon}</div>
              <h4 className="font-display font-bold text-navy-900 mb-2">
                {template.name}
              </h4>
              <p className="text-sm text-navy-600 mb-4">{template.description}</p>
              <button className="text-sm text-primary-600 font-semibold hover:text-primary-700">
                Use Template →
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Automations List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="card"
      >
        <h3 className="text-lg font-display font-bold text-navy-900 mb-6">
          Your Automations
        </h3>
        <div className="space-y-4">
          {automations.map((automation, index) => (
            <motion.div
              key={automation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ x: 4 }}
              className="p-6 rounded-xl bg-gradient-to-r from-white to-cream-50 border border-cream-200 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-xl ${
                    automation.status === 'active'
                      ? 'bg-gradient-to-br from-green-500 to-green-600'
                      : 'bg-gradient-to-br from-gray-400 to-gray-500'
                  } text-white`}>
                    <Zap className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-display font-bold text-navy-900 text-lg">
                        {automation.name}
                      </h4>
                      <span
                        className={`badge ${
                          automation.status === 'active' ? 'badge-success' : 'badge-error'
                        }`}
                      >
                        {automation.status}
                      </span>
                    </div>
                    <p className="text-sm text-navy-600 mb-3">
                      Trigger: <span className="font-semibold">{automation.trigger}</span>
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-navy-500">Executions:</span>{' '}
                        <span className="font-semibold text-navy-900">
                          {automation.executions.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-navy-500">Success Rate:</span>{' '}
                        <span className="font-semibold text-success">
                          {automation.successRate}%
                        </span>
                      </div>
                      <div>
                        <span className="text-navy-500">Last Run:</span>{' '}
                        <span className="font-semibold text-navy-900">
                          {automation.lastRun}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg hover:bg-cream-100 transition-colors"
                    title={automation.status === 'active' ? 'Pause' : 'Resume'}
                  >
                    {automation.status === 'active' ? (
                      <Pause className="w-5 h-5 text-navy-600" />
                    ) : (
                      <Play className="w-5 h-5 text-navy-600" />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg hover:bg-cream-100 transition-colors"
                    title="Duplicate"
                  >
                    <Copy className="w-5 h-5 text-navy-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Visual Flow Builder Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="card bg-gradient-to-br from-navy-900 to-navy-800 text-white overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-display font-bold mb-2">
                Visual Flow Builder
              </h3>
              <p className="text-white/80">
                Create complex automations with our drag-and-drop canvas
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-navy-900 font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              Open Builder
            </motion.button>
          </div>

          {/* Simple Flow Visualization */}
          <div className="flex items-center gap-6 justify-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, type: 'spring' }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-glow mb-2">
                <Play className="w-8 h-8" />
              </div>
              <span className="text-xs">Trigger</span>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.7 }}
              className="w-12 h-1 bg-white/50"
            ></motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.9, type: 'spring' }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-glow-teal mb-2">
                <GitBranch className="w-8 h-8" />
              </div>
              <span className="text-xs">Condition</span>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.1 }}
              className="w-12 h-1 bg-white/50"
            ></motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.3, type: 'spring' }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg mb-2">
                <MessageSquare className="w-8 h-8" />
              </div>
              <span className="text-xs">Send Message</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Automations;
