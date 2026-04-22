import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { theme } from '../styles/theme';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Password strength checker
  const checkPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    const levels = [
      { strength: 1, text: 'Weak', color: theme.colors.error },
      { strength: 2, text: 'Fair', color: '#F59E0B' },
      { strength: 3, text: 'Good', color: '#3B82F6' },
      { strength: 4, text: 'Strong', color: theme.colors.success },
    ];

    return levels[strength - 1] || { strength: 0, text: '', color: '' };
  };

  const passwordStrength = checkPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (
        formData.email === 'devrolin@gmail.com' &&
        formData.password === 'Devrolin@123'
      ) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: theme.colors.background }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-4"
          >
            <div 
              className="rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto"
              // style={{ backgroundColor: theme.colors.primary }}
            >
              <img src="/public/devrolin-automation.svg" alt="Devrolin Logo" />

            </div>
          </motion.div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: theme.colors.text }}>
            Welcome Back
          </h1>
          <p style={{ color: theme.colors.textSecondary }}>
            Sign in to Devrolin Automation
          </p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-8 shadow-2xl"
          style={{ 
            backgroundColor: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 p-4 rounded-lg"
                style={{ backgroundColor: `${theme.colors.error}20`, color: theme.colors.error }}
              >
                <FiAlertCircle />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Email Input */}
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: theme.colors.text }}>
                Email Address
              </label>
              <div className="relative">
                <FiMail 
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: theme.colors.textSecondary }}
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-lg outline-none transition-all"
                  style={{
                    backgroundColor: theme.colors.secondaryLight,
                    border: `2px solid ${theme.colors.border}`,
                    color: theme.colors.text
                  }}
                  onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
                  onBlur={(e) => e.target.style.borderColor = theme.colors.border}
                  placeholder="devrolin@gmail.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: theme.colors.text }}>
                Password
              </label>
              <div className="relative">
                <FiLock 
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: theme.colors.textSecondary }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-3 rounded-lg outline-none transition-all"
                  style={{
                    backgroundColor: theme.colors.secondaryLight,
                    border: `2px solid ${theme.colors.border}`,
                    color: theme.colors.text
                  }}
                  onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
                  onBlur={(e) => e.target.style.borderColor = theme.colors.border}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: theme.colors.textSecondary }}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                        className="h-full rounded-full transition-all"
                        style={{ backgroundColor: passwordStrength.color }}
                      />
                    </div>
                  </div>
                  <p className="text-xs" style={{ color: passwordStrength.color }}>
                    {passwordStrength.text}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold transition-all"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.text,
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: theme.colors.background }}>
            <p className="text-xs mb-2" style={{ color: theme.colors.textSecondary }}>
              Demo Credentials:
            </p>
            <p className="text-sm font-mono" style={{ color: theme.colors.primary }}>
              devrolin@gmail.com
            </p>
            <p className="text-sm font-mono" style={{ color: theme.colors.primary }}>
              Devrolin@123
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;