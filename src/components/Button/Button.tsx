import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';

import './styles.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ children, onClick, className, disabled, type }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={classNames('button', className)} disabled={disabled}>
      {children}
    </button>
  );
}
