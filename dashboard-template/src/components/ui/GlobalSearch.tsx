import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Users,
  MessageSquare,
  Zap,
  Megaphone,
  BarChart3,
  Fingerprint,
  Command,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  icon: any;
  action: () => void;
}

const demoResults: SearchResult[] = [
  {
    id: '1',
    title: 'Customers',
    subtitle: 'View and manage all customers',
    category: 'Navigation',
    icon: Users,
    action: () => '/customers',
  },
  {
    id: '2',
    title: 'Conversations',
    subtitle: 'Multi-channel messaging',
    category: 'Navigation',
    icon: MessageSquare,
    action: () => '/conversations',
  },
  {
    id: '3',
    title: 'Automations',
    subtitle: 'Build automated workflows',
    category: 'Navigation',
    icon: Zap,
    action: () => '/automations',
  },
  {
    id: '4',
    title: 'Campaigns',
    subtitle: 'Manage broadcast campaigns',
    category: 'Navigation',
    icon: Megaphone,
    action: () => '/campaigns',
  },
  {
    id: '5',
    title: 'Analytics',
    subtitle: 'View performance metrics',
    category: 'Navigation',
    icon: BarChart3,
    action: () => '/analytics',
  },
  {
    id: '6',
    title: 'Nitro X',
    subtitle: 'Cookieless tracking',
    category: 'Navigation',
    icon: Fingerprint,
    action: () => '/nitro-x',
  },
];

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSearch = ({ isOpen, onClose }: GlobalSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>(demoResults);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = demoResults.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setSelectedIndex(0);
    } else {
      setResults(demoResults);
      setSelectedIndex(0);
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleSelect = (result: SearchResult) => {
    const path = result.action();
    if (typeof path === 'string') {
      navigate(path);
    }
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-[100] flex items-start justify-center pt-[20vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-2xl border border-cream-200 dark:border-navy-700 overflow-hidden">
            {/* Search Input */}
            <div className="flex items-center gap-3 p-4 border-b border-cream-200 dark:border-navy-700">
              <Search className="w-5 h-5 text-navy-400 dark:text-navy-500" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search customers, conversations, automations..."
                className="flex-1 bg-transparent text-navy-900 dark:text-cream-50 placeholder:text-navy-400 dark:placeholder:text-navy-500 outline-none text-lg"
              />
              <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs font-mono text-navy-500 dark:text-navy-400 bg-cream-100 dark:bg-navy-700 rounded border border-navy-200 dark:border-navy-600">
                <Command className="w-3 h-3" />K
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
              {results.length === 0 ? (
                <div className="p-12 text-center">
                  <Search className="w-12 h-12 mx-auto text-navy-300 dark:text-navy-600 mb-3" />
                  <p className="text-navy-600 dark:text-navy-400">No results found</p>
                  <p className="text-sm text-navy-400 dark:text-navy-500 mt-1">
                    Try searching for customers, conversations, or automations
                  </p>
                </div>
              ) : (
                <div className="py-2">
                  {results.map((result, index) => {
                    const Icon = result.icon;
                    return (
                      <motion.button
                        key={result.id}
                        onClick={() => handleSelect(result)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        whileHover={{ x: 4 }}
                        className={`w-full flex items-center gap-4 px-4 py-3 transition-colors ${
                          index === selectedIndex
                            ? 'bg-primary-50 dark:bg-primary-900/20'
                            : 'hover:bg-cream-50 dark:hover:bg-navy-700'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            index === selectedIndex
                              ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white'
                              : 'bg-cream-100 dark:bg-navy-700 text-navy-600 dark:text-cream-300'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 text-left">
                          <p
                            className={`font-semibold ${
                              index === selectedIndex
                                ? 'text-primary-700 dark:text-primary-400'
                                : 'text-navy-900 dark:text-cream-50'
                            }`}
                          >
                            {result.title}
                          </p>
                          {result.subtitle && (
                            <p className="text-sm text-navy-500 dark:text-navy-400">
                              {result.subtitle}
                            </p>
                          )}
                        </div>
                        <span className="text-xs text-navy-400 dark:text-navy-500 uppercase">
                          {result.category}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-cream-200 dark:border-navy-700 flex items-center justify-between text-xs text-navy-500 dark:text-navy-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-cream-100 dark:bg-navy-700 rounded">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-cream-100 dark:bg-navy-700 rounded">↵</kbd>
                  Select
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-cream-100 dark:bg-navy-700 rounded">ESC</kbd>
                Close
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GlobalSearch;
