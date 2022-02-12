import React, { ReactChildren, ReactNode } from 'react';
import './styles.scss';

import Spinner from '../Spinner';

interface ButtonProps {
  className?: string;
  children?: ReactChildren | ReactNode;
  iconSize?: number;
  color?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  isWorking?: boolean,
  onClick?: () => void;
  testId?: string;
}

const defaultProps = {
  className: undefined,
  children: undefined,
  iconSize: 24,
  color: 'white',
  disabled: false,
  loading: false,
  isWorking: false,
  onClick: () => {},
};

export const Button = (props: ButtonProps = defaultProps) => {
  const { className, loading, type, disabled, iconSize, onClick, color, children, testId } = props;
  
  const handleClick = () => {
    if (!disabled && !loading) {
      if (onClick) onClick();
    }
  };

  return (
    <button
      {...process.env.REACT_APP_IS_TEST && { 'data-testid': testId }}
      className={`button ${className ? className : ''}`}
      onClick={handleClick}
      disabled={disabled || loading}
      {...type && { type }}
    >
      {loading && <Spinner size={iconSize} color={color} />}
      {children && <div className="content">{children}</div>}
    </button>
  );
}

export default Button;