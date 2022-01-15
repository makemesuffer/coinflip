import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  additionalClass?: string;
  isLoading?: boolean;
};

// w-full

const Button: React.FC<ButtonProps> = ({
  children,
  additionalClass,
  isLoading = false,
  ...props
}) => {
  const ButtonClass = classNames(
    'btn btn-primary btn-sm lg:btn-md ' + additionalClass,
    {
      'loading': isLoading,
    }
  );

  return (
    <button className={ButtonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
