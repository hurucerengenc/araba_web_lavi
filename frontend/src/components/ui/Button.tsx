// src/components/ui/Button.tsx
import React, { ButtonHTMLAttributes } from 'react';
import '../../styles/design-tokens.css'; // Just to ensure tokens are available, usually imported globally
import './Button.css'; // We will create this or use CSS Modules

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClass = 'ui-button';
  const variantClass = `ui-button--${variant}`;
  const sizeClass = `ui-button--${size}`;
  const widthClass = fullWidth ? 'ui-button--full-width' : '';
  const loadingClass = isLoading ? 'ui-button--loading' : '';

  const classes = [baseClass, variantClass, sizeClass, widthClass, loadingClass, className].filter(Boolean).join(' ');

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <span className="ui-button__spinner" />
      ) : (
        <>
          {leftIcon && <span className="ui-button__icon-left">{leftIcon}</span>}
          <span className="ui-button__text">{children}</span>
          {rightIcon && <span className="ui-button__icon-right">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
