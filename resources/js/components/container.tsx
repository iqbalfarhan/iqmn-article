import { cn } from '@/lib/utils';
import { FC, PropsWithChildren, ReactNode } from 'react';
import Heading from './heading';

type ContainerProps = PropsWithChildren & {
  className?: string;
  title?: string;
  description?: string;
  actions?: ReactNode;
};

const Container: FC<ContainerProps> = ({
  className,
  title = 'Page heading',
  description = 'change this in container componenet',
  children,
  actions,
}) => {
  return (
    <div className={cn('flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4', className)}>
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
        <Heading title={title} description={description} />
        {actions && <div className="flex items-center gap-1.5">{actions}</div>}
      </div>
      {children}
    </div>
  );
};

export default Container;
