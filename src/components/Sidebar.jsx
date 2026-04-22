import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { theme } from '../styles/theme';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { id: 1, name: 'Use Case 1', active: true },
    { id: 2, name: 'Use Case 2', active: false },
    { id: 3, name: 'Use Case 3', active: false },
    { id: 4, name: 'Use Case 4', active: false },
  ];

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userEmail');
      navigate('/login');
    }, 1000);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl"
        style={{
          backgroundColor: theme.colors.surface,
          border: `1px solid ${theme.colors.border}`,
          color: theme.colors.text
        }}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && !isLargeScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-72 flex flex-col z-40
          transition-transform duration-300 ease-in-out
          ${isLargeScreen ? 'translate-x-0' : isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          backgroundColor: theme.colors.surface,
          borderRight: `1px solid ${theme.colors.border}`
        }}
      >
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: theme.colors.border }}>
          <div className="flex items-center gap-3">
             <div 
              className="rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto"
              // style={{ backgroundColor: theme.colors.primary }}
            >
              <img src="/devrolin-automation.svg" alt="Devrolin Logo" />

            </div>
           
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (item.active) {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }
                }}
                disabled={!item.active}
                className="w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between"
                style={{
                  backgroundColor: activeTab === item.id ? theme.colors.primary : 'transparent',
                  color: activeTab === item.id ? theme.colors.text : theme.colors.textSecondary,
                  opacity: item.active ? 1 : 0.5,
                  cursor: item.active ? 'pointer' : 'not-allowed'
                }}
              >
                <span className="font-medium">{item.name}</span>
                {!item.active && (
                  <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: theme.colors.secondaryLight }}>
                    Soon
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t" style={{ borderColor: theme.colors.border }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
            style={{
              backgroundColor: theme.colors.secondaryLight,
              color: theme.colors.text,
              opacity: loggingOut ? 0.7 : 1
            }}
          >
            {loggingOut ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Logging out...
              </>
            ) : (
              <>
                <FiLogOut />
                Logout
              </>
            )}
          </motion.button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;