import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

export default function ThemeToggle() {
  const { mode, setMode } = useTheme();

  const options = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
    { value: 'system' as const, icon: Monitor, label: 'System' },
  ];

  return (
    <div className="flex items-center gap-2 bg-card border border-cardBorder rounded-lg p-1">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setMode(value)}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-md transition-all
            ${
              mode === value
                ? 'bg-primary text-white'
                : 'text-textSecondary hover:text-textPrimary hover:bg-bgElevated'
            }
          `}
          title={label}
        >
          <Icon size={16} />
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}
