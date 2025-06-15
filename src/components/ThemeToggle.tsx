
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Switch } from '@/components/ui/switch';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-emerald-accent/20 rounded-full px-4 py-2 cyber-glass">
      <Sun className={`w-4 h-4 transition-colors ${theme === 'light' ? 'text-amber-500' : 'text-gray-400'}`} />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-emerald-accent data-[state=unchecked]:bg-gray-300"
      />
      <Moon className={`w-4 h-4 transition-colors ${theme === 'dark' ? 'text-emerald-accent' : 'text-gray-400'}`} />
    </div>
  );
};

export default ThemeToggle;
