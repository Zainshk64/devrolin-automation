import { motion } from 'framer-motion';
import { FiTrendingUp, FiTarget, FiAward, FiActivity } from 'react-icons/fi';
import { theme } from '../styles/theme';

const PerformanceMetrics = () => {
  const metrics = [
    { label: 'View Rate', value: '65%', icon: FiTrendingUp, color: '#3B82F6' },
    { label: 'Interview Rate', value: '42%', icon: FiTarget, color: '#F59E0B' },
    { label: 'Hire Rate', value: '28%', icon: FiAward, color: '#10B981' },
    { label: 'Efficiency', value: '3.2x', icon: FiActivity, color: theme.colors.primary },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold" style={{ color: theme.colors.text }}>
        Performance Metrics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-xl"
            style={{ backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}` }}
          >
            <div className="flex items-center gap-4">
              <div
                className="p-4 rounded-xl"
                style={{ backgroundColor: `${metric.color}20` }}
              >
                <metric.icon size={24} style={{ color: metric.color }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                  {metric.label}
                </p>
                <p className="text-2xl font-bold" style={{ color: theme.colors.text }}>
                  {metric.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceMetrics;