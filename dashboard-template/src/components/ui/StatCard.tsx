import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  subtitle?: string;
}

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-primary-600',
  iconBg = 'bg-primary-100',
  subtitle,
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      className="card-hover"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-navy-600 mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-display font-bold text-navy-900">{value}</h3>
            {change !== undefined && (
              <span
                className={`text-sm font-semibold ${
                  change >= 0 ? 'text-success' : 'text-error'
                }`}
              >
                {change >= 0 ? '+' : ''}
                {change}%
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-navy-500 mt-1">{subtitle}</p>}
        </div>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`${iconBg} ${iconColor} p-3 rounded-xl`}
        >
          <Icon className="w-6 h-6" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StatCard;
