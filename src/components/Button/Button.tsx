import React, { CSSProperties, MouseEventHandler } from 'react';
import './styles.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: CSSProperties;
}

export default function Button({ children, onClick, className = 'button', style = { width: '100%' } }: ButtonProps) {
  return (
    <button type="button" onClick={onClick} className={className} style={style}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: 'button',
  style: { width: '100%' }
};
