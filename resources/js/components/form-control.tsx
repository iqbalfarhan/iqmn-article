import { FC, PropsWithChildren, ReactNode } from 'react';
import { Label } from './ui/label';

type FormControlProps = PropsWithChildren & {
  label?: string;
  required?: boolean;
  actions?: ReactNode;
};

const FormControl: FC<FormControlProps> = ({ children, label, required = false, actions }) => {
  return (
    <Label className="flex flex-col space-y-2">
      <div className="flex justify-between">
        {label && (
          <span>
            {label} {required && <span className="text-destructive">*</span>}
          </span>
        )}
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      {children}
    </Label>
  );
};

export default FormControl;
