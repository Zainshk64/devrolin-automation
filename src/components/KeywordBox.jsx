import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlus } from 'react-icons/fi';
import { theme } from '../styles/theme';

const KeywordBox = ({ title, icon, gradient }) => {
  const [keywords, setKeywords] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!keywords.includes(inputValue.trim())) {
        setKeywords([...keywords, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeKeyword = (indexToRemove) => {
    setKeywords(keywords.filter((_, index) => index !== indexToRemove));
  };

  const clearAll = () => {
    setKeywords([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-6 h-full flex flex-col"
      style={{
        backgroundColor: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div 
          className="w-16 h-16 rounded-xl flex items-center justify-center"
          style={{ background: gradient }}
        >
          <img src={icon} alt={title} className="w-8 h-8 object-contain" />
        </div>
        <h3 className="text-xl font-bold" style={{ color: theme.colors.text }}>
          {title}
        </h3>
      </div>

      {/* Input */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type keyword and press Enter"
            className="w-full px-4 py-3 rounded-lg outline-none transition-all"
            style={{
              backgroundColor: theme.colors.secondaryLight,
              border: `2px solid ${theme.colors.border}`,
              color: theme.colors.text
            }}
            onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
            onBlur={(e) => e.target.style.borderColor = theme.colors.border}
          />
          <FiPlus 
            className="absolute right-4 top-1/2 -translate-y-1/2"
            style={{ color: theme.colors.textSecondary }}
          />
        </div>
      </div>

      {/* Keywords Display */}
      <div className="flex-1 mb-4 overflow-y-auto">
        <AnimatePresence>
          {keywords.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap gap-2"
            >
              {keywords.map((keyword, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
                  style={{
                    backgroundColor: theme.colors.secondaryLight,
                    color: theme.colors.text,
                    border: `1px solid ${theme.colors.border}`
                  }}
                >
                  {keyword}
                  <button
                    onClick={() => removeKeyword(index)}
                    className="hover:opacity-70 transition-opacity"
                    style={{ color: theme.colors.primary }}
                  >
                    <FiX size={16} />
                  </button>
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {keywords.length === 0 && (
          <div 
            className="text-center py-8"
            style={{ color: theme.colors.textSecondary }}
          >
            No keywords added yet
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-auto">
        {keywords.length > 2 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={clearAll}
            className="flex-1 py-2.5 rounded-lg font-medium transition-all"
            style={{
              backgroundColor: theme.colors.secondaryLight,
              color: theme.colors.text,
              border: `1px solid ${theme.colors.border}`
            }}
          >
            Clear All
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-2.5 rounded-lg font-medium transition-all"
          style={{
            backgroundColor: theme.colors.primary,
            color: theme.colors.text
          }}
        >
          Submit
        </motion.button>
      </div>
    </motion.div>
  );
};

export default KeywordBox;