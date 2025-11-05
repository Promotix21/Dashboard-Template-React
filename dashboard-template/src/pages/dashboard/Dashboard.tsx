import { motion } from 'framer-motion';
import {
  MessageSquare,
  Users,
  Clock,
  DollarSign,
  Zap,
  BarChart3,
} from 'lucide-react';
import StatCard from '../../components/ui/StatCard';
import { stats, conversations, analyticsData } from '../../data/demoData';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#FF7F11', '#00BCD4', '#3B82F6', '#10B981'];

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-display font-bold text-navy-900 mb-2">
            Welcome back, <span className="text-gradient">Snehal!</span>
          </h1>
          <p className="text-navy-600">
            Here's what's happening with your business today
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary"
        >
          Download Report
        </motion.button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Conversations"
          value={stats.totalConversations.toLocaleString()}
          change={15.3}
          icon={MessageSquare}
          iconColor="text-primary-600"
          iconBg="bg-primary-100"
        />
        <StatCard
          title="Active Customers"
          value={stats.activeUsers.toLocaleString()}
          change={8.2}
          icon={Users}
          iconColor="text-teal-600"
          iconBg="bg-teal-100"
        />
        <StatCard
          title="Revenue This Month"
          value={`$${(stats.revenue / 1000).toFixed(1)}K`}
          change={stats.growthRate}
          icon={DollarSign}
          iconColor="text-green-600"
          iconBg="bg-green-100"
        />
        <StatCard
          title="Avg Response Time"
          value={stats.avgResponseTime}
          change={-12.5}
          icon={Clock}
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
          subtitle="12.5% faster"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversation Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-display font-bold text-navy-900">
                Conversation Trends
              </h3>
              <p className="text-sm text-navy-500">Last 6 months</p>
            </div>
            <span className="badge-success">+23.5%</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData.conversationTrends}>
              <defs>
                <linearGradient id="colorConversations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF7F11" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FF7F11" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E7E9EF" />
              <XAxis dataKey="month" stroke="#6B76A3" />
              <YAxis stroke="#6B76A3" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E7E9EF',
                  borderRadius: '8px',
                }}
              />
              <Area
                type="monotone"
                dataKey="conversations"
                stroke="#FF7F11"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorConversations)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-display font-bold text-navy-900">
                Revenue Growth
              </h3>
              <p className="text-sm text-navy-500">Last 6 months</p>
            </div>
            <span className="badge-primary">Growing</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E7E9EF" />
              <XAxis dataKey="month" stroke="#6B76A3" />
              <YAxis stroke="#6B76A3" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E7E9EF',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="revenue" fill="#FF7F11" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages by Channel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h3 className="text-lg font-display font-bold text-navy-900 mb-6">
            Messages by Channel
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={analyticsData.messagesByChannel}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="messages"
              >
                {analyticsData.messagesByChannel.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Conversations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-display font-bold text-navy-900">
              Recent Conversations
            </h3>
            <button className="text-sm text-primary-600 font-semibold hover:text-primary-700">
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {conversations.map((conv, index) => (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-cream-50 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {conv.customer.initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-navy-900">
                      {conv.customer.name}
                    </h4>
                    <span
                      className={`badge ${
                        conv.channel === 'whatsapp'
                          ? 'badge-success'
                          : conv.channel === 'instagram'
                          ? 'badge-warning'
                          : 'badge-primary'
                      }`}
                    >
                      {conv.channel}
                    </span>
                  </div>
                  <p className="text-sm text-navy-600">{conv.lastMessage}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-navy-500">{conv.timestamp}</p>
                  {conv.unread && (
                    <span className="inline-block w-2 h-2 bg-primary-500 rounded-full mt-1"></span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="card"
      >
        <h3 className="text-lg font-display font-bold text-navy-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Zap, label: 'Create Automation', color: 'from-primary-500 to-primary-600' },
            { icon: MessageSquare, label: 'New Broadcast', color: 'from-teal-500 to-teal-600' },
            { icon: Users, label: 'Add Customer', color: 'from-blue-500 to-blue-600' },
            { icon: BarChart3, label: 'View Reports', color: 'from-green-500 to-green-600' },
          ].map((action, index) => (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className={`flex flex-col items-center gap-3 p-6 rounded-xl bg-gradient-to-br ${action.color} text-white shadow-md hover:shadow-lg transition-shadow`}
            >
              <action.icon className="w-8 h-8" />
              <span className="font-semibold text-sm">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
