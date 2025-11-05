import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Search,
  Filter,
  MessageSquare,
  Phone,
  Video,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  Clock,
  CheckCheck,
} from 'lucide-react';
import { conversations } from '../../data/demoData';

const Conversations = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);

  const mockMessages = [
    {
      id: 1,
      sender: 'customer',
      text: 'Hi! I wanted to check on my order status',
      timestamp: '10:30 AM',
      status: 'read',
    },
    {
      id: 2,
      sender: 'agent',
      text: 'Hello! I would be happy to help you with that. Can you please provide your order number?',
      timestamp: '10:31 AM',
      status: 'read',
    },
    {
      id: 3,
      sender: 'customer',
      text: 'Sure, its #ORD-2345',
      timestamp: '10:32 AM',
      status: 'read',
    },
    {
      id: 4,
      sender: 'agent',
      text: 'Thank you! Let me check that for you... Your order has been shipped and should arrive by tomorrow.',
      timestamp: '10:33 AM',
      status: 'read',
    },
    {
      id: 5,
      sender: 'customer',
      text: 'K thanks',
      timestamp: '10:35 AM',
      status: 'delivered',
    },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 animate-fade-in">
      {/* Conversations List */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-96 bg-white rounded-xl shadow-soft border border-cream-200 flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-cream-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-bold text-navy-900">Conversations</h2>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg hover:bg-cream-100 transition-colors"
              >
                <Filter className="w-5 h-5 text-navy-600" />
              </motion.button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-navy-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {conversations.map((conv, index) => (
            <motion.div
              key={conv.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedConversation(conv)}
              className={`p-4 border-b border-cream-100 cursor-pointer transition-colors ${
                selectedConversation.id === conv.id
                  ? 'bg-primary-50 border-l-4 border-l-primary-500'
                  : 'hover:bg-cream-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {conv.customer.initials}
                  </div>
                  {conv.channel === 'whatsapp' && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <MessageSquare className="w-3 h-3 text-white" />
                    </div>
                  )}
                  {conv.channel === 'instagram' && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-pink-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-navy-900 truncate">
                      {conv.customer.name}
                    </h4>
                    <span className="text-xs text-navy-500">{conv.timestamp}</span>
                  </div>
                  <p className="text-sm text-navy-600 truncate">{conv.lastMessage}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {conv.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`badge ${
                          tag === 'vip' ? 'badge-primary' : tag === 'urgent' ? 'badge-error' : 'badge-teal'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {conv.unread && (
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Chat Area */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 bg-white rounded-xl shadow-soft border border-cream-200 flex flex-col"
      >
        {/* Chat Header */}
        <div className="p-4 border-b border-cream-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
              {selectedConversation.customer.initials}
            </div>
            <div>
              <h3 className="font-semibold text-navy-900">
                {selectedConversation.customer.name}
              </h3>
              <div className="flex items-center gap-2 text-xs text-navy-500">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Active now</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-cream-100 transition-colors"
            >
              <Phone className="w-5 h-5 text-navy-600" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-cream-100 transition-colors"
            >
              <Video className="w-5 h-5 text-navy-600" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-cream-100 transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-navy-600" />
            </motion.button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
          {mockMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-md px-4 py-3 rounded-2xl ${
                  message.sender === 'agent'
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                    : 'bg-cream-100 text-navy-900'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div
                  className={`flex items-center gap-1 mt-1 text-xs ${
                    message.sender === 'agent' ? 'text-white/80' : 'text-navy-500'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span>{message.timestamp}</span>
                  {message.sender === 'agent' && (
                    <CheckCheck className="w-3 h-3 ml-1" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-cream-200">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-cream-100 transition-colors"
            >
              <Paperclip className="w-5 h-5 text-navy-600" />
            </motion.button>
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 rounded-lg border border-navy-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-cream-100 transition-colors"
            >
              <Smile className="w-5 h-5 text-navy-600" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Customer Info Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="w-80 bg-white rounded-xl shadow-soft border border-cream-200 p-6 overflow-y-auto custom-scrollbar"
      >
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-2xl mx-auto mb-3">
            {selectedConversation.customer.initials}
          </div>
          <h3 className="font-display font-bold text-navy-900 text-lg">
            {selectedConversation.customer.name}
          </h3>
          <p className="text-sm text-navy-500">Customer since Nov 2025</p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-navy-600 uppercase mb-2">
              Contact Info
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-navy-900">+91 81691 60174</p>
              <p className="text-navy-900">kavitasavla25@gmail.com</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-navy-600 uppercase mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              <span className="badge-primary">VIP</span>
              <span className="badge-success">Active</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-navy-600 uppercase mb-2">
              Recent Orders
            </h4>
            <div className="space-y-2">
              <div className="p-3 bg-cream-50 rounded-lg">
                <p className="text-sm font-semibold text-navy-900">#ORD-2345</p>
                <p className="text-xs text-navy-500">$234.50 • Delivered</p>
              </div>
              <div className="p-3 bg-cream-50 rounded-lg">
                <p className="text-sm font-semibold text-navy-900">#ORD-1234</p>
                <p className="text-xs text-navy-500">$156.00 • Delivered</p>
              </div>
            </div>
          </div>

          <button className="w-full btn-secondary text-sm">View Full Profile</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Conversations;
