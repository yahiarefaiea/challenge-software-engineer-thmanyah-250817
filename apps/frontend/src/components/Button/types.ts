import type { HeadlessButtonProps } from '../HeadlessButton';
import type { IconSource } from '../Icon';

export type ButtonSize = 'md' | 'sm';

export interface ButtonProps extends HeadlessButtonProps {
  size?: ButtonSize;
  iconButton?: IconSource;
  icons?: {
    end?: IconSource;
  };
}
