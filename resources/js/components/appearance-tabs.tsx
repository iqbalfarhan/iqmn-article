import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

export default function AppearanceToggleTab({ className = '' }: HTMLAttributes<HTMLDivElement>) {
  const { appearance, updateAppearance } = useAppearance();

  const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ];

  return (
    <Tabs defaultValue={appearance} className={cn(className)}>
      <TabsList>
        {tabs.map(({ value, icon: Icon, label }) => (
          <TabsTrigger value={value} key={value} onClick={() => updateAppearance(value)}>
            <Icon />
            <span>{label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
