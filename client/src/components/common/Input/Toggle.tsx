import { InputHTMLAttributes } from 'react';

type ToggleProps = InputHTMLAttributes<HTMLInputElement>;

const Toggle: React.FC<ToggleProps> = ({ ...props }) => (
  <input type="checkbox" className="toggle" {...props} />
);

export default Toggle;
