'use client';
import { InputProps } from '@/types';
import { useEffect, useState } from 'react';

export const Input = ({
  id,
  name,
  label,
  type,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  readOnly = false,
  hidden = false,
  validation,
}: InputProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (validation) {
      const error = validation.find((err) => err.id === id);
      if (error) {
        const message = Array.isArray(error.message._errors)
          ? error.message._errors.join(', ')
          : String(error.message);
        setErrorMessage(message);
      } else {
        setErrorMessage(null);
      }
    } else {
      setErrorMessage(null);
    }
  }, [validation, id]);

  return (
    <div className={hidden ? 'hidden' : `relative mt-3`}>
      <label className="capitalize" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        defaultValue={defaultValue || ''}
        onChange={onChange}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        type={type || 'text'}
        className={`custom-input ${errorMessage && 'border border-red-500'}`}
        readOnly={readOnly}
      />
      {errorMessage && (
        <span className="text-red-500 text-xs">{errorMessage}</span>
      )}
    </div>
  );
};
