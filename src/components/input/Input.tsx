import './input.scss';
import { InputProps } from './interface';

const Input = ({
  type,
  placeholder,
  value,
  onChange,
}: InputProps): JSX.Element => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
