import { motion } from 'framer-motion';
import { FiClock, FiUser, FiEdit } from 'react-icons/fi';
import { theme } from '../styles/theme';

const ActivityLog = () => {
  const activities = [
    { user: 'John Doe', action: 'Updated job status to "Hired"', time: '2 mins ago', type: 'update' },
    { user: 'Jane Smith', action: 'Added new job "UI Designer"', time: '15 mins ago', type: 'create' },
    { user: 'Admin', action: 'Changed budget from $3000 to $5000', time: '1 hour ago', type: 'edit' },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'update': return FiEdit;
      case 'create': return FiUser;
      default: return FiClock;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold" style={{ color: theme.colors.text }}>
        Activity Log
      </h2>
      <div
        className="p-6 rounded-xl space-y-4"
        style={{ backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}` }}
      >
        {activities.map((activity, index) => {
          const Icon = getIcon(activity.type);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 pb-4 border-b last:border-b-0"
              style={{ borderColor: theme.colors.border }}
            >
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: theme.colors.secondaryLight }}
              >
                <Icon size={20} style={{ color: theme.colors.text }} />
              </div>
              <div className="flex-1">
                <p className="font-medium" style={{ color: theme.colors.text }}>
                  {activity.user}
                </p>
                <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                  {activity.action}
                </p>
                <p className="text-xs mt-1" style={{ color: theme.colors.textSecondary }}>
                  {activity.time}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityLog;