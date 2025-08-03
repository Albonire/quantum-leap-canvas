
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Switch } from '@/components/ui/switch';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 sm:gap-3 bg-white/20 dark:bg-black/20 backdrop-blur-md border border-sage-accent/30 dark:border-emerald-accent/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg">
      <Sun className={`w-3 h-3 sm:w-4 sm:h-4 transition-colors ${theme === 'light' ? 'text-amber-600' : 'text-gray-400'}`} />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-emerald-accent data-[state=unchecked]:bg-sage-accent scale-75 sm:scale-100"
      />
      <Moon className={`w-3 h-3 sm:w-4 sm:h-4 transition-colors ${theme === 'dark' ? 'text-emerald-accent' : 'text-gray-500'}`} />
    </div>
  );
};

export default ThemeToggle;
