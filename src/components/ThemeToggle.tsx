import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Switch } from '@/components/ui/switch';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-3 bg-white/20 dark:bg-black/20 backdrop-blur-md border border-sage-accent/30 dark:border-emerald-accent/20 rounded-full px-4 py-2 shadow-lg">
      <Sun className={`w-4 h-4 transition-colors ${theme === 'light' ? 'text-amber-600' : 'text-gray-400'}`} />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-emerald-accent data-[state=unchecked]:bg-sage-accent"
      />
      <Moon className={`w-4 h-4 transition-colors ${theme === 'dark' ? 'text-emerald-accent' : 'text-gray-500'}`} />
    </div>
  );
};

export default ThemeToggle;