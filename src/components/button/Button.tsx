import './button.scss';
import IButton from './interface';

const Button = ({ onClick, className, children }: IButton): JSX.Element => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

const OutlineButton = ({ onClick, className, children }: IButton) => {
  return (
    <Button className={`btn-outline ${className}`} onClick={onClick}>
      {children}
    </Button>
  );
};

export { Button, OutlineButton };
