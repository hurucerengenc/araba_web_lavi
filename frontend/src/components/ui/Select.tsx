// src/components/ui/Select.tsx
import React, { forwardRef, SelectHTMLAttributes } from 'react';
import './Input.css'; // We can reuse input styles for the container
import './Select.css';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', id, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className={`ui-input-wrapper ${className}`}>
        {label && (
          <label htmlFor={selectId} className="ui-input-label">
            {label}
          </label>
        )}
        
        <div className="ui-input-container">
          <select
            id={selectId}
            ref={ref}
            className={`ui-input ui-select ${error ? 'ui-input--error' : ''}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="ui-select-arrow">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        {error && (
          <div className="ui-input-message ui-input-message--error">
            {error}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
