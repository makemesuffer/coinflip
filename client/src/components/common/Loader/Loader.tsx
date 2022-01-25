import { HTMLProps } from 'react';
import classNames from 'classnames';

type LoaderProps = HTMLProps<HTMLDivElement> & {
  theme: 'light' | 'dark' | 'cyberpunk';
};

const Loader: React.FC<LoaderProps> = ({ theme, ...props }) => {
  const loaderClass = classNames('w-4 h-4 rounded-full', {
    'bg-blue-400': theme === 'light',
    'bg-purple-400': theme === 'dark',
    'bg-yellow-400': theme === 'cyberpunk',
  });

  return (
    <div
      className="flex items-center justify-center h-96 space-x-2 animate-pulse"
      {...props}
    >
      <div className={loaderClass}></div>
      <div className={loaderClass}></div>
      <div className={loaderClass}></div>
    </div>
  );
};

export default Loader;
