import { ScrollArea } from '@/components/ui/scroll-area';
import AppBar from '@/pages/welcome/components/app-bar';
import { FC, PropsWithChildren } from 'react';

type WelcomeLayoutProps = PropsWithChildren;

const WelcomeLayout: FC<WelcomeLayoutProps> = ({ children }) => {
  return (
    <ScrollArea className="h-screen max-h-screen">
      <div className="mx-auto w-full">
        <AppBar />
        <div className="p-8">{children}</div>
      </div>
    </ScrollArea>
  );
};

export default WelcomeLayout;
