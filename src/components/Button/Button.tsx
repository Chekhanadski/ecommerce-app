import React, { CSSProperties, MouseEventHandler } from 'react';
import './styles.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean; // Добавьте это свойство
}

export default function Button({
  children,
  onClick,
  className = 'button',
  style = { width: '100%' },
  type = 'button',
  disabled = false
}: ButtonProps) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} onClick={onClick} className={className} style={style} disabled={disabled}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: 'button',
  style: { width: '100%' },
  type: 'button',
  disabled: false,
  onClick: () => {}
};
