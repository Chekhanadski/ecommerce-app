import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';

import './styles.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ children, onClick, className, type = 'button' }: ButtonProps) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} onClick={onClick} className={classNames('button', className)}>
      {children}
    </button>
  );
}
