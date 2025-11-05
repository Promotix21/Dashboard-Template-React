import { motion } from 'framer-motion';
import { Search, Filter, Download, Plus, MoreVertical, Mail, Phone, MapPin } from 'lucide-react';
import { customers } from '../../data/demoData';

const Customers = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-display font-bold text-navy-900 mb-2">Customers</h1>
          <p className="text-navy-600">Manage your customer database</p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Customer
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Customers', value: '1,834', change: '+12%', color: 'bg-primary-500' },
          { label: 'Active This Month', value: '1,245', change: '+8%', color: 'bg-teal-500' },
          { label: 'New This Week', value: '89', change: '+23%', color: 'bg-blue-500' },
          { label: 'Avg Lifetime Value', value: '$2,456', change: '+15%', color: 'bg-green-500' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <p className="text-sm text-navy-600 mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-display font-bold text-navy-900">{stat.value}</h3>
              <span className="text-sm font-semibold text-success">{stat.change}</span>
            </div>
            <div className={`w-full h-1 ${stat.color} rounded-full mt-3`}></div>
          </motion.div>
        ))}
      </div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              className="input pl-10"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </motion.button>
        </div>
      </motion.div>

      {/* Customers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cream-200">
                <th className="text-left py-4 px-4 text-sm font-semibold text-navy-700">
                  Customer
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-navy-700">
                  Contact
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-navy-700">
                  Location
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-navy-700">
                  Orders
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-navy-700">
                  Total Spent
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-navy-700">
                  Tags
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-navy-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="border-b border-cream-100 hover:bg-cream-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-navy-900">{customer.name}</p>
                        <p className="text-xs text-navy-500">{customer.lastSeen}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-navy-700">
                        <Mail className="w-4 h-4 text-navy-400" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-navy-700">
                        <Phone className="w-4 h-4 text-navy-400" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-sm text-navy-700">
                      <MapPin className="w-4 h-4 text-navy-400" />
                      <span>{customer.location}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-navy-900">{customer.orders}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-success">
                      ${customer.totalSpent.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {customer.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`badge ${
                            tag === 'VIP' || tag === 'Premium'
                              ? 'badge-primary'
                              : tag === 'Active'
                              ? 'badge-success'
                              : 'badge-teal'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg hover:bg-cream-100 transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-navy-600" />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-cream-200">
          <p className="text-sm text-navy-600">
            Showing <span className="font-semibold">1-{customers.length}</span> of{' '}
            <span className="font-semibold">1,834</span> customers
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg border border-navy-200 text-navy-700 hover:bg-cream-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors">
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Customers;
