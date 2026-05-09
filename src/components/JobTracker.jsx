import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiClock, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import { theme } from '../styles/theme';

const JobTracker = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'React Developer',
      platform: 'Upwork',
      status: 'Hired',
      budget: 5000,
      connects: 16,
      appliedDate: '2024-04-15',
      hiredDate: '2024-04-20',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    platform: 'Upwork',
    status: 'Applied',
    budget: '',
    connects: '',
  });

  const statusColors = {
    Applied: theme.colors.secondary,
    Viewed: '#3B82F6',
    Interview: '#F59E0B',
    Hired: '#10B981',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setJobs([...jobs, { ...formData, id: Date.now(), appliedDate: new Date().toISOString().split('T')[0] }]);
    setFormData({ title: '', platform: 'Upwork', status: 'Applied', budget: '', connects: '' });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: theme.colors.text }}>
            Job Tracking
          </h2>
          <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
            Manage your job applications lifecycle
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 rounded-lg font-medium flex items-center gap-2"
          style={{ backgroundColor: theme.colors.primary, color: theme.colors.text }}
        >
          <FiPlus /> Add Job
        </motion.button>
      </div>

      {/* Add Job Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-6 rounded-xl"
          style={{ backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}` }}
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Job Title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="px-4 py-3 rounded-lg outline-none"
              style={{
                backgroundColor: theme.colors.background,
                border: `1px solid ${theme.colors.border}`,
                color: theme.colors.text,
              }}
            />
            <select
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className="px-4 py-3 rounded-lg outline-none"
              style={{
                backgroundColor: theme.colors.background,
                border: `1px solid ${theme.colors.border}`,
                color: theme.colors.text,
              }}
            >
              <option>Upwork</option>
              <option>Fiverr</option>
              <option>Freelancer</option>
            </select>
            <input
              type="number"
              placeholder="Budget ($)"
              required
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="px-4 py-3 rounded-lg outline-none"
              style={{
                backgroundColor: theme.colors.background,
                border: `1px solid ${theme.colors.border}`,
                color: theme.colors.text,
              }}
            />
            <input
              type="number"
              placeholder="Connects Used"
              required
              value={formData.connects}
              onChange={(e) => setFormData({ ...formData, connects: e.target.value })}
              className="px-4 py-3 rounded-lg outline-none"
              style={{
                backgroundColor: theme.colors.background,
                border: `1px solid ${theme.colors.border}`,
                color: theme.colors.text,
              }}
            />
            <button
              type="submit"
              className="md:col-span-2 px-6 py-3 rounded-lg font-medium"
              style={{ backgroundColor: theme.colors.primary, color: theme.colors.text }}
            >
              Submit Job
            </button>
          </form>
        </motion.div>
      )}

      {/* Jobs List */}
      <div className="grid grid-cols-1 gap-4">
        {jobs.map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl"
            style={{ backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}` }}
          >
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2" style={{ color: theme.colors.text }}>
                  {job.title}
                </h3>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span
                    className="px-3 py-1 rounded-lg font-medium"
                    style={{ backgroundColor: statusColors[job.status], color: '#fff' }}
                  >
                    {job.status}
                  </span>
                  <span className="flex items-center gap-1" style={{ color: theme.colors.textSecondary }}>
                    <FiDollarSign /> ${job.budget}
                  </span>
                  <span className="flex items-center gap-1" style={{ color: theme.colors.textSecondary }}>
                    <FiTrendingUp /> {job.connects} Connects
                  </span>
                  <span className="flex items-center gap-1" style={{ color: theme.colors.textSecondary }}>
                    <FiClock /> {job.appliedDate}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: theme.colors.secondaryLight, color: theme.colors.text }}
                >
                  <FiEdit2 />
                </button>
                <button
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: '#EF444420', color: '#EF4444' }}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JobTracker;