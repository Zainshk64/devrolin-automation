import { motion } from 'framer-motion';
import { FiCheck, FiX, FiAlertCircle } from 'react-icons/fi';
import { theme } from '../styles/theme';

const AttendanceTracker = () => {
  const attendance = [
    { date: '2024-04-22', status: 'Present', reason: null },
    { date: '2024-04-21', status: 'Present', reason: null },
    { date: '2024-04-20', status: 'Absent', reason: 'Sick Leave' },
  ];

  const getStatusIcon = (status) => {
    return status === 'Present' ? FiCheck : FiX;
  };

  const getStatusColor = (status) => {
    return status === 'Present' ? '#10B981' : '#EF4444';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold" style={{ color: theme.colors.text }}>
        Attendance Tracker
      </h2>
      <div
        className="p-6 rounded-xl"
        style={{ backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}` }}
      >
        <div className="space-y-3">
          {attendance.map((day, index) => {
            const Icon = getStatusIcon(day.status);
            const color = getStatusColor(day.status);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ backgroundColor: theme.colors.background }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: theme.colors.text }}>
                      {day.date}
                    </p>
                    {day.reason && (
                      <p className="text-sm flex items-center gap-1" style={{ color: theme.colors.textSecondary }}>
                        <FiAlertCircle size={14} /> {day.reason}
                      </p>
                    )}
                  </div>
                </div>
                <span
                  className="px-3 py-1 rounded-lg text-sm font-medium"
                  style={{ backgroundColor: `${color}20`, color }}
                >
                  {day.status}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracker;