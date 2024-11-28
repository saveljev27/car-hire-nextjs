'use client';
import { useEffect, useState } from 'react';

interface SelectProps {
  options: any;
  title: string;
  defaultValue?: string;
  validation?: {
    id: string;
    message: {
      _errors: [string];
    };
  }[];
}

export const Select = ({
  options,
  title,
  defaultValue,
  validation,
}: SelectProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    if (validation) {
      const error = validation.find((err) => err.id === title);
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
  }, [validation, title]);
  return (
    <div className="relative mt-3">
      <label className="capitalize" htmlFor={title}>
        {title}
      </label>
      <select
        id={title}
        name={title}
        className={`custom-input ${errorMessage && 'border border-red-500'}`}
        defaultValue={defaultValue}
      >
        {options.map((option: any) => (
          <option id={option.title} key={option.title} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
      {errorMessage && (
        <span className="text-red-500 text-xs">{errorMessage}</span>
      )}
    </div>
  );
};
