import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Github, Monitor, Moon, Sun } from 'lucide-react';

const AppBar = () => {
  const { auth } = usePage<SharedData>().props;
  const { appearance, updateAppearance } = useAppearance();
  return (
    <div className="flex items-center justify-between p-8">
      <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
        <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
          <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
        </div>
      </Link>

      <div className="flex flex-row items-center justify-between space-x-1.5 print:hidden">
        <Button size={'icon'} variant={'ghost'}>
          <Github />
        </Button>
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => {
            if (appearance == 'light') {
              updateAppearance('dark');
            } else if (appearance == 'dark') {
              updateAppearance('system');
            } else {
              updateAppearance('light');
            }
          }}
        >
          {appearance == 'light' && <Sun />}
          {appearance == 'dark' && <Moon />}
          {appearance == 'system' && <Monitor />}
        </Button>
        {auth.user ? (
          <Button asChild>
            <Link href={route('dashboard')}>Dashboard</Link>
          </Button>
        ) : (
          <>
            {/* <Button variant={'outline'} asChild>
              <Link href={route('login')}>
                <LogIn /> Log in
              </Link>
            </Button> */}
            {/* <Button variant={'outline'} asChild>
              <Link href={route('register')}>
                <UserPlus /> Register
              </Link>
            </Button> */}
          </>
        )}
      </div>
    </div>
  );
};

export default AppBar;
