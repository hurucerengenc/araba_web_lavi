// src/components/ui/Input.tsx
import React, { forwardRef, InputHTMLAttributes } from 'react';
import './Input.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className={`ui-input-wrapper ${className}`}>
        {label && (
          <label htmlFor={inputId} className="ui-input-label">
            {label}
          </label>
        )}
        
        <div className="ui-input-container">
          {leftIcon && <div className="ui-input-icon ui-input-icon--left">{leftIcon}</div>}
          
          <input
            id={inputId}
            ref={ref}
            className={`ui-input ${error ? 'ui-input--error' : ''} ${leftIcon ? 'has-left-icon' : ''} ${rightIcon ? 'has-right-icon' : ''}`}
            {...props}
          />
          
          {rightIcon && <div className="ui-input-icon ui-input-icon--right">{rightIcon}</div>}
        </div>
        
        {(error || helperText) && (
          <div className={`ui-input-message ${error ? 'ui-input-message--error' : ''}`}>
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
